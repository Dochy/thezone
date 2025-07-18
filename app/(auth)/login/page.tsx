"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import { getCurrentUser } from '@aws-amplify/auth'
import { LoginForm } from "@/components/login-form"

export default function Page() {

  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser()
        setUser(user)
      } catch {
        router.push('/login')
      }
    }
    checkUser()
  }, [])

  //check if allready logged in
  if (user) router.push("/dashboard")

  //if not show log in form
  return (
     <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  )
}