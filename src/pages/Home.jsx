import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  Palette,
  Users,
  Award,
  BookOpen,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
  ExternalLink,
  Megaphone
} from 'lucide-react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import WorkshopCard from '../components/WorkshopCard';
import RegistrationModal from '../components/RegistrationModal';
import { STATS, TECH_TRACKS, EVENTS, WORKSHOPS, COMMUNITY_INFO } from '../data/demoData';
import { eventService } from '../services/eventService';
import { workshopService } from '../services/workshopService';
import { announcementService } from '../services/announcementService';

export default function Home({ showToast }) {
  const [modalItem, setModalItem] = useState(null);
  const [modalType, setModalType] = useState('event');
  const [modalOpen, setModalOpen] = useState(false);

  const [liveEvents, setLiveEvents] = useState(EVENTS);
  const [liveWorkshops, setLiveWorkshops] = useState(WORKSHOPS);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchLiveContent() {
      try {
        const [evtRes, wsRes, annRes] = await Promise.all([
          eventService.getPublishedEvents(),
          workshopService.getPublishedWorkshops(),
          announcementService.getActiveAnnouncements()
        ]);
        if (evtRes?.data && evtRes.data.length > 0) setLiveEvents(evtRes.data);
        if (wsRes?.data && wsRes.data.length > 0) setLiveWorkshops(wsRes.data);
        if (annRes?.data) setAnnouncements(annRes.data);
      } catch (err) {
        console.warn('Live content fetch note:', err);
      }
    }
    fetchLiveContent();
  }, []);

  const handleOpenRegister = (item, type = 'event') => {
    setModalItem(item);
    setModalType(type);
    setModalOpen(true);
  };

  const featuredEvents = liveEvents.slice(0, 3);
  const featuredWorkshops = liveWorkshops.slice(0, 3);

  // Map icon strings to Lucide components
  const getTrackIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Code2 size={26} />;
      case 'Cpu': return <Cpu size={26} />;
      case 'Cloud': return <Cloud size={26} />;
      case 'Smartphone': return <Smartphone size={26} />;
      case 'Palette': return <Palette size={26} />;
      case 'Code2': return <Layers size={26} />;
      default: return <Code2 size={26} />;
    }
  };

  return (
    <div>
      {/* Active Campus Announcements Banner */}
      {announcements.length > 0 && (
        <div style={{ background: 'linear-gradient(90deg, rgba(66, 133, 244, 0.12), rgba(234, 67, 53, 0.12), rgba(251, 188, 5, 0.12), rgba(52, 168, 83, 0.12))', borderBottom: '1px solid var(--border-light)', padding: '0.65rem 1.5rem' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.875rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--google-blue)', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              <Megaphone size={13} />
              <span>{announcements[0].badge || 'Announcement'}</span>
            </span>
            <span style={{ fontWeight: 600 }}>{announcements[0].title}:</span>
            <span style={{ color: 'var(--text-secondary)' }}>{announcements[0].content}</span>
            {announcements[0].link_url && (
              <Link to={announcements[0].link_url} style={{ color: 'var(--google-blue)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>Learn More</span>
                <ArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Illustrative Statistics Strip */}
      <section className="section-sm section-alt">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div key={stat.id} className="stat-card">
                <div className="stat-top-bar" style={{ backgroundColor: stat.color }}></div>
                <div className="stat-value" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtext">{stat.subtext}</div>
              </div>
            ))}
          </div>

          <div className="illustrative-banner">
            <span style={{ color: 'var(--google-blue)', fontWeight: 700 }}>*Note:</span>
            <span>All community metrics & numbers shown above are illustrative benchmarks for RIT Hassan campus representation.</span>
          </div>
        </div>
      </section>

      {/* 3. Technology Areas / Focus Tracks */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Explore Tech Tracks</span>
            <h2 className="section-title">
              What We Learn & <span className="google-gradient-text">Build Together</span>
            </h2>
            <p className="section-subtitle">
              From web platforms and AI agents to cloud architectures and native mobile apps,
              explore specialized learning tracks curated for engineering students.
            </p>
          </div>

          <div className="tracks-grid">
            {TECH_TRACKS.map((track) => (
              <div key={track.id} className="track-card">
                <div
                  className="track-icon-wrap"
                  style={{
                    backgroundColor: track.accentBg,
                    color: track.color
                  }}
                >
                  {getTrackIcon(track.icon)}
                </div>

                <h3 className="track-title">{track.title}</h3>
                <p className="track-desc">{track.shortDesc}</p>

                <div style={{ marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <strong>Key Focus:</strong> {track.topicsCovered}
                </div>

                <div className="track-skills-wrap">
                  {track.skills.map((skill, idx) => (
                    <span key={idx} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Events & Hackathons */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-tag">Campus Gatherings</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Featured <span className="google-gradient-text">Events & Hackathons</span>
              </h2>
              <p className="section-subtitle">
                Join upcoming hackathons, tech talks, and meetups at RIT Hassan.
              </p>
            </div>
            <Link to="/events" className="btn btn-outline">
              <span>View All Events</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="events-grid">
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={(item) => handleOpenRegister(item, 'event')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Hands-on Workshops */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="section-tag">Zero-to-Hero Bootcamps</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Upcoming <span className="google-gradient-text">Hands-On Workshops</span>
              </h2>
              <p className="section-subtitle">
                Practical, code-first weekend cohorts to master high-demand software engineering stacks.
              </p>
            </div>
            <Link to="/workshops" className="btn btn-outline">
              <span>Explore All Workshops</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="workshops-grid">
            {featuredWorkshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                onEnroll={(item) => handleOpenRegister(item, 'workshop')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Join GDG on Campus Section */}
      <section className="section section-navy">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
              Why Join GDG RIT Hassan
            </span>
            <h2 className="section-title">
              Empowering Your Journey From <br />
              <span className="google-gradient-text">Classroom to Tech Industry</span>
            </h2>
            <p className="section-subtitle">
              We provide the mentorship, developer tools, and collaborative environment to turn your ideas into functional products.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(66, 133, 244, 0.2)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Peer-to-Peer Learning
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Learn faster by collaborating with passionate batchmates and seniors who have solved the same problems, built projects, and participated in global contests.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(234, 67, 53, 0.2)', color: 'var(--google-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Code2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Google Developer Resources
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Gain hands-on experience with official Google Cloud credits, Gemini API access, Android Studio developer toolkits, and curated curriculum.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(251, 188, 5, 0.2)', color: 'var(--google-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Hackathon Readiness
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Form teams, build functional MVPs, and compete in premier collegiate hackathons including CODESTORM, Smart India Hackathon, and Google Solution Challenge.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(52, 168, 83, 0.2)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Networking & Leadership
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Step into leadership roles, organize campus events, practice public speaking, and network with tech professionals and distinguished alumni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Institutional Partnership Banner */}
      <section className="section-sm" style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 700, display: 'block', marginBottom: '1.25rem' }}>
            ACADEMIC INSTITUTION & DEPARTMENT SUPPORT
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="/logos/rit-logo.jpeg"
                alt="RIT Hassan"
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.src = '/logos/rit-placeholder.svg'; }}
              />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>RAJEEV INSTITUTE OF TECHNOLOGY</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hassan – 573201 • VTU Affiliated</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img
                src="/logos/dept-cse-logo.jpeg"
                alt="Dept of CSE"
                style={{ width: '48px', height: '48px', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.src = '/logos/dept-placeholder.svg'; }}
              />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 800, fontSize: '0.9rem' }}>DEPARTMENT OF COMPUTER SCIENCE & ENGG</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Center of Academic Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Call to Action Banner */}
      <section className="section" style={{ background: 'radial-gradient(circle at center, rgba(66, 133, 244, 0.08) 0%, transparent 70%)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag">Ready to Level Up?</span>
          <h2 className="section-title">
            Become a Member of <br />
            <span className="google-gradient-text">GDG on Campus – RIT Hassan</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Join over 500 fellow student technologists today. Access exclusive workshops, code jams,
            hackathon mentorship, and certificates.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/join" className="btn btn-primary btn-lg">
              <span>Join Community Now</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              <span>Learn More About GDG</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetItem={modalItem}
        type={modalType}
      />
    </div>
  );
}
