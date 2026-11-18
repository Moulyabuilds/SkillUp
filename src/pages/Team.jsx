import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, HeartHandshake, ArrowRight, Mail, Info } from 'lucide-react';
import TeamCard from '../components/TeamCard';
import { TEAM_MEMBERS } from '../data/demoData';
import { teamService } from '../services/teamService';

const TEAM_CATEGORIES = [
  'All Members',
  'Faculty Coordinators',
  'Club Coordinators',
  'Core Team',
  'Volunteers'
];

export default function Team({ showToast }) {
  const [membersList, setMembersList] = useState(TEAM_MEMBERS);
  const [selectedCategory, setSelectedCategory] = useState('All Members');

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await teamService.getTeamMembers();
        if (data && data.length > 0) setMembersList(data);
      } catch (err) {
        console.warn('Team fetch fallback:', err);
      }
    }
    loadTeam();
  }, []);

  const filteredMembers = membersList.filter((member) => {
    if (selectedCategory === 'All Members') return true;
    return (member.category || '').toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleContactMember = (member) => {
    if (showToast) {
      showToast(`Inquiry initiated for ${member.role}. Use our Contact page for formal communications.`, 'info');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Chapter Leadership</span>
            <h1 className="section-title">
              Our <span className="google-gradient-text">Leadership & Volunteers</span>
            </h1>
            <p className="section-subtitle">
              Meet the faculty advisors, student coordinators, and volunteer leads steering
              the Google Developer Groups on Campus chapter at Rajeev Institute of Technology, Hassan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="section">
        <div className="container">
          {/* Official Placeholder Disclaimer Alert */}
          <div style={{ background: 'rgba(251, 188, 5, 0.1)', border: '1px solid rgba(251, 188, 5, 0.35)', borderRadius: '14px', padding: '1rem 1.25rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Info size={20} style={{ color: 'var(--google-yellow)', flexShrink: 0 }} />
            <div>
              <strong>Official Role Placeholders:</strong> In accordance with challenge guidelines, placeholder identities and role designations are displayed below until the official 2026-27 core committee roster is formally appointed and approved by the Department of Computer Science & Engineering, RIT Hassan.
            </div>
          </div>

          {/* Filter Pills */}
          <div className="filter-pills" style={{ marginBottom: '2.5rem' }}>
            {TEAM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="team-grid">
            {filteredMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={member}
                onContact={handleContactMember}
              />
            ))}
          </div>

          {/* Call to Action: Join the Team */}
          <div style={{ marginTop: '5rem', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '24px', padding: '3.5rem 2rem', color: '#FFFFFF', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative', overflow: 'hidden' }}>
            <span className="section-tag" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF' }}>
              Want to Join Leadership?
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1rem' }}>
              Become a Core Team Member or Volunteer
            </h2>
            <p style={{ color: '#94A3B8', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Are you passionate about web development, AI, mobile apps, or organizing campus hackathons? We recruit student volunteers and technical co-leads each semester.
            </p>
            <Link to="/join" className="btn btn-primary btn-lg">
              <span>Apply for Student Membership</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
