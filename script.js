/* ==========================================================================
   Thomas English — Portfolio JS
   ========================================================================== */

(function () {
  'use strict';

  // --- Elements ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const videoCards = document.querySelectorAll('.video-card');

  // --- Active nav tracking via Intersection Observer ---
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        setActiveNav(id);
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('data-section') === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --- Smooth scroll for nav links & close mobile menu ---
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute('data-section'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile nav if open
      if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  });

  // --- Mobile hamburger toggle ---
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  function openMobileNav() {
    mobileNav.style.display = 'block';
    // Force reflow for transition
    mobileNav.offsetHeight;
    mobileNav.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!mobileNav.classList.contains('open')) {
        mobileNav.style.display = 'none';
      }
    }, 300);
  }

  // --- Video cards: click to embed YouTube player ---
  videoCards.forEach(function (card) {
    card.addEventListener('click', function () {
      const videoId = this.getAttribute('data-video-id');
      const thumb = this.querySelector('.video-thumb');

      // Don't re-embed if already playing
      if (thumb.querySelector('iframe')) return;

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.setAttribute('loading', 'lazy');

      // Hide thumbnail image and play button
      var img = thumb.querySelector('.thumb-img');
      var playBtn = thumb.querySelector('.play-btn');
      if (img) img.style.display = 'none';
      if (playBtn) playBtn.style.display = 'none';

      thumb.appendChild(iframe);
    });
  });
})();
