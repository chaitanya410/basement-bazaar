# SPECS.md — The Basements Social Forum

Product and technical specification for taking this site from a hard-coded
static brochure to a full-fledged, self-managed platform.

**Status:** Phases 0-3 implemented. Phase 4 outstanding.
**Last updated:** 2026-09-13

---

## 1. Product vision

The Basements Social Forum (TBSF) is a youth-run NGO in Wardha, Maharashtra,
working primarily on education for underprivileged children, alongside
environmental and community welfare drives. The website exists to:

1. **Establish legitimacy** — a registered NGO seeking donors, partners, and
   institutional collaborators needs a credible public presence.
2. **Recruit volunteers** — convert interested visitors into applicants.
3. **Document impact** — a durable, growing record of drives and events.
4. **Promote upcoming events** — drive registrations (e.g. the Sportify
   sports festival).

**The problem this solves:** every piece of content used to be hard-coded in
React components. Adding an event, updating the core team, or fixing a date
required a developer, a commit, and a deploy. The organisation's leadership
rotates annually, so that did not scale. **The goal was to put content and
applications under the NGO's own control.**

### Audiences

| Audience              | Needs                                              |
| --------------------- | -------------------------------------------------- |
| Prospective volunteer | Understand the mission, see real work, apply easily |
| Event participant     | Event details, dates, venue, registration           |
| Donor / partner       | Credibility, registration details, measurable impact |
| TBSF admin            | Manage content and review applications without code |

---

## 1a. Delivered

Phases 0 through 3 are built and on `master`. What remains for someone to do
by hand is listed under "Activation steps" at the end of this section.

| Delivered | Where |
| --------- | ----- |
| Schema, RLS policies, triggers | `supabase/migrations/0001_init.sql` |
| Content seed (events + team) | `supabase/migrations/0002_seed_content.sql` |
| Nullable Supabase client, image URL resolution | `src/lib/supabase.ts` |
| Admin auth, session, role | `src/contexts/AuthContext.tsx` |
| Route guard | `src/components/admin/ProtectedRoute.tsx` |
| CMS: dashboard, events, team, Sportify winners, applications, members | `src/pages/admin/` |
| Public Sportify Winners page | `src/pages/SportifyWinners.tsx` |
| Public reads with static fallback | `src/hooks/useContent.ts` |
| Member import from the Google Sheet | `scripts/import-members.mjs` |
| Image compression (83 MB -> 11 MB) | `scripts/optimize-images.mjs` |
| Type-check and lint gates before deploy | `.github/workflows/deploy.yaml` |

**Activation steps** (need Supabase account access, so they could not be done
from here):

1. Run `supabase/migrations/0001_init.sql` then `0002_seed_content.sql` against
   project `nxgqiyrltxwyasuogueu`.
2. Create the first admin user in Supabase Auth. The `handle_new_user` trigger
   gives the first account the `admin` role; later accounts default to `viewer`
   until promoted.
3. Confirm `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set as GitHub
   Actions secrets, and copy `.env.example` to `.env` locally.
4. Import members: `node scripts/import-members.mjs --fetch` with
   `SUPABASE_SERVICE_ROLE_KEY` set.
5. **Verify the RLS boundary before announcing the site** — see the test in
   section 4, Phase 2.

## 2. Original state (before this work)

**Stack:** Vite 5, React 18, TypeScript, Tailwind CSS, shadcn/ui (Radix),
React Router 6, TanStack Query (installed, unused), sonner, lucide-react.

**Hosting:** GitHub Pages at base path `/basement-bazaar/`, built by
`.github/workflows/deploy.yaml` on pushes to `master`.

**What works:** seven routes of responsive, animated marketing content with
dark mode. The visual design is good and should be preserved.

**What does not:**

| Gap                     | Detail                                                                  |
| ----------------------- | ----------------------------------------------------------------------- |
| No backend              | No database, no auth, no API                                            |
| Dead forms              | `RecruitmentForm` and `AuthForm` toast success and discard the data      |
| Real intake is external | Volunteer and Sportify signups go to Google Forms; data lives off-site   |
| Hard-coded content      | 13 events in `Welcome.tsx`, team arrays in `AboutSection`/`CoreTeam2026` |
| Unoptimised images      | 83 MB in `public/`, single files up to 13 MB                             |
| Silent type errors      | 4 errors that `npm run build` does not catch                             |
| Dead code               | ~1,000 commented-out lines across five files                             |
| Placeholder SEO         | Lovable OG metadata; `gptengineer.js` still loaded                       |
| No tests                | No test runner installed                                                |

**Relevant history:** an earlier lineage of this project (preserved at
`legacy/lovable-main`) already connected a Supabase project and built an admin
panel. That work was abandoned when the current UI was rebuilt on a separate
branch. The deploy workflow still passes `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` as build secrets even though nothing consumes them.
The Supabase project `nxgqiyrltxwyasuogueu` has an `applications` table. See
`MEMORY.md`.

---

## 3. Target architecture

Keep the static-hosting model — it is free, fast, and already working — and add
a managed backend rather than a server.

```
GitHub Pages (static SPA)
        │
        │  HTTPS, anon key, Row Level Security
        ▼
Supabase
  ├── Postgres      events, team_members, sportify_winners,
  │                 applications, members, profiles
  ├── Auth          email+password for admins only
  └── Storage       event and team images (replaces public/)
```

**Why Supabase:** free tier fits this scale, gives Postgres + auth + storage +
file hosting in one service, needs no server to operate, and the organisation
already has a project. The alternative — a headless CMS — would solve content
but not applications or auth.

**Security boundary:** Row Level Security policies in Postgres, not client-side
checks. The anon key is public by design and will ship in the bundle; it must
grant nothing that a stranger should not have. Hiding the admin UI is
presentation, never protection.

### Data model

```sql
-- Admin identities. Mirrors auth.users; role is the authorisation source.
profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  full_name    text,
  role         text not null default 'viewer'
                 check (role in ('admin', 'viewer')),
  created_at   timestamptz not null default now()
)

-- Past and upcoming events. `status` drives which page renders it.
events (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  description   text,
  status        text not null default 'past'
                  check (status in ('past', 'upcoming')),
  starts_on     date,
  ends_on       date,
  location      text,
  image_path    text,          -- Supabase Storage object path
  registration_url text,       -- external form, while one is still used
  display_order int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
)

-- Core team, per year. Supports the annual leadership rotation.
team_members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role          text not null,
  year          int not null,            -- e.g. 2026
  category      text not null default 'core'
                  check (category in ('founder', 'core')),
  image_path    text,
  bio           text,
  focus         text[] not null default '{}',   -- expertise chips
  display_order int not null default 0,
  created_at    timestamptz not null default now()
)

-- Results of the Sportify sports festival, grouped by year and sport.
sportify_winners (
  id            uuid primary key default gen_random_uuid(),
  edition_year  int not null,
  sport         text not null,           -- Cricket, Badminton, PickleBall, Carrom, ...
  position      text not null default 'winner'
                  check (position in ('winner', 'runner_up', 'third', 'special')),
  team_name     text,
  player_names  text,
  award_title   text,                    -- e.g. 'Player of the Tournament'
  image_path    text,
  notes         text,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
)

-- Volunteer applications. Contains PII.
applications (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  phone       text not null,
  address     text,
  education   text,
  experience  text,
  skills      text not null,
  motivation  text not null,
  status      text not null default 'new'
                check (status in ('new', 'reviewing', 'accepted', 'rejected')),
  notes       text,                      -- admin-only
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
)

-- Membership registrations imported from the Google Form workbook.
-- Mirrors the sheet's columns. Contains PII. Admin-only in every direction.
members (
  id           uuid primary key default gen_random_uuid(),
  submitted_at timestamptz,              -- form timestamp, IST -> UTC
  email        text not null,
  full_name    text not null,
  contact_no   text,
  education    text,
  occupation   text,
  blood_group  text,
  dob          text,
  photo_url    text,
  registration_fee_proof_url text,       -- Google Drive links from the form
  tshirt_fee_proof_url       text,
  needs_tshirt boolean,
  tshirt_size  text,
  referred_by  text,
  hobbies      text,
  departments  text[] not null default '{}',
  message      text,
  ice_breaker  text,
  source_tab   text,                     -- which workbook tab it came from
  status       text not null default 'active'
                 check (status in ('active', 'inactive', 'alumni')),
  notes        text,                     -- admin-only
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (email, submitted_at)           -- dedupes the overlapping tabs
)
```

The `applications` shape deliberately matches the existing `RecruitmentForm`
fields and the table already present in the Supabase project, so the form needs
no redesign.

A sixth table, `members`, mirrors the columns of the TBSF membership Google
Form workbook (registration fee proof, T-shirt size, blood group, department
preferences, ice-breaker) so imports round-trip cleanly. **The spreadsheet
remains the system of record for submissions** — `scripts/import-members.mjs`
reads it and never writes back. Only `status` and `notes`, which TBSF adds
after the fact, are editable in the CMS.

### Row Level Security

RLS enabled on every table. Policies:

| Table          | Anonymous                    | Authenticated admin |
| -------------- | ---------------------------- | ------------------- |
| `events`       | `select`                     | all                 |
| `team_members` | `select`                     | all                 |
| `applications` | `insert` only — **no select** | all                 |
| `members`      | none                         | all                 |
| `profiles`     | none                         | select own; admin all |

**The `applications` policy is the one that matters.** Anonymous users may
insert but must never select, or anyone with the public anon key could read
every applicant's name, email, phone, and address. This must be verified by
test, not by inspection.

Admin checks use a `SECURITY DEFINER` helper function reading `profiles.role`,
never a recursive subquery on `profiles` inside a `profiles` policy.

### Configuration

| Variable                 | Purpose                      |
| ------------------------ | ---------------------------- |
| `VITE_SUPABASE_URL`      | Project URL                  |
| `VITE_SUPABASE_ANON_KEY` | Public anon key              |

Both already exist as GitHub Actions secrets. Add `.env.example`; keep `.env`
gitignored. The client must fail loudly at startup if either is missing, rather
than rendering an empty site.

---

## 4. Phased delivery

Each phase ships independently and leaves the site working.

### Phase 0 — Hygiene (prerequisite) — DONE

Later phases edit the same files, so cleaning first avoids merge pain and
prevents new work being buried under dead code.

- Delete all commented-out duplicate implementations in `App.tsx`,
  `Navbar.tsx`, `CoreTeam2026.tsx`, `Welcome.tsx`, `vite.config.ts`.
- Fix the 4 type errors (`EventCard.tsx:13`, `Login.tsx:22`, `Signup.tsx:22`,
  `Recruitment.tsx:45`).
- Add `"typecheck": "tsc --noEmit -p tsconfig.app.json"` to `package.json`, and
  run it plus `lint` in CI **before** the build step, so type errors block a
  deploy.
- Compress and resize every image in `public/`; target max 300 KB and 1920 px
  wide. Convert to WebP with JPEG fallback where it helps.
- Replace Lovable OG/Twitter metadata in `index.html` with real TBSF content;
  remove the `gptengineer.js` script tag.
- Route `AboutSection`, `UpcomingEvents`, and `CoreTeam2026` through `Layout`
  instead of importing `Navbar`/`Footer` themselves.

**Acceptance:** `npm run lint` and `npm run typecheck` both pass clean;
`public/` under 5 MB total; Lighthouse performance ≥ 85 on mobile.

### Phase 1 — Typed content layer — DONE

Move content out of JSX into typed modules — no backend yet. This defines the
shapes Phase 2 will serve from Postgres, so the component refactor happens once.

- `src/data/events.ts`, `src/data/team.ts` exporting typed arrays.
- `src/types/` with `Event`, `TeamMember`, `Application` interfaces matching the
  SQL above.
- Components consume the data modules; no content literals in JSX.

**Acceptance:** adding an event is a one-object edit in one file. No visual
change to any page.

### Phase 2 — Supabase backend — DONE

- Add `@supabase/supabase-js`; create `src/lib/supabase.ts` reading env vars.
- Apply schema and RLS as SQL migrations committed under `supabase/migrations/`.
- Seed from the Phase 1 data modules.
- Fetch `events` and `team_members` through TanStack Query (already installed);
  render loading and error states.
- **Keep the Phase 1 data modules as a static fallback** so a Supabase outage
  degrades to the current behaviour instead of an empty page.
- Wire `RecruitmentForm` to insert into `applications`, with `zod` +
  `react-hook-form` validation (both already installed), honest error handling,
  and a real success state.

**Acceptance:** content edits in the database appear on the site without a
deploy; a submitted application is readable in Supabase; an anonymous client
attempting to `select` from `applications` is denied.

### Phase 3 — Admin panel — DONE

- Email/password auth for admins only. **No public signup** — accounts are
  created by an existing admin or directly in Supabase.
- Protected `/admin` routes with a session guard and redirect.
- CRUD for events and team members, including image upload to Storage.
- Application review: list, filter by status, change status, add notes, export
  CSV.
- Delete the `AuthForm`/`Login`/`Signup` shells or repurpose them for admin
  login. Do not ship a public signup page — it has no purpose here and widens
  the attack surface.

`legacy/lovable-main` holds an earlier admin panel
(`AdminDashboard/Events/Users/Settings/Sidebar`, `pages/Admin.tsx`). Read it for
reference; do not merge the branch.

**Acceptance:** a non-technical committee member can add an event, upload its
image, and review applications without touching code. A logged-out user hitting
`/admin` is redirected.

### Phase 4 — Quality and reach — OUTSTANDING

- Vitest + React Testing Library. Priority: RLS policy tests, form validation
  and submission, auth guards, data-fetch error states.
- Accessibility: keyboard navigation, focus-visible states, alt text, colour
  contrast (`ngo-blue` `#90cee6` on white fails WCAG AA for body text — audit
  every use).
- SEO: per-route titles and meta descriptions, `sitemap.xml`, Organization
  structured data.
- Impact statistics sourced from the database rather than the hard-coded
  `50+ / 3+ / 50+` in `Index.tsx`.
- Consider a custom domain; GitHub Pages supports it, which would also let the
  `base` path drop to `/` and remove the basename gotcha.

---

## 5. Non-functional requirements

| Area          | Requirement                                                        |
| ------------- | ------------------------------------------------------------------ |
| Performance   | Lighthouse mobile ≥ 85; no single asset over 300 KB; LCP under 2.5s |
| Accessibility | WCAG 2.1 AA for text contrast, keyboard nav, alt text               |
| Browsers      | Current Chrome, Firefox, Safari, Edge; mobile-first (most traffic)  |
| Privacy       | Applicant PII readable only by admins; state a retention period     |
| Availability  | Static site stays up if Supabase is down (static fallback)          |
| Cost          | Free tiers only — GitHub Pages + Supabase free                      |

---

## 6. Risks and open questions

**Risks**

| Risk | Mitigation |
| ---- | ---------- |
| Misconfigured RLS exposes applicant PII | Treat as release-blocking; test anonymous `select` denial explicitly before launch |
| Supabase free tier pauses on inactivity | Static fallback keeps the public site alive; document the unpause procedure |
| Annual leadership rotation loses account access | Two admins minimum; record ownership in `MEMORY.md` |
| Base-path change breaks routing | `base` and `basename` must change together; smoke-test a deep link after deploy |
| Images in Storage re-bloat the site | Enforce upload size limits and Supabase image transforms |

**Open questions** — answers belong in `MEMORY.md` as they are settled:

1. Who owns the Supabase account, and who is the backup admin?
2. Should Google Forms be retired once native intake works, or kept in parallel?
3. Sportify venue and rulebook are still "will be out soon" — who supplies them?
4. Is there a donations requirement? Payments are out of scope here and would
   need their own specification, including compliance review.
5. Should past events carry photo galleries rather than a single image each?
6. Is a custom domain wanted, and who would register it?
