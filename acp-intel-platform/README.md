<div align="center">

# ACP Deal Sourcing Intelligence Platform

**AI-powered deal origination and pipeline intelligence for lower middle-market PE**

[![Status](https://img.shields.io/badge/status-working_prototype-34D399?style=flat-square)](#)
[![Deploy](https://img.shields.io/badge/deploy-netlify-00C7B7?style=flat-square&logo=netlify)](#)
[![Agents](https://img.shields.io/badge/AI_agents-5-3B82F6?style=flat-square)](#agent-architecture)
[![Prospects](https://img.shields.io/badge/scored_prospects-30-EF4444?style=flat-square)](#)

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

---

## Quick Start

The platform is a live, working application.

1. Open the deployed site or run locally with `npx serve .`
2. Use the sidebar to navigate between seven interactive modules
3. Click any prospect card in **Deal Pipeline** to see conviction scoring details
4. Try the **Thesis Engine** presets (Platform Consolidation, Founder Transition, Healthcare Services, Tech-Enabled Services)
5. Run the agent chain in **Agent Architecture** to watch the processing sequence
6. Model PE returns in **Value Creation** with adjustable deal parameters

---

## Technical Architecture

### Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Vanilla HTML / CSS / JavaScript | Zero framework dependencies |
| Architecture | Modular SPA | Hash-based routing, module `init()`/`destroy()` lifecycle |
| Design System | Obsidian | Custom dark-mode tokens in `obsidian.css` |
| Components | 11 shared components | `shared-components.js` with XSS-safe escaping |
| Hosting | Netlify | Static deployment, zero server-side dependencies |

### SPA Module System

Each section is a self-contained module loaded lazily via `app.js`. Modules register with the global namespace and implement the `init(container, panel)` / `destroy()` lifecycle contract with full listener and timer cleanup.

---

## Seven Interactive Modules

| # | Module | Purpose | Key Interactions |
|---|--------|---------|-----------------|
| 01 | **Command Center** | Real-time operational dashboard | Filter by tier, sector allocation chart, live intelligence feed |
| 02 | **Deal Pipeline** | Prospect cards with full detail panels | Click any card for radar chart, conviction factors, thesis alignment |
| 03 | **Thesis Engine** | Interactive conviction scoring model | 6 weighted sliders + 4 PE thesis presets |
| 04 | **Value Creation** | PE returns modeler | Entry EBITDA, multiple, hold period, growth rate sliders with MOIC/IRR scenarios |
| 05 | **Agent Architecture** | Visual agent system map | Run Agent Chain simulation with color-coded processing sequence |
| 06 | **Competitive Landscape** | PE competitive analysis | 7 competitors with threat levels, strengths/vulnerabilities, head-to-head metrics |
| 07 | **Portfolio Intel** | Fund roadmap and sector lanes | Toggle between roadmap phases and sector lane analysis |

---

## Agent Architecture

Five agents form the intelligence pipeline:

| Agent | Role | Output |
|-------|------|--------|
| **Scout** | Signal detection across data sources | Raw classified signals |
| **Analyst** | Conviction scoring and enrichment | Scored prospect profiles with 6-factor breakdown |
| **Strategist** | Deal positioning and thesis alignment | IC-ready briefs and approach recommendations |
| **Planner** | Returns modeling and deal structuring | MOIC/IRR projections, capital structure analysis |
| **Monitor** | Feedback loop and model calibration | Weight tuning, prediction accuracy tracking |

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

## Project Structure

```
acp-intel-platform/
├── index.html                  # SPA shell — sidebar nav + content panels
├── netlify.toml                # Netlify deployment config
├── README.md
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
│   └── portfolio-intel.css
│
└── js/
    ├── app.js                  # Module registry, lazy loading, hash routing
    ├── shell.js                # Sidebar navigation management
    ├── data.js                 # Prospect database (30 records), portfolio, competitors
    ├── shared-components.js    # 11 reusable DOM constructors with XSS escaping
    ├── command-center.js
    ├── deal-pipeline.js
    ├── thesis-engine.js
    ├── value-creation.js
    ├── agent-architecture.js
    ├── competitive-landscape.js
    └── portfolio-intel.js
```

---

## Deployment

No build step. No bundler. No transpiler. Zero dependencies.

```bash
# Local development
npx serve .

# Netlify deployment (manual)
netlify deploy --prod --dir=acp-intel-platform
```

---

<div align="center">

**Pete Connor** · Working Prototype · February 2026

</div>
