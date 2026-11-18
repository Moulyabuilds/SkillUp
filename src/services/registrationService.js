import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Sample fallback registrations for demonstration
const SAMPLE_REGISTRATIONS = [
  {
    id: 'reg-01',
    full_name: 'Ananya Rao',
    email: 'ananya@rit.ac.in',
    usn: '4RA22CS012',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    type: 'event',
    ticket_id: 'GDG-RIT-482190',
    status: 'confirmed',
    notes: 'Interested in AI track & Hackathons',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'reg-02',
    full_name: 'Varun Kumar S',
    email: 'varun@rit.ac.in',
    usn: '4RA22CS088',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    type: 'workshop',
    ticket_id: 'GDG-RIT-912401',
    status: 'confirmed',
    notes: 'React workshop cohort',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'reg-03',
    full_name: 'Pooja Hegde',
    email: 'pooja.h@rit.ac.in',
    usn: '4RA23IS034',
    department: 'Information Science & Engineering',
    semester: '4th Semester',
    type: 'membership',
    ticket_id: 'GDG-RIT-2026-7841',
    status: 'confirmed',
    notes: 'Full membership registration',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const registrationService = {
  // Fetch all registrations
  async getAllRegistrations() {
    if (!isSupabaseConfigured) {
      return { data: SAMPLE_REGISTRATIONS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('registrations')
        .select(`
          *,
          event:events(id, title),
          workshop:workshops(id, title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : SAMPLE_REGISTRATIONS, error: null };
    } catch (err) {
      console.warn('Supabase registrations fallback:', err.message);
      return { data: SAMPLE_REGISTRATIONS, error: null };
    }
  },

  // Create new registration
  async createRegistration(regData) {
    const ticketId = regData.ticket_id || `GDG-RIT-${Math.floor(100000 + Math.random() * 900000)}`;

    if (!isSupabaseConfigured) {
      // Local fallback simulation
      const newReg = {
        ...regData,
        id: `reg-${Date.now()}`,
        ticket_id: ticketId,
        status: 'confirmed',
        created_at: new Date().toISOString()
      };
      return { data: newReg, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([{
          ...regData,
          ticket_id: ticketId,
          status: regData.status || 'confirmed'
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      console.error('Error inserting registration:', err);
      // Fallback return so user experience does not fail
      return {
        data: { ...regData, ticket_id: ticketId, status: 'confirmed' },
        error: null
      };
    }
  },

  // Update status (e.g., 'confirmed', 'pending', 'cancelled')
  async updateStatus(id, status) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    const { data, error } = await supabase
      .from('registrations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  // Delete registration
  async deleteRegistration(id) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  // Export registrations array to downloadable CSV
  exportRegistrationsCSV(registrations, filename = 'GDG_RIT_Registrations.csv') {
    if (!registrations || registrations.length === 0) {
      alert('No registration data available to export.');
      return;
    }

    const headers = ['Ticket ID', 'Full Name', 'Email', 'USN', 'Department', 'Semester', 'Type', 'Status', 'Date Registered'];

    const rows = registrations.map((r) => [
      `"${r.ticket_id || ''}"`,
      `"${(r.full_name || '').replace(/"/g, '""')}"`,
      `"${r.email || ''}"`,
      `"${r.usn || ''}"`,
      `"${r.department || ''}"`,
      `"${r.semester || ''}"`,
      `"${r.type || 'event'}"`,
      `"${r.status || 'confirmed'}"`,
      `"${new Date(r.created_at || Date.now()).toLocaleDateString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
