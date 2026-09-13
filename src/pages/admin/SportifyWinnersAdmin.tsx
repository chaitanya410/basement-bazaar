import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Trophy } from 'lucide-react';
import { useResource } from '@/hooks/useResource';
import type { SportifyWinner, WinnerPosition } from '@/types/database';
import { SPORTIFY_SPORTS, POSITION_LABELS } from '@/data/sportifyWinners';
import {
  PageHeader, Button, QueryState, Modal, Field, TextInput, TextArea, Select,
  Badge, TableWrap, Th, Td,
} from '@/components/admin/AdminUI';

const CURRENT_YEAR = new Date().getFullYear();

const EMPTY = {
  edition_year: CURRENT_YEAR,
  sport: SPORTIFY_SPORTS[0] as string,
  position: 'winner' as WinnerPosition,
  team_name: '',
  player_names: '',
  award_title: '',
  image_path: '',
  notes: '',
  display_order: 0,
};

type FormState = typeof EMPTY;

const POSITION_TONE: Record<WinnerPosition, 'amber' | 'gray' | 'blue' | 'green'> = {
  winner: 'amber',
  runner_up: 'gray',
  third: 'blue',
  special: 'green',
};

const SportifyWinnersAdmin: React.FC = () => {
  const { list, create, update, remove } = useResource<SportifyWinner>('sportify_winners', [
    { column: 'edition_year', ascending: false },
    { column: 'sport' },
    { column: 'display_order' },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<SportifyWinner | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY, display_order: (list.data?.length ?? 0) + 1 });
    setOpen(true);
  }

  function openEdit(row: SportifyWinner) {
    setEditing(row);
    setForm({
      edition_year: row.edition_year,
      sport: row.sport,
      position: row.position,
      team_name: row.team_name ?? '',
      player_names: row.player_names ?? '',
      award_title: row.award_title ?? '',
      image_path: row.image_path ?? '',
      notes: row.notes ?? '',
      display_order: row.display_order,
    });
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = {
      ...form,
      edition_year: Number(form.edition_year),
      display_order: Number(form.display_order) || 0,
      team_name: form.team_name || null,
      player_names: form.player_names || null,
      award_title: form.award_title || null,
      image_path: form.image_path || null,
      notes: form.notes || null,
    };
    const done = { onSuccess: () => setOpen(false) };
    if (editing) update.mutate({ id: editing.id, values }, done);
    else create.mutate(values, done);
  }

  function handleDelete(row: SportifyWinner) {
    if (!window.confirm(`Delete this ${row.sport} result?`)) return;
    remove.mutate(row.id);
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader
        title="Sportify Winners"
        description="Results published on the public Sportify Winners page. The page shows a 'results coming soon' state while this is empty."
        action={<Button onClick={openCreate}><Plus className="w-4 h-4" />Add result</Button>}
      />

      <QueryState
        isLoading={list.isLoading}
        error={list.error}
        isEmpty={!list.data?.length}
        emptyLabel="No results recorded yet. Add the first one once Sportify concludes."
      >
        <TableWrap>
          <thead>
            <tr>
              <Th>Year</Th><Th>Sport</Th><Th>Position</Th><Th>Team</Th>
              <Th>Players</Th><Th>Award</Th><Th />
            </tr>
          </thead>
          <tbody>
            {list.data?.map((row) => (
              <tr key={row.id} className="hover:bg-gray-800/40">
                <Td className="text-gray-400">{row.edition_year}</Td>
                <Td><span className="font-medium text-white">{row.sport}</span></Td>
                <Td>
                  <Badge tone={POSITION_TONE[row.position]}>
                    {POSITION_LABELS[row.position]}
                  </Badge>
                </Td>
                <Td className="text-gray-300">{row.team_name ?? '—'}</Td>
                <Td className="text-gray-500 max-w-xs">{row.player_names ?? '—'}</Td>
                <Td className="text-gray-500">{row.award_title ?? '—'}</Td>
                <Td>
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => openEdit(row)} aria-label="Edit"
                      className="p-2 text-gray-500 hover:text-ngo-blue transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(row)} aria-label="Delete"
                      className="p-2 text-gray-500 hover:text-red-400 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </QueryState>

      <Modal
        open={open}
        title={editing ? 'Edit result' : 'Add Sportify result'}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 text-ngo-blue mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Sportify — Clash of the Champions</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Edition year" htmlFor="edition_year">
              <TextInput id="edition_year" type="number" required value={form.edition_year}
                onChange={(e) => set('edition_year', Number(e.target.value))} />
            </Field>

            <Field label="Sport" htmlFor="sport" hint="Free text — add sports beyond the listed four.">
              <TextInput id="sport" required list="sportify-sports" value={form.sport}
                onChange={(e) => set('sport', e.target.value)} />
              <datalist id="sportify-sports">
                {SPORTIFY_SPORTS.map((s) => <option key={s} value={s} />)}
              </datalist>
            </Field>

            <Field label="Position" htmlFor="position">
              <Select id="position" value={form.position}
                onChange={(e) => set('position', e.target.value as WinnerPosition)}>
                {(Object.keys(POSITION_LABELS) as WinnerPosition[]).map((p) => (
                  <option key={p} value={p}>{POSITION_LABELS[p]}</option>
                ))}
              </Select>
            </Field>

            <Field label="Display order" htmlFor="display_order">
              <TextInput id="display_order" type="number" value={form.display_order}
                onChange={(e) => set('display_order', Number(e.target.value))} />
            </Field>
          </div>

          <Field label="Team name" htmlFor="team_name">
            <TextInput id="team_name" value={form.team_name}
              onChange={(e) => set('team_name', e.target.value)} />
          </Field>

          <Field label="Players" htmlFor="player_names" hint="Comma-separated.">
            <TextArea id="player_names" rows={2} value={form.player_names}
              onChange={(e) => set('player_names', e.target.value)} />
          </Field>

          <Field label="Award title" htmlFor="award_title"
            hint="For special awards, e.g. 'Player of the Tournament'.">
            <TextInput id="award_title" value={form.award_title}
              onChange={(e) => set('award_title', e.target.value)} />
          </Field>

          <Field label="Photo" htmlFor="image_path"
            hint="A filename from public/, a Storage path, or a full URL.">
            <TextInput id="image_path" value={form.image_path}
              onChange={(e) => set('image_path', e.target.value)} />
          </Field>

          <Field label="Notes" htmlFor="notes">
            <TextArea id="notes" rows={2} value={form.notes}
              onChange={(e) => set('notes', e.target.value)} />
          </Field>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {editing ? 'Save changes' : 'Add result'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SportifyWinnersAdmin;
