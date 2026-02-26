# ACP Intelligence Platform — Claude Code Implementation Plan

**Version:** 1.1 (augmented — design review applied)
**Generated:** 2026-02-25
**Author:** Pete Connor
**Target:** Netlify production deployment at `acp-intel-platform.netlify.app` (rename from ctg-intel-platform)
**Codebase:** `acp-intel-platform/` — Vanilla JS SPA, zero dependencies, zero build step

---

## INSTRUCTIONS FOR CLAUDE CODE

This document is a step-by-step engineering plan optimized for execution by Claude Code. Each phase contains explicit file paths, code changes, and verification commands. Execute phases sequentially — each phase has a verification gate that must pass before proceeding.

**Before starting any phase**, read these context files:

```
acp-intel-platform/js/data.js         # 1800-line data layer (30 prospects, 15 portfolio, 7 competitors)
acp-intel-platform/js/shared-components.js  # 11 reusable DOM constructors
acp-intel-platform/js/app.js          # Module registry, lazy loader, hash router
acp-intel-platform/css/obsidian.css   # Design system tokens
```

**Coding conventions (enforced — do not deviate):**

- `var` declarations (ES5 style throughout)
- DOM construction via `document.createElement`, not innerHTML for data values
- Every module is an IIFE exposing `{ init(container, panel), destroy() }`
- Every module tracks `_timers[]` and `_listeners[]`, cleans up in `destroy()`
- CSS custom properties for all design tokens — never hardcode colors/fonts
- No frameworks, no npm, no build tools, no external dependencies except Google Fonts
- **Field name lock:** The prospect conviction score field is `score` (NOT `convictionScore`). All 7 modules read `prospect.score`, `p.score`, `row.score`. The `ACP_Adaptation_Plan.md` uses `convictionScore` — that name is wrong. Do not rename the field.
- **Signal data contract:** The `signals[]` and `signalColors[]` arrays are flat strings read by the UI. The enriched `signalDetails[]` is a PARALLEL array added alongside them (Phase 4). Do NOT replace `signals[]` with objects — this contradicts the `ACP_Signal_Enrichment_Prompt.md` but is the correct backward-compatible approach.

---

## PHASE 0: CRITICAL DEPLOYMENT BLOCKERS (15 min)

### 0.1 Fix Netlify Cache Headers

**File:** `acp-intel-platform/netlify.toml`
**Issue:** Cache headers set `max-age=31536000, immutable` on unhashed filenames. Users will get stale CSS/JS indefinitely after first visit. This is the #1 deployment blocker.

**Current (BROKEN):**
```toml
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Replace with:**
```toml
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=3600, must-revalidate"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=3600, must-revalidate"
```

**Rationale:** 1-hour cache with revalidation. Files are unhashed, so immutable caching means bug fixes never reach users. This is the correct strategy for a no-build-step SPA.

### 0.2 Fix Module Load Error Swallowing

**File:** `acp-intel-platform/js/app.js`
**Issue:** Lines 36 and 49 — `link.onerror = resolve` and `script.onerror = resolve` silently swallow CSS/JS load failures. A missing file produces zero console output.

**Fix `injectCSS` (around line 32):**
```javascript
link.onerror = function() {
  console.error('[ACP] Failed to load CSS: ' + mod.css);
  resolve();
};
```

**Fix `injectJS` (around line 46):**
```javascript
script.onerror = function() {
  console.error('[ACP] Failed to load JS: ' + mod.js);
  resolve();
};
```

### 0.3 Add Race Condition Guard

**File:** `acp-intel-platform/js/app.js`
**Issue:** Rapid hash changes can queue multiple async module loads. If user clicks nav tabs quickly, two modules can try to initialize simultaneously.

**Add after line 15 (`var activeInstance = null;`):**
```javascript
var loadingId = null;
```

**Modify `loadModule` function to include guard and loading indicator:**
```javascript
function loadModule(id) {
  if (id === activeModule) return;
  loadingId = id;
  destroyCurrentModule();
  Shell.activateNavTab(id);

  // Loading indicator — prevents blank screen flash during async CSS/JS load
  contentMain.innerHTML = '<div style="padding:40px;color:var(--text-muted)" class="label-sm">Loading...</div>';

  injectCSS(id).then(function() {
    return injectJS(id);
  }).then(function() {
    if (loadingId !== id) return; // Guard: another load started
    contentMain.innerHTML = '';   // Clear loading indicator before init
    contentPanel.innerHTML = '';
    var mod = window.modules && window.modules[id];
    if (mod && typeof mod.init === 'function') {
      activeModule = id;
      activeInstance = mod;
      mod.init(contentMain, contentPanel);
    } else {
      contentMain.innerHTML = '<div style="padding:40px;color:var(--text-muted);">Module "' + id + '" not found.</div>';
    }
  });
}
```

### PHASE 0 VERIFICATION

```bash
# Verify netlify.toml has no immutable caching
grep -c "immutable" acp-intel-platform/netlify.toml
# Expected: 0

# Verify error logging exists
grep -c "console.error" acp-intel-platform/js/app.js
# Expected: 2

# Verify race condition guard exists
grep -c "loadingId" acp-intel-platform/js/app.js
# Expected: 3 (declaration + assignment + guard check)
```

---

## PHASE 1: MEMORY LEAK FIXES (45 min)

### 1.1 Fix Untracked Listeners in shared-components.js

**File:** `acp-intel-platform/js/shared-components.js`

**Problem:** FilterTabBar (line 189), DataTable row clicks (line 264), RangeSlider input (line 146), and ActionButton (line 220) all add event listeners that are never tracked for cleanup. When a module calls `destroy()`, these listeners persist on orphaned DOM nodes.

**Solution pattern:** Each component should accept an optional `trackerFn` in opts. When provided, the component registers its listeners through the tracker so the parent module can clean them up.

**Add this utility at the top of the IIFE (after `var C = {};`):**
```javascript
// Listener tracking helper — components call this to register cleanup
function trackListener(opts, el, event, handler) {
  el.addEventListener(event, handler);
  if (opts.onAddListener) {
    opts.onAddListener(el, event, handler);
  }
}
```

**Then update each component to use `trackListener` instead of raw `addEventListener`:**

**FilterTabBar (line 189):** Replace `btn.addEventListener('click', function() {` with `trackListener(opts, btn, 'click', function() {`

**DataTable row click (line 264):** Replace `tr.addEventListener('click', function() { opts.onRowClick(row); });` with `trackListener(opts, tr, 'click', function() { opts.onRowClick(row); });`

**RangeSlider input (line 146):** Replace `input.addEventListener('input', function() {` with `trackListener(opts, input, 'input', function() {`

**ActionButton (line 220):** Replace `if (opts.onClick) el.addEventListener('click', opts.onClick);` with `if (opts.onClick) trackListener(opts, el, 'click', opts.onClick);`

### 1.2 Wire Module _on() to Component Tracker

Each module already has an `_on(el, event, handler)` function that pushes to `_listeners[]`. Modules should pass this as `onAddListener` when constructing components:

**CRITICAL: The `onAddListener` callback must push objects with `target:` (not `el:`).** Every module's `destroy()` iterates `_listeners` using `l.target.removeEventListener(...)`. Using `{ el: el }` instead of `{ target: el }` causes `undefined.removeEventListener()` to throw, aborting cleanup of all remaining listeners — worse than no tracking at all.

**Example pattern for all modules:**
```javascript
var table = Components.DataTable({
  columns: [...],
  rows: [...],
  onRowClick: function(row) { buildDetail(row); },
  onAddListener: function(el, event, handler) {
    _listeners.push({ target: el, event: event, handler: handler });
  }
});
```

**Category A — Component listeners (use `onAddListener` pattern above):**

- `acp-intel-platform/js/command-center.js` — DataTable, FilterTabBar
- `acp-intel-platform/js/thesis-engine.js` — RangeSlider (6 instances)
- `acp-intel-platform/js/value-creation.js` — RangeSlider (4 instances)
- `acp-intel-platform/js/agent-architecture.js` — ActionButton (Run/Pause/Reset)
- `acp-intel-platform/js/portfolio-intel.js` — FilterTabBar

**Category B — Module-level listeners (use `_on()` directly):**

- `acp-intel-platform/js/deal-pipeline.js` — card click (line ~58), close button (line ~70)
- `acp-intel-platform/js/thesis-engine.js` — preset buttons (line ~112, raw `<button>`, not ActionButton)
- `acp-intel-platform/js/portfolio-intel.js` — timeline item clicks (line ~194)
- `acp-intel-platform/js/competitive-landscape.js` — card click listeners

### 1.3 Fix Agent Architecture Timer Leak

**File:** `acp-intel-platform/js/agent-architecture.js`
**Issue:** Recursive `_timeout(runSimulation, 1500)` can fire after `destroy()` if the timeout was set just before navigation.

**Fix:** Add a `_destroyed` flag checked at the top of `runSimulation`:
```javascript
var _destroyed = false;

function runSimulation() {
  if (_destroyed) return;
  // ... existing simulation logic
}

// In destroy():
function destroy() {
  _destroyed = true;
  _timers.forEach(clearTimeout);
  // ... rest of cleanup
}
```

### PHASE 1 VERIFICATION

```bash
# Verify trackListener utility exists
grep -c "trackListener" acp-intel-platform/js/shared-components.js
# Expected: 5+ (1 declaration + 4 component usages)

# Verify onAddListener pattern in modules
grep -c "onAddListener" acp-intel-platform/js/command-center.js
# Expected: 2+ (DataTable + FilterTabBar)

# Verify _destroyed flag in agent-architecture
grep -c "_destroyed" acp-intel-platform/js/agent-architecture.js
# Expected: 3 (declaration + check + set in destroy)
```

---

## PHASE 2: XSS HARDENING (30 min)

### 2.1 Add Text Escaping Utility

**File:** `acp-intel-platform/js/shared-components.js`
**Add after the `trackListener` utility:**

```javascript
// XSS-safe text escaping — cached element avoids createElement per call
var _escDiv = document.createElement('div');
function esc(str) {
  if (str == null) return '';
  _escDiv.textContent = String(str);
  return _escDiv.innerHTML;
}
```

**Note:** `_escDiv` is scoped inside the IIFE (no global pollution). Reusing a single detached element avoids 240+ `createElement` calls when rendering a DataTable with 30 rows.

### 2.2 Replace innerHTML Data Injections

**File:** `acp-intel-platform/js/shared-components.js`

**KPICard (line 12-14):** The `opts.value` and `opts.subtitle` are rendered via innerHTML. Escape them:
```javascript
el.innerHTML =
  '<span class="kpi-card-label label-sm">' + esc(opts.label) + '</span>' +
  '<span class="kpi-card-value display-' + (opts.size || 'lg') + '">' + esc(opts.value) + '</span>' +
  (opts.subtitle ? '<span class="kpi-card-subtitle body-sm">' + esc(opts.subtitle) + '</span>' : '');
```

**CalloutBox (line 209-211):** Escape title and text:
```javascript
el.innerHTML =
  (opts.title ? '<span class="callout-box-title label-sm">' + esc(opts.title) + '</span>' : '') +
  '<p class="callout-box-text body-sm">' + esc(opts.text) + '</p>';
```

**FeedEntry (line 287-291):** Escape agent name, time, and text:
```javascript
el.innerHTML =
  '<div class="feed-entry-header">' +
    '<span class="feed-entry-agent mono-sm" style="color:var(--' + esc(opts.color) + ');background:var(--' + esc(opts.color) + '-muted)">' + esc(opts.agent) + '</span>' +
    '<span class="feed-entry-time body-sm">' + esc(opts.time) + '</span>' +
  '</div>' +
  '<p class="feed-entry-text body-sm">' + esc(opts.text) + '</p>';
```

**DataTable format columns:** The `col.format` function returns raw HTML by design (allows badges). Document as intentional exception.

### 2.3 Fix Module-Level innerHTML Injections

**File:** `acp-intel-platform/js/deal-pipeline.js`
**Line ~162:** Key intelligence rendered via `innerHTML +=`. Replace with DOM construction:
```javascript
// AFTER (safe):
var intelItem = document.createElement('div');
intelItem.className = 'key-intel-item';
var intelLabel = document.createElement('span');
intelLabel.className = 'key-intel-label label-sm';
intelLabel.textContent = item.label;
var intelValue = document.createElement('span');
intelValue.className = 'key-intel-value body-sm';
intelValue.textContent = item.value;
intelItem.appendChild(intelLabel);
intelItem.appendChild(intelValue);
container.appendChild(intelItem);
```

**File:** `acp-intel-platform/js/competitive-landscape.js`
**Strengths/vulnerabilities:** Replace innerHTML rendering with DOM construction using `textContent`.

### PHASE 2 VERIFICATION

```bash
# Verify esc() utility exists
grep -c "function esc" acp-intel-platform/js/shared-components.js
# Expected: 1

# Verify esc() is used in components
grep -c "esc(" acp-intel-platform/js/shared-components.js
# Expected: 8+
```

---

## PHASE 3: ACP BRAND ALIGNMENT (1 hour)

### Context: ACP Brand Identity

From deep research, ACP's brand system is:

- **Primary color:** Amber #FAB30D (dominant brand accent)
- **Secondary:** Slate #373F4B, Charcoal #343434
- **Neutrals:** Warm cream #F2F1E3, Cool gray #B7BABD
- **Typography:** Open Sans 400/600/700 (body/UI), Karmina or serif (editorial)
- **Tone:** Warm, confident, partnership-oriented
- **Pillars:** Shared success, speed, early invest, B2B focus, buy & build, toolkit
- **Positioning:** "Transformational Growth Partners"
- **Motto:** "We do what we say we are going to do"

### 3.1 Design Token Decision

**OPTION A (Recommended for POC): Keep emerald as-is.**
- Emerald reads as "growth" — on-brand for PE
- ACP amber (#FAB30D) fails WCAG AA against white (contrast ratio 1.82:1)
- Changing primary accent cascades through every module — high regression risk

**OPTION B: Add ACP brand tokens alongside existing system.**
If brand-forward alignment is desired, add to `obsidian.css`:
```css
--acp-amber:      #FAB30D;
--acp-slate:      #373F4B;
--acp-amber-muted: rgba(250, 179, 13, 0.09);
```
Use `--acp-amber` for sidebar brand and CTA elements only. Keep `--emerald` for data viz.

### 3.2 Sidebar Brand Copy

**File:** `acp-intel-platform/index.html`
Update sidebar brand title to full firm name:
```html
<div class="sidebar-brand">
  <span class="sidebar-brand-title">ALIGN CAPITAL</span>
  <span class="sidebar-brand-sub">DEAL INTELLIGENCE</span>
</div>
```

Footer quote — use verified ACP positioning language:
```html
<blockquote class="sidebar-quote">
  "Speed and certainty. We move quickly and do what we say we are going to do."
</blockquote>
<span class="sidebar-attribution">ALIGN CAPITAL PARTNERS</span>
```

### 3.3 Status Bar Enhancement

**File:** `acp-intel-platform/index.html`
Enhance subtitle with verified ACP fund data:
```html
<div class="status-bar-left">
  <span class="status-bar-title">DEAL SOURCING INTELLIGENCE</span>
  <span class="status-bar-subtitle">$1.8B AUM · Fund III ($620M) · 125+ Acquisitions</span>
</div>
```

### 3.4 Data Layer Brand Consistency

**File:** `acp-intel-platform/js/data.js`
Verify these values match the ACP Identity deep research:

| Data Point | Required Value | Source |
|-----------|---------------|--------|
| Total AUM | $1.8B | ACP Identity |
| Fund III | $620M (Oct 2022) | ACP Identity |
| Total Acquisitions | 125+ | ACP Identity |
| Total Add-Ons | 95+ | ACP Identity |
| Equity Check Range | $20-60M | ACP Identity |
| Target EBITDA | $3-15M | ACP Identity |
| Target EV | ≤$150M | ACP Identity |
| Sector Lanes | 4: Software & TES, Professional Services, Industrial Services, Specialty M&D | ACP Identity |

### 3.5 Competitor Profile Accuracy

Verify 7 competitors match research:
- Blue Point Capital Partners (Direct LMM Peer, EBITDA >$5M, industrial/services/consumer)
- Benford Capital Partners (Direct LMM Peer, $3-20M EBITDA, niche leaders)
- HCI Equity Partners (Direct LMM Peer, founder-owned focus)
- The Halifax Group (Upper-LMM, $8-30M EBITDA, health/services)
- Rotunda Capital Partners (Adjacent LMM, EV $50-200M, distribution/services)
- CenterGate Capital (Adjacent LMM, $5-30M EBITDA, flexible capital)
- Incline Equity Partners (Adjacent LMM, services/distribution)

### 3.6 Portfolio Company Accuracy

Verify 15 portfolio companies against research. Critical add-on counts:
- E Source: 14 add-ons
- VetEvolve: 19 add-ons
- Proceed: 12 add-ons
- Alliance Technical Group: 11 add-ons
- Protegis Fire & Safety: 7 add-ons
- Marco Rubber: 7 add-ons
- Schneider Geospatial: 7 add-ons
- AKS Engineering: 7 add-ons

### 3.7 Replace CTG README

**File:** `acp-intel-platform/README.md`
**Issue:** Currently contains 576 lines of CTG contact center content. Visible on GitHub, confusing for viewers.

**Fix:** Replace with ACP-specific content (Overview, Architecture, Modules, Deployment). Swap all CTG terminology for ACP deal sourcing terminology. Content-only change, no code impact.

### PHASE 3 VERIFICATION

```bash
# Verify brand copy
grep "ALIGN CAPITAL" acp-intel-platform/index.html

# Verify fund economics
grep "totalAUM.*1800" acp-intel-platform/js/data.js

# Verify all 7 competitors
grep -c "threatLevel" acp-intel-platform/js/data.js
# Expected: 7

# Verify portfolio count
grep -c '"ACTIVE"\|"EXITED"' acp-intel-platform/js/data.js
# Expected: 15

# Verify README is ACP-branded
grep -c "contact center\|Cloud Tech\|CTG\|strain" acp-intel-platform/README.md
# Expected: 0
```

---

## PHASE 4: SIGNAL ENRICHMENT DATA LAYER (2-3 hours)

### Context

The Signal Enrichment architecture replaces flat signal labels with simulated detection results — complete with source attribution, confidence scoring, and evidence chains. This makes the POC look like a live intelligence pipeline.

### 4.1 Backward-Compatible Enrichment

**File:** `acp-intel-platform/js/data.js`

Keep existing `signals[]` and `signalColors[]` (UI reads these). Add `signalDetails[]`:

```javascript
{
  id: 1,
  company: "Apex Compliance Services",
  signals: ["FOUNDER SUCCESSION", "RECURRING MOAT"],          // UI reads this
  signalColors: ["emerald", "emerald"],                        // UI reads this
  signalDetails: [                                              // NEW — enriched
    {
      type: "FOUNDER_SUCCESSION",
      label: "FOUNDER SUCCESSION",
      color: "emerald",
      confidence: 0.87,
      detectedAt: "2026-02-18",
      lastVerified: "2026-02-24",
      status: "ACTIVE",
      sources: [
        { provider: "LinkedIn Sales Navigator", dataPoint: "Founder age 63, CEO 24 years" },
        { provider: "Axial Network", dataPoint: "Intermediary pipeline listing Q4 2025" }
      ],
      subSignals: {                                                // Sub-signal decomposition
        founderAge: { value: 63, threshold: 55, score: 85 },
        tenure: { value: 24, threshold: 20, score: 90 },
        behavioralIndicators: { value: 2, threshold: 1, score: 80,
          details: ["Exit planning conference attendance", "Retained M&A advisor"] },
        successorIdentified: { value: false, score: 95 }
      },
      narrative: "Founder (63) with 24yr tenure, no successor. Engaged M&A advisor."
    }
  ],
  convictionDerivation: {
    sectorFit: { score: 92, inputs: ["Exact ACP lane match", "3 prior investments"], weight: 0.20 }
    // ... other factors
  }
}
```

### 4.2 Signal Distribution Rules

| Signal Type | Min Prospects | Target Tiers |
|-------------|--------------|--------------|
| FOUNDER SUCCESSION | 5-7 | Mostly HOT/WARM |
| PLATFORM FATIGUE | 3-5 | Mostly WARM |
| REGULATORY TAILWIND | 4-6 | Spread |
| ADD-ON MAGNET | 6-8 | Mostly HOT/WARM |
| CARVE-OUT CANDIDATE | 2-3 | WARM/STRATEGIC |
| MANAGEMENT UPGRADE | 4-6 | WARM/NURTURE |
| RECURRING MOAT | 8-10 | Spread |
| SECTOR CONSOLIDATOR | 3-5 | Mostly HOT |

**ALLOWED combos:** FOUNDER SUCCESSION + RECURRING MOAT, ADD-ON MAGNET + SECTOR CONSOLIDATOR
**FORBIDDEN combos:** FOUNDER SUCCESSION + CARVE-OUT CANDIDATE, PLATFORM FATIGUE + SECTOR CONSOLIDATOR

### 4.3 New Helper: getSignalSummary()

**File:** `acp-intel-platform/js/data.js` — add to helper methods section:

```javascript
Data.getSignalSummary = function() {
  var summary = { totalActiveSignals: 0, signalsByType: {}, avgConfidence: 0 };
  var confSum = 0, confCount = 0;
  Data.prospects.forEach(function(p) {
    if (!p.signalDetails) return;
    p.signalDetails.forEach(function(s) {
      if (s.status === 'ACTIVE') {
        summary.totalActiveSignals++;
        summary.signalsByType[s.type] = (summary.signalsByType[s.type] || 0) + 1;
        confSum += s.confidence;
        confCount++;
      }
    });
  });
  summary.avgConfidence = confCount > 0 ? Math.round((confSum / confCount) * 100) / 100 : 0;
  return summary;
};
```

### 4.4 New Component: SignalDetailCard

**File:** `acp-intel-platform/js/shared-components.js` — add before `window.Components = C;`:

```javascript
C.SignalDetailCard = function(opts) {
  var s = opts.signal;
  // Guard: return empty fragment if signal data is malformed
  if (!s || !s.label) return document.createDocumentFragment();

  var el = document.createElement('div');
  el.className = 'signal-detail-card';

  var header = document.createElement('div');
  header.className = 'signal-detail-header';
  header.appendChild(C.SignalBadge(s.label, s.color));

  var conf = document.createElement('span');
  conf.className = 'signal-confidence mono-sm';
  conf.textContent = Math.round(s.confidence * 100) + '% confidence';
  conf.style.color = 'var(--text-muted)';
  header.appendChild(conf);
  el.appendChild(header);

  if (s.sources && s.sources.length > 0) {
    var srcList = document.createElement('div');
    srcList.className = 'signal-sources';
    s.sources.forEach(function(src) {
      var srcEl = document.createElement('div');
      srcEl.className = 'signal-source body-sm';
      var provider = document.createElement('span');
      provider.className = 'signal-source-provider mono-sm';
      provider.textContent = src.provider;
      provider.style.color = 'var(--' + s.color + ')';
      var dp = document.createElement('span');
      dp.textContent = src.dataPoint;
      srcEl.appendChild(provider);
      srcEl.appendChild(dp);
      srcList.appendChild(srcEl);
    });
    el.appendChild(srcList);
  }

  // Narrative — do NOT esc() here; CalloutBox handles its own escaping.
  // Adding esc() here would cause double-escaping (&amp; artifacts).
  if (s.narrative) {
    el.appendChild(C.CalloutBox({ color: s.color, title: 'SIGNAL ANALYSIS', text: s.narrative }));
  }
  return el;
};
```

### 4.5 Enriched Feed Entries & Agent Simulation Steps

**File:** `acp-intel-platform/js/data.js`

Update `Data.feedEntries` to include `signalRef` objects:
```javascript
{ agent: "SIGNAL HUNTER", color: "emerald", time: "2:34 PM",
  text: "FOUNDER SUCCESSION detected: [Company] — [detail]. Confidence: 0.87.",
  signalRef: { prospectId: 1, signalType: "FOUNDER_SUCCESSION" }, priority: "HIGH" }
```

Update agent `simulationSteps` to reference real providers (LinkedIn, Axial, PrivCo, PitchBook, IBISWorld, BuiltWith) and specific prospect companies.

### 4.6 CSS for Signal Components

**File:** `acp-intel-platform/css/components.css` — add:

```css
.signal-detail-card { padding: var(--space-3); border: 1px solid var(--border);
  border-radius: var(--radius-md); margin-bottom: var(--space-2); background: var(--surface); }
.signal-detail-header { display: flex; align-items: center;
  justify-content: space-between; margin-bottom: var(--space-2); }
.signal-confidence { font-size: var(--text-xs); }
.signal-sources { margin: var(--space-2) 0; }
.signal-source { padding: var(--space-1) 0; border-bottom: 1px solid var(--border);
  display: flex; flex-direction: column; gap: var(--space-1); }
.signal-source-provider { font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 1px; }
.signal-details-section { margin-top: var(--space-4); }
```

### PHASE 4 VERIFICATION

```bash
grep -c "signalDetails" acp-intel-platform/js/data.js      # Expected: 30+
grep "getSignalSummary" acp-intel-platform/js/data.js       # Function definition
grep "SignalDetailCard" acp-intel-platform/js/shared-components.js  # Component
```

---

## PHASE 5: MODULE POLISH & UI INTEGRATION (1-2 hours)

### 5.1 Deal Pipeline — Signal Detail Panel

**File:** `acp-intel-platform/js/deal-pipeline.js`
After rendering signal badges in detail panel, add:

```javascript
if (prospect.signalDetails && prospect.signalDetails.length > 0) {
  var signalSection = document.createElement('div');
  signalSection.className = 'signal-details-section';
  var signalHeader = document.createElement('span');
  signalHeader.className = 'label-lg';
  signalHeader.textContent = 'SIGNAL INTELLIGENCE';
  signalSection.appendChild(signalHeader);
  prospect.signalDetails.forEach(function(s) {
    signalSection.appendChild(Components.SignalDetailCard({ signal: s }));
  });
  panel.appendChild(signalSection);
}
```

### 5.2 Command Center — Signal Summary KPI

**File:** `acp-intel-platform/js/command-center.js`
Add signal summary KPI card to hero row:

```javascript
var signalSummary = Data.getSignalSummary();
kpiRow.appendChild(Components.KPICard({
  label: 'ACTIVE SIGNALS',
  value: signalSummary.totalActiveSignals,
  subtitle: 'Avg confidence: ' + signalSummary.avgConfidence,
  valueColor: 'emerald'
}));
```

### 5.3 Value Creation — Fix Hardcoded Exit Multiple

**File:** `acp-intel-platform/js/value-creation.js`
Exit multiple hardcoded as `entryMultiple + 1.5`. Extract to named constant:
```javascript
var EXIT_MULTIPLE_EXPANSION = 1.5;
```

### 5.4 Portfolio Intel — parseInt Safety

**File:** `acp-intel-platform/js/portfolio-intel.js` (line ~116)
```javascript
var amount = parseInt(investmentStr, 10) || 0;
```

### PHASE 5 VERIFICATION

```bash
grep "SignalDetailCard" acp-intel-platform/js/deal-pipeline.js   # Expected: 1+
grep "getSignalSummary" acp-intel-platform/js/command-center.js  # Expected: 1
grep "parseInt(" acp-intel-platform/js/portfolio-intel.js        # All must have radix
```

---

## PHASE 6: DEPLOYMENT READINESS (30 min)

### 6.1 Final Verification Sweep

```bash
# No hardcoded colors in JS
grep -rn "#[0-9A-Fa-f]\{6\}" acp-intel-platform/js/ --include="*.js" | grep -v "var(--"
# Expected: 0

# No raw setTimeout/setInterval
grep -rn "setTimeout\|setInterval" acp-intel-platform/js/ --include="*.js" | grep -v "_timeout\|_interval"
# Expected: 0

# File size budget
wc -c acp-intel-platform/js/*.js | tail -1
# Target: < 200 KB total JS (revised from 130KB — current pre-enrichment is ~144KB,
# signalDetails[] + convictionDerivation adds ~40-75KB to data.js)

wc -c acp-intel-platform/css/*.css | tail -1   # Target: < 30 KB
```

### 6.2 Module Navigation Test

Navigate all 7 modules in sequence:
```
#command-center -> #deal-pipeline -> #thesis-engine -> #value-creation ->
#agent-architecture -> #competitive-landscape -> #portfolio-intel -> #command-center
```

Verify: destroy() fires, no console errors, containers cleared, new module renders.

### 6.3 Netlify Deploy Checklist

**Deployment path clarification:** The `netlify.toml` lives inside `acp-intel-platform/` with `publish = "."`. The git repo root is `PE Signals/`. Choose ONE approach:

**Option A (Auto-deploy):** Create root-level `netlify.toml` with `base = "acp-intel-platform"` and `publish = "acp-intel-platform"`.
**Option B (Manual deploy):** `netlify deploy --prod --dir=acp-intel-platform`

**Site URL:** Rename from `ctg-intel-platform` to `acp-intel-platform` in Netlify dashboard (Settings > Site name).

- [ ] SPA redirect (`/* -> /index.html`, status 200) present
- [ ] Cache headers NOT immutable
- [ ] Security headers (X-Frame-Options, X-Content-Type-Options) present
- [ ] Deployment path resolved (Option A or B)
- [ ] Site URL renamed from ctg-intel-platform

---

## PHASE 7: CLAUDE CODE SELF-REVIEW DIRECTIVE

After Phases 0-6, perform a comprehensive self-review. This is a required quality gate.

### 7.1 Architecture Review
Read every JS file. Verify:
1. Every module follows IIFE pattern with `window.modules[name] = { init, destroy }`
2. Every module declares `_timers[]` and `_listeners[]`, clears in `destroy()`
3. All components via `Components.X()` — no duplicated logic
4. All data reads via `window.Data` — no hardcoded data

### 7.2 Data Integrity Review
Read `data.js`. Verify:
1. Exactly 8 HOT, 12 WARM, 6 NURTURE, 4 STRATEGIC (total: 30)
2. Roughly equal distribution across 4 sector lanes
3. Score ranges: HOT >= 75, WARM 50-74, NURTURE 25-49
4. All 6 conviction factors on every prospect (0-100)
5. `getTierCounts()` matches manual count
6. No FOUNDER_SUCCESSION + CARVE_OUT_CANDIDATE combos
7. 15 portfolio companies match ACP Identity research
8. 7 competitors match ACP Identity research
9. Fund economics: $1.8B AUM, Fund III = $620M

### 7.3 Improvement Pass
Identify and implement improvements in:
- Accessibility (ARIA labels, keyboard nav)
- Performance (DOM reuse, lazy-load optimization)
- Data quality (richer narratives, more detailed conviction derivations)
- UI polish (hover states, transitions, loading states)
- Code quality (extract repeated patterns, reduce duplication)

Document all changes in a single `CHANGELOG.md` entry (e.g., `v1.1.0 — Signal Enrichment & Hardening`). One release entry covering Phases 0-7, not per-phase entries.

---

## EXECUTION SUMMARY

| Phase | Time | Description |
|-------|------|-------------|
| 0 | 15 min | Deployment blockers: cache, error logging, race condition |
| 1 | 45 min | Memory leaks: listener tracking, timer guards |
| 2 | 30 min | XSS hardening: esc(), DOM construction |
| 3 | 1 hr | ACP brand: copy, data verification, competitor/portfolio accuracy |
| 4 | 2-3 hr | Signal enrichment: signalDetails, getSignalSummary, SignalDetailCard |
| 5 | 1-2 hr | Module polish: UI integration, parseInt safety, exit multiple |
| 6 | 30 min | Deployment readiness verification |
| 7 | 1 hr | Claude Code self-review and improvement pass |

**Total: 7-9 hours | POC readiness after Phase 6: 95%+**

---

## APPENDIX A: ACP Brand Quick Reference

| Element | Value |
|---------|-------|
| Full name | Align Capital Partners |
| AUM | $1.8B committed capital |
| Fund III | $620M (Oct 2022) |
| Align Collaborate Fund I | $233M |
| HQ | Cleveland and Dallas |
| Target EBITDA | $3-15M |
| Target EV | ≤$150M |
| Equity check | $20-60M |
| Software ARR threshold | >$5M |
| Total acquisitions | 125+ |
| Brand color | Amber #FAB30D |
| Secondary | Slate #373F4B |
| Positioning | "Transformational Growth Partners" |
| Motto | "We do what we say we are going to do" |

## APPENDIX B: Signal Taxonomy

| Signal | Color | Min Prospects |
|--------|-------|---------------|
| FOUNDER SUCCESSION | emerald | 5-7 |
| PLATFORM FATIGUE | red | 3-5 |
| REGULATORY TAILWIND | blue | 4-6 |
| ADD-ON MAGNET | violet | 6-8 |
| CARVE-OUT CANDIDATE | amber | 2-3 |
| MANAGEMENT UPGRADE | teal | 4-6 |
| RECURRING MOAT | emerald | 8-10 |
| SECTOR CONSOLIDATOR | red | 3-5 |

## APPENDIX C: Competitor Reference

| Firm | Threat | Target Size |
|------|--------|-------------|
| Blue Point Capital | HIGH | EBITDA >$5M |
| Benford Capital | HIGH | $3-20M EBITDA |
| HCI Equity | MEDIUM | Founder-owned |
| Halifax Group | MEDIUM | $8-30M EBITDA |
| Rotunda Capital | MEDIUM | EV $50-200M |
| CenterGate Capital | MEDIUM | $5-30M EBITDA |
| Incline Equity | MEDIUM | MM services |
