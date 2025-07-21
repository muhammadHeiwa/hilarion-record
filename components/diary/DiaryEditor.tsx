"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Toolbar from "@/components/diary/Toolbar";
import { showToast } from "../Toast";

export default function DiaryEditor({ onSave }: { onSave: (content: string) => void }) {
    const [font, setFont] = useState("font-sans");
    const [date, setDate] = useState<Date | null>(new Date());

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            BulletList,
            OrderedList,
            ListItem,
            Underline,
            Heading.configure({ levels: [1, 2, 3] }),
            Highlight,
            Image,
        ],
        content: "",
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "prose max-w-none focus:outline-none prose min-h-[150px]",
            },
        },
    });

    const handleSave = () => {
        const html = editor?.getHTML() || "";
        if (!html.trim() || html === "<p></p>") return showToast("Catatan tidak boleh kosong!", "warning");
        onSave(html);
        editor?.commands.clearContent();
    };

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
            <div className={`border border-primary-200 rounded ${font}`}>
                {editor && (
                    <>
                        <Toolbar editor={editor} />
                        <EditorContent editor={editor} className="min-h-[150px] p-4 focus:outline-none" />
                    </>
                )}
            </div>
            <div className="text-right">
                <button
                    onClick={handleSave}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded shadow transition"
                >
                    Simpan
                </button>
            </div>
        </div>
    );
}
