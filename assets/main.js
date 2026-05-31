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

  // ── GSAP hero parallax + entrance ───────────────────────
  window._initGSAP = function () {
    if (prefersReduced || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero parallax
    var heroBg = document.querySelector('.hero-parallax-bg, .hero__bg');
    if (heroBg) {
      gsap.to(heroBg, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // Hero content entrance
    var heroContent = document.querySelector('.hero__content, .hero-content');
    if (heroContent) {
      var children = heroContent.querySelectorAll('.hero__badge, .hero-eyebrow, h1, .hero__intro, .hero-lead, .hero__cta, .hero-cta');
      gsap.from(children, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
        clearProps: 'all',
      });
    }

    // Staggered section reveals via GSAP
    document.querySelectorAll('[data-stagger]').forEach(function (container) {
      var items = container.querySelectorAll(':scope > *');
      gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 0.55,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: container,
          start: 'top 82%',
          once: true,
        },
      });
    });

    // Nav CTA + primary button micro-interactions
    document.querySelectorAll('.nav-cta a, .btn--primary, .btn-primary').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        gsap.to(btn, { scale: 1.04, duration: 0.18, ease: 'power1.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { scale: 1, duration: 0.18, ease: 'power1.in' });
      });
    });
  };

  // Auto-init GSAP if already loaded (CDN scripts before main.js)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    window._initGSAP();
  } else {
    window.addEventListener('load', function () {
      window._initGSAP && window._initGSAP();
    });
  }
})();
