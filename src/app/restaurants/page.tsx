import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

async function getRestaurants() {
  // TODO: Replace with your actual API call
  return [
    { id: 1, name: 'Gourmet Chicken', waitTime: '20 min', queueLength: 15 },
    { id: 2, name: 'Pasta Dog', waitTime: '15 min', queueLength: 10 },
    { id: 3, name: 'Sushi Panda', waitTime: '30 min', queueLength: 25 },
  ]
}

export default async function RestaurantList() {
  const restaurants = await getRestaurants()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Encuentra tu restorant</h1>
      <div className="relative">
        <Input type="search" placeholder="Search restaurants..." />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id}>
            <CardHeader>
              <CardTitle>{restaurant.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span>Tiempo de espera: {restaurant.waitTime}</span>
                <span>Fila: {restaurant.queueLength} personas</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}