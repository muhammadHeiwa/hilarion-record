"use client";
import { FaBold, FaItalic, FaUnderline, FaHeading, FaListUl, FaListOl, FaHighlighter, FaImage } from "react-icons/fa";
import { Editor } from "@tiptap/react";

export default function Toolbar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    const buttonClass = (active: boolean) =>
        `p-2 rounded hover:bg-primary-100 transition ${active ? "bg-primary-200 text-primary-700 font-bold" : ""}`;

    return (
        <div className="flex flex-wrap gap-2 bg-primary-50 p-2 rounded border border-primary-100 mb-4 items-center">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive("bold"))}
                title="Bold"
            >
                <FaBold />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive("italic"))}
                title="Italic"
            >
                <FaItalic />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={buttonClass(editor.isActive("underline"))}
                title="Underline"
            >
                <FaUnderline />
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "font-bold text-primary-600" : ""}
            >
                H1
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive("bulletList"))}
                title="Bullet List"
            >
                <FaListUl />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive("orderedList"))}
                title="Numbered List"
            >
                <FaListOl />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={buttonClass(editor.isActive("highlight"))}
                title="Highlight"
            >
                <FaHighlighter />
            </button>

            {/* <button
                type="button"
                onClick={() => {
                    const url = prompt("Masukkan URL gambar:");
                    if (url) {
                        editor.chain().focus().setImage({ src: url }).run();
                    }
                }}
                className={buttonClass(false)}
                title="Insert Image"
            >
                <FaImage />
            </button> */}
            <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = () => {
                        editor
                            ?.chain()
                            .focus()
                            .setImage({ src: reader.result as string })
                            .run();
                    };
                    reader.readAsDataURL(file);
                }}
                className="hidden"
                id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
                <FaImage />
            </label>
        </div>
    );
}
