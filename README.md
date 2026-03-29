# Signal & Noise

[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript)](#) [![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](#)

> Drag a slider. Update your prior. Watch Bayes' theorem stop being abstract.

Signal & Noise is an interactive essay teaching Bayesian reasoning and probabilistic thinking through seven chapters of live, manipulable visualizations. Second-person narrative. No login. No download. Every concept is something you feel before you calculate.

## Features

- **Seven chapters** — medical diagnostics, radio telescope detection, election modeling, Bayesian belief revision, financial noise, courtroom reasoning, and model convergence
- **Direct manipulation** — every visualization is a live control; drag priors, adjust thresholds, watch posterior distributions update in real time
- **KaTeX equations** — inline math renders client-side without a build step
- **Scroll animations** — Framer Motion reveal animations guide pacing through the narrative
- **Static export** — fully pre-renderable; no server required after `npm run build`

## Quick Start

### Prerequisites
- Node.js 18+

### Installation
```bash
npm install
```

### Usage
```bash
# Development
npm run dev

# Static export
npm run build && npm run start

# Type-check
npm run typecheck
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (static export) |
| Language | TypeScript 5, strict mode |
| Visualization | D3 v7 (math/scales; React owns DOM) |
| Math | KaTeX 0.16 |
| Animation | Framer Motion 11 |
| Styling | Tailwind CSS 3 |

## Architecture

Each chapter is a React Server Component with client islands for interactive visualizations. D3 handles only scales and mathematical transforms — React owns the SVG DOM, preventing the classic D3/React DOM conflict. All seven chapters are statically exported at build time, making the essay hostable on any CDN with zero runtime infrastructure.

## License

MIT