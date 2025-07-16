'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import API from '@/lib/api'
import AnimatedPage from '@/components/AnimatedPage'
import { Diary } from '../page'

export default function DiaryDetailPage() {
  const { id } = useParams()
  const [entry, setEntry] = useState<Diary | null>(null)

  useEffect(() => {
    API.get(`/diary/${id}`).then((res) => setEntry(res.data))
  }, [id])

  if (!entry) return <p className="text-center mt-8">Memuat...</p>

  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border">
        <h1 className="text-3xl font-bold text-primary-800 mb-2">{entry.content}</h1>
        <div className="text-sm text-primary-400 mb-4 italic">
          {new Date(entry.createdAt).toLocaleString()}
        </div>
        <div
          className={`whitespace-pre-wrap text-primary-800 leading-relaxed`}
        >
          {entry.content}
        </div>
      </div>
    </AnimatedPage>
  )
}
