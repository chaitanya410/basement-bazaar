import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useResource } from '@/hooks/useResource';
import type { TeamMember } from '@/types/database';
import { resolveImageUrl } from '@/lib/supabase';
import {
  PageHeader, Button, QueryState, Modal, Field, TextInput, TextArea, Select,
  Badge, TableWrap, Th, Td,
} from '@/components/admin/AdminUI';

const CURRENT_YEAR = new Date().getFullYear();

const EMPTY = {
  name: '', role: '', year: CURRENT_YEAR, category: 'core',
  image_path: '', bio: '', focus: '', display_order: 0,
};

type FormState = typeof EMPTY;

const TeamAdmin: React.FC = () => {
  const { list, create, update, remove } = useResource<TeamMember>('team_members', [
    { column: 'year', ascending: false },
    { column: 'display_order' },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY, display_order: (list.data?.length ?? 0) + 1 });
    setOpen(true);
  }

  function openEdit(row: TeamMember) {
    setEditing(row);
    setForm({
      name: row.name, role: row.role, year: row.year, category: row.category,
      image_path: row.image_path ?? '', bio: row.bio ?? '',
      focus: (row.focus ?? []).join(', '),
      display_order: row.display_order,
    });
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = {
      ...form,
      year: Number(form.year),
      display_order: Number(form.display_order) || 0,
      image_path: form.image_path || null,
      bio: form.bio || null,
      focus: form.focus.split(',').map((f) => f.trim()).filter(Boolean),
    };
    const done = { onSuccess: () => setOpen(false) };
    if (editing) update.mutate({ id: editing.id, values }, done);
    else create.mutate(values, done);
  }

  function handleDelete(row: TeamMember) {
    if (!window.confirm(`Remove ${row.name} from the team?`)) return;
    remove.mutate(row.id);
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader
        title="Core Team"
        description="Team members by year. Leadership rotates annually, so add a new year rather than overwriting the last."
        action={<Button onClick={openCreate}><Plus className="w-4 h-4" />Add member</Button>}
      />

      <QueryState
        isLoading={list.isLoading}
        error={list.error}
        isEmpty={!list.data?.length}
        emptyLabel="No team members yet."
      >
        <TableWrap>
          <thead>
            <tr><Th /><Th>Name</Th><Th>Role</Th><Th>Year</Th><Th>Category</Th><Th>Order</Th><Th /></tr>
          </thead>
          <tbody>
            {list.data?.map((row) => (
              <tr key={row.id} className="hover:bg-gray-800/40">
                <Td>
                  {row.image_path ? (
                    <img src={resolveImageUrl(row.image_path)} alt=""
                      className="w-10 h-10 rounded-full object-cover object-[50%_20%]" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-800" />
                  )}
                </Td>
                <Td><span className="font-medium text-white">{row.name}</span></Td>
                <Td className="text-gray-400">{row.role}</Td>
                <Td className="text-gray-400">{row.year}</Td>
                <Td>
                  <Badge tone={row.category === 'founder' ? 'amber' : 'blue'}>{row.category}</Badge>
                </Td>
                <Td className="text-gray-500">{row.display_order}</Td>
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

      <Modal open={open} title={editing ? 'Edit member' : 'Add member'} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" htmlFor="name">
              <TextInput id="name" required value={form.name}
                onChange={(e) => set('name', e.target.value)} />
            </Field>
            <Field label="Role" htmlFor="role">
              <TextInput id="role" required value={form.role}
                onChange={(e) => set('role', e.target.value)}
                placeholder="e.g. President" />
            </Field>
            <Field label="Year" htmlFor="year">
              <TextInput id="year" type="number" required value={form.year}
                onChange={(e) => set('year', Number(e.target.value))} />
            </Field>
            <Field label="Category" htmlFor="category">
              <Select id="category" value={form.category}
                onChange={(e) => set('category', e.target.value)}>
                <option value="core">Core</option>
                <option value="founder">Founder</option>
              </Select>
            </Field>
          </div>

          <Field label="Photo" htmlFor="image_path"
            hint="A filename from public/ (e.g. Rakshit.jpeg), a Storage path, or a full URL.">
            <TextInput id="image_path" value={form.image_path}
              onChange={(e) => set('image_path', e.target.value)} />
          </Field>

          <Field label="Bio" htmlFor="bio">
            <TextArea id="bio" rows={3} value={form.bio}
              onChange={(e) => set('bio', e.target.value)} />
          </Field>

          <Field label="Expertise tags" htmlFor="focus"
            hint="Comma-separated, shown as chips on the Core Team page.">
            <TextInput id="focus" value={form.focus}
              onChange={(e) => set('focus', e.target.value)}
              placeholder="Public Speaking, Strategic Vision, Team Building" />
          </Field>

          <Field label="Display order" htmlFor="display_order">
            <TextInput id="display_order" type="number" value={form.display_order}
              onChange={(e) => set('display_order', Number(e.target.value))} />
          </Field>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {editing ? 'Save changes' : 'Add member'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TeamAdmin;
