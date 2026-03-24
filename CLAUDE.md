# Signal & Noise

## Overview

An interactive essay teaching Bayesian reasoning and probabilistic thinking through direct manipulation of live visualizations. Seven chapters, second-person immersive narrative, no login or download required. The landing page IS the product. Statically deployed to Vercel, MIT licensed, fully open source.

## Tech Stack

- Next.js: 14 (App Router, `output: 'export'` — full static site)
- React: 18 (hooks only, no class components)
- TypeScript: 5 (strict mode, zero `any` types)
- D3: v7 — visualizations (math/scales only — React owns the DOM)
- KaTeX: 0.16 — equation rendering (client-side only via `dynamic` import)
- Framer Motion: 11 — scroll reveal, transitions
- Tailwind CSS: 3 — all styling

## Project Structure

- `src/types/chapter.ts` — Core interfaces. Define here first, never change without updating all 7 chapters.
- `src/lib/math.ts` — Pure math functions only. No side effects, no imports.
- `src/chapters/` — One file per chapter. Each exports a `ChapterConfig`.
- `src/components/viz/` — One visualization component per chapter type.
- `src/hooks/useChapterModel.ts` — The single hook that drives all interactive state.

## Development Conventions

- TypeScript strict mode — zero `any` types, zero `@ts-ignore`
- kebab-case for files, PascalCase for React components
- D3 used for math and scales only — never `d3.select()` on React-managed DOM elements
- Conventional commits: `feat:`, `fix:`, `chore:`, `content:`
- Every math function in `math.ts` must have an inline assertion for at least one known value

## Current Phase

**v1.0.0 — Complete**
All 7 chapters implemented and playable. See IMPLEMENTATION-ROADMAP.md for architecture details.

## Key Decisions

| Decision  | Choice                                         | Why                                                  |
| --------- | ---------------------------------------------- | ---------------------------------------------------- |
| Routing   | Hero landing + `/chapter/[slug]` pages         | Per-chapter direct linking + narrative arc           |
| Rendering | D3 for math/scales, React owns DOM             | Avoid D3/React reconciliation conflicts              |
| Dot grid  | Canvas (not SVG)                               | 10,000 elements at 60fps — SVG can't do it           |
| Equations | KaTeX, client-side only                        | SSG-compatible; `dynamic(() => ..., { ssr: false })` |
| State     | `useChapterModel` hook, no cross-chapter state | Each chapter self-contained in v1                    |
| Analytics | None (v1)                                      | Add Vercel Analytics in v2 with one line             |
| OG images | Static PNGs in `/public/og/`                   | Dynamic OG deferred to v2                            |

## Do NOT

- Do not add features not in the current phase of IMPLEMENTATION-ROADMAP.md
- Do not use `d3.select()` on React-managed elements — D3 for math only; React owns the DOM
- Do not use `localStorage` or `sessionStorage` — this is a static site with no persistence
- Do not add `output: 'standalone'` or server functions — full static export only
- Do not change `src/types/chapter.ts` interfaces without updating all 7 chapter configs
- Do not render KaTeX server-side — always use `dynamic(() => import('./EquationOverlay'), { ssr: false })`
- Do not add any tracking, analytics, or telemetry in v1
