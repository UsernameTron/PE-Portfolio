/* CTG Shell — Sidebar nav management */
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

  // Expose for app.js to call
  window.Shell = { activateNavTab: activateNavTab };
})();
