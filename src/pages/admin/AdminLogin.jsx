import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight, ArrowLeft, AlertCircle, Sparkles, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, isSupabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both administrative email and password.');
      return;
    }

    setLoading(true);

    try {
      if (!isSupabaseConfigured) {
        // Fallback demo admin sign-in when Supabase credentials are not yet configured in .env
        sessionStorage.setItem('gdg_admin_preview_auth', 'true');
        navigate(from, { replace: true });
        return;
      }

      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials. Access forbidden.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = () => {
    sessionStorage.setItem('gdg_admin_preview_auth', 'true');
    navigate('/admin', { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)' }}>
      {/* Top Bar */}
      <div style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} />
          <span>Back to Public Website</span>
        </Link>
        <span style={{ fontSize: '0.8rem', color: 'var(--google-blue)', fontWeight: 700 }}>
          GDG on Campus • RIT Hassan
        </span>
      </div>

      {/* Main Login Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '440px', width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-xl)' }}>
          {/* Brand Emblem */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <img
                src="/logos/gdg-rit-logo.jpeg"
                alt="GDG RIT Logo"
                style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                onError={(e) => { e.currentTarget.src = '/logos/gdg-placeholder.svg'; }}
              />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Administrator Portal
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Authorized faculty and chapter coordinators only.
            </p>
          </div>

          {/* Security Alert Notice */}
          <div style={{ background: 'rgba(66, 133, 244, 0.08)', border: '1px solid rgba(66, 133, 244, 0.2)', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
            <ShieldAlert size={16} style={{ color: 'var(--google-blue)', flexShrink: 0, marginTop: '2px' }} />
            <span>
              Public visitors cannot self-register as admins. Accounts are provisioned via Supabase Auth and verified through Row Level Security.
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{ background: 'rgba(234, 67, 53, 0.1)', border: '1px solid rgba(234, 67, 53, 0.3)', borderRadius: '12px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontSize: '0.825rem', color: 'var(--google-red)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Admin Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="admin@rit.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.75rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem' }}
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Demo Mode Helper */}
          {!isSupabaseConfigured && (
            <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                *Supabase credentials not yet set in <code>.env</code>
              </div>
              <button
                type="button"
                onClick={handleDemoBypass}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <Sparkles size={14} style={{ color: 'var(--google-yellow)' }} />
                <span>Explore Admin Dashboard (Demo Preview)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
