import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { EventRecord, TeamMember, SportifyWinner } from '@/types/database';
import { ALL_EVENTS, type StaticEvent } from '@/data/events';
import { ALL_TEAM, type StaticTeamMember } from '@/data/team';
import { SPORTIFY_WINNERS } from '@/data/sportifyWinners';

/**
 * Public content reads.
 *
 * Every hook degrades to the bundled static content in src/data/ when
 * Supabase is unconfigured or the request fails, so a backend outage shows
 * the old site rather than an empty page.
 */

const STATIC_ID = (prefix: string, i: number) => `static-${prefix}-${i}`;

function eventsFromStatic(items: StaticEvent[]): EventRecord[] {
  return items.map((e, i) => ({
    ...e,
    id: STATIC_ID('event', i),
    created_at: '',
    updated_at: '',
  }));
}

function teamFromStatic(items: StaticTeamMember[]): TeamMember[] {
  return items.map((m, i) => ({
    id: STATIC_ID('team', i),
    name: m.name,
    role: m.role,
    year: m.year,
    category: m.category,
    image_path: m.image_path,
    bio: m.bio,
    focus: m.focus,
    display_order: m.display_order,
    created_at: '',
    updated_at: '',
  }));
}

/** True for rows synthesised from src/data/ rather than fetched. */
export const isStaticRow = (id: string) => id.startsWith('static-');

export function useEvents(status?: 'past' | 'upcoming') {
  return useQuery({
    queryKey: ['events', status ?? 'all'],
    queryFn: async (): Promise<EventRecord[]> => {
      const fallback = eventsFromStatic(
        status ? ALL_EVENTS.filter((e) => e.status === status) : ALL_EVENTS,
      );

      if (!isSupabaseConfigured || !supabase) return fallback;

      let query = supabase.from('events').select('*').order('display_order');
      if (status) query = query.eq('status', status);

      const { data, error } = await query;
      if (error || !data?.length) {
        if (error) console.error('[TBSF] events fetch failed, using static content', error);
        return fallback;
      }
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useTeam(year?: number) {
  return useQuery({
    queryKey: ['team_members', year ?? 'all'],
    queryFn: async (): Promise<TeamMember[]> => {
      const fallback = teamFromStatic(
        year ? ALL_TEAM.filter((m) => m.year === year) : ALL_TEAM,
      );

      if (!isSupabaseConfigured || !supabase) return fallback;

      let query = supabase
        .from('team_members')
        .select('*')
        .order('year', { ascending: false })
        .order('display_order');
      if (year) query = query.eq('year', year);

      const { data, error } = await query;
      if (error || !data?.length) {
        if (error) console.error('[TBSF] team fetch failed, using static content', error);
        return fallback;
      }
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSportifyWinners(editionYear?: number) {
  return useQuery({
    queryKey: ['sportify_winners', editionYear ?? 'all'],
    queryFn: async (): Promise<SportifyWinner[]> => {
      const fallback: SportifyWinner[] = SPORTIFY_WINNERS.map((w, i) => ({
        ...w,
        id: STATIC_ID('winner', i),
        created_at: '',
        updated_at: '',
      }));

      if (!isSupabaseConfigured || !supabase) return fallback;

      let query = supabase
        .from('sportify_winners')
        .select('*')
        .order('edition_year', { ascending: false })
        .order('display_order');
      if (editionYear) query = query.eq('edition_year', editionYear);

      const { data, error } = await query;
      if (error) {
        console.error('[TBSF] winners fetch failed, using static content', error);
        return fallback;
      }
      // An empty result is meaningful here: results genuinely aren't in yet.
      return data ?? fallback;
    },
    staleTime: 5 * 60 * 1000,
  });
}
