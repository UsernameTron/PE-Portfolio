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
acp-intel-platform/CLAUDE.md          # Architecture rules, module contract, coding conventions
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

These are listeners created inside shared components (FilterTabBar, DataTable, RangeSlider, ActionButton). The module passes the `onAddListener` callback in the component opts:

- `acp-intel-platform/js/command-center.js` — DataTable, FilterTabBar
- `acp-intel-platform/js/thesis-engine.js` — RangeSlider (6 instances)
- `acp-intel-platform/js/value-creation.js` — RangeSlider (4 instances)
- `acp-intel-platform/js/agent-architecture.js` — ActionButton (Run/Pause/Reset)
- `acp-intel-platform/js/portfolio-intel.js` — FilterTabBar

**Category B — Module-level listeners (use `_on()` directly):**

These are raw `addEventListener` calls in module code (not inside shared components). They have direct access to `_on()` and should use it instead of the `onAddListener` pattern:

- `acp-intel-platform/js/deal-pipeline.js` — card click (line ~58), close button (line ~70)
- `acp-intel-platform/js/thesis-engine.js` — preset buttons (line ~112, raw `<button>` elements, not ActionButton)
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

**KPICard (line 12-14):** The `opts.value` and `opts.subtitle` are rendered via innerHTML. These come from data.js (static) but should still be escaped:
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

**DataTable format columns:** The `col.format` function in DataTable returns raw HTML. This is by design (allows custom rendering like badges). Document this as an intentional exception — format functions are module-authored, not user-data driven.

### 2.3 Fix Module-Level innerHTML Injections

**File:** `acp-intel-platform/js/deal-pipeline.js`
**Line ~162:** Key intelligence rendered via `innerHTML +=`. Replace with DOM construction:
```javascript
// BEFORE (XSS vector):
// detailPanel.innerHTML += '<div class="key-intel">' + item.value + '</div>';

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

# Count remaining innerHTML usages that touch data values
grep -n "innerHTML" acp-intel-platform/js/deal-pipeline.js | wc -l
# Target: Minimize — only structural HTML, not data values

# Verify esc() is used in components
grep -c "esc(" acp-intel-platform/js/shared-components.js
# Expected: 8+
```

---

## PHASE 3: ACP BRAND ALIGNMENT (1 hour)

### Context: ACP Brand Identity

From research, ACP's brand system is:

- **Primary color:** Amber `#FAB30D` (dominant brand accent)
- **Secondary:** Slate `#373F4B`, Charcoal `#343434`
- **Neutrals:** Warm cream `#F2F1E3`, Cool gray `#B7BABD`
- **Typography:** Open Sans 400/600/700 (body/UI), Karmina or serif (editorial headers)
- **Tone:** Warm, confident, partnership-oriented
- **Visual motifs:** Curved masks, faint grids, amber gradient accents
- **Pillars:** Shared success, speed, early invest, B2B focus, buy & build, toolkit

### 3.1 Design Token Decision

The current Obsidian design system uses emerald (`#34D399`) as the primary accent. For the ACP POC, we have two options:

**OPTION A (Recommended for POC): Keep emerald as-is.**
- Emerald reads as "growth" which is on-brand for PE
- The dark mode Obsidian aesthetic already differentiates this as a premium ops tool
- Changing primary accent cascades through every module — high risk of visual regressions
- ACP's amber (`#FAB30D`) has WCAG AA failure against white backgrounds (contrast ratio 1.82:1)

**OPTION B: Shift primary accent to ACP amber.**
- Requires updating `--emerald` token to `#FAB30D` — but this breaks the semantic naming
- Better: Add a new `--brand` token and gradually migrate
- Risk: Amber-on-dark has different visual weight than emerald-on-dark

**Implementation (Option A — minimal, safe):**
No changes to `obsidian.css` tokens. Instead, add ACP brand alignment through content and copy only.

**Implementation (Option B — brand-forward):**
If you choose to align with ACP amber, add these tokens to `obsidian.css`:
```css
/* ── ACP BRAND OVERLAY ── */
--acp-amber:      #FAB30D;
--acp-slate:      #373F4B;
--acp-amber-muted: rgba(250, 179, 13, 0.09);
```
Then use `--acp-amber` specifically for sidebar brand elements, status bar badges, and CTA buttons — while keeping `--emerald` for data visualization and positive-state indicators.

### 3.2 Sidebar Brand Copy

**File:** `acp-intel-platform/index.html`
**Current sidebar brand is already ACP-branded. Verify/enhance:**

```html
<div class="sidebar-brand">
  <span class="sidebar-brand-title">ALIGN CAPITAL</span>
  <span class="sidebar-brand-sub">DEAL INTELLIGENCE</span>
</div>
```

**Sidebar footer quote — use verified ACP positioning language:**
```html
<blockquote class="sidebar-quote">
  "Speed and certainty. We move quickly and do what we say we are going to do."
</blockquote>
<span class="sidebar-attribution">ALIGN CAPITAL PARTNERS</span>
```

This quote is directly sourced from ACP's website copy and captures their core differentiator.

### 3.3 Status Bar Enhancement

**File:** `acp-intel-platform/index.html`
**Current status bar is functional. Enhance subtitle to reinforce ACP positioning:**

```html
<div class="status-bar-left">
  <span class="status-bar-title">DEAL SOURCING INTELLIGENCE</span>
  <span class="status-bar-subtitle">$1.8B AUM · Fund III ($620M) · 125+ Acquisitions</span>
</div>
```

### 3.4 Data Layer Brand Consistency

**File:** `acp-intel-platform/js/data.js`
**Verify these ACP-specific data points match the deep research:**

| Data Point | Required Value | Source |
|-----------|---------------|--------|
| Total AUM | $1.8B | ACP Identity research |
| Fund III | $620M (Oct 2022) | ACP Identity research |
| Total Acquisitions | 125+ | ACP Identity research |
| Total Add-Ons | 95+ | ACP Identity research |
| Equity Check Range | $20-60M | ACP Identity research |
| Target EBITDA | $3-15M | ACP Identity research |
| Target EV | ≤ $150M | ACP Identity research |
| Sector Lanes | 4 (Software & TES, Professional Services, Industrial Services, Specialty M&D) | ACP Identity research |

**Verify 7 competitor profiles match research data:**
- Blue Point Capital Partners (Direct LMM Peer)
- Benford Capital Partners (Direct LMM Peer)
- HCI Equity Partners (Direct LMM Peer)
- The Halifax Group (Upper-LMM Adjacent)
- Rotunda Capital Partners (Adjacent LMM Peer)
- CenterGate Capital (Adjacent LMM Peer)
- Incline Equity Partners (Adjacent LMM Peer)

### 3.5 Portfolio Company Accuracy

**File:** `acp-intel-platform/js/data.js`
**Verify 15 portfolio companies against ACP Identity research. Required fields:**

Each portfolio company record must include:
- Accurate investment date and exit date (from research table)
- Correct add-on count (E Source: 14, VetEvolve: 19, Proceed: 12, Alliance: 11, etc.)
- Correct sector assignment
- Correct HQ location
- Status: ACTIVE or EXITED (based on exit date presence)

### 3.6 Replace CTG README

**File:** `acp-intel-platform/README.md`
**Issue:** Currently contains 576 lines of CTG contact center content (Cloud Tech Gurus, strain index, contact center agents). This is visible on GitHub and confusing for anyone viewing the source.

**Fix:** Replace with ACP-specific content. Keep the same structure (Overview, Architecture, Modules, Deployment) but swap all CTG terminology for ACP deal sourcing terminology. Reference the 7 modules, Obsidian design system, and signal enrichment architecture. This is a content-only change with no code impact.

### PHASE 3 VERIFICATION

```bash
# Verify brand copy
grep "ALIGN CAPITAL" acp-intel-platform/index.html
# Expected: sidebar brand title

# Verify fund economics in data.js
grep "totalAUM.*1800" acp-intel-platform/js/data.js
# Expected: 1

# Verify all 7 competitors exist
grep -c "threatLevel" acp-intel-platform/js/data.js
# Expected: 7

# Verify portfolio company count
grep -c '"ACTIVE"\|"EXITED"' acp-intel-platform/js/data.js
# Expected: 15 (10 ACTIVE + 5 EXITED)

# Verify README is ACP-branded (not CTG)
grep -c "contact center\|Cloud Tech\|CTG\|strain" acp-intel-platform/README.md
# Expected: 0
```

---

## PHASE 4: SIGNAL ENRICHMENT DATA LAYER (2-3 hours)

### Context

The Signal Enrichment Prompt (`ACP_Signal_Enrichment_Prompt.md`) defines an enriched data structure that replaces flat signal labels with simulated detection results. This makes the POC look like it came from a live intelligence pipeline rather than a static spreadsheet.

### 4.1 Enriched Signal Object Structure

**File:** `acp-intel-platform/js/data.js`

Each prospect's `signals` array should be upgraded from flat strings to detection result objects. **However, this must be backward-compatible with the existing UI.**

**Backward-compatible approach:** Keep the current flat `signals[]` and `signalColors[]` arrays (the UI reads these), AND add a new `signalDetails[]` array with the enriched objects:

```javascript
{
  id: 1,
  company: "Apex Compliance Services",
  // ... existing fields unchanged ...
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
        { provider: "LinkedIn Sales Navigator", dataPoint: "Founder Robert Ames, age 63, CEO since 2002" },
        { provider: "Axial Network", dataPoint: "Company appeared in intermediary pipeline, Q4 2025" }
      ],
      subSignals: {                                                // Sub-signal decomposition
        founderAge: { value: 63, threshold: 55, score: 85 },
        tenure: { value: 24, threshold: 20, score: 90 },
        behavioralIndicators: { value: 2, threshold: 1, score: 80,
          details: ["Exit planning conference attendance", "Retained M&A advisor"] },
        successorIdentified: { value: false, score: 95 }           // No successor = higher signal
      },
      narrative: "Robert Ames (63) has led the company for 24 years with no identified successor."
    }
    // ... additional signal detail objects
  ],
  convictionDerivation: {                                       // NEW — scoring audit trail
    sectorFit: {
      score: 92,
      inputs: ["Exact ACP lane match", "3 prior investments in adjacent verticals"],
      weight: 0.20
    }
    // ... other factors
  }
}
```

### 4.2 Signal Distribution Rules

Apply across all 30 prospects per the enrichment prompt:

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

**Combination rules:**
- ALLOWED: FOUNDER SUCCESSION + RECURRING MOAT, ADD-ON MAGNET + SECTOR CONSOLIDATOR
- FORBIDDEN: FOUNDER SUCCESSION + CARVE-OUT CANDIDATE, PLATFORM FATIGUE + SECTOR CONSOLIDATOR

### 4.3 New Helper Method: getSignalSummary()

**File:** `acp-intel-platform/js/data.js`
**Add to the helper methods section (after line ~1716):**

```javascript
Data.getSignalSummary = function() {
  var summary = {
    totalActiveSignals: 0,
    signalsByType: {},
    avgConfidence: 0,
    signalsDetectedThisWeek: 0
  };
  var confidenceSum = 0;
  var confidenceCount = 0;

  Data.prospects.forEach(function(p) {
    if (!p.signalDetails) return;
    p.signalDetails.forEach(function(s) {
      if (s.status === 'ACTIVE') {
        summary.totalActiveSignals++;
        summary.signalsByType[s.type] = (summary.signalsByType[s.type] || 0) + 1;
        confidenceSum += s.confidence;
        confidenceCount++;
      }
    });
  });

  summary.avgConfidence = confidenceCount > 0 ? Math.round((confidenceSum / confidenceCount) * 100) / 100 : 0;
  return summary;
};
```

### 4.4 New Shared Component: SignalDetailCard

**File:** `acp-intel-platform/js/shared-components.js`
**Add before `window.Components = C;`:**

```javascript
// ── Signal Detail Card (enriched signal rendering) ──
C.SignalDetailCard = function(opts) {
  var s = opts.signal;
  // Guard: return empty fragment if signal data is malformed
  if (!s || !s.label) return document.createDocumentFragment();

  var el = document.createElement('div');
  el.className = 'signal-detail-card';

  // Header: badge + confidence
  var header = document.createElement('div');
  header.className = 'signal-detail-header';
  header.appendChild(C.SignalBadge(s.label, s.color));

  var conf = document.createElement('span');
  conf.className = 'signal-confidence mono-sm';
  conf.textContent = Math.round(s.confidence * 100) + '% confidence';
  conf.style.color = 'var(--text-muted)';
  header.appendChild(conf);
  el.appendChild(header);

  // Sources
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
    el.appendChild(C.CalloutBox({
      color: s.color,
      title: 'SIGNAL ANALYSIS',
      text: s.narrative
    }));
  }

  return el;
};
```

### 4.5 Enriched Feed Entries

**File:** `acp-intel-platform/js/data.js`
**Update `Data.feedEntries` to reference signal detections with prospect IDs:**

Each feed entry should include a `signalRef` object:
```javascript
{
  agent: "SIGNAL HUNTER",
  color: "emerald",
  time: "2:34 PM",
  text: "New FOUNDER SUCCESSION signal detected: [Company Name] — [detail]. Confidence: 0.87.",
  signalRef: { prospectId: 1, signalType: "FOUNDER_SUCCESSION" },
  priority: "HIGH"
}
```

### 4.6 Enriched Agent Simulation Steps

**File:** `acp-intel-platform/js/data.js`
**Update each agent's `simulationSteps` to reference real signal providers and prospect data:**

Simulation steps should name actual data providers (LinkedIn Sales Navigator, Axial Network, PrivCo, PitchBook, IBISWorld, BuiltWith) and reference specific prospect companies from the data set.

### PHASE 4 VERIFICATION

```bash
# Verify signalDetails exists on prospects
grep -c "signalDetails" acp-intel-platform/js/data.js
# Expected: 30+ (one per prospect)

# Verify getSignalSummary helper
grep "getSignalSummary" acp-intel-platform/js/data.js
# Expected: function definition

# Verify SignalDetailCard component
grep "SignalDetailCard" acp-intel-platform/js/shared-components.js
# Expected: 1 (component definition)

# Verify no forbidden signal combinations
# Manual check: no prospect has both FOUNDER_SUCCESSION and CARVE_OUT_CANDIDATE
```

---

## PHASE 5: MODULE POLISH & UI INTEGRATION (1-2 hours)

### 5.1 Deal Pipeline — Signal Detail Panel

**File:** `acp-intel-platform/js/deal-pipeline.js`
**When a prospect card is clicked and the detail panel renders, add signal detail cards below the existing signal badges:**

```javascript
// After rendering signal badges in the detail panel:
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
**Add a signal summary KPI card to the hero row:**

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
**Issue:** Exit multiple is hardcoded as `entryMultiple + 1.5`. This should be configurable or at least documented.

**Fix:** Add an exit multiple expansion slider or make it a named constant at the top of the module:
```javascript
var EXIT_MULTIPLE_EXPANSION = 1.5; // bps expansion from entry to exit
```

### 5.4 Portfolio Intel — parseInt Safety

**File:** `acp-intel-platform/js/portfolio-intel.js`
**Line ~116:** `parseInt` on investment strings without radix or NaN guard.

**Fix:**
```javascript
var amount = parseInt(investmentStr, 10) || 0;
```

### 5.5 CSS for New Components

**File:** `acp-intel-platform/css/components.css`
**Add styles for SignalDetailCard:**

```css
/* ── Signal Detail Card ── */
.signal-detail-card {
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-2);
  background: var(--surface);
}
.signal-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}
.signal-confidence {
  font-size: var(--text-xs);
}
.signal-sources {
  margin: var(--space-2) 0;
}
.signal-source {
  padding: var(--space-1) 0;
  border-bottom: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.signal-source-provider {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 1px;
}
.signal-details-section {
  margin-top: var(--space-4);
}
```

### PHASE 5 VERIFICATION

```bash
# Verify SignalDetailCard usage in deal-pipeline
grep "SignalDetailCard" acp-intel-platform/js/deal-pipeline.js
# Expected: 1+

# Verify getSignalSummary usage in command-center
grep "getSignalSummary" acp-intel-platform/js/command-center.js
# Expected: 1

# Verify parseInt has radix
grep "parseInt(" acp-intel-platform/js/portfolio-intel.js
# Every instance should have ", 10" radix parameter

# Verify new CSS
grep "signal-detail-card" acp-intel-platform/css/components.css
# Expected: 1+
```

---

## PHASE 6: DEPLOYMENT READINESS (30 min)

### 6.1 Final Verification Sweep

Run these checks across the entire codebase:

```bash
# 1. No hardcoded colors
grep -rn "#[0-9A-Fa-f]\{6\}" acp-intel-platform/js/ --include="*.js" | grep -v "var(--"
# Expected: 0 results (all colors via CSS custom properties)

# 2. No raw setTimeout/setInterval (must use _timeout/_interval wrappers)
grep -rn "setTimeout\|setInterval" acp-intel-platform/js/ --include="*.js" | grep -v "_timeout\|_interval\|// raw ok"
# Expected: 0 results (or documented exceptions)

# 3. No raw addEventListener in modules (must use _on wrapper or trackListener)
grep -rn "addEventListener" acp-intel-platform/js/command-center.js acp-intel-platform/js/deal-pipeline.js acp-intel-platform/js/thesis-engine.js acp-intel-platform/js/value-creation.js acp-intel-platform/js/agent-architecture.js acp-intel-platform/js/competitive-landscape.js acp-intel-platform/js/portfolio-intel.js | grep -v "_on\|trackListener\|onAddListener"
# Expected: 0 results

# 4. Zero console errors on load
# Serve locally and check: python3 -m http.server 8765 --directory acp-intel-platform

# 5. File size budget
wc -c acp-intel-platform/js/*.js | tail -1
# Target: < 200 KB total JS
# NOTE: Current total JS is ~144KB pre-enrichment. After adding signalDetails[]
# (30 prospects x 2-3 signals x ~600 bytes each) + convictionDerivation (30 x ~400 bytes),
# data.js grows from 75KB to ~120-150KB. The original 130KB budget was already exceeded.
# For a POC with no build step, 200KB total JS is acceptable.
# If size is a concern, split data.js into data.js (core) + data-signals.js (enrichment).

wc -c acp-intel-platform/css/*.css | tail -1
# Target: < 30 KB total CSS
```

### 6.2 Module Navigation Test

Test all 7 module transitions manually or via script:

```
#command-center → #deal-pipeline → #thesis-engine → #value-creation →
#agent-architecture → #competitive-landscape → #portfolio-intel →
#command-center (full cycle back)
```

Verify at each transition:
- `destroy()` fires on the outgoing module
- No console errors
- Content and panel containers are cleared
- New module renders correctly

### 6.3 Netlify Deploy Checklist

**Deployment path clarification:** The `netlify.toml` lives inside `acp-intel-platform/` with `publish = "."`. The git repo root is `PE Signals/`. For deployment, choose ONE approach:

**Option A (Auto-deploy):** Create a root-level `netlify.toml` at repo root:
```toml
[build]
  base = "acp-intel-platform"
  publish = "acp-intel-platform"
```

**Option B (Manual deploy):** Use CLI with explicit directory:
```bash
netlify deploy --prod --dir=acp-intel-platform
```

**Site URL:** Rename Netlify site from `ctg-intel-platform` to `acp-intel-platform` (or `acp-deal-intel`) in the Netlify dashboard: Settings > Site details > Site name.

```bash
# Verify netlify.toml configuration
cat acp-intel-platform/netlify.toml

# Confirm:
# [ ] SPA redirect (/* → /index.html, status 200) is present
# [ ] Cache headers are NOT immutable
# [ ] Security headers (X-Frame-Options, X-Content-Type-Options) are present
# [ ] Deployment path is clear (Option A or B above)
# [ ] Site URL renamed from ctg-intel-platform to acp-intel-platform
```

### PHASE 6 VERIFICATION (FINAL)

```bash
# Full health check
echo "=== ACP Intelligence Platform — Deployment Readiness ==="
echo ""
echo "File count:"
find acp-intel-platform -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.toml" | wc -l
echo ""
echo "Total JS size:"
wc -c acp-intel-platform/js/*.js | tail -1
echo ""
echo "Total CSS size:"
wc -c acp-intel-platform/css/*.css | tail -1
echo ""
echo "Hardcoded colors in JS:"
grep -rn "#[0-9A-Fa-f]\{6\}" acp-intel-platform/js/ --include="*.js" | grep -v "var(--" | wc -l
echo ""
echo "Immutable cache headers:"
grep -c "immutable" acp-intel-platform/netlify.toml
echo ""
echo "Module count in registry:"
grep -c "loaded: false" acp-intel-platform/js/app.js
echo ""
echo "Prospect count in data:"
grep -c '"tier":' acp-intel-platform/js/data.js
echo ""
echo "=== READY FOR DEPLOYMENT ==="
```

---

## PHASE 7: CLAUDE CODE SELF-REVIEW DIRECTIVE

After completing Phases 0-6, Claude Code should perform a comprehensive self-review of the entire codebase. This is not optional — it is a required quality gate before deployment.

### 7.1 Architecture Review

Read every JS file in `acp-intel-platform/js/` and verify:

1. **Module contract compliance:** Every module file (command-center, deal-pipeline, thesis-engine, value-creation, agent-architecture, competitive-landscape, portfolio-intel) follows the IIFE pattern with `window.modules[name] = { init, destroy }`.

2. **Memory management:** Every module declares `_timers[]` and `_listeners[]` arrays. The `destroy()` function clears all timers and removes all listeners.

3. **Component usage:** All shared components are constructed via `Components.X()` — no module duplicates component logic.

4. **Data access:** All data reads go through `window.Data` methods/properties — no module hardcodes data.

### 7.2 Data Integrity Review

Read `acp-intel-platform/js/data.js` and verify:

1. **Prospect distribution:** Exactly 8 HOT, 12 WARM, 6 NURTURE, 4 STRATEGIC (total: 30)
2. **Sector distribution:** Roughly equal across 4 lanes (7-8 per lane)
3. **Score ranges:** HOT ≥ 75, WARM 50-74, NURTURE 25-49, STRATEGIC varies
4. **Conviction factors:** All 6 factors present on every prospect, values 0-100
5. **Helper method accuracy:** `getTierCounts()` matches manual count, `getAggregateEV()` matches sum of evEstimate values
6. **Signal combinations:** No FOUNDER_SUCCESSION + CARVE_OUT_CANDIDATE on same prospect
7. **Portfolio companies:** All 15 match ACP Identity research (dates, add-on counts, sectors)
8. **Competitors:** All 7 match ACP Identity research (criteria, differentiation language)
9. **Fund economics:** $1.8B AUM, Fund III = $620M, equity check $20-60M

### 7.3 Visual Consistency Review

Serve locally and verify each module renders correctly:

1. All text uses CSS custom property colors (no raw hex in rendered DOM)
2. All spacing uses design tokens
3. All fonts are Plus Jakarta Sans (UI) or JetBrains Mono (data)
4. Cards, badges, and tables follow the Obsidian design system
5. Status bar dynamically updates from Data helpers

### 7.4 Improvement Opportunities

After the review, identify and implement any improvements in these categories:

- **Performance:** Lazy-load optimizations, DOM reuse patterns
- **Accessibility:** ARIA labels on interactive elements, keyboard navigation
- **Data quality:** More realistic prospect narratives, more detailed conviction derivations
- **UI polish:** Hover states, transition animations, loading states between module switches
- **Code quality:** Extract repeated patterns into shared utilities, reduce code duplication across modules

Document all changes in a single `CHANGELOG.md` entry at the project root (e.g., `v1.1.0 — Signal Enrichment & Hardening`). Do not create per-phase entries — one release entry covering Phases 0-7 is sufficient for a POC.

---

## SUMMARY: EXECUTION ORDER

| Phase | Time | Description | Files Modified |
|-------|------|-------------|----------------|
| 0 | 15 min | Deployment blockers (cache, error logging, race condition) | netlify.toml, app.js |
| 1 | 45 min | Memory leak fixes (listener tracking, timer guards) | shared-components.js, all 7 modules |
| 2 | 30 min | XSS hardening (esc utility, DOM construction) | shared-components.js, deal-pipeline.js, competitive-landscape.js |
| 3 | 1 hr | ACP brand alignment (copy, data verification, competitor/portfolio accuracy) | index.html, data.js |
| 4 | 2-3 hr | Signal enrichment data layer (signalDetails, getSignalSummary, SignalDetailCard) | data.js, shared-components.js |
| 5 | 1-2 hr | Module polish & UI integration | deal-pipeline.js, command-center.js, value-creation.js, portfolio-intel.js, components.css |
| 6 | 30 min | Deployment readiness verification | All files (read-only sweep) |
| 7 | 1 hr | Claude Code self-review and improvement pass | Any file needing improvement |

**Total estimated time: 7-9 hours**
**POC readiness after Phase 6: 95%+**

---

## APPENDIX A: ACP Brand Quick Reference

| Element | Value | Source |
|---------|-------|--------|
| Full name | Align Capital Partners | ACP Identity |
| AUM | $1.8B committed capital | ACP Identity |
| Fund III | $620M (Oct 2022) | ACP Identity |
| Align Collaborate Fund I | $233M | ACP Identity |
| HQ | Cleveland and Dallas | ACP Identity |
| Target EBITDA | $3-15M | ACP Identity |
| Target EV | ≤ $150M | ACP Identity |
| Equity check | $20-60M | ACP Identity |
| Software ARR threshold | >$5M | ACP Identity |
| Total acquisitions | 125+ | ACP Identity |
| Core differentiator | "Speed and certainty" | ACP Branding |
| Brand color | Amber #FAB30D | ACP Branding |
| Secondary | Slate #373F4B | ACP Branding |
| Typography | Open Sans (body), Karmina (editorial) | ACP Branding |
| Positioning | "Transformational Growth Partners" | ACP Identity |
| Motto | "We do what we say we are going to do" | ACP Identity |

## APPENDIX B: Signal Taxonomy Quick Reference

| Signal | Color Token | Meaning | Min Prospects |
|--------|-----------|---------|---------------|
| FOUNDER SUCCESSION | emerald | Owner approaching liquidity event | 5-7 |
| PLATFORM FATIGUE | red | Growth ceiling, needs operational partner | 3-5 |
| REGULATORY TAILWIND | blue | Compliance-driven demand acceleration | 4-6 |
| ADD-ON MAGNET | violet | Fragmented market, bolt-on targets | 6-8 |
| CARVE-OUT CANDIDATE | amber | Corporate parent divesting non-core | 2-3 |
| MANAGEMENT UPGRADE | teal | Strong business, leadership gap | 4-6 |
| RECURRING MOAT | emerald | Mission-critical recurring revenue | 8-10 |
| SECTOR CONSOLIDATOR | red | Natural platform for buy-and-build | 3-5 |

## APPENDIX C: Competitor Quick Reference

| Firm | Threat Level | Target Size | Key Differentiation |
|------|-------------|-------------|---------------------|
| Blue Point Capital | HIGH | EBITDA >$5M, $30-300M rev | Value-add resources, LMM platform model |
| Benford Capital | HIGH | $3-20M EBITDA | Scaling niche leaders; carve-outs/recaps |
| HCI Equity | MEDIUM | Founder-owned focus | Family/founder targeting, equity alignment |
| Halifax Group | MEDIUM | $8-30M EBITDA, TEV $50-300M | Health & wellness, outsourced services |
| Rotunda Capital | MEDIUM | EV $50-200M | Value-added distribution, founder rollover |
| CenterGate Capital | MEDIUM | $5-30M EBITDA | Flexible capital, collaborative partnership |
| Incline Equity | MEDIUM | MM services/distribution | People-first/results-driven brand |
