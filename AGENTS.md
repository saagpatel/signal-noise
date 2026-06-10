# Signal & Noise

<!-- comm-contract:start -->

## Communication Contract

- Inherit global Codex communication and reporting rules from `/Users/d/.codex/AGENTS.override.md` and `/Users/d/.codex/policies/communication/BigPictureReportingV1.md`.
- Repo-specific instructions below add project constraints only; do not restate global voice or status-reporting rules here.
<!-- comm-contract:end -->

## Communication Contract

- Follow `/Users/d/.codex/policies/communication/BigPictureReportingV1.md` for user-facing updates.
- Keep ordinary in-flight updates conversational, warm, PM-readable, operator-grade, and low-noise.
- Keep technical details in internal artifacts unless explicitly requested by the user or required by failure, risk, or verification.

## Project Goal

Signal & Noise is a static interactive essay teaching Bayesian reasoning through direct-manipulation visualizations, KaTeX equations, and Framer Motion pacing. Keep it static, privacy-preserving, and mathematically clear.

## First Read

- `README.md` for product scope and local commands.
- `CLAUDE.md` for portfolio context, phase constraints, and project rules.
- `IMPLEMENTATION-ROADMAP.md` before changing scope or version claims.
- `src/types/chapter.ts`, `src/lib/math.ts`, `src/chapters/`, `src/components/viz/`, and `src/hooks/useChapterModel.ts` before changing chapter logic or visualizations.

## Core Rules

- Keep the site fully static; do not add server functions or standalone output.
- Do not add tracking, analytics, telemetry, or persistence unless explicitly requested.
- Use D3 for math/scales only; React owns DOM rendering.
- Do not render KaTeX server-side.
- Do not change chapter interfaces without updating all seven chapter configs.

## Codex App Usage

- Use Codex App Projects for repo-local implementation, review, and verification.
- Use a Worktree for chapter-interface changes, math-model changes, visualization refactors, dependency upgrades, or static export behavior.
- Use browser or Playwright evidence for chapter navigation, sliders, visualizations, equations, scroll behavior, and responsive layout.
- Use artifacts for teaching notes, QA summaries, release packets, and handoff summaries.
- Keep connectors read-first and task-scoped. Do not use external data unless explicitly requested.

## Verification

- Use `.codex/verify.commands` as the canonical verifier for routine Codex work.
- Current canonical verifier:
  - `npm ci`
  - `npm test`
  - `npm run typecheck`
  - `npm run build`
- Current caveat: `npm test` runs unit tests only; Playwright smoke specs live under `e2e/` and should be run with Playwright when browser behavior changes.
- Current caveat: `next build` passes but emits existing `metadataBase` warnings for social image URL resolution.
- Add browser or Playwright checks for interactive essay behavior changes.

## Done Criteria

- The requested change is implemented.
- Relevant checks were run, or the exact reason they were not run is stated.
- Math/content changes include sample-value or visual verification.
- UI/visualization changes include browser or Playwright evidence.
- Assumptions, risks, and next steps are summarized before closeout.
