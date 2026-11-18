import React, { useState, useEffect } from 'react';
import { FolderGit2, Check, X, Search, ExternalLink, Github, Trash2, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { projectService } from '../../services/projectService';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const { data } = await projectService.getAllProjects();
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await projectService.updateProjectStatus(id, status);
      await loadProjects();
    } catch (err) {
      alert('Error updating project: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await projectService.deleteProject(deleteId);
      setDeleteId(null);
      await loadProjects();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  return (
    <AdminLayout title="Project Showcase Review">
      {/* Top Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            Student Submissions Queue
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Approve quality hackathon and open-source projects to be showcased on the public website.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => (
            <div key={proj.id} className="admin-stat-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="skill-chip" style={{ background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)' }}>
                  {proj.category || 'Web'}
                </span>
                <span
                  className="event-status-pill"
                  style={{
                    backgroundColor:
                      proj.status === 'approved' ? 'rgba(52, 168, 83, 0.12)' :
                      proj.status === 'rejected' ? 'rgba(234, 67, 53, 0.12)' : 'rgba(251, 188, 5, 0.15)',
                    color:
                      proj.status === 'approved' ? 'var(--google-green)' :
                      proj.status === 'rejected' ? 'var(--google-red)' : '#D97706',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem'
                  }}
                >
                  {proj.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>{proj.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem', flex: 1 }}>
                {proj.description}
              </p>

              {/* Author & Branch */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 700 }}>Student: {proj.student_name}</div>
                <div style={{ color: 'var(--text-muted)' }}>USN: {proj.usn} • {proj.department}</div>
              </div>

              {/* Tech Stack Chips */}
              {proj.tech_stack && proj.tech_stack.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {proj.tech_stack.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Links & Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ width: '32px', height: '32px' }} title="GitHub Repo">
                      <Github size={14} />
                    </a>
                  )}
                  {proj.demo_url && (
                    <a href={proj.demo_url} target="_blank" rel="noopener noreferrer" className="btn-icon" style={{ width: '32px', height: '32px' }} title="Live Preview">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {proj.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(proj.id, 'approved')}
                      className="btn btn-green btn-sm"
                      title="Approve & Publish to Public Showcase"
                    >
                      <Check size={14} /> <span>Approve</span>
                    </button>
                  )}
                  {proj.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(proj.id, 'rejected')}
                      className="btn btn-secondary btn-sm"
                      title="Reject submission"
                    >
                      <X size={14} /> <span>Reject</span>
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteId(proj.id)}
                    className="btn-icon"
                    style={{ width: '32px', height: '32px', color: 'var(--google-red)' }}
                    title="Delete project"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', background: 'var(--bg-card)', borderRadius: '18px', border: '1px dashed var(--border-card)' }}>
            <FolderGit2 size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>No Projects in this Filter</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Change the filter above to view all student submissions.</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        title="Delete Project Record"
        message="Are you sure you want to delete this project submission?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </AdminLayout>
  );
}
