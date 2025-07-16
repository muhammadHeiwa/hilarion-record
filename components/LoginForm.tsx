'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import API from '@/lib/api'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      router.push('/diary')
    } catch {
      alert('Email atau password salah.')
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        className="w-full border border-primary-200 rounded px-4 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border border-primary-200 rounded px-4 py-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  )
}
