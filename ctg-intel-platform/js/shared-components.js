/* ═══ CTG Shared Components ═══ */
(function() {
  'use strict';

  var C = {}; // Component namespace

  // ── 4.1.1 KPI Card ──
  C.KPICard = function(opts) {
    var el = document.createElement('div');
    el.className = 'kpi-card';
    el.innerHTML =
      '<span class="kpi-card-label label-sm">' + opts.label + '</span>' +
      '<span class="kpi-card-value display-' + (opts.size || 'lg') + '">' + opts.value + '</span>' +
      (opts.subtitle ? '<span class="kpi-card-subtitle body-sm">' + opts.subtitle + '</span>' : '');
    if (opts.valueColor) el.querySelector('.kpi-card-value').style.color = 'var(--' + opts.valueColor + ')';
    return el;
  };

  // ── 4.1.2 Tier Badge ──
  C.TierBadge = function(tier) {
    var el = document.createElement('span');
    el.className = 'tier-badge tier-badge--' + tier.toLowerCase();
    el.textContent = tier;
    return el;
  };

  // ── 4.1.3 Signal Badge ──
  C.SignalBadge = function(text, color) {
    var el = document.createElement('span');
    el.className = 'signal-badge signal-badge--' + (color || 'gray');
    el.textContent = text;
    return el;
  };

  // ── 4.1.4 Circular Score ──
  C.CircularScore = function(opts) {
    var size = opts.size || 120;
    var radius = (size / 2) - 6;
    var circumference = 2 * Math.PI * radius;
    var offset = circumference - (opts.score / 100) * circumference;
    var color = opts.score >= 75 ? 'var(--red)' :
                opts.score >= 50 ? 'var(--amber)' :
                opts.score >= 25 ? 'var(--teal)' : 'var(--text-muted)';

    var el = document.createElement('div');
    el.className = 'circular-score';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.innerHTML =
      '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">' +
        '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + radius + '" fill="none" stroke="var(--border)" stroke-width="4"/>' +
        '<circle cx="' + size/2 + '" cy="' + size/2 + '" r="' + radius + '" fill="none" stroke="' + color + '" stroke-width="4"' +
        ' stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '"' +
        ' stroke-linecap="round" transform="rotate(-90 ' + size/2 + ' ' + size/2 + ')"/>' +
      '</svg>' +
      '<span class="circular-score-value mono-lg" style="color:' + color + '">' + opts.score + '</span>';
    return el;
  };

  // ── 4.1.5 Radar Chart (6-axis SVG) ──
  C.RadarChart = function(opts) {
    var size = opts.size || 200;
    var cx = size / 2, cy = size / 2;
    var maxR = size * 0.38;
    var labels = ['Vendors', 'Complexity', 'Expertise', 'Timeline', 'Compliance', 'Stakeholders'];
    var values = opts.values || [50,50,50,50,50,50];
    var fillColor = opts.color === 'red' ? 'var(--red)' :
                    opts.color === 'amber' ? 'var(--amber)' : 'var(--emerald)';

    function polarToXY(angle, r) {
      var a = (angle - 90) * Math.PI / 180;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    }

    var svg = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '">';

    // Grid lines at 25%, 50%, 75%, 100%
    [0.25, 0.5, 0.75, 1].forEach(function(pct) {
      var points = [];
      for (var i = 0; i < 6; i++) {
        var p = polarToXY(i * 60, maxR * pct);
        points.push(p.x + ',' + p.y);
      }
      svg += '<polygon points="' + points.join(' ') + '" fill="none" stroke="var(--border)" stroke-width="1"/>';
    });

    // Axis lines + labels
    for (var i = 0; i < 6; i++) {
      var p = polarToXY(i * 60, maxR);
      svg += '<line x1="' + cx + '" y1="' + cy + '" x2="' + p.x + '" y2="' + p.y + '" stroke="var(--border)" stroke-width="1"/>';
      var lp = polarToXY(i * 60, maxR + 16);
      svg += '<text x="' + lp.x + '" y="' + lp.y + '" text-anchor="middle" dominant-baseline="middle"' +
             ' fill="var(--text-muted)" font-size="9" font-family="var(--font-sans)">' + labels[i] + '</text>';
    }

    // Data polygon
    var dataPoints = [];
    for (var j = 0; j < 6; j++) {
      var dp = polarToXY(j * 60, maxR * (values[j] / 100));
      dataPoints.push(dp.x + ',' + dp.y);
    }
    svg += '<polygon points="' + dataPoints.join(' ') + '" fill="' + fillColor + '" fill-opacity="0.15" stroke="' + fillColor + '" stroke-width="2"/>';

    // Data dots
    for (var k = 0; k < 6; k++) {
      var ddp = polarToXY(k * 60, maxR * (values[k] / 100));
      svg += '<circle cx="' + ddp.x + '" cy="' + ddp.y + '" r="3" fill="' + fillColor + '"/>';
    }

    svg += '</svg>';
    var el = document.createElement('div');
    el.className = 'radar-chart';
    el.innerHTML = svg;
    return el;
  };

  // ── 4.1.6 Range Slider ──
  C.RangeSlider = function(opts) {
    var el = document.createElement('div');
    el.className = 'range-slider';
    var valueDisplay = document.createElement('span');
    valueDisplay.className = 'range-slider-value mono-md';
    valueDisplay.textContent = opts.prefix ? opts.prefix + opts.value : opts.value;

    var input = document.createElement('input');
    input.type = 'range';
    input.min = opts.min || 0;
    input.max = opts.max || 100;
    input.value = opts.value || 50;
    input.step = opts.step || 1;
    input.className = 'range-slider-input';

    function updateFill() {
      var pct = ((input.value - input.min) / (input.max - input.min)) * 100;
      input.style.background = 'linear-gradient(to right, var(--emerald) ' + pct + '%, var(--surface-alt) ' + pct + '%)';
    }
    updateFill();

    input.addEventListener('input', function() {
      valueDisplay.textContent = opts.prefix ? opts.prefix + input.value : input.value;
      if (opts.suffix) valueDisplay.textContent += opts.suffix;
      updateFill();
      if (opts.onChange) opts.onChange(Number(input.value));
    });

    var label = document.createElement('span');
    label.className = 'range-slider-label label-sm';
    label.textContent = opts.label;

    var row = document.createElement('div');
    row.className = 'range-slider-header';
    row.appendChild(label);
    row.appendChild(valueDisplay);

    el.appendChild(row);
    el.appendChild(input);

    // Expose for preset animation
    el.setValue = function(v) {
      input.value = v;
      valueDisplay.textContent = opts.prefix ? opts.prefix + v : v;
      if (opts.suffix) valueDisplay.textContent += opts.suffix;
      updateFill();
      if (opts.onChange) opts.onChange(Number(v));
    };

    return el;
  };

  // ── 4.1.7 Filter Tab Bar ──
  C.FilterTabBar = function(opts) {
    var el = document.createElement('div');
    el.className = 'filter-tab-bar';

    opts.tabs.forEach(function(tab, i) {
      var btn = document.createElement('button');
      btn.className = 'filter-tab' + (i === 0 ? ' active' : '');
      btn.dataset.value = tab.label;
      btn.innerHTML = tab.label + ' <span class="filter-tab-count">' + tab.count + '</span>';
      if (tab.color && i === 0) btn.style.background = 'var(--' + tab.color + ')';

      btn.addEventListener('click', function() {
        el.querySelectorAll('.filter-tab').forEach(function(t) {
          t.classList.remove('active');
          t.style.background = '';
        });
        btn.classList.add('active');
        if (tab.color) btn.style.background = 'var(--' + tab.color + ')';
        if (opts.onSelect) opts.onSelect(tab.label);
      });

      el.appendChild(btn);
    });

    return el;
  };

  // ── 4.1.8 Callout Box ──
  C.CalloutBox = function(opts) {
    var el = document.createElement('div');
    el.className = 'callout-box callout-box--' + (opts.color || 'emerald');
    el.innerHTML =
      (opts.title ? '<span class="callout-box-title label-sm">' + opts.title + '</span>' : '') +
      '<p class="callout-box-text body-sm">' + opts.text + '</p>';
    return el;
  };

  // ── 4.1.9 Action Button ──
  C.ActionButton = function(opts) {
    var el = document.createElement('button');
    el.className = 'action-btn action-btn--' + (opts.variant || 'primary');
    el.textContent = opts.label;
    if (opts.onClick) el.addEventListener('click', opts.onClick);
    return el;
  };

  // ── 4.1.10 Data Table ──
  C.DataTable = function(opts) {
    var el = document.createElement('div');
    el.className = 'data-table-wrap';

    var table = document.createElement('table');
    table.className = 'data-table';

    // Header
    var thead = document.createElement('thead');
    var hr = document.createElement('tr');
    opts.columns.forEach(function(col) {
      var th = document.createElement('th');
      th.textContent = col.label;
      th.className = 'label-sm';
      if (col.width) th.style.width = col.width;
      if (col.align) th.style.textAlign = col.align;
      hr.appendChild(th);
    });
    thead.appendChild(hr);
    table.appendChild(thead);

    // Body
    var tbody = document.createElement('tbody');

    function renderRows(data) {
      tbody.innerHTML = '';
      data.forEach(function(row) {
        var tr = document.createElement('tr');
        opts.columns.forEach(function(col) {
          var td = document.createElement('td');
          if (col.format) {
            td.innerHTML = col.format(row[col.key], row);
          } else {
            td.textContent = row[col.key];
          }
          if (col.align) td.style.textAlign = col.align;
          tr.appendChild(td);
        });
        if (opts.onRowClick) {
          tr.style.cursor = 'pointer';
          tr.addEventListener('click', function() { opts.onRowClick(row); });
        }
        tbody.appendChild(tr);
      });
    }

    renderRows(opts.rows || []);
    table.appendChild(tbody);
    el.appendChild(table);

    // Expose update method for filtering
    el.updateRows = renderRows;

    return el;
  };

  // ── 4.1.11 Agent Feed Entry ──
  C.FeedEntry = function(opts) {
    var el = document.createElement('div');
    el.className = 'feed-entry';
    el.style.borderLeftColor = 'var(--' + opts.color + ')';
    el.innerHTML =
      '<div class="feed-entry-header">' +
        '<span class="feed-entry-agent mono-sm" style="color:var(--' + opts.color + ');background:var(--' + opts.color + '-muted)">' + opts.agent + '</span>' +
        '<span class="feed-entry-time body-sm">' + opts.time + '</span>' +
      '</div>' +
      '<p class="feed-entry-text body-sm">' + opts.text + '</p>';
    return el;
  };

  window.Components = C;
})();
