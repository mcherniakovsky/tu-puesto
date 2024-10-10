'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Bell, ChevronRight, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'


export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { logout } = useAuth()
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Juanito Perez</h2>
            <p className="text-gray-500 dark:text-gray-400">Juanito perez@example.com</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferencias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notificaciones</span>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={()=> { logout(), window.location.href = "/"}} variant="outline" className="w-full justify-between text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900">
            <span className="flex items-center space-x-2">
              <LogOut className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}