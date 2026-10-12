# Celso Toledo · Portfolio

Personal portfolio built with HTML, CSS and vanilla JavaScript.

## Run locally

```sh
npm run dev
```

Open http://localhost:4173. The optional preview helper uses Node.js built-in modules and requires no installation of dependencies. To use a different port, set the `PORT` environment variable.

Alternatively, open `index.html` or use any static server. The website has no build step, framework or server requirements.

## Content

The portfolio presents confirmed projects and professional experience. Project illustrations are conceptual, not screenshots of the applications.

English is the default language, with a complete Portuguese translation.

## Features

- Responsive layouts for desktop and mobile.
- GSAP 3.15.0 and ScrollTrigger for scroll-linked artwork; the page stays readable if those libraries fail to load.
- English/Portuguese switching with an optional saved preference.
- Native expandable project details, keyboard focus indicators and a skip link.
- Automatic support for reduced motion and a manual animation pause control.
- Email, LinkedIn, GitHub and WhatsApp contact links, plus email copying with a selection fallback.

## Edit

- `index.html`: semantic structure, project links and initial English content.
- `styles.css`: design tokens, layouts and mobile adjustments.
- `scripts/i18n.js`: all translated copy and accessibility labels.
- `scripts/main.js`: motion and contact interactions.
- `assets/favicon.svg`: original monogram.

When changing text, update the initial HTML and both translations. Update the email and contact URLs in the HTML and the copy action in `main.js` together.

## External resources

Manrope is served by Google Fonts. GSAP and ScrollTrigger are loaded from jsDelivr at a pinned version. The layout and all project content remain available without these external resources. Without JavaScript, the portfolio displays the default English content, and its links and native project disclosures still work.

## Publish

Upload `index.html`, `styles.css`, `assets/` and the two browser scripts to any static host. Keep their relative paths. Node.js, `package.json` and `serve.cjs` are only for local development.

For GitHub Pages, select the `main` branch and the root folder in the repository's Pages settings. The `.nojekyll` file ensures files are served without a Jekyll build.

## Verification

Run `npm run check` for JavaScript syntax checks. Browser review covers English and Portuguese layouts at 320, 390 and 768 pixels, plus the desktop viewport; project disclosures, language persistence, animation pause/resume and email copying were checked. Mobile checks use browser viewport emulation, not physical-device testing.

Project descriptions were checked against the Axis and Doae source repositories. Planned features are distinguished from implemented behavior.
