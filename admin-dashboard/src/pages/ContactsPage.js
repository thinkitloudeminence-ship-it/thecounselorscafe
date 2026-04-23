import React, { useEffect, useState } from "react";
import { getContacts, updateContactStatus } from "../lib/api";
import toast from "react-hot-toast";
import { MessageSquare, Mail, Phone, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

const STATUS_COLORS = {
  new: "#f5c518",
  read: "#3b82f6",
  replied: "#22c55e",
  closed: "#555",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const [noteInput, setNoteInput] = useState("");

  const load = () => {
    setLoading(true);
    const params = {};
    if (statusFilter !== "all") params.status = statusFilter;
    getContacts(params)
      .then((res) => setContacts(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter]);

  const handleStatus = async (id, status) => {
    try {
      const contact = contacts.find((c) => c._id === id);
      await updateContactStatus(id, status, contact?.adminNote || "");
      toast.success(`Marked as ${status}`);
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
    } catch { toast.error("Update failed"); }
  };

  const saveNote = async (id) => {
    try {
      const contact = contacts.find((c) => c._id === id);
      await updateContactStatus(id, contact.status, noteInput);
      toast.success("Note saved");
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, adminNote: noteInput } : c));
    } catch { toast.error("Save failed"); }
  };

  return (
    <div>
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>Contact Messages</h1>
          <p style={s.sub}>{contacts.filter((c) => c.status === "new").length} unread messages</p>
        </div>
      </div>

      {/* Status tabs */}
      <div style={s.tabs}>
        {STATUS_TABS.map((t) => (
          <button key={t.value} style={{ ...s.tab, ...(statusFilter === t.value ? s.tabActive : {}) }} onClick={() => setStatusFilter(t.value)}>
            {t.label}
            {t.value === "new" && contacts.filter((c) => c.status === "new").length > 0 && (
              <span style={s.badge}>{contacts.filter((c) => c.status === "new").length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Contacts list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {loading && <div style={s.loading}>Loading messages…</div>}

        {!loading && contacts.length === 0 && (
          <div style={s.empty}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <div style={{ color: "#f0f0f0", fontWeight: 600 }}>No messages found</div>
          </div>
        )}

        {contacts.map((contact) => (
          <div key={contact._id} style={{ ...s.card, ...(contact.status === "new" ? s.cardNew : {}) }}>
            {/* Contact row */}
            <div style={s.contactRow} onClick={() => {
              setExpanded(expanded === contact._id ? null : contact._id);
              setNoteInput(contact.adminNote || "");
              if (contact.status === "new") handleStatus(contact._id, "read");
            }}>
              <div style={s.avatar}>{contact.name[0].toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.contactName}>
                  {contact.name}
                  {contact.status === "new" && <span style={s.newDot} />}
                </div>
                <div style={s.contactSub} className="truncate">{contact.subject}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <span style={{ ...s.statusBadge, color: STATUS_COLORS[contact.status], background: STATUS_COLORS[contact.status] + "18" }}>
                  {contact.status}
                </span>
                <span style={{ color: "#555", fontSize: 11 }}>
                  {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                </span>
                {expanded === contact._id ? <ChevronUp size={15} color="#555" /> : <ChevronDown size={15} color="#555" />}
              </div>
            </div>

            {/* Expanded detail */}
            {expanded === contact._id && (
              <div style={s.detail}>
                {/* Contact info */}
                <div style={s.infoGrid}>
                  <div style={s.infoItem}><Mail size={13} />{contact.email}</div>
                  {contact.phone && <div style={s.infoItem}><Phone size={13} />{contact.phone}</div>}
                  <div style={s.infoItem}><Clock size={13} />{format(new Date(contact.createdAt), "dd MMM yyyy, hh:mm a")}</div>
                </div>

                {/* Subject */}
                <div style={s.subject}>{contact.subject}</div>

                {/* Message */}
                <div style={s.message}>{contact.message}</div>

                {/* Admin note */}
                <div style={s.noteSection}>
                  <label style={s.noteLabel}>Admin Note (private)</label>
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add internal notes about this contact…"
                    rows={2}
                    style={s.noteInput}
                  />
                  <button style={s.saveNoteBtn} onClick={() => saveNote(contact._id)}>Save Note</button>
                </div>

                {/* Actions */}
                <div style={s.actionRow}>
                  <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`} style={s.replyBtn}>
                    <Mail size={14} /> Reply via Email
                  </a>
                  <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                    {["new", "read", "replied", "closed"].filter((st) => st !== contact.status).map((st) => (
                      <button key={st} style={s.statusBtn} onClick={() => handleStatus(contact._id, st)}>
                        Mark {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 4 },
  sub: { color: "#555", fontSize: 13 },
  tabs: { display: "flex", gap: 4, marginBottom: 16, background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: 4, width: "fit-content" },
  tab: { padding: "6px 14px", borderRadius: 7, border: "none", background: "transparent", color: "#888", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 },
  tabActive: { background: "#f5c518", color: "#0a0a0a", fontWeight: 700 },
  badge: { background: "#ef4444", color: "#fff", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 },
  loading: { textAlign: "center", padding: 60, color: "#555" },
  empty: { textAlign: "center", padding: "60px 0" },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, overflow: "hidden" },
  cardNew: { borderColor: "rgba(245,197,24,0.3)", boxShadow: "0 0 0 1px rgba(245,197,24,0.1)" },
  contactRow: { display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", cursor: "pointer" },
  avatar: { width: 38, height: 38, borderRadius: 10, background: "#f5c518", color: "#0a0a0a", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  contactName: { fontWeight: 600, fontSize: 14, color: "#e0e0e0", display: "flex", alignItems: "center", gap: 8 },
  newDot: { width: 8, height: 8, borderRadius: "50%", background: "#f5c518" },
  contactSub: { fontSize: 12, color: "#555", marginTop: 2 },
  statusBadge: { fontSize: 11, fontWeight: 600, borderRadius: 6, padding: "3px 9px" },
  detail: { borderTop: "1px solid #1a1a1a", padding: 16 },
  infoGrid: { display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 14 },
  infoItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888" },
  subject: { fontWeight: 700, fontSize: 15, color: "#f0f0f0", marginBottom: 10 },
  message: { background: "#1a1a1a", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#ccc", lineHeight: 1.7, marginBottom: 14, whiteSpace: "pre-wrap" },
  noteSection: { marginBottom: 14 },
  noteLabel: { display: "block", fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 },
  noteInput: { width: "100%", padding: "9px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#f0f0f0", fontSize: 13, resize: "none", fontFamily: "inherit", marginBottom: 6 },
  saveNoteBtn: { padding: "6px 14px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 7, color: "#888", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  actionRow: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 },
  replyBtn: { display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", background: "#f5c518", border: "none", borderRadius: 8, color: "#0a0a0a", fontWeight: 700, fontSize: 13, cursor: "pointer", textDecoration: "none" },
  statusBtn: { padding: "7px 12px", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#888", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" },
};
