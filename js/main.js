/* ============================================
   PORTFOLIO — Aapo Latvala
   Interactions & theme management
   ============================================ */

(function () {
  'use strict';

  // ---------- Theme toggle ----------
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getStoredTheme() {
    return localStorage.getItem('theme');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Initialize theme
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    setTheme(storedTheme);
  } else if (prefersDark.matches) {
    setTheme('dark');
  }

  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  prefersDark.addEventListener('change', function (e) {
    if (!getStoredTheme()) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ---------- Mobile navigation ----------
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('is-open');
  });

  // Close mobile nav on link click
  navMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    });
  });

  // ---------- Active nav link on scroll ----------
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveLink() {
    var scrollY = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        setActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  setActiveLink();

  // ---------- Intersection Observer for fade-in ----------
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.08
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all cards and sections
    var selectors = [
      '.service-card',
      '.event-card',
      '.project-card',
      '.stat-card',
      '.approach-card',
      '.skills-column',
      '.cert-list li'
    ].join(', ');

    document.querySelectorAll(selectors).forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }
})();
