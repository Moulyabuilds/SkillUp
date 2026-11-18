import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SAMPLE_PROJECTS = [
  {
    id: 'proj-01',
    title: 'CampusAI: RIT Academic Query Assistant',
    description: 'A RAG-powered chatbot using Google Gemini 2.0 Flash to answer student inquiries on exam schedules, VTU regulations, and syllabus outlines.',
    student_name: 'Varun K & Sneha P',
    usn: '4RA22CS088',
    department: 'Computer Science & Engineering',
    category: 'AI & Machine Learning',
    tech_stack: ['React', 'Gemini API', 'Node.js', 'Vector DB'],
    github_url: 'https://github.com',
    demo_url: 'https://rit-campus-ai.dev',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString()
  },
  {
    id: 'proj-02',
    title: 'AgriPulse: Smart Crop Disease Detection',
    description: 'A lightweight mobile app that classifies plant leaf infections offline using an on-device TensorFlow Lite model for Hassan farmers.',
    student_name: 'Rohit Gowda',
    usn: '4RA22CS054',
    department: 'Computer Science & Engineering',
    category: 'Mobile & Computer Vision',
    tech_stack: ['Kotlin', 'Jetpack Compose', 'TensorFlow Lite'],
    github_url: 'https://github.com',
    demo_url: 'https://agripulse.dev',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'proj-03',
    title: 'SmartCampus IoT Energy Monitor',
    description: 'Real-time classroom power consumption tracker using ESP32 microcontrollers and a Firebase live dashboard.',
    student_name: 'Manoj Kumar',
    usn: '4RA23CS012',
    department: 'Computer Science & Engineering',
    category: 'IoT & Cloud',
    tech_stack: ['ESP32', 'Firebase', 'React'],
    github_url: 'https://github.com',
    demo_url: null,
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const projectService = {
  async getAllProjects() {
    if (!isSupabaseConfigured) {
      return { data: SAMPLE_PROJECTS, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : SAMPLE_PROJECTS, error: null };
    } catch (err) {
      console.warn('Supabase projects fallback:', err.message);
      return { data: SAMPLE_PROJECTS, error: null };
    }
  },

  async getApprovedProjects() {
    if (!isSupabaseConfigured) {
      return { data: SAMPLE_PROJECTS.filter((p) => p.status === 'approved'), error: null };
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : SAMPLE_PROJECTS.filter((p) => p.status === 'approved'), error: null };
    } catch (err) {
      console.warn('Supabase approved projects fallback:', err.message);
      return { data: SAMPLE_PROJECTS.filter((p) => p.status === 'approved'), error: null };
    }
  },

  async submitProject(projectData) {
    if (!isSupabaseConfigured) {
      const simulated = {
        ...projectData,
        id: `proj-${Date.now()}`,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      return { data: simulated, error: null };
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        ...projectData,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async updateProjectStatus(id, status, feedback = '') {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    const { data, error } = await supabase
      .from('projects')
      .update({
        status,
        feedback,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  },

  async deleteProject(id) {
    if (!isSupabaseConfigured) {
      return { success: true };
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  }
};
