'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from 'react'
import { getCurrentUser, signOut } from '@aws-amplify/auth'


import { generateClient } from 'aws-amplify/data'
import { type Schema } from '@/amplify/data/resource'


const client = generateClient({ authMode: 'userPool' })


export default function Page() {

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



  if (!user) return <div className="flex h-screen items-center justify-center">Loading...</div>
  //if (loading) return <div>Loading...</div>
  //if (error) return <div>{error}</div>

  return (
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
