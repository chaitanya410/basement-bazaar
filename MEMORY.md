# MEMORY.md

Durable project context that is **not** derivable from reading the code or the
commit log. Decisions, external accounts, historical accidents, and unresolved
questions.

Add dated entries; do not rewrite history. Companion files: `CLAUDE.md` (how to
work in this repo), `SPECS.md` (where the project is going).

---

## The organisation

**The Basements Social Forum (TBSF)** — also written "The Basements".

- Non-profit, non-governmental organisation in Wardha, Maharashtra, India.
- Founded **2 October 2021** by students of Wardha city.
- Registered under the **Societies Registration Act 1860 on 2 August 2023**.
- Headquarters and a small book bank in Wardha.
- Primary focus: education and mentoring for underprivileged children,
  including work with a local orphanage. Secondary: environmental drives
  (tree plantation, river and city cleaning, bird feeders), animal welfare,
  health camps, and community events.
- Operates a rotating hierarchy: activity group leads are reshuffled
  periodically, deliberately, to develop volunteers. **Leadership turns over
  annually** — hence "Core Team 2026". Any system built here must survive
  handover to people who did not build it.

Founders listed on the site: Ujwal Masne, Riddhi Selkar, Chaitanya Ubale.

---

## Decision log

### 2026-09-13 — Reconciled two unrelated git histories

**What was wrong.** The repository contained two branches with **no common
ancestor** — `git merge-base master origin/main` exited non-zero.

- `main` (13 commits, head `b5c1f6a`) was the original Lovable-generated
  lineage. It had a connected Supabase project, an SQL migration, and a full
  admin panel (`AdminDashboard`, `AdminEvents`, `AdminUsers`, `AdminSettings`,
  `AdminSidebar`, `pages/Admin.tsx`, `src/integrations/supabase/`).
- `master` (19 commits, head `18a55d4`) was a separately initialised lineage
  carrying all current UI work — About, Upcoming Events, Core Team 2026, the
  updated Navbar and Footer. It has no Supabase code at all.
- `master` is what actually deploys: `.github/workflows/deploy.yaml` triggers on
  `master` only.

Most likely cause: the project was re-initialised locally (`git init` +
"initial commit" appears mid-history on `master`) and force-pushed as a new
branch rather than being cloned and branched from `main`.

**Decision.** Keep `master` as the single source of truth. Archive `main`'s
lineage, then force `main` to match `master`.

```sh
git branch legacy/lovable-main origin/main
git push origin legacy/lovable-main          # archive pushed FIRST
git push origin master:main --force
git branch -f main origin/main
```

**Outcome.** `main` and `master` both at `18a55d4`. The original lineage is
frozen at `legacy/lovable-main` (`b5c1f6a`) on the remote.

**Why not merge.** `--allow-unrelated-histories` would have conflicted across
nearly every shared file and resurrected the deleted admin and Supabase code on
top of the live branch.

**Consequence.** The Supabase and admin-panel work is **not lost** — read it
with `git show legacy/lovable-main:<path>`. `SPECS.md` Phase 3 uses it as
reference. Do not merge that branch.

### 2026-09-13 — Target is a full-stack Supabase app

Chosen over "polished static site" and over a phased static-then-backend
approach. Rationale: content is hard-coded, so every copy change needs a
developer; with annual leadership rotation that is unsustainable. The
organisation already has a Supabase project and the deploy secrets are already
configured. See `SPECS.md`.

### Earlier, undated — Volunteer intake moved to Google Forms

`RecruitmentForm` and `AuthForm` are non-functional shells: they show a success
toast and discard the input. Real intake runs through Google Forms:

- Volunteer signup: `https://forms.gle/ZSTymiKAH5Y7iGdn6` (linked from `/`)
- Sportify registration: a Google Forms link on `/upcoming-events`

This was almost certainly a pragmatic workaround for having no backend, not a
deliberate long-term choice. **Open question:** whether to retire Google Forms
once native intake works, or keep both. Note that historical applications live
in Google Sheets and would need migrating or explicitly abandoning.

---

## External accounts and services

| Service        | Detail                                                               |
| -------------- | -------------------------------------------------------------------- |
| GitHub repo    | `chaitanya410/basement-bazaar`                                        |
| GitHub Pages   | Serves from `master`; base path `/basement-bazaar/`                   |
| Supabase       | Project `nxgqiyrltxwyasuogueu`, region unknown. Has an `applications` table created by an SQL script on the old lineage. **Currently unused by `master`.** |
| Google Forms   | Volunteer intake and Sportify registration (see above)                |
| Lovable        | Original generator: project `ec886362-a2b2-42d6-8d70-757aca319fc9`. No longer the source of truth — `README.md` still describes this stale workflow. |

`deploy.yaml` already injects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
as build secrets, but no code reads them. Someone configured these in
anticipation of backend work that never landed on `master`.

**Unknown and worth establishing: who owns the Supabase and GitHub accounts, and
who the backup admin is.** With annual leadership rotation this is the single
most likely thing to go wrong.

---

## Non-obvious facts

- **Dev server is not at `/`.** `npm run dev` serves at
  `localhost:8080/basement-bazaar/` because `vite.config.ts` sets
  `base: "/basement-bazaar/"` and `App.tsx` sets a matching router `basename`.
  The root URL is blank. This is configuration, not a bug.
- **The build never type-checks.** Vite does not run `tsc`, so type errors
  deploy silently. Four exist today. Run
  `npx tsc --noEmit -p tsconfig.app.json` manually until CI enforces it.
- **`tsconfig.app.json` has `strict: false`** and `noImplicitAny: false`.
  Tightening these will surface a large number of errors at once; treat it as
  its own scoped task, not a drive-by change.
- **`public/` is 83 MB** of uncompressed photos, largest 13 MB, all shipped to
  every visitor. On mobile connections in Wardha this is the site's single
  biggest real-world problem.
- **`Layout` is used inconsistently.** `AboutSection`, `UpcomingEvents`, and
  `CoreTeam2026` import `Navbar`/`Footer` directly instead.
- **Roughly a thousand commented-out lines** of superseded implementations sit
  in `App.tsx`, `Navbar.tsx`, `CoreTeam2026.tsx`, `Welcome.tsx`, and
  `vite.config.ts` — several generations deep in places.
- **Past-event data is partly placeholder.** `Welcome.tsx` pairs real photo
  filenames with generic titles, 2023 dates, and descriptions that do not always
  match the image (e.g. "Community Health Camp" uses `PlantationDrive.jpg`).
  **Verify against reality before migrating it into a database.**
- **`AboutSection` and `UpcomingEvents` load hero images from Unsplash URLs**,
  not from `public/` — an external dependency on a third-party CDN.
- **GitHub reports 49 Dependabot vulnerabilities** (19 high, 26 moderate, 4 low)
  as of 2026-09-13. Mostly transitive dev dependencies from the Lovable
  scaffold; worth an audit pass but not an emergency for a static site.
- **`bun.lockb` and `package-lock.json` are both committed.** CI uses `npm ci`.
  The bun lockfile is stale; prefer npm and consider removing it.

---

## Open questions

Answer these as they are settled, then move them into the decision log.

1. Who owns the Supabase account, and who is the backup admin?
2. Retire Google Forms once native intake works, or run both? What happens to
   the existing Google Sheets responses?
3. Sportify: venue and rulebook are still "will be out soon" on the live site.
   Who supplies them, and by when?
4. Are the `Welcome.tsx` event titles, dates, and locations accurate? Who can
   confirm the real record of past drives?
5. Are the impact numbers in `Index.tsx` (`50+` programs, `3+` years, `50+`
   volunteers) current? "Lives Impacted" was commented out — was the figure
   disputed?
6. Is a donations feature wanted? Out of scope in `SPECS.md`; payments would
   need their own specification and compliance review.
7. Custom domain — wanted? It would also let the base path drop to `/` and
   remove the dev-server gotcha entirely.
