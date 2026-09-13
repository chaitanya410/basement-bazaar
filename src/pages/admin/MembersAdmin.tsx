import React, { useMemo, useState } from 'react';
import { Download, Search, ExternalLink, Trash2 } from 'lucide-react';
import { useResource, toCsv, downloadCsv } from '@/hooks/useResource';
import type { Member, MemberStatus } from '@/types/database';
import { DEPARTMENTS } from '@/types/database';
import {
  PageHeader, Button, QueryState, Modal, Field, TextArea, Select,
  Badge, TableWrap, Th, Td, Card,
} from '@/components/admin/AdminUI';

const STATUSES: MemberStatus[] = ['active', 'inactive', 'alumni'];

const EXPORT_COLUMNS = [
  'submitted_at', 'full_name', 'email', 'contact_no', 'education', 'occupation',
  'blood_group', 'dob', 'departments', 'hobbies', 'referred_by', 'needs_tshirt',
  'tshirt_size', 'ice_breaker', 'status', 'notes',
];

/**
 * Members imported from the TBSF Google Form workbook.
 *
 * Read-mostly: the spreadsheet remains the system of record for submissions,
 * and must never be written to from here. Editable fields are the ones TBSF
 * adds after the fact — status and internal notes.
 */
const MembersAdmin: React.FC = () => {
  const { list, update, remove } = useResource<Member>('members', [
    { column: 'submitted_at', ascending: false },
  ]);

  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('all');
  const [status, setStatus] = useState<MemberStatus | 'all'>('all');
  const [selected, setSelected] = useState<Member | null>(null);
  const [notes, setNotes] = useState('');

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (list.data ?? []).filter((m) => {
      if (status !== 'all' && m.status !== status) return false;
      if (dept !== 'all' && !m.departments?.includes(dept)) return false;
      if (!q) return true;
      return (
        m.full_name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.contact_no ?? '').includes(q)
      );
    });
  }, [list.data, search, dept, status]);

  function openDetail(row: Member) {
    setSelected(row);
    setNotes(row.notes ?? '');
  }

  function saveNotes() {
    if (!selected) return;
    update.mutate(
      { id: selected.id, values: { notes: notes || null } },
      { onSuccess: () => setSelected(null) },
    );
  }

  function handleDelete(row: Member) {
    if (!window.confirm(`Delete ${row.full_name}'s record? The spreadsheet row is not affected.`))
      return;
    remove.mutate(row.id);
  }

  function handleExport() {
    downloadCsv(
      `tbsf-members-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(rows as unknown as Record<string, unknown>[], EXPORT_COLUMNS),
    );
  }

  return (
    <div>
      <PageHeader
        title="Members"
        description="Registrations imported from the TBSF membership form workbook. The spreadsheet stays the system of record — nothing here writes back to it."
        action={
          <Button variant="ghost" onClick={handleExport} disabled={!rows.length}>
            <Download className="w-4 h-4" />Export CSV
          </Button>
        }
      />

      <Card className="p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email or phone"
              aria-label="Search members"
              className="w-full pl-9 pr-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-ngo-blue"
            />
          </div>
          <Select value={dept} onChange={(e) => setDept(e.target.value)} aria-label="Filter by department">
            <option value="all">All departments</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </Select>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as MemberStatus | 'all')}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
        <p className="text-xs text-gray-600 mt-3">
          Showing {rows.length} of {list.data?.length ?? 0} members
        </p>
      </Card>

      <QueryState
        isLoading={list.isLoading}
        error={list.error}
        isEmpty={!rows.length}
        emptyLabel={
          list.data?.length
            ? 'No members match these filters.'
            : 'No members imported yet. Run scripts/import-members.mjs.'
        }
      >
        <TableWrap>
          <thead>
            <tr>
              <Th>Name</Th><Th>Contact</Th><Th>Departments</Th>
              <Th>Occupation</Th><Th>Joined</Th><Th>Status</Th><Th />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-800/40">
                <Td>
                  <button onClick={() => openDetail(row)}
                    className="font-medium text-white hover:text-ngo-blue transition text-left">
                    {row.full_name}
                  </button>
                  {row.blood_group && (
                    <p className="text-xs text-red-400/70">{row.blood_group}</p>
                  )}
                </Td>
                <Td>
                  <p className="text-xs text-gray-400">{row.email}</p>
                  {row.contact_no && <p className="text-xs text-gray-600">{row.contact_no}</p>}
                </Td>
                <Td>
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {(row.departments ?? []).map((d) => (
                      <Badge key={d} tone="blue">{d}</Badge>
                    ))}
                  </div>
                </Td>
                <Td className="text-gray-500 text-xs">{row.occupation ?? '—'}</Td>
                <Td className="text-gray-500 text-xs whitespace-nowrap">
                  {row.submitted_at ? new Date(row.submitted_at).toLocaleDateString() : '—'}
                </Td>
                <Td>
                  <Select
                    value={row.status}
                    onChange={(e) =>
                      update.mutate({ id: row.id, values: { status: e.target.value } })
                    }
                    aria-label={`Status for ${row.full_name}`}
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

      <Modal open={Boolean(selected)} title={selected?.full_name ?? ''} onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="flex flex-wrap gap-2">
              <Badge tone="green">{selected.status}</Badge>
              {selected.source_tab && <Badge>{selected.source_tab}</Badge>}
              {selected.ice_breaker && <Badge tone="blue">Ice breaker: {selected.ice_breaker}</Badge>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ['Email', selected.email],
                ['Contact', selected.contact_no],
                ['Education', selected.education],
                ['Occupation', selected.occupation],
                ['Blood group', selected.blood_group],
                ['Date of birth', selected.dob],
                ['T-shirt', selected.needs_tshirt ? `Yes (${selected.tshirt_size ?? 'size not given'})` : 'No'],
                ['Referred by', selected.referred_by],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                  <p className="text-gray-300 mt-0.5">{(value as string) || '—'}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Departments</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {(selected.departments ?? []).length
                  ? selected.departments.map((d) => <Badge key={d} tone="blue">{d}</Badge>)
                  : <span className="text-gray-500">—</span>}
              </div>
            </div>

            {[['Hobbies', selected.hobbies], ['Message', selected.message]].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="text-gray-300 whitespace-pre-wrap mt-0.5">{(value as string) || '—'}</p>
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              {selected.photo_url && (
                <a href={selected.photo_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-ngo-blue hover:underline">
                  <ExternalLink className="w-3 h-3" />Photo
                </a>
              )}
              {selected.registration_fee_proof_url && (
                <a href={selected.registration_fee_proof_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-ngo-blue hover:underline">
                  <ExternalLink className="w-3 h-3" />Registration payment
                </a>
              )}
              {selected.tshirt_fee_proof_url && (
                <a href={selected.tshirt_fee_proof_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-ngo-blue hover:underline">
                  <ExternalLink className="w-3 h-3" />T-shirt payment
                </a>
              )}
            </div>

            <Field label="Internal notes" htmlFor="member-notes" hint="Visible to admins only.">
              <TextArea id="member-notes" rows={3} value={notes}
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

export default MembersAdmin;
