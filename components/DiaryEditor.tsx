'use client'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function DiaryEditor({ onSave }: { onSave: (content: string) => void }) {
  const [content, setContent] = useState('')
  const [font, setFont] = useState('font-sans')
  const [date, setDate] = useState<Date | null>(new Date())

  const handleSave = () => {
    if (!content.trim()) return alert('Catatan tidak boleh kosong!')
    onSave(content)
    setContent('')
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-primary-100 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <DatePicker
          selected={date}
          onChange={(value) => setDate(value)}
          className="border border-primary-200 p-2 rounded w-full sm:w-auto"
        />
        <select
          onChange={(e) => setFont(e.target.value)}
          className="border border-primary-200 p-2 rounded w-full sm:w-auto"
        >
          <option value="font-sans">Sans</option>
          <option value="font-serif">Serif</option>
          <option value="font-mono">Mono</option>
        </select>
      </div>
      <textarea
        placeholder="Tulis isi diary kamu di sini..."
        className={`w-full h-32 p-4 border border-primary-200 rounded resize-none focus:outline-primary-400 ${font}`}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="text-right">
        <button
          onClick={handleSave}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded shadow transition"
        >
          Simpan
        </button>
      </div>
    </div>
  )
}
