# Signal & Noise — Implementation Roadmap

## 1. Exec Summary

### What We're Building
Signal & Noise is a static interactive essay built with Next.js 14 (App Router) and deployed to Vercel. The landing page is a hero + chapter picker. Each chapter lives at `/chapter/[slug]` and delivers a second-person, immersive narrative paired with D3-powered interactive visualizations that update in real-time as the reader manipulates sliders and controls. Seven chapters (The Test, The Signal, The Forecast, The Update, The Market, The Evidence, The Convergence) teach Bayesian reasoning and probabilistic thinking through direct manipulation — no signup, no download. The whole site is statically generated at build time, fully open source under MIT.

### Riskiest Parts

**RISK 1 — HIGH: The Convergence chapter's cross-chapter parameter interface**
Every chapter's interactive model must expose a shared `ChapterModel` interface (base rate, sensitivity, threshold, etc.) from day one, or Ch.7 will require rewriting all six previous chapters. This is the #1 architectural decision and must be designed in Phase 0 even though Ch.7 is the last chapter built.
- Mitigation: Define `ChapterModel` interface and a `useChapterModel` hook contract in `/src/types/chapter.ts` before writing a single visualization. Every chapter is just an implementation of this interface.
- Fallback: If the unified interface proves too constraining, Ch.7 becomes a curated side-by-side comparison rather than a live parameter bridge — still compelling, less technically complex.

**RISK 2 — HIGH: D3 + React reconciliation conflicts**
D3 wants to own the DOM; React wants to own the DOM. Using D3 for everything means managing this boundary carefully. The naive approach (D3 inside useEffect) leaks event listeners and produces stale closure bugs.
- Mitigation: Use D3 exclusively for math/scales/path generation. React owns all DOM elements. Pattern: `const xScale = d3.scaleLinear()...` in the component, SVG elements as JSX, D3 used only for calculations. No `d3.select()` on React-managed elements.
- Fallback: If a specific visualization is too complex for this pattern (e.g., force simulation), isolate it in a `ref`-attached Canvas element with D3 owning that canvas only.

**RISK 3 — MEDIUM: 60fps slider-driven re-renders with 10,000-dot grids**
Updating 10,000 SVG elements on every slider tick will drop frames on any device. D3 + SVG is not Canvas, and SVG has real per-element overhead.
- Mitigation: Dot grid renders to Canvas (one element, pixel-drawn), not SVG. Everything else (probability curves, histograms) uses SVG+D3 as planned. The dot grid is the one exception to D3-for-everything — it's a Canvas draw call wrapped in a React ref. Target: <16ms per frame (60fps) on M-series Mac; ≥30fps on mid-range mobile via tiered dot count (10k desktop, 2.5k mobile).
- Fallback: Virtualize the dot grid with a spatial hash — only redraw dots whose color changes per parameter update rather than all 10,000.

**RISK 4 — MEDIUM: Equation overlay sync with D3 parameters**
KaTeX-rendered equations must highlight specific terms in sync with the active slider. This requires a data structure mapping each slider's `parameterId` to one or more LaTeX `\class{active}{...}` spans. Getting this wrong makes the equation overlay feel broken.
- Mitigation: Define `EquationTerm` interface per chapter in Phase 0. Each chapter exports its own term map. KaTeX renders with `trust: true` and custom macros for highlighting. Test with static state before wiring to sliders.
- Fallback: Equation overlay shows the full equation without per-term highlighting — still useful, just less magical.

**RISK 5 — LOW: Mobile touch conflicts (scroll vs. slider drag)**
Horizontal sliders on a vertically scrolling page will capture scroll events on mobile if not handled correctly.
- Mitigation: Use `touch-action: pan-y` on the page, `touch-action: none` on slider tracks. Implement sliders with Pointer Events API (not mouse/touch separately). Min slider track height: 44px.

### Shortest Path to Daily Personal Use
- **Phase 0 (Week 1):** Scaffolded Next.js project, `ChapterModel` interface defined, routing wired, hero page and chapter picker shell live on Vercel. Zero chapters playable. Solves 0% of the user pain but de-risks the hardest architectural decision.
- **Phase 1 (Week 2–3):** Chapter 1 (The Test) fully playable with dot grid, sliders, live annotation, and equation overlay toggle. Solves 100% for a single-chapter MVP you can share.
- **Phase 2 (Weeks 4–5):** Chapters 2 (Signal) and 3 (Forecast) complete. The site now has a narrative arc — readers finish Ch.1, continue.
- **Phase 3 (Weeks 6–7):** Chapters 4 (Update), 5 (Market), 6 (Evidence) complete. Six of seven chapters live. Site is shareable as a full product.
- **Phase 4 (Week 8–9):** Chapter 7 (The Convergence) complete. Full v1 shipped. Polish pass, static OG images, performance audit, README and open source launch.

---

## 2. Review Gate (Spec Lock)

**Goal:** Ship a seven-chapter interactive essay on probabilistic reasoning that loads in <3 seconds, runs at ≥30fps on mid-range mobile, and requires no login or download.

**Success Metrics:**
1. All 7 chapters complete and playable — sliders update visualizations in <16ms on desktop (Chrome DevTools frame budget)
2. Lighthouse performance score ≥90 on mobile emulation
3. Full site statically generated — `next build` produces zero server-side runtime dependencies
4. Equation overlay toggle works in all 7 chapters — correct term highlights in sync with active slider
5. `npm run build` passes with zero TypeScript errors and zero ESLint warnings

**Hard Constraints:**
- No backend, no database, no auth, no user accounts — pure static site
- No analytics (v1)
- No dynamic OG images (v1) — static per-chapter OG images only
- MIT license, public GitHub repo from day one
- All interactive elements must be operable on touch devices (44px minimum touch targets)
- D3 for all visualizations except the dot grid (Canvas)

**Locked Decisions:**

| Decision | Locked To | Rationale |
|----------|-----------|-----------|
| Routing | Hybrid: hero landing + `/chapter/[slug]` pages | Narrative arc per chapter + direct linking + SEO |
| Narrative voice | Second-person immersive ("You are a doctor...") | Maximum reader immersion, doc's recommendation |
| License | MIT, public repo day one | Credibility, reach, aligns with open-source philosophy |
| Chapter count (v1) | All 7 | No reason to defer — Ch.7's interface must be designed upfront anyway |
| Rendering | D3 for all viz except dot grid (Canvas) | Simpler mental model; Canvas for dot grid only (performance) |
| Social sharing | Static OG images per chapter (defer dynamic) | Saves significant Vercel Edge complexity for v1 |
| Analytics | None (v1) | Simplicity; add Vercel Analytics in v2 with one line |
| Equation rendering | KaTeX via `katex` npm package, not CDN | SSG-friendly, no runtime fetch, consistent rendering |
| Scroll behavior | `IntersectionObserver` for scroll-triggered chapter section animations on landing; full navigation on chapter pages | Keeps landing page alive without fighting per-chapter scroll |
| State persistence | None — each chapter is self-contained | Cross-chapter state deferred to v2 |

---

## 3. Architecture

### System Diagram
```
Browser
  └── Next.js 14 (App Router, Static Export)
        ├── / (Landing: Hero + Chapter Picker)
        │     └── IntersectionObserver → scroll-triggered chapter cards
        ├── /chapter/[slug] (Per-Chapter Interactive Essay)
        │     ├── Narrative prose (MDX or JSX)
        │     ├── InteractiveWidget (D3 + React)
        │     │     ├── SliderPanel → parameter state
        │     │     ├── Visualization (SVG/D3 or Canvas)
        │     │     ├── LiveAnnotation (text updates per state)
        │     │     └── EquationOverlay (KaTeX + term highlighting)
        │     └── ChapterNav (prev/next + back to picker)
        └── Vercel (static deploy, no server functions in v1)
```

### File Structure
```
signal-noise/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout — fonts, metadata, global styles
│   │   ├── page.tsx                    # Landing: Hero + ChapterPicker
│   │   ├── chapter/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Chapter page — loads chapter config by slug
│   │   └── globals.css
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Hero.tsx                # Opening hook + CTA
│   │   │   └── ChapterPicker.tsx       # 7-chapter grid with descriptions
│   │   ├── chapter/
│   │   │   ├── ChapterShell.tsx        # Layout: prose + widget side-by-side or stacked
│   │   │   ├── ChapterNav.tsx          # Prev/next chapter navigation
│   │   │   ├── NarrativeBlock.tsx      # Prose section with scroll reveal
│   │   │   ├── InteractiveWidget.tsx   # Orchestrates slider + viz + annotation + equation
│   │   │   ├── SliderPanel.tsx         # Parameter controls (generic, config-driven)
│   │   │   ├── LiveAnnotation.tsx      # Text that updates per parameter state
│   │   │   └── EquationOverlay.tsx     # KaTeX equation with active term highlighting
│   │   ├── viz/
│   │   │   ├── DotGrid.tsx             # Canvas-based dot grid (Ch.1 — the exception)
│   │   │   ├── WaterfallDisplay.tsx    # D3 waterfall for Ch.2 (radio signal)
│   │   │   ├── DistributionCurve.tsx   # D3 normal distribution for Ch.3, Ch.5
│   │   │   ├── BeliefMeter.tsx         # D3 animated probability bar for Ch.4
│   │   │   ├── EvidenceTree.tsx        # D3 tree/network for Ch.6
│   │   │   └── ConvergencePanel.tsx    # Ch.7 — cross-chapter parameter bridge
│   │   └── ui/
│   │       ├── Slider.tsx              # Touch-safe slider (Pointer Events API)
│   │       └── Toggle.tsx              # Equation overlay toggle
│   ├── chapters/                       # Chapter config + content (one file per chapter)
│   │   ├── index.ts                    # Chapter registry — slug → config
│   │   ├── the-test.ts                 # Ch.1 config (model, sliders, equation terms, prose)
│   │   ├── the-signal.ts               # Ch.2
│   │   ├── the-forecast.ts             # Ch.3
│   │   ├── the-update.ts               # Ch.4
│   │   ├── the-market.ts               # Ch.5
│   │   ├── the-evidence.ts             # Ch.6
│   │   └── the-convergence.ts          # Ch.7
│   ├── hooks/
│   │   ├── useChapterModel.ts          # Core hook — manages parameter state + derived values
│   │   ├── useD3.ts                    # D3 + React bridge — calls render fn on state change
│   │   └── useIntersectionReveal.ts    # Scroll-triggered reveal for narrative blocks
│   ├── lib/
│   │   ├── math.ts                     # Pure math functions (Bayes, normal dist, etc.)
│   │   └── equation-terms.ts           # KaTeX term highlight utilities
│   └── types/
│       └── chapter.ts                  # All shared interfaces (ChapterModel, SliderDef, etc.)
├── public/
│   ├── og/                             # Static OG images per chapter (1200x630)
│   └── favicon.svg
├── .github/
│   └── workflows/
│       └── ci.yml                      # Build + type-check on every PR
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── CLAUDE.md
└── README.md
```

### Core Type Definitions

```typescript
// src/types/chapter.ts

// Every chapter's interactive model implements this interface.
// Ch.7 depends on this — define it in Phase 0, never change it.
export interface ChapterModel {
  // Current parameter values (keyed by parameterId)
  params: Record<string, number>;
  // Derived computed values from params (what the viz and annotation read)
  derived: Record<string, number>;
}

// A single slider control
export interface SliderDef {
  id: string;               // Must match a key in ChapterModel.params
  label: string;            // e.g., "Base Rate"
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;            // e.g., "%" — displayed after value
  description?: string;     // Tooltip on hover
}

// A term in the equation overlay
export interface EquationTerm {
  id: string;               // Must match a SliderDef.id
  latexClass: string;       // CSS class applied to this term's KaTeX span when active
}

// Full chapter configuration
export interface ChapterConfig {
  slug: string;             // URL slug — e.g., "the-test"
  number: number;           // 1–7
  title: string;            // e.g., "The Test"
  subtitle: string;         // e.g., "Medical Diagnostics"
  hook: string;             // 1–2 sentence teaser for the chapter picker card
  sliders: SliderDef[];
  equationLatex: string;    // Full KaTeX string for the equation overlay
  equationTerms: EquationTerm[];
  // compute() is called on every slider change — returns the full ChapterModel
  compute: (params: Record<string, number>) => ChapterModel;
  // annotation() returns the live text shown below the visualization
  annotation: (model: ChapterModel) => string;
}

// Chapter registry type
export type ChapterRegistry = Record<string, ChapterConfig>;
```

```typescript
// Example: Chapter 1 compute function (drives all Ch.1 derived values)
// src/chapters/the-test.ts (excerpt)

export function computeTheTest(params: Record<string, number>): ChapterModel {
  const { baseRate, sensitivity, specificity } = params;
  // P(Disease | Positive) = (sensitivity × baseRate) /
  //   (sensitivity × baseRate + (1 - specificity) × (1 - baseRate))
  const truePositiveRate = sensitivity * baseRate;
  const falsePositiveRate = (1 - specificity) * (1 - baseRate);
  const ppv = truePositiveRate / (truePositiveRate + falsePositiveRate); // Positive Predictive Value
  const fpr = falsePositiveRate / (truePositiveRate + falsePositiveRate);
  return {
    params,
    derived: { ppv, fpr, truePositiveRate, falsePositiveRate },
  };
}
```

```typescript
// src/hooks/useChapterModel.ts
import { useState, useMemo } from 'react';
import type { ChapterConfig, ChapterModel } from '@/types/chapter';

export function useChapterModel(config: ChapterConfig) {
  const defaultParams = Object.fromEntries(
    config.sliders.map((s) => [s.id, s.defaultValue])
  );
  const [params, setParams] = useState<Record<string, number>>(defaultParams);

  const model: ChapterModel = useMemo(
    () => config.compute(params),
    [params, config]
  );

  const setParam = (id: string, value: number) =>
    setParams((prev) => ({ ...prev, [id]: value }));

  const annotation = useMemo(
    () => config.annotation(model),
    [model, config]
  );

  return { model, params, setParam, annotation };
}
```

```typescript
// src/hooks/useD3.ts
// Pattern: D3 for math only. React owns the DOM.
// This hook calls a render function whenever deps change.
import { useEffect, useRef } from 'react';
import type { Selection } from 'd3';

type RenderFn<T> = (svg: Selection<SVGSVGElement, unknown, null, undefined>, dims: { width: number; height: number }) => void;

export function useD3<T>(
  renderFn: RenderFn<T>,
  deps: unknown[]
): React.RefObject<SVGSVGElement> {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    const { width, height } = ref.current.getBoundingClientRect();
    renderFn(svg, { width, height });
    // No d3.select() on React-managed children — only on the root SVG ref
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}
```

### Math Functions

```typescript
// src/lib/math.ts

/** Bayesian posterior — P(H|E) */
export function bayesUpdate(prior: number, likelihood: number, marginal: number): number {
  return (likelihood * prior) / marginal;
}

/** Positive Predictive Value given base rate, sensitivity, specificity */
export function ppv(baseRate: number, sensitivity: number, specificity: number): number {
  const tp = sensitivity * baseRate;
  const fp = (1 - specificity) * (1 - baseRate);
  return tp / (tp + fp);
}

/** Normal distribution PDF */
export function normalPDF(x: number, mean: number, std: number): number {
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / std) ** 2);
}

/** Normal distribution CDF (approximation via error function) */
export function normalCDF(x: number, mean: number, std: number): number {
  return 0.5 * (1 + erf((x - mean) / (std * Math.sqrt(2))));
}

function erf(x: number): number {
  // Abramowitz & Stegun approximation — accurate to 1.5e-7
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const result = 1 - poly * Math.exp(-x * x);
  return x >= 0 ? result : -result;
}

/** Signal-to-noise ratio helpers for Ch.2 */
export function snr(signalPower: number, noisePower: number): number {
  return signalPower / noisePower;
}

/** False alarm rate for a detection threshold */
export function falseAlarmRate(threshold: number, noiseStd: number): number {
  return 1 - normalCDF(threshold, 0, noiseStd);
}

/** Detection probability for a given threshold and signal strength */
export function detectionProbability(threshold: number, signalStrength: number, noiseStd: number): number {
  return 1 - normalCDF(threshold, signalStrength, noiseStd);
}
```

### Dependencies

```bash
# Core
npm install next@14 react@18 react-dom@18 typescript@5

# D3 (visualization)
npm install d3@7
npm install -D @types/d3

# Equation rendering
npm install katex@0.16
npm install -D @types/katex

# Animation (scroll reveal, transitions)
npm install framer-motion@11

# Styling
npm install tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

# Fonts (via next/font — no separate install)
# Using: Inter (body), JetBrains Mono (code/equations overlay)

# Dev tooling
npm install -D eslint eslint-config-next prettier

# Type-checking CI
npm install -D tsx  # For running .ts scripts if needed
```

```bash
# next.config.ts additions
# output: 'export'  — full static export for Vercel
# images: { unoptimized: true }  — required for static export
```

---

## 4. Phased Implementation

---

### Phase 0: Foundation (Week 1)

**Objective:** Scaffolded Next.js project with `ChapterModel` interface locked, routing wired, hero + chapter picker shell live on Vercel. Zero chapters playable but every future chapter knows exactly what interface to implement.

**Tasks:**
1. Scaffold Next.js 14 with App Router, TypeScript strict mode, Tailwind — **Acceptance:** `npm run dev` serves `localhost:3000` with no errors; `npm run build` succeeds.
2. Define all types in `src/types/chapter.ts` — `ChapterModel`, `SliderDef`, `EquationTerm`, `ChapterConfig`, `ChapterRegistry` — **Acceptance:** Zero TypeScript errors. These types must not change after Phase 0 without updating all 7 chapter configs.
3. Implement `src/lib/math.ts` with all pure math functions (Bayes, PPV, normalPDF, normalCDF, erf, SNR, FAR, detectionProbability) — **Acceptance:** Write inline test assertions (`console.assert`) for known values: `ppv(0.01, 0.95, 0.95)` ≈ 0.161; `normalCDF(0, 0, 1)` ≈ 0.5.
4. Scaffold chapter registry in `src/chapters/index.ts` with all 7 slug entries — chapters point to placeholder configs with correct slugs and titles — **Acceptance:** `Object.keys(registry)` returns all 7 slugs.
5. Build `useChapterModel` hook with full implementation — **Acceptance:** Unit-tested with a mock chapter config in isolation; setParam updates trigger model recompute.
6. Build landing page (`/`) with Hero component + ChapterPicker grid (7 cards, each with slug link, title, subtitle, hook text) — **Acceptance:** All 7 chapter cards visible at `localhost:3000`; clicking a card navigates to `/chapter/[slug]` (returns 404 until chapters are built — that's fine).
7. Build chapter shell (`/chapter/[slug]/page.tsx`) that reads slug, loads config from registry, and renders `ChapterShell` with placeholder content — **Acceptance:** `/chapter/the-test` loads without error; shows chapter title from registry.
8. Build generic `Slider.tsx` component using Pointer Events API with `touch-action: none` on the track — **Acceptance:** Renders correctly, dragging on desktop works, slider fires `onValueChange` callback.
9. Set up GitHub repo (public, MIT license, README with project description) + Vercel project linked to repo — **Acceptance:** Push to `main` triggers Vercel deploy; site live at `[project].vercel.app`.
10. Set up CI: `.github/workflows/ci.yml` runs `npm run build` and `npx tsc --noEmit` on every PR — **Acceptance:** Workflow runs and passes on first push.

**Verification Checklist:**
- [ ] `npm run build` → exits 0, no errors
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] `localhost:3000` → landing page with 7 chapter cards
- [ ] `localhost:3000/chapter/the-test` → chapter shell with "The Test" title
- [ ] `git push origin main` → Vercel deploy succeeds, live URL accessible
- [ ] GitHub repo is public, MIT license file present

**Risks:**
- Next.js 14 App Router + `output: 'export'` has quirks with dynamic routes → Mitigation: Test static export in Phase 0 before any chapter content exists. Fallback: Use `generateStaticParams()` to enumerate all 7 slugs.

---

### Phase 1: Chapter 1 — The Test (Weeks 2–3)

**Objective:** A fully playable Chapter 1 with dot grid, three sliders (base rate, sensitivity, specificity), live annotation, and equation overlay. The canonical chapter — all subsequent chapters follow this exact pattern.

**Chapter 1 Spec:**
- Sliders: `baseRate` (0.1%–10%, default 1%, step 0.1%), `sensitivity` (50%–99.9%, default 95%, step 0.1%), `specificity` (50%–99.9%, default 95%, step 0.1%)
- Derived: `ppv` (positive predictive value), `fpr` (false positive rate per positive test)
- Visualization: 10×100 dot grid (Canvas) — 10,000 dots. Color coding: true positive = red, false positive = orange, true negative = gray, false negative = dark red. Dots update color every frame as sliders change.
- Live annotation example: "Of 10,000 people tested, **{{truePositives}}** actually have the disease. But **{{falsePositives}}** don't — and they also tested positive. Your test is {{sensitivity}}% accurate. The real question is: what fraction of positive results are true? Answer: **{{ppv_pct}}%**."
- Equation: Bayes' theorem in PPV form. Active term: dragging `baseRate` highlights P(D) in the equation; dragging `sensitivity` highlights P(+|D); dragging `specificity` highlights P(+|¬D).

**Tasks:**
1. Implement `src/chapters/the-test.ts` with full `ChapterConfig` — sliders, compute function, annotation function, equation LaTeX, equation term map — **Acceptance:** `computeTheTest({ baseRate: 0.01, sensitivity: 0.95, specificity: 0.95 }).derived.ppv` ≈ 0.161.
2. Build `DotGrid.tsx` Canvas component — accepts `model: ChapterModel` as prop, draws 10,000 colored dots (2,500 on mobile via `navigator.maxTouchPoints > 0`), re-renders on model change using `requestAnimationFrame` — **Acceptance:** Dot colors update visibly within 1 frame of slider change; Chrome DevTools shows frame time <16ms on desktop.
3. Build `EquationOverlay.tsx` — renders KaTeX equation, accepts `activeTermId` prop, applies `.equation-active` CSS class to the corresponding term span — **Acceptance:** Switching `activeTermId` updates highlighted term; KaTeX renders without `dangerouslySetInnerHTML` warnings.
4. Build `LiveAnnotation.tsx` — accepts annotation string (with `{{var}}` template tokens replaced by model.derived values), renders formatted text with bold on key numbers — **Acceptance:** Annotation updates on every slider tick; numbers match `model.derived` values.
5. Build `InteractiveWidget.tsx` — orchestrates `useChapterModel`, `SliderPanel`, visualization component, `LiveAnnotation`, equation toggle, `EquationOverlay` — **Acceptance:** Full Ch.1 interactive works end-to-end; all sliders fire, all outputs update, equation toggle shows/hides.
6. Write Chapter 1 prose narrative in second-person — 5 sections: Setup ("You're a doctor..."), First manipulation ("Drag the base rate down..."), Reveal ("Here's what's happening..."), Deep Dive (optional equation section), Takeaway — **Acceptance:** Prose renders in `NarrativeBlock.tsx` with scroll reveal; reading time ~7 minutes.
7. Implement `useIntersectionReveal.ts` hook for scroll-triggered fade-in on narrative blocks — **Acceptance:** Narrative sections fade in as user scrolls; works on mobile touch scroll.
8. Mobile pass: test Ch.1 on iOS Safari and Android Chrome. Verify slider touch targets ≥44px, no scroll hijacking — **Acceptance:** Sliders operable with thumb; page scrolls normally outside slider tracks.

**Verification Checklist:**
- [ ] `/chapter/the-test` → full chapter loads, sliders present, dot grid visible
- [ ] Drag `baseRate` to 0.1% → PPV drops below 5%, annotation updates, P(D) term highlights in equation
- [ ] Drag `sensitivity` to 50% → dot grid updates within 1 frame (Chrome perf panel)
- [ ] Toggle equation → equation fades in, active slider term is highlighted
- [ ] Mobile (iOS Safari): sliders work with touch, page scrolls normally
- [ ] `npm run build` → 0 errors, `/chapter/the-test` in static export

**Risks:**
- KaTeX + Next.js SSG: KaTeX requires a DOM — need to ensure rendering is client-side only → Mitigation: Wrap `EquationOverlay` in `dynamic(() => import(...), { ssr: false })`.
- Canvas + React ref timing: Canvas draws before layout completes → Mitigation: Attach `ResizeObserver` to the canvas container, re-draw on resize.

---

### Phase 2: Chapters 2 & 3 (Weeks 4–5)

**Objective:** Chapters 2 (The Signal) and 3 (The Forecast) complete and playable. The site now has a three-chapter narrative arc.

**Chapter 2 Spec — The Signal:**
- Context: Radio telescope waterfall display. "You're a SETI analyst. The feed is mostly noise."
- Sliders: `detectionThreshold` (0.5–4.0 σ, default 2.0), `signalStrength` (0–3.0 σ above noise, default 1.0), `noiseStd` (0.5–2.0, default 1.0)
- Derived: `detectionRate` (probability signal is detected), `falseAlarmRate` (false alarms per observation window), `snr`
- Visualization: `WaterfallDisplay.tsx` — D3 heatmap. X axis: frequency bins (100 bins). Y axis: time (50 rows, newest at top). Each cell: noise sample + signal if injected. Threshold line overlaid. Color: intensity → false alarm = orange, true detection = green, missed = dark blue.
- Key insight: lower threshold → more detections AND more false alarms. Same tradeoff as Ch.1. This is the conceptual bridge.
- Equation: Signal detection theory (d', ROC curve parameters). Active term highlighting mirrors Ch.1 pattern.

**Chapter 3 Spec — The Forecast:**
- Context: Election model. "You're a data journalist on election night."
- Sliders: `pollAverage` (45%–55%, default 52%), `marginOfError` (±1%–±5%, default ±3%), `numberOfPolls` (1–50, default 5), `systematicBias` (-3%–+3%, default 0%)
- Derived: `winProbability` (candidate A), `effectiveMoE` (after aggregation), `biasAdjustedEstimate`
- Visualization: `DistributionCurve.tsx` — D3 normal distribution showing vote share distribution. Win threshold (50%) as vertical line. Shaded area = win probability. Multiple distributions overlaid as poll count increases (showing convergence).
- Key insight: a single poll is nearly useless; aggregation and bias correction are everything.

**Tasks:**
1. Implement `src/chapters/the-signal.ts` with full config — **Acceptance:** `computeTheSignal({ detectionThreshold: 2.0, signalStrength: 1.0, noiseStd: 1.0 })` returns plausible detection/false alarm rates matching `math.ts` functions.
2. Build `WaterfallDisplay.tsx` — D3 heatmap with `d3.scaleSequential`, threshold line, real-time noise simulation using `Math.random()` seeded per render (deterministic on same params), animation of new rows scrolling in — **Acceptance:** Waterfall animates at ≥30fps; threshold line moves with slider; color codes correct.
3. Implement `src/chapters/the-forecast.ts` — **Acceptance:** `winProbability` increases monotonically as `pollAverage` increases from 45→55%; decreases as `marginOfError` increases.
4. Build `DistributionCurve.tsx` — D3 line chart rendering normal distribution curve, shaded win region, win probability text — **Acceptance:** Shaded area matches analytical `normalCDF` value within 1%.
5. Write prose for both chapters in second-person — **Acceptance:** Each chapter ~6 minutes reading time; narrative transitions bridge to the next chapter ("Sound familiar? You just solved the same problem as Chapter 1.").
6. Add "You've completed Chapter N → Continue to Chapter N+1" CTA at the bottom of each chapter — **Acceptance:** CTA visible after scrolling through the narrative; links to next chapter slug.

**Verification Checklist:**
- [ ] `/chapter/the-signal` → waterfall renders, threshold line moves with slider, colors correct
- [ ] `/chapter/the-forecast` → distribution curve renders, win probability updates, shaded region correct
- [ ] Ch.2 → Ch.3 navigation CTA works
- [ ] All chapters pass `npm run build` with 0 errors

---

### Phase 3: Chapters 4, 5 & 6 (Weeks 6–7)

**Objective:** Remaining pre-convergence chapters complete. Six of seven chapters live. Site is fully shareable as a near-complete product.

**Chapter 4 Spec — The Update:**
- Context: Bayesian belief revision. "You have a hunch. Evidence arrives."
- Sliders: `prior` (1%–99%, default 50%), `evidenceStrength` (0.5–10× likelihood ratio, default 3×), `numberOfPieces` (1–10 independent pieces)
- Derived: `posterior` after all evidence, `logOddsUpdate`
- Visualization: `BeliefMeter.tsx` — D3 horizontal bar from 0–100%. Animated fill transition on slider change. Prior vs. posterior shown simultaneously (ghost bar). Log-odds scale toggle.
- Key insight: extraordinary claims (very low prior) resist even strong evidence. 10× likelihood ratio barely moves a 1% prior.

**Chapter 5 Spec — The Market:**
- Context: Financial noise. "A stock moved 3% today. Is it meaningful?"
- Sliders: `dailyMove` (-10%–+10%, default 3%), `annualVolatility` (10%–60%, default 20%), `observationDays` (1–252)
- Derived: `zScore` (how many std deviations from zero), `pValue` (two-tailed), `expectedRandomMoves` (moves of this size in a year by chance)
- Visualization: `DistributionCurve.tsx` (reuse from Ch.3) — daily return distribution with the actual move marked. Show the "noise band" where most moves fall by chance.
- Key insight: most daily price moves are statistically indistinguishable from noise at typical volatility levels.

**Chapter 6 Spec — The Evidence:**
- Context: Courtroom reasoning. "Two witnesses place the suspect at the scene."
- Sliders: `priorGuilt` (1%–99%, default 20%), `evidenceReliability` (50%–99%, default 80%), `evidenceIndependence` (0–100%, default 100%)
- Derived: `posteriorGuilt` (with both pieces of evidence), `effectiveLikelihoodRatio` (penalized by dependence)
- Visualization: `EvidenceTree.tsx` — D3 tree diagram showing prior → evidence 1 update → evidence 2 update. Node size = probability. Branch width = likelihood ratio. Color shift: green (exonerating) to red (incriminating).
- Key insight: correlated evidence (both witnesses knew each other) is worth far less than independent evidence.

**Tasks:**
1. Implement `the-update.ts`, `the-market.ts`, `the-evidence.ts` configs — **Acceptance:** All compute functions return correct derived values for known inputs (write inline assertions).
2. Build `BeliefMeter.tsx` — **Acceptance:** Animated fill transitions; prior ghost bar stays fixed when posterior updates.
3. Build `EvidenceTree.tsx` — D3 hierarchical layout, `d3.tree()`, node color interpolation from blue to red based on probability value — **Acceptance:** Tree re-renders on slider change; node sizes and colors update correctly.
4. Reuse `DistributionCurve.tsx` for Ch.5 (parametrize to show a marked observation line + shaded noise band) — **Acceptance:** Zero code duplication; Ch.3 and Ch.5 both pass build.
5. Write prose for Ch.4, Ch.5, Ch.6 — **Acceptance:** Each chapter ~6 minutes; cross-chapter callbacks ("Same math as the telescope...") present in at least 2 chapters.
6. Static OG images: create 1200×630px PNG for each chapter in `/public/og/` and wire up `next/metadata` per chapter — **Acceptance:** Chapter URL shared to iMessage or Slack shows correct OG image and title.

**Verification Checklist:**
- [ ] All 6 chapters navigable via chapter picker
- [ ] `/chapter/the-update` → belief meter animates, prior ghost bar visible
- [ ] `/chapter/the-evidence` → evidence tree renders, node colors update
- [ ] `/chapter/the-market` → distribution shows observation marker
- [ ] OG images: `curl -I localhost:3000/chapter/the-update` → `og:image` meta tag present
- [ ] `npm run build` → 0 errors, all 6 chapters in static export

---

### Phase 4: Chapter 7 + Polish + Launch (Weeks 8–9)

**Objective:** The Convergence complete. Full v1 shipped. Performance audit, README, launch.

**Chapter 7 Spec — The Convergence:**
- Context: The payoff. "You've seen this pattern seven times. Let's prove it's the same pattern."
- Architecture: `ConvergencePanel.tsx` — four mini-visualizations side-by-side (Ch.1 dot grid thumbnail, Ch.2 waterfall thumbnail, Ch.3 distribution thumbnail, Ch.4 belief meter thumbnail). A single master slider controls the "shared parameter" — conceptually maps to base rate / detection threshold / prior probability. Moving the master slider updates all four mini-vizs simultaneously. Underneath: the same Bayes equation highlighted in all four contexts simultaneously.
- Implementation: Each chapter config's `compute()` function is called with a normalized `convergenceParam` (0–1) mapped to that chapter's parameter range. This is why `ChapterModel` was defined in Phase 0.
- Key insight: the reader drags one slider and watches all four problems respond identically. The math is the same. Explicit visual proof of the essay's central thesis.

**Tasks:**
1. Implement `the-convergence.ts` — define `convergenceParam` slider, implement `compute()` that calls all four source chapter compute functions with mapped params — **Acceptance:** Single slider change updates all four derived values correctly.
2. Build `ConvergencePanel.tsx` — 4-up mini-visualization grid, each at 25% scale, all wired to the same `model.params.convergenceParam` — **Acceptance:** All four mini-vizs update simultaneously on slider change; each shows correct visualization type (dot grid thumbnail, waterfall thumbnail, etc.).
3. Write Ch.7 prose — shorter than other chapters, more reflective — "You've seen the same equation disguised as a doctor's test, a radio telescope, an election model, a courtroom. There's one more disguise to reveal." — **Acceptance:** ~4 minutes reading time.
4. Performance audit: run Lighthouse mobile emulation on all 7 chapters — **Acceptance:** Each chapter scores ≥90 performance, ≥95 accessibility.
5. Frame budget audit: Chrome DevTools Performance panel on Ch.1 dot grid (heaviest chapter). Target: <16ms frame time on M-series Mac, <33ms on mid-range mobile (iPhone 14 or equivalent) — **Acceptance:** No dropped frames during slider drag on desktop.
6. Keyboard accessibility: all sliders must be keyboard-operable (arrow keys) — **Acceptance:** Tab to slider → arrow keys change value → model updates.
7. `README.md` — project description, tech stack, how to run locally, how to contribute, chapter list — **Acceptance:** README renders correctly on GitHub; `npm run dev` instructions work on a clean clone.
8. Cross-browser test: Chrome, Firefox, Safari — **Acceptance:** All 7 chapters render and interact correctly in all three browsers.
9. Launch: tag `v1.0.0`, push to GitHub, submit to Hacker News "Show HN" — **Acceptance:** Site accessible at final Vercel domain.

**Verification Checklist:**
- [ ] `/chapter/the-convergence` → all 4 mini-vizs render, single slider updates all simultaneously
- [ ] Lighthouse mobile: all chapters ≥90 performance
- [ ] All chapters keyboard-navigable (Tab through sliders, arrow keys work)
- [ ] Clean clone: `git clone ... && npm install && npm run dev` → works with no additional config
- [ ] `npm run build` → 0 errors, all 7 chapters in static export
- [ ] GitHub repo: MIT license, README, all 7 chapter files

---

## 5. Security & Credentials

This project has no backend, no credentials, no user data, and no external API calls. Security surface is minimal:

- No credentials stored anywhere — pure static site
- Nothing leaves the user's browser — all computation client-side
- No tracking, no analytics (v1)
- No user accounts, no persistent state
- Only external network call: Next.js font loading from Google Fonts CDN (or use `next/font/local` with self-hosted fonts for full data sovereignty)

Only hardening needed:
- Add `Content-Security-Policy` headers via `next.config.ts` `headers()` function for XSS protection
- Ensure no `dangerouslySetInnerHTML` except for KaTeX output (which is safe — KaTeX sanitizes its output)

---

## 6. Testing Strategy

**Math functions (`src/lib/math.ts`):**
- Write `src/lib/math.test.ts` using Node's built-in `assert` module (no test framework needed for pure functions)
- Known values to assert: `ppv(0.01, 0.95, 0.95)` → 0.161 ±0.001; `normalCDF(0, 0, 1)` → 0.5 ±0.001; `normalCDF(1.96, 0, 1)` → 0.975 ±0.001
- Run with `node --experimental-strip-types src/lib/math.test.ts` in CI

**Chapter compute functions:**
- Each chapter config exports a `validate()` function that runs inline assertions
- Add to CI step after `tsc --noEmit`

**Visual regression (deferred to v2):**
- Screenshot testing with Playwright would catch D3 rendering regressions
- Not worth the CI complexity for v1 — manual verification checklist is sufficient

**Manual acceptance testing:**
- Each phase ends with the verification checklist above
- Mobile testing on physical device (iPhone + Android) before each phase merge

---

## Scope Boundaries

**In scope (v1):**
- 7 chapters, fully interactive, second-person narrative
- D3 visualizations + Canvas dot grid
- Equation overlay with term highlighting
- Static site, Next.js 14, Vercel deploy
- MIT license, public GitHub
- Static OG images per chapter
- Mobile-responsive, touch-safe
- Keyboard accessible

**Out of scope (v1):**
- Dynamic OG image generation (Vercel OG)
- Analytics
- Cross-chapter state persistence
- Personal calibration quiz
- iOS companion app
- Classroom mode
- Dark/light mode toggle (default to dark)
- Comments or social features
- Email capture / newsletter

**Deferred to v2:**
- Dynamic OG images via Vercel OG
- Vercel Analytics
- Chapter 8+ (Monty Hall, entropy, survivorship bias)
- Personal calibration at end
- Cross-chapter parameter callbacks (full implementation)
- Playwright visual regression tests
