<div align="center">

# ACP Deal Sourcing Intelligence Platform

**AI-powered deal origination and pipeline intelligence for lower middle-market PE**

[![Live Demo](https://img.shields.io/badge/live_demo-peportfoliosignals.netlify.app-34D399?style=flat-square&logo=netlify)](https://peportfoliosignals.netlify.app)
[![Status](https://img.shields.io/badge/status-working_prototype-34D399?style=flat-square)](#)
[![Agents](https://img.shields.io/badge/AI_agents-5-3B82F6?style=flat-square)](#agent-architecture)
[![Modules](https://img.shields.io/badge/modules-8-14B8A6?style=flat-square)](#eight-interactive-modules)
[![Signals](https://img.shields.io/badge/signal_detectors-8-A78BFA?style=flat-square)](#signal-detection)
[![Prospects](https://img.shields.io/badge/scored_prospects-30-EF4444?style=flat-square)](#)
[![Docs](https://img.shields.io/badge/docs-data_flow-F59E0B?style=flat-square)](https://peportfoliosignals.netlify.app/docs/data-flow.html)

</div>

---

## Overview

Align Capital Partners invests in founder-led B2B services businesses with $3-15M EBITDA across four core sector lanes. This platform demonstrates an AI-powered deal sourcing intelligence system that detects acquisition signals, scores conviction across six weighted dimensions, and routes opportunities through a 5-agent processing pipeline.

| Metric | Value |
|--------|-------|
| Total AUM | $1.8B across 3 funds + co-invest |
| Active Fund | Fund III ($620M, Oct 2022 vintage) |
| Scored Prospects | 30 across 4 sector lanes |
| Portfolio Companies | 15 (10 active, 4 exited, 1 monitoring) |
| Total Acquisitions | 125+ (including add-ons) |
| Equity Check Range | $20-60M |
| Target EBITDA | $3-15M |

**Live demo:** [peportfoliosignals.netlify.app](https://peportfoliosignals.netlify.app)

---

## Quick Start

1. Open the [deployed site](https://peportfoliosignals.netlify.app) or run locally with `npx serve acp-intel-platform`
2. Use the sidebar to navigate between eight interactive modules
3. Click any prospect card in **Deal Pipeline** to see conviction scoring details
4. Try the **Thesis Engine** presets (Platform Consolidation, Founder Transition, Healthcare Services, Tech-Enabled Services)
5. Run the agent chain in **Agent Architecture** to watch the processing sequence
6. Model PE returns in **Value Creation** with adjustable deal parameters
7. Open **Signal Detection** to explore how 8 specialized detectors scan API sources — run a simulated detection scan with live cost tracking
8. View the **[Data Flow](https://peportfoliosignals.netlify.app/docs/data-flow.html)** page to understand how the 5-stage intelligence pipeline works

---

## Technical Architecture

### Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Vanilla HTML / CSS / JavaScript | Zero framework dependencies |
| Architecture | Modular SPA | Hash-based routing, module `init()`/`destroy()` lifecycle |
| Design System | Obsidian | Custom dark-mode tokens in `obsidian.css` |
| Components | 14 shared components | `shared-components.js` with XSS-safe escaping |
| Lifecycle | ModuleBase factory | Timer/listener cleanup, memory leak prevention via `module-base.js` |
| Security | XSS escaping + CSP | `Components.esc()` on all data, Content Security Policy headers |
| Hosting | Netlify | Static deployment, zero server-side dependencies |

### SPA Module System

Each section is a self-contained module loaded lazily via `app.js`. CSS and JS are injected on first navigation and cached for subsequent visits. Modules register with the global namespace and implement the `init(container, panel)` / `destroy()` lifecycle contract. A `ModuleBase` factory in `module-base.js` provides automatic timer and listener cleanup (`_on`, `_interval`, `_timeout`, `_destroy`) to prevent memory leaks. A race-condition guard (`loadingId`) ensures stale modules never render when users navigate quickly between tabs. All data-derived HTML is escaped through `Components.esc()` to prevent XSS.

---

## Eight Interactive Modules

| # | Module | Purpose | Key Interactions |
|---|--------|---------|-----------------|
| 01 | **Command Center** | Real-time operational dashboard | Filter by tier, prospect search, process stage funnel, sector allocation chart, live intelligence feed |
| 02 | **Deal Pipeline** | Prospect cards with full detail panels | Prospect search, signal detail cards with freshness indicators, 6-axis radar chart, conviction factors, thesis alignment |
| 03 | **Thesis Engine** | Interactive conviction scoring model | 6 weighted sliders + 4 PE thesis presets, top 5 pipeline matches scored against current thesis |
| 04 | **Value Creation** | PE returns modeler | Entry EBITDA, multiple, hold period, growth rate sliders, equity % slider, exit multiple expansion, bear/bull/base MOIC/IRR scenarios |
| 05 | **Agent Architecture** | Visual agent system map | Run Agent Chain simulation with color-coded processing sequence |
| 06 | **Competitive Landscape** | PE competitive analysis | 7 competitors with threat levels, strengths/vulnerabilities, head-to-head metrics |
| 07 | **Portfolio Intel** | Fund roadmap and sector lanes | Toggle between roadmap phases and sector lane analysis |
| 08 | **Signal Detection** | Signal detection methodology simulator | 8 detectors with API sources, simulated scan playback, cost accumulator, matched prospect results |

---

## Agent Architecture

Five agents form the intelligence pipeline:

| Agent | Role | Output |
|-------|------|--------|
| **Signal Hunter** | Signal detection across 60+ data sources | Raw classified signals with confidence scores |
| **Deal Qualifier** | Conviction scoring and enrichment | Scored prospect profiles with 6-factor breakdown |
| **Thesis Builder** | Deal positioning and thesis alignment | IC-ready briefs and approach recommendations |
| **Value Modeler** | Returns modeling and deal structuring | MOIC/IRR projections, capital structure analysis |
| **Portfolio Monitor** | Feedback loop and model calibration | Weight tuning, prediction accuracy tracking |

---

## Data Flow Documentation

A standalone interactive page explains the 5-stage intelligence pipeline for a non-technical audience:

**[View Data Flow →](https://peportfoliosignals.netlify.app/docs/data-flow.html)**

| Feature | Details |
|---------|---------|
| Format | Self-contained HTML page with inline CSS/JS (no dependencies) |
| Design | Obsidian dark theme with Plus Jakarta Sans + JetBrains Mono |
| Pipeline | 5 horizontal stage cards with animated particle connectors |
| Feedback Loop | SVG arc animation connecting Stage 5 back to Stage 1 |
| Detail Panels | Click any stage to expand — plain-language explanations, visual components, real-world examples |
| Responsive | 3 breakpoints — desktop (5-column pipeline), tablet (wrapped grid), mobile (stacked cards) |

### Stage Detail Panels

| Stage | Agent | What the Panel Shows |
|-------|-------|---------------------|
| Detect | Signal Hunter | 8 signal types monitored, 2-6 hr detection speed, Apex Compliance example |
| Score & Rank | Deal Qualifier | 6 conviction dimensions with weights, 4 priority tiers (HOT/WARM/NURTURE/STRATEGIC) |
| Build Thesis | Thesis Builder | Sample IC brief for Apex Compliance, 4 investment lenses |
| Model Returns | Value Modeler | Animated Bear/Base/Bull MOIC bars, 55/45 equity-debt split bar, $90M EV |
| Learn & Adapt | Portfolio Monitor | 4-step feedback loop flow, 4 tracked metrics, continuous learning example |

---

## Conviction Scoring Model

Six weighted dimensions assess deal attractiveness and IC readiness:

| Factor | Weight | What It Measures |
|--------|--------|-----------------|
| Sector Fit | 20% | Alignment with ACP's 4 core sector lanes |
| Management Quality | 20% | Founder/management team strength and continuity |
| Growth Runway | 15% | Organic and inorganic growth potential |
| EBITDA Quality | 20% | Margin sustainability, customer concentration, recurring revenue |
| Deal Complexity | 15% | Process competitiveness, intermediary involvement |
| Competitive Process | 10% | Number of competing bidders, proprietary angle |

### Tier Thresholds

| Tier | Range | Action |
|------|-------|--------|
| **HOT** | 75-100 | Active pursuit, IC presentation |
| **WARM** | 50-74 | Detailed diligence, relationship building |
| **NURTURE** | 25-49 | Monitor, maintain relationship |
| **STRATEGIC** | 0-24 | Long-term target, track for future |

---

## Signal Enrichment

All 30 prospects carry enriched signal data across 8 detection types:

| Signal Type | Description |
|-------------|-------------|
| Founder Succession | Founder age/tenure indicators suggesting transition readiness |
| Platform Fatigue | Employee sentiment decline, leadership turnover, tech debt signals |
| Regulatory Tailwind | Legislative or regulatory changes creating acquisition catalysts |
| Add-On Magnet | Fragmented market with bolt-on acquisition opportunities |
| Carve-Out Candidate | Non-core division divestiture signals from public companies |
| Management Upgrade | Leadership gaps or recent executive departures |
| Recurring Moat | High recurring revenue with strong retention metrics |
| Sector Consolidator | Industry fragmentation with consolidation momentum |

Each prospect's `signalDetails[]` includes confidence score (0-1), corroborating sources, last verified date, and narrative summary. Freshness indicators show signal age: green (≤3 days), amber (4-7 days), red (>7 days).

---

## Competitive Landscape

7 peer firms analyzed with threat levels and differentiation:

- **Blue Point Capital Partners** (Direct LMM Peer)
- **Benford Capital Partners** (Direct LMM Peer)
- **HCI Equity Partners** (Direct LMM Peer)
- **The Halifax Group** (Upper-LMM)
- **Rotunda Capital Partners** (Adjacent LMM)
- **CenterGate Capital** (Adjacent LMM)
- **Incline Equity Partners** (Adjacent LMM)

---

## Signal Detection

The Signal Detection module simulates how 8 specialized detectors would scan real-world API sources to identify acquisition signals:

| Detector | Feasibility | Cost | Key API Sources |
|----------|-------------|------|-----------------|
| Founder Succession | HIGH | $$$ | LinkedIn SN, Exit Planning Institute, SEC EDGAR, PitchBook |
| Platform Fatigue | MEDIUM | $$ | Glassdoor, LinkedIn SN, G2/Capterra, Crunchbase |
| Regulatory Tailwind | HIGH | $$ | Federal Register, Congress.gov, Westlaw Edge, Thomson Reuters |
| Add-On Magnet | HIGH | $$$ | PitchBook, IBISWorld, Census Bureau, Crunchbase |
| Carve-Out Candidate | MEDIUM | $$$ | SEC EDGAR, Bloomberg, CapIQ, Activist Insight |
| Management Upgrade | EXPLORATORY | $$ | LinkedIn SN, Glassdoor, ZoomInfo, Court Records |
| Recurring Moat | HIGH | $$ | G2/Capterra, SimilarWeb, PitchBook, Customer surveys |
| Sector Consolidator | HIGH | $$ | PitchBook, IBISWorld, Census Bureau, Trade publications |

Each detector includes a simulated scan playback with Run/Pause/Reset controls. The simulation walks through detection phases (INIT, QUERY, FILTER, XREF, ENRICH, SCORE, DETECT, COMPLETE) with a running cost accumulator. On completion, matched prospects from the pipeline are displayed with confidence scores and tier badges.

---

## Security

| Header | Value |
|--------|-------|
| Content-Security-Policy | `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data:; connect-src 'self'` |
| X-Frame-Options | `SAMEORIGIN` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` |

All data-derived HTML values pass through `Components.esc()` to prevent XSS injection. Security headers are configured in `netlify.toml` and applied to all routes.

---

## Accessibility

- **Skip link**: `<a href="#content-main">Skip to main content</a>` for keyboard users
- **ARIA landmarks**: `role="navigation"` and `aria-label` on sidebar nav and detail panel
- **Tab management**: `FilterTabBar` renders `role="tablist"` / `role="tab"` with `aria-selected` state
- **Keyboard navigation**: ArrowLeft/ArrowRight to move between tabs, Enter/Space to activate table rows
- **Focus management**: `contentMain.focus()` after each module init to anchor screen readers
- **Visible focus**: `:focus-visible` outlines on all interactive elements
- **Responsive layout**: 3 breakpoints (1024px, 768px, 480px) with collapsible sidebar hamburger menu
- **Color contrast**: All informational text meets WCAG AA-large (3:1+) against dark backgrounds

---

## Project Structure

```
PE-Portfolio/
├── README.md                       # This file (repo landing page)
├── netlify.toml                    # Netlify config (security headers, SPA redirect, cache)
│
└── acp-intel-platform/
    ├── index.html                  # SPA shell — sidebar nav + content panels
    ├── 404.html                    # Custom 404 page with Obsidian dark theme
    ├── README.md                   # Platform-specific documentation
    │
    ├── docs/
    │   └── data-flow.html          # Interactive 5-stage pipeline explainer (standalone)
    │
    ├── css/
    │   ├── obsidian.css            # Design system tokens (colors, typography, spacing)
    │   ├── shell.css               # Layout: sidebar, content areas, responsive grid
    │   ├── components.css          # Shared component styles
    │   ├── command-center.css
    │   ├── deal-pipeline.css
    │   ├── thesis-engine.css
    │   ├── value-creation.css
    │   ├── agent-architecture.css
    │   ├── competitive-landscape.css
    │   ├── portfolio-intel.css
    │   └── signal-detection.css
    │
    └── js/
        ├── app.js                  # Module registry, lazy loading, hash routing
        ├── shell.js                # Sidebar navigation management
        ├── data.js                 # Prospects (30), portfolio, competitors, signal detectors, agents
        ├── shared-components.js    # 14 reusable DOM constructors with XSS escaping
        ├── module-base.js          # ModuleBase lifecycle factory (timer/listener cleanup)
        ├── command-center.js
        ├── deal-pipeline.js
        ├── thesis-engine.js
        ├── value-creation.js
        ├── agent-architecture.js
        ├── competitive-landscape.js
        ├── portfolio-intel.js
        └── signal-detection.js
```

---

## Deployment

No build step. No bundler. No transpiler. Zero dependencies.

```bash
# Local development
npx serve acp-intel-platform

# Netlify deployment (automatic via GitHub integration)
# Or manual: netlify deploy --prod --dir=acp-intel-platform
```

### Production Configuration

- **Live URL** — [peportfoliosignals.netlify.app](https://peportfoliosignals.netlify.app)
- **Security headers** — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (configured in `netlify.toml`)
- **SPA redirect** — `/* → /index.html` (status 200) for hash-based routing
- **Cache control** — `/css/*` and `/js/*` cached for 1 hour with `must-revalidate`
- **Custom 404** — Obsidian dark-themed error page with navigation back to Command Center
- **OG meta tags** — `og:title`, `og:description`, `og:type`, `og:url` for social sharing link previews
- **Inline SVG favicon** — No external favicon request; embedded in `<link rel="icon">`

---

<div align="center">

**Pete Connor** · Working Prototype · February 2026

</div>
