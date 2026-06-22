import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { adminLogin } from "../lib/api";
import toast from "react-hot-toast";
import { Coffee, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("cms@counselorscafe.com");
  const [password, setPassword] = useState("Cms@Admin123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Fill all fields"); return; }
    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      const { token, admin } = res.data.data;
      login(token, admin);
      toast.success(`Welcome, ${admin.name}! 🎉`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Run: npm run reset-admin in backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.root}>
      <div style={s.glow1} />
      <div style={s.glow2} />

      <div style={s.card}>
        <div style={s.logoWrap}>
          <div style={s.logoIcon}><Coffee size={28} color="#0a0a0a" /></div>
        </div>
        <h1 style={s.title}>Counselor's Cafe</h1>
        <p style={s.sub}>Website Content Management System</p>

        <div style={s.infoBanner}>
          <div style={s.infoIcon}>ℹ️</div>
          <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
            <strong style={{ color: "#f5c518" }}>CMS Admin</strong> — separate from your App admin.<br />
            First time? Run <code style={s.code}>npm run seed</code> in backend.
          </div>
        </div>

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Email Address</label>
            <div style={s.inputWrap}>
              <Mail size={15} style={s.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="cms@counselorscafe.com"
                style={s.input}
                autoComplete="email"
              />
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <div style={s.inputWrap}>
              <Lock size={15} style={s.inputIcon} />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Cms@Admin123"
                style={{ ...s.input, paddingRight: 40 }}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? "Logging in..." : "Login to CMS Dashboard →"}
          </button>
        </form>

        <div style={s.divider} />

        <div style={s.helpBox}>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Can't login?</div>
          <div style={{ fontSize: 12, color: "#444", lineHeight: 1.8 }}>
            1. Backend mein ye run karo:<br />
            <code style={s.codeBlock}>npm run reset-admin</code>
            2. Backend restart karo<br />
            3. Upar wale credentials se login karo
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0a0a0a", padding: 20, position: "relative", overflow: "hidden" },
  glow1: { position: "absolute", width: 400, height: 400, background: "radial-gradient(circle, rgba(245,197,24,0.1) 0%, transparent 70%)", top: "20%", left: "50%", transform: "translateX(-50%)", pointerEvents: "none" },
  glow2: { position: "absolute", width: 300, height: 300, background: "radial-gradient(circle, rgba(245,197,24,0.05) 0%, transparent 70%)", bottom: "10%", right: "20%", pointerEvents: "none" },
  card: { background: "#111", border: "1px solid #222", borderRadius: 20, padding: "36px 32px", width: "100%", maxWidth: 420, position: "relative", zIndex: 1, textAlign: "center" },
  logoWrap: { display: "flex", justifyContent: "center", marginBottom: 14 },
  logoIcon: { width: 60, height: 60, borderRadius: 16, background: "#f5c518", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(245,197,24,0.25)" },
  title: { fontSize: 21, fontWeight: 800, color: "#f0f0f0", marginBottom: 4 },
  sub: { fontSize: 12, color: "#555", marginBottom: 20 },
  infoBanner: { display: "flex", gap: 10, background: "rgba(245,197,24,0.05)", border: "1px solid rgba(245,197,24,0.15)", borderRadius: 10, padding: "10px 12px", marginBottom: 24, textAlign: "left" },
  infoIcon: { fontSize: 16, flexShrink: 0 },
  form: { textAlign: "left" },
  field: { marginBottom: 16 },
  label: { display: "block", fontSize: 11, fontWeight: 600, color: "#666", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em" },
  inputWrap: { position: "relative" },
  inputIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#555", pointerEvents: "none" },
  input: { paddingLeft: 38, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, color: "#f0f0f0", fontSize: 14, width: "100%", padding: "11px 14px 11px 38px" },
  eyeBtn: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#555", cursor: "pointer", display: "flex" },
  btn: { width: "100%", padding: "13px", marginTop: 8, background: "#f5c518", border: "none", borderRadius: 10, color: "#0a0a0a", fontWeight: 700, fontSize: 15, cursor: "pointer" },
  divider: { height: 1, background: "#1e1e1e", margin: "20px 0" },
  helpBox: { background: "#0f0f0f", borderRadius: 10, padding: "14px", textAlign: "left" },
  code: { background: "#0a0a0a", padding: "1px 5px", borderRadius: 4, fontFamily: "monospace", fontSize: 11, color: "#f5c518" },
  codeBlock: { display: "block", background: "#0a0a0a", color: "#f5c518", padding: "5px 10px", borderRadius: 6, fontFamily: "monospace", fontSize: 11, margin: "4px 0 8px", letterSpacing: 0.5 },
};
