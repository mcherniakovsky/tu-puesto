'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'


// ... rest of the component code remains the same

export default function JoinQueuePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState({
    usr_id: '',
    usr_nombre: '',
    correo: ''
  })
  const [restaurantInfo, setRestaurantInfo] = useState({ nombre: '', id: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      fetchRestaurantInfo(id)
    } else {
      setError('No restaurant ID provided')
      setIsLoading(false)
    }
  }, [searchParams])

  const fetchRestaurantInfo = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://backdev.tupuesto.cl/negocio/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant information')
      }
      const data = await response.json()
      setRestaurantInfo({ nombre: data.nombre, id: data.id })
    } catch (error) {
      console.error('Error fetching restaurant info:', error)
      setError('Failed to load restaurant information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = searchParams.get('id')
    if (!id) {

      return
    }

    setIsJoining(true)
    try {
      const response = await fetch('https://backdev.tupuesto.cl/cola', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          neg_id: id,
          estado: "ESPERA"
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to join the queue')
      }

      const data = await response.json()

      router.push(`/queue-status?id=${id}`)
    } catch (error) {
      console.error('Error joining queue:', error)

    } finally {
      setIsJoining(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="pt-6">
            <p className="text-center text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Join the Queue</CardTitle>
          {restaurantInfo.nombre && (
            <p className="text-muted-foreground">for {restaurantInfo.nombre}</p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usr_id">RUT</Label>
              <Input
                id="usr_id"
                name="usr_id"
                value={formData.usr_id}
                onChange={handleInputChange}
                placeholder="e.g., 12345678-9"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="usr_nombre">Name</Label>
              <Input
                id="usr_nombre"
                name="usr_nombre"
                value={formData.usr_nombre}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo">Email</Label>
              <Input
                id="correo"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isJoining}>
              {isJoining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Joining Queue...
                </>
              ) : (
                'Join Queue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}