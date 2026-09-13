import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Whether a backend is configured.
 *
 * The public site must keep working without one — pages fall back to the
 * bundled static content in src/data/. Only the admin CMS hard-requires it.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    '[TBSF] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. ' +
      'Running on bundled static content; the admin CMS is unavailable. ' +
      'Copy .env.example to .env to enable it.',
  );
}

/**
 * Null when unconfigured rather than a broken client, so callers are forced
 * to handle the no-backend case instead of failing at request time.
 */
export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'tbsf-auth',
      },
    })
  : null;

/** Narrowing helper for code paths that genuinely require the backend. */
export function requireSupabase(): SupabaseClient<Database> {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    );
  }
  return supabase;
}

/**
 * Resolve a stored image reference to a displayable URL.
 *
 * Accepts three shapes so content can migrate gradually:
 *   - absolute URL          -> used as-is
 *   - "bucket/object/path"  -> Supabase Storage public URL
 *   - bare filename         -> legacy asset in public/, resolved against BASE_URL
 */
export function resolveImageUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  if (path.includes('/') && supabase) {
    const [bucket, ...rest] = path.split('/');
    return supabase.storage.from(bucket).getPublicUrl(rest.join('/')).data.publicUrl;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
