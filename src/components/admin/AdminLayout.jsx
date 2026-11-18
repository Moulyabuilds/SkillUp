import React, { useState } from 'react';
import { Menu, Sun, Moon, Database, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ children, title = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isSupabaseConfigured } = useAuth();

  // Dark/Light theme toggle
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('gdg-rit-theme', nextTheme);
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Wrapper */}
      <div className="admin-main-wrapper">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-menu-toggle"
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="admin-topbar-title">{title}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Supabase Connection Status Badge */}
            <div
              className={`admin-status-badge ${isSupabaseConfigured ? 'status-live' : 'status-sim'}`}
              title={
                isSupabaseConfigured
                  ? 'Connected to Live Supabase PostgreSQL DB'
                  : 'Supabase URL/Key not yet set in .env. Running in interactive demo mode with fallback store.'
              }
            >
              <Database size={14} />
              <span>{isSupabaseConfigured ? 'Supabase Live' : 'Demo Mode'}</span>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              style={{ width: '38px', height: '38px' }}
              title="Toggle Theme"
            >
              {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Supabase Notice Banner if not configured */}
        {!isSupabaseConfigured && (
          <div className="admin-notice-banner">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <AlertTriangle size={18} style={{ color: 'var(--google-yellow)', flexShrink: 0 }} />
              <div>
                <strong>Supabase Setup Required:</strong> To enable real-time cloud persistence, add your <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env</code> and run <code>supabase/schema.sql</code> in your Supabase SQL editor.
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        <main className="admin-content-body">
          {children}
        </main>
      </div>
    </div>
  );
}
