import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', isDanger = true }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-dialog" style={{ maxWidth: '440px', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onCancel} aria-label="Close">
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: isDanger ? 'rgba(234, 67, 53, 0.12)' : 'rgba(66, 133, 244, 0.12)', color: isDanger ? 'var(--google-red)' : 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{title}</h3>
          </div>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${isDanger ? 'btn-red' : 'btn-primary'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
