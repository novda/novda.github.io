### adhamov.com

Personal website for Zahiriddin Adhamov.

## Structure

```
├── index.html          # Main page
├── css/
│   ├── tokens.css      # Design tokens (colors, fonts, spacing)
│   ├── reset.css       # CSS reset
│   ├── base.css        # Typography, global styles
│   ├── components.css  # Buttons, cards, nav, tags
│   └── sections.css    # Hero, about, projects, contact
├── js/
│   ├── main.js         # Projects data, scroll animations
│   └── theme.js        # Dark/light mode toggle
└── assets/
    ├── fonts/
    └── images/
```

## How to add a new project

Open `js/main.js` and add an object to the `PROJECTS` array:

```js
const PROJECTS = [
  // ... existing projects
  {
    title: 'My New Project',
    tag: 'Python',
    url: 'https://github.com/novda/my-new-project',
  },
];
```

That's it — the project list renders automatically.

## How to change colors

Edit `css/tokens.css`. All styles reference these variables:

```css
--accent: #C96442;      /* Change the accent color */
--bg-primary: #F5F0E8;  /* Change the background */
```

Dark mode overrides are in the same file under `[data-theme="dark"]`.

## How to add a new section

1. Create `css/new-section.css` with your styles
2. Add `<link rel="stylesheet" href="./css/new-section.css" />` in `index.html`
3. Add the HTML section in `index.html` with class `reveal` for scroll animation

## Deploy

This site is static HTML/CSS/JS — deploy anywhere:

- **GitHub Pages**: push to `master` branch (configured via CNAME)
- **Any static host**: upload all files as-is

## Fonts

Uses Google Fonts (Crimson Pro + DM Sans), loaded via `<link>` in `index.html`.
