import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { requireSupabase } from '@/lib/supabase';

/** Tables the admin CMS manages. */
export type ManagedTable =
  | 'events'
  | 'team_members'
  | 'sportify_winners'
  | 'applications'
  | 'members';

interface OrderSpec {
  column: string;
  ascending?: boolean;
}

/**
 * Generic admin CRUD against one table.
 *
 * Reads go through the authenticated client, so Row Level Security decides
 * what comes back. A policy denial surfaces as an empty list or an error
 * here — never as silently elevated access.
 */
export function useResource<T extends { id: string }>(
  table: ManagedTable,
  order: OrderSpec[] = [{ column: 'created_at', ascending: false }],
) {
  const queryClient = useQueryClient();
  const key = ['admin', table];

  const list = useQuery({
    queryKey: key,
    queryFn: async (): Promise<T[]> => {
      const client = requireSupabase();
      let query = client.from(table).select('*');
      for (const o of order) {
        query = query.order(o.column, { ascending: o.ascending ?? true });
      }
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return (data ?? []) as unknown as T[];
    },
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: key });
    // Public pages read the same tables under different keys.
    void queryClient.invalidateQueries({ queryKey: [table] });
  };

  const create = useMutation({
    mutationFn: async (values: Record<string, unknown>) => {
      const client = requireSupabase();
      const { error } = await client.from(table).insert(values as never);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success('Created');
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const update = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Record<string, unknown> }) => {
      const client = requireSupabase();
      const { error } = await client.from(table).update(values as never).eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success('Saved');
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const client = requireSupabase();
      const { error } = await client.from(table).delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success('Deleted');
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { list, create, update, remove };
}

/** Serialise rows to CSV for download. Values are quoted and escaped. */
export function toCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return '';
    const s = Array.isArray(v) ? v.join('; ') : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [
    columns.map(escape).join(','),
    ...rows.map((r) => columns.map((c) => escape(r[c])).join(',')),
  ].join('\r\n');
}

export function downloadCsv(filename: string, csv: string) {
  // Byte-order mark so Excel reads the UTF-8 correctly.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
