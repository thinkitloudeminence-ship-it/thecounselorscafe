import React, { useEffect, useState, useCallback } from "react";
import { getContacts, updateContactStatus } from "../lib/api";
import toast from "react-hot-toast";
import { Mail, Phone, Clock, ChevronDown, ChevronUp, Search, Filter, Eye, CheckCircle, XCircle, Reply, Trash2, AlertTriangle } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const STATUS_TABS = [
  { value: "all", label: "All", count: 0 },
  { value: "new", label: "New", count: 0 },
  { value: "read", label: "Read", count: 0 },
  { value: "replied", label: "Replied", count: 0 },
  { value: "closed", label: "Closed", count: 0 },
];

const STATUS_COLORS = {
  new: { bg: "rgba(245,197,24,0.15)", text: "#f5c518", dot: "#f5c518" },
  read: { bg: "rgba(59,130,246,0.15)", text: "#3b82f6", dot: "#3b82f6" },
  replied: { bg: "rgba(34,197,94,0.15)", text: "#22c55e", dot: "#22c55e" },
  closed: { bg: "rgba(85,85,85,0.15)", text: "#888", dot: "#555" },
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContact, setSelectedContact] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    const params = {};
    if (statusFilter !== "all") params.status = statusFilter;
    getContacts(params)
      .then((res) => setContacts(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatus = async (id, status) => {
    try {
      const contact = contacts.find((c) => c._id === id);
      await updateContactStatus(id, status, contact?.adminNote || "");
      toast.success(`Marked as ${status}`);
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch { toast.error("Update failed"); }
  };

  const saveNote = async (id) => {
    try {
      const contact = contacts.find((c) => c._id === id);
      await updateContactStatus(id, contact.status, noteInput);
      toast.success("Note saved");
      setContacts((prev) => prev.map((c) => c._id === id ? { ...c, adminNote: noteInput } : c));
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, adminNote: noteInput });
      }
    } catch { toast.error("Save failed"); }
  };

  const openDetail = (contact) => {
    setSelectedContact(contact);
    setNoteInput(contact.adminNote || "");
    setShowDetailModal(true);
    if (contact.status === "new") {
      handleStatus(contact._id, "read");
    }
  };

  const closeDetail = () => {
    setShowDetailModal(false);
    setSelectedContact(null);
    setNoteInput("");
  };

  // Filter contacts by search
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update tab counts
  const newCount = contacts.filter((c) => c.status === "new").length;
  const tabsWithCounts = STATUS_TABS.map((tab) => ({
    ...tab,
    count: tab.value === "all" ? contacts.length : contacts.filter((c) => c.status === tab.value).length,
  }));

  return (
    <div style={s.container}>
      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={s.h1}>📬 Contact Messages</h1>
          <p style={s.sub}>
            {newCount} unread {newCount === 1 ? "message" : "messages"} • {contacts.length} total
          </p>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div style={s.filterBar}>
        <div style={s.searchWrapper}>
          <Search size={16} color="#555" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={s.searchInput}
          />
        </div>
      </div>

      {/* Status Tabs */}
      <div style={s.tabsWrapper}>
        <div style={s.tabs}>
          {tabsWithCounts.map((t) => (
            <button
              key={t.value}
              style={{ ...s.tab, ...(statusFilter === t.value ? s.tabActive : {}) }}
              onClick={() => setStatusFilter(t.value)}
            >
              {t.label}
              {t.count > 0 && (
                <span style={{ ...s.tabBadge, ...(t.value === "new" && t.count > 0 ? s.tabBadgeNew : {}) }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={s.tableWrapper}>
        {loading ? (
          <div style={s.loading}>Loading messages…</div>
        ) : filteredContacts.length === 0 ? (
          <div style={s.empty}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <div style={{ color: "#f0f0f0", fontWeight: 600 }}>No messages found</div>
            <div style={{ color: "#555", fontSize: 13, marginTop: 4 }}>
              {searchTerm ? "Try adjusting your search" : "All caught up!"}
            </div>
          </div>
        ) : (
          <table style={s.table}>
            <thead>
              <tr style={s.theadRow}>
                <th style={{ ...s.th, width: "28%" }}>Name / Subject</th>
                <th style={{ ...s.th, width: "23%" }}>Contact</th>
                <th style={{ ...s.th, width: "14%" }}>Status</th>
                <th style={{ ...s.th, width: "15%" }}>Received</th>
                <th style={{ ...s.th, width: "20%", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr
                  key={contact._id}
                  style={{ ...s.tbodyRow, ...(contact.status === "new" ? s.tbodyRowNew : {}) }}
                  onClick={() => openDetail(contact)}
                >
                  <td style={s.td}>
                    <div style={s.tdName}>
                      {contact.name}
                      {/* ✅ DUPLICATE WARNING - Added here */}
                      {contact.duplicate && (
                        <span style={{ 
                          color: "#ef4444", 
                          fontSize: 10, 
                          marginLeft: 8,
                          background: "rgba(239,68,68,0.1)",
                          padding: "1px 6px",
                          borderRadius: 4,
                          fontWeight: 600,
                        }}>
                          <AlertTriangle size={10} style={{ display: "inline", marginRight: 2 }} /> Duplicate
                        </span>
                      )}
                    </div>
                    <div style={s.tdSubject}>{contact.subject}</div>
                  </td>
                  <td style={s.td}>
                    <div style={s.tdEmail}>{contact.email}</div>
                    {contact.phone && <div style={s.tdPhone}>{contact.phone}</div>}
                  </td>
                  <td style={s.td}>
                    <span style={{
                      ...s.statusBadge,
                      background: STATUS_COLORS[contact.status]?.bg || "rgba(85,85,85,0.15)",
                      color: STATUS_COLORS[contact.status]?.text || "#888",
                    }}>
                      <span style={{
                        ...s.statusDot,
                        background: STATUS_COLORS[contact.status]?.dot || "#555",
                      }} />
                      {contact.status}
                    </span>
                  </td>
                  <td style={{ ...s.td, fontSize: 12, color: "#555" }}>
                    {formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                  </td>
                  <td style={{ ...s.td, textAlign: "center" }}>
                    <button
                      style={s.viewBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetail(contact);
                      }}
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedContact && (
        <div style={s.modalOverlay} onClick={closeDetail}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={s.modalHeader}>
              <div style={s.modalTitle}>
                <span style={s.modalAvatar}>{selectedContact.name[0].toUpperCase()}</span>
                <div>
                  <div style={s.modalName}>
                    {selectedContact.name}
                    {/* ✅ DUPLICATE WARNING - Also in modal */}
                    {selectedContact.duplicate && (
                      <span style={{ 
                        color: "#ef4444", 
                        fontSize: 11, 
                        marginLeft: 8,
                        background: "rgba(239,68,68,0.1)",
                        padding: "1px 8px",
                        borderRadius: 4,
                        fontWeight: 600,
                      }}>
                        <AlertTriangle size={12} style={{ display: "inline", marginRight: 2 }} /> Duplicate
                      </span>
                    )}
                  </div>
                  <div style={s.modalStatus}>
                    <span style={{
                      ...s.modalStatusDot,
                      background: STATUS_COLORS[selectedContact.status]?.dot || "#555",
                    }} />
                    {selectedContact.status}
                  </div>
                </div>
              </div>
              <button style={s.modalClose} onClick={closeDetail}>✕</button>
            </div>

            {/* Modal Body */}
            <div style={s.modalBody}>
              {/* Contact Info */}
              <div style={s.modalInfoGrid}>
                <div style={s.modalInfoItem}><Mail size={14} /> {selectedContact.email}</div>
                {selectedContact.phone && (
                  <div style={s.modalInfoItem}><Phone size={14} /> {selectedContact.phone}</div>
                )}
                <div style={s.modalInfoItem}><Clock size={14} /> {format(new Date(selectedContact.createdAt), "dd MMM yyyy, hh:mm a")}</div>
              </div>

              {/* Subject */}
              <div style={s.modalSubject}>📌 {selectedContact.subject}</div>

              {/* Message */}
              <div style={s.modalMessage}>{selectedContact.message}</div>

              {/* Admin Note */}
              <div style={s.noteSection}>
                <label style={s.noteLabel}>📝 Admin Note (private)</label>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Add internal notes about this contact…"
                  rows={2}
                  style={s.noteInput}
                />
                <button style={s.saveNoteBtn} onClick={() => saveNote(selectedContact._id)}>
                  Save Note
                </button>
              </div>

              {/* Actions */}
              <div style={s.modalActions}>
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                  style={s.replyBtn}
                >
                  <Reply size={14} /> Reply via Email
                </a>
                <div style={s.statusActions}>
                  {["new", "read", "replied", "closed"].filter((st) => st !== selectedContact.status).map((st) => (
                    <button
                      key={st}
                      style={{
                        ...s.statusActionBtn,
                        ...(st === "closed" ? s.statusActionBtnDanger : {}),
                      }}
                      onClick={() => handleStatus(selectedContact._id, st)}
                    >
                      Mark {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s = {
  container: { padding: 0 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  h1: { fontSize: 24, fontWeight: 800, color: "#f0f0f0", marginBottom: 4 },
  sub: { color: "#555", fontSize: 13 },

  filterBar: { marginBottom: 16 },
  searchWrapper: { position: "relative", maxWidth: 400 },
  searchInput: {
    width: "100%",
    padding: "9px 12px 9px 38px",
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 10,
    color: "#f0f0f0",
    fontSize: 13,
    outline: "none",
    transition: "border-color 0.2s",
  },

  tabsWrapper: { marginBottom: 16, overflowX: "auto" },
  tabs: { display: "flex", gap: 4, background: "#111", border: "1px solid #1e1e1e", borderRadius: 10, padding: 4, width: "fit-content" },
  tab: {
    padding: "7px 16px",
    borderRadius: 7,
    border: "none",
    background: "transparent",
    color: "#888",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  },
  tabActive: { background: "#f5c518", color: "#0a0a0a", fontWeight: 700 },
  tabBadge: { background: "#2a2a2a", borderRadius: 10, padding: "1px 8px", fontSize: 10, fontWeight: 700, color: "#888" },
  tabBadgeNew: { background: "#ef4444", color: "#fff" },

  tableWrapper: {
    background: "#111",
    border: "1px solid #1e1e1e",
    borderRadius: 12,
    overflow: "hidden",
    overflowX: "auto",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: 700 },
  theadRow: { borderBottom: "1px solid #1e1e1e" },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 700,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  tbodyRow: {
    borderBottom: "1px solid #1a1a1a",
    cursor: "pointer",
    transition: "background 0.15s",
    ":hover": { background: "#1a1a1a" },
  },
  tbodyRowNew: { background: "rgba(245,197,24,0.03)" },
  td: { padding: "12px 16px", fontSize: 13, verticalAlign: "middle" },
  tdName: { 
    fontWeight: 600, 
    color: "#f0f0f0", 
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  tdSubject: { fontSize: 12, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 },
  tdEmail: { fontSize: 12, color: "#888" },
  tdPhone: { fontSize: 11, color: "#555" },
  statusBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    textTransform: "capitalize",
  },
  statusDot: { width: 6, height: 6, borderRadius: "50%", display: "inline-block" },
  viewBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 12px",
    background: "transparent",
    border: "1px solid #2a2a2a",
    borderRadius: 6,
    color: "#888",
    fontSize: 11,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
  },

  loading: { textAlign: "center", padding: 60, color: "#555" },
  empty: { textAlign: "center", padding: "60px 0" },

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modal: {
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: 16,
    maxWidth: 600,
    width: "100%",
    maxHeight: "90vh",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderBottom: "1px solid #1e1e1e",
  },
  modalTitle: { display: "flex", alignItems: "center", gap: 12 },
  modalAvatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#f5c518",
    color: "#0a0a0a",
    fontWeight: 700,
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalName: { 
    fontWeight: 700, 
    fontSize: 15, 
    color: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  modalStatus: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#555" },
  modalStatusDot: { width: 6, height: 6, borderRadius: "50%", display: "inline-block" },
  modalClose: {
    background: "none",
    border: "none",
    color: "#555",
    fontSize: 18,
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: 6,
    transition: "background 0.15s",
  },
  modalBody: { padding: 20, overflowY: "auto", maxHeight: "calc(90vh - 80px)" },
  modalInfoGrid: { display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 16 },
  modalInfoItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#888" },
  modalSubject: { fontWeight: 700, fontSize: 16, color: "#f0f0f0", marginBottom: 10 },
  modalMessage: {
    background: "#1a1a1a",
    borderRadius: 10,
    padding: "14px 16px",
    fontSize: 14,
    color: "#ccc",
    lineHeight: 1.8,
    marginBottom: 16,
    whiteSpace: "pre-wrap",
    maxHeight: 200,
    overflowY: "auto",
  },
  noteSection: { marginBottom: 16 },
  noteLabel: { display: "block", fontSize: 11, fontWeight: 600, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 },
  noteInput: {
    width: "100%",
    padding: "9px 12px",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    color: "#f0f0f0",
    fontSize: 13,
    resize: "none",
    fontFamily: "inherit",
    marginBottom: 6,
  },
  saveNoteBtn: {
    padding: "6px 16px",
    background: "#f5c518",
    border: "none",
    borderRadius: 7,
    color: "#0a0a0a",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
  },
  modalActions: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" },
  replyBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    background: "#f5c518",
    border: "none",
    borderRadius: 8,
    color: "#0a0a0a",
    fontWeight: 700,
    fontSize: 13,
    cursor: "pointer",
    textDecoration: "none",
  },
  statusActions: { display: "flex", gap: 6, flexWrap: "wrap", marginLeft: "auto" },
  statusActionBtn: {
    padding: "6px 12px",
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: 6,
    color: "#888",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
    textTransform: "capitalize",
    transition: "all 0.15s",
  },
  statusActionBtnDanger: { borderColor: "#ef4444", color: "#ef4444" },
};