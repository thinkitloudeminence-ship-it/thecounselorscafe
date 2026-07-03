import React, { useState, useEffect } from 'react';
import { 
  getAdminCounselors, 
  createAdminCounselor, 
  updateAdminCounselor, 
  deleteAdminCounselor,
  toggleCounselorStatus,
  toggleCounselorFeatured
} from '../lib/api';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, StarOff, Search } from 'lucide-react';

export default function CounselorsManagement() {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState(null);
  const [form, setForm] = useState({
    name: '',
    title: '',
    expertise: [],
    experience: '',
    rating: '',
    reviews: '',
    image: '',
    available: true,
    sessionsCompleted: '',
    location: '',
    email: '',
    phone: '',
    bio: '',
    languages: ['English'],
    pricePerSession: '',
    isActive: true,
    isFeatured: false,
  });
  const [expertiseInput, setExpertiseInput] = useState('');

  const loadCounselors = async () => {
    setLoading(true);
    try {
      const res = await getAdminCounselors({ search });
      setCounselors(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load counselors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounselors();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        experience: parseInt(form.experience) || 0,
        rating: parseFloat(form.rating) || 0,
        reviews: parseInt(form.reviews) || 0,
        sessionsCompleted: parseInt(form.sessionsCompleted) || 0,
        pricePerSession: parseInt(form.pricePerSession) || 499,
        expertise: form.expertise.filter(e => e.trim() !== ''),
      };

      if (editingCounselor) {
        await updateAdminCounselor(editingCounselor._id, data);
        toast.success('Counselor updated successfully!');
      } else {
        await createAdminCounselor(data);
        toast.success('Counselor created successfully!');
      }
      setShowModal(false);
      setEditingCounselor(null);
      resetForm();
      loadCounselors();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this counselor?')) return;
    try {
      await deleteAdminCounselor(id);
      toast.success('Counselor deleted');
      loadCounselors();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleCounselorStatus(id);
      toast.success('Status toggled');
      loadCounselors();
    } catch (err) {
      toast.error('Failed to toggle status');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await toggleCounselorFeatured(id);
      toast.success('Featured toggled');
      loadCounselors();
    } catch (err) {
      toast.error('Failed to toggle featured');
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      title: '',
      expertise: [],
      experience: '',
      rating: '',
      reviews: '',
      image: '',
      available: true,
      sessionsCompleted: '',
      location: '',
      email: '',
      phone: '',
      bio: '',
      languages: ['English'],
      pricePerSession: '',
      isActive: true,
      isFeatured: false,
    });
    setExpertiseInput('');
  };

  const openEditModal = (counselor) => {
    setEditingCounselor(counselor);
    setForm({
      name: counselor.name || '',
      title: counselor.title || '',
      expertise: counselor.expertise || [],
      experience: counselor.experience?.toString() || '',
      rating: counselor.rating?.toString() || '',
      reviews: counselor.reviews?.toString() || '',
      image: counselor.image || '',
      available: counselor.available !== undefined ? counselor.available : true,
      sessionsCompleted: counselor.sessionsCompleted?.toString() || '',
      location: counselor.location || '',
      email: counselor.email || '',
      phone: counselor.phone || '',
      bio: counselor.bio || '',
      languages: counselor.languages || ['English'],
      pricePerSession: counselor.pricePerSession?.toString() || '',
      isActive: counselor.isActive !== undefined ? counselor.isActive : true,
      isFeatured: counselor.isFeatured || false,
    });
    setShowModal(true);
  };

  const addExpertise = () => {
    if (expertiseInput.trim() && !form.expertise.includes(expertiseInput.trim())) {
      setForm({ ...form, expertise: [...form.expertise, expertiseInput.trim()] });
      setExpertiseInput('');
    }
  };

  const removeExpertise = (exp) => {
    setForm({ ...form, expertise: form.expertise.filter(e => e !== exp) });
  };

  return (
    <div>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🎯 Counselors Management</h1>
          <p style={styles.subtitle}>Manage all counselors displayed on the website</p>
        </div>
        <button style={styles.addBtn} onClick={() => { resetForm(); setEditingCounselor(null); setShowModal(true); }}>
          <Plus size={16} /> Add Counselor
        </button>
      </div>

      {/* Search */}
      <div style={styles.searchWrap}>
        <Search size={18} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by name, title, or expertise..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        {loading ? (
          <div style={styles.loading}>Loading counselors...</div>
        ) : counselors.length === 0 ? (
          <div style={styles.empty}>No counselors found. Add your first counselor!</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Counselor</th>
                <th style={styles.th}>Expertise</th>
                <th style={styles.th}>Rating</th>
                <th style={styles.th}>Sessions</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Featured</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {counselors.map((c) => (
                <tr key={c._id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.counselorInfo}>
                      <div style={styles.avatar}>
                        {c.image ? (
                          <img src={c.image} alt={c.name} style={styles.avatarImg} />
                        ) : (
                          <span style={styles.avatarText}>{c.name?.charAt(0) || 'C'}</span>
                        )}
                      </div>
                      <div>
                        <div style={styles.counselorName}>{c.name}</div>
                        <div style={styles.counselorTitle}>{c.title}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.expertiseWrap}>
                      {c.expertise?.slice(0, 3).map((exp) => (
                        <span key={exp} style={styles.expertiseTag}>{exp}</span>
                      ))}
                      {c.expertise?.length > 3 && (
                        <span style={styles.expertiseMore}>+{c.expertise.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.rating}>{c.rating || 0} ⭐</span>
                    <span style={styles.reviews}>({c.reviews || 0})</span>
                  </td>
                  <td style={styles.td}>{c.sessionsCompleted || 0}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.statusBtn, ...(c.isActive ? styles.statusActive : styles.statusInactive) }}
                      onClick={() => handleToggleStatus(c._id)}
                    >
                      {c.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.featuredBtn, ...(c.isFeatured ? styles.featuredOn : styles.featuredOff) }}
                      onClick={() => handleToggleFeatured(c._id)}
                    >
                      {c.isFeatured ? <Star size={14} /> : <StarOff size={14} />}
                    </button>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actions}>
                      <button style={styles.editBtn} onClick={() => openEditModal(c)}>
                        <Edit size={14} />
                      </button>
                      <button style={styles.deleteBtn} onClick={() => handleDelete(c._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{editingCounselor ? 'Edit Counselor' : 'Add New Counselor'}</h2>
              <button style={styles.modalClose} onClick={() => { setShowModal(false); resetForm(); }}>×</button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Experience (Years)</label>
                  <input
                    type="number"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Price per Session (₹)</label>
                  <input
                    type="number"
                    value={form.pricePerSession}
                    onChange={(e) => setForm({ ...form, pricePerSession: e.target.value })}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    style={styles.input}
                    min="0"
                    max="5"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Reviews</label>
                  <input
                    type="number"
                    value={form.reviews}
                    onChange={(e) => setForm({ ...form, reviews: e.target.value })}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Sessions Completed</label>
                  <input
                    type="number"
                    value={form.sessionsCompleted}
                    onChange={(e) => setForm({ ...form, sessionsCompleted: e.target.value })}
                    style={styles.input}
                    min="0"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Languages (comma separated)</label>
                  <input
                    type="text"
                    value={form.languages.join(', ')}
                    onChange={(e) => setForm({ ...form, languages: e.target.value.split(',').map(s => s.trim()) })}
                    style={styles.input}
                    placeholder="English, Hindi"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Image URL</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    style={styles.input}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Expertise</label>
                  <div style={styles.expertiseInputWrap}>
                    <input
                      type="text"
                      value={expertiseInput}
                      onChange={(e) => setExpertiseInput(e.target.value)}
                      style={{ ...styles.input, flex: 1 }}
                      placeholder="Add expertise..."
                      onKeyPress={(e) => e.key === 'Enter' && addExpertise()}
                    />
                    <button type="button" style={styles.addExpertiseBtn} onClick={addExpertise}>Add</button>
                  </div>
                  <div style={styles.expertiseTags}>
                    {form.expertise.map((exp) => (
                      <span key={exp} style={styles.tag}>
                        {exp}
                        <button type="button" style={styles.tagRemove} onClick={() => removeExpertise(exp)}>×</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Bio</label>
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Available</label>
                  <select
                    value={form.available ? 'true' : 'false'}
                    onChange={(e) => setForm({ ...form, available: e.target.value === 'true' })}
                    style={styles.input}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Active</label>
                  <select
                    value={form.isActive ? 'true' : 'false'}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value === 'true' })}
                    style={styles.input}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Featured</label>
                  <select
                    value={form.isFeatured ? 'true' : 'false'}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.value === 'true' })}
                    style={styles.input}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div style={styles.formActions}>
                <button type="submit" style={styles.submitBtn}>
                  {editingCounselor ? 'Update Counselor' : 'Create Counselor'}
                </button>
                <button type="button" style={styles.cancelBtn} onClick={() => { setShowModal(false); resetForm(); }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: '#f0f0f0',
    marginBottom: 4,
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    background: '#f5c518',
    border: 'none',
    borderRadius: 10,
    color: '#0a0a0a',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  },
  searchWrap: {
    position: 'relative',
    marginBottom: 20,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#555',
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px 10px 40px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: 10,
    color: '#f0f0f0',
    fontSize: 14,
    outline: 'none',
  },
  tableWrap: {
    background: '#111',
    border: '1px solid #1e1e1e',
    borderRadius: 14,
    overflow: 'hidden',
  },
  loading: {
    padding: '60px 20px',
    textAlign: 'center',
    color: '#555',
  },
  empty: {
    padding: '60px 20px',
    textAlign: 'center',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: 11,
    fontWeight: 600,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #1e1e1e',
  },
  tr: {
    borderBottom: '1px solid #161616',
  },
  td: {
    padding: '12px 16px',
    verticalAlign: 'middle',
  },
  counselorInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: '#f5c518',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 700,
    color: '#0a0a0a',
  },
  counselorName: {
    fontWeight: 600,
    color: '#e0e0e0',
    fontSize: 14,
  },
  counselorTitle: {
    fontSize: 12,
    color: '#666',
  },
  expertiseWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
  },
  expertiseTag: {
    fontSize: 10,
    padding: '2px 8px',
    background: 'rgba(245,197,24,0.1)',
    color: '#f5c518',
    borderRadius: 4,
  },
  expertiseMore: {
    fontSize: 10,
    color: '#555',
  },
  rating: {
    color: '#f5c518',
    fontWeight: 600,
    fontSize: 13,
  },
  reviews: {
    color: '#555',
    fontSize: 11,
    marginLeft: 4,
  },
  statusBtn: {
    padding: '3px 12px',
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
  },
  statusActive: {
    background: 'rgba(34,197,94,0.15)',
    color: '#22c55e',
  },
  statusInactive: {
    background: 'rgba(239,68,68,0.15)',
    color: '#ef4444',
  },
  featuredBtn: {
    padding: '4px 8px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    background: 'transparent',
  },
  featuredOn: {
    color: '#f5c518',
  },
  featuredOff: {
    color: '#444',
  },
  actions: {
    display: 'flex',
    gap: 6,
  },
  editBtn: {
    padding: '4px 8px',
    background: 'rgba(59,130,246,0.15)',
    border: 'none',
    borderRadius: 6,
    color: '#3b82f6',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '4px 8px',
    background: 'rgba(239,68,68,0.15)',
    border: 'none',
    borderRadius: 6,
    color: '#ef4444',
    cursor: 'pointer',
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: 20,
  },
  modal: {
    background: '#111',
    borderRadius: 16,
    border: '1px solid #2a2a2a',
    maxWidth: 800,
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 24px',
    borderBottom: '1px solid #1e1e1e',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#f0f0f0',
  },
  modalClose: {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: 24,
    cursor: 'pointer',
  },
  form: {
    padding: 24,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 4,
  },
  input: {
    padding: '8px 12px',
    background: '#1a1a1a',
    border: '1px solid #2a2a2a',
    borderRadius: 8,
    color: '#f0f0f0',
    fontSize: 13,
    outline: 'none',
  },
  expertiseInputWrap: {
    display: 'flex',
    gap: 6,
  },
  addExpertiseBtn: {
    padding: '8px 14px',
    background: '#f5c518',
    border: 'none',
    borderRadius: 8,
    color: '#0a0a0a',
    fontWeight: 600,
    fontSize: 12,
    cursor: 'pointer',
  },
  expertiseTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '3px 8px',
    background: 'rgba(245,197,24,0.1)',
    color: '#f5c518',
    borderRadius: 4,
    fontSize: 12,
  },
  tagRemove: {
    background: 'none',
    border: 'none',
    color: '#f5c518',
    cursor: 'pointer',
    fontSize: 14,
    padding: '0 2px',
  },
  formActions: {
    display: 'flex',
    gap: 10,
    marginTop: 20,
    paddingTop: 16,
    borderTop: '1px solid #1e1e1e',
  },
  submitBtn: {
    padding: '10px 24px',
    background: '#f5c518',
    border: 'none',
    borderRadius: 10,
    color: '#0a0a0a',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  },
  cancelBtn: {
    padding: '10px 20px',
    background: 'transparent',
    border: '1px solid #2a2a2a',
    borderRadius: 10,
    color: '#888',
    fontWeight: 600,
    fontSize: 14,
    cursor: 'pointer',
  },
};