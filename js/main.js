/* ==========================================================================
   Main — Experience data, projects, scroll animations, initialization
   ========================================================================== */

// ── Experience data ────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    company: 'Timestripe',
    role: { en: 'Frontend Developer', ru: 'Фронтенд-разработчик', uz: 'Frontend dasturchi' },
    period: '2022 — Present',
    desc: {
      en: 'Building search, space management, backgrounds, video notifications and other features.',
      ru: 'Разработка поиска, управления пространствами, фонов, видеоуведомлений и других функций.',
      uz: 'Qidiruv, bo\'shliq boshqaruvi, fonlar, video bildirishnomalar va boshqa xususiyatlarni yaratish.',
    },
  },
  {
    company: 'CVAT.AI',
    role: { en: 'Software Engineer', ru: 'Разработчик', uz: 'Dasturchi' },
    period: '2024',
    desc: {
      en: 'Software engineering on an open-source data annotation platform.',
      ru: 'Разработка платформы для разметки данных с открытым кодом.',
      uz: 'Ochiq kodli ma\'lumotlarni belgilash platformasida dasturlash.',
    },
  },
  {
    company: 'Yandex',
    role: { en: 'Software Engineer in Test', ru: 'Инженер по тестированию', uz: 'Test injener' },
    period: '2023 — 2024',
    desc: {
      en: 'Yango Fleet team. TypeScript autotests, WebdriverIO, React Testing Library, CI/CD tooling.',
      ru: 'Команда Yango Fleet. Автотесты на TypeScript, WebdriverIO, React Testing Library, CI/CD.',
      uz: 'Yango Fleet jamoasi. TypeScript autotestlar, WebdriverIO, React Testing Library, CI/CD.',
    },
  },
  {
    company: 'Botkin.AI',
    role: { en: 'Quality Assurance Engineer', ru: 'QA-инженер', uz: 'QA injener' },
    period: '2020 — 2023',
    desc: {
      en: 'Quality assurance for an AI-powered medical imaging platform.',
      ru: 'Обеспечение качества AI-платформы для медицинской визуализации.',
      uz: 'AI-ga asoslangan tibbiy tasvirlash platformasida sifat nazorati.',
    },
  },
];

// ── Projects data ──────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: 'Timestripe',
    tag: 'React',
    url: 'https://timestripe.com',
  },
  {
    title: 'CVAT',
    tag: 'Open Source',
    url: 'https://github.com/cvat-ai/cvat',
  },
  {
    title: 'GitHub Portfolio',
    tag: 'Code',
    url: 'https://github.com/novda',
  },
];

// ── Render experience ──────────────────────────────────────────────────────
function renderExperience() {
  const container = document.getElementById('experience-list');
  if (!container) return;

  const lang = window.i18n?.getLang() || 'en';

  container.innerHTML = EXPERIENCE.map(
    (job) => `
    <div class="exp-row">
      <div class="exp-row__left">
        <span class="exp-row__company">${job.company}</span>
        <span class="exp-row__period text-sm">${job.period}</span>
      </div>
      <div class="exp-row__right">
        <span class="exp-row__role">${job.role[lang] || job.role.en}</span>
        <span class="exp-row__desc text-sm">${job.desc[lang] || job.desc.en}</span>
      </div>
    </div>
  `
  ).join('');
}

// ── Render projects ────────────────────────────────────────────────────────
function renderProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;

  container.innerHTML = PROJECTS.map(
    (project) => `
    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-row">
      <div class="project-row__left">
        <span class="tag">${project.tag}</span>
        <span class="project-row__title">${project.title}</span>
      </div>
      <span class="project-row__arrow">&nearr;</span>
    </a>
  `
  ).join('');
}

// ── Scroll reveal (IntersectionObserver) ───────────────────────────────────
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

// ── Nav scroll effect ──────────────────────────────────────────────────────
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Mobile menu ────────────────────────────────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Smooth scroll for anchor links ─────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Re-render on language change ───────────────────────────────────────────
function initLangRerender() {
  const observer = new MutationObserver(() => {
    renderExperience();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

// ── Initialize ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderExperience();
  renderProjects();
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initLangRerender();
});
