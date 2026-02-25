# CTG Sourcing Intelligence Platform

## What This Is

AI-powered prospect identification and pipeline intelligence platform for contact center technology buyers. Vanilla JS SPA deployed on Netlify. Zero dependencies, zero build step.

**Live:** https://ctg-intel-platform.netlify.app

## Project Structure

```
ctg-intel-platform/          # Main application
├── index.html               # SPA shell
├── netlify.toml             # Deployment config
├── css/
│   ├── obsidian.css         # Design tokens (dark mode, WCAG AA)
│   ├── shell.css            # Layout grid (sidebar + content + panel)
│   ├── components.css       # Shared component styles
│   └── *.css                # Section-specific styles
└── js/
    ├── app.js               # Module registry & hash router
    ├── shell.js             # Sidebar nav
    ├── data.js              # 30 prospect records + helpers (domain data)
    ├── shared-components.js # 11 reusable DOM constructors
    └── *.js                 # Section modules (7 total)
```

## Architecture

**Module pattern** — every section is an IIFE exposing `{init, destroy}`:

```javascript
window.modules['module-name'] = {
  init: function(container, panel) { /* render DOM */ },
  destroy: function() { /* clear timers/listeners */ }
};
```

**Lifecycle:** hash change → `app.js` router → lazy-load CSS/JS → `init()` → on navigate away → `destroy()`

**Components** return raw DOM elements (no templating, no innerHTML for data).

## Key Files

| File | Role |
|------|------|
| `js/data.js` (1197 lines) | All prospect records, scoring data, feed entries |
| `js/shared-components.js` | KPICard, TierBadge, RadarChart, FilterTabBar, etc. |
| `js/app.js` | Module registry, lazy loader, router |
| `css/obsidian.css` | Design system tokens (colors, type, spacing) |

## Modules

1. **command-center** — Dashboard KPIs, pipeline tabs, live feed
2. **pipeline-intel** — Prospect cards grid, detail panel with radar chart
3. **strain-simulator** — 6-slider scoring model with presets
4. **revenue-model** — Deal economics calculator
5. **agent-architecture** — AI agent chain visualization
6. **competitive-map** — Market positioning analysis
7. **build-roadmap** — Implementation phases

## Design System (Obsidian)

- Dark mode: `#09090B` → `#18181B` backgrounds
- Accents: emerald `#34D399`, red `#EF4444`, amber `#F59E0B`, blue `#3B82F6`, violet `#A78BFA`, teal `#14B8A6`
- Fonts: Plus Jakarta Sans (UI), JetBrains Mono (data)
- Spacing: 4px base unit

## Run Locally

```bash
cd ctg-intel-platform
npx serve .
# or just: open index.html
```

## Deploy

```bash
# Auto-deploys from main branch via Netlify
# Manual: netlify deploy --prod --dir=ctg-intel-platform
```

## Coding Conventions

- **Vanilla JS only** — no frameworks, no npm, no build tools
- **var** declarations (ES5 style throughout codebase)
- **DOM construction** via `document.createElement`, not string concatenation
- **Memory management** — every module tracks `_timers[]` and `_listeners[]`, cleans up in `destroy()`
- **CSS custom properties** for all design tokens — never hardcode colors/fonts
- **Section-specific CSS** — one stylesheet per module, lazy-loaded
- Commit messages: `type: description` (fix, feat, docs, refactor)

## Scoring Model

Six weighted strain factors determine prospect urgency:

| Factor | Weight |
|--------|--------|
| Vendor Universe Complexity | 20% |
| Evaluation Complexity | 20% |
| Timeline Pressure | 20% |
| Expertise Gap | 15% |
| Compliance Burden | 15% |
| Stakeholder Count | 10% |

Tiers: HOT (≥75), WARM (50-74), NURTURE (25-49), STRATEGIC (complex/large)

## Backend (External)

- **n8n** orchestration for 5 AI agents (Monitor, Analyst, Planner, Strategist, Executor)
- **Claude API** for signal classification
- 12 parallel APIs for firmographic/technographic enrichment
- 62 data sources across 9 intelligence categories

## In Progress

- ACP adaptation: porting architecture to PE deal sourcing (see `ACP_Adaptation_Plan.md`)
