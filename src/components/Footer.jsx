import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Send,
  MapPin,
  Mail,
  Phone,
  Heart,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { COMMUNITY_INFO } from '../data/demoData';

export default function Footer({ showToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setError('Please enter a valid email format (e.g. yourname@gmail.com).');
      return;
    }

    setError('');
    setSubscribed(true);
    if (showToast) {
      showToast('Subscribed! You will receive GDG RIT event updates.', 'success');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Top 4-Color Accent */}
        <div className="google-bar" style={{ marginBottom: '3rem', borderRadius: '4px' }}>
          <span className="bar-blue"></span>
          <span className="bar-red"></span>
          <span className="bar-yellow"></span>
          <span className="bar-green"></span>
        </div>

        <div className="footer-grid">
          {/* Col 1: Identity & Campus Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="/logos/gdg-rit-logo.jpeg"
                alt="GDG RIT Hassan Logo"
                style={{ width: '42px', height: '42px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '6px', padding: '2px' }}
                onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
              />
              <div>
                <h3 className="footer-brand-title">GDG on Campus</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--google-blue)', fontWeight: 700, letterSpacing: '0.05em' }}>
                  RAJEEV INSTITUTE OF TECHNOLOGY, HASSAN
                </p>
              </div>
            </div>

            <p className="footer-desc">
              Where campus minds build the future. Empowering students with cutting-edge Google technologies,
              practical coding skills, hackathons, and collaborative peer learning.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: '#CBD5E1', fontWeight: 600 }}>
              <span style={{ color: 'var(--google-blue)' }}>Connect.</span>
              <span style={{ color: 'var(--google-red)' }}>Learn.</span>
              <span style={{ color: 'var(--google-yellow)' }}>Build.</span>
              <span style={{ color: 'var(--google-green)' }}>Grow.</span>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <a href={COMMUNITY_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={COMMUNITY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={COMMUNITY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={COMMUNITY_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href={COMMUNITY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About GDG</Link></li>
              <li><Link to="/events" className="footer-link">Events & Hackathons</Link></li>
              <li><Link to="/workshops" className="footer-link">Technical Workshops</Link></li>
              <li><Link to="/team" className="footer-link">Our Team</Link></li>
              <li><Link to="/gallery" className="footer-link">Community Gallery</Link></li>
              <li><Link to="/showcase" className="footer-link">Project Showcase</Link></li>
              <li><Link to="/join" className="footer-link">Join Community</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Technology Tracks */}
          <div>
            <h4 className="footer-col-title">Focus Areas</h4>
            <ul className="footer-links">
              <li><Link to="/workshops" className="footer-link">Web Development (React)</Link></li>
              <li><Link to="/workshops" className="footer-link">Artificial Intelligence & LLMs</Link></li>
              <li><Link to="/workshops" className="footer-link">Machine Learning & Vision</Link></li>
              <li><Link to="/workshops" className="footer-link">Google Cloud & Firebase</Link></li>
              <li><Link to="/workshops" className="footer-link">Android & Jetpack Compose</Link></li>
              <li><Link to="/workshops" className="footer-link">Git, GitHub & Open Source</Link></li>
              <li><Link to="/workshops" className="footer-link">Competitive Programming</Link></li>
            </ul>
          </div>

          {/* Col 4: Campus Location & Newsletter */}
          <div>
            <h4 className="footer-col-title">Campus & Updates</h4>
            <div style={{ fontSize: '0.85rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ color: 'var(--google-red)', flexShrink: 0, marginTop: '2px' }} />
                <span>Rajeev Institute of Technology, Plot No. 1-D, Growth Center, Hassan – 573201</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--google-blue)', flexShrink: 0 }} />
                <span>{COMMUNITY_INFO.contactEmail}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '0.75rem' }}>
              Stay informed about upcoming hackathons, bootcamps and workshops:
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--google-green)', fontSize: '0.85rem', fontWeight: 600, background: 'rgba(52, 168, 83, 0.1)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
                <CheckCircle2 size={18} />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter college email..."
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.85rem',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '0.85rem'
                    }}
                  />
                  <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.55rem 0.85rem' }}>
                    <Send size={15} />
                  </button>
                </div>
                {error && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--google-red)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={13} /> {error}
                  </span>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Institutional & Chapter Disclaimer Card */}
        <div className="footer-disclaimer-card">
          <p style={{ marginBottom: '0.5rem' }}>
            <strong>Institutional Backing:</strong> Supported by the <strong>Department of Computer Science & Engineering</strong>, Rajeev Institute of Technology (RIT), Hassan.
          </p>
          <p>
            <strong>Disclaimer:</strong> {COMMUNITY_INFO.disclaimer} All community metrics, schedule timelines, and team profile items presented on this platform are illustrative demonstration data prepared for the CODESTORM 2026 Website Building Challenge.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} GDG on Campus – RIT Hassan. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <Link to="/about" className="footer-link">Community Guidelines</Link>
            <Link to="/contact" className="footer-link">Terms & Inquiries</Link>
            <Link to="/join" className="footer-link">Student Membership</Link>
            <Link to="/admin/login" className="footer-link" style={{ color: 'var(--google-blue)', fontWeight: 600 }}>Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
