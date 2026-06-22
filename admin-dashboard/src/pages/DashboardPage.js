import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { FileText, Eye, MessageSquare, TrendingUp, PlusCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const { admin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) return <Loading />;

  const cards = [
    { label: "Total Blogs", value: stats?.blogs?.total || 0, sub: `${stats?.blogs?.published || 0} published`, icon: FileText, color: "#3b82f6" },
    { label: "Draft Posts", value: stats?.blogs?.draft || 0, sub: "Awaiting publish", icon: Clock, color: "#f59e0b" },
    { label: "Total Views", value: (stats?.totalViews || 0).toLocaleString(), sub: "Across all blogs", icon: Eye, color: "#22c55e" },
    { label: "New Messages", value: stats?.contacts?.new || 0, sub: `${stats?.contacts?.total || 0} total contacts`, icon: MessageSquare, color: "#f5c518" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>{greet}, {admin?.name?.split(" ")[0]} 👋</h1>
          <p style={s.sub}>Here's what's happening with your website today.</p>
        </div>
        <button style={s.newBtn} onClick={() => navigate("/blogs/new")}>
          <PlusCircle size={16} />
          New Post
        </button>
      </div>

      {/* Stats Cards */}
      <div style={s.grid4}>
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      {/* Recent Blogs + Quick Publish */}
      <div style={s.grid2}>
        {/* Recent blogs */}
        <div style={s.card}>
          <div style={s.cardHeader}>
            <span style={s.cardTitle}>Recent Blog Posts</span>
            <button style={s.textBtn} onClick={() => navigate("/blogs")}>View all →</button>
          </div>
          <div>
            {stats?.recentBlogs?.length === 0 && (
              <EmptyState text="No blogs yet. Create your first post!" />
            )}
            {stats?.recentBlogs?.map((blog) => (
              <div key={blog._id} style={s.blogRow} onClick={() => navigate(`/blogs/edit/${blog._id}`)}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={s.blogTitle} className="truncate">{blog.title}</div>
                  <div style={s.blogMeta}>
                    {formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}
                    <span style={{ margin: "0 6px" }}>·</span>
                    <span style={{ color: blog.status === "published" ? "#22c55e" : blog.status === "draft" ? "#f59e0b" : "#888" }}>
                      {blog.status}
                    </span>
                  </div>
                </div>
                <div style={s.blogViews}><Eye size={11} /> {blog.views}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={s.card}>
          <div style={s.cardTitle}>Quick Actions</div>
          <div style={{ marginTop: 16 }}>
            {[
              { icon: PlusCircle, label: "Write New Blog Post", sub: "Start from scratch", path: "/blogs/new", color: "#f5c518" },
              { icon: FileText, label: "Manage All Posts", sub: `${stats?.blogs?.total || 0} total posts`, path: "/blogs", color: "#3b82f6" },
              { icon: MessageSquare, label: "View Contact Messages", sub: `${stats?.contacts?.new || 0} unread`, path: "/contacts", color: "#22c55e" },
            ].map((a) => (
              <button key={a.path} style={s.quickAction} onClick={() => navigate(a.path)}>
                <div style={{ ...s.qaIcon, background: a.color + "18", color: a.color }}>
                  <a.icon size={18} />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#f0f0f0" }}>{a.label}</div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{a.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Tips */}
          <div style={s.tip}>
            <TrendingUp size={14} color="#f5c518" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#f5c518" }}>SEO Tip</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>Fill in Meta Title & Description for every post to improve Google ranking.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon: Icon, color }) {
  return (
    <div style={s.statCard}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={s.statLabel}>{label}</div>
          <div style={s.statValue}>{value}</div>
          <div style={s.statSub}>{sub}</div>
        </div>
        <div style={{ ...s.statIcon, background: color + "18", color }}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return <div style={{ textAlign: "center", padding: "30px 0", color: "#444", fontSize: 13 }}>{text}</div>;
}

function Loading() {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ ...s.statCard, width: "calc(25% - 12px)", animation: "pulse 1.5s infinite", background: "#1a1a1a" }} />
      ))}
    </div>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 },
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 4 },
  sub: { color: "#555", fontSize: 14 },
  newBtn: {
    display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
    background: "#f5c518", border: "none", borderRadius: 10,
    color: "#0a0a0a", fontWeight: 700, fontSize: 14, cursor: "pointer",
  },
  grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  statCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: 20 },
  statLabel: { fontSize: 12, color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 },
  statValue: { fontSize: 30, fontWeight: 800, color: "#f0f0f0", lineHeight: 1 },
  statSub: { fontSize: 12, color: "#555", marginTop: 4 },
  statIcon: { width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: 20 },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: "#f0f0f0" },
  textBtn: { background: "none", border: "none", color: "#f5c518", fontSize: 12, cursor: "pointer", fontWeight: 600 },
  blogRow: { display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #1a1a1a", cursor: "pointer" },
  blogTitle: { fontSize: 13.5, fontWeight: 600, color: "#e0e0e0" },
  blogMeta: { fontSize: 11, color: "#555", marginTop: 2 },
  blogViews: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#555", whiteSpace: "nowrap" },
  quickAction: {
    display: "flex", alignItems: "center", gap: 14, padding: "12px 0",
    background: "none", border: "none", borderBottom: "1px solid #1a1a1a",
    cursor: "pointer", width: "100%",
  },
  qaIcon: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  tip: { display: "flex", gap: 10, marginTop: 20, padding: 12, background: "rgba(245,197,24,0.05)", borderRadius: 10, border: "1px solid rgba(245,197,24,0.1)" },
};
