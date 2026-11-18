import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading, isSupabaseConfigured } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--google-blue)', margin: '0 auto 1rem auto' }} />
          <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Verifying Administrator Privileges...</p>
        </div>
      </div>
    );
  }

  // If Supabase is configured, require actual login with admin role
  if (isSupabaseConfigured) {
    if (!user || !isAdmin) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }

  // If user is accessing but has not logged in through admin login
  if (!user && !sessionStorage.getItem('gdg_admin_preview_auth')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
