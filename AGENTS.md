# AGENTS.md

Guidance for AI coding agents (Claude Code, Cursor, Copilot, Antigravity, etc.) working in this repository.

## What this is

A single-page marketing / lead-generation site for **GURU ENERGY**, a Ukrainian company selling turnkey solar power stations (СЕС). React 19 + Vite 6, served by an Express host (`server.ts`) that also mounts Vite in middleware mode. Primary content language is Ukrainian (`uk`), with `ru` and `en` translations.

## Commands

```bash
npm install      # first run; pulls platform-native optional deps automatically
npm run dev      # Express + Vite on http://localhost:3000
npm run build    # vite build (client → dist/) + esbuild bundle server.ts → dist/server.cjs
npm start        # production bundle: node dist/server.cjs (needs NODE_ENV=production)
npm run lint     # type-check only: tsc --noEmit  (no test runner is configured)
```

## Key conventions

- **Add all UI copy in three languages** (`uk`, `ru`, `en`); default is `uk`. See `src/i18n/translations.ts`.
- No database — leads live in an in-memory array server-side and in `localStorage` client-side.
- Every backend call has a client-side fallback so the Vercel static-only build stays functional without `/api/*`.
- `GEMINI_API_KEY` (in `.env.local`) is optional; without it the AI consultant returns canned Ukrainian copy.

## Full documentation

**See [CLAUDE.md](CLAUDE.md)** for the complete architecture guide (Express-as-host, dual deployment targets, custom hash routing, React Context state, the `<energy-monitor>` Web Component, styling with Tailwind v4, and gotchas). CLAUDE.md is the single source of truth; keep it and this file in sync.
