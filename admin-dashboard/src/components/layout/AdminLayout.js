import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard, FileText, MessageSquare, Users,
  Settings, LogOut, Menu, X, Coffee, ChevronRight,
  PlusCircle, Star
} from "lucide-react";

const NAV = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/blogs", icon: FileText, label: "Blog Posts" },
  { to: "/contacts", icon: MessageSquare, label: "Contacts" },
  { to: "/users", icon: Users, label: "Admin Users" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={s.root}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={s.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside style={{ ...s.sidebar, ...(sidebarOpen ? s.sidebarOpen : {}) }}>
        {/* Logo */}
        <div style={s.logo}>
          <div style={s.logoIcon}><Coffee size={20} color="#0a0a0a" /></div>
          <div>
            <div style={s.logoText}>CC Admin</div>
            <div style={s.logoSub}>Content Management</div>
          </div>
        </div>

        {/* Quick action */}
        <button style={s.newPostBtn} onClick={() => { navigate("/blogs/new"); setSidebarOpen(false); }}>
          <PlusCircle size={15} />
          New Blog Post
        </button>

        {/* Nav */}
        <nav style={s.nav}>
          {NAV.map(({ to, icon: Icon, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              style={({ isActive }) => ({ ...s.navLink, ...(isActive ? s.navLinkActive : {}) })}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={16} />
              <span>{label}</span>
              <ChevronRight size={13} style={{ marginLeft: "auto", opacity: 0.4 }} />
            </NavLink>
          ))}
        </nav>

        {/* Admin info + logout */}
        <div style={s.sidebarBottom}>
          <div style={s.adminInfo}>
            <div style={s.adminAvatar}>{admin?.name?.[0]?.toUpperCase() || "A"}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#f0f0f0" }} className="truncate">{admin?.name}</div>
              <div style={{ fontSize: 11, color: "#666" }} className="truncate">{admin?.role}</div>
            </div>
          </div>
          <button style={s.logoutBtn} onClick={handleLogout}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={s.main}>
        {/* Topbar */}
        <header style={s.topbar}>
          <button style={s.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
            <a href="http://localhost:3000/blog" target="_blank" rel="noreferrer" style={s.viewSiteBtn}>
              View Site ↗
            </a>
            <div style={s.adminBadge}>
              <Star size={12} color="#f5c518" />
              {admin?.role}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={s.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const s = {
  root: { display: "flex", minHeight: "100vh", background: "#0a0a0a" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 99, display: "none", "@media(maxWidth:768px)": { display: "block" } },
  sidebar: {
    width: 240, background: "#111", borderRight: "1px solid #1e1e1e",
    display: "flex", flexDirection: "column", position: "fixed",
    top: 0, left: 0, bottom: 0, zIndex: 100,
    transition: "transform 0.25s ease",
  },
  sidebarOpen: { transform: "translateX(0)" },
  logo: { padding: "20px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #1e1e1e" },
  logoIcon: { width: 36, height: 36, background: "#f5c518", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  logoText: { fontSize: 15, fontWeight: 700, color: "#f0f0f0" },
  logoSub: { fontSize: 10, color: "#555", marginTop: 1 },
  newPostBtn: {
    margin: "12px 12px 4px", padding: "9px 14px",
    background: "rgba(245,197,24,0.1)", border: "1px solid rgba(245,197,24,0.25)",
    borderRadius: 8, color: "#f5c518", fontWeight: 600, fontSize: 13,
    display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
    transition: "background 0.2s",
  },
  nav: { flex: 1, padding: "8px 8px", overflowY: "auto" },
  navLink: {
    display: "flex", alignItems: "center", gap: 10, padding: "9px 10px",
    borderRadius: 8, color: "#888", fontSize: 13.5, fontWeight: 500,
    transition: "all 0.15s", marginBottom: 2,
  },
  navLinkActive: { background: "rgba(245,197,24,0.1)", color: "#f5c518" },
  sidebarBottom: { borderTop: "1px solid #1e1e1e", padding: 12 },
  adminInfo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10 },
  adminAvatar: {
    width: 34, height: 34, borderRadius: 8, background: "#f5c518",
    color: "#0a0a0a", fontWeight: 700, fontSize: 14,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  logoutBtn: {
    width: "100%", padding: "8px 12px", background: "transparent",
    border: "1px solid #2a2a2a", borderRadius: 8, color: "#888",
    display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500,
    cursor: "pointer", transition: "all 0.15s",
  },
  main: { flex: 1, marginLeft: 240, display: "flex", flexDirection: "column", minHeight: "100vh" },
  topbar: {
    height: 56, background: "#111", borderBottom: "1px solid #1e1e1e",
    display: "flex", alignItems: "center", padding: "0 20px",
    position: "sticky", top: 0, zIndex: 50,
  },
  menuBtn: { background: "none", border: "none", color: "#888", display: "flex", alignItems: "center" },
  viewSiteBtn: {
    fontSize: 12, color: "#888", border: "1px solid #2a2a2a",
    borderRadius: 6, padding: "5px 10px",
  },
  adminBadge: {
    display: "flex", alignItems: "center", gap: 5, fontSize: 11,
    color: "#f5c518", background: "rgba(245,197,24,0.1)",
    border: "1px solid rgba(245,197,24,0.2)", borderRadius: 6, padding: "4px 9px",
    fontWeight: 600, textTransform: "capitalize",
  },
  content: { flex: 1, padding: 24, overflowX: "hidden" },
};
