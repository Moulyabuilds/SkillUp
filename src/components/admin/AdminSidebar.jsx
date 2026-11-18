import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  FolderGit2,
  QrCode,
  Megaphone,
  UserCheck,
  Image,
  ExternalLink,
  LogOut,
  X,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { path: '/admin/events', label: 'Events', icon: Calendar },
  { path: '/admin/workshops', label: 'Workshops', icon: BookOpen },
  { path: '/admin/registrations', label: 'Registrations & CSV', icon: Users },
  { path: '/admin/projects', label: 'Project Showcase', icon: FolderGit2 },
  { path: '/admin/attendance', label: 'Attendance & QR', icon: QrCode },
  { path: '/admin/announcements', label: 'Announcements', icon: Megaphone },
  { path: '/admin/team', label: 'Team Members', icon: UserCheck },
  { path: '/admin/gallery', label: 'Gallery Storage', icon: Image }
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { logout, profile, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    sessionStorage.removeItem('gdg_admin_preview_auth');
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="admin-sidebar-header">
        <Link to="/" className="admin-sidebar-brand">
          <img
            src="/logos/gdg-rit-logo.jpeg"
            alt="GDG RIT Logo"
            className="admin-sidebar-logo"
            onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
          />
          <div className="admin-brand-text">
            <span className="admin-brand-title">GDG Admin</span>
            <span className="admin-brand-sub">RIT HASSAN</span>
          </div>
        </Link>

        <button className="admin-sidebar-close" onClick={onClose} aria-label="Close sidebar">
          <X size={20} />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="admin-sidebar-nav">
        <div className="admin-nav-section-label">MANAGEMENT</div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <div className="admin-nav-section-label" style={{ marginTop: '1.5rem' }}>PUBLIC WEBSITE</div>
        <Link to="/" className="admin-nav-link" target="_blank" rel="noopener noreferrer">
          <ExternalLink size={18} />
          <span>View Public Site</span>
        </Link>
      </nav>

      {/* User Footer */}
      <div className="admin-sidebar-footer">
        <div className="admin-user-info">
          <div className="admin-user-avatar">
            {profile?.full_name ? profile.full_name[0].toUpperCase() : 'A'}
          </div>
          <div className="admin-user-details">
            <span className="admin-user-name">
              {profile?.full_name || user?.email?.split('@')[0] || 'Administrator'}
            </span>
            <span className="admin-user-role">
              {profile?.role === 'coordinator' ? 'Lead Coordinator' : 'Campus Admin'}
            </span>
          </div>
        </div>

        <button onClick={handleLogout} className="admin-logout-btn" title="Sign Out">
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
