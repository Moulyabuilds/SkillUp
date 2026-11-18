import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Calendar, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/RegistrationModal';
import { EVENTS } from '../data/demoData';
import { eventService } from '../services/eventService';

const CATEGORIES = [
  'All Categories',
  'Hackathons',
  'Coding competitions',
  'Technical talks',
  'Developer meetups',
  'Workshops'
];

export default function Events({ showToast }) {
  const [eventsList, setEventsList] = useState(EVENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Upcoming', 'Completed'
  const [modalItem, setModalItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data } = await eventService.getPublishedEvents();
        if (data && data.length > 0) setEventsList(data);
      } catch (err) {
        console.warn('Events fetch fallback:', err);
      }
    }
    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return eventsList.filter((event) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All Categories' || (event.category || '').toLowerCase() === selectedCategory.toLowerCase();

      // Status filter
      const matchesStatus =
        statusFilter === 'All' || (event.status || 'Upcoming').toLowerCase() === statusFilter.toLowerCase();

      // Search term
      const matchesSearch =
        (event.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.venue || '').toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [eventsList, searchTerm, selectedCategory, statusFilter]);

  const handleRegister = (event) => {
    setModalItem(event);
    setModalOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setStatusFilter('All');
  };

  return (
    <div>
      {/* Page Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Campus Gatherings</span>
            <h1 className="section-title">
              Events & <span className="google-gradient-text">Hackathons</span>
            </h1>
            <p className="section-subtitle">
              Explore upcoming campus hackathons, hands-on coding competitions, technical talks,
              and developer meetups hosted by GDG on Campus – RIT Hassan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section">
        <div className="container">
          {/* Sample Label Alert */}
          <div style={{ background: 'rgba(66, 133, 244, 0.08)', border: '1px solid rgba(66, 133, 244, 0.25)', borderRadius: '12px', padding: '0.85rem 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Sparkles size={18} style={{ color: 'var(--google-blue)', flexShrink: 0 }} />
            <div>
              <strong>Sample / Illustrative Events Notice:</strong> The events listed below represent sample programming for the CODESTORM 2026 Challenge. All buttons are fully functional with interactive registration previews.
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="filter-bar">
            {/* Search Input */}
            <div className="search-input-wrap">
              <Search size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search events by title, keyword, or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Selector */}
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status:</span>
              {['All', 'Upcoming', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-pills" style={{ marginBottom: '2.5rem' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <span>
              Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'event' : 'events'}
            </span>
            {(searchTerm || selectedCategory !== 'All Categories' || statusFilter !== 'All') && (
              <button
                onClick={handleResetFilters}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--google-blue)', fontWeight: 600, fontSize: '0.85rem' }}
              >
                <RefreshCw size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px dashed var(--border-light)' }}>
              <AlertCircle size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>No events found</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                We could not find any events matching your current search or category filter.
              </p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                Clear Filters & Show All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetItem={modalItem}
        type="event"
      />
    </div>
  );
}
