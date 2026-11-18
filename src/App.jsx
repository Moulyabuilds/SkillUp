import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Workshops from './pages/Workshops';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import ProjectShowcase from './pages/ProjectShowcase';
import Join from './pages/Join';
import Contact from './pages/Contact';

// Admin Components & Pages
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminWorkshops from './pages/admin/AdminWorkshops';
import AdminRegistrations from './pages/admin/AdminRegistrations';
import AdminProjects from './pages/admin/AdminProjects';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminTeam from './pages/admin/AdminTeam';
import AdminGallery from './pages/admin/AdminGallery';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Theme state: defaults to light or saved preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('gdg-rit-theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gdg-rit-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AuthProvider>
      <div className="app-container">
        <ScrollToTop />

        {/* Public Header - only render on public website routes */}
        {!isAdminRoute && <Navbar theme={theme} toggleTheme={toggleTheme} />}

        {/* Route Handlers */}
        <div className={isAdminRoute ? 'admin-root-view' : 'main-content'}>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Home showToast={showToast} />} />
            <Route path="/about" element={<About showToast={showToast} />} />
            <Route path="/events" element={<Events showToast={showToast} />} />
            <Route path="/workshops" element={<Workshops showToast={showToast} />} />
            <Route path="/team" element={<Team showToast={showToast} />} />
            <Route path="/gallery" element={<Gallery showToast={showToast} />} />
            <Route path="/showcase" element={<ProjectShowcase showToast={showToast} />} />
            <Route path="/join" element={<Join showToast={showToast} />} />
            <Route path="/contact" element={<Contact showToast={showToast} />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/workshops"
              element={
                <ProtectedRoute>
                  <AdminWorkshops />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/registrations"
              element={
                <ProtectedRoute>
                  <AdminRegistrations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance"
              element={
                <ProtectedRoute>
                  <AdminAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/announcements"
              element={
                <ProtectedRoute>
                  <AdminAnnouncements />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/team"
              element={
                <ProtectedRoute>
                  <AdminTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGallery />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Home showToast={showToast} />} />
          </Routes>
        </div>

        {/* Global Toast Alerts */}
        {toast && (
          <div className="toast-container">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          </div>
        )}

        {/* Public Footer - only render on public website routes */}
        {!isAdminRoute && <Footer showToast={showToast} />}
      </div>
    </AuthProvider>
  );
}
