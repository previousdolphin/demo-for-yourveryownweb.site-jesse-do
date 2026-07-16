// Jesse Do — Link Page Interactive Entrance Animations
// Stagger-reveals .js-stagger elements on load using IntersectionObserver
// Enhanced with magnetic button micro-interactions and refined animations

(function () {
  'use strict';

  // Respect reduced-motion preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Make everything visible immediately without animation
    document.querySelectorAll('.js-stagger').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const staggerItems = document.querySelectorAll('.js-stagger');
  const BASE_DELAY   = 85;  // ms between each item

  // Use IntersectionObserver so items animate when they enter the viewport
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const index = parseInt(el.dataset.staggerIndex || '0', 10);

          setTimeout(function () {
            el.classList.add('is-visible');
          }, index * BASE_DELAY);

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Assign sequential indices and start observing
  staggerItems.forEach(function (el, i) {
    el.dataset.staggerIndex = i;
    observer.observe(el);
  });

  // --- Magnetic button micro-interaction ---
  // Each pill button subtly follows the cursor on hover for a premium feel
  const btns = document.querySelectorAll('.links__btn');

  btns.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const moveX  = dx * 5;  // max 5px horizontal pull
      const moveY  = dy * 2;  // max 2px vertical  pull

      btn.style.transform = 'translate(' + moveX + 'px, ' + (moveY - 2) + 'px)';
    });

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });

    btn.addEventListener('mousedown', function () {
      btn.style.transform = 'scale(0.97)';
    });

    btn.addEventListener('mouseup', function () {
      btn.style.transform = '';
    });
  });
}());