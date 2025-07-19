"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@aws-amplify/auth'

import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';


const client = generateClient<Schema>();


export default function Page() {

  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserAndFetch = async () => {
      try {
        //check user
        const user = await getCurrentUser()
        setUser(user)
        console.log(user);
        //get data
        const { data, errors } = await client.models.Brand.list()

        if (errors) {
          console.error("Amplify errors:", errors)
        } else {
          setBrands(data ?? [])
        }

      } catch (err) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    checkUserAndFetch()
  }, [])

  if (!user || loading) {return <div className="flex h-screen items-center justify-center">Loading...</div> }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
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
