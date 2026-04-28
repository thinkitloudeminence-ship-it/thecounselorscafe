import React, { useCallback, useEffect, useState } from "react";
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
      padding: "6px 10px",
      minWidth: 32,
      borderRadius: 6,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      background: active ? "rgba(245,197,24,0.15)" : "transparent",
      color: active ? "#f5c518" : "#888",
      fontWeight: active ? 600 : 400,
      fontSize: 13,
      transition: "all 0.15s",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </button>
);

const Divider = () => <div style={{ width: 1, height: 24, background: "#2a2a2a", margin: "0 6px" }} />;

export default function RichTextEditor({ content, onChange }) {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "editor-link", target: "_blank", rel: "noopener noreferrer" },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({
        placeholder: "Start writing your blog post here… Use H2 for main sections, H3 for sub-sections. Add images, links, and lists to make it engaging.",
      }),
      Youtube.configure({ controls: true, modestbranding: true, rel: 0 }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "rich-text-editor",
        style: "min-height: 500px; outline: none; padding: 20px; line-height: 1.8;",
      },
      handlePaste: (view, event, slice) => {
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const chars = text.length;
      setWordCount(words);
      setCharCount(chars);
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Inject styles on mount (important for production)
  useEffect(() => {
    const styleId = "tiptap-editor-styles";
    if (!document.getElementById(styleId)) {
      const styleTag = document.createElement("style");
      styleTag.id = styleId;
      styleTag.textContent = `
        .rich-text-editor {
          min-height: 500px;
          outline: none;
          padding: 24px;
          line-height: 1.8;
          color: #e0e0e0;
        }
        .rich-text-editor p {
          margin-bottom: 1em;
        }
        .rich-text-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em;
          color: #f0f0f0;
        }
        .rich-text-editor h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.8em 0 0.4em;
          color: #f0f0f0;
          border-bottom: 1px solid #2a2a2a;
          padding-bottom: 8px;
        }
        .rich-text-editor h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.6em 0 0.3em;
          color: #f0f0f0;
        }
        .rich-text-editor ul, .rich-text-editor ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
        }
        .rich-text-editor li {
          margin: 0.25em 0;
        }
        .rich-text-editor blockquote {
          border-left: 3px solid #f5c518;
          margin: 1em 0;
          padding-left: 1em;
          color: #aaa;
          font-style: italic;
        }
        .rich-text-editor code {
          background: #1a1a1a;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.9em;
        }
        .rich-text-editor pre {
          background: #1a1a1a;
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }
        .rich-text-editor pre code {
          background: none;
          padding: 0;
        }
        .rich-text-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
        }
        .rich-text-editor a {
          color: #f5c518;
          text-decoration: underline;
        }
        .rich-text-editor hr {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #2a2a2a, transparent);
          margin: 2em 0;
        }
        .rich-text-editor .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #444;
          pointer-events: none;
          height: 0;
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, []);

  const setLink = useCallback(() => {
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    let finalUrl = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      finalUrl = "https://" + url;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: finalUrl }).run();
  }, [editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image too large. Max 5MB");
        return;
      }
      const formData = new FormData();
      formData.append("image", file);
      toast.promise(
        uploadBlogImage(formData).then((res) => {
          editor.chain().focus().setImage({ src: res.data.data.url, alt: file.name, title: file.name }).run();
        }),
        { loading: "Uploading image...", success: "Image inserted!", error: "Upload failed" }
      );
    };
    input.click();
  }, [editor]);

  const addYoutube = useCallback(() => {
    const url = window.prompt("Enter YouTube URL (e.g., https://youtu.be/... or https://youtube.com/watch?v=...):");
    if (url) {
      editor.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rich-text-editor-wrapper" style={s.wrap}>
      {/* Sticky Toolbar */}
      <div className="rich-text-editor-toolbar" style={s.toolbar}>
        <div style={s.toolbarInner}>
          {/* Headings */}
          <select
            onChange={(e) => {
              const value = e.target.value;
              if (value === "paragraph") editor.chain().focus().setParagraph().run();
              else if (value === "h1") editor.chain().focus().setHeading({ level: 1 }).run();
              else if (value === "h2") editor.chain().focus().setHeading({ level: 2 }).run();
              else if (value === "h3") editor.chain().focus().setHeading({ level: 3 }).run();
              else if (value === "h4") editor.chain().focus().setHeading({ level: 4 }).run();
            }}
            style={s.headingSelect}
            value={
              editor.isActive("heading", { level: 1 }) ? "h1" :
              editor.isActive("heading", { level: 2 }) ? "h2" :
              editor.isActive("heading", { level: 3 }) ? "h3" :
              editor.isActive("heading", { level: 4 }) ? "h4" :
              editor.isActive("paragraph") ? "paragraph" : "paragraph"
            }
          >
            <option value="paragraph">Normal</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>

          <Divider />

          {/* Formatting */}
          <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold (Ctrl+B)"><b>B</b></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic (Ctrl+I)"><i>I</i></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline (Ctrl+U)"><u>U</u></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><s>S</s></ToolBtn>

          <Divider />

          {/* Lists */}
          <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet list">• List</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered list">1. List</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">" Quote</ToolBtn>

          <Divider />

          {/* Links & Media */}
          <ToolBtn onClick={setLink} active={editor.isActive("link")} title="Insert link">🔗 Link</ToolBtn>
          <ToolBtn onClick={addImage} title="Insert image">🖼️ Image</ToolBtn>
          <ToolBtn onClick={addYoutube} title="Embed YouTube">▶️ YouTube</ToolBtn>

          <Divider />

          {/* Utilities */}
          <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">↩ Undo</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (Ctrl+Shift+Z)">↪ Redo</ToolBtn>

          {/* Word & Character Count */}
          <div style={s.stats}>
            <span title="Words">{wordCount} words</span>
            <span style={{ marginLeft: 12 }} title="Characters">{charCount} chars</span>
          </div>
        </div>
      </div>

      {/* Editor Content with scroll */}
      <div className="rich-text-editor-scroll" style={s.scrollContainer}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

const s = {
  wrap: { 
    border: "1px solid #2a2a2a", 
    borderRadius: 12, 
    overflow: "hidden", 
    background: "#0f0f0f",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  toolbar: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: "#111",
    borderBottom: "1px solid #2a2a2a",
    overflowX: "auto",
    overflowY: "hidden",
    flexShrink: 0,
  },
  toolbarInner: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 2,
    padding: "8px 12px",
    minWidth: "min-content",
  },
  headingSelect: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 6,
    padding: "5px 8px",
    color: "#f0f0f0",
    fontSize: 13,
    cursor: "pointer",
  },
  stats: {
    marginLeft: "auto",
    fontSize: 11,
    color: "#555",
    fontStyle: "italic",
    paddingLeft: 16,
    whiteSpace: "nowrap",
  },
  scrollContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    minHeight: 400,
    maxHeight: "calc(100vh - 200px)",
  },
};