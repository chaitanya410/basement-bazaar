# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The public website for **The Basements Social Forum (TBSF)** — a youth-run,
non-profit NGO in Wardha, Maharashtra, India. Founded 2 Oct 2021, registered
under the Societies Registration Act 1860 on 2 Aug 2023. The site presents the
NGO's mission, past events, upcoming events, and core team, and recruits
volunteers.

React SPA with a Supabase backend and a built-in content management system.
Site content (events, core team, Sportify winners) lives in Postgres and is
edited at `/admin`; the public pages fall back to bundled static content in
`src/data/` when the backend is unreachable. See `SPECS.md` for the
architecture and `MEMORY.md` for project history and decisions.

## Commands

```sh
npm install              # install deps (CI uses `npm ci`, Node 20)
npm run dev              # Vite dev server on port 8080
npm run build            # production build to dist/
npm run build:dev        # development-mode build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit; Vite does NOT type-check

node scripts/optimize-images.mjs --dry-run   # report image savings
node scripts/optimize-images.mjs             # compress public/ in place
node scripts/import-members.mjs --fetch --dry-run   # parse the member sheet
```

**Always run `npm run typecheck`.** Vite does not type-check, so type errors
would otherwise reach production silently. CI runs `typecheck` and `lint`
before the build, so either failing blocks a deploy.

## Critical gotcha: the base path

The site deploys to GitHub Pages at a sub-path, and this is wired in two places
that must stay in sync:

- `vite.config.ts` — `base: "/basement-bazaar/"`
- `src/App.tsx` — `<BrowserRouter basename={import.meta.env.BASE_URL}>`, which
  reads the value above, so only `vite.config.ts` needs changing.

**Consequence for local dev:** `npm run dev` serves at
`http://localhost:8080/basement-bazaar/`, not at `/`. Visiting the root gives a
blank page. This surprises people; it is not a bug.

If you ever change the deploy target, change it in `vite.config.ts`.

## Architecture

```
src/
  App.tsx              routing + dark-mode bootstrap + providers
  main.tsx             React root
  index.css            CSS variables (light/dark) + custom component classes
  pages/               public route components
  pages/admin/         the CMS (lazy-loaded)
  components/          feature components
  components/admin/    ProtectedRoute + shared admin UI primitives
  components/ui/       shadcn/ui primitives — GENERATED, do not hand-edit
  contexts/            AuthContext (session, profile, isAdmin)
  hooks/               useContent (public reads), useResource (admin CRUD)
  data/                static fallback content + seed source of truth
  types/database.ts    row types; hand-maintained against the migrations
  lib/supabase.ts      nullable client, resolveImageUrl()
supabase/migrations/   schema, RLS policies, content seed
scripts/               image optimisation, member import
public/                images, referenced by bare filename (e.g. "Cyclothon.jpg")
```

**Routes** (defined in `src/App.tsx`):

| Path               | Component        | Notes                                  |
| ------------------ | ---------------- | -------------------------------------- |
| `/`                | `pages/Index`    | Hero, impact stats, about, CTA         |
| `/about`           | `AboutSection`   | Mission, working model, founders       |
| `/welcome`         | `pages/Welcome`  | Past events gallery, from the CMS      |
| `/upcoming-events` | `UpcomingEvents` | Currently the "Sportify" festival      |
| `/sportify-winners` | `pages/SportifyWinners` | Results, grouped by year and sport |
| `/coreTeam`        | `CoreTeam2026`   | Core team 2026, from the CMS           |
| `/recruitment`     | `pages/Recruitment` | Not linked from the navbar          |
| `*`                | `pages/NotFound` |                                        |

**Admin CMS** — lazy-loaded, gated by `ProtectedRoute`, admin role required:

| Path                      | Page                   |
| ------------------------- | ---------------------- |
| `/admin/login`            | `AdminLogin`           |
| `/admin`                  | `Dashboard`            |
| `/admin/events`           | `EventsAdmin`          |
| `/admin/team`             | `TeamAdmin`            |
| `/admin/sportify-winners` | `SportifyWinnersAdmin` |
| `/admin/applications`     | `ApplicationsAdmin`    |
| `/admin/members`          | `MembersAdmin`         |

**Layout inconsistency to be aware of:** `components/Layout.tsx` wraps children
in `Navbar` + `Footer`, and `Index`/`Recruitment` use it. But `AboutSection`,
`UpcomingEvents`, and `CoreTeam2026` are routed directly and import `Navbar` and
`Footer` themselves. Prefer `Layout` for new routes.

## Conventions

- **Path alias:** `@/` → `src/`. Note that existing code mixes `@/components/ui/...`
  with relative `../components/...` imports; both work.
- **Styling:** Tailwind only. Shared classes live in `src/index.css` under
  `@layer components`: `.btn-ngo`, `.btn-ngo-outline`, `.ngo-glass`,
  `.link-underline`, `.hero-text-glow`.
- **Brand colours** (`tailwind.config.ts`): `ngo-blue` `#90cee6`,
  `ngo-darkBlue` `#5596ae`, `ngo-dark` `#000000`, `ngo-light` `#ffffff`.
  Use these tokens, not raw hex.
- **Fonts:** `font-sans` Inter, `font-display` Playfair Display,
  `font-cursive` Dancing Script.
- **Dark mode:** class-based. `App.tsx` reads `localStorage.theme` and
  `prefers-color-scheme` on mount and toggles `.dark` on `<html>`.
- **Images:** stored as a bare filename in `public/`, a Supabase Storage path,
  or a full URL. Always render through `resolveImageUrl()` from
  `@/lib/supabase`, which handles all three. Do not prefix with `/`.
- **Icons:** `lucide-react`.
- **Toasts:** `sonner` (`import { toast } from 'sonner'`).

## House rules

- **Delete replaced code — never comment it out.** This repo accumulated roughly
  a thousand lines of commented-out duplicate implementations in `App.tsx`,
  `Navbar.tsx`, `CoreTeam2026.tsx`, `Welcome.tsx`, and `vite.config.ts`. Git
  history is the archive. Do not add to the pile.
- **Do not hand-edit `src/components/ui/`.** Those are shadcn/ui generated
  primitives; regenerate or wrap them instead.
- **Do not commit images over ~300 KB.** Run `node scripts/optimize-images.mjs`
  after adding photos to `public/`.
- **Never commit secrets.** Backend keys belong in `VITE_*` environment
  variables and GitHub Actions secrets, not in source.

## Deployment

`.github/workflows/deploy.yaml` builds and publishes to GitHub Pages on every
push to **`master`** (not `main`). It copies `dist/index.html` to
`dist/404.html` so client-side routing survives deep links on Pages.

It injects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as build secrets.
If those are unset the deploy still succeeds — the site falls back to static
content and `/admin` reports that the CMS is not configured.

## Branches

- **`master`** — the live branch. All work happens here; pushes deploy.
- **`main`** — kept identical to `master`. Historically a separate, unrelated
  lineage; reconciled on 2026-09-13.
- **`legacy/lovable-main`** — frozen archive of the original lineage. Contains
  the Supabase integration and admin-panel code that `master` never had. Read
  from it with `git show legacy/lovable-main:<path>`; do not merge it.

Both `package-lock.json` and `bun.lockb` are committed. CI uses npm; prefer npm.

## Backend

Supabase provides Postgres, auth and storage. Configuration comes from
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`); both are
already set as GitHub Actions secrets.

- `src/lib/supabase.ts` exports a **nullable** client plus `isSupabaseConfigured`.
  The public site must keep working without a backend, so check the flag or use
  `requireSupabase()` where a backend is genuinely required.
- `src/hooks/useContent.ts` — public reads, each falling back to `src/data/`.
- `src/hooks/useResource.ts` — generic admin CRUD.
- Schema and policies: `supabase/migrations/`. Apply with `supabase db push` or
  by pasting into the Supabase SQL editor.

**Row Level Security is the security boundary, not the UI.** The anon key ships
in the browser bundle. `ProtectedRoute` and the admin nav are convenience only.
When adding a table, write its policies in the same migration — and remember
that `applications` and `members` hold personal data that anonymous clients
must never be able to `select`.

## Handling personal data

`members` and `applications` contain names, emails, phone numbers, dates of
birth and blood groups of real people, and **this repository is public**.

- Never commit member or applicant data. `data/` and `.env` are gitignored.
- `scripts/import-members.mjs` downloads the Google Sheet as CSV and upserts
  into Supabase. It is strictly read-only towards Google — it must never write
  to the spreadsheet, which remains the system of record.
- Seed migrations carry public website content only.

## Known issues

Do not treat these as regressions you introduced:

1. **Past-event data is partly placeholder.** Several entries in
   `src/data/events.ts` pair a real photo with a generic title and a 2023 date
   that do not match (see `MEMORY.md`). Verify before relying on it.
2. **`main` bundle is ~620 KB.** The admin CMS is already code-split; the
   remainder is React, Radix and supabase-js.
3. **No tests.** No test runner is installed yet — `SPECS.md` Phase 4.
4. **`AboutSection` still hard-codes its founder list** and loads two hero
   images from Unsplash; it has not been moved onto the CMS yet.
