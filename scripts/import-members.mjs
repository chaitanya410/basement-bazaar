#!/usr/bin/env node
/**
 * Import TBSF membership registrations from the Google Form workbook into
 * the Supabase `members` table.
 *
 * READ-ONLY with respect to Google. This script only ever downloads the
 * sheet's CSV export. It never writes to, edits, or authenticates against the
 * spreadsheet — the spreadsheet stays the system of record.
 *
 * The downloaded rows contain personal information (names, emails, phone
 * numbers, dates of birth, blood groups). They are written to `data/`, which
 * is gitignored, and must never be committed — this repository is public.
 *
 * Usage:
 *   node scripts/import-members.mjs --fetch     download tabs to data/ first
 *   node scripts/import-members.mjs             import from existing data/
 *   node scripts/import-members.mjs --dry-run   parse and report, write nothing
 *
 * Requires in .env (or the environment):
 *   VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   -- bypasses RLS; never expose in the frontend
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');

const SPREADSHEET_ID = '1a--Fico2vul6o13e_GVfMlHMRL3kAFunPwjupRGZsPY';
const TABS = [
  { gid: '1553155991', name: 'Form responses 2' },
  { gid: '521080886', name: 'Ice Breakers' },
];

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const FETCH = args.has('--fetch');

// --- .env loading (no dependency on dotenv) --------------------------------

function loadEnv() {
  const path = join(ROOT, '.env');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (process.env[key]) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, '');
  }
}

// --- CSV parsing (RFC 4180, handles quoted newlines) ------------------------

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += char;
      continue;
    }

    if (char === '"') inQuotes = true;
    else if (char === ',') { row.push(field); field = ''; }
    else if (char === '\r') continue;
    else if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else field += char;
  }

  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// --- Field mapping ----------------------------------------------------------

/**
 * Column positions in the workbook. Both tabs share columns 0-16; the
 * "Ice Breakers" tab appends a spacer at 17 and the ice-breaker name at 18.
 */
const COL = {
  timestamp: 0,
  email: 1,
  fullName: 2,
  registrationProof: 3,
  tshirtProof: 4,
  contact: 5,
  education: 6,
  occupation: 7,
  bloodGroup: 8,
  photo: 9,
  referredBy: 10,
  hobbies: 11,
  departments: 12,
  dob: 13,
  needsTshirt: 14,
  tshirtSize: 15,
  message: 16,
  iceBreaker: 18,
};

const clean = (v) => (v ?? '').trim() || null;

/** "28/03/2025 16:26:24" (DD/MM/YYYY) -> ISO string. */
function parseTimestamp(value) {
  const raw = clean(value);
  if (!raw) return null;

  const match = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})[ T](\d{1,2}):(\d{2}):(\d{2})$/);
  if (!match) {
    const fallback = new Date(raw);
    return Number.isNaN(fallback.getTime()) ? null : fallback.toISOString();
  }

  const [, d, m, y, hh, mm, ss] = match.map(Number);
  // Google Forms timestamps are in the form owner's zone (IST, UTC+5:30).
  return new Date(Date.UTC(y, m - 1, d, hh - 5, mm - 30, ss)).toISOString();
}

function parseYesNo(value) {
  const raw = (clean(value) ?? '').toLowerCase();
  if (!raw) return null;
  return raw.startsWith('y');
}

function parseDepartments(value) {
  const raw = clean(value);
  if (!raw) return [];
  return raw.split(',').map((d) => d.trim()).filter(Boolean);
}

function toMember(row, tabName) {
  const email = clean(row[COL.email]);
  const fullName = clean(row[COL.fullName]);
  if (!email || !fullName) return null;

  return {
    submitted_at: parseTimestamp(row[COL.timestamp]),
    email: email.toLowerCase(),
    full_name: fullName,
    contact_no: clean(row[COL.contact]),
    education: clean(row[COL.education]),
    occupation: clean(row[COL.occupation]),
    blood_group: clean(row[COL.bloodGroup]),
    dob: clean(row[COL.dob]),
    photo_url: clean(row[COL.photo]),
    registration_fee_proof_url: clean(row[COL.registrationProof]),
    tshirt_fee_proof_url: clean(row[COL.tshirtProof]),
    needs_tshirt: parseYesNo(row[COL.needsTshirt]),
    tshirt_size: clean(row[COL.tshirtSize]),
    referred_by: clean(row[COL.referredBy]),
    hobbies: clean(row[COL.hobbies]),
    departments: parseDepartments(row[COL.departments]),
    message: clean(row[COL.message]),
    ice_breaker: clean(row[COL.iceBreaker]),
    source_tab: tabName,
  };
}

// --- Steps ------------------------------------------------------------------

async function fetchTabs() {
  mkdirSync(DATA_DIR, { recursive: true });

  for (const tab of TABS) {
    const url =
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${tab.gid}`;
    process.stdout.write(`Fetching "${tab.name}" … `);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status} for "${tab.name}". The sheet must be shared as ` +
          '"anyone with the link can view" for this export to work.',
      );
    }

    const csv = await response.text();
    writeFileSync(join(DATA_DIR, `${tab.gid}.csv`), csv, 'utf8');
    console.log(`${csv.length} bytes`);
  }
}

function collectMembers() {
  const byKey = new Map();
  let skipped = 0;

  for (const tab of TABS) {
    const path = join(DATA_DIR, `${tab.gid}.csv`);
    if (!existsSync(path)) {
      throw new Error(`Missing ${path}. Run with --fetch first.`);
    }

    const rows = parseCsv(readFileSync(path, 'utf8'));
    for (const row of rows.slice(1)) {
      if (!row.some((cell) => cell.trim())) continue;

      const member = toMember(row, tab.name);
      if (!member) { skipped++; continue; }

      // The two tabs overlap. (email, submitted_at) matches the table's
      // unique constraint, so the later tab wins for a genuine duplicate.
      byKey.set(`${member.email}|${member.submitted_at}`, member);
    }
  }

  return { members: [...byKey.values()], skipped };
}

async function upload(members) {
  loadEnv();
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env. The service ' +
        'role key is required because `members` is admin-only under RLS.',
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const BATCH = 100;
  let done = 0;

  for (let i = 0; i < members.length; i += BATCH) {
    const batch = members.slice(i, i + BATCH);
    const { error } = await supabase
      .from('members')
      .upsert(batch, { onConflict: 'email,submitted_at', ignoreDuplicates: false });

    if (error) throw new Error(`Batch at ${i}: ${error.message}`);
    done += batch.length;
    console.log(`  upserted ${done}/${members.length}`);
  }
}

async function main() {
  if (FETCH) await fetchTabs();

  const { members, skipped } = collectMembers();
  console.log(`\nParsed ${members.length} unique members (${skipped} rows skipped as incomplete).`);

  const departments = new Map();
  for (const m of members) {
    for (const d of m.departments) departments.set(d, (departments.get(d) ?? 0) + 1);
  }
  console.log('Departments:', Object.fromEntries([...departments].sort((a, b) => b[1] - a[1])));

  if (DRY_RUN) {
    console.log('\n--dry-run: nothing written.');
    console.log('Sample:', JSON.stringify({ ...members[0], email: '<redacted>', contact_no: '<redacted>' }, null, 2));
    return;
  }

  console.log('\nUploading to Supabase …');
  await upload(members);
  console.log('Done.');
}

main().catch((err) => {
  console.error('\nImport failed:', err.message);
  process.exit(1);
});
