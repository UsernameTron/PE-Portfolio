# ACP Signal Enrichment Prompt

## Objective

Enhance the ACP Intelligence Platform data layer (`data.js`) by replacing flat signal label strings with **simulated signal detection results** — complete with source attribution, confidence scoring, detection timestamps, evidence chains, and sub-signal decomposition. Every prospect record should look like it came from a live intelligence pipeline, not a manually tagged spreadsheet.

This prompt generates the enriched data structures. No APIs are called. All results are fabricated but built to match what real detection pipelines would produce at ACP's target market ($3-15M EBITDA, B2B, North America, 4 sector lanes).

---

## Context Files Required

Read these before generating anything:

1. `/sessions/magical-busy-brown/mnt/CTG_Signal_Detection_App copy/ACP_Adaptation_Plan.md` — Module architecture, data model, signal taxonomy, prospect object shape
2. `/sessions/magical-busy-brown/mnt/CTG_Signal_Detection_App copy/ctg-intel-platform/js/data.js` — Current CTG data structure (pattern reference for helper methods, feed entries, etc.)
3. `/sessions/magical-busy-brown/mnt/CTG_Signal_Detection_App copy/ctg-intel-platform/js/shared-components.js` — Component API (what data shapes the UI can render)
4. `/sessions/magical-busy-brown/mnt/CTG_Signal_Detection_App copy/CLAUDE.md` — Architecture rules (design tokens, module contract, no hardcoded values)

---

## Signal Detection Architecture (Simulated)

Each of the 8 signals operates as an independent detection pipeline with 3 layers:

### Layer 1: Source Ingestion
Raw data from APIs/feeds. Each source has a `provider`, `lastPull` timestamp, and `confidence` modifier.

### Layer 2: Signal Inference
Pattern matching + LLM classification on ingested data. Produces a `signalScore` (0-100) and `evidence[]` array.

### Layer 3: Conviction Integration
Signals feed into the prospect's `convictionScore` via weighted factors. Multiple signals on one prospect compound conviction.

---

## Enriched Data Structures to Generate

### A. Signal Detection Result Object (new — embedded in each prospect)

Every signal assigned to a prospect must include a detection result object instead of just a string label:

```javascript
// BEFORE (current plan — flat labels):
signals: ["FOUNDER SUCCESSION", "RECURRING MOAT"],
signalColors: ["emerald", "emerald"],

// AFTER (enriched — simulated detection results):
signals: [
  {
    type: "FOUNDER_SUCCESSION",
    label: "FOUNDER SUCCESSION",
    color: "emerald",
    confidence: 0.87,           // 0.0-1.0 detection confidence
    detectedAt: "2026-02-18",   // ISO date of detection
    lastVerified: "2026-02-24", // Last re-check
    status: "ACTIVE",           // ACTIVE | STALE | EXPIRED | DISMISSED
    sources: [
      { provider: "LinkedIn Sales Navigator", dataPoint: "Founder Robert Ames, age 63, CEO since 2002 (24yr tenure)", confidence: 0.92 },
      { provider: "Google News", dataPoint: "Ames keynoted 'Legacy & Liquidity' panel at ACG Cleveland, Jan 2026", confidence: 0.78 },
      { provider: "Axial Network", dataPoint: "Company appeared in intermediary Brentwood Growth Partners pipeline, Q4 2025", confidence: 0.91 }
    ],
    subSignals: {
      founderAge: { value: 63, threshold: 55, score: 85 },
      tenure: { value: 24, threshold: 20, score: 90 },
      behavioralIndicators: { value: 2, threshold: 1, score: 80, details: ["Exit planning conference attendance", "Retained M&A advisor"] },
      successorIdentified: { value: false, score: 95 }  // No successor = higher signal
    },
    narrative: "Robert Ames (63) has led Apex Compliance for 24 years with no identified successor. Recent engagement with exit planning events and retention of Brentwood Growth Partners as intermediary suggest active succession timeline. High-probability liquidity event within 18-24 months."
  },
  {
    type: "RECURRING_MOAT",
    label: "RECURRING MOAT",
    color: "emerald",
    confidence: 0.94,
    detectedAt: "2026-01-12",
    lastVerified: "2026-02-22",
    status: "ACTIVE",
    sources: [
      { provider: "Company Website Analysis (Claude API)", dataPoint: "Pricing page shows annual compliance retainer model, avg contract 3-5 years", confidence: 0.96 },
      { provider: "IBISWorld", dataPoint: "TIC industry avg customer retention: 89%, Apex estimated 93%+ based on client testimonials", confidence: 0.88 },
      { provider: "PrivCo", dataPoint: "Revenue classified as 82% recurring, 18% project-based", confidence: 0.91 }
    ],
    subSignals: {
      recurringPct: { value: 82, threshold: 60, score: 95 },
      avgContractLength: { value: 4.2, threshold: 2, score: 90, unit: "years" },
      switchingCost: { value: "HIGH", score: 92, details: "Regulatory certification transfer requires 6-12 month re-qualification" },
      missionCritical: { value: true, score: 98, details: "OSHA/EPA compliance — legally mandated, cannot defer" }
    },
    narrative: "82% recurring revenue on multi-year compliance retainers. Regulatory certification creates 6-12 month switching barrier. Services are OSHA/EPA mandated — customers cannot defer or self-perform without regulatory risk."
  }
],
```

### B. Prospect Record (enriched — full example)

Generate 25-30 of these. Each must have 2-4 signal detection results with full evidence chains. Distribute across:
- 4 sector lanes (Software/TES, Professional Services, Industrial Services, Specialty Mfg/Distribution)
- 4 tiers (8 HOT, 12 WARM, 6 NURTURE, 4 STRATEGIC)
- 8 signal types (every signal should appear on at least 3 prospects)

```javascript
{
  id: 1,
  company: "Apex Compliance Services",
  sector: "Industrial Services",
  subsector: "Testing, Inspection & Certification (TIC)",
  location: "Cleveland, OH",
  ebitda: "$8.2M",
  ebitdaNum: 8200000,
  revenue: "$42M",
  evEstimate: "$65M",
  equityCheck: "$35M",
  tier: "HOT",
  score: 87,                          // convictionScore — HIGH = GOOD
  processStage: "Preliminary Diligence",

  signals: [ /* ...full detection result objects as shown above... */ ],

  convictionFactors: {
    sectorFit: 92,        // TIC is core ACP Industrial Services lane
    mgmtQuality: 68,      // Founder-dependent, thin bench — succession risk but also PE value-add opportunity
    growthRunway: 85,      // 12 identified bolt-on targets in Ohio/PA/WV corridor
    ebitdaQuality: 90,     // 82% recurring, compliance-mandated, multi-year contracts
    dealComplexity: 78,    // Founder-led = simpler process, no board/PE committee
    competitiveProc: 82    // Proprietary via Brentwood relationship, not broadly marketed
  },

  // Conviction factor derivation (shows WHERE the scores come from)
  convictionDerivation: {
    sectorFit: {
      score: 92,
      inputs: ["Exact ACP lane match: Industrial Services → TIC", "3 prior ACP investments in adjacent inspection verticals", "IBISWorld market growth: 6.2% CAGR"],
      weight: 0.20
    },
    mgmtQuality: {
      score: 68,
      inputs: ["Single-founder dependency (FOUNDER SUCCESSION signal)", "No CFO — controller-level finance function", "Strong ops director could step into #2 with support"],
      weight: 0.20
    },
    growthRunway: {
      score: 85,
      inputs: ["ADD-ON MAGNET signal: 12 targets within 150mi, avg $1.2M EBITDA", "Organic expansion into environmental testing (adjacent)", "Current geographic concentration = expansion headroom"],
      weight: 0.15
    },
    ebitdaQuality: {
      score: 90,
      inputs: ["RECURRING MOAT signal: 82% recurring revenue", "Mission-critical compliance services", "25%+ EBITDA margins, stable 5-year trend"],
      weight: 0.20
    },
    dealComplexity: {
      score: 78,
      inputs: ["Founder-owned, no PE/institutional investors", "Clean cap table, no mezzanine debt", "Minor: Environmental liability due diligence required"],
      weight: 0.15
    },
    competitiveProc: {
      score: 82,
      inputs: ["Proprietary sourcing via intermediary relationship", "Not in active auction", "Moderate risk: 2 other LMM PE firms known to track TIC space"],
      weight: 0.10
    }
  },

  thesisAlignments: ["Platform M&A", "Organic Geographic Expansion", "Service Line Extension"],
  addOnPipeline: 12,
  sellerMotivation: "Founder succession — Robert Ames (63), 24yr tenure, no successor identified",
  dealLead: "Managing Director, Industrial Services",
  sourceChannel: "Proprietary (Brentwood Growth Partners)",

  keyIntelligence: [
    { label: "Seller Motivation", value: "Founder succession (age 63, 24yr tenure)" },
    { label: "Source Channel", value: "Proprietary — Brentwood Growth Partners" },
    { label: "Process Stage", value: "Preliminary Diligence" },
    { label: "Revenue Model", value: "82% recurring compliance retainers" },
    { label: "EBITDA Margin", value: "25.3% (5yr avg: 24.8%)" },
    { label: "Add-On Density", value: "12 targets within 150mi corridor" },
    { label: "Key Risk", value: "Founder dependency — thin management bench" },
    { label: "Value Creation", value: "CFO hire + 3-4 bolt-ons in Year 1-2" }
  ],

  notes: "Apex is a textbook ACP Industrial Services platform. 82% recurring revenue on multi-year OSHA/EPA compliance retainers, 25%+ margins, and a fragmented Ohio/PA/WV TIC market with 12 identified bolt-on targets. Founder Robert Ames (63) has no succession plan and engaged Brentwood Growth Partners in Q4 2025 — signaling active liquidity timeline. Key risk is founder dependency; key opportunity is installing professional management (CFO, VP Sales) and executing 3-4 tuck-in acquisitions to build regional scale. Estimated exit at 8-9x on $14-16M combined EBITDA within 4-5 year hold."
}
```

### C. Signal Summary Statistics (new helper — for Command Center KPIs)

```javascript
Data.getSignalSummary = function() {
  // Returns aggregated signal detection stats
  return {
    totalActiveSignals: Number,        // Count of all ACTIVE signals across all prospects
    signalsByType: {                   // Count per signal type
      FOUNDER_SUCCESSION: Number,
      PLATFORM_FATIGUE: Number,
      REGULATORY_TAILWIND: Number,
      ADD_ON_MAGNET: Number,
      CARVE_OUT_CANDIDATE: Number,
      MANAGEMENT_UPGRADE: Number,
      RECURRING_MOAT: Number,
      SECTOR_CONSOLIDATOR: Number
    },
    avgConfidence: Number,             // Average confidence across all active signals
    signalsDetectedThisWeek: Number,   // Signals with detectedAt in last 7 days
    staleSignals: Number               // Signals not re-verified in 30+ days
  };
};
```

### D. Intelligence Feed Entries (enriched — simulated agent outputs)

Replace flat feed entries with signal-sourced intelligence:

```javascript
Data.feedEntries = [
  {
    agent: "SIGNAL HUNTER",
    color: "emerald",
    time: "2:34 PM",
    text: "New FOUNDER SUCCESSION signal detected: Robert Ames (63), Apex Compliance Services — engaged Brentwood Growth Partners as intermediary. Confidence: 0.87.",
    signalRef: { prospectId: 1, signalType: "FOUNDER_SUCCESSION" },
    priority: "HIGH"
  },
  {
    agent: "DEAL QUALIFIER",
    color: "blue",
    time: "2:31 PM",
    text: "Apex Compliance Services scored 87/100 conviction. Sector fit: 92, EBITDA quality: 90, Growth runway: 85. Recommending preliminary diligence.",
    signalRef: { prospectId: 1 },
    priority: "HIGH"
  },
  {
    agent: "THESIS BUILDER",
    color: "violet",
    time: "2:28 PM",
    text: "Investment thesis generated for Apex Compliance: Regional TIC consolidation play. Platform + 3-4 bolt-ons → $14-16M combined EBITDA, exit at 8-9x in Year 4-5.",
    signalRef: { prospectId: 1 },
    priority: "MEDIUM"
  },
  {
    agent: "VALUE MODELER",
    color: "amber",
    time: "2:22 PM",
    text: "EBITDA bridge modeled: Entry $8.2M → organic growth $9.8M → add-ons $5.2M → margin expansion $1.1M → exit EBITDA $16.1M. Projected MOIC: 3.4x.",
    signalRef: { prospectId: 1 },
    priority: "MEDIUM"
  },
  {
    agent: "PORTFOLIO MONITOR",
    color: "red",
    time: "1:45 PM",
    text: "Alert: REGULATORY TAILWIND signal strengthened for healthcare services targets — CMS final rule on staffing mandates published Feb 20. Affects 4 WARM pipeline targets.",
    signalRef: { signalType: "REGULATORY_TAILWIND", affectedCount: 4 },
    priority: "HIGH"
  },
  // Generate 3 more entries covering different prospects and signal types
];
```

### E. Agent Simulation Steps (enriched — signal-aware chain)

Each agent's simulation steps should reference actual signal detection results from the data:

```javascript
// In Data.agents, each agent's simulationSteps array should include:
{
  id: "signal-hunter",
  name: "Signal Hunter",
  // ...
  simulationSteps: [
    { text: "Scanning LinkedIn Sales Navigator for founder tenure > 20 years in Industrial Services sector...", delay: 1500 },
    { text: "MATCH: Robert Ames, CEO, Apex Compliance Services — 24yr tenure, age 63. No successor in org chart.", delay: 2000 },
    { text: "Cross-referencing Axial Network intermediary database... Brentwood Growth Partners listing detected Q4 2025.", delay: 1800 },
    { text: "Querying PrivCo revenue model: 82% recurring, $42M revenue, $8.2M EBITDA. Meets ACP criteria.", delay: 1500 },
    { text: "Running Census Bureau fragmentation analysis: 47 TIC firms within 150mi of Cleveland, avg $1.8M revenue.", delay: 2200 },
    { text: "SIGNAL COMPOSITE: FOUNDER_SUCCESSION (0.87) + RECURRING_MOAT (0.94) + ADD_ON_MAGNET (0.81). Routing to Deal Qualifier.", delay: 1200 },
    // Continue for 12-15 total steps across different prospects
  ]
}
```

---

## Generation Rules

### Signal Distribution Requirements

| Signal Type | Min Prospects | Target Tiers | Notes |
|-------------|--------------|-------------|-------|
| FOUNDER SUCCESSION | 5-7 | Mostly HOT/WARM | Primary deal trigger for LMM PE |
| PLATFORM FATIGUE | 3-5 | Mostly WARM | Often paired with MANAGEMENT UPGRADE |
| REGULATORY TAILWIND | 4-6 | Spread across tiers | Sector-specific — healthcare, environmental, financial compliance |
| ADD-ON MAGNET | 6-8 | Mostly HOT/WARM | Often paired with SECTOR CONSOLIDATOR |
| CARVE-OUT CANDIDATE | 2-3 | WARM/STRATEGIC | Rarer signal, higher complexity |
| MANAGEMENT UPGRADE | 4-6 | Mostly WARM/NURTURE | Often paired with PLATFORM FATIGUE |
| RECURRING MOAT | 8-10 | Spread across tiers | Most common signal — table stakes for ACP criteria |
| SECTOR CONSOLIDATOR | 3-5 | Mostly HOT | Composite signal — requires ADD-ON MAGNET + one other |

### Signal Combination Rules

Realistic combinations that would co-occur:
- FOUNDER SUCCESSION + RECURRING MOAT (classic PE deal: aging founder, strong recurring business)
- PLATFORM FATIGUE + MANAGEMENT UPGRADE (company needs both new leadership and operational refresh)
- ADD-ON MAGNET + SECTOR CONSOLIDATOR (fragmented market = consolidation opportunity)
- REGULATORY TAILWIND + RECURRING MOAT (compliance-driven demand + contractual stickiness)
- CARVE-OUT CANDIDATE + MANAGEMENT UPGRADE (divested unit needs standalone leadership)

Unrealistic combinations to avoid:
- FOUNDER SUCCESSION + CARVE-OUT CANDIDATE (founder-owned companies aren't corporate carve-outs)
- PLATFORM FATIGUE + SECTOR CONSOLIDATOR (if the platform itself is fatigued, it's not ready to be a consolidator)

### Confidence Score Realism

| Score Range | Interpretation | When to Use |
|-------------|---------------|-------------|
| 0.90-1.00 | Near-certain: multiple corroborating sources | SEC filing + press release + advisor confirmed |
| 0.75-0.89 | Strong: primary signal clear, supporting evidence present | LinkedIn data + behavioral indicator |
| 0.60-0.74 | Moderate: inference-based, needs verification | LLM classification + single data point |
| 0.40-0.59 | Weak: pattern match only, no hard evidence | Hiring pattern shift OR technographic signal alone |
| Below 0.40 | Should not appear in data — these would be filtered out |

### Source Provider Realism

Every `sources[]` entry must reference a real provider from the cost table in the signal detection breakdown. Use the appropriate provider for the data type:
- Executive/people data → LinkedIn, ZoomInfo
- Financial data → PrivCo, PitchBook, D&B
- Technology data → BuiltWith, HG Insights
- Regulatory data → Regulations.gov, Congress.gov, FiscalNote
- Market structure → Census Bureau, IBISWorld, Grata
- Deal activity → PitchBook, Axial, SourceScrub, Mergermarket
- Unstructured analysis → Claude API, Google News API

### Sector Lane Distribution (25-30 prospects)

| Lane | Count | Signal Emphasis |
|------|-------|-----------------|
| Software / Tech-Enabled Services | 7-8 | PLATFORM FATIGUE, RECURRING MOAT, SECTOR CONSOLIDATOR |
| Professional Services | 6-7 | FOUNDER SUCCESSION, MANAGEMENT UPGRADE, ADD-ON MAGNET |
| Industrial Services | 6-7 | REGULATORY TAILWIND, RECURRING MOAT, FOUNDER SUCCESSION |
| Specialty Manufacturing & Distribution | 5-6 | CARVE-OUT CANDIDATE, ADD-ON MAGNET, PLATFORM FATIGUE |

### Company Name Generation Rules

Generate plausible but obviously fictional company names. Pattern: `[Adjective/Geographic] + [Industry Term] + [Entity Type]`

Examples by lane:
- **Software/TES:** "Meridian Analytics Group", "Clearpath Data Systems", "Vertex Workflow Solutions"
- **Professional Services:** "Pinnacle Advisory Partners", "Trident Consulting Group", "Bridgepoint Engineering Services"
- **Industrial Services:** "Apex Compliance Services", "Summit Environmental Testing", "Ironclad Safety Solutions"
- **Specialty M&D:** "Cascade Precision Components", "Ridgeline Specialty Fasteners", "Keystone Fluid Systems"

Avoid names that match real companies. Do a mental check before using.

---

## UI Integration Notes

### What the UI Needs to Render

The enriched signal data must be backward-compatible with the current component API. The UI will use these fields:

**SignalBadge component:** Still reads `signal.label` and `signal.color` — the badge itself doesn't change visually. The enrichment is for the detail panel.

**Deal Pipeline detail panel (deal-pipeline.js):** When a prospect card is clicked, the detail panel should render:
- Signal badges (from `signal.label` + `signal.color`) — existing behavior
- NEW: Below each badge, show confidence score as a subtle percentage: `87% confidence`
- NEW: Expandable evidence section showing `signal.sources[].dataPoint` entries
- NEW: Signal narrative (`signal.narrative`) as a callout box below the evidence

**Command Center intelligence feed:** Feed entries now reference specific signals via `signalRef`. The UI can optionally link feed entries to prospect detail views.

**Thesis Engine:** When a preset is selected, the conviction derivation data could populate the "Investment Thesis Summary" callout with the prospect's actual `convictionDerivation` inputs instead of generic text.

### New Shared Component Needed: SignalDetailCard

```javascript
// Proposed — renders a single signal detection result in the detail panel
Components.SignalDetailCard = function(opts) {
  // opts.signal = full signal detection result object
  // Returns DOM element with:
  //   - Signal badge (type + color)
  //   - Confidence bar (0-100%)
  //   - Detection date + last verified
  //   - Sources list (provider + dataPoint)
  //   - Narrative text
  //   - Sub-signal breakdown (optional, collapsible)
};
```

This component would be added to `shared-components.js` and used by `deal-pipeline.js` in the detail panel.

---

## Output Requirements

Generate the complete `data.js` file containing:

1. **25-30 enriched prospect records** with full signal detection results (not flat labels)
2. **5 agent definitions** with signal-aware simulation steps (12-15 steps each)
3. **7 competitor profiles** with real PE firm data from the adaptation plan
4. **15 portfolio company records** from ACP research
5. **4 roadmap phases** (ACP-specific build timeline)
6. **4 sector lane summaries** with portfolio metrics
7. **8 enriched feed entries** referencing specific signal detections
8. **Helper methods:** `getTierCounts()`, `getSectorDistribution()`, `getAggregateEV()`, `getSignalSummary()`

Total estimated file size: 70-85 KB (up from 50 KB CTG version due to signal enrichment).

Follow all architecture rules from CLAUDE.md:
- `window.Data` global namespace
- All data as plain objects/arrays (no classes, no prototypes)
- Helper methods as `Data.methodName = function() {}`
- No external dependencies
- Numbers stored as both formatted strings AND raw numbers where needed for calculations

---

## Verification

After generating, confirm:
- Every prospect has 2-4 signals with full detection result objects
- Every signal type appears on at least 3 prospects
- No FOUNDER SUCCESSION + CARVE-OUT CANDIDATE combinations
- No confidence scores below 0.40
- Every `sources[].provider` references a real provider from the cost tables
- `getTierCounts()` returns correct counts matching tier assignments
- `getSectorDistribution()` returns counts matching sector assignments
- `getSignalSummary()` accurately aggregates signal data
- Feed entries reference valid prospect IDs and signal types
- Agent simulation steps reference providers and data types consistent with their role
