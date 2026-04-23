import React, { useState } from "react";
import { changePassword } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Lock, User, Globe, Info } from "lucide-react";

export default function SettingsPage() {
  const { admin } = useAuth();
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSaving(true);
    try {
      await changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      toast.success("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally { setSaving(false); }
  };

  return (
    <div style={{ maxWidth: 680 }}>
      <h1 style={s.h1}>Settings</h1>

      {/* Profile info */}
      <div style={s.card}>
        <div style={s.cardTitle}><User size={16} /> My Profile</div>
        <div style={s.infoRow}><span style={s.infoLabel}>Name</span><span style={s.infoVal}>{admin?.name}</span></div>
        <div style={s.infoRow}><span style={s.infoLabel}>Email</span><span style={s.infoVal}>{admin?.email}</span></div>
        <div style={s.infoRow}><span style={s.infoLabel}>Role</span>
          <span style={{ ...s.roleBadge, ...(admin?.role === "superadmin" ? s.superBadge : s.editorBadge) }}>
            {admin?.role === "superadmin" ? "🛡️ Superadmin" : "✎ Editor"}
          </span>
        </div>
      </div>

      {/* Change Password */}
      <div style={s.card}>
        <div style={s.cardTitle}><Lock size={16} /> Change Password</div>
        <form onSubmit={handlePasswordChange}>
          {[
            { key: "currentPassword", label: "Current Password", placeholder: "Enter current password" },
            { key: "newPassword", label: "New Password", placeholder: "Min 6 characters" },
            { key: "confirmPassword", label: "Confirm New Password", placeholder: "Repeat new password" },
          ].map((f) => (
            <div key={f.key} style={s.field}>
              <label style={s.label}>{f.label}</label>
              <input
                type="password"
                value={passwords[f.key]}
                onChange={(e) => setPasswords({ ...passwords, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                style={s.input}
                required
              />
            </div>
          ))}
          <button type="submit" style={s.saveBtn} disabled={saving}>
            {saving ? "Saving…" : "Update Password"}
          </button>
        </form>
      </div>

      {/* API Info */}
      <div style={s.card}>
        <div style={s.cardTitle}><Globe size={16} /> API Configuration</div>
        <div style={s.infoBox}>
          <Info size={14} color="#f5c518" />
          <div>
            <div style={{ fontWeight: 600, color: "#f5c518", marginBottom: 4 }}>Frontend Integration</div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>
              Set this in your Next.js frontend <code style={s.code}>.env.local</code>:<br />
              <code style={s.codeBlock}>NEXT_PUBLIC_API_URL=http://localhost:5000/api</code>
              <br />For production:<br />
              <code style={s.codeBlock}>NEXT_PUBLIC_API_URL=https://your-api-domain.com/api</code>
            </div>
          </div>
        </div>
        <div style={{ ...s.infoBox, marginTop: 10 }}>
          <Info size={14} color="#3b82f6" />
          <div>
            <div style={{ fontWeight: 600, color: "#3b82f6", marginBottom: 4 }}>Cloudinary Image Upload</div>
            <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>
              Add these to backend <code style={s.code}>.env</code>:<br />
              <code style={s.codeBlock}>CLOUDINARY_CLOUD_NAME=your_cloud_name<br />CLOUDINARY_API_KEY=your_key<br />CLOUDINARY_API_SECRET=your_secret</code>
              <br />Without Cloudinary, images are stored locally in <code style={s.code}>/uploads/blogs/</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 24 },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 14, padding: 22, marginBottom: 16 },
  cardTitle: { display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, color: "#f0f0f0", marginBottom: 18 },
  infoRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #1a1a1a" },
  infoLabel: { fontSize: 13, color: "#555", fontWeight: 600 },
  infoVal: { fontSize: 13, color: "#d0d0d0" },
  roleBadge: { fontSize: 12, fontWeight: 600, borderRadius: 6, padding: "3px 10px" },
  superBadge: { color: "#f5c518", background: "rgba(245,197,24,0.1)" },
  editorBadge: { color: "#3b82f6", background: "rgba(59,130,246,0.1)" },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 11, fontWeight: 600, color: "#666", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 },
  input: { width: "100%", padding: "9px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13 },
  saveBtn: { padding: "10px 22px", background: "#f5c518", border: "none", borderRadius: 10, color: "#0a0a0a", fontWeight: 700, fontSize: 14, cursor: "pointer" },
  infoBox: { display: "flex", gap: 12, background: "#1a1a1a", borderRadius: 10, padding: "12px 14px" },
  code: { background: "#0a0a0a", color: "#f5c518", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace", fontSize: 11 },
  codeBlock: { display: "block", background: "#0a0a0a", color: "#f5c518", padding: "6px 10px", borderRadius: 6, fontFamily: "monospace", fontSize: 11, marginTop: 6, whiteSpace: "pre" },
};
