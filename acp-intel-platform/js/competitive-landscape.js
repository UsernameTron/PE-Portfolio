/* === MODULE: competitive-landscape === */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _timers = [];
  var _listeners = [];

  function _interval(fn, ms) { var id = setInterval(fn, ms); _timers.push(id); return id; }
  function _timeout(fn, ms) { var id = setTimeout(fn, ms); _timers.push(id); return id; }
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

    // Where ACP wins
    card.appendChild(Components.CalloutBox({ text: comp.whereACPWins, title: 'WHERE ACP WINS', color: 'emerald' }));

    // Metrics
    var metricsRow = document.createElement('div');
    metricsRow.className = 'cm-metrics-row';
    metricsRow.innerHTML =
      '<div class="cm-metric"><span class="label-sm">DEALS/YR</span><span class="mono-sm">' + comp.metrics.deals + '</span></div>' +
      '<div class="cm-metric"><span class="label-sm">CHECK SIZE</span><span class="mono-sm">' + comp.metrics.checkSize + '</span></div>' +
      '<div class="cm-metric"><span class="label-sm">SECTORS</span><span class="mono-sm">' + comp.metrics.sectors + '</span></div>';
    card.appendChild(metricsRow);

    return card;
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Competitive Landscape';
    container.appendChild(title);
    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'PE competitive landscape analysis: who competes for ACP\u2019s target deals, and where ACP wins.';
    container.appendChild(sub);

    // 2x2 grid
    var grid = document.createElement('div');
    grid.className = 'cm-grid';
    Data.competitors.forEach(function(comp) {
      grid.appendChild(buildCompetitorCard(comp));
    });
    container.appendChild(grid);

    // -- Panel --
    // Key Differentiators
    var diffLabel = document.createElement('div');
    diffLabel.className = 'label-lg';
    diffLabel.textContent = 'KEY DIFFERENTIATORS';
    diffLabel.style.marginBottom = 'var(--space-3)';
    panel.appendChild(diffLabel);

    var diffs = [
      'Proprietary sourcing network in 4 core sectors',
      'Operating partner model drives organic value creation',
      'Buy-and-build expertise: 95+ add-on acquisitions completed',
      'Founder-friendly reputation attracts off-market deals',
      '$1.8B AUM across 3 dedicated funds + co-invest vehicle',
      'Deep sector specialization vs. generalist competitors'
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
      ['Equity Check', '$20-60M', '$50-200M'],
      ['Target EBITDA', '$3-15M', '$10-50M'],
      ['Sector Focus', '4 core lanes', 'Generalist'],
      ['Add-On Capability', '95+ completed', 'Opportunistic'],
      ['Sourcing Model', 'Proprietary + AI', 'Banker-dependent']
    ];
    var h2hTable = document.createElement('div');
    h2hTable.className = 'cm-h2h-table';
    h2hTable.innerHTML = '<div class="cm-h2h-header"><span class="label-sm">METRIC</span><span class="label-sm" style="color:var(--emerald)">ACP</span><span class="label-sm" style="color:var(--text-muted)">PEERS</span></div>';
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
      title: 'AI-POWERED DEAL SOURCING \u2014 HIGH PRIORITY',
      text: 'No LMM competitor uses AI signal detection for deal origination. ACP\'s 5-agent architecture creates a proprietary sourcing moat that scales without headcount.',
      color: 'emerald'
    }));
    panel.appendChild(Components.CalloutBox({
      title: 'FOUNDER SUCCESSION TARGETING \u2014 MEDIUM PRIORITY',
      text: 'Baby boomer business owners creating $10T+ in transition value over the next decade. ACP\'s founder-friendly reputation and sector expertise position it as the partner of choice.',
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
  window.modules['competitive-landscape'] = { init: init, destroy: destroy };
})();
