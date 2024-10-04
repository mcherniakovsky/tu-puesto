'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import router from 'next/router'

type AuthContextType = {
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
  checkAuth: () => boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = Cookies.get('authToken')
    if (storedToken) {
      setIsLoggedIn(true)
      setToken(storedToken)
    }
  }, [])

  const login = (newToken: string) => {
    setIsLoggedIn(true)
    setToken(newToken)
    Cookies.set('authToken', newToken, { sameSite: 'strict' })
  }

  const logout = () => {
    setIsLoggedIn(false)
    setToken(null)
    Cookies.remove('authToken')
  }

  const checkAuth = () => {
    return !!Cookies.get('authToken')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuth, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}