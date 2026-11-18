import { supabase, isSupabaseConfigured } from '../lib/supabase';

// In-memory fallback attendance records for demo mode
let LOCAL_ATTENDANCE = [
  {
    id: 'att-01',
    event_id: 'evt-01',
    ticket_id: 'GDG-RIT-482190',
    usn: '4RA22CS012',
    attendee_name: 'Ananya Rao',
    check_in_method: 'qr',
    checked_in_at: new Date(Date.now() - 3600000).toISOString(),
    verified_by: 'Coordinator Desk'
  }
];

export const attendanceService = {
  // Fetch attendance list for an event
  async getAttendanceByEvent(eventId) {
    if (!isSupabaseConfigured) {
      const records = eventId
        ? LOCAL_ATTENDANCE.filter((a) => a.event_id === eventId)
        : LOCAL_ATTENDANCE;
      return { data: records, error: null };
    }

    try {
      let query = supabase
        .from('attendance')
        .select(`
          *,
          event:events(id, title)
        `)
        .order('checked_in_at', { ascending: false });

      if (eventId) {
        query = query.eq('event_id', eventId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return { data: data || [], error: null };
    } catch (err) {
      console.warn('Supabase attendance fallback:', err.message);
      return { data: LOCAL_ATTENDANCE, error: null };
    }
  },

  // Verify and Check In Attendee via Ticket ID or USN
  async checkInAttendee({ eventId, ticketId, usn, attendeeName, checkInMethod = 'qr', verifiedBy = 'Admin Desk' }) {
    if (!isSupabaseConfigured) {
      // Check if already checked in locally
      const existing = LOCAL_ATTENDANCE.find(
        (a) => a.event_id === eventId && (a.ticket_id === ticketId || (usn && a.usn === usn))
      );

      if (existing) {
        throw new Error(`Attendee ${existing.attendee_name} (${existing.usn}) was already checked in at ${new Date(existing.checked_in_at).toLocaleTimeString()}.`);
      }

      const newRecord = {
        id: `att-${Date.now()}`,
        event_id: eventId,
        ticket_id: ticketId,
        usn: usn || '4RA22CS***',
        attendee_name: attendeeName || 'Registered Student',
        check_in_method: checkInMethod,
        checked_in_at: new Date().toISOString(),
        verified_by: verifiedBy
      };

      LOCAL_ATTENDANCE.unshift(newRecord);
      return { data: newRecord, error: null };
    }

    try {
      // 1. Check if already checked in
      const { data: existingCheckIn } = await supabase
        .from('attendance')
        .select('*')
        .eq('event_id', eventId)
        .eq('ticket_id', ticketId)
        .maybeSingle();

      if (existingCheckIn) {
        throw new Error(`Ticket ${ticketId} was already checked in at ${new Date(existingCheckIn.checked_in_at).toLocaleTimeString()}`);
      }

      // 2. Fetch registration details if available
      const { data: regData } = await supabase
        .from('registrations')
        .select('*')
        .eq('ticket_id', ticketId)
        .maybeSingle();

      const studentName = regData?.full_name || attendeeName || 'Registered Attendee';
      const studentUsn = regData?.usn || usn || '4RA...';

      // 3. Record check-in
      const { data, error } = await supabase
        .from('attendance')
        .insert([{
          event_id: eventId,
          registration_id: regData?.id || null,
          ticket_id: ticketId,
          usn: studentUsn,
          attendee_name: studentName,
          check_in_method: checkInMethod,
          verified_by: verifiedBy
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      throw err;
    }
  }
};
