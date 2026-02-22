(function() {
  'use strict';

  var MODULES = {
    'command-center':     { css: 'css/command-center.css',     js: 'js/command-center.js',     loaded: false, accent: 'emerald' },
    'pipeline-intel':     { css: 'css/pipeline-intel.css',     js: 'js/pipeline-intel.js',     loaded: false, accent: 'emerald' },
    'strain-simulator':   { css: 'css/strain-simulator.css',   js: 'js/strain-simulator.js',   loaded: false, accent: 'emerald' },
    'revenue-model':      { css: 'css/revenue-model.css',      js: 'js/revenue-model.js',      loaded: false, accent: 'emerald' },
    'agent-architecture': { css: 'css/agent-architecture.css', js: 'js/agent-architecture.js', loaded: false, accent: 'blue' },
    'competitive-map':    { css: 'css/competitive-map.css',    js: 'js/competitive-map.js',    loaded: false, accent: 'red' },
    'build-roadmap':      { css: 'css/build-roadmap.css',      js: 'js/build-roadmap.js',      loaded: false, accent: 'amber' }
  };

  var DEFAULT_MODULE = 'command-center';
  var activeModule = null;
  var activeInstance = null;

  var contentMain = document.getElementById('content-main');
  var contentPanel = document.getElementById('content-panel');

  // ── Hash → Module ID ──
  function getModuleFromHash() {
    var hash = window.location.hash.replace('#', '');
    return MODULES[hash] ? hash : DEFAULT_MODULE;
  }

  // ── Lazy CSS Injection (once per module) ──
  function injectCSS(id) {
    var mod = MODULES[id];
    if (mod._cssLoaded) return Promise.resolve();
    return new Promise(function(resolve) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = mod.css;
      link.onload = function() { mod._cssLoaded = true; resolve(); };
      link.onerror = resolve;
      document.head.appendChild(link);
    });
  }

  // ── Lazy JS Injection (once per module) ──
  function injectJS(id) {
    var mod = MODULES[id];
    if (mod.loaded) return Promise.resolve();
    return new Promise(function(resolve) {
      var script = document.createElement('script');
      script.src = mod.js;
      script.onload = function() { mod.loaded = true; resolve(); };
      script.onerror = resolve;
      document.body.appendChild(script);
    });
  }

  // ── Destroy Current Module ──
  function destroyCurrentModule() {
    if (activeInstance && typeof activeInstance.destroy === 'function') {
      activeInstance.destroy();
    }
    activeInstance = null;
    activeModule = null;
    contentMain.innerHTML = '';
    contentPanel.innerHTML = '';
  }

  // ── Load Module ──
  function loadModule(id) {
    if (id === activeModule) return;

    destroyCurrentModule();
    Shell.activateNavTab(id);

    // Lazy-load CSS then JS, then init
    injectCSS(id).then(function() {
      return injectJS(id);
    }).then(function() {
      var mod = window.modules && window.modules[id];
      if (mod && typeof mod.init === 'function') {
        activeModule = id;
        activeInstance = mod;
        mod.init(contentMain, contentPanel);
      } else {
        contentMain.innerHTML = '<div style="padding:40px;color:var(--text-muted);">Module "' + id + '" not found.</div>';
      }
    });
  }

  // ── Router ──
  window.addEventListener('hashchange', function() {
    loadModule(getModuleFromHash());
  });

  // ── Initial Load ──
  document.addEventListener('DOMContentLoaded', function() {
    var startModule = getModuleFromHash();
    if (!window.location.hash) {
      window.location.hash = '#' + DEFAULT_MODULE;
    } else {
      loadModule(startModule);
    }
  });

  // Expose for programmatic navigation
  window.App = {
    navigate: function(id) { window.location.hash = '#' + id; }
  };
})();
