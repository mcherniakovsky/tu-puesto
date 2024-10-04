'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Home, Search, QrCode, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function BottomNav() {
  const [isClient, setIsClient] = useState(false)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // Return null on server-side to prevent hydration mismatch
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around">
        <Link href="/" className="flex flex-col items-center p-2">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Inicio</span>
        </Link>
        <Link href="/restaurants" className="flex flex-col items-center p-2">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Encontrar</span>
        </Link>
        <Link href="/scan" className="flex flex-col items-center p-2">
          <QrCode className="h-6 w-6" />
          <span className="text-xs mt-1">Escanear</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center p-2">
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Perfil</span>
        </Link>
      </div>
    </nav>
  )
}