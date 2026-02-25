# ACP Intelligence Platform — Adaptation Plan

## From CTG Signal Detection → Align Capital Partners Deal Sourcing Intelligence

**Author:** Christopher Pete Connor
**Date:** February 25, 2026
**Status:** Planning (no code written)
**Source Platform:** CTG Sourcing Intelligence v2 (Cortex architecture, live at ctgintelplatform.netlify.app)
**Target Platform:** ACP Deal Sourcing Intelligence Platform

---

## 1. Strategic Thesis

The CTG platform is fundamentally a **scored-entity pipeline intelligence tool** — it takes a universe of prospects, scores them against multi-factor criteria, visualizes pipeline health, models economics, and presents an AI-powered sourcing thesis. That pattern maps *directly* to PE deal sourcing.

ACP's business model — identifying, qualifying, and executing on LMM B2B acquisitions — is structurally identical to what CTG does for contact center technology sourcing. The deep research provides real data: 26 portfolio companies, $1.8B AUM, Fund III at $620M, 125+ acquisitions, 4 sector lanes, a full competitive set, and granular investment criteria. This isn't hypothetical data — it's research-backed intelligence that makes the demo credible.

**Why this matters for your career:** This becomes a second vertical demonstration (alongside ISPN/NovaTech ops platform) proving you can rapidly adapt the Cortex architecture to any B2B intelligence use case. PE firms are a massive market for this kind of tooling. If you're pitching ACP specifically, or any PE shop, this demonstrates you can build exactly the operational intelligence they need — in their language, with their data patterns.

---

## 2. Architecture Layer — What Stays Identical

These files transfer with **zero logic changes**. They are domain-agnostic infrastructure.

| File | Size | What It Does | Change Required |
|------|------|-------------|-----------------|
| `index.html` | 3.7 KB | SPA shell — sidebar, status bar, content+panel containers | Rebrand text only (CTG → ACP branding) |
| `css/obsidian.css` | 6.0 KB | 50 design tokens — colors, type, spacing, radii | Recolor primary accent (emerald → cyan/navy for ACP brand) |
| `css/shell.css` | 3.7 KB | Sidebar, status bar, three-column layout skeleton | Zero changes |
| `css/components.css` | 5.8 KB | Shared component styles (KPICard, badges, tables, etc.) | Zero changes |
| `js/shared-components.js` | 11 KB | 11 constructor functions returning DOM elements | Zero changes — all components are domain-agnostic |
| `js/shell.js` | 426 B | Sidebar nav tab management | Update nav labels only |
| `js/app.js` | 3.7 KB | Hash router + module lifecycle (lazy load CSS/JS, init/destroy) | Update MODULES registry (new hash routes + accent colors) |
| `netlify.toml` | 474 B | SPA redirect + cache headers | Zero changes |

**Total unchanged architecture: ~45 KB of the ~100 KB codebase.**

The module contract pattern (IIFE + `window.modules` registry + `_interval`/`_timeout`/`_on` wrappers + `init(container, panel)` / `destroy()`) is completely domain-agnostic. Every view module follows this pattern identically.

---

## 3. What Changes Completely — Data + Domain Logic

### 3.1 data.js (50 KB → ~55-60 KB estimated)

This is the biggest rewrite. The entire data layer needs to be rebuilt with ACP-specific entities.

**CTG data.js contains:**
- 30 prospect records (contact center companies)
- Platform distribution data
- Feed entries (agent simulation)
- Helper methods (`getTierCounts`, `getPlatformDistribution`)

**ACP data.js will contain:**

#### A. Acquisition Target Records (~25-30 targets)

Each target is a hypothetical B2B company fitting ACP's stated criteria ($3-15M EBITDA, EV ≤ $150M, North America, B2B niche leader with recurring demand).

```
Target Object Shape:
{
  id: Number,
  company: String,                    // e.g., "Apex Compliance Services"
  sector: String,                     // One of ACP's 4 lanes
  subsector: String,                  // e.g., "TIC", "Vertical SaaS", "MRO Distribution"
  location: String,                   // e.g., "Cleveland, OH"
  ebitda: String,                     // e.g., "$8.2M"
  ebitdaNum: Number,                  // For calculations
  revenue: String,                    // e.g., "$42M"
  evEstimate: String,                 // e.g., "$65M"
  equityCheck: String,               // e.g., "$35M"
  tier: String,                       // HOT | WARM | NURTURE | STRATEGIC
  convictionScore: Number,            // 0-100 (replaces CTG "score")

  signals: [String],                  // Acquisition signals
  signalColors: [String],            // Token colors per signal

  thesisFactors: {                   // Replaces strainFactors (6 weighted dimensions)
    sectorFit: Number,               // How well it fits ACP's lane criteria (20%)
    managementQuality: Number,       // Leadership depth + continuity potential (20%)
    growthRunway: Number,            // Organic + add-on expansion headroom (15%)
    ebitdaQuality: Number,           // Recurring/mission-critical + margin profile (20%)
    dealComplexity: Number,          // Inverse: simpler = higher score (15%)
    competitiveProcess: Number       // Proprietary vs. auction dynamics (10%)
  },

  platformAttributes: [String],      // e.g., ["Recurring Revenue", "Niche Leader", "Regulatory Moat"]
  addOnPipeline: Number,             // Estimated add-on opportunities in market
  sellerMotivation: String,          // e.g., "Founder succession", "Growth capital", "Carve-out"
  keyIntelligence: [{label, value}], // Detail panel key-value pairs
  notes: String                      // Thesis narrative
}
```

**Signal taxonomy (replaces CTG's CCAAS MIGRATION, RFP ACTIVE, etc.):**

| Signal | Color | Meaning |
|--------|-------|---------|
| FOUNDER SUCCESSION | emerald | Owner approaching retirement/liquidity event |
| PLATFORM FATIGUE | red | Growth ceiling hit, needs operational partner |
| REGULATORY TAILWIND | blue | Compliance-driven demand acceleration |
| ADD-ON MAGNET | violet | Fragmented market with clear bolt-on targets |
| CARVE-OUT CANDIDATE | amber | Corporate parent divesting non-core division |
| MANAGEMENT UPGRADE | teal | Strong business, leadership gap creates opportunity |
| RECURRING MOAT | emerald | Mission-critical + contractual recurring revenue |
| SECTOR CONSOLIDATOR | red | Natural platform for buy-and-build |

#### B. Portfolio Company Records (~15 from research)

Real ACP portfolio companies from the deep research, used in the Portfolio Intelligence module:

```
Portfolio Object Shape:
{
  id: Number,
  company: String,              // e.g., "E Source"
  sector: String,
  description: String,
  hq: String,
  investmentDate: String,
  exitDate: String | null,
  addOns: Number,               // From research (E Source: 14, VetEvolve: 19, etc.)
  status: "ACTIVE" | "EXITED",
  keyMetric: String             // e.g., "14 add-ons closed"
}
```

#### C. Competitor Profiles (~7 from research)

Real LMM PE peers from the deep research:

```
Competitor Object Shape:
{
  name: String,                 // e.g., "Blue Point Capital Partners"
  segmentFit: String,           // "Direct LMM Peer" | "Adjacent LMM Peer"
  targetSize: String,           // Their stated criteria
  sectors: String,
  differentiation: String,      // Their positioning language
  threatLevel: "HIGH" | "MEDIUM" | "LOW"
}
```

#### D. Value Creation Toolkit

ACP's stated operating model resources:

```
Toolkit Object Shape:
{
  category: String,     // "Go-to-Market" | "Talent" | "Technology" | "M&A"
  items: [String],      // Specific tools/resources
  owner: String,        // e.g., "Sally Schriner, Chief Marketing Advisor"
  evidence: String      // Source from deep research
}
```

#### E. Fund Economics

```
Fund data:
- Fund I: $325M (Sep 2016)
- Fund II: $450M (Feb 2020)
- Fund III: $620M (Oct 2022)
- Align Collaborate Fund I: $233M
- Total AUM: $1.8B
- Equity check range: $20-60M
- Target EBITDA: $3-15M
- Target EV: ≤ $150M
```

#### F. Roadmap Phases

4-phase implementation roadmap for "building an ACP-grade deal sourcing intelligence platform":

```
Phase 0: Foundation (Weeks 1-2) — Data architecture, signal taxonomy, scoring engine
Phase 1: Pipeline Intelligence (Weeks 3-6) — Target identification, qualification, thesis development
Phase 2: Value Creation Engine (Weeks 7-10) — Post-close modeling, add-on economics, EBITDA bridge
Phase 3: Portfolio Intelligence (Weeks 11-14) — Performance tracking, exit readiness, sector concentration
```

---

## 4. The 7 ACP Modules — Detailed Design

### Module 1: Command Center (`#command-center`)

**Replaces:** CTG Command Center (pipeline overview)
**Accent:** Cyan (ACP brand)

**CTG → ACP mapping:**

| CTG Element | ACP Element |
|-------------|-------------|
| TAM ($2.4B) | AUM ($1.8B Committed Capital) |
| HOT Prospects (9) | HOT Deals (count from target data) |
| Decision Window (14 months) | Active Pipeline ($XXM aggregate EV) |
| Commission Potential | Deployment Capacity (remaining Fund III) |
| Market Pulse (vendors, categories, hours) | Fund Pulse (sectors, avg EBITDA, avg equity check) |
| Pipeline table (score, company, industry, agents, platform) | Deal Pipeline table (conviction, company, sector, EBITDA, EV, signal, tier) |
| Technology Mix chart (platform distribution) | Sector Allocation chart (deals by ACP lane) |
| Intelligence Feed (agent entries) | Intelligence Feed (sourcing agent entries) |

**Architecture:** Identical structure. KPICards up top, FilterTabBar for tiers, DataTable for pipeline, right panel for sector chart + feed. The init/destroy pattern, timer management, and component composition are copy-paste with data swaps.

**Structural changes:** None. This is a data-swap module.

---

### Module 2: Deal Pipeline (`#deal-pipeline`)

**Replaces:** Pipeline Intel (prospect detail view)
**Accent:** Emerald/Amber/Red (by tier)

**CTG → ACP mapping:**

| CTG Element | ACP Element |
|-------------|-------------|
| Prospect cards (score, company, location, tier, signals) | Target cards (conviction, company, sector, EBITDA, tier, signals) |
| CircularScore (0-100) | CircularScore (0-100 conviction) |
| Signal badges (CCAAS MIGRATION, etc.) | Signal badges (FOUNDER SUCCESSION, etc.) |
| Stats: Agents, Platform, Annual Spend, Expiry | Stats: EBITDA, Revenue, EV Estimate, Equity Check |
| Detail panel: radar chart of strain factors | Detail panel: radar chart of thesis factors |
| Strain breakdown: 6 bars | Thesis breakdown: 6 bars (Sector Fit, Mgmt Quality, Growth Runway, EBITDA Quality, Deal Complexity, Competitive Process) |
| CTG Service Alignment tags | Platform Attributes tags (Recurring Revenue, Niche Leader, etc.) |
| Key Intelligence pairs | Key Intelligence pairs (seller motivation, contact path, etc.) |

**Architecture:** Identical structure. Card grid on left, detail panel on right triggered by card click. RadarChart axes relabeled. The filtering, sorting, and detail expansion logic is structurally identical.

**Structural changes:** Radar chart axis labels change. Data field names change. Visual layout identical.

---

### Module 3: Thesis Engine (`#thesis-engine`)

**Replaces:** Strain Simulator (what-if scoring)
**Accent:** Emerald

**CTG → ACP mapping:**

| CTG Element | ACP Element |
|-------------|-------------|
| 6 sliders: Vendors, Complexity, Expertise, Timeline, Compliance, Stakeholders | 6 sliders: Sector Fit, Management Quality, Growth Runway, EBITDA Quality, Deal Complexity, Competitive Process |
| Weighted score (same formula: 20/20/15/20/15/10) | Weighted conviction score (same formula) |
| Presets: Enterprise CCaaS, AI-First CC, Healthcare, BPO | Presets: Platform TIC, Vertical SaaS, Professional Services Rollup, Specialty Distribution |
| Severity badge (CRITICAL/HIGH/MODERATE/LOW) | Conviction badge (STRONG BUY / BUY / HOLD / PASS) |
| Hours Saved, Demos Avoided | Estimated IRR Range, Multiple Range |
| Radar chart (color by severity) | Radar chart (color by conviction) |
| Recommended Action callout | Investment Thesis Summary callout (dynamic narrative) |

**Architecture:** Identical structure. Six RangeSliders drive live panel updates. Presets animate sliders to values. The score calculation formula is literally the same weighted average — just different labels.

**Key enhancement:** The "Recommended Action" callout becomes an auto-generated investment thesis paragraph that changes based on slider positions. E.g., high sector fit + high EBITDA quality + high management score = "Strong platform candidate for [sector lane]. Thesis: [auto-narrative]."

**Structural changes:** Label swaps only. The preset values and narratives are new, but the slider → score → panel update pipeline is identical.

---

### Module 4: Value Creation (`#value-creation`)

**Replaces:** Revenue Model (commission projections)
**Accent:** Violet

This is the most significant logic rewrite, though the UI structure (sliders on left, live calculations on right) is identical.

**CTG → ACP mapping:**

| CTG Element | ACP Element |
|-------------|-------------|
| Slider: New Partnerships (1-20) | Slider: Platform EBITDA at Entry ($3-15M) |
| Slider: Avg Seats per Deal (100-2000) | Slider: Add-on Acquisitions (0-15) |
| Slider: License Cost/Seat/Month ($50-300) | Slider: Organic Growth Rate (0-25%) |
| Slider: CTG Commission Rate (5-25%) | Slider: Margin Expansion (0-500 bps) |
| Year 1 Annual Commission | Entry EBITDA → Exit EBITDA Bridge |
| Perpetual Revenue Stack (Yr 1, 2, 3) | 5-Year Value Creation Waterfall |
| Per-Deal Economics table | Per-Platform Economics table (entry multiple, exit multiple, equity check, gross return) |
| Commission Split bar (80/20) | EBITDA Bridge bar (organic + add-on + margin expansion) |
| Perpetual Model callout | Buy-and-Build Thesis callout |

**New calculations:**

```
Entry EBITDA = slider value
Add-on EBITDA contribution = addOns × avgAddOnEBITDA (configurable)
Organic growth EBITDA = entryEBITDA × (1 + growthRate)^years
Margin expansion EBITDA = revenue × bpsImprovement
Exit EBITDA = organic + addOn + marginExpansion
Entry EV = entryEBITDA × entryMultiple (e.g., 7x)
Exit EV = exitEBITDA × exitMultiple (e.g., 8-10x)
Gross return = exitEV / equityCheck
MOIC = grossReturn (simplified)
```

**Architecture:** Same slider → panel update pattern. RangeSliders on left, KPICards + calculated breakdown on right. The math changes completely but the UI composition is identical.

---

### Module 5: AI Sourcing Architecture (`#ai-sourcing`)

**Replaces:** Agent Architecture (4-agent system)
**Accent:** Blue/Violet/Amber/Red

**CTG → ACP mapping:**

| CTG Agent | ACP Agent | Color | Role |
|-----------|-----------|-------|------|
| Scout (data gathering) | Signal Hunter | Blue | Monitors founder liquidity events, platform fatigue signals, regulatory triggers |
| Analyst (signal scoring) | Deal Qualifier | Blue | Scores targets against ACP criteria ($3-15M EBITDA, sector fit, recurring demand) |
| Strategist (engagement) | Thesis Builder | Violet | Generates investment thesis narratives, identifies value creation levers |
| (new) | Value Modeler | Amber | Projects EBITDA bridges, add-on economics, exit scenarios |
| Monitor (threat tracking) | Portfolio Monitor | Red | Tracks portfolio company performance, flags exit readiness, sector concentration |

**Architecture:** Identical. Four (or five) agent cards on left, chain simulation panel on right. The Run/Pause/Resume state machine, feed entry animation (300ms opacity transition), and timestamped action text all transfer directly. Only the agent names, descriptions, and simulation text entries change.

**Enhancement:** Add a 5th agent (Value Modeler) — requires adding one more card to the grid. The chain simulation feed would include entries like:
- SIGNAL HUNTER: "Detected founder succession signal at Apex Compliance Services — owner is 62, no identified successor"
- DEAL QUALIFIER: "Scoring against ACP criteria: $8.2M EBITDA ✓, Industrial Services TIC lane ✓, recurring compliance cadence ✓"
- THESIS BUILDER: "Generating platform thesis: Regional TIC consolidation play with 12 identified bolt-on targets in Southeast"

---

### Module 6: Competitive Landscape (`#competitive-landscape`)

**Replaces:** Competitive Map (displacement analysis)
**Accent:** Amber

**CTG → ACP mapping:**

| CTG Element | ACP Element |
|-------------|-------------|
| Competitor cards (DIY, Consultancies, TSDs, BPOs) | Competitor cards (Blue Point, Benford, HCI, Halifax, Rotunda, CenterGate, Incline) |
| Threat badge (HIGH/MEDIUM/LOW) | Overlap badge (DIRECT PEER / ADJACENT / TANGENTIAL) |
| Market share % | Target overlap % (estimated) |
| Strengths (+ green) | Where They Compete (from research) |
| Vulnerabilities (− red) | ACP Advantage (from research differentiation analysis) |
| Where CTG Wins callout | Where ACP Wins callout |
| 3 metrics (Time, Cost, Coverage) | 3 metrics (Speed, Toolkit Depth, Deal Volume) |

**Architecture:** Identical. Competitor cards in main content area. The card structure (name, badge, description, strengths, vulnerabilities, callout, metrics) is the same pattern. Data comes from the research's competitor comparison table — real firms with real positioning language.

**Data advantage:** The deep research provides actual competitor criteria, differentiation language, and sector focus for all 7 peers. This is not hypothetical.

---

### Module 7: Portfolio Intelligence (`#portfolio-intel`)

**Replaces:** Build Roadmap (phase timeline)
**Accent:** Cyan

This is the most conceptually different module. Instead of a build roadmap, this shows ACP's actual portfolio performance.

**Design approach:** Reuse the Build Roadmap's expandable phase UI pattern, but repurpose it for portfolio company cards.

| Build Roadmap Element | Portfolio Intelligence Element |
|----------------------|-------------------------------|
| Phase cards (Phase 0, 1, 2, 3) | Sector lane cards (Software/TES, Professional Services, Industrial Services, Specialty M&D) |
| Phase click → detail panel | Lane click → portfolio companies in that lane |
| Status badge (IN PROGRESS) | Status badge (X ACTIVE / Y EXITED) |
| Duration, Investment | Aggregate EBITDA, Total Add-ons |
| Task grid | Portfolio company grid (per lane) |
| Key Metrics | Lane metrics (avg hold, avg add-ons, notable exits) |

**Panel content when a portfolio company is selected:**
- Company name + sector
- Investment date + exit date (if applicable)
- Add-on count (from research: E Source 14, VetEvolve 19, Proceed 12, etc.)
- Business description
- Status: ACTIVE or EXITED

**Alternative: Keep Build Roadmap as-is** with ACP-specific phases describing how the intelligence platform itself would be built. This preserves the "here's how I'd build this for you" narrative that's powerful in job interviews.

**Recommendation:** Build BOTH. Use a tab toggle at module level — "Portfolio View" and "Build Roadmap" — reusing the same panel structure with different data. The FilterTabBar component already supports this pattern.

---

## 5. CSS Changes — Minimal

### obsidian.css Token Updates

| Token | CTG Value | ACP Value | Rationale |
|-------|-----------|-----------|-----------|
| `--emerald` | `#34D399` | Keep or shift to `#06B6D4` (cyan) | ACP doesn't have a strong brand color; cyan reads "finance/institutional" |
| Other tokens | Unchanged | Unchanged | The design system is domain-agnostic |

**Option A: Keep emerald.** The green reads as "growth" which is on-brand for PE. Minimal changes.
**Option B: Shift to cyan/teal.** More institutional, differentiates from CTG. Requires updating `--emerald` token value only — all references via `var(--emerald)` cascade automatically.

### Module CSS Files

All 7 module CSS files (`command-center.css`, `pipeline-intel.css`, etc.) contain **zero domain-specific styling**. They define layout grids, card arrangements, and spacing — all using design tokens. These files can be:
1. Renamed to match new module names (e.g., `pipeline-intel.css` → `deal-pipeline.css`)
2. Content copied as-is or with minor grid adjustments

Estimated CSS change: < 5% of total CSS.

---

## 6. Branding Changes

### index.html

| Element | CTG | ACP |
|---------|-----|-----|
| `<title>` | CTG Sourcing Intelligence | ACP Deal Intelligence Platform |
| Sidebar brand | CTG INTELLIGENCE | ACP INTELLIGENCE |
| Sidebar subtitle | Sourcing Intelligence Platform | Deal Sourcing Intelligence |
| Nav labels | Command Center, Pipeline Intel, Strain Simulator, Revenue Model, Agent Architecture, Competitive Map, Build Roadmap | Command Center, Deal Pipeline, Thesis Engine, Value Creation, AI Sourcing, Competitive Landscape, Portfolio Intel |
| Status bar title | SOURCING INTELLIGENCE | DEAL INTELLIGENCE |
| Footer quote | Could reference ACP's "speed and certainty" positioning |

### shell.js

Update status bar KPI labels:
- "HOT" → "HOT DEALS" (or keep "HOT")
- "WARM" → "WARM" (same)
- "PIPELINE" value → aggregate EV instead of dollar commission

---

## 7. File-by-File Change Matrix

| File | Change Type | Effort | Description |
|------|------------|--------|-------------|
| **Infrastructure (0% logic change)** | | | |
| `index.html` | Text swap | 15 min | Rebrand CTG → ACP, update nav labels |
| `obsidian.css` | 1 token | 5 min | Optionally shift primary accent |
| `shell.css` | None | 0 | Domain-agnostic layout |
| `components.css` | None | 0 | Domain-agnostic styles |
| `shared-components.js` | None | 0 | All 11 components are reusable |
| `shell.js` | Label swap | 10 min | Update status bar text |
| `app.js` | Registry update | 15 min | New module IDs, hash routes, accent colors |
| `netlify.toml` | None | 0 | Same deployment config |
| **Data Layer (100% rewrite)** | | | |
| `data.js` | Full rewrite | 4-6 hrs | 25-30 targets, 15 portfolio cos, 7 competitors, fund economics, toolkit, roadmap |
| **View Modules (data swap + label changes)** | | | |
| `command-center.js` | Data swap | 1-2 hrs | Same structure, different KPI labels + field names |
| `deal-pipeline.js` (was pipeline-intel) | Data swap | 1-2 hrs | Same card+detail pattern, different fields + radar labels |
| `thesis-engine.js` (was strain-simulator) | Label swap | 1-2 hrs | Same 6-slider→score pattern, different labels + presets |
| `value-creation.js` (was revenue-model) | Logic rewrite | 2-3 hrs | Same slider→panel pattern, new financial calculations |
| `ai-sourcing.js` (was agent-architecture) | Data swap | 1-2 hrs | Same agent cards + chain sim, different names + text |
| `competitive-landscape.js` (was competitive-map) | Data swap | 1-2 hrs | Same card structure, real competitor data from research |
| `portfolio-intel.js` (was build-roadmap) | Partial rewrite | 2-3 hrs | Repurpose expandable phase UI for portfolio lanes |
| **Module CSS (rename + minor tweaks)** | | | |
| 7 module CSS files | Rename + minor | 30 min | Rename files, adjust grid if needed |

**Total estimated effort: 15-22 hours**

---

## 8. Execution Sequence

### Phase 1: Infrastructure (2 hours)

1. Copy `ctg-intel-platform/` → `acp-intel-platform/`
2. Update `index.html` branding
3. Update `app.js` module registry (new IDs, routes, accents)
4. Update `shell.js` status bar labels
5. Optionally adjust `--emerald` in `obsidian.css`
6. Rename CSS files to match new module names
7. Verify: `python3 -m http.server 8000` → loads shell with sidebar + empty content

### Phase 2: Data Layer (4-6 hours)

1. Build target records (25-30 hypothetical B2B companies matching ACP criteria)
   - Distribute across 4 sector lanes
   - Assign tiers (HOT/WARM/NURTURE/STRATEGIC)
   - Score with thesisFactors (6 dimensions)
   - Attach signals from taxonomy
2. Build portfolio records from deep research (15 companies)
3. Build competitor records from deep research (7 firms)
4. Build fund economics constants
5. Build toolkit data
6. Build roadmap phases
7. Implement helper methods (`getTierCounts`, `getSectorDistribution`, etc.)
8. Verify: `window.Data` accessible in console with correct structure

### Phase 3: Module Adaptation (8-12 hours)

Build in this order (each module independently testable):

1. **Command Center** — Fastest to adapt, proves data layer works
2. **Deal Pipeline** — Validates card+detail pattern with new fields
3. **Thesis Engine** — Validates slider→score pattern with new labels
4. **Competitive Landscape** — Data swap with real research data
5. **AI Sourcing** — Agent card + simulation text swap
6. **Value Creation** — New financial calculations (most complex logic)
7. **Portfolio Intelligence** — Most structural change (may reuse roadmap + add portfolio view)

### Phase 4: Polish + Deploy (1-2 hours)

1. Run verification checklist (no hardcoded colors, no raw timers, no raw listeners)
2. Test all 7 modules: forward navigation, backward navigation, destroy() cleanup
3. Console: zero errors across all modules
4. Deploy to Netlify (new site: `acpintelplatform.netlify.app` or similar)

---

## 9. Data Credibility Strategy

The deep research gives us enough real data to make this demo *actually credible* to PE professionals:

**Real data we can use directly:**
- ACP's 4 sector lanes with exact subsectors and criteria language
- 26 portfolio companies with investment dates, exit dates, add-on counts
- $1.8B AUM, Fund I/II/III sizes, Align Collaborate Fund I
- $3-15M EBITDA target, $20-60M equity check, EV ≤ $150M
- 7 competitor firms with stated criteria and differentiation
- ACP's toolkit components (sales playbook, pricing experts, etc.)
- Team structure (Senior Operating Partner, Talent Partner, Chief Marketing Advisor)
- Speed/certainty positioning language
- Buy-and-build statistics (125+ acquisitions, 95+ add-ons)

**What we fabricate (clearly labeled as demonstration):**
- The 25-30 acquisition targets (hypothetical companies, but built to match ACP's actual criteria)
- Conviction scores and thesis factor weights
- AI agent simulation text
- Financial model calculations (based on realistic LMM PE economics)

**Key principle:** Use real ACP data wherever possible. Fabricate only the prospective deal pipeline. This makes the demo defensible in an interview — "the portfolio data, fund economics, and competitive set are all researched; the pipeline targets are hypothetical demonstrations of how the scoring engine would work."

---

## 10. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Value Creation math feels unrealistic to PE audience | Medium | High | Use standard LMM PE economics (6-8x entry, 8-10x exit, 15-25% organic CAGR). Add "illustrative only" disclaimer. |
| Target companies too obviously fake | Medium | Medium | Use plausible company names, realistic EBITDA ranges, and sector-appropriate descriptions. Reference real subsectors from ACP's criteria. |
| Module 7 (Portfolio Intel) scope creep | Medium | Low | Start with Build Roadmap structure, add portfolio view as enhancement. Don't over-engineer. |
| Brand color debate delays execution | Low | Low | Ship with emerald first. Recolor is a single token change — can be done in 5 minutes anytime. |

---

## 11. Success Criteria

The ACP platform is "done" when:

- [ ] All 7 modules load without console errors
- [ ] Forward/backward navigation across all modules — zero timer leaks
- [ ] destroy() fires cleanly on every module switch
- [ ] Data layer contains credible ACP-specific data backed by deep research
- [ ] A PE professional looking at this would recognize the deal sourcing workflow
- [ ] Financial calculations in Value Creation module produce realistic LMM PE economics
- [ ] Competitive landscape uses real competitor data (not placeholders)
- [ ] Portfolio Intelligence shows real ACP portfolio companies with accurate add-on counts
- [ ] Total JS < 80 KB, total CSS < 40 KB
- [ ] Deployed to Netlify and accessible via public URL
- [ ] Zero hardcoded colors, zero raw timers, zero raw listeners (verification grep passes)

---

## 12. Dual-Purpose Positioning

### For ACP specifically:
"I built a deal sourcing intelligence platform modeled on your investment criteria, portfolio patterns, and competitive positioning — using researched data from your public materials. This demonstrates the kind of operational intelligence tooling I can build for PE firms."

### For your portfolio:
"This is the second vertical demonstration of the Cortex architecture — the same zero-dependency vanilla JS SPA pattern deployed for contact center operations (ISPN/NovaTech) now adapted to PE deal sourcing in under 20 hours. The architecture is domain-agnostic; the data layer is the only variable."

### For any PE firm:
Genericize the branding to "LMM PE Intelligence Platform" and swap the data layer for any firm's criteria. The pattern is infinitely reusable.
