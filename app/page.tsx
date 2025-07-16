import Link from 'next/link'
import AnimatedPage from '@/components/AnimatedPage'

export default function Home() {
  return (
    <AnimatedPage>
      <div className="text-center mt-20 space-y-6">
        <h1 className="text-4xl font-bold text-primary-800">📓 Selamat Datang di Diary App</h1>
        <p className="text-primary-500 max-w-md mx-auto">
          Tulis kenanganmu setiap hari dengan aman dan penuh warna!
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded shadow">
            Masuk
          </Link>
          <Link href="/register" className="bg-white border border-primary-300 text-primary-700 py-2 px-6 rounded shadow">
            Daftar
          </Link>
        </div>
      </div>
    </AnimatedPage>
  )
}
