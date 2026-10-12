# Supplied hero component integration

The original component supplied by Celso is preserved in `portfolio-hero.original.tsx`. The running component is `src/components/ui/portfolio-hero.tsx`, imported through `@/components/ui/portfolio-hero`.

The project supports React, TypeScript, Tailwind CSS and the shadcn CLI layout. `components.json` maps UI components to `src/components/ui`, utilities to `src/lib/utils.ts`, and Tailwind to `src/styles/tailwind.css`. The aliases are shared with Vite and TypeScript. This keeps future shadcn components in the same locations; the supplied hero uses its own inline Button and does not require a separate shadcn Button.

## Preserved reference behavior

- Original `BlurText` IntersectionObserver with threshold 0.1.
- Per-segment blur from 10px, opacity from 0, and translation from -20px.
- Original inline transition: `all 0.5s ease-out`, with each segment's own delay.
- Name animation by letters with 100ms delay; tagline animation by words with 150ms delay.
- Original parent tagline hover classes and 300ms color transition; no separate handcrafted hover timeline.
- Original Fira Code and Antic font roles, name sizes of 100/140/180/210px, line-height 0.75 and letter tracking.
- Original oval portrait dimensions of 65×110, 90×152, 110×185 and 129×218px, plus its hover scale.
- Original theme toggle and Lucide Menu, X and ChevronDown icons.

## Explicit integration changes

The component takes content props for Celso's name, portrait, tagline and working project/about/contact destinations. It adds English/Portuguese controls and retains the previously requested fullscreen mobile menu with large touch targets. Six-letter TOLEDO receives a size constraint below 390px so it does not wrap or overflow where the reference's four-letter KANE fits. Long translated taglines are centered when they wrap.

At 1280px and above, navigation links remain visible in the center of the header, with language and theme controls on the right. Below 1280px, phones and tablets use the fullscreen hamburger menu. Resizing to desktop closes the overlay and restores scrolling. This replaces the reference's desktop dropdown at Celso's explicit request.

Nonvisual additions provide a heading label, continuous accessible text, Escape dismissal, mobile focus containment and reduced-motion support. The scroll indicator now scrolls to Projects. The outer section replaces the reference's nested main element without changing its layout.

Legacy CSS is imported into Tailwind's components layer, so it cannot silently override the supplied utility classes. The prior vanilla hero, custom hover timelines and geometric hero scroll effects were removed. GSAP connects native scrolling to the project showcase.

## Checked

TypeScript checks and Vite production build pass. Browser inspection confirmed 210px desktop name type, 157.5px leading, a 129×218px portrait, a 300ms tagline parent transition, and the original 500ms per-word transitions with 150ms increments. Menu, language, theme and narrow-screen layout were reviewed in the browser; touch feel still needs a physical phone.
