import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { WORKSHOPS } from '../data/demoData';

export const workshopService = {
  // Fetch all workshops (Admin view)
  async getAllWorkshops() {
    if (!isSupabaseConfigured) {
      return { data: WORKSHOPS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : WORKSHOPS, error: null };
    } catch (err) {
      console.warn('Supabase workshops fallback to demo data:', err.message);
      return { data: WORKSHOPS, error: null };
    }
  },

  // Fetch published workshops (Public website view)
  async getPublishedWorkshops() {
    if (!isSupabaseConfigured) {
      return { data: WORKSHOPS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : WORKSHOPS, error: null };
    } catch (err) {
      console.warn('Supabase published workshops fallback:', err.message);
      return { data: WORKSHOPS, error: null };
    }
  },

  // Create new workshop
  async createWorkshop(workshopData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('workshops')
      .insert([{
        ...workshopData,
        is_published: workshopData.is_published ?? true
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  // Update workshop
  async updateWorkshop(id, workshopData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('workshops')
      .update({
        ...workshopData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  // Delete workshop
  async deleteWorkshop(id) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { error } = await supabase
      .from('workshops')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  // Toggle publish
  async togglePublish(id, currentStatus) {
    return this.updateWorkshop(id, { is_published: !currentStatus });
  }
};
