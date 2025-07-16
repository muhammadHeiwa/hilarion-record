'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '@/lib/api'
import AnimatedPage from '@/components/AnimatedPage'

export default function AddDiaryPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [fontSize, setFontSize] = useState('text-base')
  const [fontStyle, setFontStyle] = useState('')
  const [fontWeight, setFontWeight] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return alert('Judul dan isi harus diisi.')
    await API.post('/diary', {
      title,
      content,
      fontSize,
      fontStyle,
      fontWeight,
    })
    router.push('/diary')
  }

  return (
    <AnimatedPage>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4 border">
        <h1 className="text-2xl font-bold text-primary-800">✍️ Tulis Catatan Baru</h1>

        <input
          placeholder="Judul catatan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-primary-200 px-4 py-2 rounded"
        />

        <div className="flex gap-4 text-sm">
          <select onChange={(e) => setFontSize(e.target.value)} className="border p-2 rounded">
            <option value="text-base">Ukuran Normal</option>
            <option value="text-sm">Kecil</option>
            <option value="text-lg">Besar</option>
            <option value="text-xl">Sangat Besar</option>
          </select>
          <select onChange={(e) => setFontStyle(e.target.value)} className="border p-2 rounded">
            <option value="">Normal</option>
            <option value="italic">Italic</option>
          </select>
          <select onChange={(e) => setFontWeight(e.target.value)} className="border p-2 rounded">
            <option value="">Biasa</option>
            <option value="font-semibold">Tebal</option>
            <option value="font-bold">Sangat Tebal</option>
          </select>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className={`w-full border px-4 py-2 rounded resize-none ${fontSize} ${fontStyle} ${fontWeight}`}
          placeholder="Tuliskan kisah harianmu di sini..."
        />

        <button
          onClick={handleSubmit}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded shadow"
        >
          Simpan
        </button>
      </div>
    </AnimatedPage>
  )
}
