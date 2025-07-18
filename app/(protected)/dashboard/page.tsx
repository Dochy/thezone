'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser, signOut } from '@aws-amplify/auth'
import { Home, Users, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

<<<<<<< HEAD

import { generateClient } from 'aws-amplify/data'
import { type Schema } from '@/amplify/data/resource'


const client = generateClient({ authMode: 'userPool' })


export default function Page() {

=======
export default function Dashboard() {
>>>>>>> parent of 110aad6 (general cleanup)
  const [user, setUser] = useState<any>(null)
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {

     
    const fetchBrands = async () => {
      try {
        const result = await client.models.Brand.list()
        if (result.errors) {
          setError('Failed to fetch todos')
          console.log(result)
        } else {
          setBrands(result.data)
          console.log(brands)
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error(err);
      } finally {
        setLoading(false)
      }
    }
    

    getCurrentUser()
      .then(setUser)
      .then(fetchBrands)
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

<<<<<<< HEAD

=======
  const handleLogout = async () => {
    try {
      await signOut()
      window.location.href = '/login'
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }
>>>>>>> parent of 110aad6 (general cleanup)

  if (!user) return <div className="flex h-screen items-center justify-center">Loading...</div>
  //if (loading) return <div>Loading...</div>
  //if (error) return <div>{error}</div>

  return (
<<<<<<< HEAD
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <h1 className="text font-semibold">Welcome, {user.userId}</h1>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
=======
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
>>>>>>> parent of 110aad6 (general cleanup)
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
