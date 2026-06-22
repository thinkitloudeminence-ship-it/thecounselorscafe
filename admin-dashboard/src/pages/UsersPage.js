import React, { useEffect, useState } from "react";
import { getAdminUsers, createAdminUser, deleteAdminUser } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { UserPlus, Trash2, Shield } from "lucide-react";
import { format } from "date-fns";

export default function UsersPage() {
  const { admin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "editor" });
  const [saving, setSaving] = useState(false);
  const isSuperAdmin = admin?.role === "superadmin";

  const load = () => {
    setLoading(true);
    getAdminUsers()
      .then((res) => setUsers(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Fill all fields"); return; }
    setSaving(true);
    try {
      await createAdminUser(form);
      toast.success("Admin user created!");
      setShowForm(false);
      setForm({ name: "", email: "", password: "", role: "editor" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation failed");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this admin user?")) return;
    try {
      await deleteAdminUser(id);
      toast.success("User deleted");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  if (!isSuperAdmin) {
    return (
      <div style={s.noAccess}>
        <Shield size={48} color="#555" />
        <div style={{ color: "#f0f0f0", fontWeight: 600, marginTop: 12 }}>Superadmin access required</div>
        <div style={{ color: "#555", fontSize: 13, marginTop: 6 }}>Only superadmins can manage admin users.</div>
      </div>
    );
  }

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Admin Users</h1>
          <p style={s.sub}>{users.length} total admins</p>
        </div>
        <button style={s.addBtn} onClick={() => setShowForm(!showForm)}>
          <UserPlus size={16} /> Add Admin
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div style={s.formCard}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f0", marginBottom: 16 }}>Create New Admin User</div>
          <form onSubmit={handleCreate}>
            <div style={s.formGrid}>
              <div style={s.field}>
                <label style={s.label}>Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Priya Sharma" style={s.input} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="admin@counselorscafe.com" style={s.input} required />
              </div>
              <div style={s.field}>
                <label style={s.label}>Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Min 6 characters" style={s.input} required minLength={6} />
              </div>
              <div style={s.field}>
                <label style={s.label}>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={s.input}>
                  <option value="editor">Editor — can create/edit blogs</option>
                  <option value="superadmin">Superadmin — full access</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button type="submit" style={s.createBtn} disabled={saving}>{saving ? "Creating…" : "Create User"}</button>
              <button type="button" style={s.cancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Users table */}
      <div style={s.card}>
        {loading ? (
          <div style={s.loading}>Loading users…</div>
        ) : (
          <table style={s.table}>
            <thead>
              <tr>
                {["Admin", "Email", "Role", "Last Login", "Actions"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={s.tr}>
                  <td style={s.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={s.avatar}>{user.name[0].toUpperCase()}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: "#e0e0e0", fontSize: 14 }}>{user.name}</div>
                        {user._id === admin?._id && <span style={s.youBadge}>You</span>}
                      </div>
                    </div>
                  </td>
                  <td style={{ ...s.td, color: "#888", fontSize: 13 }}>{user.email}</td>
                  <td style={s.td}>
                    <span style={{ ...s.roleBadge, ...(user.role === "superadmin" ? s.superBadge : s.editorBadge) }}>
                      {user.role === "superadmin" ? "🛡️ Superadmin" : "✎ Editor"}
                    </span>
                  </td>
                  <td style={{ ...s.td, color: "#555", fontSize: 12 }}>
                    {user.lastLogin ? format(new Date(user.lastLogin), "dd MMM yyyy, HH:mm") : "Never"}
                  </td>
                  <td style={s.td}>
                    {user._id !== admin?._id && (
                      <button style={s.deleteBtn} onClick={() => handleDelete(user._id)} title="Delete">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 4 },
  sub: { color: "#555", fontSize: 13 },
  addBtn: { display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: "#f5c518", border: "none", borderRadius: 10, color: "#0a0a0a", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  formCard: { background: "#111", border: "1px solid #2a2a2a", borderRadius: 14, padding: 20, marginBottom: 20 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 },
  field: {},
  label: { display: "block", fontSize: 11, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 },
  input: { width: "100%", padding: "9px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13 },
  createBtn: { padding: "9px 20px", background: "#f5c518", border: "none", borderRadius: 9, color: "#0a0a0a", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  cancelBtn: { padding: "9px 16px", background: "transparent", border: "1px solid #2a2a2a", borderRadius: 9, color: "#888", fontWeight: 600, fontSize: 13, cursor: "pointer" },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, overflow: "hidden" },
  loading: { padding: "60px 20px", textAlign: "center", color: "#555" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #1e1e1e" },
  tr: { borderBottom: "1px solid #161616" },
  td: { padding: "14px 16px", verticalAlign: "middle" },
  avatar: { width: 36, height: 36, borderRadius: 10, background: "#f5c518", color: "#0a0a0a", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  youBadge: { fontSize: 10, color: "#f5c518", background: "rgba(245,197,24,0.1)", borderRadius: 4, padding: "1px 5px", fontWeight: 700 },
  roleBadge: { fontSize: 12, fontWeight: 600, borderRadius: 6, padding: "3px 10px" },
  superBadge: { color: "#f5c518", background: "rgba(245,197,24,0.1)" },
  editorBadge: { color: "#3b82f6", background: "rgba(59,130,246,0.1)" },
  deleteBtn: { background: "none", border: "none", color: "#ef4444", cursor: "pointer", padding: "6px", borderRadius: 6, display: "flex", alignItems: "center" },
  noAccess: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
};
