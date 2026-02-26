/* ═══ ModuleBase Factory ═══
   Provides _on(), _interval(), _timeout(), _destroy(), _clearTimers(), onAddListener
   Eliminates ~15 lines of identical boilerplate per module. */
(function() {
  'use strict';
  window.ModuleBase = function() {
    var _timers = [];
    var _listeners = [];
    return {
      _on: function(target, event, handler) {
        target.addEventListener(event, handler);
        _listeners.push({ target: target, event: event, handler: handler });
      },
      _interval: function(fn, ms) {
        var id = setInterval(fn, ms);
        _timers.push({ type: 'interval', id: id });
        return id;
      },
      _timeout: function(fn, ms) {
        var id = setTimeout(fn, ms);
        _timers.push({ type: 'timeout', id: id });
        return id;
      },
      _clearTimers: function() {
        _timers.forEach(function(t) {
          if (t.type === 'interval') clearInterval(t.id);
          else clearTimeout(t.id);
        });
        _timers = [];
      },
      _destroy: function() {
        _timers.forEach(function(t) {
          if (t.type === 'interval') clearInterval(t.id);
          else clearTimeout(t.id);
        });
        _timers = [];
        _listeners.forEach(function(l) {
          l.target.removeEventListener(l.event, l.handler);
        });
        _listeners = [];
      },
      onAddListener: function(el, event, handler) {
        _listeners.push({ target: el, event: event, handler: handler });
      }
    };
  };
})();
