import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdminBlog, createBlog, updateBlog, uploadBlogImage } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import RichTextEditor from "../components/editor/RichTextEditor";
import toast from "react-hot-toast";
import { Globe, Clock, ArrowLeft, Image as ImageIcon, X, ChevronDown, ChevronUp, Save, Eye, Loader2 } from "lucide-react";

const CATEGORIES = ["Career Guidance", "Exam Guidance", "Study Abroad", "Stream Selection", "Scholarship", "College Admissions", "Skills & Jobs", "Mental Health", "Other"];

const INITIAL = {
  title: "", excerpt: "", content: "", category: "Career Guidance",
  tags: "", status: "draft", isFeatured: false,
  author: { name: "", bio: "", avatar: "" },
  image: { url: "", publicId: "", alt: "" },
  seo: { metaTitle: "", metaDescription: "", keywords: "" },
};

export default function BlogEditorPage() {
  const { id } = useParams();
  const { admin } = useAuth();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ ...INITIAL, author: { name: admin?.name || "", bio: "", avatar: "" } });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [panels, setPanels] = useState({ seo: false, author: false });
  const [autoSaveTime, setAutoSaveTime] = useState(null);
  const [slug, setSlug] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const autoSaveTimerRef = useRef(null);

  // Load existing blog if editing
  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    getAdminBlog(id)
      .then((res) => {
        const b = res.data.data;
        setForm({
          title: b.title || "",
          excerpt: b.excerpt || "",
          content: b.content || "",
          category: b.category || "Career Guidance",
          tags: (b.tags || []).join(", "),
          status: b.status || "draft",
          isFeatured: b.isFeatured || false,
          author: b.author || { name: admin?.name || "", bio: "", avatar: "" },
          image: b.image || { url: "", publicId: "", alt: "" },
          seo: {
            metaTitle: b.seo?.metaTitle || "",
            metaDescription: b.seo?.metaDescription || "",
            keywords: (b.seo?.keywords || []).join(", "),
          },
        });
        setSlug(b.slug || generateSlug(b.title));
      })
      .catch(() => toast.error("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [id, isEdit, admin]);

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Auto-save draft every 30 seconds
  const autoSaveDraft = useCallback(async () => {
    if (!form.title && !form.content) return;
    if (form.status === "published") return;
    
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        seo: {
          ...form.seo,
          keywords: form.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
        },
      };
      
      if (isEdit) {
        await updateBlog(id, { ...payload, status: "draft" });
        setAutoSaveTime(new Date());
        setIsDirty(false);
      } else if (form.title) {
        const res = await createBlog(payload);
        if (!id) {
          navigate(`/blogs/edit/${res.data.data._id}`, { replace: true });
        }
        setAutoSaveTime(new Date());
        setIsDirty(false);
      }
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  }, [form, id, isEdit, navigate]);

  useEffect(() => {
    if (autoSaveTimerRef.current) clearInterval(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setInterval(() => {
      if (isDirty) autoSaveDraft();
    }, 30000);
    return () => clearInterval(autoSaveTimerRef.current);
  }, [autoSaveDraft, isDirty]);

  // Warn before leaving if unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Mark as dirty when form changes
  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setIsDirty(true);
    if (key === "title" && !isEdit && !form.slug) {
      setSlug(generateSlug(val));
    }
  };

  const setNested = (parent, key, val) => {
    setForm((prev) => ({ ...prev, [parent]: { ...prev[parent], [key]: val } }));
    setIsDirty(true);
  };

  const togglePanel = (key) => setPanels((p) => ({ ...p, [key]: !p[key] }));

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image too large. Max 5MB");
      return;
    }
    setImageUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadBlogImage(formData);
      setForm((prev) => ({ ...prev, image: { ...prev.image, url: res.data.data.url, publicId: res.data.data.publicId } }));
      toast.success("Featured image uploaded!");
      setIsDirty(true);
    } catch { toast.error("Image upload failed"); }
    finally { setImageUploading(false); }
  };

  const save = async (statusOverride) => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.excerpt.trim()) { toast.error("Excerpt is required"); return; }
    if (!form.content || form.content === "<p></p>") { toast.error("Content is required"); return; }

    setSaving(true);
    const payload = {
      ...form,
      slug: slug || generateSlug(form.title),
      status: statusOverride || form.status,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      seo: {
        ...form.seo,
        keywords: form.seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      },
    };

    try {
      if (isEdit) {
        await updateBlog(id, payload);
        toast.success(statusOverride === "published" ? "Blog published!" : "Draft saved!");
        setIsDirty(false);
      } else {
        const res = await createBlog(payload);
        toast.success("Blog created!");
        navigate(`/blogs/edit/${res.data.data._id}`, { replace: true });
        setIsDirty(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally { setSaving(false); }
  };

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#555" }}>Loading editor...</div>;

  return (
    <div style={s.root}>
      {/* Auto-save indicator */}
      {autoSaveTime && !saving && (
        <div style={s.autoSaveIndicator}>
          Draft auto-saved at {autoSaveTime.toLocaleTimeString()}
        </div>
      )}

      {/* Top bar */}
      <div style={s.topBar}>
        <button style={s.backBtn} onClick={() => navigate("/blogs")}>
          <ArrowLeft size={16} /> Back
        </button>
        <div style={s.topTitle}>{isEdit ? "Edit Post" : "New Blog Post"}</div>
        <div style={s.topActions}>
          <button style={s.previewBtn} onClick={() => setPreviewMode(!previewMode)}>
            <Eye size={14} /> {previewMode ? "Edit" : "Preview"}
          </button>
          <button style={s.draftBtn} onClick={() => save("draft")} disabled={saving}>
            <Save size={14} /> {saving ? "Saving…" : "Save Draft"}
          </button>
          <button style={s.publishBtn} onClick={() => save("published")} disabled={saving}>
            <Globe size={14} /> {saving ? "Saving…" : form.status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {previewMode ? (
        // Preview Mode
        <div style={s.previewContainer}>
          <div style={s.previewHeader}>
            <h1>{form.title || "Untitled Post"}</h1>
            <div style={s.previewMeta}>
              <span>By {form.author.name || "Admin"}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          <div style={s.previewContent} dangerouslySetInnerHTML={{ __html: form.content }} />
        </div>
      ) : (
        // Edit Mode
        <div style={s.layout}>
          {/* Main editor area */}
          <div style={s.main}>
            {/* Title */}
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Enter blog post title…"
              style={s.titleInput}
            />

            {/* Slug */}
            <div style={s.fieldGroup}>
              <label style={s.label}>URL Slug</label>
              <div style={s.slugPreview}>
                counselorscafe.com/blog/
                <input
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="post-url-slug"
                  style={s.slugInput}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div style={s.fieldGroup}>
              <label style={s.label}>Excerpt <span style={s.hint}>(shown on blog listing page)</span></label>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Write a compelling 1-2 sentence summary of this post…"
                rows={3}
                style={{ ...s.textarea, resize: "vertical" }}
                maxLength={500}
              />
              <div style={s.charCount}>{form.excerpt.length}/500</div>
            </div>

            {/* Content Editor */}
            <div style={s.fieldGroup}>
              <label style={s.label}>Content</label>
              <RichTextEditor
                content={form.content}
                onChange={(html) => set("content", html)}
              />
            </div>
          </div>

          {/* Sidebar - same as before */}
          <div style={s.sidebar}>
            {/* Publish settings */}
            <div style={s.panel}>
              <div style={s.panelTitle}>Publish Settings</div>

              <div style={s.fieldGroup}>
                <label style={s.label}>Status</label>
                <select value={form.status} onChange={(e) => set("status", e.target.value)} style={s.select}>
                  <option value="draft">🕐 Draft</option>
                  <option value="published">🌐 Published</option>
                  <option value="archived">📦 Archived</option>
                </select>
              </div>

              {/* Featured toggle */}
              <div style={s.toggleRow}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#d0d0d0" }}>⭐ Featured Post</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>Show on homepage highlights</div>
                </div>
                <div
                  style={{ ...s.toggle, background: form.isFeatured ? "#f5c518" : "#2a2a2a" }}
                  onClick={() => set("isFeatured", !form.isFeatured)}
                >
                  <div style={{ ...s.toggleThumb, transform: form.isFeatured ? "translateX(18px)" : "translateX(2px)" }} />
                </div>
              </div>

              <button style={s.publishBtnFull} onClick={() => save("published")} disabled={saving}>
                <Globe size={15} /> {saving ? "Saving…" : form.status === "published" ? "Update Post" : "Publish Now"}
              </button>
              <button style={s.draftBtnFull} onClick={() => save("draft")} disabled={saving}>
                <Clock size={14} /> Save as Draft
              </button>
            </div>

            {/* Category & Tags */}
            <div style={s.panel}>
              <div style={s.panelTitle}>Category & Tags</div>
              <div style={s.fieldGroup}>
                <label style={s.label}>Category</label>
                <select value={form.category} onChange={(e) => set("category", e.target.value)} style={s.select}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.label}>Tags <span style={s.hint}>(comma separated)</span></label>
                <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="CUET, JEE, Career, 2025…" style={s.input} />
              </div>
            </div>

            {/* Featured Image */}
            <div style={s.panel}>
              <div style={s.panelTitle}>Featured Image</div>
              {form.image?.url ? (
                <div style={{ position: "relative" }}>
                  <img src={form.image.url} alt="Featured" style={s.featuredImg} />
                  <button style={s.removeImgBtn} onClick={() => setNested("image", "url", "")}><X size={14} /></button>
                  <input
                    value={form.image.alt}
                    onChange={(e) => setNested("image", "alt", e.target.value)}
                    placeholder="Alt text for SEO"
                    style={{ ...s.input, marginTop: 8 }}
                  />
                </div>
              ) : (
                <label style={s.uploadZone}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                  <ImageIcon size={24} color="#555" />
                  <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>
                    {imageUploading ? <Loader2 style={{ animation: "spin 1s linear infinite" }} /> : "Click to upload image"}
                  </div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>JPG, PNG, WebP · Max 5MB</div>
                </label>
              )}
              <div style={s.fieldGroup}>
                <label style={s.label}>Or paste image URL</label>
                <input
                  value={form.image?.url || ""}
                  onChange={(e) => setNested("image", "url", e.target.value)}
                  placeholder="https://images.unsplash.com/…"
                  style={s.input}
                />
              </div>
            </div>

            {/* Author */}
            <div style={s.panel}>
              <button style={s.collapseBtn} onClick={() => togglePanel("author")}>
                <span>Author Details</span>
                {panels.author ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {panels.author && (
                <div style={{ marginTop: 12 }}>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Author Name</label>
                    <input value={form.author.name} onChange={(e) => setNested("author", "name", e.target.value)} placeholder="Dr. Priya Sharma" style={s.input} />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Author Bio</label>
                    <textarea value={form.author.bio} onChange={(e) => setNested("author", "bio", e.target.value)} placeholder="Career counsellor with 10+ years…" rows={2} style={s.textarea} />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Avatar URL <span style={s.hint}>(optional)</span></label>
                    <input value={form.author.avatar} onChange={(e) => setNested("author", "avatar", e.target.value)} placeholder="https://…" style={s.input} />
                  </div>
                </div>
              )}
            </div>

            {/* SEO */}
            <div style={s.panel}>
              <button style={s.collapseBtn} onClick={() => togglePanel("seo")}>
                <span>SEO Settings</span>
                {panels.seo ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {panels.seo && (
                <div style={{ marginTop: 12 }}>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Meta Title <span style={s.hint}>({form.seo.metaTitle.length}/60)</span></label>
                    <input
                      value={form.seo.metaTitle}
                      onChange={(e) => setNested("seo", "metaTitle", e.target.value)}
                      placeholder="Leave blank to use post title"
                      maxLength={60}
                      style={s.input}
                    />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Meta Description <span style={s.hint}>({form.seo.metaDescription.length}/160)</span></label>
                    <textarea
                      value={form.seo.metaDescription}
                      onChange={(e) => setNested("seo", "metaDescription", e.target.value)}
                      placeholder="Leave blank to use excerpt"
                      maxLength={160}
                      rows={3}
                      style={s.textarea}
                    />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Keywords <span style={s.hint}>(comma separated)</span></label>
                    <input
                      value={form.seo.keywords}
                      onChange={(e) => setNested("seo", "keywords", e.target.value)}
                      placeholder="career counselling, CUET 2025…"
                      style={s.input}
                    />
                  </div>
                  {/* Google preview */}
                  <div style={s.seoPreview}>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, fontWeight: 600 }}>GOOGLE PREVIEW</div>
                    <div style={{ color: "#4285f4", fontSize: 14, fontWeight: 500, marginBottom: 2 }}>
                      {form.seo.metaTitle || form.title || "Post title will appear here"}
                    </div>
                    <div style={{ color: "#006621", fontSize: 11, marginBottom: 4 }}>
                      counselorscafe.com/blog/{slug || "post-slug"}
                    </div>
                    <div style={{ color: "#545454", fontSize: 12, lineHeight: 1.5 }}>
                      {form.seo.metaDescription || form.excerpt || "Your excerpt or meta description will appear here in Google search results."}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  root: { maxWidth: 1400, margin: "0 auto" },
  autoSaveIndicator: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#1a1a1a",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 11,
    color: "#888",
    zIndex: 100,
  },
  topBar: {
    display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
    background: "#111", border: "1px solid #1e1e1e", borderRadius: 12,
    padding: "12px 16px", flexWrap: "wrap",
  },
  backBtn: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 13, fontWeight: 600 },
  topTitle: { flex: 1, fontSize: 16, fontWeight: 700, color: "#f0f0f0" },
  topActions: { display: "flex", gap: 8 },
  previewBtn: { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  draftBtn: { display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  publishBtn: { display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#f5c518", border: "none", borderRadius: 8, color: "#0a0a0a", fontWeight: 700, fontSize: 13, cursor: "pointer" },
  layout: { display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "flex-start" },
  main: { display: "flex", flexDirection: "column", gap: 16 },
  sidebar: { display: "flex", flexDirection: "column", gap: 14, position: "sticky", top: 80 },
  titleInput: {
    width: "100%", padding: "16px 18px", background: "#111",
    border: "1px solid #1e1e1e", borderRadius: 12, color: "#f0f0f0",
    fontSize: 24, fontWeight: 700, lineHeight: 1.3,
  },
  slugPreview: {
    display: "flex", alignItems: "center", flexWrap: "wrap",
    background: "#1a1a1a", borderRadius: 8, padding: "8px 12px",
    fontSize: 13, color: "#888", gap: 6,
  },
  slugInput: {
    flex: 1, background: "transparent", border: "none", color: "#f0f0f0",
    outline: "none", fontSize: 13, minWidth: 150,
  },
  panel: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 16 },
  panelTitle: { fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 },
  fieldGroup: { marginBottom: 14 },
  label: { display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" },
  hint: { textTransform: "none", fontWeight: 400, color: "#444" },
  input: { width: "100%", padding: "9px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13 },
  textarea: { width: "100%", padding: "9px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13, resize: "none" },
  select: { width: "100%", padding: "9px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13 },
  charCount: { fontSize: 11, color: "#444", textAlign: "right", marginTop: 4 },
  toggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid #1a1a1a" },
  toggle: { width: 40, height: 22, borderRadius: 11, cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 },
  toggleThumb: { position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "#fff", top: 2, transition: "transform 0.2s" },
  publishBtnFull: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "10px", background: "#f5c518", border: "none", borderRadius: 10, color: "#0a0a0a", fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 8 },
  draftBtnFull: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "9px", background: "transparent", border: "1px solid #2a2a2a", borderRadius: 10, color: "#888", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  featuredImg: { width: "100%", height: 140, objectFit: "cover", borderRadius: 8 },
  removeImgBtn: { position: "absolute", top: 6, right: 6, width: 26, height: 26, background: "rgba(0,0,0,0.7)", border: "none", borderRadius: 6, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },
  uploadZone: {
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "24px 16px", border: "1px dashed #2a2a2a", borderRadius: 10,
    cursor: "pointer", marginBottom: 10, transition: "border-color 0.2s",
  },
  collapseBtn: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: "#888", cursor: "pointer", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em", width: "100%" },
  seoPreview: { background: "#fff", borderRadius: 8, padding: "12px 14px", marginTop: 12 },
  previewContainer: { background: "#fff", borderRadius: 12, padding: 40, minHeight: "calc(100vh - 200px)", color: "#333" },
  previewHeader: { textAlign: "center", marginBottom: 32, borderBottom: "1px solid #eee", paddingBottom: 20 },
  previewMeta: { fontSize: 14, color: "#666", marginTop: 12, display: "flex", gap: 8, justifyContent: "center" },
  previewContent: { fontSize: 16, lineHeight: 1.8, color: "#333" },
};