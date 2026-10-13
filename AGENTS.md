# Signal & Noise

## Purpose

A static, privacy-preserving interactive essay that teaches Bayesian reasoning through seven chapters of prose, direct-manipulation visualizations, client-rendered KaTeX equations, and motion pacing.

## Layout

- `src/chapters/` contains the seven chapter models and tests.
- `src/components/chapter/` contains narrative, controls, and equation UI.
- `src/components/viz/` contains chapter visualizations.
- `src/lib/` contains pure math and visualization helpers.
- `public/` contains static assets, including the shared Open Graph image.
- `.github/workflows/ci.yml` runs the repository check target.

## Setup

- Use the Node version in `.node-version` and the pnpm version in `package.json`.
- Install with `pnpm install --frozen-lockfile`.
- Run `pnpm dev` for local development and `pnpm start` to serve the static `out/` export after building.

## Checks

- `pnpm lint`
- `pnpm format:check`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `make check` runs all required checks in sequence.
- Playwright smoke specs are separate from `make check` and the default config targets the deployed site.

## Boundaries

- Keep the site fully static; do not add server functions, standalone output, browser persistence, or additional telemetry.
- `@vercel/analytics` is enabled and privacy-preserving; do not add tracking without an explicit request.
- Use D3 for math, scales, and path generation only. React owns the DOM.
- Render KaTeX only in the client-side dynamically imported equation overlay.
- Changing the chapter interfaces requires updating all seven chapter configs and their tests.
- Preserve the existing static export behavior and keep math explanations aligned with the implemented models.

## Delivery

- Keep changes scoped to the requested task and preserve unrelated work.
- Run the relevant checks and report their actual results.
- Do not publish, deploy, tag, or change release history unless the task explicitly authorizes it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
