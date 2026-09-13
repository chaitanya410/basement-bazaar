import React, { useMemo, useState } from 'react';
import { Download, Trash2, Mail, Phone } from 'lucide-react';
import { useResource, toCsv, downloadCsv } from '@/hooks/useResource';
import type { Application, ApplicationStatus } from '@/types/database';
import {
  PageHeader, Button, QueryState, Modal, Field, TextArea, Select,
  Badge, TableWrap, Th, Td,
} from '@/components/admin/AdminUI';

const STATUSES: ApplicationStatus[] = ['new', 'reviewing', 'accepted', 'rejected'];

const TONE: Record<ApplicationStatus, 'amber' | 'blue' | 'green' | 'red'> = {
  new: 'amber',
  reviewing: 'blue',
  accepted: 'green',
  rejected: 'red',
};

const EXPORT_COLUMNS = [
  'created_at', 'name', 'email', 'phone', 'address', 'education',
  'experience', 'skills', 'motivation', 'status', 'notes',
];

const ApplicationsAdmin: React.FC = () => {
  const { list, update, remove } = useResource<Application>('applications', [
    { column: 'created_at', ascending: false },
  ]);

  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all');
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState('');

  const rows = useMemo(
    () => (filter === 'all' ? list.data ?? [] : (list.data ?? []).filter((a) => a.status === filter)),
    [list.data, filter],
  );

  function openDetail(row: Application) {
    setSelected(row);
    setNotes(row.notes ?? '');
  }

  function setStatus(row: Application, status: ApplicationStatus) {
    update.mutate({ id: row.id, values: { status } });
  }

  function saveNotes() {
    if (!selected) return;
    update.mutate(
      { id: selected.id, values: { notes: notes || null } },
      { onSuccess: () => setSelected(null) },
    );
  }

  function handleDelete(row: Application) {
    if (!window.confirm(`Delete the application from ${row.name}? This cannot be undone.`)) return;
    remove.mutate(row.id);
  }

  function handleExport() {
    downloadCsv(
      `tbsf-applications-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(rows as unknown as Record<string, unknown>[], EXPORT_COLUMNS),
    );
  }

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Volunteer applications submitted through the website. Contains personal information — handle accordingly."
        action={
          <Button variant="ghost" onClick={handleExport} disabled={!rows.length}>
            <Download className="w-4 h-4" />Export CSV
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              filter === s
                ? 'bg-ngo-blue text-gray-950'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {s === 'all' ? 'All' : s}
            {s !== 'all' && (
              <span className="ml-1.5 opacity-60">
                {(list.data ?? []).filter((a) => a.status === s).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <QueryState
        isLoading={list.isLoading}
        error={list.error}
        isEmpty={!rows.length}
        emptyLabel={filter === 'all' ? 'No applications yet.' : `No ${filter} applications.`}
      >
        <TableWrap>
          <thead>
            <tr><Th>Applicant</Th><Th>Contact</Th><Th>Skills</Th><Th>Received</Th><Th>Status</Th><Th /></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-800/40">
                <Td>
                  <button onClick={() => openDetail(row)}
                    className="font-medium text-white hover:text-ngo-blue transition text-left">
                    {row.name}
                  </button>
                  {row.education && <p className="text-xs text-gray-600">{row.education}</p>}
                </Td>
                <Td>
                  <a href={`mailto:${row.email}`}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-ngo-blue text-xs">
                    <Mail className="w-3 h-3" />{row.email}
                  </a>
                  <a href={`tel:${row.phone}`}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-ngo-blue text-xs mt-1">
                    <Phone className="w-3 h-3" />{row.phone}
                  </a>
                </Td>
                <Td className="text-gray-500 max-w-xs">
                  <p className="line-clamp-2">{row.skills}</p>
                </Td>
                <Td className="text-gray-500 whitespace-nowrap text-xs">
                  {row.created_at ? new Date(row.created_at).toLocaleDateString() : '—'}
                </Td>
                <Td>
                  <Select
                    value={row.status}
                    onChange={(e) => setStatus(row, e.target.value as ApplicationStatus)}
                    aria-label={`Status for ${row.name}`}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Td>
                <Td>
                  <button onClick={() => handleDelete(row)} aria-label="Delete"
                    className="p-2 text-gray-500 hover:text-red-400 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </QueryState>

      <Modal
        open={Boolean(selected)}
        title={selected?.name ?? ''}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="flex flex-wrap gap-2">
              <Badge tone={TONE[selected.status]}>{selected.status}</Badge>
              <Badge>{new Date(selected.created_at).toLocaleString()}</Badge>
            </div>

            {[
              ['Email', selected.email],
              ['Phone', selected.phone],
              ['Address', selected.address],
              ['Education', selected.education],
              ['Prior experience', selected.experience],
              ['Skills and interests', selected.skills],
              ['Motivation', selected.motivation],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="text-gray-300 whitespace-pre-wrap mt-0.5">{value || '—'}</p>
              </div>
            ))}

            <Field label="Internal notes" htmlFor="notes" hint="Visible to admins only.">
              <TextArea id="notes" rows={3} value={notes}
                onChange={(e) => setNotes(e.target.value)} />
            </Field>

            <div className="flex gap-3 pt-2">
              <Button onClick={saveNotes} disabled={update.isPending}>Save notes</Button>
              <Button variant="ghost" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ApplicationsAdmin;
