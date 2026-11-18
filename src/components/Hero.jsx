import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Code2, Cpu, Globe, Rocket, ShieldCheck } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/demoData';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Hero Content */}
          <div>
            {/* Pill Badge */}
            <div className="hero-pill">
              <span className="hero-pill-spark"></span>
              <span>Google Developer Groups on Campus</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span style={{ fontWeight: 800 }}>RIT HASSAN</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Where Campus Minds <br />
              <span className="google-gradient-text">Build the Future.</span>
            </h1>

            {/* Tagline Badge */}
            <div className="hero-tagline-badge">
              <Sparkles size={18} style={{ color: 'var(--google-yellow)' }} />
              <span>Connect. Learn. Build. Grow.</span>
            </div>

            {/* Introduction */}
            <p className="hero-desc">
              Welcome to <strong>GDG on Campus – Rajeev Institute of Technology</strong>.
              We are a passionate university developer community bridging academia with real-world engineering.
              Collaborate on open-source projects, learn Google Cloud & AI, participate in hackathons, and accelerate your tech career.
            </p>

            {/* Call to Actions */}
            <div className="hero-cta-group">
              <Link to="/events" className="btn btn-primary btn-lg">
                <span>Explore Events</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/join" className="btn btn-secondary btn-lg">
                <span>Join Our Community</span>
              </Link>
            </div>

            {/* Social Proof & Campus Numbers */}
            <div className="hero-social-proof">
              <div className="avatar-stack">
                <div className="avatar-stack-item" style={{ background: '#4285F4' }}>JS</div>
                <div className="avatar-stack-item" style={{ background: '#EA4335' }}>AI</div>
                <div className="avatar-stack-item" style={{ background: '#FBBC05', color: '#1E293B' }}>CL</div>
                <div className="avatar-stack-item" style={{ background: '#34A853' }}>KT</div>
                <div className="avatar-stack-item" style={{ background: '#8B5CF6' }}>+500</div>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  500+ Campus Developers
                </p>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                  Across CSE, ISE, AIML & allied engineering branches at RIT
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tech Visual Mockup */}
          <div className="hero-visual-wrapper">
            <div className="hero-tech-card">
              {/* Window Controls */}
              <div className="hero-card-header">
                <div className="window-dots">
                  <span className="window-dot dot-red"></span>
                  <span className="window-dot dot-yellow"></span>
                  <span className="window-dot dot-green"></span>
                </div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                  gdg-rit-hassan.dev
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--google-green)', fontSize: '0.75rem', fontWeight: 600 }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--google-green)' }}></span>
                  <span>Active 2026</span>
                </div>
              </div>

              {/* Terminal Code Mockup */}
              <div className="code-mockup">
                <div>
                  <span className="code-keyword">const</span>{' '}
                  <span className="code-func">gdgChapter</span> = &#123;
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span className="code-prop">campus</span>:{' '}
                  <span className="code-str">"Rajeev Institute of Tech"</span>,
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span className="code-prop">city</span>:{' '}
                  <span className="code-str">"Hassan, Karnataka"</span>,
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span className="code-prop">tagline</span>:{' '}
                  <span className="code-str">"Connect • Learn • Build • Grow"</span>,
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span className="code-prop">tracks</span>: [
                  <span className="code-str">"Web"</span>,{' '}
                  <span className="code-str">"AI/ML"</span>,{' '}
                  <span className="code-str">"Cloud"</span>,{' '}
                  <span className="code-str">"Android"</span>],
                </div>
                <div style={{ paddingLeft: '1.25rem' }}>
                  <span className="code-prop">mission</span>: () =&gt;{' '}
                  <span className="code-func">EmpowerStudents</span>()
                </div>
                <div>&#125;;</div>
                <div style={{ marginTop: '0.5rem', color: '#64748B' }}>
                  // Initialize Google Developer chapter at RIT
                </div>
                <div>
                  <span className="code-func">gdgChapter</span>.<span className="code-func">launchNextHackathon</span>({'{'}
                  <span className="code-prop"> name</span>: <span className="code-str">"CODESTORM 2026"</span>
                  {' }'});
                </div>
              </div>

              {/* Tech Track Indicators */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 0.5rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--google-blue)', fontWeight: 800 }}>WEB & CLOUD</span>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '2px' }}>React • GCP</p>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 0.5rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--google-red)', fontWeight: 800 }}>AI & ML</span>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '2px' }}>Gemini API</p>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem 0.5rem', borderRadius: '10px', border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--google-green)', fontWeight: 800 }}>MOBILE</span>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, marginTop: '2px' }}>Compose</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="floating-tech-badge badge-float-1">
                <Terminal size={16} style={{ color: 'var(--google-blue)' }} />
                <span>CODESTORM 2026</span>
              </div>

              <div className="floating-tech-badge badge-float-2">
                <Cpu size={16} style={{ color: 'var(--google-green)' }} />
                <span>Gemini 2.0 Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
