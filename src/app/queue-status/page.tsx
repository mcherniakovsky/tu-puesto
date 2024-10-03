'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function QueueStatusPage() {
  const searchParams = useSearchParams()
  const [queueStatus, setQueueStatus] = useState({ position: 0, waitTime: 0 })
  const [restaurantName, setRestaurantName] = useState('')

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      fetchQueueStatus(id)
      fetchRestaurantInfo(id)
    }
  }, [searchParams])

  const fetchQueueStatus = async (id: string) => {
    // TODO: Replace with actual API call
    try {
      const response = await fetch(`/api/queue-status/${id}`)
      const data = await response.json()
      setQueueStatus({ position: data.position, waitTime: data.waitTime })
    } catch (error) {
      console.error('Error fetching queue status:', error)
    }
  }

  const fetchRestaurantInfo = async (id: string) => {
    // TODO: Replace with actual API call
    try {
      const response = await fetch(`/api/restaurant/${id}`)
      const data = await response.json()
      setRestaurantName(data.name)
    } catch (error) {
      console.error('Error fetching restaurant info:', error)
    }
  }

  const refreshStatus = () => {
    const id = searchParams.get('id')
    if (id) {
      fetchQueueStatus(id)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Your Queue Status</CardTitle>
          {restaurantName && (
            <p className="text-muted-foreground">at {restaurantName}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg">
            Your current position in the queue: <strong>{queueStatus.position}</strong>
          </p>
          <p className="text-center text-lg">
            Estimated wait time: <strong>{queueStatus.waitTime} minutes</strong>
          </p>
          <Button className="w-full" onClick={refreshStatus}>Refresh Status</Button>
        </CardContent>
      </Card>
    </div>
  )
}