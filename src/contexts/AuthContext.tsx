import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Profile } from '@/types/database';

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  /** True only for a signed-in user whose profile row carries role 'admin'. */
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  // Tracked separately from `loading`: after sign-in the session arrives
  // before the profile does, and treating that gap as "not an admin" would
  // flash an authorisation error at every admin who logs in.
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    const client = supabase;
    let active = true;

    async function loadProfile(userId: string) {
      setProfileLoading(true);
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!active) return;
      if (error) console.error('[TBSF] profile load failed', error);
      setProfile(data ?? null);
      setProfileLoading(false);
    }

    client.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      if (data.session?.user) {
        loadProfile(data.session.user.id).finally(() => active && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: sub } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      if (nextSession?.user) {
        // Flag the load synchronously, before the deferred fetch below, so
        // there is no render where a session exists, no profile is loaded,
        // and nothing reports as loading.
        setProfileLoading(true);
        // Deferred: calling back into supabase-js synchronously from this
        // callback can deadlock the auth lock.
        setTimeout(() => void loadProfile(nextSession.user.id), 0);
      } else {
        setProfile(null);
        setProfileLoading(false);
      }
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      isAdmin: profile?.role === 'admin',
      loading: loading || profileLoading,
      async signIn(email, password) {
        if (!supabase) {
          return { error: 'The CMS backend is not configured for this deployment.' };
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error: error?.message ?? null };
      },
      async signOut() {
        if (!supabase) return;
        await supabase.auth.signOut();
        setProfile(null);
      },
    }),
    [session, profile, loading, profileLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
