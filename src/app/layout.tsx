import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import { AuthProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QueueUp',
  description: 'Smart restaurant queuing app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow p-4">
            {children}
          </main>
          <AuthProvider>
          <BottomNav />
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}