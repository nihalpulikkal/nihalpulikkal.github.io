/**
 * theme.js — Theme Toggle (runs BEFORE the page paints)
 *
 * This script MUST be loaded in <head> as a blocking script
 * (NOT deferred, NOT async). That way it runs before any HTML
 * is rendered, which prevents the "flash" where the page
 * appears white for a moment before switching to dark mode.
 *
 * HOW IT WORKS:
 * 1. Check if the user previously chose a theme (stored in localStorage)
 * 2. If not, check the operating system's preferred colour scheme
 * 3. Apply 'data-theme="dark"' to <html> if dark is preferred
 * 4. When the toggle button is clicked, flip the theme and save it
 */

(function () {
  // Get the saved preference, or fall back to system preference
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Apply dark mode immediately if needed (prevents flash)
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // This function runs after the DOM is ready (called from main.js)
  window.initThemeToggle = function () {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      if (isDark) {
        // Switch to light
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        btn.setAttribute('aria-label', 'Switch to dark mode');
      } else {
        // Switch to dark
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        btn.setAttribute('aria-label', 'Switch to light mode');
      }
    });

    // Set the correct initial aria-label
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };
})();
