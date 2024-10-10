'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2, Users, Clock, Utensils, DollarSign } from 'lucide-react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement)

export default function ManagerDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  const generateRandomData = (count: number, max: number) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * max))
  }

  const visitData = {
    labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        label: 'Visitas',
        data: generateRandomData(7, 100),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const queueData = {
    labels: ['9AM', '11AM', '1PM', '3PM', '5PM', '7PM', '9PM'],
    datasets: [
      {
        label: 'Promedio de espera (minutos)',
        data: generateRandomData(7, 30),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Estadísticas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de visitas hoy</CardTitle>
            <Users className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{generateRandomData(1, 200)[0]}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo de espera promedio</CardTitle>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{generateRandomData(1, 20)[0]} min</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de ordenes</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{generateRandomData(1, 100)[0]}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitas semanales</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={visitData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tiempo promedio por hora</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={queueData} />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end">
        <Button>Generar Reporte</Button>
      </div>
    </div>
  )
}