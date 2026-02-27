/* ═══ MODULE: thesis-engine ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _sliders = [];
  var _weights = [0.20, 0.20, 0.15, 0.20, 0.15, 0.10];
  var base = ModuleBase();
  var E = Components.esc;

  var PRESETS = {
    'Platform Consolidation': [92, 78, 86, 82, 66, 86],
    'Founder Transition':     [80, 60, 70, 85, 80, 90],
    'Healthcare Services':    [85, 80, 75, 90, 55, 70],
    'Tech-Enabled Services':  [75, 85, 90, 70, 70, 60]
  };

  function computeScore() {
    var score = 0;
    _sliders.forEach(function(s, i) {
      score += s.val * _weights[i];
    });
    return Math.round(score);
  }

  function updatePanel() {
    if (!_panel) return;
    _panel.innerHTML = '';
    var score = computeScore();

    // Circular score (positive color mode — high = good for PE)
    var scoreWrap = document.createElement('div');
    scoreWrap.style.textAlign = 'center';
    scoreWrap.style.marginBottom = 'var(--space-4)';
    scoreWrap.appendChild(Components.CircularScore({ score: score, size: 120, colorMode: 'positive' }));
    _panel.appendChild(scoreWrap);

    // Conviction badge (inverted — high score = strong conviction)
    var conviction, convColor;
    if (score >= 75) { conviction = 'STRONG BUY'; convColor = 'emerald'; }
    else if (score >= 50) { conviction = 'QUALIFIED'; convColor = 'teal'; }
    else if (score >= 25) { conviction = 'WATCH LIST'; convColor = 'amber'; }
    else { conviction = 'PASS'; convColor = 'text-muted'; }

    var badge = document.createElement('div');
    badge.style.textAlign = 'center';
    badge.style.marginBottom = 'var(--space-4)';
    badge.innerHTML = '<span class="tier-badge tier-badge--' + (convColor === 'text-muted' ? 'strategic' : conviction.toLowerCase().replace(/\s/g, '-')) + '" style="background:var(--' + convColor + ');font-size:12px;padding:4px 12px">' + E(conviction) + '</span>';
    _panel.appendChild(badge);

    // KPIs
    var kpiGrid = document.createElement('div');
    kpiGrid.className = 'ss-kpi-grid';
    kpiGrid.appendChild(Components.KPICard({ label: 'TARGET IRR', value: String(Math.round(15 + score * 0.2)) + '%', size: 'md', valueColor: 'emerald' }));
    kpiGrid.appendChild(Components.KPICard({ label: 'EV/EBITDA TARGET', value: String((5 + score * 0.05).toFixed(1)) + 'x', size: 'md', valueColor: 'emerald' }));
    _panel.appendChild(kpiGrid);

    // Radar chart with conviction-based color and PE dimension labels
    var values = _sliders.map(function(s) { return s.val; });
    var radarColor = convColor === 'emerald' ? 'emerald' : convColor === 'teal' ? 'emerald' : 'amber';
    var radarWrap = document.createElement('div');
    radarWrap.style.textAlign = 'center';
    radarWrap.style.marginTop = 'var(--space-4)';
    radarWrap.appendChild(Components.RadarChart({
      values: values,
      size: 200,
      color: radarColor,
      labels: ['Sector Fit', 'Mgmt Quality', 'Growth Runway', 'EBITDA Quality', 'Deal Complexity', 'Competitive Proc.']
    }));
    _panel.appendChild(radarWrap);

    // Top pipeline matches — score prospects against current thesis weights
    var matchLabel = document.createElement('div');
    matchLabel.className = 'label-lg';
    matchLabel.textContent = 'TOP PIPELINE MATCHES';
    matchLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    _panel.appendChild(matchLabel);

    var thesisValues = _sliders.map(function(s) { return s.val; });
    var scored = Data.prospects.map(function(p) {
      var cf = p.convictionFactors;
      var factors = [cf.sectorFit, cf.mgmtQuality, cf.growthRunway, cf.ebitdaQuality, cf.dealComplexity, cf.competitiveProc];
      var matchScore = 0;
      factors.forEach(function(f, i) {
        matchScore += (1 - Math.abs(f - thesisValues[i]) / 100) * _weights[i] * 100;
      });
      return { prospect: p, matchScore: Math.round(matchScore) };
    });
    scored.sort(function(a, b) { return b.matchScore - a.matchScore; });
    scored.slice(0, 5).forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'te-match-row';
      row.innerHTML =
        '<div class="te-match-info">' +
          '<span class="heading-sm">' + E(item.prospect.company) + '</span>' +
          ' ' + Components.TierBadge(item.prospect.tier).outerHTML +
        '</div>' +
        '<span class="mono-md" style="color:var(--emerald)">' + E(item.matchScore) + '%</span>';
      base._on(row, 'click', function() { window.location.hash = '#deal-pipeline'; });
      row.style.cursor = 'pointer';
      _panel.appendChild(row);
    });

    // IC-style recommendation callout
    var recText = score >= 75 ? 'STRONG BUY \u2014 Recommend immediate IC presentation. Target exhibits exceptional conviction across all dimensions. Thesis alignment, management quality, and sector positioning support aggressive pursuit.' :
                  score >= 50 ? 'QUALIFIED \u2014 Proceed to detailed diligence. Core thesis elements present but require validation. Focus diligence on weakest conviction factors before IC submission.' :
                  score >= 25 ? 'WATCH LIST \u2014 Monitor for improving conditions. Current conviction insufficient for IC presentation. Key gaps in thesis alignment or management quality need resolution.' :
                  'PASS \u2014 Does not meet current investment criteria. Insufficient conviction across multiple dimensions. Maintain relationship for potential future evaluation.';
    _panel.appendChild(Components.CalloutBox({ title: 'IC RECOMMENDATION', text: recText, color: convColor === 'text-muted' ? 'emerald' : convColor }));
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;
    _sliders = [];

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Investment Thesis Engine';
    container.appendChild(title);
    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'Model conviction across 6 weighted dimensions to assess deal attractiveness and IC readiness.';
    container.appendChild(sub);

    // Preset buttons
    var presetRow = document.createElement('div');
    presetRow.className = 'ss-preset-row';
    Object.keys(PRESETS).forEach(function(name) {
      var btn = document.createElement('button');
      btn.className = 'ss-preset-btn';
      btn.textContent = name;
      base._on(btn, 'click', function() {
        presetRow.querySelectorAll('.ss-preset-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var vals = PRESETS[name];
        _sliders.forEach(function(s, i) { s.el.setValue(vals[i]); s.val = vals[i]; });
        updatePanel();
      });
      presetRow.appendChild(btn);
    });
    container.appendChild(presetRow);

    // 6 Sliders — PE investment thesis dimensions
    var labels = ['Sector Fit (20%)', 'Management Quality (20%)', 'Growth Runway (15%)', 'EBITDA Quality (20%)', 'Deal Complexity (15%)', 'Competitive Process (10%)'];
    var defaults = [75, 70, 65, 70, 60, 55];

    labels.forEach(function(label, i) {
      var sliderObj = { val: defaults[i], el: null };
      var slider = Components.RangeSlider({
        label: label,
        min: 0, max: 100, value: defaults[i],
        onChange: function(v) { sliderObj.val = v; updatePanel(); },
        onAddListener: base.onAddListener
      });
      sliderObj.el = slider;
      _sliders.push(sliderObj);
      container.appendChild(slider);
    });

    updatePanel();
  }

  function destroy() {
    base._destroy();
    _sliders = [];
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['thesis-engine'] = { init: init, destroy: destroy };
})();
