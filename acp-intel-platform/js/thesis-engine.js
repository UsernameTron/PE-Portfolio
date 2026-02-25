/* ═══ MODULE: thesis-engine ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _timers = [];
  var _listeners = [];
  var _sliders = [];
  var _weights = [0.20, 0.20, 0.15, 0.20, 0.15, 0.10];

  function _interval(fn, ms) { var id = setInterval(fn, ms); _timers.push(id); return id; }
  function _timeout(fn, ms) { var id = setTimeout(fn, ms); _timers.push(id); return id; }
  function _on(target, event, handler) {
    target.addEventListener(event, handler);
    _listeners.push({ target: target, event: event, handler: handler });
  }

  var PRESETS = {
    'Platform Consolidation': [90, 75, 85, 80, 65, 85],
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
    badge.innerHTML = '<span class="tier-badge tier-badge--' + (convColor === 'text-muted' ? 'strategic' : conviction.toLowerCase().replace(/\s/g, '-')) + '" style="background:var(--' + convColor + ');font-size:12px;padding:4px 12px">' + conviction + '</span>';
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
      btn.addEventListener('click', function() {
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
        onChange: function(v) { sliderObj.val = v; updatePanel(); }
      });
      sliderObj.el = slider;
      _sliders.push(sliderObj);
      container.appendChild(slider);
    });

    updatePanel();
  }

  function destroy() {
    _timers.forEach(function(id) { clearInterval(id); clearTimeout(id); });
    _timers = [];
    _listeners.forEach(function(l) { l.target.removeEventListener(l.event, l.handler); });
    _listeners = [];
    _sliders = [];
    _container = null;
    _panel = null;
  }

  window.modules = window.modules || {};
  window.modules['thesis-engine'] = { init: init, destroy: destroy };
})();
