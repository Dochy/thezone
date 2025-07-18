'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser, signOut } from '@aws-amplify/auth'
import { Home, Users, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

  const handleLogout = async () => {
    try {
      await signOut()
      window.location.href = '/login'
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  if (!user) return <div className="flex h-screen items-center justify-center">Loading...</div>

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <SidebarLink href="/dashboard" icon={<Home className="w-5 h-5" />} label="Home" />
            <SidebarLink href="/dashboard/users" icon={<Users className="w-5 h-5" />} label="Users" />
            <SidebarLink href="/dashboard/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center space-x-2 text-sm text-red-400 hover:text-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-semibold mb-4">Welcome, {user.userId}</h1>
        <p className="text-gray-700">This is your dashboard content.</p>
      </main>
    </div>
  )
}

function SidebarLink({
  href,
  icon,
  label
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center space-x-3 rounded-md px-3 py-2 hover:bg-gray-800 transition-colors'
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}
