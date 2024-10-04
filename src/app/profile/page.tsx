'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Bell, ChevronRight, LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import router from 'next/router'


export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const { logout } = useAuth()
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User's avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">John Doe</h2>
            <p className="text-gray-500 dark:text-gray-400">john.doe@example.com</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Account Settings</span>
            </span>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Edit Profile</span>
            </span>
            <ChevronRight className="h-5 w-5" />
          </Button>
          <Button onClick={()=> { logout(), router.replace('/')}} variant="outline" className="w-full justify-between text-red-600 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900">
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