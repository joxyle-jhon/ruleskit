## Core Web Vitals Rules

Target thresholds (Google "Good" range):
LCP — Largest Contentful Paint : < 2.5s
INP — Interaction to Next Paint : < 200ms
CLS — Cumulative Layout Shift : < 0.1

LCP:

- Ensure the LCP element is server-rendered, not JS-injected
- Preload the LCP image with <link rel="preload" as="image">
- Never lazy load the LCP image
- Minimize render-blocking resources above the fold
- Use SSR or SSG to reduce TTFB

INP:

- Break up long tasks (> 50ms) using scheduler.yield() or setTimeout chunking
- Avoid heavy synchronous JS on click and input handlers
- Move non-UI work to Web Workers
- Debounce expensive event handlers

CLS:

- Always set width and height on images and video elements
- Reserve space for ads and dynamic content using aspect-ratio CSS
- Avoid inserting content above existing content after page load
- Use font-display: optional to prevent font-swap layout shifts
- Never animate layout-affecting properties: top, left, width, height
