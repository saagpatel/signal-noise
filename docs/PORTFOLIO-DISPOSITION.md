# Signal & Noise — Portfolio Disposition

**Status:** Release Frozen (static-host, static SPA) — Next.js +
TypeScript + D3 + KaTeX + Framer Motion **interactive Bayesian
reasoning essay** with 7 chapters of live manipulable
visualizations on `origin/main`. Includes **Playwright E2E
smoke tests**, trailingSlash for clean chapter URLs on Vercel,
static-export Vercel deploy config + vercel.json. **Seventh
static-host cluster member**; fourth static-SPA sub-shape member
(joins HowMoneyMoves + Neural Network Playground + OrbitMechanic).
**Shares the Playwright E2E pattern with Premise** — production
canary-style smoke tests as part of release confidence.

> Disposition uses strict `origin/main` verification.
> **Playwright E2E pattern shared with Premise** — first
> recurrence of this pattern in static-host cluster.

---

## Verification posture

Only `origin` (`saagpatel/SignalAndNoise`). Clean migration state.

`origin/main`:

- Tip: `75c0ea8` feat: add Playwright E2E smoke tests
- Production-readiness cadence:
  - `75c0ea8` **feat: add Playwright E2E smoke tests** (same
    pattern as Premise R11)
  - `d1259ae` fix: add trailingSlash for clean chapter URLs on
    Vercel
  - `dd13373` chore: set framework null for static export on Vercel
  - `8755461` chore: update LICENSE copyright
  - `a8acfec` chore(deploy): add vercel.json and update lockfile
  - `33d83c2` chore: add initial CHANGELOG
- Full OSS scaffolding wave
- Default branch: `main`

---

## Current state in one paragraph

Signal & Noise is an interactive essay teaching Bayesian reasoning
and probabilistic thinking through **seven chapters of live,
manipulable visualizations** — medical diagnostics, radio
telescope detection, election modeling, Bayesian belief revision,
financial noise, courtroom reasoning, model convergence.
Second-person narrative. Every visualization is a **live control**
(drag priors, adjust thresholds, watch posterior distributions
update in real time). **KaTeX** renders math equations client-side
without a build step. **Framer Motion** scroll animations guide
pacing. **Fully pre-renderable** — no server required after
`npm run build`. Per memory: v1.0 with 7 chapters deploy-ready.
The release commits confirm: Playwright E2E smoke tests (Premise-
style canary), trailingSlash for chapter URL hygiene, Vercel
static-export config — production-readiness cadence is complete.

---

## Why "Release Frozen (static-host, static SPA + Playwright E2E)" — seventh cluster member

Static SPA sub-shape with **Playwright E2E pattern shared with
Premise**:

| Member | Sub-shape | Playwright E2E |
|---|---|---|
| PomGambler | PWA | n/a |
| HowMoneyMoves | Static SPA | n/a |
| Premise | SSR + Supabase | ✓ (`2cdfdf6`) — targets deployed Vercel URL |
| Devil's Advocate | Next.js + SQLite | Vitest only |
| Neural Network Playground | Static SPA + TF.js | n/a |
| OrbitMechanic | Static SPA + physics | n/a |
| **Signal & Noise** | **Static SPA + KaTeX + Framer** | **✓ (`75c0ea8`)** |

**Playwright E2E recurrence**: Premise founded the pattern;
Signal & Noise is the second cluster member to adopt it. Worth
recognizing as a static-host cluster maturity signal — the
operator is investing in production canary tests for web apps,
not just relying on `npm run build` succeeding.

---

## Cluster taxonomy update

| Cluster | Count | Sub-shapes |
|---|---|---|
| **Static-host (web)** | **7** | PWA / static SPA (4: HowMoneyMoves + NN + OrbitMechanic + Signal & Noise) / SSR+Supabase / Next.js+SQLite |
| (others unchanged) | | |

Static SPA sub-shape now has **4 members across 4 distinct compute
models**: pure presentation / client ML / physics simulation /
interactive math + scroll narrative. Static-SPA sub-shape is fully
populated.

---

## Unblock trigger (operator)

Production-deployable (Vercel config in place + trailingSlash for
chapter URLs). Operational concerns:

1. **Vercel deploy URL** — verify deployed instance live.
2. **Run Playwright E2E against deployed URL** before announcing
   (`75c0ea8` brought the harness; verify it actually runs against
   production).
3. **KaTeX bundle size** — KaTeX adds ~280 KB compressed; verify
   bundle analysis for initial-load JS budget on slow connections.
4. **Mobile UX for D3 interactive controls** — sliders + drag
   gestures need touch event handling; verify per chapter.
5. **Reading flow analytics (optional)** — interactive essays
   benefit from scroll-depth + chapter-completion tracking; if
   operator wants this, decide on a privacy-respecting analytics
   approach (none currently per "no login. no download." framing).
6. **Continued accessibility** — narrative-driven visualizations
   benefit from screen-reader-friendly captions for D3 charts.

Estimated operator time to deploy: ~1-2 hours including E2E
verification.

---

## Portfolio operating system instructions

| Aspect | Posture |
|---|---|
| Portfolio status | `Release Frozen (static-host, static SPA + Playwright E2E)` |
| Distribution channel | **Vercel** (config in place) |
| Review cadence | Suspend overdue counting |
| Resurface conditions | (a) Vercel deploy verification, (b) Playwright E2E results on production URL, (c) KaTeX or D3 dep update, (d) v1.1 (more chapters?) |
| Co-batch with | Static-host cluster — **now 7 repos** |
| Sub-shape | **Static SPA + interactive math + scroll narrative + Playwright E2E** |
| Special concern | **Playwright E2E recurrence** — second cluster member after Premise. Worth recognizing as cluster maturity signal. |
| Special concern | **KaTeX bundle size** for initial load. |
| Special concern | **Mobile touch UX** for D3 interactive controls. |
| Special concern | **Accessibility for D3 visualizations** (screen-reader captions). |

---

## Reactivation procedure

1. Verify branch tracking.
2. Review stash `r16-sn-stash` (untracked `.claude/` only).
3. Run Playwright E2E suite locally to confirm.
4. Run `npm run build` + verify static export.
5. Verify trailingSlash on Vercel deployment.
6. Spot-check 1-2 chapters for D3 / KaTeX rendering regressions.

---

## Last known reference

| Field | Value |
|---|---|
| `origin/main` tip | `75c0ea8` feat: add Playwright E2E smoke tests |
| Default branch | `main` |
| Build system | TypeScript + Next.js + D3 + KaTeX + Framer Motion + Vercel static export + Playwright |
| Chapters | **7** (medical diagnostics, radio telescope, elections, Bayesian belief, financial noise, courtroom, model convergence) |
| Distinguishing tech | **Interactive Bayesian essay** + **KaTeX client-side math** + **Framer Motion scroll narrative** + **Playwright E2E (Premise-style canary)** |
| Migration state | No `legacy-origin` remote |
| Distinguishing feature | **Seventh static-host cluster member; fourth static-SPA sub-shape member. Second cluster member with Playwright E2E pattern** (after Premise). |
