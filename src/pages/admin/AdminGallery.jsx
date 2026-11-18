import React, { useState, useEffect } from 'react';
import { Image, Upload, Trash2, ExternalLink, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { galleryService } from '../../services/galleryService';
import { useAuth } from '../../context/AuthContext';

export default function AdminGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [deleteFileName, setDeleteFileName] = useState(null);

  const { isSupabaseConfigured } = useAuth();

  const loadGallery = async () => {
    setLoading(true);
    try {
      const { data } = await galleryService.getGalleryItems();
      setGalleryItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPEG, WebP).');
      return;
    }

    setUploading(true);
    setFeedback(null);

    try {
      if (!isSupabaseConfigured) {
        // Fallback simulation
        const fakeUrl = URL.createObjectURL(file);
        const newItem = {
          id: `demo-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          category: 'Uploaded Photo',
          date: new Date().toLocaleDateString(),
          attendees: 'RIT Campus',
          desc: 'Event captured by student photographer',
          accentColor: '#4285F4',
          imageUrl: fakeUrl
        };
        setGalleryItems((prev) => [newItem, ...prev]);
        setFeedback({
          type: 'success',
          message: 'Image preview loaded in demo mode.'
        });
        return;
      }

      await galleryService.uploadGalleryImage(file);
      setFeedback({
        type: 'success',
        message: `Successfully uploaded ${file.name} to Supabase Storage!`
      });
      await loadGallery();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Upload failed.'
      });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (isSupabaseConfigured && deleteFileName) {
        await galleryService.deleteGalleryImage(deleteFileName);
      }
      setGalleryItems((prev) => prev.filter((item) => item.storageKey !== deleteFileName && item.id !== deleteFileName));
      setDeleteFileName(null);
    } catch (err) {
      alert('Error deleting image: ' + err.message);
    }
  };

  return (
    <AdminLayout title="Gallery Storage Management">
      {/* Upload Zone */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '18px', padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(66, 133, 244, 0.1)', color: 'var(--google-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Upload size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Upload Event Photography to Supabase</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Images uploaded to the <code>gallery</code> bucket automatically render in the public Gallery view.
            </p>
          </div>
        </div>

        <div style={{ border: '2px dashed var(--border-light)', borderRadius: '14px', padding: '2.5rem', textAlign: 'center', background: 'var(--bg-secondary)', position: 'relative' }}>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              cursor: 'pointer',
              zIndex: 2
            }}
          />
          <Image size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 0.75rem auto' }} />
          <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>
            {uploading ? 'Uploading to Supabase Storage...' : 'Click or drop image file here to upload'}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Supports PNG, JPEG, SVG, WebP (Max 10MB)
          </span>
        </div>

        {feedback && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: feedback.type === 'success' ? 'rgba(52, 168, 83, 0.1)' : 'rgba(234, 67, 53, 0.1)',
              color: feedback.type === 'success' ? 'var(--google-green)' : 'var(--google-red)'
            }}
          >
            {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>

      {/* Existing Gallery Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Active Media Assets ({galleryItems.length})</h3>
        <button onClick={loadGallery} className="btn btn-secondary btn-sm">
          <RefreshCw size={14} /> <span>Refresh</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {galleryItems.map((item) => (
          <div key={item.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '170px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ color: '#FFFFFF', textAlign: 'center', padding: '1rem' }}>
                  <Image size={32} style={{ color: item.accentColor || '#4285F4', margin: '0 auto 0.5rem auto' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.title}</span>
                </div>
              )}
            </div>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--google-blue)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                {item.category}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>
                {item.desc}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</span>
                <button
                  onClick={() => setDeleteFileName(item.storageKey || item.id)}
                  className="btn-icon"
                  style={{ width: '30px', height: '30px', color: 'var(--google-red)' }}
                  title="Delete Image"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteFileName)}
        title="Delete Gallery Media"
        message="Are you sure you want to remove this image? It will be deleted from Supabase Storage and removed from the public gallery."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteFileName(null)}
      />
    </AdminLayout>
  );
}
