"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import withAuth from "@/lib/withAuth";
import DatePicker from "react-datepicker";
import Link from "next/link";
import dynamic from "next/dynamic";
import { showToast } from "../../components/Toast";

const DiaryEditor = dynamic(() => import("@/components/diary/DiaryEditor"), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});

export type Diary = {
    id: string;
    content: string;
    createdAt: string;
};

function DiaryPage() {
    const [entries, setEntries] = useState<Diary[]>([]);
    const [content, setContent] = useState("");
    const [selectedEntry, setSelectedEntry] = useState<Diary | null>();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const filteredEntries = selectedDate
        ? entries.filter((e) => new Date(e.createdAt).toDateString() === selectedDate.toDateString())
        : entries;

    const fetchEntries = async () => {
        try {
            const res = await API.get("/diary");
            setEntries(res.data);
        } catch (err) {
            showToast("Gagal memuat diary.", "error");
        }
    };

    const saveDiary = async (content: string) => {
        try {
            await API.post("/diary", { content });
            fetchEntries();
        } catch {
            showToast("Gagal menyimpan diary.", "error");
        }
    };

    const handleEdit = (entry: Diary) => {
        setContent(entry.content);
        setSelectedEntry(entry);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus catatan ini?")) return;
        await API.delete(`/diary/${id}`);
        fetchEntries();
    };

    useEffect(() => {
        fetchEntries();
    }, []);

    return (
        <div className="space-y-8">
            <section className="mb-8">
                <DiaryEditor onSave={saveDiary} />
            </section>

            <section className="flex items-center gap-4 mb-4">
                <label className="text-sm text-primary-700 font-medium">Filter Tanggal:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText="Pilih tanggal"
                    className="border border-primary-200 rounded px-3 py-2"
                    dateFormat="dd MMM yyyy"
                    isClearable
                />
            </section>

            <section className="space-y-4">
                {filteredEntries.length === 0 ? (
                    <div className="text-center text-primary-400 italic">Belum ada catatan.</div>
                ) : (
                    filteredEntries.map((entry) => (
                        <Link href={`/diary/${entry.id}`} key={entry.id}>
                            <div className="relative diary-paper mb-2 bg-white p-6 rounded-xl shadow-lg border-2 border-primary-100 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:bg-primary-200 before:rounded-l-lg">
                                <div className="text-xs text-primary-400 italic mb-2">
                                    {new Date(entry.createdAt).toLocaleString()}
                                </div>
                                {/* <div className="whitespace-pre-line text-primary-800 leading-relaxed font-serif">
                                    {entry.content}
                                </div> */}
                                <div
                                    className="prose prose-sm prose-primary"
                                    dangerouslySetInnerHTML={{ __html: entry.content }}
                                ></div>
                            </div>
                        </Link>
                    ))
                )}
            </section>
        </div>
    );
}

export default withAuth(DiaryPage);
