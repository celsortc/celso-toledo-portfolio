# Two-project showcase

The supplied WorksWheel reference is preserved unchanged in `works-wheel.original.tsx`. Its implementation is adapted in `src/components/ui/works-wheel.tsx`; Axis and Doae content lives in `src/components/projects.tsx`.

The reference uses a ring and a perspective drum for many projects. With only two works, the portfolio starts directly in the drum. It keeps the 1.45 card ratio, 40-degree spacing, 2.22 radius multiplier, 2.7 perspective multiplier, 1.82 bow multiplier and 0.12 interpolation. Card size is adjusted to show the neighboring work without crowding the description. No placeholder projects or repeated cards are added.

Native scrolling drives the two positions through GSAP ScrollTrigger. The page continues scrolling past the showcase normally. Tabs and previous/next buttons offer an alternative; arrow keys select and focus the adjacent tab. The animation only schedules frames while its position is changing and releases its observers and scroll trigger on unmount.

Below 1024px, below 700px in height, with reduced-motion enabled, or when the site's animation control is paused, both works appear as ordinary stacked or alternating cards. This keeps touch navigation direct and all project content accessible without motion.

Axis uses an actual prototype screenshot with sample financial values. Doae uses a conceptual cover with its repository logo, labeled as a concept. Descriptions distinguish working functionality from planned functionality. Images are contained so their content is not cropped. Both languages share the same component and source links.

The adaptation follows the project's frontend-design guidance and the installed animate and mobile-native skills: motion has a clear browsing purpose, keyboard access remains available, touch targets are at least 48px, and hover is restricted to precise pointers.

Validation covers TypeScript, production build, desktop scroll/button/keyboard selection, tablet fullscreen navigation, mobile card layout without horizontal overflow, and language changes. Responsive browser emulation was used; physical-device testing remains separate.
