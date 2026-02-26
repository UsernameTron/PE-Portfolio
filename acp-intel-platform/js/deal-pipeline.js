/* ═══ MODULE: deal-pipeline ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
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
    renderCards(filtered);
  }

  function tierColor(tier) {
    return tier === 'HOT' ? 'red' : tier === 'WARM' ? 'amber' : tier === 'NURTURE' ? 'teal' : 'text-faint';
  }

  function buildCard(prospect) {
    var card = document.createElement('div');
    card.className = 'pi-card';
    card.style.borderTopColor = 'var(--' + tierColor(prospect.tier) + ')';

    var scoreEl = Components.CircularScore({ score: prospect.score, size: 50, tier: prospect.tier, colorMode: 'positive' });
    card.appendChild(scoreEl);

    var name = document.createElement('div');
    name.className = 'heading-md pi-card-name';
    name.textContent = prospect.company;
    card.appendChild(name);

    var loc = document.createElement('div');
    loc.className = 'body-sm pi-card-location';
    loc.textContent = prospect.location;
    card.appendChild(loc);

    var badges = document.createElement('div');
    badges.className = 'pi-card-badges';
    badges.appendChild(Components.TierBadge(prospect.tier));
    if (prospect.signals) {
      prospect.signals.slice(0, 2).forEach(function(sig, i) {
        badges.appendChild(Components.SignalBadge(sig, prospect.signalColors[i]));
      });
    }
    card.appendChild(badges);

    var stats = document.createElement('div');
    stats.className = 'pi-card-stats body-sm';
    stats.innerHTML =
      '<div>Revenue: <span class="mono-md">' + E(prospect.revenue) + '</span></div>' +
      '<div>Sector: ' + E(prospect.sector) + '</div>' +
      '<div>EBITDA: <span class="mono-md" style="color:var(--emerald)">' + E(prospect.ebitda) + '</span></div>' +
      '<div>Stage: <span style="color:var(--red)">' + E(prospect.processStage) + '</span></div>';
    card.appendChild(stats);

    base._on(card, 'click', function() { openDetail(prospect); });
    return card;
  }

  function openDetail(p) {
    _panel.innerHTML = '';
    _panel.classList.add('pi-panel-open');

    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.className = 'pi-close-btn';
    closeBtn.innerHTML = '&times;';
    base._on(closeBtn, 'click', function() {
      _panel.classList.remove('pi-panel-open');
      _panel.innerHTML = '';
    });
    _panel.appendChild(closeBtn);

    // Company + location
    var heading = document.createElement('div');
    heading.className = 'heading-lg';
    heading.textContent = p.company;
    _panel.appendChild(heading);
    var loc = document.createElement('div');
    loc.className = 'body-sm';
    loc.style.color = 'var(--text-secondary)';
    loc.textContent = p.location;
    loc.style.marginBottom = 'var(--space-4)';
    _panel.appendChild(loc);

    // Score ring
    var scoreWrap = document.createElement('div');
    scoreWrap.style.textAlign = 'center';
    scoreWrap.style.marginBottom = 'var(--space-4)';
    scoreWrap.appendChild(Components.CircularScore({ score: p.score, size: 120, tier: p.tier, colorMode: 'positive' }));
    _panel.appendChild(scoreWrap);

    // Tier badge centered
    var tierWrap = document.createElement('div');
    tierWrap.style.textAlign = 'center';
    tierWrap.style.marginBottom = 'var(--space-4)';
    tierWrap.appendChild(Components.TierBadge(p.tier));
    _panel.appendChild(tierWrap);

    // Radar chart
    var radarColor = p.tier === 'HOT' ? 'red' : p.tier === 'WARM' ? 'amber' : 'emerald';
    var cf = p.convictionFactors;
    var radarWrap = document.createElement('div');
    radarWrap.style.textAlign = 'center';
    radarWrap.style.marginBottom = 'var(--space-4)';
    radarWrap.appendChild(Components.RadarChart({
      values: [cf.sectorFit, cf.mgmtQuality, cf.growthRunway, cf.ebitdaQuality, cf.dealComplexity, cf.competitiveProc],
      labels: ['Sector Fit', 'Mgmt Quality', 'Growth Runway', 'EBITDA Quality', 'Deal Complexity', 'Competitive Proc.'],
      size: 200,
      color: radarColor
    }));
    _panel.appendChild(radarWrap);

    // Conviction factor bars
    var factorLabel = document.createElement('div');
    factorLabel.className = 'label-lg';
    factorLabel.textContent = 'CONVICTION FACTOR BREAKDOWN';
    factorLabel.style.marginBottom = 'var(--space-3)';
    _panel.appendChild(factorLabel);

    var factorNames = ['Sector Fit', 'Mgmt Quality', 'Growth Runway', 'EBITDA Quality', 'Deal Complexity', 'Competitive Proc.'];
    var factorVals = [cf.sectorFit, cf.mgmtQuality, cf.growthRunway, cf.ebitdaQuality, cf.dealComplexity, cf.competitiveProc];
    factorNames.forEach(function(name, i) {
      var val = factorVals[i];
      var barColor = val >= 75 ? 'var(--emerald)' : val >= 50 ? 'var(--teal)' : val >= 25 ? 'var(--amber)' : 'var(--text-muted)';
      var row = document.createElement('div');
      row.className = 'pi-factor-row';
      row.innerHTML =
        '<span class="body-sm pi-factor-name">' + E(name) + '</span>' +
        '<div class="pi-factor-bar-track"><div class="pi-factor-bar-fill" style="width:' + val + '%;background:' + barColor + '"></div></div>' +
        '<span class="mono-md pi-factor-val">' + E(val) + '</span>';
      _panel.appendChild(row);
    });

    // Thesis alignment
    if (p.thesisAlignments && p.thesisAlignments.length) {
      var svcLabel = document.createElement('div');
      svcLabel.className = 'label-lg';
      svcLabel.textContent = 'THESIS ALIGNMENT';
      svcLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
      _panel.appendChild(svcLabel);
      var svcWrap = document.createElement('div');
      svcWrap.className = 'pi-svc-tags';
      p.thesisAlignments.forEach(function(svc) {
        svcWrap.appendChild(Components.SignalBadge(svc, 'emerald'));
      });
      _panel.appendChild(svcWrap);
    }

    // Key intelligence
    if (p.keyIntelligence && p.keyIntelligence.length) {
      var kiLabel = document.createElement('div');
      kiLabel.className = 'label-lg';
      kiLabel.textContent = 'KEY INTELLIGENCE';
      kiLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
      _panel.appendChild(kiLabel);
      var kiTable = document.createElement('div');
      kiTable.className = 'pi-ki-table';
      p.keyIntelligence.forEach(function(item) {
        var kiRow = document.createElement('div');
        kiRow.className = 'pi-ki-row';
        var kiLabel = document.createElement('span');
        kiLabel.className = 'body-sm';
        kiLabel.style.color = 'var(--text-muted)';
        kiLabel.textContent = item.label;
        var kiValue = document.createElement('span');
        kiValue.className = 'body-sm';
        kiValue.textContent = item.value;
        kiRow.appendChild(kiLabel);
        kiRow.appendChild(kiValue);
        kiTable.appendChild(kiRow);
      });
      _panel.appendChild(kiTable);
    }

    // Signal intelligence
    if (p.signalDetails && p.signalDetails.length > 0) {
      var signalSection = document.createElement('div');
      signalSection.className = 'signal-details-section';
      var signalHeader = document.createElement('div');
      signalHeader.className = 'label-lg';
      signalHeader.textContent = 'SIGNAL INTELLIGENCE';
      signalHeader.style.margin = 'var(--space-4) 0 var(--space-2)';
      signalSection.appendChild(signalHeader);
      p.signalDetails.forEach(function(s) {
        signalSection.appendChild(Components.SignalDetailCard({ signal: s }));
      });
      _panel.appendChild(signalSection);
    }

    // Notes
    if (p.notes) {
      var notesLabel = document.createElement('div');
      notesLabel.className = 'label-lg';
      notesLabel.textContent = 'NOTES';
      notesLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
      _panel.appendChild(notesLabel);
      var notesPara = document.createElement('p');
      notesPara.className = 'body-sm';
      notesPara.textContent = p.notes;
      _panel.appendChild(notesPara);
    }

    // Action buttons
    var btnWrap = document.createElement('div');
    btnWrap.style.marginTop = 'var(--space-4)';
    btnWrap.appendChild(Components.ActionButton({ label: 'Assign Deal Lead', variant: 'ghost' }));
    btnWrap.appendChild(Components.ActionButton({ label: 'Generate IC Memo', variant: 'ghost' }));
    btnWrap.appendChild(Components.ActionButton({ label: 'Flag for IC Review', variant: 'ghost-red' }));
    _panel.appendChild(btnWrap);
  }

  function renderCards(prospects) {
    var grid = _container.querySelector('.pi-card-grid');
    if (!grid) return;
    grid.innerHTML = '';
    prospects.sort(function(a, b) { return b.score - a.score; });
    if (prospects.length === 0) {
      grid.appendChild(Components.EmptyState({ title: 'No deals found', message: 'Try adjusting your search or filter criteria.' }));
      return;
    }
    prospects.forEach(function(p) { grid.appendChild(buildCard(p)); });
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;

    var counts = Data.getTierCounts();

    // Search input
    container.appendChild(Components.SearchInput({
      placeholder: 'Search deals by company, sector, location, stage...',
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

    // Card grid
    var grid = document.createElement('div');
    grid.className = 'pi-card-grid';
    container.appendChild(grid);

    renderCards(Data.prospects.slice());
  }

  function destroy() {
    base._destroy();
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['deal-pipeline'] = { init: init, destroy: destroy };
})();
