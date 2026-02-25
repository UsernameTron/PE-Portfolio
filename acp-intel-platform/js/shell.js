/* ACP Shell — Sidebar nav + dynamic status bar */
(function() {
  'use strict';

  function activateNavTab(moduleId) {
    document.querySelectorAll('.nav-tab').forEach(function(tab) {
      if (tab.dataset.module === moduleId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  function populateStatusBar() {
    if (typeof Data === 'undefined') return;
    var counts = Data.getTierCounts();
    var hot = document.getElementById('sb-hot');
    var warm = document.getElementById('sb-warm');
    var pipeline = document.getElementById('sb-pipeline');
    if (hot) hot.innerHTML = '● HOT <strong>' + (counts.HOT || 0) + '</strong>';
    if (warm) warm.innerHTML = '● WARM <strong>' + (counts.WARM || 0) + '</strong>';
    if (pipeline) pipeline.innerHTML = '● PIPELINE <strong>' + Data.getAggregateEV() + '</strong>';
  }

  document.addEventListener('DOMContentLoaded', populateStatusBar);

  // Expose for app.js to call
  window.Shell = { activateNavTab: activateNavTab, populateStatusBar: populateStatusBar };
})();
