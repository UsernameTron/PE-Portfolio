/* ═══ MODULE: command-center ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _tableEl = null;
  var _activeTier = 'ALL';
  var _searchTerm = '';
  var base = ModuleBase();
  var E = Components.esc;

  function applyFilters() {
    var filtered = _activeTier === 'ALL' ? Data.prospects.slice() : Data.prospects.filter(function(p) { return p.tier === _activeTier; });
    if (_searchTerm) {
      var term = _searchTerm.toLowerCase();
      filtered = filtered.filter(function(p) {
        return (p.company && p.company.toLowerCase().indexOf(term) !== -1) ||
               (p.sector && p.sector.toLowerCase().indexOf(term) !== -1) ||
               (p.location && p.location.toLowerCase().indexOf(term) !== -1) ||
               (p.processStage && p.processStage.toLowerCase().indexOf(term) !== -1);
      });
    }
    filtered.sort(function(a, b) { return b.score - a.score; });
    if (_tableEl) _tableEl.updateRows(filtered);
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;

    var counts = Data.getTierCounts();

    // ── Hero KPIs ──
    var heroGrid = document.createElement('div');
    heroGrid.className = 'cc-hero-grid';
    heroGrid.appendChild(Components.KPICard({ label: 'COMMITTED CAPITAL', value: '$' + (Data.fundEconomics.totalAUM / 1000).toFixed(1) + 'B', subtitle: 'Total AUM across all funds' }));
    heroGrid.appendChild(Components.KPICard({ label: 'HOT DEALS', value: String(counts.HOT), subtitle: 'Active deal pipeline', valueColor: 'red' }));
    heroGrid.appendChild(Components.KPICard({ label: 'ACTIVE FUND', value: 'Fund III', subtitle: '$620M | Oct 2022 vintage', valueColor: 'amber' }));
    heroGrid.appendChild(Components.KPICard({ label: 'PIPELINE EV', value: Data.getAggregateEV(), subtitle: 'Aggregate enterprise value' }));
    if (Data.getSignalSummary) {
      var signalSummary = Data.getSignalSummary();
      heroGrid.appendChild(Components.KPICard({ label: 'ACTIVE SIGNALS', value: String(signalSummary.totalActiveSignals), subtitle: 'Avg confidence: ' + signalSummary.avgConfidence, valueColor: 'emerald' }));
    }
    container.appendChild(heroGrid);

    // ── Market Pulse ──
    var pulseLabel = document.createElement('div');
    pulseLabel.className = 'label-lg cc-section-label';
    pulseLabel.textContent = 'FUND PULSE';
    container.appendChild(pulseLabel);

    var pulseGrid = document.createElement('div');
    pulseGrid.className = 'cc-pulse-grid';
    pulseGrid.appendChild(Components.KPICard({ label: 'SECTOR LANES', value: '4', size: 'md' }));
    pulseGrid.appendChild(Components.KPICard({ label: 'TARGET EBITDA', value: '$3-15M', size: 'md' }));
    pulseGrid.appendChild(Components.KPICard({ label: 'ACQUISITIONS', value: '125+', size: 'md' }));
    container.appendChild(pulseGrid);

    // ── Pipeline Overview ──
    var pipeLabel = document.createElement('div');
    pipeLabel.className = 'label-lg cc-section-label';
    pipeLabel.textContent = 'PIPELINE OVERVIEW';
    container.appendChild(pipeLabel);

    // Search input
    container.appendChild(Components.SearchInput({
      placeholder: 'Search prospects by company, sector, location, stage...',
      onSearch: function(term) { _searchTerm = term; applyFilters(); },
      onAddListener: base.onAddListener
    }));

    // Filter tabs
    var filterBar = Components.FilterTabBar({
      tabs: [
        { label: 'ALL', count: counts.ALL },
        { label: 'HOT', count: counts.HOT, color: 'red' },
        { label: 'WARM', count: counts.WARM, color: 'amber' },
        { label: 'NURTURE', count: counts.NURTURE, color: 'teal' },
        { label: 'STRATEGIC', count: counts.STRATEGIC, color: 'text-faint' }
      ],
      onSelect: function(tier) { _activeTier = tier; applyFilters(); },
      onAddListener: base.onAddListener
    });
    container.appendChild(filterBar);

    // Data table
    var sorted = Data.prospects.slice().sort(function(a, b) { return b.score - a.score; });
    _tableEl = Components.DataTable({
      columns: [
        { key: 'score', label: 'Conviction', width: '70px', align: 'center', format: function(v, row) {
          var color = row.tier === 'HOT' ? 'var(--red)' : row.tier === 'WARM' ? 'var(--amber)' : row.tier === 'NURTURE' ? 'var(--teal)' : 'var(--text-muted)';
          return '<span class="mono-md" style="color:' + color + '">' + E(v) + '</span>';
        }},
        { key: 'company', label: 'Company' },
        { key: 'sector', label: 'Sector' },
        { key: 'ebitda', label: 'EBITDA', align: 'right', format: function(v) { return '<span class="mono-md">' + E(v) + '</span>'; }},
        { key: 'evEstimate', label: 'EV' },
        { key: 'signals', label: 'Signal', format: function(v, row) {
          if (!v || !v.length) return '';
          return Components.SignalBadge(v[0], row.signalColors[0]).outerHTML;
        }},
        { key: 'processStage', label: 'Stage' },
        { key: 'tier', label: 'Tier', format: function(v) { return Components.TierBadge(v).outerHTML; }}
      ],
      rows: sorted,
      onAddListener: base.onAddListener
    });
    container.appendChild(_tableEl);

    // ── Panel: Sector Allocation ──
    var techLabel = document.createElement('div');
    techLabel.className = 'label-lg cc-section-label';
    techLabel.textContent = 'SECTOR ALLOCATION';
    panel.appendChild(techLabel);

    var platDist = Data.getSectorDistribution();
    var maxCount = platDist[0] ? platDist[0][1] : 1;
    var techChart = document.createElement('div');
    techChart.className = 'cc-tech-chart';
    platDist.forEach(function(entry) {
      var row = document.createElement('div');
      row.className = 'cc-tech-row';
      var pct = (entry[1] / maxCount) * 100;
      row.innerHTML =
        '<span class="cc-tech-name body-sm">' + E(entry[0]) + '</span>' +
        '<div class="cc-tech-bar-track"><div class="cc-tech-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="cc-tech-count mono-sm">' + E(entry[1]) + '</span>';
      techChart.appendChild(row);
    });
    panel.appendChild(techChart);

    // ── Panel: Process Stages ──
    var stageLabel = document.createElement('div');
    stageLabel.className = 'label-lg cc-section-label';
    stageLabel.textContent = 'PROCESS STAGES';
    panel.appendChild(stageLabel);

    var stageCounts = {};
    Data.prospects.forEach(function(p) {
      if (p.processStage) stageCounts[p.processStage] = (stageCounts[p.processStage] || 0) + 1;
    });
    var stageEntries = Object.keys(stageCounts).map(function(k) { return [k, stageCounts[k]]; });
    stageEntries.sort(function(a, b) { return b[1] - a[1]; });
    var stageMax = stageEntries[0] ? stageEntries[0][1] : 1;

    var stageChart = document.createElement('div');
    stageChart.className = 'cc-tech-chart';
    stageEntries.forEach(function(entry) {
      var row = document.createElement('div');
      row.className = 'cc-tech-row';
      var pct = (entry[1] / stageMax) * 100;
      row.innerHTML =
        '<span class="cc-tech-name body-sm">' + E(entry[0]) + '</span>' +
        '<div class="cc-tech-bar-track"><div class="cc-tech-bar-fill" style="width:' + pct + '%;background:var(--violet)"></div></div>' +
        '<span class="cc-tech-count mono-sm">' + E(entry[1]) + '</span>';
      stageChart.appendChild(row);
    });
    panel.appendChild(stageChart);

    // ── Panel: Intelligence Feed ──
    var feedHeader = document.createElement('div');
    feedHeader.className = 'cc-feed-header';
    feedHeader.innerHTML = '<span class="live-dot"></span><span class="label-sm">LIVE</span>';
    panel.appendChild(feedHeader);

    var feedLabel = document.createElement('div');
    feedLabel.className = 'label-lg cc-section-label';
    feedLabel.textContent = 'INTELLIGENCE FEED';
    panel.appendChild(feedLabel);

    var feedContainer = document.createElement('div');
    feedContainer.className = 'cc-feed-container';
    Data.feedEntries.forEach(function(entry) {
      feedContainer.appendChild(Components.FeedEntry(entry));
    });
    panel.appendChild(feedContainer);
  }

  function destroy() {
    base._destroy();
    _tableEl = null;
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['command-center'] = { init: init, destroy: destroy };
})();
