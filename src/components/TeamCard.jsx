import React from 'react';
import { Linkedin, Github, Mail, ShieldAlert } from 'lucide-react';

export default function TeamCard({ member, onContact }) {
  // Generate gradient background from member settings
  const bgGradients = {
    'Faculty Coordinators': 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 100%)',
    'Club Coordinators': 'linear-gradient(135deg, #4285F4 0%, #EA4335 100%)',
    'Core Team': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
    'Volunteers': 'linear-gradient(135deg, #334155 0%, #475569 100%)'
  };

  const gradient = bgGradients[member.category] || 'linear-gradient(135deg, #4285F4, #34A853)';

  return (
    <div className="team-card">
      {/* Profile Avatar / Initials with Gradient */}
      <div className="team-avatar-wrap" style={{ background: gradient }}>
        <span>{member.avatarPlaceholder}</span>
        {member.isPlaceholder && (
          <span className="team-placeholder-badge" title="Official appointment details pending">
            Role Placeholder
          </span>
        )}
      </div>

      <h3 className="team-name">{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <p className="team-dept">{member.department}</p>
      <p className="team-bio">{member.bio}</p>

      {/* Social / Contact Links */}
      <div className="team-social-links">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="team-social-btn"
          aria-label="LinkedIn profile placeholder"
          title="LinkedIn (Placeholder)"
        >
          <Linkedin size={15} />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="team-social-btn"
          aria-label="GitHub profile placeholder"
          title="GitHub (Placeholder)"
        >
          <Github size={15} />
        </a>
        <button
          onClick={() => onContact && onContact(member)}
          className="team-social-btn"
          aria-label="Connect via Email"
          title="Send inquiry"
        >
          <Mail size={15} />
        </button>
      </div>
    </div>
  );
}
