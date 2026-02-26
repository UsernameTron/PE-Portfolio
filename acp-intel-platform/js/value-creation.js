/* ═══ MODULE: value-creation ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _timers = [];
  var _listeners = [];
  var _vals = { ebitda: 8, multiple: 7, holdPeriod: 5, growth: 15 };

  function _interval(fn, ms) { var id = setInterval(fn, ms); _timers.push(id); return id; }
  function _timeout(fn, ms) { var id = setTimeout(fn, ms); _timers.push(id); return id; }
  function _on(target, event, handler) {
    target.addEventListener(event, handler);
    _listeners.push({ target: target, event: event, handler: handler });
  }

  function fmt(val) { return '$' + val.toFixed(1) + 'M'; }
  function fmtMOIC(val) { return val.toFixed(1) + 'x'; }
  function fmtIRR(val) { return val.toFixed(1) + '%'; }

  function updateAll() {
    if (!_container || !_panel) return;

    // Core PE value creation math
    var entryEV = _vals.ebitda * _vals.multiple;
    var EXIT_MULTIPLE_EXPANSION = 1.5;
    var exitMultiple = _vals.multiple + EXIT_MULTIPLE_EXPANSION;
    var exitEBITDA = _vals.ebitda * Math.pow(1 + _vals.growth / 100, _vals.holdPeriod);
    var exitEV = exitEBITDA * exitMultiple;
    var moic = exitEV / entryEV;
    var irr = (Math.pow(moic, 1 / _vals.holdPeriod) - 1) * 100;
    var equityPct = 0.40;
    var equityCheck = entryEV * equityPct;
    var equityMOIC = exitEV / equityCheck;

    // Bear / Bull scenarios (0.7x and 1.3x of base MOIC)
    var bearMOIC = moic * 0.7;
    var bullMOIC = moic * 1.3;
    var bearIRR = (Math.pow(bearMOIC, 1 / _vals.holdPeriod) - 1) * 100;
    var bullIRR = (Math.pow(bullMOIC, 1 / _vals.holdPeriod) - 1) * 100;

    // Update economics table
    var econ = _container.querySelector('.rm-econ-table');
    if (econ) {
      econ.innerHTML =
        '<div class="rm-econ-row"><span class="body-sm">Entry EV</span><span class="mono-md" style="color:var(--text)">' + fmt(entryEV) + '</span></div>' +
        '<div class="rm-econ-row"><span class="body-sm">Equity Check</span><span class="mono-md" style="color:var(--emerald)">' + fmt(equityCheck) + '</span></div>' +
        '<div class="rm-econ-row"><span class="body-sm">Exit EBITDA</span><span class="mono-md" style="color:var(--text)">' + fmt(exitEBITDA) + '</span></div>' +
        '<div class="rm-econ-row"><span class="body-sm">Exit EV</span><span class="mono-md" style="color:var(--emerald)">' + fmt(exitEV) + '</span></div>';
    }

    // Update split bar
    var splitBar = _container.querySelector('.rm-split-bar');
    if (splitBar) {
      splitBar.innerHTML =
        '<div class="rm-split-guru" style="width:60%"><span class="mono-sm">DEBT 60%</span></div>' +
        '<div class="rm-split-ctg" style="width:40%"><span class="mono-sm">EQUITY 40%</span></div>';
    }

    // Update panel
    _panel.innerHTML = '';

    var projLabel = document.createElement('div');
    projLabel.className = 'label-lg';
    projLabel.textContent = 'PROJECTED MOIC';
    projLabel.style.marginBottom = 'var(--space-2)';
    _panel.appendChild(projLabel);

    var projVal = document.createElement('div');
    projVal.className = 'display-lg';
    projVal.textContent = fmtMOIC(moic);
    projVal.style.marginBottom = 'var(--space-1)';
    _panel.appendChild(projVal);

    var irrLine = document.createElement('div');
    irrLine.className = 'mono-md';
    irrLine.style.color = 'var(--text-secondary)';
    irrLine.style.marginBottom = 'var(--space-5)';
    irrLine.textContent = 'IRR: ' + fmtIRR(irr);
    _panel.appendChild(irrLine);

    // Return scenarios
    var stackLabel = document.createElement('div');
    stackLabel.className = 'label-lg';
    stackLabel.textContent = 'RETURN SCENARIOS';
    stackLabel.style.marginBottom = 'var(--space-3)';
    _panel.appendChild(stackLabel);

    var scenarios = [
      ['Bear Case', bearMOIC, bearIRR, ''],
      ['Base Case', moic, irr, 'emerald'],
      ['Bull Case', bullMOIC, bullIRR, '']
    ];

    scenarios.forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'rm-year-row';
      var colorStyle = item[3] ? 'color:var(--' + item[3] + ')' : 'color:var(--text)';
      row.innerHTML =
        '<span class="body-sm">' + item[0] + '</span>' +
        '<span class="mono-lg" style="' + colorStyle + '">' + fmtMOIC(item[1]) + ' &middot; ' + fmtIRR(item[2]) + ' IRR</span>';
      _panel.appendChild(row);
    });

    // Returns model callout
    _panel.appendChild(Components.CalloutBox({
      title: 'RETURNS MODEL',
      text: 'Entry at ' + fmtMOIC(_vals.multiple) + ' on ' + fmt(_vals.ebitda) + ' EBITDA (' + fmt(entryEV) + ' EV). Exit at ' + fmtMOIC(exitMultiple) + ' after ' + _vals.holdPeriod + ' years of ' + _vals.growth + '% organic growth. Levered equity MOIC: ' + fmtMOIC(equityMOIC) + '.',
      color: 'violet'
    }));

    // Deal context callout
    _panel.appendChild(Components.CalloutBox({
      title: 'DEAL CONTEXT',
      text: 'Target equity check of ' + fmt(equityCheck) + ' within ACP Fund III parameters ($20-60M range). Projected exit EV of ' + fmt(exitEV) + ' positions for strategic or sponsor-to-sponsor exit.',
      color: 'emerald'
    }));
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;
    _vals = { ebitda: 8, multiple: 7, holdPeriod: 5, growth: 15 };

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Value Creation Model';
    container.appendChild(title);
    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'Model PE returns with adjustable deal parameters. Project entry/exit economics, MOIC, and IRR across scenarios.';
    container.appendChild(sub);

    // 4 Sliders
    var _addListener = function(el, event, handler) { _listeners.push({ target: el, event: event, handler: handler }); };
    container.appendChild(Components.RangeSlider({
      label: 'Entry EBITDA ($M)', min: 3, max: 15, value: 8, step: 0.5, prefix: '$', suffix: 'M',
      onChange: function(v) { _vals.ebitda = v; updateAll(); },
      onAddListener: _addListener
    }));
    container.appendChild(Components.RangeSlider({
      label: 'Entry EV/EBITDA Multiple', min: 5, max: 12, value: 7, step: 0.5, suffix: 'x',
      onChange: function(v) { _vals.multiple = v; updateAll(); },
      onAddListener: _addListener
    }));
    container.appendChild(Components.RangeSlider({
      label: 'Hold Period (years)', min: 3, max: 7, value: 5, step: 1,
      onChange: function(v) { _vals.holdPeriod = v; updateAll(); },
      onAddListener: _addListener
    }));
    container.appendChild(Components.RangeSlider({
      label: 'Annual EBITDA Growth (%)', min: 5, max: 30, value: 15, step: 1, suffix: '%',
      onChange: function(v) { _vals.growth = v; updateAll(); },
      onAddListener: _addListener
    }));

    // Economics section
    var econLabel = document.createElement('div');
    econLabel.className = 'label-lg';
    econLabel.textContent = 'DEAL ECONOMICS';
    econLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    container.appendChild(econLabel);

    var econTable = document.createElement('div');
    econTable.className = 'rm-econ-table';
    container.appendChild(econTable);

    // Capital structure split bar
    var splitLabel = document.createElement('div');
    splitLabel.className = 'label-lg';
    splitLabel.textContent = 'CAPITAL STRUCTURE';
    splitLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    container.appendChild(splitLabel);

    var splitBar = document.createElement('div');
    splitBar.className = 'rm-split-bar';
    container.appendChild(splitBar);

    updateAll();
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
  window.modules['value-creation'] = { init: init, destroy: destroy };
})();
