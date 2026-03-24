# Signal & Noise

An interactive essay teaching Bayesian reasoning and probabilistic thinking through direct manipulation of live visualizations. Seven chapters, second-person narrative, no login or download required.

## Chapters

| #   | Title           | Concept                                                     |
| --- | --------------- | ----------------------------------------------------------- |
| 1   | The Test        | Medical diagnostics and base rate neglect                   |
| 2   | The Signal      | Radio telescope detection and false alarm tradeoffs         |
| 3   | The Forecast    | Election modeling, polling aggregation, and systematic bias |
| 4   | The Update      | Bayesian belief revision and log-odds                       |
| 5   | The Market      | Financial noise, z-scores, and p-values                     |
| 6   | The Evidence    | Courtroom reasoning and correlated witnesses                |
| 7   | The Convergence | One slider, four models, same equation                      |

## Tech Stack

- **Next.js 14** — App Router, static export (`output: 'export'`)
- **React 18** — Hooks only
- **TypeScript 5** — Strict mode
- **D3 v7** — Math and scales only (React owns the DOM)
- **KaTeX 0.16** — Client-side equation rendering
- **Framer Motion 11** — Scroll reveal animations
- **Tailwind CSS 3** — All styling

## Run Locally

```bash
git clone <repo-url>
cd signal-noise
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── chapters/          # One config per chapter (sliders, compute, equation)
├── components/
│   ├── chapter/       # ChapterShell, InteractiveWidget, prose content
│   ├── viz/           # DotGrid, WaterfallDisplay, DistributionCurve, etc.
│   ├── landing/       # Hero, ChapterPicker
│   └── ui/            # Slider, Toggle
├── hooks/             # useChapterModel, useCanvasSize, useD3
├── lib/               # Pure math functions, utilities
└── types/             # ChapterModel, ChapterConfig interfaces
```

## How It Works

Each chapter exports a `ChapterConfig` with a `compute()` function that maps slider parameters to derived values, and an `annotation()` function that generates live text. The `InteractiveWidget` orchestrates sliders, visualization, annotation, and equation overlay. Visualizations use Canvas (DotGrid, WaterfallDisplay) or SVG with D3 path generators (DistributionCurve, EvidenceTree).

## Contributing

PRs welcome. Before submitting:

```bash
npm run typecheck   # tsc --noEmit
npm test            # vitest run
npm run build       # next build (static export)
```

## License

MIT
