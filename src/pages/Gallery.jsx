import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, Calendar, Users, Eye, Info } from 'lucide-react';
import LightboxModal from '../components/LightboxModal';
import { GALLERY_ITEMS } from '../data/demoData';
import { galleryService } from '../services/galleryService';

const GALLERY_CATEGORIES = [
  'All',
  'Workshops',
  'Hackathons',
  'Technical events',
  'Guest lectures',
  'Community activities'
];

export default function Gallery({ showToast }) {
  const [itemsList, setItemsList] = useState(GALLERY_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const { data } = await galleryService.getGalleryItems();
        if (data && data.length > 0) setItemsList(data);
      } catch (err) {
        console.warn('Gallery load fallback:', err);
      }
    }
    loadGallery();
  }, []);

  const filteredItems = itemsList.filter((item) => {
    if (selectedCategory === 'All') return true;
    return (item.category || '').toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div>
      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Campus Moments</span>
            <h1 className="section-title">
              Community <span className="google-gradient-text">Event Gallery</span>
            </h1>
            <p className="section-subtitle">
              Visual snapshots from our hackathons, code jams, speaker sessions, and student celebrations
              at Rajeev Institute of Technology, Hassan. Click any photo for full preview.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section">
        <div className="container">
          {/* Illustrative Notice */}
          <div style={{ background: 'rgba(66, 133, 244, 0.08)', border: '1px solid rgba(66, 133, 244, 0.25)', borderRadius: '12px', padding: '0.85rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Info size={18} style={{ color: 'var(--google-blue)', flexShrink: 0 }} />
            <div>
              <strong>Illustrative Gallery Notice:</strong> High-fidelity visual cards represent campus event showcases until official 2026 gallery photo archives are uploaded. Click any card to launch the interactive high-resolution Lightbox viewer.
            </div>
          </div>

          {/* Filter Pills */}
          <div className="filter-pills" style={{ marginBottom: '2.5rem' }}>
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Gallery Grid */}
          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => handleOpenLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenLightbox(index); }}
              >
                {/* Visual Art Header */}
                <div className="gallery-img-wrap">
                  <svg viewBox="0 0 400 240" className="gallery-svg-art">
                    <defs>
                      <linearGradient id={`grad-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0B132B" />
                        <stop offset="100%" stopColor="#1E293B" />
                      </linearGradient>
                    </defs>
                    <rect width="400" height="240" fill={`url(#grad-${item.id})`} />
                    
                    {/* Visual pattern */}
                    <circle cx="200" cy="120" r="80" fill={item.accentColor} fillOpacity="0.12" />
                    <rect x="50" y="40" width="300" height="160" rx="12" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                    
                    {/* Category Stamp */}
                    <g transform="translate(160, 80)">
                      <rect width="80" height="80" rx="16" fill="rgba(255,255,255,0.05)" stroke={item.accentColor} strokeWidth="1.5" />
                      <text x="40" y="48" fill="#FFFFFF" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">
                        GDG
                      </text>
                    </g>
                    
                    <text x="200" y="195" fill="#CBD5E1" fontSize="13" fontWeight="600" textAnchor="middle" fontFamily="'Plus Jakarta Sans', sans-serif">
                      {item.title}
                    </text>
                  </svg>

                  {/* Hover Overlay */}
                  <div className="gallery-overlay">
                    <Maximize2 size={20} />
                    <span>Click to Preview</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="gallery-info">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: item.accentColor,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.attendees}
                    </span>
                  </div>

                  <h3 className="gallery-title">{item.title}</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        currentItem={currentItem}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
