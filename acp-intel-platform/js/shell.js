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
    var E = Components.esc;
    if (hot) hot.innerHTML = '● HOT <strong>' + E(counts.HOT || 0) + '</strong>';
    if (warm) warm.innerHTML = '● WARM <strong>' + E(counts.WARM || 0) + '</strong>';
    if (pipeline) pipeline.innerHTML = '● PIPELINE <strong>' + E(Data.getAggregateEV()) + '</strong>';
  }

  // ── Mobile sidebar toggle ──
  function initMobileNav() {
    var sidebar = document.getElementById('sidebar');
    var toggle = document.getElementById('menu-toggle');
    var overlay = document.getElementById('sidebar-overlay');
    if (!toggle || !sidebar) return;

    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function() {
      if (sidebar.classList.contains('open')) { closeSidebar(); } else { openSidebar(); }
    });
    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on navigation
    document.querySelectorAll('.nav-tab').forEach(function(tab) {
      tab.addEventListener('click', closeSidebar);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    populateStatusBar();
    initMobileNav();
  });

  // Expose for app.js to call
  window.Shell = { activateNavTab: activateNavTab, populateStatusBar: populateStatusBar };
})();
