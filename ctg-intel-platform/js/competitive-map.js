/* ═══ MODULE: competitive-map ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _timers = [];
  var _listeners = [];

  function _interval(fn, ms) { var id = setInterval(fn, ms); _timers.push(id); return id; }
  function _on(target, event, handler) {
    target.addEventListener(event, handler);
    _listeners.push({ target: target, event: event, handler: handler });
  }

  function threatColor(level) {
    return level === 'HIGH' ? 'red' : level === 'MEDIUM' ? 'amber' : 'text-muted';
  }

  function buildCompetitorCard(comp) {
    var card = document.createElement('div');
    card.className = 'cm-comp-card';

    // Header
    var header = document.createElement('div');
    header.className = 'cm-comp-header';
    header.innerHTML =
      '<span class="heading-md">' + comp.name + '</span>' +
      '<span class="tier-badge" style="background:var(--' + threatColor(comp.threatLevel) + ');font-size:10px;padding:2px 6px">' + comp.threatLevel + '</span>';
    card.appendChild(header);

    // Market share
    var share = document.createElement('div');
    share.className = 'mono-lg cm-share';
    share.style.color = 'var(--' + threatColor(comp.threatLevel) + ')';
    share.textContent = comp.marketShare;
    card.appendChild(share);

    // Description
    var desc = document.createElement('p');
    desc.className = 'body-sm cm-desc';
    desc.textContent = comp.description;
    card.appendChild(desc);

    // Strengths
    var strLabel = document.createElement('div');
    strLabel.className = 'label-sm cm-list-label';
    strLabel.textContent = 'STRENGTHS';
    card.appendChild(strLabel);
    comp.strengths.forEach(function(s) {
      var item = document.createElement('div');
      item.className = 'body-sm cm-list-item';
      item.innerHTML = '<span style="color:var(--emerald)">+</span> ' + s;
      card.appendChild(item);
    });

    // Vulnerabilities
    var vulLabel = document.createElement('div');
    vulLabel.className = 'label-sm cm-list-label';
    vulLabel.style.marginTop = 'var(--space-2)';
    vulLabel.textContent = 'VULNERABILITIES';
    card.appendChild(vulLabel);
    comp.vulnerabilities.forEach(function(v) {
      var item = document.createElement('div');
      item.className = 'body-sm cm-list-item';
      item.innerHTML = '<span style="color:var(--red)">\u2212</span> ' + v;
      card.appendChild(item);
    });

    // Where CTG wins
    card.appendChild(Components.CalloutBox({ text: comp.whereCtgWins, title: 'WHERE CTG WINS', color: 'emerald' }));

    // Metrics
    var metricsRow = document.createElement('div');
    metricsRow.className = 'cm-metrics-row';
    metricsRow.innerHTML =
      '<div class="cm-metric"><span class="label-sm">TIME</span><span class="mono-sm">' + comp.metrics.time + '</span></div>' +
      '<div class="cm-metric"><span class="label-sm">COST</span><span class="mono-sm">' + comp.metrics.cost + '</span></div>' +
      '<div class="cm-metric"><span class="label-sm">COVERAGE</span><span class="mono-sm">' + comp.metrics.coverage + '</span></div>';
    card.appendChild(metricsRow);

    return card;
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Competitive Map';
    container.appendChild(title);
    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'Competitive landscape analysis: who enterprises choose instead of CTG, and why they shouldn\u2019t.';
    container.appendChild(sub);

    // 2x2 grid
    var grid = document.createElement('div');
    grid.className = 'cm-grid';
    Data.competitors.forEach(function(comp) {
      grid.appendChild(buildCompetitorCard(comp));
    });
    container.appendChild(grid);

    // ── Panel ──
    // Key Differentiators
    var diffLabel = document.createElement('div');
    diffLabel.className = 'label-lg';
    diffLabel.textContent = 'KEY DIFFERENTIATORS';
    diffLabel.style.marginBottom = 'var(--space-3)';
    panel.appendChild(diffLabel);

    var diffs = [
      'Zero cost to buyer (vendor-funded)',
      '90 specialist Gurus (not generalists)',
      '200+ vendor evaluation database',
      '2-week shortlist delivery',
      'Perpetual commission model',
      'AI-powered signal detection'
    ];
    diffs.forEach(function(d) {
      var item = document.createElement('div');
      item.className = 'body-sm cm-diff-item';
      item.innerHTML = '<span style="color:var(--emerald)">\u2713</span> ' + d;
      panel.appendChild(item);
    });

    // Head-to-head table
    var h2hLabel = document.createElement('div');
    h2hLabel.className = 'label-lg';
    h2hLabel.textContent = 'HEAD-TO-HEAD';
    h2hLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    panel.appendChild(h2hLabel);

    var h2hData = [
      ['Cost to Buyer', '$0', '$50K-$1M'],
      ['Evaluation Time', '2 weeks', '3-6 months'],
      ['Vendors Covered', '200+', '10-50'],
      ['Specialist Depth', 'CCaaS-only', 'Generalist'],
      ['Revenue Model', 'Perpetual', 'One-time']
    ];
    var h2hTable = document.createElement('div');
    h2hTable.className = 'cm-h2h-table';
    h2hTable.innerHTML = '<div class="cm-h2h-header"><span class="label-sm">METRIC</span><span class="label-sm" style="color:var(--emerald)">CTG</span><span class="label-sm" style="color:var(--text-muted)">ALT</span></div>';
    h2hData.forEach(function(row) {
      h2hTable.innerHTML += '<div class="cm-h2h-row"><span class="body-sm">' + row[0] + '</span><span class="mono-md" style="color:var(--emerald)">' + row[1] + '</span><span class="mono-md" style="color:var(--text-muted)">' + row[2] + '</span></div>';
    });
    panel.appendChild(h2hTable);

    // White space opportunities
    var wsLabel = document.createElement('div');
    wsLabel.className = 'label-lg';
    wsLabel.textContent = 'WHITE SPACE OPPORTUNITIES';
    wsLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    panel.appendChild(wsLabel);

    panel.appendChild(Components.CalloutBox({
      title: 'AI-POWERED VENDOR MATCHING \u2014 HIGH PRIORITY',
      text: 'No competitor uses AI to match prospect requirements to vendor capabilities. CTG\u2019s agent architecture creates an unassailable moat.',
      color: 'emerald'
    }));
    panel.appendChild(Components.CalloutBox({
      title: 'COMPLIANCE-SPECIFIC EVALUATION TRACKS \u2014 MEDIUM PRIORITY',
      text: 'Healthcare (HIPAA), financial (PCI/SOC2), and government (FedRAMP) need specialized evaluation frameworks. CTG can own these verticals.',
      color: 'amber'
    }));
  }

  function destroy() {
    _timers.forEach(function(id) { clearInterval(id); clearTimeout(id); });
    _timers = [];
    _listeners.forEach(function(l) { l.target.removeEventListener(l.event, l.handler); });
    _listeners = [];
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['competitive-map'] = { init: init, destroy: destroy };
})();
