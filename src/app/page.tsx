'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">¡Bienvenido!</h2>
      <Card>
        <CardHeader>
          <CardTitle>Cola del restorant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="justify-between items-center grid col-grid-1 gap-1">
            <div className="flex items-center">
              <Clock className="h-5 w-10 mr-2 text-primary" />
              <span>Tiempo estimado: 15 min</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-10 mr-2 text-primary" />
              <span>Mesas esperando: 15</span>
            </div>
          </div>
          <Button onClick={()=>{window.location.href = "/queue-management"}} className="w-full mt-4">Ver detalles</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Accesos directos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Generar QR</Button>
            <Button onClick={() =>  window.location.href = "/manager-dashboard"} variant="outline" >Ver Estadísticas</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}