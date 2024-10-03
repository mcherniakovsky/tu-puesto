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
    console.log(searchParams);
    const rut = searchParams.get('rut')
    if (rut) {
      fetchQueueStatus(rut)
      fetchRestaurantInfo(rut)
    }
  }, [searchParams])

  const fetchQueueStatus = async (rut: string) => {
    // TODO: Replace with actual API call
    try {
      const response = await fetch(`https://backdev.tupuesto.cl/usuario/puesto/${rut}`)
      const data = await response.json()
      setQueueStatus({ position: data.data[0].cola_numero, waitTime: data.data[0].cola_numero * 3 })
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
          <CardTitle className="text-2xl font-bold">Información de atención</CardTitle>
          {restaurantName && (
            <p className="text-muted-foreground">at {restaurantName}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg">
            Tu posición en la fila es: <strong>{queueStatus.position}</strong>
          </p>
          <p className="text-center text-lg">
            Tiempo de espera estimado: <strong>{queueStatus.waitTime} minutos</strong>
          </p>
          <Button className="w-full" onClick={refreshStatus}>Refrescar</Button>
          <Button className="w-full" onClick={refreshStatus}>Abandonar</Button>
        </CardContent>
      </Card>
    </div>
  )
}