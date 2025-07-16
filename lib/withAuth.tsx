'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function withAuth(Component: React.FC) {
  return function ProtectedComponent() {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) router.push('/login')
    }, [router])

    return <Component />
  }
}
