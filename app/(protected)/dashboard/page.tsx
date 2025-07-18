'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser, fetchUserAttributes } from '@aws-amplify/auth'



export default function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => {
        window.location.href = '/login'
      })
  }, [])

  if (!user) return <div>Loading...</div>

  return <div>Welcome, {user.userId}</div>
}
