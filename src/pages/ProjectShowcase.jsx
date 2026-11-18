import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Github, ExternalLink, Search, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { projectService } from '../services/projectService';
import confetti from 'canvas-confetti';

const CATEGORIES = [
  'All Tracks',
  'Web Development',
  'AI & Machine Learning',
  'Mobile & Computer Vision',
  'IoT & Cloud',
  'Cybersecurity'
];

export default function ProjectShowcase({ showToast }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Tracks');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Submission Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    student_name: '',
    usn: '',
    department: 'Computer Science & Engineering',
    category: 'Web Development',
    tech_stack_input: 'React, Node.js, Vite',
    github_url: '',
    demo_url: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const loadApprovedProjects = async () => {
    setLoading(true);
    try {
      const { data } = await projectService.getApprovedProjects();
      setProjects(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApprovedProjects();
  }, []);

  const handleOpenSubmit = () => {
    setSubmitted(false);
    setFormData({
      title: '',
      description: '',
      student_name: '',
      usn: '',
      department: 'Computer Science & Engineering',
      category: 'Web Development',
      tech_stack_input: 'React, Node.js',
      github_url: '',
      demo_url: ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techStackArray = formData.tech_stack_input
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      description: formData.description,
      student_name: formData.student_name,
      usn: formData.usn.toUpperCase(),
      department: formData.department,
      category: formData.category,
      tech_stack: techStackArray,
      github_url: formData.github_url || null,
      demo_url: formData.demo_url || null
    };

    try {
      await projectService.submitProject(payload);
      setSubmitted(true);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}

      if (showToast) {
        showToast('Project submitted! Awaiting administrator approval.', 'success');
      }
    } catch (err) {
      alert('Error submitting project: ' + err.message);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All Tracks' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.student_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <section className="section-sm" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="section-title-wrap" style={{ marginBottom: 0, textAlign: 'left', maxWidth: '840px' }}>
            <span className="section-tag">Student Innovation</span>
            <h1 className="section-title">
              Campus Project <span className="google-gradient-text">Showcase</span>
            </h1>
            <p className="section-subtitle">
              Discover real-world applications, open-source repositories, and hackathon prototypes
              built by engineering students at Rajeev Institute of Technology, Hassan.
            </p>
          </div>
        </div>
      </section>

      {/* Main Showcase */}
      <section className="section">
        <div className="container">
          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="search-input-wrap" style={{ minWidth: '300px', flex: 'unset' }}>
              <Search size={18} />
              <input
                type="text"
                className="search-input"
                placeholder="Search projects or student creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button onClick={handleOpenSubmit} className="btn btn-primary">
              <Plus size={18} />
              <span>Submit Your Project</span>
            </button>
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

          {/* Projects Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <div key={proj.id} className="track-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="skill-chip" style={{ background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)' }}>
                      {proj.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--google-green)', fontWeight: 700 }}>
                      • Peer Verified
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                    {proj.description}
                  </p>

                  <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.8rem' }}>
                    <div style={{ fontWeight: 700 }}>Creator: {proj.student_name}</div>
                    <div style={{ color: 'var(--text-muted)' }}>USN: {proj.usn} • {proj.department}</div>
                  </div>

                  {proj.tech_stack && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {proj.tech_stack.map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', background: 'var(--bg-tertiary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.75rem', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: 'auto' }}>
                    {proj.github_url && (
                      <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                        <Github size={15} /> <span>Code Repo</span>
                      </a>
                    )}
                    {proj.demo_url && (
                      <a href={proj.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                        <ExternalLink size={15} /> <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '18px', border: '1px dashed var(--border-card)' }}>
                <FolderGit2 size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Approved Projects Found</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Have you built a cool project? Click "Submit Your Project" to have it reviewed and featured here!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Submission Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-dialog" style={{ maxWidth: '600px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Submit Your Project for Showcase
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Once reviewed by GDG on Campus coordinators, approved submissions will be featured on the public website.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Project Title <span className="required">*</span></label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="e.g. SmartCampus Energy Monitor"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Student / Team Name <span className="required">*</span></label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. Varun K & Sneha P"
                        value={formData.student_name}
                        onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">USN <span className="required">*</span></label>
                      <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. 4RA22CS088"
                        value={formData.usn}
                        onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <select
                        className="form-select"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="Computer Science & Engineering">CSE</option>
                        <option value="Information Science & Engineering">ISE</option>
                        <option value="AI & Machine Learning">AIML</option>
                        <option value="Electronics & Communication">ECE</option>
                        <option value="Other Engineering Branch">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Mobile & Computer Vision">Mobile & Computer Vision</option>
                        <option value="IoT & Cloud">IoT & Cloud</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Description <span className="required">*</span></label>
                    <textarea
                      rows="3"
                      required
                      className="form-textarea"
                      placeholder="Explain the problem solved, architecture, and features..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tech Stack (Comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. React, Gemini API, Node.js, Firebase"
                      value={formData.tech_stack_input}
                      onChange={(e) => setFormData({ ...formData, tech_stack_input: e.target.value })}
                    />
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">GitHub Repository URL</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://github.com/..."
                        value={formData.github_url}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Live Demo URL (Optional)</label>
                      <input
                        type="url"
                        className="form-input"
                        placeholder="https://my-project.dev"
                        value={formData.demo_url}
                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit Project
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52, 168, 83, 0.12)', color: 'var(--google-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Submission Received!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.student_name}</strong>. Your project <em>"{formData.title}"</em> has been submitted to the GDG RIT coordinator queue. It will appear on this page once approved.
                </p>
                <button onClick={() => setModalOpen(false)} className="btn btn-primary">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
