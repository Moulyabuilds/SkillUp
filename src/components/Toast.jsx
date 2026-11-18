import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      {type === 'success' && <CheckCircle2 size={20} style={{ color: 'var(--google-green)', flexShrink: 0 }} />}
      {type === 'error' && <AlertCircle size={20} style={{ color: 'var(--google-red)', flexShrink: 0 }} />}
      {type === 'info' && <Info size={20} style={{ color: 'var(--google-blue)', flexShrink: 0 }} />}
      
      <div style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
        {message}
      </div>

      <button onClick={onClose} style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
