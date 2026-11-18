import React, { useState, useEffect } from 'react';
import { QrCode, CheckCircle2, Search, Users, AlertCircle, Sparkles, Clock, RefreshCw } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import AdminLayout from '../../components/admin/AdminLayout';
import { attendanceService } from '../../services/attendanceService';
import { eventService } from '../../services/eventService';
import { registrationService } from '../../services/registrationService';

export default function AdminAttendance() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check-in input state
  const [scanInput, setScanInput] = useState('');
  const [checkInMethod, setCheckInMethod] = useState('qr');
  const [feedback, setFeedback] = useState(null);

  // QR preview generator state
  const [sampleQrValue, setSampleQrValue] = useState('GDG-RIT-482190');

  const loadData = async () => {
    setLoading(true);
    try {
      const [eventsRes, regsRes] = await Promise.all([
        eventService.getAllEvents(),
        registrationService.getAllRegistrations()
      ]);

      const evts = eventsRes.data || [];
      setEvents(evts);
      setRegistrations(regsRes.data || []);

      if (evts.length > 0 && !selectedEventId) {
        setSelectedEventId(evts[0].id);
        const attRes = await attendanceService.getAttendanceByEvent(evts[0].id);
        setAttendanceRecords(attRes.data || []);
      }
    } catch (err) {
      console.error('Error loading attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectEvent = async (eventId) => {
    setSelectedEventId(eventId);
    setFeedback(null);
    try {
      const attRes = await attendanceService.getAttendanceByEvent(eventId);
      setAttendanceRecords(attRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    setFeedback(null);

    try {
      const normalizedInput = scanInput.trim().toUpperCase();

      // Find registration if matching
      const matchingReg = registrations.find(
        (r) =>
          (r.ticket_id && r.ticket_id.toUpperCase() === normalizedInput) ||
          (r.usn && r.usn.toUpperCase() === normalizedInput)
      );

      const ticketId = matchingReg?.ticket_id || normalizedInput;
      const usn = matchingReg?.usn || (normalizedInput.startsWith('4RA') ? normalizedInput : '4RA22CS012');
      const attendeeName = matchingReg?.full_name || 'Verified Participant';

      await attendanceService.checkInAttendee({
        eventId: selectedEventId,
        ticketId,
        usn,
        attendeeName,
        checkInMethod,
        verifiedBy: 'Coordinator Desk'
      });

      setFeedback({
        type: 'success',
        message: `Success! Checked in ${attendeeName} (${usn}) for this session.`
      });

      setScanInput('');

      // Reload attendance list
      const attRes = await attendanceService.getAttendanceByEvent(selectedEventId);
      setAttendanceRecords(attRes.data || []);
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Check-in failed.'
      });
    }
  };

  const currentEvent = events.find((e) => e.id === selectedEventId);
  const checkedInCount = attendanceRecords.length;

  return (
    <AdminLayout title="Attendance & QR Verification">
      {/* Event Selection & Summary Bar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <span className="section-tag" style={{ margin: 0 }}>Active Event Desk</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.4rem' }}>
              {currentEvent ? currentEvent.title : 'Select Event'}
            </h2>
          </div>

          <div style={{ minWidth: '280px' }}>
            <label className="form-label" style={{ fontSize: '0.75rem' }}>Select Event to Track:</label>
            <select
              className="form-select"
              value={selectedEventId}
              onChange={(e) => handleSelectEvent(e.target.value)}
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.title} ({evt.date})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Counter Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CHECKED-IN ATTENDEES</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--google-green)', marginTop: '2px' }}>
              {checkedInCount}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>EVENT CAPACITY</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {currentEvent?.capacity || '150 Attendees'}
            </div>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>VENUE STATUS</span>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--google-blue)', marginTop: '8px' }}>
              {currentEvent?.venue || 'CSE Auditorium'}
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Scanner & Action Box */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
        {/* Scanner Form */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <QrCode size={20} style={{ color: 'var(--google-blue)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Scan QR or Enter USN</h3>
          </div>

          <form onSubmit={handleCheckIn}>
            <div className="form-group">
              <label className="form-label">Ticket ID or Student USN</label>
              <input
                type="text"
                required
                className="form-input"
                placeholder="Scan QR or type e.g. GDG-RIT-482190 or 4RA22CS012"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="method"
                  checked={checkInMethod === 'qr'}
                  onChange={() => setCheckInMethod('qr')}
                />
                <span>QR Scanner</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="method"
                  checked={checkInMethod === 'manual'}
                  onChange={() => setCheckInMethod('manual')}
                />
                <span>Manual Desk Entry</span>
              </label>
            </div>

            {feedback && (
              <div
                style={{
                  background: feedback.type === 'success' ? 'rgba(52, 168, 83, 0.1)' : 'rgba(234, 67, 53, 0.1)',
                  border: `1px solid ${feedback.type === 'success' ? 'rgba(52, 168, 83, 0.3)' : 'rgba(234, 67, 53, 0.3)'}`,
                  color: feedback.type === 'success' ? 'var(--google-green)' : 'var(--google-red)',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{feedback.message}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <CheckCircle2 size={16} />
              <span>Verify & Mark Attendance</span>
            </button>
          </form>
        </div>

        {/* QR Code Pass Preview Generator for Testing */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Interactive QR Pass Generator
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Simulate scanning an attendee's digital pass
          </p>

          <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '14px', boxShadow: 'var(--shadow-md)', marginBottom: '1rem' }}>
            <QRCodeSVG value={sampleQrValue} size={130} />
          </div>

          <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: 700, color: 'var(--google-blue)', marginBottom: '0.75rem' }}>
            {sampleQrValue}
          </div>

          <button
            type="button"
            onClick={() => setScanInput(sampleQrValue)}
            className="btn btn-secondary btn-sm"
          >
            <span>Load into Scanner</span>
          </button>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Checked-in Attendees Log</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{attendanceRecords.length} Verified Entries</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Attendee Name</th>
                <th>USN</th>
                <th>Ticket ID</th>
                <th>Method</th>
                <th>Check-in Time</th>
                <th>Desk Officer</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.length > 0 ? (
                attendanceRecords.map((att) => (
                  <tr key={att.id}>
                    <td style={{ fontWeight: 700 }}>{att.attendee_name}</td>
                    <td>{att.usn}</td>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--google-blue)' }}>
                        {att.ticket_id}
                      </span>
                    </td>
                    <td>
                      <span className="skill-chip" style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                        {att.check_in_method || 'qr'}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {new Date(att.checked_in_at || Date.now()).toLocaleTimeString()}
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>{att.verified_by || 'Admin Desk'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No check-ins recorded for this event yet. Use the scanner above to mark attendance.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
