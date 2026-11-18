import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowRight, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';
import { COMMUNITY_INFO } from '../data/demoData';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar-wrapper">
      {/* Official Institutional Logos Strip */}
      <div className="official-logos-strip">
        <div className="container official-logos-container">
          <div className="official-badges-row">
            {/* 1. Rajeev Institute of Technology Logo */}
            <div className="official-logo-item" title="Rajeev Institute of Technology Official Placeholder">
              <img
                src="/logos/rit-logo.jpeg"
                alt="Rajeev Institute of Technology Logo"
                className="official-logo-img"
                onError={(e) => { e.currentTarget.src = '/logos/rit-placeholder.svg'; }}
              />
              <div className="official-logo-info">
                <span className="official-logo-title">RAJEEV INSTITUTE OF TECHNOLOGY</span>
                <span className="official-logo-sub">Affiliated to VTU • Hassan, Karnataka</span>
              </div>
            </div>

            {/* 2. Computer Science and Engineering Department Logo */}
            <div className="official-logo-item" title="Department of Computer Science & Engineering">
              <img
                src="/logos/dept-cse-logo.jpeg"
                alt="CSE Department Logo"
                className="official-logo-img"
                onError={(e) => { e.currentTarget.src = '/logos/dept-placeholder.svg'; }}
              />
              <div className="official-logo-info">
                <span className="official-logo-title">DEPT. OF COMPUTER SCIENCE & ENGG</span>
                <span className="official-logo-sub">Nurturing Innovation & Tech Excellence</span>
              </div>
            </div>

            {/* 3. GDG on Campus RIT Hassan Logo */}
            <div className="official-logo-item" title="GDG on Campus – RIT Hassan">
              <img
                src="/logos/gdg-rit-logo.jpeg"
                alt="GDG on Campus RIT Hassan Logo"
                className="official-logo-img"
                onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
              />
              <div className="official-logo-info">
                <span className="official-logo-title">GDG ON CAMPUS • RIT HASSAN</span>
                <span className="official-logo-sub">Student Technology Community</span>
              </div>
            </div>
          </div>

          <div className="official-badges-tagline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--google-blue)' }}>Connect</span> • 
            <span style={{ color: 'var(--google-red)' }}>Learn</span> • 
            <span style={{ color: 'var(--google-yellow)' }}>Build</span> • 
            <span style={{ color: 'var(--google-green)' }}>Grow</span>
          </div>
        </div>
      </div>

      {/* Google 4-Color Accent Line */}
      <div className="google-bar">
        <span className="bar-blue"></span>
        <span className="bar-red"></span>
        <span className="bar-yellow"></span>
        <span className="bar-green"></span>
      </div>

      {/* Main Navbar */}
      <nav className="navbar-sticky">
        <div className="container navbar-inner">
          <Link to="/" className="nav-brand" aria-label="GDG RIT Hassan Home">
            <img
              src="/logos/gdg-rit-logo.jpeg"
              alt="GDG Logo"
              className="nav-brand-logo"
              onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
            />
            <div className="nav-brand-text">
              <span className="nav-brand-title">
                GDG <span className="brand-campus">on Campus</span>
              </span>
              <span className="nav-brand-college">RIT HASSAN</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/workshops" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Workshops
              </NavLink>
            </li>
            <li>
              <NavLink to="/team" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Our Team
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/showcase" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Showcase
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Actions */}
          <div className="nav-actions">
            {/* Admin Badge if logged in */}
            {user && (
              <Link
                to="/admin"
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.45rem 0.75rem', gap: '0.35rem', borderColor: 'var(--google-blue)', color: 'var(--google-blue)' }}
                title="Go to Admin Dashboard"
              >
                <LayoutDashboard size={14} />
                <span>Admin</span>
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {/* Join Button */}
            <Link to="/join" className="btn btn-primary btn-sm">
              <span>Join Community</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} end>
            <span>Home</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>About GDG</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Events & Hackathons</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/workshops" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Workshops</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/team" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Our Team</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Event Gallery</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/showcase" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Project Showcase</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Contact & Support</span>
            <ArrowRight size={16} />
          </NavLink>
          <NavLink to="/admin/login" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
            <span>Admin Portal</span>
            <LayoutDashboard size={16} />
          </NavLink>
          <NavLink to="/join" className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
            <span>Join Our Community</span>
            <ArrowRight size={16} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
