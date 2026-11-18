import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, Calendar, MapPin, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { eventService } from '../../services/eventService';

const CATEGORIES = [
  'Hackathons',
  'Coding competitions',
  'Technical talks',
  'Developer meetups',
  'Workshops'
];

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hackathons',
    description: '',
    date: '',
    time: '10:00 AM - 01:00 PM',
    venue: 'CSE Seminar Hall, RIT Hassan',
    mode: 'In-Person',
    capacity: '100 Attendees',
    color: '#4285F4',
    badge: 'Upcoming Event',
    prerequisites: 'Open to all engineering students.',
    is_published: true
  });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const { data } = await eventService.getAllEvents();
      setEvents(data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'Hackathons',
      description: '',
      date: 'April 25, 2026',
      time: '10:00 AM - 01:00 PM',
      venue: 'CSE Seminar Hall, RIT Hassan',
      mode: 'In-Person',
      capacity: '120 Attendees',
      color: '#4285F4',
      badge: 'Upcoming Event',
      prerequisites: 'Open to all engineering students.',
      is_published: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (evt) => {
    setEditingEvent(evt);
    setFormData({
      title: evt.title || '',
      category: evt.category || 'Hackathons',
      description: evt.description || '',
      date: evt.date || '',
      time: evt.time || '',
      venue: evt.venue || '',
      mode: evt.mode || 'In-Person',
      capacity: evt.capacity || '100 Attendees',
      color: evt.color || '#4285F4',
      badge: evt.badge || 'Upcoming Event',
      prerequisites: evt.prerequisites || '',
      is_published: evt.is_published ?? true
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, formData);
      } else {
        await eventService.createEvent(formData);
      }
      setModalOpen(false);
      await loadEvents();
    } catch (err) {
      alert('Error saving event: ' + err.message);
    }
  };

  const handleTogglePublish = async (evt) => {
    try {
      await eventService.togglePublish(evt.id, evt.is_published);
      await loadEvents();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await eventService.deleteEvent(deleteId);
      setDeleteId(null);
      await loadEvents();
    } catch (err) {
      alert('Error deleting event: ' + err.message);
    }
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Event Management">
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="search-input-wrap" style={{ minWidth: '320px', flex: 'unset' }}>
          <Search size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search events by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={handleOpenCreate} className="btn btn-primary">
          <Plus size={18} />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Events Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Category</th>
                <th>Date & Venue</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((evt) => (
                  <tr key={evt.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{evt.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {evt.description}
                      </div>
                    </td>
                    <td>
                      <span className="event-category-badge" style={{ backgroundColor: `${evt.color || '#4285F4'}15`, color: evt.color || '#4285F4' }}>
                        {evt.category}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{evt.date}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.venue}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>{evt.capacity || 'Unlimited'}</td>
                    <td>
                      <button
                        onClick={() => handleTogglePublish(evt)}
                        className={`admin-toggle-btn ${evt.is_published ? 'published' : 'draft'}`}
                        title={evt.is_published ? 'Click to Unpublish' : 'Click to Publish'}
                      >
                        {evt.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                        <span>{evt.is_published ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          title="Edit Event"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(evt.id)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px', color: 'var(--google-red)' }}
                          title="Delete Event"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No events matching your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '640px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>
              {editingEvent ? 'Edit Event Details' : 'Create New Event'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Event Title <span className="required">*</span></label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. CODESTORM 2026: Campus Hackathon"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Badge Label</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Flagship Hackathon"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Event Date <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. April 18 - 19, 2026"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Event Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 09:00 AM - 09:00 AM (24 Hrs)"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Venue Location <span className="required">*</span></label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. CSE Seminar Hall, RIT Hassan"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Capacity / Teams</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 150 Attendees"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description <span className="required">*</span></label>
                <textarea
                  rows="3"
                  required
                  className="form-textarea"
                  placeholder="Provide an overview of the event, themes, and what students will build..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Prerequisites</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bring laptops with Python or Node.js installed."
                  value={formData.prerequisites}
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1rem', marginBottom: '1.5rem' }}>
                <input
                  type="checkbox"
                  id="pub-check"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  style={{ width: '18px', height: '18px' }}
                />
                <label htmlFor="pub-check" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  Publish immediately to public Events page
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingEvent ? 'Save Changes' : 'Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Event"
        message="Are you sure you want to permanently delete this event? This action will remove it from the public schedule."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}
