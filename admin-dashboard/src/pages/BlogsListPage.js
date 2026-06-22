import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminBlogs, deleteBlog, updateBlogStatus, toggleBlogFeatured } from "../lib/api";
import toast from "react-hot-toast";
import { PlusCircle, Search, Eye, Edit3, Trash2, Star, Globe, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "archived", label: "Archived" },
];

const CATEGORIES = ["All", "Career Guidance", "Exam Guidance", "Study Abroad", "Stream Selection", "Scholarship", "College Admissions", "Skills & Jobs", "Mental Health", "Other"];

export default function BlogsListPage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    const params = { page, limit: 15 };
    if (status !== "all") params.status = status;
    if (category !== "All") params.category = category;
    if (search) params.search = search;

    getAdminBlogs(params)
      .then((res) => { setBlogs(res.data.data); setPagination(res.data.pagination || {}); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status, category, page, search]);

  useEffect(() => { load(); }, [load]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      toast.success("Blog deleted");
      setDeleteId(null);
      load();
    } catch { toast.error("Delete failed"); }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateBlogStatus(id, newStatus);
      toast.success(`Blog ${newStatus}`);
      load();
    } catch { toast.error("Status update failed"); }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await toggleBlogFeatured(id);
      toast.success("Featured status updated");
      load();
    } catch { toast.error("Update failed"); }
  };

  return (
    <div>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Blog Posts</h1>
          <p style={s.sub}>{pagination.total || 0} total posts</p>
        </div>
        <button style={s.newBtn} onClick={() => navigate("/blogs/new")}>
          <PlusCircle size={16} /> New Post
        </button>
      </div>

      {/* Filters */}
      <div style={s.filterBar}>
        {/* Status tabs */}
        <div style={s.tabs}>
          {STATUS_TABS.map((t) => (
            <button key={t.value} style={{ ...s.tab, ...(status === t.value ? s.tabActive : {}) }} onClick={() => { setStatus(t.value); setPage(1); }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={s.rightFilters}>
          {/* Category */}
          <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} style={s.select}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Search */}
          <div style={s.searchWrap}>
            <Search size={14} style={s.searchIcon} />
            <input value={search} onChange={handleSearch} placeholder="Search posts..." style={s.searchInput} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={s.card}>
        {loading ? (
          <div style={s.loadingWrap}>Loading posts...</div>
        ) : blogs.length === 0 ? (
          <div style={s.emptyState}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
            <div style={{ color: "#f0f0f0", fontWeight: 600, marginBottom: 6 }}>No posts found</div>
            <div style={{ color: "#555", fontSize: 13 }}>Try changing your filters or write a new post.</div>
          </div>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {["Title", "Category", "Author", "Status", "Views", "Date", "Actions"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} style={s.tr}>
                  <td style={{ ...s.td, maxWidth: 280 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {blog.image?.url && (
                        <img src={blog.image.url} alt="" style={s.thumb} />
                      )}
                      <div style={{ minWidth: 0 }}>
                        <div style={s.blogTitle} className="truncate">{blog.title}</div>
                        {blog.isFeatured && (
                          <span style={s.featuredBadge}><Star size={10} /> Featured</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={s.td}>
                    <span style={s.catBadge}>{blog.category}</span>
                  </td>
                  <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{blog.author?.name}</td>
                  <td style={s.td}>
                    <StatusBadge status={blog.status} />
                  </td>
                  <td style={{ ...s.td, color: "#888" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Eye size={12} /> {blog.views}
                    </span>
                  </td>
                  <td style={{ ...s.td, color: "#555", fontSize: 12 }}>
                    {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                  </td>
                  <td style={s.td}>
                    <div style={s.actions}>
                      <ActionBtn icon={Edit3} title="Edit" color="#3b82f6" onClick={() => navigate(`/blogs/edit/${blog._id}`)} />
                      <ActionBtn icon={Star} title={blog.isFeatured ? "Unfeature" : "Feature"} color={blog.isFeatured ? "#f5c518" : "#555"} onClick={() => handleToggleFeatured(blog._id)} />
                      {blog.status !== "published" && (
                        <ActionBtn icon={Globe} title="Publish" color="#22c55e" onClick={() => handleStatusChange(blog._id, "published")} />
                      )}
                      {blog.status === "published" && (
                        <ActionBtn icon={Clock} title="To Draft" color="#f59e0b" onClick={() => handleStatusChange(blog._id, "draft")} />
                      )}
                      <ActionBtn icon={Trash2} title="Delete" color="#ef4444" onClick={() => setDeleteId(blog._id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div style={s.pagination}>
          <button style={s.pageBtn} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span style={{ color: "#888", fontSize: 13 }}>Page {page} of {pagination.pages}</span>
          <button style={s.pageBtn} disabled={page >= pagination.pages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div style={s.modalOverlay}>
          <div style={s.modal}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ color: "#f0f0f0", marginBottom: 8 }}>Delete this blog?</h3>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>This action is permanent and cannot be undone.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={s.cancelBtn} onClick={() => setDeleteId(null)}>Cancel</button>
              <button style={s.deleteBtn} onClick={() => handleDelete(deleteId)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { published: ["#22c55e", "Published"], draft: ["#f59e0b", "Draft"], archived: ["#555", "Archived"] };
  const [color, label] = map[status] || ["#555", status];
  return <span style={{ ...s.statusBadge, color, background: color + "15", border: `1px solid ${color}30` }}>{label}</span>;
}

function ActionBtn({ icon: Icon, title, color, onClick }) {
  return (
    <button title={title} onClick={onClick} style={{ ...s.actionBtn, color }}>
      <Icon size={14} />
    </button>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 4 },
  sub: { color: "#555", fontSize: 13 },
  newBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#f5c518", border: "none", borderRadius: 10, color: "#0a0a0a", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  filterBar: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" },
  tabs: { display: "flex", gap: 2, background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: 4 },
  tab: { padding: "6px 14px", borderRadius: 7, border: "none", background: "transparent", color: "#888", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s" },
  tabActive: { background: "#f5c518", color: "#0a0a0a", fontWeight: 700 },
  rightFilters: { display: "flex", gap: 10, marginLeft: "auto", flexWrap: "wrap" },
  select: { width: 160, padding: "7px 12px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13 },
  searchWrap: { position: "relative" },
  searchIcon: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#555" },
  searchInput: { paddingLeft: 32, width: 220, padding: "7px 12px 7px 32px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13 },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden" },
  loadingWrap: { padding: "60px 20px", textAlign: "center", color: "#555" },
  emptyState: { padding: "60px 20px", textAlign: "center" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1e1e1e", whiteSpace: "nowrap" },
  tr: { borderBottom: "1px solid #161616", transition: "background 0.1s" },
  td: { padding: "12px 16px", fontSize: 13, color: "#d0d0d0", verticalAlign: "middle" },
  thumb: { width: 40, height: 30, objectFit: "cover", borderRadius: 6, flexShrink: 0 },
  blogTitle: { fontWeight: 600, color: "#e0e0e0", fontSize: 13, maxWidth: 220 },
  featuredBadge: { display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, color: "#f5c518", background: "rgba(245,197,24,0.1)", borderRadius: 4, padding: "2px 6px", marginTop: 3 },
  catBadge: { fontSize: 11, color: "#888", background: "#1a1a1a", borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap" },
  statusBadge: { fontSize: 11, fontWeight: 600, borderRadius: 6, padding: "3px 9px" },
  actions: { display: "flex", gap: 4 },
  actionBtn: { background: "none", border: "none", cursor: "pointer", padding: "5px", borderRadius: 6, display: "flex", alignItems: "center", transition: "background 0.15s" },
  pagination: { display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 },
  pageBtn: { padding: "7px 14px", background: "#111", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", cursor: "pointer", fontSize: 13, fontWeight: 600 },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 20, padding: 32, textAlign: "center", maxWidth: 360 },
  cancelBtn: { flex: 1, padding: "10px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#f0f0f0", cursor: "pointer", fontWeight: 600 },
  deleteBtn: { flex: 1, padding: "10px", background: "#ef4444", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontWeight: 700 },
};
