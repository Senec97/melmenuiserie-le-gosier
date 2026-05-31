(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Mobile nav toggle ────────────────────────────────────
  var toggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-menu');
  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('is-open', !expanded);
    });
    document.addEventListener('click', function (e) {
      var header = toggle.closest('.site-header') || document.querySelector('.site-header');
      if (header && !header.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  // ── Sticky header scroll shadow ──────────────────────────
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Intersection Observer — reveal (.reveal, [data-animate], [data-reveal]) ──
  var revealSelectors = '.reveal, [data-animate], [data-reveal]';
  var revealEls = document.querySelectorAll(revealSelectors);
  if ('IntersectionObserver' in window && !prefersReduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ── Hero parallax — vanilla rAF, no GSAP dependency ────
  (function () {
    if (prefersReduced) return;
    var hero = document.querySelector('.hero[data-hero-parallax]');
    var media = hero && hero.querySelector('.hero-media');
    if (!media) return;
    var ticking = false;
    function tick() {
      media.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(tick); ticking = true; }
    }, { passive: true });
  }());

  // ── Button scale micro-interaction (CSS handles shimmer) ─
  if (!prefersReduced) {
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () { btn.style.transform = 'translateY(-2px) scale(1.03)'; });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }
})();
