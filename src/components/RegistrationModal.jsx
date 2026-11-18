import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Ticket, Calendar, MapPin, AlertCircle, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { registrationService } from '../services/registrationService';

export default function RegistrationModal({ isOpen, onClose, targetItem, type = 'event' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usn: '',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Reset state when modal opens with new item
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setErrors({});
      setFormData({
        name: '',
        email: '',
        usn: '',
        department: 'Computer Science & Engineering',
        semester: '6th Semester',
        notes: ''
      });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !targetItem) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    
    if (!formData.email.trim()) {
      errs.email = 'College email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.usn.trim()) {
      errs.usn = 'University Seat Number (USN) is required.';
    } else if (formData.usn.trim().length < 6) {
      errs.usn = 'Please enter a valid USN (e.g., 4RA22CS001).';
    }

    if (!formData.department) errs.department = 'Please select your department.';
    if (!formData.semester) errs.semester = 'Please select your current semester.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate random Ticket ID
    const randomTicket = `GDG-RIT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(randomTicket);

    try {
      // Save to Supabase backend
      await registrationService.createRegistration({
        full_name: formData.name,
        email: formData.email,
        usn: formData.usn,
        department: formData.department,
        semester: formData.semester,
        notes: formData.notes,
        type: type,
        event_id: type === 'event' && targetItem.id && targetItem.id.length > 10 ? targetItem.id : null,
        workshop_id: type === 'workshop' && targetItem.id && targetItem.id.length > 10 ? targetItem.id : null,
        ticket_id: randomTicket
      });
    } catch (err) {
      console.warn('Backend registration store note:', err.message);
    }

    setIsSubmitted(true);

    // Fire festive confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="section-tag" style={{ margin: 0 }}>
                {type === 'event' ? 'Event Registration' : 'Workshop Enrollment'}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                • Free for RIT Students
              </span>
            </div>

            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {targetItem.title}
            </h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              {targetItem.date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Calendar size={15} style={{ color: 'var(--google-blue)' }} />
                  <span>{targetItem.date}</span>
                </div>
              )}
              {targetItem.venue && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={15} style={{ color: 'var(--google-red)' }} />
                  <span>{targetItem.venue}</span>
                </div>
              )}
            </div>

            <div style={{ background: 'rgba(66, 133, 244, 0.06)', borderLeft: '3px solid var(--google-blue)', padding: '0.75rem 1rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <strong>Frontend Demo Note:</strong> This form demonstrates client-side validation and simulated instant pass issuance without requiring a live database.
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <div className="form-error-msg"><AlertCircle size={14} />{errors.name}</div>}
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    College / Personal Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="e.g. rahul@rit.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <div className="form-error-msg"><AlertCircle size={14} />{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    University Seat No. (USN) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.usn ? 'error' : ''}`}
                    placeholder="e.g. 4RA22CS045"
                    value={formData.usn}
                    onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                  />
                  {errors.usn && <div className="form-error-msg"><AlertCircle size={14} />{errors.usn}</div>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Department / Branch <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                    <option value="Information Science & Engineering">Information Science & Engineering (ISE)</option>
                    <option value="AI & Machine Learning">AI & Machine Learning (AIML)</option>
                    <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Other / Allied Branch">Other / Allied Branch</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Current Semester <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  >
                    <option value="1st Semester">1st Semester (1st Year)</option>
                    <option value="2nd Semester">2nd Semester (1st Year)</option>
                    <option value="3rd Semester">3rd Semester (2nd Year)</option>
                    <option value="4th Semester">4th Semester (2nd Year)</option>
                    <option value="5th Semester">5th Semester (3rd Year)</option>
                    <option value="6th Semester">6th Semester (3rd Year)</option>
                    <option value="7th Semester">7th Semester (Final Year)</option>
                    <option value="8th Semester">8th Semester (Final Year)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Special Requirements or Questions (Optional)
                </label>
                <textarea
                  rows="2"
                  className="form-textarea"
                  placeholder="e.g. Dietary preferences if hackathon, GitHub profile, team details..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>Confirm Registration</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Pass Preview */
          <div style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Registration Confirmed!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Thank you, <strong>{formData.name}</strong>. Your place has been reserved for <strong>{targetItem.title}</strong>.
            </p>

            {/* Digital Pass / Ticket */}
            <div className="id-pass-card" style={{ textAlign: 'left' }}>
              <div className="id-pass-header">
                <div>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--google-blue)', letterSpacing: '0.1em', fontWeight: 700 }}>
                    OFFICIAL ENTRY PASS
                  </span>
                  <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginTop: '2px' }}>
                    {targetItem.title}
                  </h4>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '0.35rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'monospace', color: '#38BDF8' }}>
                  {ticketId}
                </div>
              </div>

              <div className="id-pass-body">
                <div>
                  <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Attendee Name</span>
                  <p style={{ fontWeight: 600, color: '#FFFFFF' }}>{formData.name}</p>
                </div>
                <div>
                  <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>USN</span>
                  <p style={{ fontWeight: 600, color: '#FFFFFF' }}>{formData.usn}</p>
                </div>
                <div>
                  <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Branch & Sem</span>
                  <p style={{ fontWeight: 600, color: '#FFFFFF' }}>{formData.department.split(' ')[0]} • {formData.semester.split(' ')[0]}</p>
                </div>
                <div>
                  <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Venue / Mode</span>
                  <p style={{ fontWeight: 600, color: '#FFFFFF' }}>{targetItem.venue || targetItem.mode || 'CSE Seminar Hall'}</p>
                </div>
              </div>

              {/* QR Verification Code */}
              <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <span style={{ color: '#38BDF8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>QR Entry Pass</span>
                  <p style={{ fontSize: '0.75rem', color: '#CBD5E1', marginTop: '2px' }}>Scan at desk to mark attendance</p>
                </div>
                <div style={{ background: '#FFFFFF', padding: '6px', borderRadius: '6px' }}>
                  <QRCodeSVG value={ticketId} size={64} />
                </div>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                <span>GDG on Campus – RIT Hassan</span>
                <span style={{ color: 'var(--google-green)', fontWeight: 600 }}>• Verified Entry</span>
              </div>
            </div>

            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Note: A confirmation pass copy has been simulated. Keep your USN handy when arriving at the venue.
            </p>

            <button onClick={onClose} className="btn btn-primary" style={{ minWidth: '160px' }}>
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
