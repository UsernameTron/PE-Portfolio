/* ═══ MODULE: signal-detection ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _destroyed = false;
  var _selectedDetector = null;
  var _simRunning = false;
  var _simPaused = false;
  var _simIndex = 0;
  var _simCost = 0;
  var _activeTier = 'ALL';
  var _cardEls = [];
  var base = ModuleBase();
  var E = Components.esc;

  // ── Phase color mapping ──
  var PHASE_COLORS = {
    INIT: 'teal', COMPLETE: 'teal',
    QUERY: 'blue', FILTER: 'blue',
    XREF: 'violet', ENRICH: 'violet',
    SCORE: 'amber',
    DETECT: 'emerald'
  };

  // ── Signal type to prospect matching ──
  var SIGNAL_TYPE_MAP = {
    'founder-succession': 'FOUNDER_SUCCESSION',
    'platform-fatigue': 'PLATFORM_FATIGUE',
    'regulatory-tailwind': 'REGULATORY_TAILWIND',
    'add-on-magnet': 'ADD_ON_MAGNET',
    'carve-out-candidate': 'CARVE_OUT_CANDIDATE',
    'management-upgrade': 'MANAGEMENT_UPGRADE',
    'recurring-moat': 'RECURRING_MOAT',
    'sector-consolidator': 'SECTOR_CONSOLIDATOR'
  };

  function getMatchedProspects(detectorId) {
    var signalType = SIGNAL_TYPE_MAP[detectorId];
    if (!signalType) return [];
    var matches = [];
    Data.prospects.forEach(function(p) {
      if (!p.signalDetails) return;
      p.signalDetails.forEach(function(s) {
        if (s.type === signalType && s.status === 'ACTIVE') {
          matches.push({ prospect: p, confidence: s.confidence, label: s.label });
        }
      });
    });
    matches.sort(function(a, b) { return b.confidence - a.confidence; });
    return matches.slice(0, 5);
  }

  // ── Build detector card for main content ──
  function buildDetectorCard(detector) {
    var card = document.createElement('div');
    card.className = 'sd-card';
    card.style.borderLeftColor = 'var(--' + detector.color + ')';

    // Header: name + badges
    var header = document.createElement('div');
    header.className = 'sd-card-header';
    var name = document.createElement('span');
    name.className = 'heading-sm';
    name.textContent = detector.name;
    header.appendChild(name);

    var badges = document.createElement('div');
    badges.className = 'sd-card-badges';
    badges.appendChild(Components.SignalBadge(detector.feasibility, detector.feasibility === 'HIGH' ? 'emerald' : detector.feasibility === 'MEDIUM' ? 'amber' : 'red'));
    badges.appendChild(Components.SignalBadge(detector.costTier, 'gray'));
    header.appendChild(badges);
    card.appendChild(header);

    // Description
    var desc = document.createElement('p');
    desc.className = 'body-sm';
    desc.style.color = 'var(--text-secondary)';
    desc.textContent = detector.description;
    card.appendChild(desc);

    // Sub-signals (first 3 + more indicator)
    var ul = document.createElement('ul');
    ul.className = 'sd-subsignals';
    var showCount = Math.min(detector.subSignals.length, 3);
    for (var i = 0; i < showCount; i++) {
      var li = document.createElement('li');
      li.textContent = detector.subSignals[i];
      ul.appendChild(li);
    }
    if (detector.subSignals.length > 3) {
      var more = document.createElement('li');
      more.style.color = 'var(--text-muted)';
      more.style.fontStyle = 'italic';
      more.textContent = '+' + (detector.subSignals.length - 3) + ' more signals';
      ul.appendChild(more);
    }
    card.appendChild(ul);

    // Meta row: sources count + monthly cost
    var meta = document.createElement('div');
    meta.className = 'sd-card-meta';
    meta.innerHTML =
      '<span class="label-sm">' + E(String(detector.apiSources.length)) + ' API SOURCES</span>' +
      '<span class="label-sm" style="color:var(--text-muted)">' + E(detector.monthlyCost) + '/mo</span>';
    card.appendChild(meta);

    // Click handler
    base._on(card, 'click', function() {
      _selectedDetector = detector;
      // Reset simulation state when switching detectors
      _simRunning = false;
      _simPaused = false;
      _simIndex = 0;
      _simCost = 0;
      base._clearTimers();
      // Update active card styling
      _cardEls.forEach(function(c) { c.el.classList.remove('active'); });
      card.classList.add('active');
      buildPanel();
    });

    return card;
  }

  // ── Build panel content ──
  function buildPanel() {
    _panel.innerHTML = '';

    if (!_selectedDetector) {
      // Summary state — no detector selected
      var intro = document.createElement('div');
      intro.className = 'label-lg';
      intro.textContent = 'SIGNAL DETECTION';
      intro.style.marginBottom = 'var(--space-3)';
      _panel.appendChild(intro);

      var hint = document.createElement('p');
      hint.className = 'body-sm';
      hint.style.color = 'var(--text-secondary)';
      hint.textContent = 'Select a signal detector from the main panel to explore its methodology, API sources, and run a simulated detection scan.';
      _panel.appendChild(hint);

      // Summary KPIs
      var summaryLabel = document.createElement('div');
      summaryLabel.className = 'label-lg';
      summaryLabel.textContent = 'DETECTION OVERVIEW';
      summaryLabel.style.margin = 'var(--space-5) 0 var(--space-2)';
      _panel.appendChild(summaryLabel);

      var detectors = Data.signalDetectors;
      var uniqueSources = {};
      detectors.forEach(function(d) {
        d.apiSources.forEach(function(s) { uniqueSources[s.name] = true; });
      });
      var highCount = detectors.filter(function(d) { return d.feasibility === 'HIGH'; }).length;

      _panel.appendChild(Components.KPICard({ label: 'TOTAL DETECTORS', value: String(detectors.length), size: 'md', valueColor: 'teal' }));
      _panel.appendChild(Components.KPICard({ label: 'UNIQUE API SOURCES', value: String(Object.keys(uniqueSources).length), size: 'md', valueColor: 'blue' }));
      _panel.appendChild(Components.KPICard({ label: 'HIGH FEASIBILITY', value: String(highCount), size: 'md', valueColor: 'emerald' }));

      // Signal type coverage
      var coverageLabel = document.createElement('div');
      coverageLabel.className = 'label-lg';
      coverageLabel.textContent = 'PIPELINE COVERAGE';
      coverageLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
      _panel.appendChild(coverageLabel);

      var summary = Data.getSignalSummary();
      _panel.appendChild(Components.KPICard({ label: 'ACTIVE SIGNALS', value: String(summary.totalActiveSignals), size: 'md', valueColor: 'emerald' }));
      _panel.appendChild(Components.KPICard({ label: 'AVG CONFIDENCE', value: Math.round(summary.avgConfidence * 100) + '%', size: 'md', valueColor: 'teal' }));

      return;
    }

    var det = _selectedDetector;

    // Detector header
    var header = document.createElement('div');
    header.style.marginBottom = 'var(--space-3)';
    var nameEl = document.createElement('div');
    nameEl.className = 'heading-md';
    nameEl.style.color = 'var(--' + det.color + ')';
    nameEl.textContent = det.name;
    header.appendChild(nameEl);

    var badgeRow = document.createElement('div');
    badgeRow.style.display = 'flex';
    badgeRow.style.gap = 'var(--space-2)';
    badgeRow.style.marginTop = 'var(--space-2)';
    badgeRow.appendChild(Components.SignalBadge(det.feasibility, det.feasibility === 'HIGH' ? 'emerald' : det.feasibility === 'MEDIUM' ? 'amber' : 'red'));
    badgeRow.appendChild(Components.SignalBadge(det.costTier, 'gray'));
    badgeRow.appendChild(Components.SignalBadge(det.monthlyCost, 'teal'));
    header.appendChild(badgeRow);
    _panel.appendChild(header);

    // Detection methodology
    var methLabel = document.createElement('div');
    methLabel.className = 'label-lg';
    methLabel.textContent = 'DETECTION METHODOLOGY';
    methLabel.style.marginBottom = 'var(--space-2)';
    _panel.appendChild(methLabel);

    var methList = document.createElement('ul');
    methList.className = 'sd-method-list';
    det.subSignals.forEach(function(sig) {
      var li = document.createElement('li');
      li.textContent = sig;
      methList.appendChild(li);
    });
    _panel.appendChild(methList);

    // API Sources
    var srcLabel = document.createElement('div');
    srcLabel.className = 'label-lg';
    srcLabel.textContent = 'API SOURCES';
    srcLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    _panel.appendChild(srcLabel);

    det.apiSources.forEach(function(src) {
      var row = document.createElement('div');
      row.className = 'sd-source-row';
      var info = document.createElement('div');
      info.className = 'sd-source-info';
      var typeCls = 'sd-source-type';
      if (src.type === 'PRIMARY') typeCls += ' sd-source-type--primary';
      else if (src.type === 'SECONDARY') typeCls += ' sd-source-type--secondary';
      else if (src.type === 'ENRICHMENT') typeCls += ' sd-source-type--enrichment';
      info.innerHTML =
        '<span class="heading-sm" style="font-size:12px">' + E(src.name) + '</span>' +
        '<span class="' + typeCls + '">' + E(src.type) + '</span>' +
        '<span class="body-sm" style="color:var(--text-muted);font-size:11px">' + E(src.dataType) + '</span>';
      row.appendChild(info);
      var cost = document.createElement('span');
      cost.className = 'mono-sm';
      cost.style.color = 'var(--text-secondary)';
      cost.style.whiteSpace = 'nowrap';
      cost.textContent = src.cost;
      row.appendChild(cost);
      _panel.appendChild(row);
    });

    // Simulation controls
    var simLabel = document.createElement('div');
    simLabel.className = 'label-lg';
    simLabel.textContent = 'DETECTION SIMULATION';
    simLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    _panel.appendChild(simLabel);

    var btnRow = document.createElement('div');
    btnRow.className = 'sd-btn-row';

    var runBtn = Components.ActionButton({
      label: !_simRunning ? 'Run Detection' : _simPaused ? 'Resume' : 'Pause',
      variant: 'primary',
      onAddListener: base.onAddListener,
      onClick: function() {
        if (!_simRunning) {
          _simRunning = true;
          _simPaused = false;
          _simIndex = 0;
          _simCost = 0;
          buildPanel();
          runSimulation();
        } else if (!_simPaused) {
          _simPaused = true;
          runBtn.textContent = 'Resume';
        } else {
          _simPaused = false;
          runBtn.textContent = 'Pause';
          runSimulation();
        }
      }
    });
    btnRow.appendChild(runBtn);

    if (_simRunning) {
      var resetBtn = Components.ActionButton({
        label: 'Reset',
        variant: 'ghost',
        onAddListener: base.onAddListener,
        onClick: function() {
          _simRunning = false;
          _simPaused = false;
          _simIndex = 0;
          _simCost = 0;
          base._clearTimers();
          buildPanel();
        }
      });
      btnRow.appendChild(resetBtn);
    }
    _panel.appendChild(btnRow);

    // Cost accumulator
    var costBar = document.createElement('div');
    costBar.className = 'sd-cost-bar';
    costBar.id = 'sd-cost-bar';
    costBar.innerHTML =
      '<span class="label-sm">RUNNING COST</span>' +
      '<span class="mono-md" style="color:var(--amber)">$' + E(_simCost.toFixed(2)) + '</span>';
    _panel.appendChild(costBar);

    // Live indicator
    if (_simRunning && !_simPaused) {
      var liveHeader = document.createElement('div');
      liveHeader.className = 'sd-live-header';
      liveHeader.innerHTML = '<span class="live-dot"></span><span class="label-sm">LIVE DETECTION SCAN</span>';
      _panel.appendChild(liveHeader);
    }

    // Simulation feed
    var feed = document.createElement('div');
    feed.className = 'sd-sim-feed';
    feed.id = 'sd-sim-feed';
    _panel.appendChild(feed);

    // Results container (populated when sim completes)
    var resultsContainer = document.createElement('div');
    resultsContainer.id = 'sd-results';
    _panel.appendChild(resultsContainer);
  }

  // ── Simulation playback ──
  function runSimulation() {
    if (_destroyed || !_simRunning || _simPaused || !_selectedDetector) return;
    var steps = _selectedDetector.simulationSteps;
    if (_simIndex >= steps.length) return;

    var step = steps[_simIndex];
    var color = PHASE_COLORS[step.phase] || _selectedDetector.color;

    var entry = Components.FeedEntry({
      agent: step.source.toUpperCase(),
      color: color,
      time: step.time,
      text: step.text
    });
    entry.style.opacity = '0';
    entry.style.transition = 'opacity 300ms var(--ease-out)';

    var feed = document.getElementById('sd-sim-feed');
    if (feed) {
      feed.insertBefore(entry, feed.firstChild);
      requestAnimationFrame(function() { entry.style.opacity = '1'; });
    }

    // Update cost
    _simCost += step.costDelta || 0;
    var costBar = document.getElementById('sd-cost-bar');
    if (costBar) {
      costBar.innerHTML =
        '<span class="label-sm">RUNNING COST</span>' +
        '<span class="mono-md" style="color:var(--amber)">$' + E(_simCost.toFixed(2)) + '</span>';
    }

    _simIndex++;

    if (_simIndex < steps.length) {
      base._timeout(runSimulation, 1200);
    } else {
      // Simulation complete — show results
      base._timeout(function() {
        buildResults();
      }, 800);
    }
  }

  // ── Build detection results ──
  function buildResults() {
    var resultsEl = document.getElementById('sd-results');
    if (!resultsEl || !_selectedDetector) return;

    resultsEl.innerHTML = '';

    var label = document.createElement('div');
    label.className = 'label-lg';
    label.textContent = 'DETECTION RESULTS';
    label.style.margin = 'var(--space-4) 0 var(--space-2)';
    resultsEl.appendChild(label);

    var matches = getMatchedProspects(_selectedDetector.id);
    if (matches.length === 0) {
      var noMatch = document.createElement('p');
      noMatch.className = 'body-sm';
      noMatch.style.color = 'var(--text-muted)';
      noMatch.textContent = 'No matching prospects in current pipeline.';
      resultsEl.appendChild(noMatch);
      return;
    }

    matches.forEach(function(m) {
      var row = document.createElement('div');
      row.className = 'sd-result-row';
      var info = document.createElement('div');
      info.className = 'sd-result-info';

      var nameSpan = document.createElement('span');
      nameSpan.className = 'heading-sm';
      nameSpan.style.fontSize = '12px';
      nameSpan.textContent = m.prospect.company;
      info.appendChild(nameSpan);
      info.appendChild(Components.TierBadge(m.prospect.tier));
      row.appendChild(info);

      var confSpan = document.createElement('span');
      confSpan.className = 'mono-md';
      confSpan.style.color = 'var(--emerald)';
      confSpan.textContent = Math.round(m.confidence * 100) + '%';
      row.appendChild(confSpan);

      base._on(row, 'click', function() {
        window.location.hash = '#deal-pipeline';
      });
      resultsEl.appendChild(row);
    });

    // Summary callout
    resultsEl.appendChild(Components.CalloutBox({
      title: 'SCAN SUMMARY',
      text: _selectedDetector.name + ' detector identified ' + matches.length + ' matching prospects in the active pipeline. Total simulation cost: $' + _simCost.toFixed(2) + '. Click any result to view in Deal Pipeline.',
      color: _selectedDetector.color
    }));
  }

  // ── Render filtered cards ──
  function renderCards() {
    _cardEls.forEach(function(c) {
      var show = _activeTier === 'ALL' || c.detector.feasibility === _activeTier;
      c.el.style.display = show ? '' : 'none';
    });
  }

  // ── Module init ──
  function init(container, panel) {
    _container = container;
    _panel = panel;
    _destroyed = false;
    _selectedDetector = null;
    _simRunning = false;
    _simPaused = false;
    _simIndex = 0;
    _simCost = 0;
    _activeTier = 'ALL';
    _cardEls = [];

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Signal Detection Simulator';
    container.appendChild(title);

    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'Visualize how 8 specialized signal detectors scan real-world data sources to identify PE deal opportunities. Select a detector to explore its methodology and run a simulated scan.';
    container.appendChild(sub);

    // KPI row
    var detectors = Data.signalDetectors;
    var uniqueSources = {};
    detectors.forEach(function(d) {
      d.apiSources.forEach(function(s) { uniqueSources[s.name] = true; });
    });
    var highCount = detectors.filter(function(d) { return d.feasibility === 'HIGH'; }).length;

    var kpiRow = document.createElement('div');
    kpiRow.className = 'sd-kpi-row';
    kpiRow.appendChild(Components.KPICard({ label: 'SIGNAL DETECTORS', value: String(detectors.length), size: 'md', valueColor: 'teal' }));
    kpiRow.appendChild(Components.KPICard({ label: 'API SOURCES', value: String(Object.keys(uniqueSources).length), size: 'md', valueColor: 'blue' }));
    kpiRow.appendChild(Components.KPICard({ label: 'HIGH FEASIBILITY', value: String(highCount), size: 'md', valueColor: 'emerald' }));
    kpiRow.appendChild(Components.KPICard({ label: 'AVG COST/DETECTOR', value: '$2.5K', size: 'md', valueColor: 'amber' }));
    container.appendChild(kpiRow);

    // Filter tabs
    var tierCounts = { ALL: detectors.length, HIGH: 0, MEDIUM: 0, EXPLORATORY: 0 };
    detectors.forEach(function(d) { tierCounts[d.feasibility] = (tierCounts[d.feasibility] || 0) + 1; });

    var filterBar = Components.FilterTabBar({
      tabs: [
        { label: 'ALL', count: tierCounts.ALL, color: 'text-muted' },
        { label: 'HIGH', count: tierCounts.HIGH, color: 'emerald' },
        { label: 'MEDIUM', count: tierCounts.MEDIUM, color: 'amber' },
        { label: 'EXPLORATORY', count: tierCounts.EXPLORATORY, color: 'red' }
      ],
      onSelect: function(label) {
        _activeTier = label;
        renderCards();
      },
      onAddListener: base.onAddListener
    });
    container.appendChild(filterBar);

    // Detector cards
    detectors.forEach(function(det) {
      var card = buildDetectorCard(det);
      _cardEls.push({ el: card, detector: det });
      container.appendChild(card);
    });

    // Build initial panel
    buildPanel();
  }

  // ── Module destroy ──
  function destroy() {
    _destroyed = true;
    _simRunning = false;
    _simPaused = false;
    _selectedDetector = null;
    _cardEls = [];
    base._destroy();
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['signal-detection'] = { init: init, destroy: destroy };
})();
