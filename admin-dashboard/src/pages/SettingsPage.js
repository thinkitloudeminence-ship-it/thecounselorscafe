import React, { useState } from "react";
import { changePassword } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { 
  Lock, User, Globe, Bell, Moon, Sun, Shield, 
  Palette, Eye, EyeOff, CheckCircle, AlertCircle,
  LogOut, Smartphone, Mail, Save
} from "lucide-react";

export default function SettingsPage() {
  const { admin, logout } = useAuth();
  const [passwords, setPasswords] = useState({ 
    currentPassword: "", 
    newPassword: "", 
    confirmPassword: "" 
  });
  const [saving, setSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: true,
    language: "en",
    twoFactorAuth: false,
  });

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
      await changePassword({ 
        currentPassword: passwords.currentPassword, 
        newPassword: passwords.newPassword 
      });
      toast.success("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally { 
      setSaving(false); 
    }
  };

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast.success(`${key} ${settings[key] ? 'disabled' : 'enabled'}`);
  };

  return (
    <div style={s.container}>
      <h1 style={s.h1}>⚙️ Settings</h1>

      {/* Profile Section */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <User size={18} color="#f5c518" />
          <span style={s.cardTitle}>My Profile</span>
        </div>
        
        <div style={s.profileRow}>
          <div style={s.profileAvatar}>
            {admin?.name?.[0]?.toUpperCase() || "A"}
          </div>
          <div style={s.profileInfo}>
            <div style={s.profileName}>{admin?.name}</div>
            <div style={s.profileEmail}>{admin?.email}</div>
            <span style={{
              ...s.roleBadge,
              ...(admin?.role === "superadmin" ? s.superBadge : s.editorBadge)
            }}>
              {admin?.role === "superadmin" ? "🛡️ Super Admin" : "✎ Editor"}
            </span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <Lock size={18} color="#f5c518" />
          <span style={s.cardTitle}>Change Password</span>
        </div>
        
        <form onSubmit={handlePasswordChange}>
          {/* Current Password */}
          <div style={s.field}>
            <label style={s.label}>Current Password</label>
            <div style={s.inputWrapper}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                placeholder="Enter current password"
                style={s.input}
                required
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div style={s.field}>
            <label style={s.label}>New Password</label>
            <div style={s.inputWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="Min 6 characters"
                style={s.input}
                required
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div style={s.hint}>Password must be at least 6 characters</div>
          </div>

          {/* Confirm Password */}
          <div style={s.field}>
            <label style={s.label}>Confirm New Password</label>
            <div style={s.inputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                placeholder="Repeat new password"
                style={s.input}
                required
              />
              <button
                type="button"
                style={s.eyeBtn}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" style={s.saveBtn} disabled={saving}>
            {saving ? (
              <>
                <span style={s.spinner} />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* Preferences */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <Palette size={18} color="#f5c518" />
          <span style={s.cardTitle}>Preferences</span>
        </div>

        <div style={s.settingItem}>
          <div style={s.settingLeft}>
            <Bell size={16} color="#888" />
            <div>
              <div style={s.settingLabel}>Email Notifications</div>
              <div style={s.settingDesc}>Receive email updates about new contacts</div>
            </div>
          </div>
          <button
            style={{
              ...s.toggleBtn,
              ...(settings.emailNotifications ? s.toggleOn : s.toggleOff)
            }}
            onClick={() => handleToggle("emailNotifications")}
          >
            <span style={{
              ...s.toggleDot,
              ...(settings.emailNotifications ? s.toggleDotOn : s.toggleDotOff)
            }} />
          </button>
        </div>

        <div style={s.settingItem}>
          <div style={s.settingLeft}>
            <Smartphone size={16} color="#888" />
            <div>
              <div style={s.settingLabel}>Push Notifications</div>
              <div style={s.settingDesc}>Get real-time notifications on your device</div>
            </div>
          </div>
          <button
            style={{
              ...s.toggleBtn,
              ...(settings.pushNotifications ? s.toggleOn : s.toggleOff)
            }}
            onClick={() => handleToggle("pushNotifications")}
          >
            <span style={{
              ...s.toggleDot,
              ...(settings.pushNotifications ? s.toggleDotOn : s.toggleDotOff)
            }} />
          </button>
        </div>

        <div style={s.settingItem}>
          <div style={s.settingLeft}>
            <Shield size={16} color="#888" />
            <div>
              <div style={s.settingLabel}>Two-Factor Authentication</div>
              <div style={s.settingDesc}>Add an extra layer of security to your account</div>
            </div>
          </div>
          <button
            style={{
              ...s.toggleBtn,
              ...(settings.twoFactorAuth ? s.toggleOn : s.toggleOff)
            }}
            onClick={() => handleToggle("twoFactorAuth")}
          >
            <span style={{
              ...s.toggleDot,
              ...(settings.twoFactorAuth ? s.toggleDotOn : s.toggleDotOff)
            }} />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div style={s.dangerCard}>
        <div style={s.cardHeader}>
          <AlertCircle size={18} color="#ef4444" />
          <span style={{ ...s.cardTitle, color: "#ef4444" }}>Danger Zone</span>
        </div>
        <div style={s.dangerText}>
          <LogOut size={16} color="#ef4444" />
          <span>This will log you out of your account. You'll need to login again.</span>
        </div>
        <button style={s.dangerBtn} onClick={logout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Version Info */}
      <div style={s.versionInfo}>
        <span>Counselors Cafe Admin v1.0.0</span>
        <span style={s.versionDot}>•</span>
        <span style={s.versionStatus}>
          <CheckCircle size={10} color="#22c55e" />
          All systems operational
        </span>
      </div>
    </div>
  );
}

const s = {
  container: { maxWidth: 680 },
  
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 24 },
  
  card: { 
    background: "#111", 
    border: "1px solid #1e1e1e", 
    borderRadius: 14, 
    padding: 22, 
    marginBottom: 16 
  },
  
  dangerCard: {
    background: "rgba(239,68,68,0.05)",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 14,
    padding: 22,
    marginBottom: 16,
  },
  
  cardHeader: { 
    display: "flex", 
    alignItems: "center", 
    gap: 10, 
    marginBottom: 18 
  },
  
  cardTitle: { 
    fontSize: 15, 
    fontWeight: 700, 
    color: "#f0f0f0" 
  },
  
  // Profile
  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 14,
    background: "#f5c518",
    color: "#0a0a0a",
    fontWeight: 800,
    fontSize: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  
  profileInfo: { flex: 1 },
  profileName: { fontSize: 16, fontWeight: 700, color: "#f0f0f0" },
  profileEmail: { fontSize: 13, color: "#555", marginTop: 2 },
  
  roleBadge: { 
    fontSize: 11, 
    fontWeight: 600, 
    borderRadius: 6, 
    padding: "2px 10px",
    display: "inline-block",
    marginTop: 4,
  },
  superBadge: { 
    color: "#f5c518", 
    background: "rgba(245,197,24,0.1)" 
  },
  editorBadge: { 
    color: "#3b82f6", 
    background: "rgba(59,130,246,0.1)" 
  },
  
  // Password
  field: { marginBottom: 16 },
  label: { 
    display: "block", 
    fontSize: 12, 
    fontWeight: 600, 
    color: "#888", 
    marginBottom: 6 
  },
  
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  
  input: { 
    width: "100%", 
    padding: "10px 44px 10px 14px", 
    background: "#1a1a1a", 
    border: "1px solid #2a2a2a", 
    borderRadius: 10, 
    color: "#f0f0f0", 
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.2s",
    ":focus": { borderColor: "#f5c518" },
  },
  
  eyeBtn: {
    position: "absolute",
    right: 12,
    background: "none",
    border: "none",
    color: "#555",
    cursor: "pointer",
    padding: 4,
  },
  
  hint: {
    fontSize: 11,
    color: "#555",
    marginTop: 4,
  },
  
  saveBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 24px",
    background: "#f5c518",
    border: "none",
    borderRadius: 10,
    color: "#0a0a0a",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "opacity 0.15s",
    ":disabled": { opacity: 0.5, cursor: "not-allowed" },
  },
  
  spinner: {
    width: 16,
    height: 16,
    border: "2px solid rgba(10,10,10,0.2)",
    borderTop: "2px solid #0a0a0a",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  
  // Settings Toggle
  settingItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #1a1a1a",
  },
  
  settingLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  
  settingLabel: {
    fontWeight: 600,
    fontSize: 14,
    color: "#f0f0f0",
  },
  
  settingDesc: {
    fontSize: 12,
    color: "#555",
    marginTop: 2,
  },
  
  toggleBtn: {
    width: 48,
    height: 28,
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
    position: "relative",
    flexShrink: 0,
  },
  
  toggleOn: { background: "#f5c518" },
  toggleOff: { background: "#2a2a2a" },
  
  toggleDot: {
    position: "absolute",
    top: 3,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#fff",
    transition: "transform 0.3s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
  },
  
  toggleDotOn: { transform: "translateX(20px)" },
  toggleDotOff: { transform: "translateX(3px)" },
  
  // Danger Zone
  dangerText: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#888",
    fontSize: 13,
    marginBottom: 14,
  },
  
  dangerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 18px",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: 8,
    color: "#ef4444",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    transition: "background 0.15s",
  },
  
  // Version
  versionInfo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    padding: "16px 0",
    fontSize: 12,
    color: "#555",
  },
  
  versionDot: { color: "#2a2a2a" },
  
  versionStatus: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    color: "#22c55e",
  },
};