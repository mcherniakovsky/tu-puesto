import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">TuPuesto</h1>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}