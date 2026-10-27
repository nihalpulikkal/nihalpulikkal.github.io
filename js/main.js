/**
 * main.js — Site Behaviour
 *
 * Handles:
 * 1. Theme toggle initialisation
 * 2. Navigation: scroll shadow, mobile menu open/close
 * 3. Active nav link highlighting
 * 4. Section fade-in animations via IntersectionObserver
 * 5. Auto-updating copyright year
 * 6. Contact form submission via Formspree
 */

// Wait for the HTML to fully load before running our code.
// 'DOMContentLoaded' fires when the browser has parsed all HTML —
// so all elements exist and we can safely find them by ID/class.
document.addEventListener('DOMContentLoaded', function () {

  // ── 1. Theme toggle ──────────────────────────────────────────
  // initThemeToggle is defined in theme.js (loaded before this)
  if (typeof window.initThemeToggle === 'function') {
    window.initThemeToggle();
  }

  // ── 2. Navigation scroll shadow ──────────────────────────────
  // Add a bottom border to the nav when the user scrolls down
  const nav = document.getElementById('main-nav');

  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true }); // passive:true = better scroll performance
  }

  // ── 3. Mobile menu ───────────────────────────────────────────
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        mobileMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-label', 'Open navigation menu');
      } else {
        mobileMenu.classList.add('open');
        mobileBtn.setAttribute('aria-expanded', 'true');
        mobileBtn.setAttribute('aria-label', 'Close navigation menu');
      }
    });

    // Close the mobile menu when any link inside it is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  // ── 4. Active nav link on scroll ────────────────────────────
  // As the user scrolls, highlight which section they're in
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a, .mobile-menu__links a');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px' // trigger when section is near the top
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // ── 5. Section fade-in animations ───────────────────────────
  // IntersectionObserver watches elements with class 'fade-in'
  // and adds 'visible' when they enter the viewport.
  // (CSS handles the actual animation — see sections.css)
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop watching after it's shown (animation only plays once)
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 }); // trigger when 10% of element is visible

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  }

  // ── 6. Auto-updating copyright year ─────────────────────────
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── 7. Contact form ─────────────────────────────────────────
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form && formStatus) {
    form.addEventListener('submit', async function (event) {
      // Prevent the default browser behaviour (page reload)
      event.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
        // Send the form data to Formspree
        // NOTE: Replace YOUR_FORM_ID with your actual Formspree form ID
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
          formStatus.className = 'form-status form-status--success';
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        formStatus.textContent = '✗ Something went wrong. Please email me directly.';
        formStatus.className = 'form-status form-status--error';
      } finally {
        // Always restore the button regardless of success or failure
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

});
