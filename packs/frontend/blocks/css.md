## CSS Performance Rules

- Never use render-blocking CSS — load non-critical styles with media="print" onload swap
- Inline critical above-the-fold CSS directly in <head> (< 14kb recommended)
- Remove unused CSS using PurgeCSS or Tailwind's built-in purge config
- Split CSS by route — do not ship one global stylesheet for all pages
- Avoid expensive CSS properties: box-shadow on scroll, filter, backdrop-filter in loops
- Use CSS containment (contain: layout style) on isolated components
- Use will-change sparingly and only for known animation targets
- Prefer CSS animations over JS-driven animations for transform and opacity
- Use CSS logical properties (margin-inline, padding-block) to reduce overrides
- Modularize styles via CSS Modules, SCSS partials, or scoped styles
