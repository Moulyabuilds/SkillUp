import React, { useState, useEffect } from 'react';
import { Plus, Megaphone, Edit2, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { announcementService } from '../../services/announcementService';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    badge: 'Announcement',
    link_url: '/events',
    priority: 5,
    is_active: true
  });

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const { data } = await announcementService.getAllAnnouncements();
      setAnnouncements(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleOpenCreate = () => {
    setEditingAnn(null);
    setFormData({
      title: '',
      content: '',
      badge: 'Announcement',
      link_url: '/events',
      priority: 5,
      is_active: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ann) => {
    setEditingAnn(ann);
    setFormData({
      title: ann.title || '',
      content: ann.content || '',
      badge: ann.badge || 'Announcement',
      link_url: ann.link_url || '/events',
      priority: ann.priority ?? 5,
      is_active: ann.is_active ?? true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAnn) {
        await announcementService.updateAnnouncement(editingAnn.id, formData);
      } else {
        await announcementService.createAnnouncement(formData);
      }
      setModalOpen(false);
      await loadAnnouncements();
    } catch (err) {
      alert('Error saving announcement: ' + err.message);
    }
  };

  const handleToggleActive = async (ann) => {
    try {
      await announcementService.updateAnnouncement(ann.id, { is_active: !ann.is_active });
      await loadAnnouncements();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await announcementService.deleteAnnouncement(deleteId);
      setDeleteId(null);
      await loadAnnouncements();
    } catch (err) {
      alert('Error deleting announcement: ' + err.message);
    }
  };

  return (
    <AdminLayout title="Announcements Management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.2rem' }}>
            Campus Bulletins & Alerts
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Active announcements automatically appear in the top banner on the homepage.
          </p>
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={18} />
          <span>Post Announcement</span>
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Announcement Title & Content</th>
                <th>Badge</th>
                <th>Target Link</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.length > 0 ? (
                announcements.map((ann) => (
                  <tr key={ann.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ann.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>
                        {ann.content}
                      </div>
                    </td>
                    <td>
                      <span className="skill-chip" style={{ background: 'rgba(234, 67, 53, 0.1)', color: 'var(--google-red)' }}>
                        {ann.badge}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--google-blue)' }}>
                      {ann.link_url}
                    </td>
                    <td>{ann.priority}</td>
                    <td>
                      <button
                        onClick={() => handleToggleActive(ann)}
                        className={`admin-toggle-btn ${ann.is_active ? 'published' : 'draft'}`}
                      >
                        {ann.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                        <span>{ann.is_active ? 'Active' : 'Hidden'}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => handleOpenEdit(ann)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => setDeleteId(ann.id)} className="btn-icon" style={{ width: '32px', height: '32px', color: 'var(--google-red)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No announcements created.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '560px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              {editingAnn ? 'Edit Announcement' : 'Post New Announcement'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Headline / Title <span className="required">*</span></label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. CODESTORM 2026 Registration Live!"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Content <span className="required">*</span></label>
                <textarea
                  rows="3"
                  required
                  className="form-textarea"
                  placeholder="Details for students..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Badge Label</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Hackathon Alert"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Call-to-Action Link</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. /events or https://..."
                    value={formData.link_url}
                    onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="ann-active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="ann-active" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Display on Homepage immediately
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingAnn ? 'Save Changes' : 'Post Announcement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Announcement"
        message="Are you sure you want to delete this bulletin?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}
