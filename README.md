# Muhammad Nihal — Portfolio

Personal developer portfolio built with semantic HTML, CSS custom properties, and vanilla JavaScript.

## Quick Start

Open `index.html` in VS Code and click **Go Live** (Live Server extension).

The site will open at `http://127.0.0.1:5500`.

## Structure

```
nihal-portfolio/
├── index.html          ← Complete single-page portfolio
├── css/
│   ├── reset.css       ← CSS reset
│   ├── tokens.css      ← Design tokens (colours, type, spacing)
│   ├── theme.css       ← Light/dark mode
│   ├── base.css        ← Typography, links
│   ├── layout.css      ← Navigation, footer, containers
│   ├── components.css  ← Buttons, cards, badges, forms
│   └── sections.css    ← Section-specific styles
├── js/
│   ├── theme.js        ← Theme toggle (blocks until applied to prevent flash)
│   └── main.js         ← Nav, mobile menu, animations, form, copyright year
├── assets/
│   ├── resume.pdf      ← Added in Milestone 5
│   └── images/         ← Project screenshots
└── README.md
```

## Features

- Responsive — mobile-first, works from 375px to 1440px+
- Light / dark theme with system preference detection
- No flash of wrong theme on load
- Accessible — keyboard navigable, ARIA labels, focus indicators
- Smooth section fade-in animations (respects `prefers-reduced-motion`)
- Contact form via Formspree (configured in Milestone 5)
- Auto-updating copyright year

## Deployment

Deployed to GitHub Pages at: `https://nihalpulikkal.github.io`

## Updating

To add a new skill: find the `#skills` section in `index.html` and add a `<span class="badge">SkillName</span>`.

To update project cards: find the relevant `<article class="project-card">` and update the text and links.

To change colours: edit `css/tokens.css` — changes apply globally.
