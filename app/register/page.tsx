'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '@/lib/api'
import AnimatedPage from '@/components/AnimatedPage'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { email, password })
      router.push('/login')
    } catch (err) {
      alert('Register failed')
    }
  }

  return (
    <AnimatedPage>
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={handleRegister}>Register</button>
      </div>
    </AnimatedPage>
  )
}
