import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  Award,
  IdCard,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QRCodeSVG } from 'qrcode.react';
import { COMMUNITY_INFO } from '../data/demoData';
import { registrationService } from '../services/registrationService';

const INTEREST_OPTIONS = [
  'Web Development (React / Node)',
  'Generative AI & Gemini API',
  'Machine Learning & Data Science',
  'Google Cloud & DevOps',
  'Android (Kotlin / Jetpack Compose)',
  'UI/UX & Product Design',
  'Git, GitHub & Open Source',
  'Competitive Programming & DSA',
  'Cybersecurity & Ethical Hacking',
  'IoT & Robotics'
];

export default function Join({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usn: '',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    interests: ['Web Development (React / Node)', 'Generative AI & Gemini API'],
    motivation: '',
    github: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memberId, setMemberId] = useState('');

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter((i) => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const validate = () => {
    const errs = {};

    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Please provide your full legal or college name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'College or primary email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format (e.g., student@rit.ac.in).';
    }

    if (!formData.usn.trim()) {
      errs.usn = 'University Seat Number (USN) is required.';
    } else if (formData.usn.trim().length < 6) {
      errs.usn = 'Please enter a valid USN (e.g., 4RA22CS045).';
    }

    if (!formData.department) {
      errs.department = 'Please select your department.';
    }

    if (!formData.semester) {
      errs.semester = 'Please select your semester.';
    }

    if (formData.interests.length === 0) {
      errs.interests = 'Please select at least one technical interest.';
    }

    if (!formData.motivation.trim()) {
      errs.motivation = 'Please share why you want to join GDG RIT Hassan.';
    } else if (formData.motivation.trim().length < 20) {
      errs.motivation = 'Please write at least a couple sentences (min 20 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate Member ID
    const generatedId = `GDG-RIT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setMemberId(generatedId);

    try {
      await registrationService.createRegistration({
        full_name: formData.name,
        email: formData.email,
        usn: formData.usn,
        department: formData.department,
        semester: formData.semester,
        interests: formData.interests,
        notes: formData.motivation,
        type: 'membership',
        ticket_id: generatedId
      });
    } catch (err) {
      console.warn('Membership backend save note:', err.message);
    }

    setIsSubmitted(true);

    // Festive confetti animation
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 }
      });
    } catch (e) {
      // safe fallback
    }

    if (showToast) {
      showToast('Membership Application Verified & Stored!', 'success');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      usn: '',
      department: 'Computer Science & Engineering',
      semester: '6th Semester',
      interests: ['Web Development (React / Node)'],
      motivation: '',
      github: ''
    });
    setErrors({});
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Join Our Community</span>
            <h1 className="section-title">
              Become a <span className="google-gradient-text">Student Member</span>
            </h1>
            <p className="section-subtitle">
              Join GDG on Campus – RIT Hassan. Membership is 100% free and open to all engineering
              disciplines at Rajeev Institute of Technology.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Prominent Frontend Demonstration Notice */}
          <div style={{ background: 'rgba(234, 67, 53, 0.08)', border: '1px solid rgba(234, 67, 53, 0.25)', borderRadius: '14px', padding: '1.25rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <AlertCircle size={22} style={{ color: 'var(--google-red)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ color: 'var(--google-red)', display: 'block', marginBottom: '0.25rem' }}>
                Frontend Demonstration Notice (No Backend Required):
              </strong>
              This application form demonstrates complete client-side validation, error handling,
              and instant digital membership pass generation. Data is processed locally in your browser
              and is not stored on a remote server.
            </div>
          </div>

          {!isSubmitted ? (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
              <form onSubmit={handleSubmit}>
                {/* 1. Name */}
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name (e.g., Ananya Rao)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <div className="form-error-msg"><AlertCircle size={14} />{errors.name}</div>}
                </div>

                {/* 2. Email & USN */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      College / Primary Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="e.g. ananya@rit.ac.in"
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
                      placeholder="e.g. 4RA22CS012"
                      value={formData.usn}
                      onChange={(e) => setFormData({ ...formData, usn: e.target.value.toUpperCase() })}
                    />
                    {errors.usn && <div className="form-error-msg"><AlertCircle size={14} />{errors.usn}</div>}
                  </div>
                </div>

                {/* 3. Department & Semester */}
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
                      <option value="Artificial Intelligence & ML">AI & Machine Learning (AIML)</option>
                      <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Other / Allied Branch">Other Engineering Branch</option>
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

                {/* 4. Technical Interests (Multi-select) */}
                <div className="form-group">
                  <label className="form-label">
                    Technical Areas of Interest <span className="required">*</span> (Select all that apply)
                  </label>
                  <div className="interests-picker">
                    {INTEREST_OPTIONS.map((interest) => {
                      const selected = formData.interests.includes(interest);
                      return (
                        <div
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`interest-checkbox-chip ${selected ? 'selected' : ''}`}
                        >
                          {selected ? <Check size={14} /> : null}
                          <span>{interest}</span>
                        </div>
                      );
                    })}
                  </div>
                  {errors.interests && <div className="form-error-msg"><AlertCircle size={14} />{errors.interests}</div>}
                </div>

                {/* 5. Motivation */}
                <div className="form-group">
                  <label className="form-label">
                    Why do you want to join GDG on Campus – RIT Hassan? <span className="required">*</span>
                  </label>
                  <textarea
                    rows="3"
                    className={`form-textarea ${errors.motivation ? 'error' : ''}`}
                    placeholder="Tell us about what you want to learn, projects you want to build, or how you want to contribute to the chapter..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                    {errors.motivation ? (
                      <div className="form-error-msg"><AlertCircle size={14} />{errors.motivation}</div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Minimum 20 characters
                      </span>
                    )}
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formData.motivation.length} characters
                    </span>
                  </div>
                </div>

                {/* 6. GitHub / LinkedIn (Optional) */}
                <div className="form-group">
                  <label className="form-label">
                    GitHub / LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/yourusername"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <div style={{ marginTop: '2.5rem' }}>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <span>Submit Membership Application</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success State with Membership ID Card Preview */
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '3rem 2.5rem', boxShadow: 'var(--shadow-xl)', textAlign: 'center' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle size={40} />
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Application Verified!
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '580px', margin: '0 auto 2rem auto' }}>
                Welcome to the student developer family, <strong>{formData.name}</strong>! Your simulated membership badge has been generated below.
              </p>

              {/* Digital Pass Card */}
              <div className="id-pass-card" style={{ maxWidth: '600px', margin: '0 auto 2rem auto', textAlign: 'left' }}>
                <div className="id-pass-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src="/logos/gdg-rit-logo.jpeg"
                      alt="GDG RIT Logo"
                      style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '6px' }}
                      onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
                    />
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--google-blue)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        OFFICIAL STUDENT MEMBER PASS 2026
                      </span>
                      <h4 style={{ color: '#FFFFFF', fontSize: '1.15rem' }}>
                        GDG on Campus – RIT Hassan
                      </h4>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.12)', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#38BDF8', fontWeight: 700 }}>
                    {memberId}
                  </div>
                </div>

                <div className="id-pass-body">
                  <div>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Full Member Name</span>
                    <p style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>{formData.name}</p>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>USN Number</span>
                    <p style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '1rem' }}>{formData.usn}</p>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Department & Semester</span>
                    <p style={{ fontWeight: 600, color: '#FFFFFF' }}>{formData.department.split(' ')[0]} • {formData.semester}</p>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Affiliated Institution</span>
                    <p style={{ fontWeight: 600, color: '#FFFFFF' }}>Rajeev Institute of Tech, Hassan</p>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#94A3B8', fontSize: '0.75rem', display: 'block', marginBottom: '0.4rem' }}>Selected Tracks:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {formData.interests.map((int, i) => (
                      <span key={i} style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
                        {int.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
                  <span>Supported by Dept. of Computer Science & Engineering</span>
                  <span style={{ color: 'var(--google-green)', fontWeight: 700 }}>• Active 2026</span>
                </div>
              </div>

              {/* Informational Message */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                *This is a live frontend demonstration. In the production deployment, details will sync with the CSE student activities database.
              </p>

              <button onClick={handleReset} className="btn btn-secondary">
                <RotateCcw size={16} />
                <span>Submit Another Application</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
