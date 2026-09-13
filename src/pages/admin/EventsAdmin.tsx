import React, { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useResource } from '@/hooks/useResource';
import type { EventRecord } from '@/types/database';
import {
  PageHeader, Button, QueryState, Modal, Field, TextInput, TextArea, Select,
  Badge, TableWrap, Th, Td,
} from '@/components/admin/AdminUI';

const EMPTY = {
  slug: '', title: '', description: '', status: 'past',
  starts_on: '', ends_on: '', location: '', image_path: '',
  registration_url: '', display_order: 0,
};

type FormState = typeof EMPTY;

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const EventsAdmin: React.FC = () => {
  const { list, create, update, remove } = useResource<EventRecord>('events', [
    { column: 'status' },
    { column: 'display_order' },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventRecord | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);

  function openCreate() {
    setEditing(null);
    setForm({ ...EMPTY, display_order: (list.data?.length ?? 0) + 1 });
    setOpen(true);
  }

  function openEdit(row: EventRecord) {
    setEditing(row);
    setForm({
      slug: row.slug,
      title: row.title,
      description: row.description ?? '',
      status: row.status,
      starts_on: row.starts_on ?? '',
      ends_on: row.ends_on ?? '',
      location: row.location ?? '',
      image_path: row.image_path ?? '',
      registration_url: row.registration_url ?? '',
      display_order: row.display_order,
    });
    setOpen(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = {
      ...form,
      slug: form.slug || slugify(form.title),
      // Empty date strings are not valid dates; send null instead.
      starts_on: form.starts_on || null,
      ends_on: form.ends_on || null,
      description: form.description || null,
      location: form.location || null,
      image_path: form.image_path || null,
      registration_url: form.registration_url || null,
      display_order: Number(form.display_order) || 0,
    };

    const done = { onSuccess: () => setOpen(false) };
    if (editing) update.mutate({ id: editing.id, values }, done);
    else create.mutate(values, done);
  }

  function handleDelete(row: EventRecord) {
    if (!window.confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    remove.mutate(row.id);
  }

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div>
      <PageHeader
        title="Events"
        description="Past drives and upcoming events shown on the public site."
        action={<Button onClick={openCreate}><Plus className="w-4 h-4" />New event</Button>}
      />

      <QueryState
        isLoading={list.isLoading}
        error={list.error}
        isEmpty={!list.data?.length}
        emptyLabel="No events yet. Create the first one."
      >
        <TableWrap>
          <thead>
            <tr>
              <Th>Title</Th><Th>Status</Th><Th>Date</Th><Th>Location</Th>
              <Th>Order</Th><Th />
            </tr>
          </thead>
          <tbody>
            {list.data?.map((row) => (
              <tr key={row.id} className="hover:bg-gray-800/40">
                <Td>
                  <p className="font-medium text-white">{row.title}</p>
                  <p className="text-xs text-gray-600">{row.slug}</p>
                </Td>
                <Td>
                  <Badge tone={row.status === 'upcoming' ? 'green' : 'gray'}>{row.status}</Badge>
                </Td>
                <Td className="text-gray-400 whitespace-nowrap">{row.starts_on ?? '—'}</Td>
                <Td className="text-gray-400">{row.location ?? '—'}</Td>
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

      <Modal open={open} title={editing ? 'Edit event' : 'New event'} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" htmlFor="title">
            <TextInput id="title" required value={form.title}
              onChange={(e) => set('title', e.target.value)} />
          </Field>

          <Field label="Slug" htmlFor="slug" hint="Left blank, this is generated from the title.">
            <TextInput id="slug" value={form.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder={slugify(form.title)} />
          </Field>

          <Field label="Description" htmlFor="description">
            <TextArea id="description" rows={3} value={form.description}
              onChange={(e) => set('description', e.target.value)} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Status" htmlFor="status">
              <Select id="status" value={form.status}
                onChange={(e) => set('status', e.target.value)}>
                <option value="past">Past</option>
                <option value="upcoming">Upcoming</option>
              </Select>
            </Field>
            <Field label="Display order" htmlFor="display_order">
              <TextInput id="display_order" type="number" value={form.display_order}
                onChange={(e) => set('display_order', Number(e.target.value))} />
            </Field>
            <Field label="Starts on" htmlFor="starts_on">
              <TextInput id="starts_on" type="date" value={form.starts_on}
                onChange={(e) => set('starts_on', e.target.value)} />
            </Field>
            <Field label="Ends on" htmlFor="ends_on">
              <TextInput id="ends_on" type="date" value={form.ends_on}
                onChange={(e) => set('ends_on', e.target.value)} />
            </Field>
          </div>

          <Field label="Location" htmlFor="location">
            <TextInput id="location" value={form.location}
              onChange={(e) => set('location', e.target.value)} />
          </Field>

          <Field label="Image" htmlFor="image_path"
            hint="A filename from public/ (e.g. Cyclothon.jpg), a Storage path, or a full URL.">
            <TextInput id="image_path" value={form.image_path}
              onChange={(e) => set('image_path', e.target.value)} />
          </Field>

          <Field label="Registration URL" htmlFor="registration_url">
            <TextInput id="registration_url" type="url" value={form.registration_url}
              onChange={(e) => set('registration_url', e.target.value)} />
          </Field>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={create.isPending || update.isPending}>
              {editing ? 'Save changes' : 'Create event'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventsAdmin;
