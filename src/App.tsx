import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

import Index from './pages/Index';
import Welcome from './pages/Welcome';
import Recruitment from './pages/Recruitment';
import SportifyWinners from './pages/SportifyWinners';
import NotFound from './pages/NotFound';
import AboutSection from './components/AboutSection';
import UpcomingEvents from './components/UpcomingEvents';
import CoreTeam2026 from './components/CoreTeam2026';

// The CMS is lazy-loaded: public visitors far outnumber admins and should
// not download the admin bundle to read the homepage.
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const EventsAdmin = lazy(() => import('./pages/admin/EventsAdmin'));
const TeamAdmin = lazy(() => import('./pages/admin/TeamAdmin'));
const SportifyWinnersAdmin = lazy(() => import('./pages/admin/SportifyWinnersAdmin'));
const ApplicationsAdmin = lazy(() => import('./pages/admin/ApplicationsAdmin'));
const MembersAdmin = lazy(() => import('./pages/admin/MembersAdmin'));

const AdminFallback = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-500">
    Loading…
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

const App = () => {
  // Apply the saved theme before first paint of the routed content.
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    document.documentElement.classList.toggle(
      'dark',
      savedTheme === 'dark' || (!savedTheme && prefersDark),
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* basename must match `base` in vite.config.ts — see CLAUDE.md */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AuthProvider>
            <Routes>
              {/* Public site */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/upcoming-events" element={<UpcomingEvents />} />
              <Route path="/sportify-winners" element={<SportifyWinners />} />
              <Route path="/coreTeam" element={<CoreTeam2026 />} />
              <Route path="/recruitment" element={<Recruitment />} />

              {/* Admin CMS */}
              <Route
                path="/admin/login"
                element={
                  <Suspense fallback={<AdminFallback />}>
                    <AdminLogin />
                  </Suspense>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<AdminFallback />}>
                      <AdminLayout />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="events" element={<EventsAdmin />} />
                <Route path="team" element={<TeamAdmin />} />
                <Route path="sportify-winners" element={<SportifyWinnersAdmin />} />
                <Route path="applications" element={<ApplicationsAdmin />} />
                <Route path="members" element={<MembersAdmin />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
