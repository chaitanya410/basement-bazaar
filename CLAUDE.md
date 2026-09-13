# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The public website for **The Basements Social Forum (TBSF)** — a youth-run,
non-profit NGO in Wardha, Maharashtra, India. Founded 2 Oct 2021, registered
under the Societies Registration Act 1860 on 2 Aug 2023. The site presents the
NGO's mission, past events, upcoming events, and core team, and recruits
volunteers.

Single-page React app, no backend. All content is currently hard-coded in
components. See `SPECS.md` for the full-stack target and `MEMORY.md` for
project history and decisions.

## Commands

```sh
npm install              # install deps (CI uses `npm ci`, Node 20)
npm run dev              # Vite dev server on port 8080
npm run build            # production build to dist/
npm run build:dev        # development-mode build
npm run lint             # ESLint
npx tsc --noEmit -p tsconfig.app.json   # type-check — NOT part of any script
```

**Always run `npx tsc --noEmit -p tsconfig.app.json` after changing types or
component props.** Vite does not type-check, so type errors reach production
silently. There are currently 4 known pre-existing errors (see Known issues).

## Critical gotcha: the base path

The site deploys to GitHub Pages at a sub-path, and this is wired in two places
that must stay in sync:

- `vite.config.ts` — `base: "/basement-bazaar/"`
- `src/App.tsx` — `<BrowserRouter basename="/basement-bazaar/">`

**Consequence for local dev:** `npm run dev` serves at
`http://localhost:8080/basement-bazaar/`, not at `/`. Visiting the root gives a
blank page. This surprises people; it is not a bug.

If you ever change the deploy target, change both values together.

## Architecture

```
src/
  App.tsx              routing + dark-mode bootstrap + providers
  main.tsx             React root
  index.css            CSS variables (light/dark) + custom component classes
  pages/               route-level components
  components/          feature components
  components/ui/       shadcn/ui primitives — GENERATED, do not hand-edit
  hooks/               use-mobile, use-toast
  lib/utils.ts         cn() class merger
public/                images, referenced by bare filename (e.g. "Cyclothon.jpg")
```

**Routes** (defined in `src/App.tsx`):

| Path               | Component        | Notes                                  |
| ------------------ | ---------------- | -------------------------------------- |
| `/`                | `pages/Index`    | Hero, impact stats, about, CTA         |
| `/about`           | `AboutSection`   | Mission, working model, founders       |
| `/welcome`         | `pages/Welcome`  | Past events gallery (13 hard-coded)    |
| `/upcoming-events` | `UpcomingEvents` | Currently the "Sportify" festival      |
| `/coreTeam`        | `CoreTeam2026`   | Core team 2026                         |
| `/recruitment`     | `pages/Recruitment` | Not linked from the navbar          |
| `*`                | `pages/NotFound` |                                        |

`pages/Login` and `pages/Signup` exist but their routes are commented out.
`AuthForm` is a UI shell with no authentication behind it.

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
- **Images:** live in `public/` and are referenced by bare filename in `src`
  attributes, which resolves against the Vite `base`. Do not prefix with `/`.
- **Icons:** `lucide-react`.
- **Toasts:** `sonner` (`import { toast } from 'sonner'`).

## House rules

- **Delete replaced code — never comment it out.** This repo accumulated roughly
  a thousand lines of commented-out duplicate implementations in `App.tsx`,
  `Navbar.tsx`, `CoreTeam2026.tsx`, `Welcome.tsx`, and `vite.config.ts`. Git
  history is the archive. Do not add to the pile.
- **Do not hand-edit `src/components/ui/`.** Those are shadcn/ui generated
  primitives; regenerate or wrap them instead.
- **Do not commit images over ~300 KB.** Compress and resize first. See Known
  issues.
- **Never commit secrets.** Backend keys belong in `VITE_*` environment
  variables and GitHub Actions secrets, not in source.

## Deployment

`.github/workflows/deploy.yaml` builds and publishes to GitHub Pages on every
push to **`master`** (not `main`). It copies `dist/index.html` to
`dist/404.html` so client-side routing survives deep links on Pages.

The workflow already injects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
secrets into the build, but nothing consumes them yet — there is no Supabase
dependency in `package.json`. See `SPECS.md`.

## Branches

- **`master`** — the live branch. All work happens here; pushes deploy.
- **`main`** — kept identical to `master`. Historically a separate, unrelated
  lineage; reconciled on 2026-09-13.
- **`legacy/lovable-main`** — frozen archive of the original lineage. Contains
  the Supabase integration and admin-panel code that `master` never had. Read
  from it with `git show legacy/lovable-main:<path>`; do not merge it.

Both `package-lock.json` and `bun.lockb` are committed. CI uses npm; prefer npm.

## Known issues

Do not treat these as regressions you introduced:

1. **4 type errors** — `EventCard.tsx:13` (`id` missing from props),
   `Login.tsx:22`, `Signup.tsx:22`, `Recruitment.tsx:45` (all pass an `onSubmit`
   prop to components that declare no such prop).
2. **83 MB of images in `public/`**, all shipped to browsers. Largest single
   file is 13 MB (`futureOpportunities.jpg`).
3. **Forms are non-functional.** `RecruitmentForm` and `AuthForm` show a success
   toast and reset; nothing is sent anywhere. Real volunteer intake goes through
   Google Forms links on `/` and `/upcoming-events`.
4. **`index.html` still carries Lovable scaffolding** — `gptengineer.js` script
   tag, and OG/Twitter metadata reading "Lovable Generated Project".
5. **Content is hard-coded**, so every copy change needs a code change and a
   deploy.
