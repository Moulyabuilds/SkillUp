import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { EVENTS } from '../data/demoData';

export const eventService = {
  // Fetch all events (Admin view)
  async getAllEvents() {
    if (!isSupabaseConfigured) {
      return { data: EVENTS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : EVENTS, error: null };
    } catch (err) {
      console.warn('Supabase events fallback to demo data:', err.message);
      return { data: EVENTS, error: null };
    }
  },

  // Fetch only published events (Public website view)
  async getPublishedEvents() {
    if (!isSupabaseConfigured) {
      return { data: EVENTS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : EVENTS, error: null };
    } catch (err) {
      console.warn('Supabase published events fallback:', err.message);
      return { data: EVENTS, error: null };
    }
  },

  // Create new event
  async createEvent(eventData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured. Please connect your Supabase database in .env');
    }

    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...eventData,
        is_published: eventData.is_published ?? true
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  // Update existing event
  async updateEvent(id, eventData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('events')
      .update({
        ...eventData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  // Delete event
  async deleteEvent(id) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  // Toggle publish state
  async togglePublish(id, currentStatus) {
    return this.updateEvent(id, { is_published: !currentStatus });
  }
};
