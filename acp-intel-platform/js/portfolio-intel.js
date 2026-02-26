/* === MODULE: portfolio-intel === */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _activePhase = 0;
  var _viewMode = 'roadmap';
  var base = ModuleBase();
  var E = Components.esc;

  function statusBadgeHTML(status, color) {
    var bg = color === 'emerald' ? 'var(--emerald)' : color === 'amber' ? 'var(--amber)' : 'var(--text-faint)';
    var textColor = color === 'amber' ? 'var(--text-on-accent)' : 'var(--text)';
    return '<span style="display:inline-block;font:700 10px/1 var(--font-mono);padding:3px 8px;border-radius:var(--radius-sm);background:' + bg + ';color:' + textColor + '">' + E(status) + '</span>';
  }

  function getDataSource() {
    return _viewMode === 'roadmap' ? Data.roadmapPhases : Data.sectorLanes;
  }

  function renderPhaseDetail(phase) {
    var detail = _container.querySelector('.br-detail');
    if (!detail) return;
    detail.innerHTML = '';

    // Status + Name
    var header = document.createElement('div');
    header.className = 'br-detail-header';
    header.innerHTML = statusBadgeHTML(phase.status, phase.statusColor);
    detail.appendChild(header);

    var name = document.createElement('div');
    name.className = 'heading-lg';
    name.textContent = phase.name;
    name.style.marginTop = 'var(--space-2)';
    detail.appendChild(name);

    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.textContent = phase.subtitle;
    detail.appendChild(sub);

    var weeks = document.createElement('div');
    weeks.className = 'mono-md';
    weeks.style.color = 'var(--emerald)';
    weeks.style.margin = 'var(--space-2) 0';
    weeks.textContent = phase.weeks;
    detail.appendChild(weeks);

    var invest = document.createElement('div');
    invest.className = 'label-lg';
    invest.textContent = 'INVESTMENT: ' + phase.investment;
    invest.style.marginBottom = 'var(--space-4)';
    detail.appendChild(invest);

    // Tasks (2x2 grid)
    var taskGrid = document.createElement('div');
    taskGrid.className = 'br-task-grid';
    phase.tasks.forEach(function(task) {
      var taskEl = document.createElement('div');
      taskEl.className = 'br-task';
      taskEl.innerHTML = '<span class="body-sm">' + E(task.name) + '</span><span class="mono-sm" style="color:var(--emerald)">' + E(task.hours) + '</span>';
      taskGrid.appendChild(taskEl);
    });
    detail.appendChild(taskGrid);

    // Metrics
    var metricsLabel = document.createElement('div');
    metricsLabel.className = 'label-lg';
    metricsLabel.textContent = 'KEY METRICS';
    metricsLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    detail.appendChild(metricsLabel);

    var metricsRow = document.createElement('div');
    metricsRow.className = 'br-metrics-row';
    phase.metrics.forEach(function(m) {
      metricsRow.innerHTML += '<div class="br-metric"><span class="label-sm">' + E(m.label.toUpperCase()) + '</span><span class="mono-md" style="color:var(--emerald)">' + E(m.value) + '</span></div>';
    });
    detail.appendChild(metricsRow);

    // Deliverable
    var delLabel = document.createElement('div');
    delLabel.className = 'label-lg';
    delLabel.textContent = 'DELIVERABLE';
    delLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    detail.appendChild(delLabel);
    var delText = document.createElement('p');
    delText.className = 'body-sm';
    delText.textContent = phase.deliverable;
    detail.appendChild(delText);
  }

  function renderPanel() {
    if (!_panel) return;
    _panel.innerHTML = '';

    if (_viewMode === 'roadmap') {
      // ── Roadmap Panel: Investment Summary ──
      var investLabel = document.createElement('div');
      investLabel.className = 'label-lg';
      investLabel.textContent = 'TOTAL INVESTMENT';
      investLabel.style.marginBottom = 'var(--space-3)';
      _panel.appendChild(investLabel);

      var total = 0;
      Data.roadmapPhases.forEach(function(phase) {
        total += parseInt(phase.investment.replace(/[$,]/g, ''), 10);
        var row = document.createElement('div');
        row.className = 'br-invest-row';
        row.innerHTML = '<span class="body-sm">' + E(phase.name) + '</span><span class="mono-md">' + E(phase.investment) + '</span>';
        _panel.appendChild(row);
      });

      var totalRow = document.createElement('div');
      totalRow.className = 'br-invest-row br-invest-total';
      totalRow.innerHTML = '<span class="heading-sm">TOTAL</span><span class="mono-lg" style="color:var(--emerald)">$' + E(total.toLocaleString()) + '</span>';
      _panel.appendChild(totalRow);

      _panel.appendChild(Components.CalloutBox({
        title: 'PLATFORM ROI',
        text: 'At $' + total.toLocaleString() + ' total investment with 15 portfolio companies generating $2.4B+ aggregate enterprise value, the intelligence platform delivers measurable deal-sourcing acceleration and portfolio monitoring ROI.',
        color: 'emerald'
      }));

    } else {
      // ── Sector Lanes Panel: Portfolio Overview ──
      var overviewLabel = document.createElement('div');
      overviewLabel.className = 'label-lg';
      overviewLabel.textContent = 'PORTFOLIO OVERVIEW';
      overviewLabel.style.marginBottom = 'var(--space-3)';
      _panel.appendChild(overviewLabel);

      var totalCos = Data.portfolioCompanies.length;
      var activeCos = Data.getActivePortfolioCompanies().length;
      var totalAddOns = Data.getTotalAddOns();

      var stats = [
        { label: 'Total Companies', value: totalCos.toString() },
        { label: 'Active Holdings', value: activeCos.toString() },
        { label: 'Total Add-Ons', value: totalAddOns.toString() }
      ];

      stats.forEach(function(stat) {
        var row = document.createElement('div');
        row.className = 'br-invest-row';
        row.innerHTML = '<span class="body-sm">' + E(stat.label) + '</span><span class="mono-md" style="color:var(--emerald)">' + E(stat.value) + '</span>';
        _panel.appendChild(row);
      });

      _panel.appendChild(Components.CalloutBox({
        title: 'SECTOR CONCENTRATION',
        text: 'Portfolio diversified across 4 primary sector lanes: Software & TES, Professional Services, Industrial Services, and Specialty M&D. Concentration risk monitored continuously with automated rebalancing alerts.',
        color: 'emerald'
      }));
    }
  }

  function renderView() {
    // Remove existing layout (everything after the filter tab bar)
    var existing = _container.querySelector('.br-layout');
    if (existing) existing.remove();

    var data = getDataSource();
    _activePhase = 0;

    // Layout: sub-nav + detail
    var layout = document.createElement('div');
    layout.className = 'br-layout';

    // Sub-nav (timeline)
    var nav = document.createElement('div');
    nav.className = 'br-timeline-nav';
    data.forEach(function(phase, i) {
      var item = document.createElement('div');
      item.className = 'br-timeline-item' + (i === _activePhase ? ' active' : '');
      item.innerHTML =
        '<div class="br-timeline-dot" style="background:var(--' + phase.statusColor + ')"></div>' +
        '<div class="br-timeline-text">' +
          '<span class="heading-sm">' + E(phase.name) + '</span>' +
          '<span class="body-sm" style="color:var(--text-muted)">' + E(phase.weeks) + '</span>' +
        '</div>';
      if (i < data.length - 1) {
        item.innerHTML += '<div class="br-timeline-line"></div>';
      }
      base._on(item, 'click', function() {
        _activePhase = i;
        nav.querySelectorAll('.br-timeline-item').forEach(function(el, j) {
          el.classList.toggle('active', j === i);
        });
        renderPhaseDetail(data[i]);
      });
      nav.appendChild(item);
    });
    layout.appendChild(nav);

    // Detail panel
    var detail = document.createElement('div');
    detail.className = 'br-detail';
    layout.appendChild(detail);

    _container.appendChild(layout);
    renderPhaseDetail(data[0]);

    // Update panel for current view mode
    renderPanel();
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;
    _activePhase = 0;
    _viewMode = 'roadmap';

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Portfolio Intelligence';
    container.appendChild(title);
    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'Fund roadmap and sector lane analysis for ACP deal sourcing intelligence platform.';
    container.appendChild(sub);

    // View toggle: FilterTabBar
    var viewToggle = Components.FilterTabBar({
      tabs: [
        { label: 'FUND ROADMAP', count: Data.roadmapPhases.length },
        { label: 'SECTOR LANES', count: Data.sectorLanes.length }
      ],
      onSelect: function(label) {
        _viewMode = label === 'FUND ROADMAP' ? 'roadmap' : 'sectors';
        renderView();
      },
      onAddListener: base.onAddListener
    });
    container.appendChild(viewToggle);

    // Initial render
    renderView();
  }

  function destroy() {
    base._destroy();
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['portfolio-intel'] = { init: init, destroy: destroy };
})();
