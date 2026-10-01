"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Heading2, Undo, Redo, Code } from "lucide-react";

interface Props {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ label, value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || `<p>${placeholder ?? ""}</p>`,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[140px] px-4 py-3 outline-none text-gray-900 text-[15px] leading-relaxed",
      },
    },
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
    immediatelyRender: false,
  });

  /* Sync value externe */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const ToolBtn = ({ onClick, active, title, children }: {
    onClick: () => void; active?: boolean; title: string; children: React.ReactNode;
  }) => (
    <button type="button" title={title} onClick={onClick}
      className={`p-1.5 rounded-md transition-colors ${active ? "bg-[#1a2540] text-white" : "text-gray-600 hover:bg-gray-100"}`}>
      {children}
    </button>
  );

  return (
    <div>
      {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#1a2540] focus-within:ring-2 focus-within:ring-[#1a2540]/10 transition">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
          <ToolBtn title="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold size={15} />
          </ToolBtn>
          <ToolBtn title="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic size={15} />
          </ToolBtn>
          <ToolBtn title="Titre H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2 size={15} />
          </ToolBtn>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolBtn title="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List size={15} />
          </ToolBtn>
          <ToolBtn title="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={15} />
          </ToolBtn>
          <ToolBtn title="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
            <Code size={15} />
          </ToolBtn>
          <div className="w-px h-5 bg-gray-300 mx-1" />
          <ToolBtn title="Annuler" onClick={() => editor.chain().focus().undo().run()}>
            <Undo size={15} />
          </ToolBtn>
          <ToolBtn title="Rétablir" onClick={() => editor.chain().focus().redo().run()}>
            <Redo size={15} />
          </ToolBtn>
        </div>
        {/* Zone d'édition */}
        <div className="bg-white">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
