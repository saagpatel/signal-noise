# Signal & Noise

## Purpose

Interactive essay teaching Bayesian reasoning through direct manipulation of live visualizations. Seven chapters, second-person narrative, no login required. The landing page IS the product. Statically deployed to Vercel, MIT licensed.

## Stack

- Next.js 16 — App Router, `output: 'export'` (full static site)
- React 19 — hooks only, no class components
- TypeScript 6 — strict mode, zero `any` types
- D3 v7 — math/scales only; React owns the DOM
- KaTeX 0.18 — equation rendering, client-side only via `dynamic` import
- Framer Motion 13 — scroll reveal, transitions
- Tailwind CSS 3 — all styling

## Architecture

- `src/types/chapter.ts` — core interfaces; update here first, then all 7 chapters
- `src/lib/math.ts` — pure math functions, no side effects, no imports
- `src/chapters/` — one file per chapter, each exports a `ChapterConfig`
- `src/components/viz/` — one visualization component per chapter type
- `src/hooks/useChapterModel.ts` — single hook driving all interactive state
- Routing: hero landing + `/chapter/[slug]` pages for per-chapter direct linking
- OG images: static PNGs in `/public/og/` (dynamic OG deferred to v2)

## Build / Run

```bash
pnpm install --frozen-lockfile  # pnpm 11.5.2 per packageManager
pnpm dev        # local dev server
pnpm build      # static export (next build) to out/
pnpm test       # Vitest unit tests
pnpm typecheck  # TypeScript check
```

See [README.md](README.md#source-checks-and-local-preview) for the frozen install,
static preview, focused tests and local versus deployed browser checks.
See IMPLEMENTATION-ROADMAP.md for architecture details.

## Conventions

- TypeScript strict mode — use `unknown` + narrowing; zero `any`, zero `@ts-ignore`
- File naming: kebab-case files, PascalCase React components
- Conventional commits: `feat:`, `fix:`, `chore:`, `content:`
- Every math function in `src/lib/math.ts` must include an inline assertion for at least one known value

## Gotchas

- **D3/React boundary** — use `d3.select()` only on non-React-managed elements (canvas, non-React refs); React owns the DOM for all component-rendered elements
- **Static-only** — no `localStorage`, `sessionStorage`, `output: 'standalone'`, or server functions; full static export only
- **KaTeX SSR** — always import via `dynamic(() => import('./EquationOverlay'), { ssr: false })`; server-side rendering will break
- **Chapter interfaces** — changing `src/types/chapter.ts` requires updating all 7 chapter configs; do both in the same commit
- **Analytics** — `@vercel/analytics` is active (added 2026-05-11), privacy-respecting, no PII; Sentry is NOT enabled here (Premise only)
- **Scope gate** — implement only features present in the current phase of IMPLEMENTATION-ROADMAP.md
- **Dot grid** — uses Canvas (not SVG) for the dot grid visualization: 10,000 elements at 60fps require it

<!-- portfolio-context:start -->
# Portfolio Context

## What This Project Is

An interactive essay teaching Bayesian reasoning and probabilistic thinking through direct manipulation of live visualizations. Seven chapters, second-person immersive narrative, no login or download required. The landing page IS the product. Statically deployed to Vercel, MIT licensed, fully open source.

## Current State

**v1.0.0 — Complete**
All 7 chapters implemented and playable. See IMPLEMENTATION-ROADMAP.md for architecture details.

## Stack

- Next.js: 16 (App Router, `output: 'export'` — full static site)
- React: 19 (hooks only, no class components)
- TypeScript: 6 (strict mode, zero `any` types)
- D3: v7 — visualizations (math/scales only — React owns the DOM)
- KaTeX: 0.18 — equation rendering (client-side only via `dynamic` import)
- Framer Motion: 13 — scroll reveal, transitions
- Tailwind CSS: 3 (3.4 via the pnpm override) — all styling

## How To Run

```bash
pnpm install --frozen-lockfile   # pnpm 11.5.2 per packageManager
pnpm run typecheck
pnpm test
pnpm run build                   # static export to out/
```

These match CI (`.github/workflows/ci.yml`). `pnpm lint` is not a valid check: it calls `next lint`, which Next.js 16 removed.

## Known Risks

- Do not add features not in the current phase of IMPLEMENTATION-ROADMAP.md
- Do not use `d3.select()` on React-managed elements — D3 for math only; React owns the DOM
- Do not use `localStorage` or `sessionStorage` — this is a static site with no persistence
- Do not add `output: 'standalone'` or server functions — full static export only
- Do not change `src/types/chapter.ts` interfaces without updating all 7 chapter configs
- Do not render KaTeX server-side — always use `dynamic(() => import('./EquationOverlay'), { ssr: false })`
- ~~Do not add any tracking, analytics, or telemetry in v1~~ — superseded 2026-05-11: `@vercel/analytics` enabled portfolio-wide for deployed Vercel apps. Privacy-respecting, no PII. Sentry NOT enabled here; Premise only.

## Next Recommended Move

Use this context plus the README and supporting docs to resume the next active task, then promote the repo beyond minimum-viable by capturing a dedicated handoff, roadmap, or discovery artifact.

<!-- portfolio-context:end -->
