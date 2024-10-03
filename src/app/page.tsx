import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">¡Bienvenido, User!</h2>
      <Card>
        <CardHeader>
          <CardTitle>Fila</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>Tiempo estimado: 15 min</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span>Posición: 3 / 10</span>
            </div>
          </div>
          <Button className="w-full mt-4">Ver detalles</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Accesos directos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline">Encuentra un restorant</Button>
            <Button variant="outline">Escanear QR</Button>
            <Button variant="outline">Ver historial</Button>
            <Button variant="outline">Mi cuenta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}