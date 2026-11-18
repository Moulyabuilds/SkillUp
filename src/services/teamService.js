import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { TEAM_MEMBERS } from '../data/demoData';

export const teamService = {
  async getTeamMembers() {
    if (!isSupabaseConfigured) {
      return { data: TEAM_MEMBERS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : TEAM_MEMBERS, error: null };
    } catch (err) {
      console.warn('Supabase team_members fallback to demo data:', err.message);
      return { data: TEAM_MEMBERS, error: null };
    }
  },

  async createTeamMember(memberData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('team_members')
      .insert([memberData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateTeamMember(id, memberData) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { data, error } = await supabase
      .from('team_members')
      .update(memberData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async deleteTeamMember(id) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};
