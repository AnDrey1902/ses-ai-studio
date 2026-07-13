# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git workflow (MANDATORY — read first)

We use **GitHub Flow**. `master` is the **only** permanent branch — always working, deploy comes from it, and it is **protected on GitHub** (direct push and `--force` are rejected). The full process, glossary, and conflict-resolution steps live in [CONTRIBUTING.md](CONTRIBUTING.md), which is the **source of truth for process**; this section is the short hard-rule version the assistant must follow.

**Hard rules — no exceptions:**

- **Never** commit or push directly to `master`. **Never** use `--force` / `-f`.
- Every task runs through a short-lived branch and a Pull Request. One task → one branch.
- **Open the PR, but never merge it.** Merge is a human action after review.

**Per-task algorithm:**

1. `git checkout master && git pull` — start from the freshest main.
2. `git checkout -b feature/<short-en-slug>` — branch names: `feature/…` (new), `fix/…` (bugfix), `chore/…` (docs/config/deps).
3. Make changes + commits. **Commit messages in English**, Conventional Commits style (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `style:`).
4. Gate on `npm run build` (build must be green — this is the real check; `npm run lint` is type-check only and may be broken).
5. `git push -u origin feature/<…>`.
6. Open a PR (base: `master`) via the GitHub MCP; write the summary in Russian. **Do not merge** — hand it to the human.

## What this is

A single-page marketing / lead-generation site for **GURU ENERGY**, a Ukrainian company selling turnkey solar power stations (СЕС). It bundles a public landing page, a blog, a shop, an AI solar-consultant chat widget (Gemini), and a lightweight admin/CRM view for captured leads. Primary content language is Ukrainian (`uk`), with `ru` and `en` translations.

Originally scaffolded as a Google AI Studio applet (see [metadata.json](metadata.json), which declares the `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API` capability).

## Commands

```bash
npm run dev      # Start Express + Vite (middleware mode) on http://localhost:3000
npm run build    # vite build (client → dist/) + esbuild bundle server.ts → dist/server.cjs
npm start        # Run the production bundle: node dist/server.cjs (needs NODE_ENV=production)
npm run lint     # Type-check only: tsc --noEmit
npm run clean    # rm -rf dist server.cjs
```

- **No test runner is configured.** `npm run lint` is the only automated check (a type-check, no emit).
- Requires `GEMINI_API_KEY` in `.env.local` for live AI responses (see [.env.example](.env.example)); without it the AI endpoint returns canned Ukrainian fallback copy, so the app still runs.
- On Windows the shell is PowerShell; `npm run clean` uses `rm -rf` and only works under a POSIX shell (e.g. the Bash tool / Git Bash).

## Architecture

### Express server is the single entry point (not `vite dev`)

[server.ts](server.ts) is the app's host in **both** dev and prod — `npm run dev` runs `tsx server.ts`, which mounts Vite in **middleware mode** (`appType: "spa"`) rather than running the Vite CLI. The same file:

- Serves the SPA (Vite middleware in dev; `express.static("dist")` in prod).
- Exposes the API: `GET /api/health`, `GET /api/leads`, `POST /api/leads`, `POST /api/ai-consult`.
- Holds leads in an **in-memory** array (`leadsDb`) — no database; data is lost on restart.
- Calls Gemini server-side via `@google/genai` (model `gemini-2.5-flash`) with a Ukrainian solar-engineer system prompt. Missing key or any error → hard-coded Ukrainian fallback answer (never 500s to the client).

### Two deployment targets, and they behave differently

1. **Full-stack (Express):** `npm run build` then `npm start`. API routes are live.
2. **Vercel static-only:** [vercel.json](vercel.json) runs `vite build` and serves `dist/` with SPA rewrites. **The Express server and all `/api/*` routes are NOT deployed here.** The client is written to degrade gracefully — every network call has a client-side fallback (see below), so the static build stays functional without a backend.

### Client state: React Context + localStorage, no external store

All app state lives in [src/context/AppContext.tsx](src/context/AppContext.tsx) (`AppProvider` / `useApp()`):

- `leads` and `waitlist` are seeded from [src/data/mockData.ts](src/data/mockData.ts) and **persisted to `localStorage`** (`guru_energy_leads`, `guru_energy_waitlist`) via effects. This is the source of truth the admin view reads.
- `addLead` writes to local state first, then does a **best-effort** `POST /api/leads` inside a try/catch — a failed fetch (e.g. on Vercel) is intentionally swallowed. This dual-write pattern is the norm; follow it when adding backend-touching actions.
- The AI widget ([src/components/ai/AIConsultantWidget.tsx](src/components/ai/AIConsultantWidget.tsx)) similarly falls back to keyword-matched canned replies if `/api/ai-consult` fails.

### Routing is custom and hash-based (no react-router)

Navigation is a `view` string (`CurrentView` union in [src/types.ts](src/types.ts)) driven by `window.location.hash`. [App.tsx](src/App.tsx) `MainContent` switches on `view`: some values (`admin`, `blog`, `shop`, `contacts`, `privacy`, `blog_detail`) render full pages; the rest render the full landing page and smooth-scroll to a section `id`. Blog detail uses `#blog/<slug>`. **To add a route:** extend `CurrentView`, add the hash to the allow-list in `AppContext`'s `handleHash`, and branch in `MainContent`.

### i18n is a hand-rolled dictionary

[src/i18n/translations.ts](src/i18n/translations.ts) is one big `Record<Language, Record<string, string>>`. Components pull strings via `tr(key)` from `useApp()` (falls back to the raw key if missing). Rich content models (packages, cases, reviews, blog posts in `mockData.ts`) instead store per-language values inline as `Record<Language, string>` fields — see the interfaces in [src/types.ts](src/types.ts). New UI copy must be added to **all three** language maps.

### Component layout

- `src/components/landing/*` — the ~13 stacked landing sections, composed in order by `MainContent`.
- `src/components/pages/*` — full-page views (blog, shop, contacts, privacy, admin).
- `src/components/common/*` — Navbar, Footer, `LeadModal` (global capture modal opened via `openLeadModal`), Logo, `SchemaOrg` (JSON-LD).
- `src/widgets/energy-monitor/` — a **framework-agnostic Web Component** (`<energy-monitor>` custom element, vanilla JS) registered globally in [main.tsx](src/main.tsx) and rendered in [HeroSection.tsx](src/components/landing/HeroSection.tsx). Configured entirely via HTML attributes (`type`, `power`, `tariff-home`/`tariff-biz`, `powers-home`/`powers-biz`, `autoplay`, `hour-ms`); JSX typing lives in `energy-monitor.d.ts`.
- The admin view ([src/components/pages/AdminPage.tsx](src/components/pages/AdminPage.tsx)) is gated by a **client-side hard-coded password** (`admin` / `guru` / `2026`) — it is a demo CRM, not real auth.

### Styling

Tailwind CSS **v4** via `@tailwindcss/vite` (no `tailwind.config.js`). Theme tokens are declared in the `@theme` block of [src/index.css](src/index.css) (`--color-brand-green: #22C55E`, brand dark/accent, Manrope/Inter fonts). Dark UI throughout (`bg-slate-950`, green accent). Fonts are loaded from Google Fonts in [index.html](index.html).

### Path alias

`@` → project root, configured in **both** [vite.config.ts](vite.config.ts) and [tsconfig.json](tsconfig.json). Keep them in sync. (Note: source files currently import via relative paths.)

## Conventions & gotchas

- **Add copy in all 3 languages** (`uk`, `ru`, `en`) — default language is `uk`.
- `vite.config.ts` disables HMR/file-watching when `DISABLE_HMR=true` (an AI Studio agent-edit concern). Don't remove this guard.
- `.env*` is git-ignored except `.env.example`; `.claude/` and `.impeccable/` (local tooling) are ignored too.
- No `.npmrc`: a plain `npm install` pulls the platform-native optional deps (lightningcss, rollup) automatically, so installs work as-is on Windows, Linux, and Vercel.
- **Do not rewrite [AGENTS.md](AGENTS.md)** — it is the OpenCode agent's config, maintained by a collaborator, and intentionally independent of this file. `CLAUDE.md` is the Claude Code equivalent; keep the two separate.
