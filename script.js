/* ==========================================================================
   Thomas English — Portfolio JS
   ========================================================================== */

(function () {
  'use strict';

  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.section');
  var hamburger = document.getElementById('hamburger');
  var sideNav = document.getElementById('sideNav');
  var videoCards = document.querySelectorAll('.video-card');

  // --- Active nav tracking via Intersection Observer ---
  var observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
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
      var target = document.getElementById(this.getAttribute('data-section'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      if (sideNav && sideNav.classList.contains('open')) {
        closeMobileNav();
      }
    });
  });

  // --- Hamburger toggle ---
  if (hamburger && sideNav) {
    hamburger.addEventListener('click', function () {
      if (sideNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  function openMobileNav() {
    sideNav.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    sideNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- Video cards: click to embed YouTube player ---
  videoCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var videoId = this.getAttribute('data-video-id');
      var thumb = this.querySelector('.video-thumb');
      if (thumb.querySelector('iframe')) return;

      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.setAttribute('loading', 'lazy');

      var img = thumb.querySelector('.thumb-img');
      var playBtn = thumb.querySelector('.play-btn');
      if (img) img.style.display = 'none';
      if (playBtn) playBtn.style.display = 'none';

      thumb.appendChild(iframe);
    });
  });
})();
