import React, { useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Youtube from "@tiptap/extension-youtube";
import { uploadBlogImage } from "../../lib/api";
import toast from "react-hot-toast";

const ToolBtn = ({ onClick, active, title, children, disabled }) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    style={{
      padding: "5px 8px", minWidth: 30, borderRadius: 6, border: "none", cursor: disabled ? "not-allowed" : "pointer",
      background: active ? "rgba(245,197,24,0.2)" : "transparent",
      color: active ? "#f5c518" : "#888",
      fontWeight: active ? 700 : 400, fontSize: 13,
      transition: "all 0.15s", display: "inline-flex", alignItems: "center", justifyContent: "center",
    }}
  >
    {children}
  </button>
);

const Divider = () => <div style={{ width: 1, height: 20, background: "#2a2a2a", margin: "0 4px" }} />;

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "editor-link" } }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: "Start writing your blog post here… Use H2 for main sections, H3 for sub-sections. Add images, links, and lists to make it engaging." }),
      Youtube.configure({ controls: true }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const setLink = useCallback(() => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", prev || "https://");
    if (url === null) return;
    if (url === "") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);
      toast.promise(
        uploadBlogImage(formData).then((res) => {
          editor.chain().focus().setImage({ src: res.data.data.url, alt: file.name }).run();
        }),
        { loading: "Uploading...", success: "Image inserted!", error: "Upload failed" }
      );
    };
    input.click();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("Enter YouTube URL:");
    if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div style={s.wrap}>
      {/* Toolbar */}
      <div style={s.toolbar}>
        {/* Headings */}
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">H1</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">H3</ToolBtn>

        <Divider />

        {/* Formatting */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><b>B</b></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><i>I</i></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><u>U</u></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><s>S</s></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline code">{"<>"}</ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">• ≡</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered list">1. ≡</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">❝</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code block">{"{ }"}</ToolBtn>

        <Divider />

        {/* Links & Media */}
        <ToolBtn onClick={setLink} active={editor.isActive("link")} title="Insert link">🔗</ToolBtn>
        <ToolBtn onClick={addImage} title="Insert image">🖼️</ToolBtn>
        <ToolBtn onClick={addYoutube} title="Embed YouTube">▶️</ToolBtn>

        <Divider />

        {/* Utilities */}
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">—</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</ToolBtn>

        {/* Word count */}
        <div style={s.wordCount}>
          {editor.storage.characterCount?.words?.() || editor.getText().split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} style={s.editorBody} />
    </div>
  );
}

const s = {
  wrap: { border: "1px solid #2a2a2a", borderRadius: 12, overflow: "hidden", background: "#0f0f0f" },
  toolbar: {
    display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center",
    padding: "8px 10px", borderBottom: "1px solid #2a2a2a",
    background: "#111", position: "sticky", top: 56, zIndex: 10,
  },
  wordCount: { marginLeft: "auto", fontSize: 11, color: "#444", fontStyle: "italic" },
  editorBody: { minHeight: 450, cursor: "text" },
};
