'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'


interface QueueEntry {
  cola_id: string;
  cola_usr_nombre: string;
  cola_numero: number;
}

export default function QueueManagementPage() {
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    fetchQueueState()
  }, [])

  const fetchQueueState = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('https://backdev.tupuesto.cl/cola/estado/espera')
      if (!response.ok) {
        throw new Error('Failed to fetch queue state')
      }
      const data = await response.json()
      setQueueEntries(data.data)
    } catch (err) {
      setError('Failed to load queue state. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = (id: string) => {
    // Implement accept logic here
    console.log(`Accepted entry with ID: ${id}`)
    // You might want to update the queue state after accepting
    fetchQueueState()
  }

  const handleDecline = async (id: string) => {
    try {
      const response = await fetch(`https://backdev.tupuesto.cl/cola/baja/${id}`, {
        method: 'PUT',
      })
      if (!response.ok) {
        throw new Error('Failed to decline queue entry')
      }
      fetchQueueState()
    } catch (err) {
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
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Administrar cola</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-lg font-semibold">Total en cola: {queueEntries.length}</p>
            {queueEntries.length > 0 && (
              <p className="text-md">Siguiente: {queueEntries[0].cola_usr_nombre}</p>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queueEntries.map((entry) => (
                <TableRow key={entry.cola_id}>
                  <TableCell>{entry.cola_numero}</TableCell>
                  <TableCell>{entry.cola_usr_nombre}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleDecline(entry.cola_id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Ingresar
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDecline(entry.cola_id)}
                        variant="destructive"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}