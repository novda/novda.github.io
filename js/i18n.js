/* ==========================================================================
   i18n — Language switcher (EN / RU / UZ)
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'ru', 'uz'];

  // ── Translations ───────────────────────────────────────────────────────
  const TRANSLATIONS = {
    en: {
      // Nav
      'nav.about': 'About',
      'nav.experience': 'Experience',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',

      // Hero
      'hero.headline': 'Hello! I\'m <span class="italic">Zaha</span>.',
      'hero.tagline': 'Software engineer. Building the future and living the present.',
      'hero.cta.primary': 'Get in touch',
      'hero.cta.secondary': 'View experience',

      // About
      'about.title': 'About',
      'about.bio.1': 'Software engineer with experience across frontend development, testing infrastructure, and systems design. I enjoy building clean, performant products that people actually use.',
      'about.bio.2': 'Previously worked at Yandex, CVAT.AI, and Botkin.AI. Studied at HSE (Master\'s, HCI) and ITMO (Bachelor\'s, Information Security).',
      'about.skill.frontend': 'Frontend',
      'about.skill.frontend.desc': 'React, TypeScript, modern CSS, UI development',
      'about.skill.backend': 'Infrastructure',
      'about.skill.backend.desc': 'CI/CD, testing frameworks, developer tooling',
      'about.skill.tools': 'Systems Design',
      'about.skill.tools.desc': 'Architecture, data flows, scalable solutions',
      'about.skill.design': 'Data Visualization',
      'about.skill.design.desc': 'Plotly, dashboards, visual analytics',

      // Experience
      'experience.title': 'Experience',

      // Projects
      'projects.title': 'Projects',
      'projects.viewall': 'View all',

      // Contact
      'contact.title': 'Let\'s connect',
      'contact.subtext': 'Have a question or want to work together? Feel free to reach out.',
      'contact.email': 'Email',
      'contact.telegram': 'Telegram',
      'contact.github': 'GitHub',
      'contact.linkedin': 'LinkedIn',

      // Footer
      'footer.top': 'Back to top',
    },

    ru: {
      'nav.about': 'Обо мне',
      'nav.experience': 'Опыт',
      'nav.projects': 'Проекты',
      'nav.contact': 'Контакты',

      'hero.headline': 'Привет! Я — <span class="italic">Заха</span>.',
      'hero.tagline': 'Разработчик. Строю будущее и живу настоящее.',
      'hero.cta.primary': 'Написать мне',
      'hero.cta.secondary': 'Смотреть опыт',

      'about.title': 'Обо мне',
      'about.bio.1': 'Разработчик с опытом во фронтенде, тестовой инфраструктуре и проектировании систем. Люблю создавать чистые и быстрые продукты, которыми реально пользуются.',
      'about.bio.2': 'Ранее работал в Яндексе, CVAT.AI и Botkin.AI. Учился в ВШЭ (магистратура, HCI) и ИТМО (бакалавриат, информационная безопасность).',
      'about.skill.frontend': 'Фронтенд',
      'about.skill.frontend.desc': 'React, TypeScript, современный CSS, UI',
      'about.skill.backend': 'Инфраструктура',
      'about.skill.backend.desc': 'CI/CD, тестовые фреймворки, инструменты разработки',
      'about.skill.tools': 'Проектирование',
      'about.skill.tools.desc': 'Архитектура, потоки данных, масштабируемые решения',
      'about.skill.design': 'Визуализация',
      'about.skill.design.desc': 'Plotly, дашборды, визуальная аналитика',

      'experience.title': 'Опыт',

      'projects.title': 'Проекты',
      'projects.viewall': 'Все проекты',

      'contact.title': 'Давайте свяжемся',
      'contact.subtext': 'Есть вопрос или хотите поработать вместе? Напишите мне.',
      'contact.email': 'Почта',
      'contact.telegram': 'Телеграм',
      'contact.github': 'GitHub',
      'contact.linkedin': 'LinkedIn',

      'footer.top': 'Наверх',
    },

    uz: {
      'nav.about': 'Men haqimda',
      'nav.experience': 'Tajriba',
      'nav.projects': 'Loyihalar',
      'nav.contact': 'Aloqa',

      'hero.headline': 'Salom! Men — <span class="italic">Zaha</span>.',
      'hero.tagline': 'Dasturchi. Kelajakni quryapman va hozirgi kunda yashayman.',
      'hero.cta.primary': 'Bog\'lanish',
      'hero.cta.secondary': 'Tajribani ko\'rish',

      'about.title': 'Men haqimda',
      'about.bio.1': 'Frontend, test infratuzilmasi va tizim loyihalash bo\'yicha tajribaga ega dasturchiman. Odamlar haqiqatan foydalanidigan toza va tez mahsulotlar yaratishni yaxshi ko\'raman.',
      'about.bio.2': 'Avval Yandex, CVAT.AI va Botkin.AI da ishlaganman. HSE (magistratura, HCI) va ITMO (bakalavriat, axborot xavfsizligi) da o\'qiganman.',
      'about.skill.frontend': 'Frontend',
      'about.skill.frontend.desc': 'React, TypeScript, zamonaviy CSS, UI',
      'about.skill.backend': 'Infratuzilma',
      'about.skill.backend.desc': 'CI/CD, test freymvorklar, dasturchi asboblari',
      'about.skill.tools': 'Tizim loyihalash',
      'about.skill.tools.desc': 'Arxitektura, ma\'lumotlar oqimi, kengaytiriladigan yechimlar',
      'about.skill.design': 'Vizualizatsiya',
      'about.skill.design.desc': 'Plotly, dashboardlar, vizual analitika',

      'experience.title': 'Tajriba',

      'projects.title': 'Loyihalar',
      'projects.viewall': 'Hammasi',

      'contact.title': 'Bog\'lanamiz',
      'contact.subtext': 'Savolingiz bormi yoki birga ishlashni xohlaysizmi? Yozing.',
      'contact.email': 'Pochta',
      'contact.telegram': 'Telegram',
      'contact.github': 'GitHub',
      'contact.linkedin': 'LinkedIn',

      'footer.top': 'Yuqoriga',
    },
  };

  // ── Core functions ─────────────────────────────────────────────────────

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    applyTranslations(lang);
    updateSwitcher(lang);
  }

  function t(key, lang) {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS[DEFAULT_LANG]?.[key] || key;
  }

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = t(key, lang);
      el.innerHTML = value;
    });
  }

  function updateSwitcher(lang) {
    document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // ── Init ───────────────────────────────────────────────────────────────

  const initialLang = getLang();
  document.documentElement.setAttribute('lang', initialLang);

  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(initialLang);
    updateSwitcher(initialLang);

    document.querySelectorAll('.lang-switcher__btn').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });

  window.i18n = { setLang, getLang, t };
})();
