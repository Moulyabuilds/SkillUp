import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Target,
  Zap,
  Users,
  Lightbulb,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { COMMUNITY_INFO } from '../data/demoData';

export default function About() {
  return (
    <div>
      {/* Header Banner */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '800px' }}>
            <span className="section-tag">About Our Chapter</span>
            <h1 className="section-title">
              Empowering Student Innovators at <br />
              <span className="google-gradient-text">Rajeev Institute of Technology</span>
            </h1>
            <p className="section-subtitle">
              Learn how Google Developer Groups on Campus at RIT Hassan bridges university learning with
              real-world industry technologies through collaborative peer workshops and hands-on coding.
            </p>
          </div>
        </div>
      </section>

      {/* Official Identity & Three Logos Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Official Identity</span>
            <h2 className="section-title">
              Institutional Heritage & <span className="google-gradient-text">Affiliation</span>
            </h2>
            <p className="section-subtitle">
              Our campus chapter operates with official support from the institution and the Department of Computer Science & Engineering.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* 1. RIT Hassan */}
            <div className="stat-card" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <img
                  src="/logos/rit-logo.jpeg"
                  alt="Rajeev Institute of Technology Official Placeholder"
                  style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#FFFFFF', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                  onError={(e) => { e.currentTarget.src = '/logos/rit-placeholder.svg'; }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Rajeev Institute of Technology</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--google-blue)', fontWeight: 600 }}>Parent Academic Institution</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                Established in Hassan, Karnataka, RIT is affiliated with Visvesvaraya Technological University (VTU) and approved by AICTE. It is committed to providing world-class technical education, modern infrastructure, and student incubation support.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                *Official Institution Logo Placeholder
              </span>
            </div>

            {/* 2. CSE Department */}
            <div className="stat-card" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <img
                  src="/logos/dept-cse-logo.jpeg"
                  alt="Department of Computer Science & Engineering Official Placeholder"
                  style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#FFFFFF', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                  onError={(e) => { e.currentTarget.src = '/logos/dept-placeholder.svg'; }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Dept. of Computer Science & Engg</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--google-red)', fontWeight: 600 }}>Host Academic Department</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                The Department of CSE serves as the operational home and faculty advisory base for GDG on Campus. The department nurtures high-impact engineering students, research labs, coding clubs, and industry-sponsored technical activities.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                *Official Department Logo Placeholder
              </span>
            </div>

            {/* 3. GDG on Campus */}
            <div className="stat-card" style={{ textAlign: 'left', padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <img
                  src="/logos/gdg-rit-logo.jpeg"
                  alt="GDG on Campus – RIT Hassan Logo"
                  style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#FFFFFF', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                  onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>GDG on Campus – RIT Hassan</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--google-green)', fontWeight: 600 }}>Student Developer Chapter</p>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                A community program supported by Google for university students. Designed to help campus developers build practical software solutions, explore Google Cloud, AI, and Android, and grow together through peer workshops.
              </p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                *Official Chapter Identifier
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Objectives */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* Vision Card */}
            <div className="track-card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Compass size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                To establish Rajeev Institute of Technology as a prominent regional technology hub where undergraduate engineers develop into self-driven creators, collaborative open-source contributors, and technology leaders equipped to tackle global engineering challenges.
              </p>
            </div>

            {/* Mission Card */}
            <div className="track-card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(234, 67, 53, 0.1)', color: 'var(--google-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Target size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                To provide inclusive, high-quality, practical learning experiences in modern software development. We bridge the curriculum-industry gap by organizing bootcamps, hackathons, and study groups in an open and welcoming peer community.
              </p>
            </div>

            {/* Objectives Card */}
            <div className="track-card" style={{ padding: '2.5rem' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(52, 168, 83, 0.1)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Core Objectives</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={16} style={{ color: 'var(--google-green)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Democratize access to emerging tech (AI, Cloud, Mobile).</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={16} style={{ color: 'var(--google-green)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Encourage hands-on project creation and open-source contributions.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <CheckCircle size={16} style={{ color: 'var(--google-green)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Prepare student teams to excel in national and global hackathons.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of GDG: Learning, Collaboration, Innovation */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag">Core Values</span>
            <h2 className="section-title">
              The Three Pillars of <span className="google-gradient-text">Our Community</span>
            </h2>
            <p className="section-subtitle">
              Every workshop, hackathon, and developer meetup we organize is anchored by three fundamental values.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* 1. Learning */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '2rem', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--google-blue)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>1. Continuous Learning</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                Technology evolves rapidly. We nurture a growth mindset where students experiment fearlessly, build small projects every week, and learn modern frameworks not yet covered in traditional syllabi.
              </p>
            </div>

            {/* 2. Collaboration */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '2rem', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--google-yellow)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(251, 188, 5, 0.15)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <HeartHandshake size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>2. Inclusive Collaboration</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                Great software is built by diverse teams. We welcome programmers, designers, writers, and beginners from every engineering branch, fostering mutual respect, active mentorship, and knowledge sharing.
              </p>
            </div>

            {/* 3. Innovation */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '2rem', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--google-green)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Lightbulb size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>3. Impactful Innovation</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                We encourage solving real local problems: automated campus utilities, healthcare tools, environmental sensors, and educational platforms that make a tangible difference in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Joining */}
      <section className="section section-navy">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-tag" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
              Student Advantages
            </span>
            <h2 className="section-title">
              What You Gain as a <span className="google-gradient-text">GDG RIT Member</span>
            </h2>
            <p className="section-subtitle">
              Joining GDG on Campus is completely free for all RIT Hassan students and opens doors to invaluable opportunities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Award size={24} style={{ color: 'var(--google-blue)', marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Bootcamp Certificates</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Verified digital certificates recognizing your participation and hands-on project completion in our cohorts.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Users size={24} style={{ color: 'var(--google-red)', marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Alumni Mentorship</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Direct access to RIT alumni and engineers working at leading tech enterprises who mentor hackathon teams.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Zap size={24} style={{ color: 'var(--google-yellow)', marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Hackathon Team Formation</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Find reliable teammates across domains (frontend, backend, AI, UI/UX) to build winning submissions.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '14px', padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Sparkles size={24} style={{ color: 'var(--google-green)', marginBottom: '0.75rem' }} />
              <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Exclusive Swags & Badges</h4>
              <p style={{ color: '#94A3B8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Earn Google Developer stickers, t-shirts, and digital badges to showcase on your developer profiles.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/join" className="btn btn-primary btn-lg">
              <span>Join GDG on Campus RIT Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
