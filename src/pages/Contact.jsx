import React, { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Clock
} from 'lucide-react';
import { COMMUNITY_INFO, FAQS } from '../data/demoData';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email format.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject line.';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Message must be at least 15 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
    if (showToast) {
      showToast('Thank you! Your message has been simulated successfully.', 'success');
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setErrors({});
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Get in Touch</span>
            <h1 className="section-title">
              Contact <span className="google-gradient-text">GDG on Campus – RIT Hassan</span>
            </h1>
            <p className="section-subtitle">
              Have questions about upcoming hackathons, workshop enrollments, club collaborations,
              or technical mentorship? Reach out to our campus organizing team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Left: Contact Details & Socials */}
            <div>
              <span className="section-tag">Direct Coordinates</span>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Campus Information
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                Our chapter is physically coordinated out of the Computer Science & Engineering department at Rajeev Institute of Technology, Hassan.
              </p>

              {/* Coordinates Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(234, 67, 53, 0.1)', color: 'var(--google-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>College Campus</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Rajeev Institute of Technology (RIT)<br />
                      Plot No. 1-D, Growth Center, Industrial Area, B-M Bypass Road, Hassan – 573201, Karnataka
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>Email Inquiries</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Chapter: <strong>{COMMUNITY_INFO.contactEmail}</strong><br />
                      CSE Dept: <strong>{COMMUNITY_INFO.altEmail}</strong>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>Office & Helpdesk Hours</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Monday – Saturday: 09:00 AM – 04:30 PM<br />
                      CSE Department Helpdesk, 2nd Floor, RIT Campus
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                Join Community Discussions
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Connect through our social channels for instant event announcements:
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={COMMUNITY_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <Github size={16} /> <span>GitHub</span>
                </a>
                <a href={COMMUNITY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <Linkedin size={16} /> <span>LinkedIn</span>
                </a>
                <a href={COMMUNITY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <Instagram size={16} /> <span>Instagram</span>
                </a>
                <a href={COMMUNITY_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <Twitter size={16} /> <span>Twitter</span>
                </a>
                <a href={COMMUNITY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <Youtube size={16} /> <span>YouTube</span>
                </a>
              </div>
            </div>

            {/* Right: Working Contact Form */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <MessageSquare size={18} style={{ color: 'var(--google-blue)' }} />
                <span className="section-tag" style={{ margin: 0 }}>Message Desk</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Send Us a Message
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Fill out the form below. Client-side validation ensures all required data is verified.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Varun Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <div className="form-error-msg"><AlertCircle size={14} />{errors.name}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="e.g. varun@rit.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <div className="form-error-msg"><AlertCircle size={14} />{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Subject <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input ${errors.subject ? 'error' : ''}`}
                      placeholder="e.g. Hackathon Query / Speaker Session / Volunteer"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                    {errors.subject && <div className="form-error-msg"><AlertCircle size={14} />{errors.subject}</div>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Your Message <span className="required">*</span>
                    </label>
                    <textarea
                      rows="4"
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Type your inquiry or feedback here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
                      {errors.message ? (
                        <div className="form-error-msg"><AlertCircle size={14} />{errors.message}</div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Minimum 15 characters
                        </span>
                      )}
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {formData.message.length} chars
                      </span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '1rem' }}>
                    <Send size={18} />
                    <span>Send Message (Frontend Demo)</span>
                  </button>
                </form>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Message Received!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Thank you, <strong>{formData.name}</strong>. Your message regarding <em>"{formData.subject}"</em> has been validated and recorded for this interactive frontend demonstration.
                  </p>
                  <button onClick={handleResetForm} className="btn btn-secondary">
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive FAQs Section */}
          <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-light)' }}>
            <div className="section-title-wrap">
              <span className="section-tag">Frequently Asked Questions</span>
              <h2 className="section-title">
                Everything You Need <span className="google-gradient-text">to Know</span>
              </h2>
              <p className="section-subtitle">
                Clear answers to common questions about GDG on Campus at Rajeev Institute of Technology.
              </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-card)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: isOpen ? 'var(--google-blue)' : 'var(--text-primary)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <HelpCircle size={18} style={{ color: isOpen ? 'var(--google-blue)' : 'var(--text-muted)', flexShrink: 0 }} />
                        <span>{faq.q}</span>
                      </div>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {isOpen && (
                      <div style={{ padding: '0 1.5rem 1.25rem 3rem', color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.65 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
