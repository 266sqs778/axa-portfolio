/* AXA 作品集 · 轻交互层（无任何外部依赖） */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  items.forEach(function (el, i) {
    el.classList.add('will-reveal');
    el.style.transitionDelay = (Math.min(i % 3, 2) * 80) + 'ms';
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  items.forEach(function (el) { io.observe(el); });
})();
