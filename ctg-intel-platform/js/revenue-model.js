/* ═══ MODULE: revenue-model ═══ */
(function() {
  'use strict';

  var _container = null;
  var _panel = null;
  var _timers = [];
  var _listeners = [];
  var _vals = { partnerships: 8, seats: 500, cost: 150, rate: 15 };

  function _interval(fn, ms) { var id = setInterval(fn, ms); _timers.push(id); return id; }
  function _on(target, event, handler) {
    target.addEventListener(event, handler);
    _listeners.push({ target: target, event: event, handler: handler });
  }

  function updateAll() {
    if (!_container || !_panel) return;

    var acv = _vals.seats * _vals.cost * 12;
    var commission = acv * (_vals.rate / 100);
    var guruPay = commission * 0.80;
    var ctgRev = commission * 0.20;
    var totalYear1 = _vals.partnerships * commission;

    // Update economics table
    var econ = _container.querySelector('.rm-econ-table');
    if (econ) {
      econ.innerHTML =
        '<div class="rm-econ-row"><span class="body-sm">Annual Contract Value</span><span class="mono-md" style="color:var(--text)">$' + acv.toLocaleString() + '</span></div>' +
        '<div class="rm-econ-row"><span class="body-sm">CTG Commission (' + _vals.rate + '%)</span><span class="mono-md" style="color:var(--emerald)">$' + commission.toLocaleString() + '</span></div>' +
        '<div class="rm-econ-row"><span class="body-sm">Guru Payout (80%)</span><span class="mono-md" style="color:var(--amber)">$' + Math.round(guruPay).toLocaleString() + '</span></div>' +
        '<div class="rm-econ-row"><span class="body-sm">CTG Revenue (20%)</span><span class="mono-md" style="color:var(--emerald)">$' + Math.round(ctgRev).toLocaleString() + '</span></div>';
    }

    // Update split bar
    var splitBar = _container.querySelector('.rm-split-bar');
    if (splitBar) {
      splitBar.innerHTML =
        '<div class="rm-split-guru" style="width:80%"><span class="mono-sm">GURU 80%</span></div>' +
        '<div class="rm-split-ctg" style="width:20%"><span class="mono-sm">CTG 20%</span></div>';
    }

    // Update panel
    _panel.innerHTML = '';

    var projLabel = document.createElement('div');
    projLabel.className = 'label-lg';
    projLabel.textContent = 'PROJECTED ANNUAL COMMISSION';
    projLabel.style.marginBottom = 'var(--space-2)';
    _panel.appendChild(projLabel);

    var projVal = document.createElement('div');
    projVal.className = 'display-lg';
    projVal.textContent = '$' + totalYear1.toLocaleString();
    projVal.style.marginBottom = 'var(--space-5)';
    _panel.appendChild(projVal);

    // Perpetual revenue stack
    var stackLabel = document.createElement('div');
    stackLabel.className = 'label-lg';
    stackLabel.textContent = 'PERPETUAL REVENUE STACK';
    stackLabel.style.marginBottom = 'var(--space-3)';
    _panel.appendChild(stackLabel);

    var y1 = totalYear1;
    var y2 = y1 * 2;
    var y3 = y1 * 3;

    [['Year 1', y1], ['Year 2', y2], ['Year 3', y3]].forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'rm-year-row';
      row.innerHTML =
        '<span class="body-sm">' + item[0] + '</span>' +
        '<span class="mono-lg" style="color:var(--emerald)">$' + item[1].toLocaleString() + '</span>';
      _panel.appendChild(row);
    });

    // Perpetuity callout
    _panel.appendChild(Components.CalloutBox({
      title: 'PERPETUAL MODEL',
      text: 'COMMISSIONS ARE IN PERPETUITY \u2014 Year 1 deals continue paying in Year 2, 3, and beyond. Each new year adds a new cohort on top of existing recurring revenue.',
      color: 'violet'
    }));

    // Pipeline context
    _panel.appendChild(Components.CalloutBox({
      title: 'PIPELINE CONTEXT',
      text: _vals.partnerships + ' new partnerships at ' + _vals.seats + ' seats each, $' + _vals.cost + '/seat/month = $' + acv.toLocaleString() + ' ACV per deal. At ' + _vals.rate + '% commission, each deal generates $' + commission.toLocaleString() + '/year in perpetuity.',
      color: 'emerald'
    }));
  }

  function init(container, panel) {
    _container = container;
    _panel = panel;
    _vals = { partnerships: 8, seats: 500, cost: 150, rate: 15 };

    // Title
    var title = document.createElement('div');
    title.className = 'heading-lg';
    title.textContent = 'Commission Revenue Model';
    container.appendChild(title);
    var sub = document.createElement('div');
    sub.className = 'body-sm';
    sub.style.color = 'var(--text-secondary)';
    sub.style.marginBottom = 'var(--space-4)';
    sub.textContent = 'Model CTG commission revenue with adjustable deal parameters and perpetual revenue projections.';
    container.appendChild(sub);

    // 4 Sliders
    container.appendChild(Components.RangeSlider({
      label: 'New Partnerships (Year 1)', min: 1, max: 20, value: 8, step: 1,
      onChange: function(v) { _vals.partnerships = v; updateAll(); }
    }));
    container.appendChild(Components.RangeSlider({
      label: 'Avg Seats per Deal', min: 100, max: 2000, value: 500, step: 50,
      onChange: function(v) { _vals.seats = v; updateAll(); }
    }));
    container.appendChild(Components.RangeSlider({
      label: 'Avg License Cost/Seat/Month', min: 50, max: 300, value: 150, step: 10, prefix: '$',
      onChange: function(v) { _vals.cost = v; updateAll(); }
    }));
    container.appendChild(Components.RangeSlider({
      label: 'CTG Commission Rate', min: 5, max: 25, value: 15, step: 1, suffix: '%',
      onChange: function(v) { _vals.rate = v; updateAll(); }
    }));

    // Economics section
    var econLabel = document.createElement('div');
    econLabel.className = 'label-lg';
    econLabel.textContent = 'PER-DEAL ECONOMICS';
    econLabel.style.margin = 'var(--space-4) 0 var(--space-2)';
    container.appendChild(econLabel);

    var econTable = document.createElement('div');
    econTable.className = 'rm-econ-table';
    container.appendChild(econTable);

    // Commission split bar
    var splitLabel = document.createElement('div');
    splitLabel.className = 'label-lg';
    splitLabel.textContent = 'COMMISSION SPLIT';
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
  window.modules['revenue-model'] = { init: init, destroy: destroy };
})();
