'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import { AuthProvider, useAuth } from './context/AuthContext'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

const inter = Inter({ subsets: ['latin'] })

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    Cookies.set('isLoggedIn', isLoggedIn ? 'true' : 'false', { sameSite: 'strict' })
  }, [isLoggedIn])

  return children
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <AuthProvider>
          <AuthWrapper>
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow p-4">
                {children}
              </main>
              <BottomNav />
            </div>
          </AuthWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}