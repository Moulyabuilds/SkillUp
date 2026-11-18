import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Sparkles, CheckCircle2, Award, Laptop, Users, ArrowRight } from 'lucide-react';
import WorkshopCard from '../components/WorkshopCard';
import RegistrationModal from '../components/RegistrationModal';
import { WORKSHOPS } from '../data/demoData';
import { workshopService } from '../services/workshopService';

const TRACKS = [
  'All Tracks',
  'Web Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Google Cloud',
  'Android Development',
  'Git and GitHub',
  'Competitive Programming'
];

export default function Workshops({ showToast }) {
  const [workshopsList, setWorkshopsList] = useState(WORKSHOPS);
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const { data } = await workshopService.getPublishedWorkshops();
        if (data && data.length > 0) setWorkshopsList(data);
      } catch (err) {
        console.warn('Workshops fetch fallback:', err);
      }
    }
    loadWorkshops();
  }, []);

  const filteredWorkshops = workshopsList.filter((ws) => {
    if (selectedTrack === 'All Tracks') return true;
    return (ws.track || '').toLowerCase() === selectedTrack.toLowerCase();
  });

  const handleEnroll = (workshop) => {
    setModalItem(workshop);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Skill Up</span>
            <h1 className="section-title">
              Technical <span className="google-gradient-text">Workshops & Cohorts</span>
            </h1>
            <p className="section-subtitle">
              Master the skills demanded by today's software engineering industry. Code alongside mentors,
              complete hands-on labs, and earn recognized completion certificates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section">
        <div className="container">
          {/* Track Filter Pills */}
          <div className="filter-pills" style={{ marginBottom: '2.5rem' }}>
            {TRACKS.map((track) => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`filter-pill ${selectedTrack === track ? 'active' : ''}`}
              >
                {track}
              </button>
            ))}
          </div>

          {/* Grid of Workshops */}
          <div className="workshops-grid">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onEnroll={handleEnroll}
              />
            ))}
          </div>

          {/* Workshop Learning Perks Section */}
          <div style={{ marginTop: '5rem', background: 'var(--bg-secondary)', borderRadius: '24px', padding: '3.5rem 2.5rem', border: '1px solid var(--border-light)' }}>
            <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
              <span className="section-tag">Learning Methodology</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                How GDG Workshops Work
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Every workshop is designed around practical building, avoiding passive lectures.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Laptop size={22} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.35rem' }}>100% Hands-On Coding</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Participants write and execute code in real-time under senior mentor supervision in college labs.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(234, 67, 53, 0.1)', color: 'var(--google-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Award size={22} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.35rem' }}>Verified Certificates</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Earn certificates of completion endorsed by the chapter and CSE department for capstone deliverables.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Users size={22} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.35rem' }}>Peer Study Groups</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    Collaborate with peers through dedicated Discord/WhatsApp technical channels to solve roadblocks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetItem={modalItem}
        type="workshop"
      />
    </div>
  );
}
