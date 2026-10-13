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
make check
```

These match [CI](.github/workflows/ci.yml). `make check` runs lint, formatting,
typecheck, Vitest unit tests, and the static build. For a focused mathematical
change, use for example `pnpm exec vitest run src/lib/math.test.ts`.

Start the local development preview with `pnpm run dev --hostname 127.0.0.1`,
then open `http://127.0.0.1:3000`. Production builds export static files into
`out/`; after building, run `pnpm start` to preview those files with the bundled
static server.

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

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| Framework     | Next.js 16 (static export)          |
| Language      | TypeScript 6, strict mode           |
| Visualization | D3 v7 (math/scales; React owns DOM) |
| Math          | KaTeX 0.18                          |
| Animation     | Framer Motion 13                    |
| Styling       | Tailwind CSS 3                      |

## Status

### Stack

The project exports a static Next.js site using Node.js 24, pnpm 11, React, TypeScript, Tailwind CSS 3.4, and client-rendered KaTeX. The seven chapters use local hypothetical inputs and deterministic visualizations.

### Known risks

- The hosting Content Security Policy has not been verified.
- The shared Open Graph image is present locally, but hosted metadata and image delivery have not been verified.
- Mobile performance targets have not been measured in a browser profile.

### Next steps

- Verify the deployed Content Security Policy and Open Graph image delivery.
- Measure visualization performance on desktop and mobile browsers.
- Review chapter usability with readers.

## Architecture

Each chapter is a React Server Component with client islands for interactive visualizations. D3 handles only scales and mathematical transforms — React owns the SVG DOM, preventing the classic D3/React DOM conflict. All seven chapters are statically exported at build time, making the essay hostable on any CDN with zero runtime infrastructure.

## License

MIT
