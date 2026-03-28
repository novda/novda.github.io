/* ==========================================================================
   Theme — Dark/light mode toggle
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'theme';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleLabel(theme);
  }

  function updateToggleLabel(theme) {
    const btn = document.querySelector('.nav__theme-toggle');
    if (!btn) return;
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    btn.textContent = theme === 'dark' ? '☀' : '☾';
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  // Apply immediately to prevent flash
  apply(getPreferred());

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.nav__theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
  });
})();
