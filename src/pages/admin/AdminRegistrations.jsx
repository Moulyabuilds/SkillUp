import React, { useState, useEffect } from 'react';
import { Search, Download, Filter, Trash2, CheckCircle2, XCircle, Eye, Ticket, Calendar, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { registrationService } from '../../services/registrationService';

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const [selectedReg, setSelectedReg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadRegistrations = async () => {
    setLoading(true);
    try {
      const { data } = await registrationService.getAllRegistrations();
      setRegistrations(data || []);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleExportCSV = () => {
    registrationService.exportRegistrationsCSV(filteredRegistrations);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await registrationService.updateStatus(id, newStatus);
      await loadRegistrations();
      if (selectedReg && selectedReg.id === id) {
        setSelectedReg((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await registrationService.deleteRegistration(deleteId);
      setDeleteId(null);
      await loadRegistrations();
    } catch (err) {
      alert('Error deleting registration: ' + err.message);
    }
  };

  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      (r.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.usn || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.ticket_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.email || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'All' || r.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <AdminLayout title="Registrations & Participant List">
      {/* Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
          <div className="search-input-wrap" style={{ minWidth: '280px' }}>
            <Search size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by student name, USN, or ticket ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="event">Events Only</option>
            <option value="workshop">Workshops Only</option>
            <option value="membership">Memberships</option>
          </select>

          <select
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem 1rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button onClick={handleExportCSV} className="btn btn-primary">
          <Download size={16} />
          <span>Export CSV ({filteredRegistrations.length})</span>
        </button>
      </div>

      {/* Registrations Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student Details</th>
                <th>Department & Sem</th>
                <th>Registration Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--google-blue)', fontSize: '0.9rem' }}>
                        {reg.ticket_id}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{reg.full_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        USN: {reg.usn} • {reg.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{reg.department ? reg.department.split(' ')[0] : 'CSE'}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{reg.semester}</div>
                    </td>
                    <td>
                      <span className="skill-chip" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                        {reg.type || 'event'}
                      </span>
                    </td>
                    <td>
                      <span className={`event-status-pill ${reg.status === 'confirmed' ? 'upcoming' : 'completed'}`}>
                        {reg.status || 'confirmed'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(reg.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          onClick={() => setSelectedReg(reg)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px' }}
                          title="View Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(reg.id)}
                          className="btn-icon"
                          style={{ width: '32px', height: '32px', color: 'var(--google-red)' }}
                          title="Remove Record"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No student registrations match current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Participant Detail Modal */}
      {selectedReg && (
        <div className="modal-backdrop" onClick={() => setSelectedReg(null)}>
          <div className="modal-dialog" style={{ maxWidth: '520px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span className="section-tag" style={{ margin: 0, textTransform: 'uppercase' }}>
                  {selectedReg.type || 'Event Registration'}
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.5rem' }}>
                  {selectedReg.full_name}
                </h3>
              </div>
              <div style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--google-blue)', background: 'var(--bg-tertiary)', padding: '0.35rem 0.65rem', borderRadius: '6px' }}>
                {selectedReg.ticket_id}
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>USN</span>
                <p style={{ fontWeight: 600 }}>{selectedReg.usn}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Email</span>
                <p style={{ fontWeight: 600 }}>{selectedReg.email}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Department</span>
                <p style={{ fontWeight: 600 }}>{selectedReg.department}</p>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Semester</span>
                <p style={{ fontWeight: 600 }}>{selectedReg.semester}</p>
              </div>
            </div>

            {selectedReg.notes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Student Notes / Motivation:</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{selectedReg.notes}</p>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleStatusChange(selectedReg.id, 'confirmed')}
                  className="btn btn-sm btn-green"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(selectedReg.id, 'cancelled')}
                  className="btn btn-sm btn-secondary"
                >
                  Cancel
                </button>
              </div>

              <button onClick={() => setSelectedReg(null)} className="btn btn-primary btn-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Registration Record"
        message="Are you sure you want to remove this registration from the database?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}
