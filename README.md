# Celso Toledo · Portfolio

Personal software developer portfolio. The hero and project showcase use React/TypeScript components based on Celso's supplied references, with Tailwind CSS, Lucide icons and GSAP. Experience and contact use HTML, CSS and JavaScript.

## Run locally

Requires Node.js 22.12+ or 24.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:5173/**. Vite compiles the TSX and Tailwind and updates the page as files change. Opening the source `index.html` directly or using the old server on port 4173 no longer compiles the React application.

## Check and build

```sh
npm run check
npm run build
npm run preview
```

`check` validates TypeScript and JavaScript syntax. `build` produces `dist/`. `preview` serves the production build at http://127.0.0.1:4174/.

## Structure

- `src/components/ui/portfolio-hero.tsx`: supplied hero, including its original BlurText transitions.
- `src/components/demo.tsx`: Celso's name, photo, tagline and navigation passed to the component.
- `src/components/ui/works-wheel.tsx`: two-project perspective showcase with native scroll and keyboard controls.
- `src/components/projects.tsx`: Axis and Doae content and language integration.
- `src/main.tsx`: React mount and language bridge.
- `src/styles/tailwind.css`: Tailwind setup and CSS layers.
- `src/styles/portfolio-theme.css`: existing section themes and mobile integration.
- `src/styles/works-wheel.css`: desktop perspective stage and static mobile project cards.
- `src/lib/utils.ts`, `components.json`: shadcn-compatible UI structure and utility aliases.
- `index.html`, `styles.css`: portfolio sections and their layouts.
- `scripts/i18n.js`: complete English and Portuguese copy.
- `scripts/main.js`: animation controls and email copying.
- `docs/reference/portfolio-hero.original.tsx`: unchanged original supplied component.
- `docs/reference/works-wheel.original.tsx`: unchanged supplied project reference.

[Reference comparison and integration notes](docs/reference/integration.md) document the preserved behavior and the small changes needed for personal content, mobile navigation and accessibility.
[Project integration notes](docs/reference/projects-integration.md) explain the adaptation for two projects.

## Add shadcn components

The existing `components.json` and `@/*` aliases already configure the project. Components added with `npx shadcn@latest add <component>` go to `src/components/ui`.

## Publish

Run `npm run build`, then deploy the **contents of `dist/`** to a static host. Do not publish the unbuilt source `index.html`. Assets use relative paths for hosting under a repository subdirectory; the build includes `.nojekyll` for GitHub Pages.

## Content and resources

English is the default, with a Portuguese alternative. Axis and Doae descriptions were checked against their source repositories; planned features are identified as planned. Axis uses a screenshot of its actual prototype with sample values. Doae uses a conceptual cover with its repository's logo, explicitly identified as a concept.

Fonts are loaded from Google Fonts. The portrait is Celso's public GitHub photo and is bundled locally. React, Lucide, GSAP and CSS are bundled during the build. The hero and projects require JavaScript; experience and contact content remain in the HTML.

Browser review covers desktop and narrow viewports, language/theme changes, fullscreen mobile navigation and the actual inline BlurText transitions. Mobile review uses viewport emulation, not a physical phone.
