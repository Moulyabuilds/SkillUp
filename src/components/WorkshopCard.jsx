import React from 'react';
import { Calendar, Clock, BookOpen, UserCheck, ArrowRight, Check } from 'lucide-react';

export default function WorkshopCard({ workshop, onEnroll }) {
  return (
    <div className="workshop-card">
      <div className="workshop-header">
        <span
          className="workshop-track-badge"
          style={{
            backgroundColor: `${workshop.color}15`,
            color: workshop.color,
            border: `1px solid ${workshop.color}35`
          }}
        >
          {workshop.track}
        </span>
        <span className="workshop-level-badge">{workshop.level}</span>
      </div>

      <h3 className="workshop-title">{workshop.title}</h3>
      <p className="workshop-summary">{workshop.summary}</p>

      {/* Syllabus Checklist */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
          Key Syllabus Modules
        </h4>
        <ul className="workshop-syllabus-list">
          {workshop.syllabus.map((item, idx) => (
            <li key={idx} className="workshop-syllabus-item">
              <Check size={14} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ background: 'var(--bg-secondary)', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Calendar size={14} style={{ color: workshop.color }} />
          <span><strong>Schedule:</strong> {workshop.dateRange} ({workshop.duration})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <UserCheck size={14} style={{ color: 'var(--google-blue)' }} />
          <span><strong>Lead:</strong> {workshop.instructorRole}</span>
        </div>
      </div>

      <div className="workshop-footer">
        <span style={{ fontSize: '0.75rem', color: 'var(--google-green)', fontWeight: 700 }}>
          • Open to RIT Students
        </span>

        <button
          onClick={() => onEnroll(workshop)}
          className="btn btn-primary btn-sm"
          aria-label={`Enroll in ${workshop.title}`}
        >
          <span>Enroll Now</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
