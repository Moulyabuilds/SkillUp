import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { GALLERY_ITEMS } from '../data/demoData';

export const galleryService = {
  // Fetch gallery items
  async getGalleryItems() {
    if (!isSupabaseConfigured) {
      return { data: GALLERY_ITEMS, error: null };
    }

    try {
      // List files from Supabase Storage 'gallery' bucket
      const { data: files, error } = await supabase.storage.from('gallery').list();

      if (error || !files || files.length === 0) {
        return { data: GALLERY_ITEMS, error: null };
      }

      // Map storage files to gallery display format
      const storageItems = files
        .filter((file) => file.name !== '.emptyFolderPlaceholder')
        .map((file, idx) => {
          const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(file.name);
          return {
            id: `storage-${file.id || idx}`,
            title: file.name.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, ''),
            category: 'Campus Activities',
            date: new Date(file.created_at || Date.now()).toLocaleDateString(),
            attendees: 'RIT Community',
            desc: 'Event captured by GDG RIT Media Team',
            accentColor: '#4285F4',
            imageUrl: publicUrl,
            storageKey: file.name
          };
        });

      return { data: [...storageItems, ...GALLERY_ITEMS], error: null };
    } catch (err) {
      console.warn('Supabase gallery fallback:', err.message);
      return { data: GALLERY_ITEMS, error: null };
    }
  },

  // Upload image to Supabase Storage
  async uploadGalleryImage(file, metadata = {}) {
    if (!isSupabaseConfigured) {
      throw new Error('Supabase is not configured in .env');
    }

    // Clean filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(filePath);

    return {
      publicUrl,
      fileName,
      data
    };
  },

  // Delete image from Supabase Storage
  async deleteGalleryImage(fileName) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    const { error } = await supabase.storage
      .from('gallery')
      .remove([fileName]);

    if (error) throw error;
    return { success: true };
  }
};
