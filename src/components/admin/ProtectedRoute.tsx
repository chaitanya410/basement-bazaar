import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

/**
 * Gate for /admin routes.
 *
 * This is a convenience, not a security boundary — Row Level Security in
 * Postgres is what actually protects the data. A determined visitor can
 * render any component; they still cannot read a row the policies deny.
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-3">CMS not configured</h1>
          <p className="text-gray-400">
            This build has no Supabase credentials. Set{' '}
            <code className="text-amber-300">VITE_SUPABASE_URL</code> and{' '}
            <code className="text-amber-300">VITE_SUPABASE_ANON_KEY</code>, then rebuild.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <Loader2 className="w-8 h-8 text-ngo-blue animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-3">Not authorised</h1>
          <p className="text-gray-400">
            Your account is signed in but does not have the admin role. Ask an existing
            admin to grant it.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
