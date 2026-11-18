import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Users, Tag } from 'lucide-react';

export default function LightboxModal({ isOpen, onClose, currentItem, onNext, onPrev }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close image preview">
          <X size={20} />
        </button>

        {/* Visual Header / Banner */}
        <div style={{ position: 'relative', width: '100%', height: '360px', background: '#0B0F19', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Visual tech pattern illustration */}
          <svg viewBox="0 0 800 450" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
            <defs>
              <linearGradient id="grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="50%" stopColor="#1C2541" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="glow-circle" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentItem.accentColor || '#4285F4'} stopOpacity="0.4" />
                <stop offset="100%" stopColor={currentItem.accentColor || '#4285F4'} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <rect width="800" height="450" fill="url(#grad-bg)" />
            <circle cx="400" cy="225" r="240" fill="url(#glow-circle)" />
            
            {/* Tech grid lines */}
            <path d="M 0 100 H 800 M 0 200 H 800 M 0 300 H 800 M 0 400 H 800" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <path d="M 150 0 V 450 M 300 0 V 450 M 450 0 V 450 M 600 0 V 450 M 750 0 V 450" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            
            {/* Center Visual Badge */}
            <g transform="translate(340, 160)">
              <rect width="120" height="120" rx="20" fill="rgba(255,255,255,0.05)" stroke={currentItem.accentColor || '#4285F4'} strokeWidth="2" />
              <circle cx="60" cy="60" r="40" fill={currentItem.accentColor || '#4285F4'} fillOpacity="0.15" />
              <text x="60" y="68" fill="#FFFFFF" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">
                GDG
              </text>
            </g>

            {/* Event Name Overlay on Graphic */}
            <text x="400" y="325" fill="#E2E8F0" fontSize="18" fontWeight="600" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">
              {currentItem.title}
            </text>
            <text x="400" y="350" fill="#94A3B8" fontSize="13" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">
              Rajeev Institute of Technology, Hassan • Campus Community
            </text>
          </svg>

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer'
            }}
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={onNext}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer'
            }}
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Content Details */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span
              className="event-category-badge"
              style={{
                backgroundColor: `${currentItem.accentColor || '#4285F4'}18`,
                color: currentItem.accentColor || '#4285F4',
                border: `1px solid ${currentItem.accentColor || '#4285F4'}40`
              }}
            >
              {currentItem.category}
            </span>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Calendar size={14} />
              {currentItem.date}
            </span>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Users size={14} />
              {currentItem.attendees}
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            {currentItem.title}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
            {currentItem.desc}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>*Illustrative gallery placeholder for RIT Hassan campus activities</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={onPrev} className="btn btn-secondary btn-sm">Prev</button>
              <button onClick={onNext} className="btn btn-secondary btn-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
