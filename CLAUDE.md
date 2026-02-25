# ACP Deal Sourcing Intelligence Platform

## What This Is

AI-powered PE deal flow operating system for Arlington Capital Partners. Identifies and scores acquisition targets across 4 sector lanes. Vanilla JS SPA deployed on Netlify. Zero dependencies, zero build step.

**Live:** https://ctg-intel-platform.netlify.app

## Project Structure

```
acp-intel-platform/          # Main application
├── index.html               # SPA shell
├── netlify.toml             # Deployment config
├── css/
│   ├── obsidian.css         # Design tokens (dark mode, WCAG AA)
│   ├── shell.css            # Layout grid (sidebar + content + panel)
│   ├── components.css       # Shared component styles
│   └── *.css                # Section-specific styles (7 files)
└── js/
    ├── app.js               # Module registry & hash router
    ├── shell.js             # Sidebar nav
    ├── data.js              # 30 prospects, 15 portfolio cos, 5 agents, 7 competitors
    ├── shared-components.js # Reusable DOM constructors
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
| `js/data.js` (1800 lines) | 30 prospects, 15 portfolio cos, 5 agents, 7 competitors, 4 sectors, helpers |
| `js/shared-components.js` | KPICard, TierBadge, RadarChart, FilterTabBar, etc. |
| `js/app.js` | Module registry, lazy loader, router |
| `css/obsidian.css` | Design system tokens (colors, type, spacing) |

## Modules

1. **command-center** — Dashboard KPIs, pipeline table, sector allocation, live intelligence feed
2. **deal-pipeline** — 30 prospect cards grid, filter by tier, detail panel with radar chart
3. **thesis-engine** — 6-slider conviction scoring model with 4 presets, IC recommendation
4. **value-creation** — PE returns calculator (MOIC/IRR), entry/exit economics, 3 scenarios
5. **agent-architecture** — 5-agent AI pipeline visualization with live chain simulation
6. **competitive-landscape** — 7 PE firm competitive analysis, head-to-head comparison
7. **portfolio-intel** — Fund roadmap (4 phases) and sector lane analysis (4 lanes)

## Design System (Obsidian)

- Dark mode: `#09090B` → `#18181B` backgrounds
- Accents: emerald `#34D399`, red `#EF4444`, amber `#F59E0B`, blue `#3B82F6`, violet `#A78BFA`, teal `#14B8A6`
- Fonts: Plus Jakarta Sans (UI), JetBrains Mono (data)
- Spacing: 4px base unit

## Run Locally

```bash
cd acp-intel-platform
npx serve .
# or: python3 -m http.server 8765
```

## Deploy

```bash
# Auto-deploys from main branch via Netlify
# Manual: netlify deploy --prod --dir=acp-intel-platform
```

## Coding Conventions

- **Vanilla JS only** — no frameworks, no npm, no build tools
- **var** declarations (ES5 style throughout codebase)
- **DOM construction** via `document.createElement`, not string concatenation
- **Memory management** — every module tracks `_timers[]` and `_listeners[]`, cleans up in `destroy()`
- **CSS custom properties** for all design tokens — never hardcode colors/fonts
- **Section-specific CSS** — one stylesheet per module, lazy-loaded
- Commit messages: `type: description` (fix, feat, docs, refactor)

## Scoring Model (Conviction Engine)

Six weighted factors determine deal conviction:

| Factor | Weight |
|--------|--------|
| Sector Fit | 20% |
| Management Quality | 20% |
| EBITDA Quality | 20% |
| Growth Runway | 15% |
| Deal Complexity | 15% |
| Competitive Process | 10% |

Tiers: HOT (≥75), WARM (50-74), NURTURE (25-49), STRATEGIC (complex/large)

## Data Model

- **30 prospects** across 4 sectors: Software & TES, Professional Services, Industrial Services, Specialty M&D
- **15 portfolio companies** (10 active, 5 exited) with 109 total add-on acquisitions
- **5 AI agents**: Signal Hunter, Deal Qualifier, Thesis Builder, Value Modeler, Portfolio Monitor
- **7 competitors**: Blue Point, Benford, HCI, Halifax, Rotunda, CenterGate, Incline
- **Fund economics**: $1.8B AUM, Fund III ($620M, Oct 2022 vintage)

## Backend (External)

- **n8n** orchestration for 5 AI agents
- **Claude API** for signal classification
- 60+ data sources across 8 signal types
