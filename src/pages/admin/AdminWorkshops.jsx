import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, BookOpen, User, Check, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { workshopService } from '../../services/workshopService';

const TRACKS = [
  'Web Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Google Cloud',
  'Android Development',
  'Git and GitHub',
  'Competitive Programming'
];

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    track: 'Web Development',
    level: 'Beginner',
    duration: '4 Weeks',
    date_range: 'Starts April 2026',
    instructor_role: 'Senior Tech Mentor, CSE',
    summary: '',
    syllabusText: '',
    prerequisites: 'Basic programming fundamentals.',
    color: '#4285F4',
    is_published: true
  });

  const loadWorkshops = async () => {
    setLoading(true);
    try {
      const { data } = await workshopService.getAllWorkshops();
      setWorkshops(data || []);
    } catch (err) {
      console.error('Error fetching workshops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const handleOpenCreate = () => {
    setEditingWorkshop(null);
    setFormData({
      title: '',
      track: 'Web Development',
      level: 'Beginner to Intermediate',
      duration: '4 Weeks',
      date_range: 'Starts April 10, 2026',
      instructor_role: 'Technical Lead, GDG RIT',
      summary: '',
      syllabusText: 'Module 1: Foundations\nModule 2: Core Components & State\nModule 3: Async APIs\nModule 4: Deployment',
      prerequisites: 'Basic programming fundamentals.',
      color: '#4285F4',
      is_published: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (ws) => {
    setEditingWorkshop(ws);
    const syllabusList = Array.isArray(ws.syllabus) ? ws.syllabus : [];
    setFormData({
      title: ws.title || '',
      track: ws.track || 'Web Development',
      level: ws.level || 'Beginner',
      duration: ws.duration || '',
      date_range: ws.date_range || '',
      instructor_role: ws.instructor_role || '',
      summary: ws.summary || '',
      syllabusText: syllabusList.join('\n'),
      prerequisites: ws.prerequisites || '',
      color: ws.color || '#4285F4',
      is_published: ws.is_published ?? true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const syllabusArray = formData.syllabusText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      syllabus: syllabusArray
    };
    delete payload.syllabusText;

    try {
      if (editingWorkshop) {
        await workshopService.updateWorkshop(editingWorkshop.id, payload);
      } else {
        await workshopService.createWorkshop(payload);
      }
      setModalOpen(false);
      await loadWorkshops();
    } catch (err) {
      alert('Error saving workshop: ' + err.message);
    }
  };

  const handleTogglePublish = async (ws) => {
    try {
      await workshopService.togglePublish(ws.id, ws.is_published);
      await loadWorkshops();
    } catch (err) {
      alert('Error toggling publish: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await workshopService.deleteWorkshop(deleteId);
      setDeleteId(null);
      await loadWorkshops();
    } catch (err) {
      alert('Error deleting workshop: ' + err.message);
    }
  };

  const filteredWorkshops = workshops.filter((w) =>
    w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.track.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Workshops Management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="search-input-wrap" style={{ minWidth: '320px', flex: 'unset' }}>
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search workshops by title or track..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={18} />
          <span>Add New Workshop</span>
        </button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Workshop Title</th>
                <th>Track</th>
                <th>Level</th>
                <th>Duration & Schedule</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkshops.length > 0 ? (
                filteredWorkshops.map((ws) => (
                  <tr key={ws.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{ws.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '340px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ws.summary}
                      </div>
                    </td>
                    <td>
                      <span className="skill-chip">{ws.track}</span>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{ws.level}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{ws.duration}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ws.date_range}</div>
                    </td>
                    <td>
                      <button
                        onClick={() => handleTogglePublish(ws)}
                        className={`admin-toggle-btn ${ws.is_published ? 'published' : 'draft'}`}
                      >
                        {ws.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                        <span>{ws.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => handleOpenEdit(ws)} className="btn-icon" style={{ width: '32px', height: '32px' }}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => setDeleteId(ws.id)} className="btn-icon" style={{ width: '32px', height: '32px', color: 'var(--google-red)' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No workshops found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Workshop Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '640px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              {editingWorkshop ? 'Edit Workshop' : 'Add New Workshop'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Workshop Title <span className="required">*</span></label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Modern Web Development with React & Vite"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Track Focus</label>
                  <select
                    className="form-select"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                  >
                    {TRACKS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty Level</label>
                  <select
                    className="form-select"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 4 Weeks (Weekend Cohort)"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Date Schedule</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Starts April 04, 2026"
                    value={formData.date_range}
                    onChange={(e) => setFormData({ ...formData, date_range: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Instructor / Mentor Designation</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Web Tech Lead, Dept. of CSE"
                  value={formData.instructor_role}
                  onChange={(e) => setFormData({ ...formData, instructor_role: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Summary Overview</label>
                <textarea
                  rows="2"
                  className="form-textarea"
                  placeholder="Brief description of what students will achieve..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Syllabus Highlights (One bullet per line)</label>
                <textarea
                  rows="3"
                  className="form-textarea"
                  placeholder="Module 1: Introduction&#10;Module 2: Building Components&#10;Module 3: Project Capstone"
                  value={formData.syllabusText}
                  onChange={(e) => setFormData({ ...formData, syllabusText: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="pub-ws"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="pub-ws" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Publish immediately to public Workshops catalog
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingWorkshop ? 'Save Changes' : 'Publish Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Workshop"
        message="Are you sure you want to delete this workshop cohort? Students will no longer see it in the catalog."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}
