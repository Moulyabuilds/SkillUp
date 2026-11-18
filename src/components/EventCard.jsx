import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EventCard({ event, onRegister }) {
  const isUpcoming = event.status === 'Upcoming';

  return (
    <div className="event-card">
      <div className="event-card-top">
        <span
          className="event-category-badge"
          style={{
            backgroundColor: `${event.color}15`,
            color: event.color,
            border: `1px solid ${event.color}35`
          }}
        >
          {event.category}
        </span>

        <span className={`event-status-pill ${isUpcoming ? 'upcoming' : 'completed'}`}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isUpcoming ? 'var(--google-green)' : 'var(--text-muted)'
            }}
          ></span>
          <span>{event.status}</span>
        </span>
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-desc">{event.description}</p>

        <div className="event-meta-list">
          <div className="event-meta-item">
            <Calendar size={15} style={{ color: event.color }} />
            <span>{event.date}</span>
          </div>

          <div className="event-meta-item">
            <Clock size={15} style={{ color: 'var(--text-muted)' }} />
            <span>{event.time}</span>
          </div>

          <div className="event-meta-item">
            <MapPin size={15} style={{ color: 'var(--google-red)' }} />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {event.venue}
            </span>
          </div>

          {event.capacity && (
            <div className="event-meta-item">
              <Users size={15} style={{ color: 'var(--google-blue)' }} />
              <span>{event.capacity}</span>
            </div>
          )}
        </div>
      </div>

      <div className="event-card-footer">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {event.badge || 'Illustrative Event'}
        </span>

        {isUpcoming ? (
          <button
            onClick={() => onRegister(event)}
            className="btn btn-primary btn-sm"
            aria-label={`Register for ${event.title}`}
          >
            <span>Register Now</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => onRegister(event)}
            className="btn btn-secondary btn-sm"
            aria-label={`View recap for ${event.title}`}
          >
            <span>View Details</span>
          </button>
        )}
      </div>
    </div>
  );
}
