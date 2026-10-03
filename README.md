# Signal & Noise

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript)](#) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)

> Drag a slider. Update your prior. Watch Bayes' theorem stop being abstract.

Signal & Noise is an interactive essay teaching Bayesian reasoning and probabilistic thinking through seven chapters of live, manipulable visualizations. Second-person narrative. No login. No download. Every concept is something you feel before you calculate.

## Features

- **Seven chapters** — medical diagnostics, radio telescope detection, election modeling, Bayesian belief revision, financial noise, courtroom reasoning, and model convergence
- **Direct manipulation** — every visualization is a live control; drag priors, adjust thresholds, watch posterior distributions update in real time
- **KaTeX equations** — inline math renders client-side without a build step
- **Scroll animations** — Framer Motion reveal animations guide pacing through the narrative
- **Static export** — fully pre-renderable; no server required after `pnpm run build`

## Quick Start

### Prerequisites
- Node.js 22.13.0 or newer within 22.x (the CI line), or Node.js 24+
  (pnpm 11.5.2 and the locked ESLint toolchain require the 22.13 floor)
- pnpm 11.5.2, matching `packageManager` in `package.json`

### Source checks and local preview

Run from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm run typecheck
pnpm test
pnpm run build
```

These match [CI](.github/workflows/ci.yml). `pnpm test` runs Vitest unit tests;
for a focused mathematical change, use for example
`pnpm exec vitest run src/lib/math.test.ts`. There is no separate standalone
format check. Also run `pnpm lint` (or `make lint`) locally; it uses the Next.js
ESLint flat config and ignores generated build and test output.

Start the local development preview with `pnpm run dev --hostname 127.0.0.1`,
then open `http://127.0.0.1:3000`. Production builds export static files into
`out/`; serve that directory with a local static server or your existing hosting
preview. `pnpm start` invokes `next start` and cannot serve `output: 'export'`.
Do not use it as a static-export check.

For changes to chapter navigation, sliders, equations, visualization or responsive
layout, inspect the affected flow in a local browser at desktop and narrow widths.
A local Playwright smoke is also available:

```sh
pnpm exec playwright install chromium
pnpm exec playwright test --config playwright.local.config.ts
```

That config starts a loopback-only dev server and uses the local URL; keep port
3000 free. To inspect test discovery without starting a server or browser, use
`pnpm exec playwright test --config playwright.local.config.ts --list`.
The default `playwright.config.ts` targets the deployed Vercel site, so a bare
Playwright invocation is a **deployed-site** check requiring that separate scope.
These smoke specs cover landing/chapter/navigation only; sliders, equations and
responsive layout still need relevant browser checks. Local source checks are
separate from deployed behavior and human comprehension.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (static export) |
| Language | TypeScript 6, strict mode |
| Visualization | D3 v7 (math/scales; React owns DOM) |
| Math | KaTeX 0.18 |
| Animation | Framer Motion 13 |
| Styling | Tailwind CSS 3 |

## Architecture

Each chapter is a React Server Component with client islands for interactive visualizations. D3 handles only scales and mathematical transforms — React owns the SVG DOM, preventing the classic D3/React DOM conflict. All seven chapters are statically exported at build time, making the essay hostable on any CDN with zero runtime infrastructure.

## License

MIT