# The Basements Social Forum

The website and content management system for **The Basements Social Forum
(TBSF)** — a youth-run, non-profit NGO in Wardha, Maharashtra, India, working
for the education and welfare of underprivileged children since 2021.

Live at **https://chaitanya410.github.io/basement-bazaar/**

## What it does

A public site — mission, past events, upcoming events, core team, Sportify
results, volunteer recruitment — backed by a content management system at
`/admin` so the committee can update everything without a developer.

Built with Vite, React 18, TypeScript, Tailwind CSS and shadcn/ui, deployed to
GitHub Pages, with Supabase for the database, authentication and storage.

## Getting started

```sh
npm install
cp .env.example .env    # fill in the Supabase values
npm run dev
```

Then open **http://localhost:8080/basement-bazaar/** — note the path. The site
deploys to a GitHub Pages sub-path, so the root URL renders blank. This is
configuration, not a bug.

The site runs without Supabase credentials; it falls back to the bundled
content in `src/data/` and the admin CMS reports that it is unconfigured.

## Commands

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Dev server on port 8080 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` — Vite does **not** type-check |
| `node scripts/optimize-images.mjs` | Compress `public/` in place |
| `node scripts/import-members.mjs --fetch` | Import the membership workbook |

CI runs `typecheck` and `lint` before the build, so either failing blocks a
deploy.

## Setting up the backend

1. Apply `supabase/migrations/0001_init.sql`, then `0002_seed_content.sql`.
2. Create the first user in Supabase Auth — the first account automatically
   gets the `admin` role. There is no public sign-up.
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as GitHub Actions
   secrets for deploys, and in `.env` for local work.

**Row Level Security is the security boundary.** The anon key ships in the
browser bundle by design; the policies in `0001_init.sql` are what actually
protect data. The admin UI being hidden protects nothing.

## Handling personal data

The `applications` and `members` tables hold names, emails, phone numbers,
dates of birth and blood groups of real people, and **this repository is
public**. Never commit that data — `data/` and `.env` are gitignored, and the
seed migration carries public website content only.

The membership Google Sheet is the system of record for registrations.
`scripts/import-members.mjs` reads it and never writes back to it.

## Documentation

- **`CLAUDE.md`** — how to work in this repository: commands, architecture,
  conventions, gotchas.
- **`SPECS.md`** — architecture, data model, delivery phases, what remains.
- **`MEMORY.md`** — organisation background, decision log, external accounts,
  open questions.

## Deployment

Pushing to `master` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yaml`. `main` is kept identical to `master`;
`legacy/lovable-main` is a frozen archive of the project's original lineage.
