import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SAMPLE_ANNOUNCEMENTS = [
  {
    id: 'ann-01',
    title: 'CODESTORM 2026: Team Registrations Live!',
    content: 'The 24-Hour Campus Hackathon of RIT Hassan is scheduled for April 18-19. Register your team of 2-4 before seats fill up.',
    badge: 'Flagship Hackathon',
    link_url: '/events',
    is_active: true,
    priority: 10,
    created_at: new Date().toISOString()
  },
  {
    id: 'ann-02',
    title: 'Google Gemini 2.0 Agentic AI Workshop',
    content: 'Hands-on bootcamp on March 28 in CSE Seminar Hall. Bring your laptops with Python installed.',
    badge: 'Upcoming Session',
    link_url: '/workshops',
    is_active: true,
    priority: 5,
    created_at: new Date().toISOString()
  }
];

export const announcementService = {
  async getAllAnnouncements() {
    if (!isSupabaseConfigured) {
      return { data: SAMPLE_ANNOUNCEMENTS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : SAMPLE_ANNOUNCEMENTS, error: null };
    } catch (err) {
      console.warn('Supabase announcements fallback:', err.message);
      return { data: SAMPLE_ANNOUNCEMENTS, error: null };
    }
  },

  async getActiveAnnouncements() {
    if (!isSupabaseConfigured) {
      return { data: SAMPLE_ANNOUNCEMENTS.filter((a) => a.is_active), error: null };
    }

    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : SAMPLE_ANNOUNCEMENTS.filter((a) => a.is_active), error: null };
    } catch (err) {
      console.warn('Supabase active announcements fallback:', err.message);
      return { data: SAMPLE_ANNOUNCEMENTS.filter((a) => a.is_active), error: null };
    }
  },

  async createAnnouncement(annData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('announcements')
      .insert([{
        ...annData,
        is_active: annData.is_active ?? true
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateAnnouncement(id, annData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('announcements')
      .update(annData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async deleteAnnouncement(id) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};
