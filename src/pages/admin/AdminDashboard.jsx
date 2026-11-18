import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  BookOpen,
  Users,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Download,
  Plus,
  QrCode,
  Megaphone,
  FolderGit2,
  Clock,
  Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { eventService } from '../../services/eventService';
import { workshopService } from '../../services/workshopService';
import { registrationService } from '../../services/registrationService';
import { attendanceService } from '../../services/attendanceService';
import { projectService } from '../../services/projectService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    eventsCount: 0,
    workshopsCount: 0,
    registrationsCount: 0,
    attendanceCount: 0,
    pendingProjectsCount: 0
  });

  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [eventsRes, workshopsRes, regRes, attRes, projRes] = await Promise.all([
          eventService.getAllEvents(),
          workshopService.getAllWorkshops(),
          registrationService.getAllRegistrations(),
          attendanceService.getAttendanceByEvent(),
          projectService.getAllProjects()
        ]);

        const events = eventsRes.data || [];
        const workshops = workshopsRes.data || [];
        const registrations = regRes.data || [];
        const attendance = attRes.data || [];
        const projects = projRes.data || [];

        setStats({
          eventsCount: events.length,
          workshopsCount: workshops.length,
          registrationsCount: registrations.length,
          attendanceCount: attendance.length,
          pendingProjectsCount: projects.filter((p) => p.status === 'pending').length
        });

        setRecentRegistrations(registrations.slice(0, 5));
        setUpcomingEvents(events.slice(0, 4));
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleExportCSV = async () => {
    const { data } = await registrationService.getAllRegistrations();
    registrationService.exportRegistrationsCSV(data);
  };

  return (
    <AdminLayout title="Dashboard Overview">
      {/* 1. Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Total Events */}
        <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--google-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Events
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
            {stats.eventsCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Hackathons, Talks & Meetups
          </div>
        </div>

        {/* Total Workshops */}
        <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--google-red)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Workshops & Bootcamps
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(234, 67, 53, 0.1)', color: 'var(--google-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
            {stats.workshopsCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Hands-on technical tracks
          </div>
        </div>

        {/* Total Registrations */}
        <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--google-green)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Student Registrations
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(52, 168, 83, 0.1)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
            {stats.registrationsCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Events, workshops & club members
          </div>
        </div>

        {/* Checked-in Attendance */}
        <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--google-yellow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Checked-in Attendance
            </span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(251, 188, 5, 0.15)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={20} />
            </div>
          </div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.25rem' }}>
            {stats.attendanceCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            QR verified venue check-ins
          </div>
        </div>
      </div>

      {/* 2. Quick Actions Toolbar */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.25rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.2rem' }}>Administrative Controls</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Quick shortcuts for campus organizers</p>
        </div>

        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <Link to="/admin/events" className="btn btn-primary btn-sm">
            <Plus size={15} /> <span>Create Event</span>
          </Link>
          <Link to="/admin/workshops" className="btn btn-secondary btn-sm">
            <BookOpen size={15} /> <span>Add Workshop</span>
          </Link>
          <Link to="/admin/attendance" className="btn btn-secondary btn-sm">
            <QrCode size={15} /> <span>Scan QR / Check In</span>
          </Link>
          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm">
            <Download size={15} /> <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 3. Visual Charts & Capacity Bars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Track Distribution Chart */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Student Interest Breakdown</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Cohorts</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                <span>Web Development & Cloud</span>
                <span style={{ color: 'var(--google-blue)' }}>42%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: 'var(--google-blue)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                <span>Artificial Intelligence & Gemini</span>
                <span style={{ color: 'var(--google-red)' }}>31%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '31%', height: '100%', background: 'var(--google-red)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                <span>Android & Jetpack Compose</span>
                <span style={{ color: 'var(--google-green)' }}>16%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '16%', height: '100%', background: 'var(--google-green)', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', fontWeight: 600 }}>
                <span>Competitive Coding & Git</span>
                <span style={{ color: 'var(--google-yellow)' }}>11%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '11%', height: '100%', background: 'var(--google-yellow)', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Submissions Queue */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Student Project Showcase</h3>
            <Link to="/admin/projects" style={{ fontSize: '0.8rem', color: 'var(--google-blue)', fontWeight: 700 }}>
              Review Queue →
            </Link>
          </div>

          <div style={{ background: 'rgba(66, 133, 244, 0.06)', border: '1px solid rgba(66, 133, 244, 0.2)', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--google-blue)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              <FolderGit2 size={18} />
              <span>{stats.pendingProjectsCount} Project(s) Pending Review</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Submissions approved here automatically appear in the public student Project Showcase.
            </p>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <Link to="/admin/projects" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              <span>Open Project Approval Desk</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Recent Registrations Table */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '1.75rem', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Recent Student Registrations</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Latest sign-ups across events and cohorts</p>
          </div>

          <Link to="/admin/registrations" className="btn btn-outline btn-sm">
            <span>View All Registrations</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student Name</th>
                <th>USN</th>
                <th>Department</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.length > 0 ? (
                recentRegistrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--google-blue)' }}>
                        {reg.ticket_id}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{reg.full_name}</td>
                    <td>{reg.usn}</td>
                    <td>{reg.department ? reg.department.split(' ')[0] : 'CSE'}</td>
                    <td>
                      <span className="skill-chip" style={{ textTransform: 'capitalize' }}>
                        {reg.type || 'event'}
                      </span>
                    </td>
                    <td>
                      <span className="event-status-pill upcoming" style={{ fontSize: '0.7rem' }}>
                        {reg.status || 'confirmed'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(reg.created_at || Date.now()).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No registrations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
