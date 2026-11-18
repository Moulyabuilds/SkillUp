import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Supabase profiles table
  const fetchProfile = async (userId) => {
    try {
      if (!isSupabaseConfigured || !userId) {
        setProfile(null);
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.warn('Profile fetch note:', error.message);
        // Fallback profile if row does not exist yet
        return null;
      }

      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (mounted) {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          if (currentSession?.user) {
            await fetchProfile(currentSession.user.id);
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initializeAuth();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          if (newSession?.user) {
            await fetchProfile(newSession.user.id);
          } else {
            setProfile(null);
          }
          setLoading(false);
        }
      );

      return () => {
        mounted = false;
        subscription?.unsubscribe();
      };
    }
  }, []);

  // Admin login using Supabase Auth
  const login = async (email, password) => {
    if (!isSupabaseConfigured) {
      throw new Error(
        'Supabase is not configured. Please add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env as described in README.md.'
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Authentication failed. No user returned.');
    }

    // Verify role in profiles table
    const userProfile = await fetchProfile(data.user.id);

    // Check if role is admin or coordinator
    const isAdminUser = userProfile?.role === 'admin' || userProfile?.role === 'coordinator';

    if (!isAdminUser) {
      // Immediately sign out unauthorized user
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      throw new Error(
        'Access Denied: This account does not possess administrator permissions for GDG on Campus RIT Hassan.'
      );
    }

    setUser(data.user);
    setSession(data.session);
    return { user: data.user, profile: userProfile };
  };

  // Sign out
  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const isAdmin = Boolean(
    profile?.role === 'admin' || profile?.role === 'coordinator'
  );

  const value = {
    user,
    session,
    profile,
    loading,
    isAdmin,
    isSupabaseConfigured,
    login,
    logout,
    refreshProfile: () => user ? fetchProfile(user.id) : null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
