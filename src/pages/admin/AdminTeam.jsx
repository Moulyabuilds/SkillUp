import React, { useState, useEffect } from 'react';
import { Plus, UserCheck, Edit2, Trash2, Search } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { teamService } from '../../services/teamService';

const CATEGORIES = [
  'Faculty Coordinators',
  'Club Coordinators',
  'Core Team',
  'Volunteers'
];

export default function AdminTeam() {
  const [members, setMembers] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    category: 'Core Team',
    department: 'Computer Science & Engineering',
    designation: '',
    bio: '',
    avatar_placeholder: 'GL',
    social_github: 'https://github.com',
    social_linkedin: 'https://linkedin.com',
    is_placeholder: false,
    order_index: 10
  });

  const loadMembers = async () => {
    setLoading(true);
    try {
      const { data } = await teamService.getTeamMembers();
      setMembers(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleOpenCreate = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: 'Web Tech Lead',
      category: 'Core Team',
      department: 'Computer Science & Engineering',
      designation: 'Student Organizer',
      bio: '',
      avatar_placeholder: 'TL',
      social_github: 'https://github.com',
      social_linkedin: 'https://linkedin.com',
      is_placeholder: false,
      order_index: members.length + 1
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData({
      name: m.name || '',
      role: m.role || '',
      category: m.category || 'Core Team',
      department: m.department || '',
      designation: m.designation || '',
      bio: m.bio || '',
      avatar_placeholder: m.avatar_placeholder || 'GL',
      social_github: m.social_github || '',
      social_linkedin: m.social_linkedin || '',
      is_placeholder: m.is_placeholder ?? false,
      order_index: m.order_index ?? 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await teamService.updateTeamMember(editingMember.id, formData);
      } else {
        await teamService.createTeamMember(formData);
      }
      setModalOpen(false);
      await loadMembers();
    } catch (err) {
      alert('Error saving team member: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await teamService.deleteTeamMember(deleteId);
      setDeleteId(null);
      await loadMembers();
    } catch (err) {
      alert('Error deleting member: ' + err.message);
    }
  };

  const filteredMembers = members.filter((m) =>
    categoryFilter === 'All' || m.category === categoryFilter
  );

  return (
    <AdminLayout title="Team & Volunteer Leadership">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`btn btn-sm ${categoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={18} />
          <span>Add Member Profile</span>
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Member Name & Role</th>
                <th>Category</th>
                <th>Department</th>
                <th>Placeholder?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{m.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--google-blue)', fontWeight: 600 }}>{m.role}</div>
                  </td>
                  <td>
                    <span className="skill-chip">{m.category}</span>
                  </td>
                  <td>{m.department}</td>
                  <td>
                    {m.is_placeholder ? (
                      <span style={{ fontSize: '0.75rem', color: 'var(--google-yellow)', fontWeight: 600 }}>Placeholder</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--google-green)', fontWeight: 600 }}>Official</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button onClick={() => handleOpenEdit(m)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => setDeleteId(m.id)} className="btn-icon" style={{ width: '32px', height: '32px', color: 'var(--google-red)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '580px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              {editingMember ? 'Edit Profile' : 'Add Team Member'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Role Designation <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category Tier</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio Description</label>
                <textarea
                  rows="2"
                  className="form-textarea"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="place-check"
                  checked={formData.is_placeholder}
                  onChange={(e) => setFormData({ ...formData, is_placeholder: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="place-check" style={{ fontSize: '0.85rem' }}>
                  Mark as temporary role placeholder until formal appointment
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMember ? 'Save Profile' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Remove Member"
        message="Are you sure you want to remove this member profile from the public directory?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}
