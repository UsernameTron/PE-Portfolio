This is a portfolio-grade POC for PE deal sourcing intelligence (Align Capital Partners), deployed on Netlify. It's a zero-dependency vanilla HTML/CSS/JS SPA used in job interviews. The codebase works but has XSS gaps, duplicated boilerplate, no accessibility, no responsive layout, and missing deployment polish. This plan addresses all categories systematically while preserving the zero-build-step architecture.
Codebase: 7 lazy-loaded modules, 11 shared components, centralized data store (2719 lines), Obsidian dark-mode design system, hash-based SPA router.

Phase 2: P0 Critical + P1 High Priority
2.1 Export esc() for Module Use (P0)
Files: js/shared-components.js
What: Add C.esc = esc; at line 356 to expose the existing XSS escaping function on the Components namespace. One-line change, zero risk.
2.2 XSS Hardening — All 7 Modules + Shell (P0)
Files: All 7 module JS files + js/shell.js + js/app.js
Depends on: 2.1
What: Wrap every data-derived value interpolated into innerHTML with Components.esc(). Exhaustive locations:
FileWhat to escapeshell.jscounts.HOT, counts.WARM, Data.getAggregateEV() in status badgescommand-center.jsSector names/counts in bar chart, all DataTable format callback return values (score, company, sector, ebitda, EV, signal, stage, tier columns)deal-pipeline.jsCard stats (revenue, sector, ebitda, processStage), conviction factor names/values, all panel detail fieldsagent-architecture.jsAgent stats keys and values in statsRow innerHTMLportfolio-intel.jsPhase/sector names, investment values, task names/hours, metric labels/values, timeline nav itemscompetitive-landscape.jsCompetitor name, threat level, metrics (deals, checkSize, sectors), differentiator items, h2h table cellsthesis-engine.jsConviction label, score values in IC recommendation textvalue-creation.jsEconomics table values (entryEV, equityCheck, exitEBITDA, exitEV), scenario names, MOIC/IRR valuesapp.jsModule id in error message innerHTML
Rule: If it's a component's .outerHTML (e.g., TierBadge(v).outerHTML), do NOT escape — it's pre-rendered DOM. If it's data from Data.* or computed values, escape it.
2.3 ModuleBase Factory Extraction (P1)
New file: js/module-base.js
Files modified: index.html (add script tag), all 7 module JS files
What: Create a factory that provides _on(), _interval(), _timeout(), _destroy(), and onAddListener — eliminating ~15 lines of identical boilerplate per module (~105 lines total). Uses tagged timer objects { type: 'interval'|'timeout', id } for proper cleanup semantics.
API:
javascriptvar base = ModuleBase();
// Use: base._on(target, event, handler)
// Use: base._interval(fn, ms)
// Use: base._timeout(fn, ms)
// In destroy(): base._destroy()
// Pass to Components: { onAddListener: base.onAddListener }
Load order in index.html: data.js → shared-components.js → module-base.js → shell.js → app.js
Each module refactor: Replace boilerplate vars/functions with var base = ModuleBase(), destructure helpers, replace destroy cleanup with base._destroy(), replace onAddListener callbacks with base.onAddListener.
2.4 Accessibility Basics (P1)
Files: index.html, css/obsidian.css, css/shell.css, css/components.css, js/shared-components.js, js/app.js
ChangeFileAdd <a href="#content-main" class="skip-link">Skip to main content</a> as first child of <body>index.htmlAdd role="navigation" aria-label="Main navigation" to <nav>index.htmlAdd aria-label="Detail panel" to <aside class="content-panel">index.htmlSkip-link CSS (visually hidden, visible on focus)obsidian.css:focus-visible outlines on .nav-tab, .filter-tab, .action-btn, .range-slider-input, tbody trshell.css, components.cssFilterTabBar: Add role="tablist" to container, role="tab" + tabindex + aria-selected to buttons, Arrow Left/Right keydown handlershared-components.jsDataTable clickable rows: Add tabindex="0", Enter/Space keydown handlershared-components.jsFocus management: Set tabindex="-1" on #content-main, call .focus() after module initapp.js
2.5 Module Transition Animation (P1)
Files: css/shell.css
What: CSS-only fade-in animation on .content-main > *:
css@keyframes moduleEnter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
.content-main > * { animation: moduleEnter var(--duration-base) var(--ease-out); }
```
No JS changes — works automatically when modules inject DOM children.

### 2.6 Prospect Search (P1)
**Files**: `js/shared-components.js`, `css/components.css`, `js/command-center.js`, `js/deal-pipeline.js`
**Depends on**: 2.1, 2.3

**New component** `Components.SearchInput`: Debounced (200ms) search input with `aria-label`, calling `onSearch(term)` callback.

**Integration**: Both command-center and deal-pipeline get a search input above their filter tabs. An `applyFilters()` function combines tier filter + search term, matching against company name, sector, location, and process stage (case-insensitive substring). When results are empty, show `Components.EmptyState` (built in Phase 3, degrade gracefully until then).

### 2.7 Responsive Breakpoints (P1)
**Files**: `css/shell.css`, `index.html`, `js/shell.js`

| Breakpoint | Behavior |
|------------|----------|
| `> 1280px` | Full 3-column layout (current) |
| `1024–1280px` | Sidebar collapses to 56px icon-only rail (hide text, center icons) |
| `< 1024px` | Sidebar off-canvas with hamburger toggle in status bar, panel as fixed overlay |
| `< 768px` | Panel full-width, grids collapse to 1–2 columns |

Add hamburger `<button class="menu-toggle">` in status bar (hidden at >1024px). Shell.js adds click handler to toggle `.sidebar.open` class.

### 2.8 Panel Slide-In Animation (P1)
**Files**: `css/shell.css`
**What**: Add `.content-panel.panel-animate-in` class with translateX(20px)→0 + opacity animation. Apply in deal-pipeline.js `openDetail()` and any module that populates the panel dynamically.

### 2.9 Netlify Security Headers (P1)
**Files**: `netlify.toml`
**What**: Add to the `/*` headers block:
- `Content-Security-Policy`: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`

Note: `'unsafe-inline'` for style-src is required because components set inline styles via JS.

---

## Phase 3: P2 Medium Priority

### 3.1 Data Splitting
**What**: Split `data.js` (2719 lines) into 4 files loaded in dependency order:
- `js/data-core.js` — Fund economics, `window.Data = {}`, helper methods
- `js/data-prospects.js` — 30 prospect records (`Data.prospects = [...]`)
- `js/data-agents.js` — 5 agent definitions (`Data.agents = [...]`)
- `js/data-reference.js` — Competitors, portfolio, roadmap, sectors, feed entries

### 3.2 Value Creation Model Improvements
**Files**: `js/value-creation.js`
- Add Equity % slider (30–70%, default 40%, step 5) replacing hardcoded 60/40 split
- Add Exit Multiple Expansion slider (0–3 turns, default 1.5, step 0.5) replacing hardcoded constant
- Dynamic split bar reflecting actual slider values
- (Add-on acquisitions layer and levered equity IRR are stretch goals within P2)

### 3.3 Signal Freshness Visualization
**Files**: `js/shared-components.js`, `css/components.css`
- In SignalDetailCard, calculate days since `lastVerified`
- Show freshness dot: green (≤3 days), amber (4–7 days), red (>7 days) with "Xd ago" text

### 3.4 Process Stage Funnel
**Files**: `js/command-center.js`
- Add horizontal bar funnel in the right panel using `Data.getProcessStageDistribution()`
- Same visual pattern as existing sector allocation bars

### 3.5 New Components — Toast, EmptyState, ProgressBar, Skeleton
**Files**: `js/shared-components.js`, `css/components.css`
- `Components.Toast({ type, message, duration })` — Fixed-position notification with slide-in animation, `role="alert"`
- `Components.EmptyState({ icon, title, message })` — Centered placeholder for zero-result states
- `Components.ProgressBar({ value, max, color })` — Horizontal fill bar for roadmap/simulation progress
- `Components.Skeleton({ lines })` — Pulsing placeholder blocks during module lazy-load

### 3.6 Card Hover Effects
**Files**: `css/deal-pipeline.css`, other module CSS
- `translateY(-2px)` + `box-shadow: 0 4px 12px rgba(0,0,0,0.3)` on `.pi-card:hover`
- Apply same to `.cm-comp-card`, `.aa-agent-card`

### 3.7 Print Stylesheet
**New file**: `css/print.css` (loaded with `media="print"`)
- Hide sidebar, status bar, right panel, hamburger, skip link
- Remove margin-left, set white background, `break-inside: avoid` on cards

### 3.8 404 Page + Favicon + OG Meta Tags
**New files**: `404.html`
**Files modified**: `index.html`, `netlify.toml`
- Styled 404.html matching Obsidian theme with link back to `/#command-center`
- SVG favicon using ◆ character
- `og:title`, `og:description`, `og:type`, `description` meta tags

---

## Phase 4: P3 Nice-to-Have

### 4.1 Module Prefetching
After initial module loads, `rel="prefetch"` CSS for deal-pipeline and thesis-engine (2s delay, low priority).

### 4.2 Thesis-Pipeline Linking
"Compare to Pipeline" section in thesis-engine panel showing top 5 prospects matching current slider weights, with "View in Pipeline" links.

### 4.3 Sparkline Component
Inline SVG polyline component for EBITDA trends or score history.

### 4.4 Modal Component
Overlay dialog with focus trapping, Escape-to-close, `aria-modal="true"`. For future IC memo previews and mobile detail views.

### 4.5 PWA Manifest
`manifest.json` with name, start_url, display:standalone, theme_color. Minimal — no service worker.

### 4.6 Font Preloading / Critical CSS
Skip unless performance testing reveals issues. Current preconnect + display:swap is adequate.

---

## Execution Order
```
Phase 2 (sequential where noted):
  2.1  Export esc()                → 1 line, do first
  2.3  ModuleBase extraction       → new file + 7 module refactors (parallel with 2.9, 2.5, 2.8)
  2.9  Security headers            → netlify.toml only
  2.5  Module transitions          → CSS only
  2.8  Panel slide-in              → CSS only
  2.4  Accessibility basics        → HTML + CSS + JS
  2.2  XSS hardening              → depends on 2.1, touch all modules
  2.6  Prospect search            → depends on 2.1 + 2.3
  2.7  Responsive breakpoints     → CSS + minor JS

Phase 3 (after Phase 2 stable):
  3.1 → 3.2 → 3.3 → 3.5 → 3.6 → 3.4 → 3.7 → 3.8

Phase 4 (optional polish):
  4.1 → 4.2 → 4.3 → 4.4 → 4.5
Verification
After each phase:

Open index.html locally (or npx serve .) and navigate all 7 modules
Verify no console errors
Test keyboard navigation (Tab through all interactive elements)
Test responsive layout at 1280px, 1024px, 768px viewport widths
Verify prospect search filters correctly in command-center and deal-pipeline
Check module transitions are smooth (no flash of unstyled content)
Run Lighthouse accessibility audit (target 90+)
Verify Netlify deploy preview has correct security headers (curl -I)

Key Files to Modify
FileChangesjs/shared-components.jsExport esc(), SearchInput, EmptyState, Toast, ProgressBar, Skeleton, Sparkline, Modal, FilterTabBar a11y, DataTable a11y, signal freshnessjs/module-base.jsNEW — ModuleBase factoryjs/command-center.jsXSS, ModuleBase, search, funneljs/deal-pipeline.jsXSS, ModuleBase, search, panel animationjs/thesis-engine.jsXSS, ModuleBase, pipeline linkingjs/value-creation.jsXSS, ModuleBase, model improvementsjs/agent-architecture.jsXSS, ModuleBasejs/competitive-landscape.jsXSS, ModuleBasejs/portfolio-intel.jsXSS, ModuleBasejs/shell.jsXSS, hamburger togglejs/app.jsXSS, focus management, module prefetchindex.htmlSkip link, ARIA, meta tags, favicon, script order, hamburger button, print CSS linkcss/obsidian.cssSkip-link stylescss/shell.cssFocus styles, transitions, responsive breakpoints, hamburger, panel animationcss/components.cssFocus styles, search input, toast, empty state, progress bar, skeletoncss/deal-pipeline.cssCard hover effectscss/print.cssNEW — Print stylesheetnetlify.tomlCSP, Referrer-Policy, Permissions-Policy404.htmlNEW — Branded 404 pagemanifest.jsonNEW — PWA manifest (P3)