import React, { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { Loader2, LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const { session, loading, signIn } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from = (location.state as { from?: string } | null)?.from ?? '/admin';

  // Redirect on any session, not just an admin one: ProtectedRoute explains
  // the problem to a non-admin, whereas staying here shows them nothing.
  if (!loading && session) return <Navigate to={from} replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await signIn(email.trim(), password);
    if (signInError) setError(signInError);
    setSubmitting(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to the site
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">Admin sign in</h1>
          <p className="text-gray-500 text-sm mb-8">
            The Basements Social Forum content management system.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg px-4 py-3"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-ngo-blue text-gray-950 font-semibold py-3 rounded-lg hover:bg-ngo-darkBlue disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              Sign in
            </button>
          </form>

          <p className="text-xs text-gray-600 mt-6 leading-relaxed">
            Accounts are created by an existing admin in Supabase. There is no public
            sign-up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
