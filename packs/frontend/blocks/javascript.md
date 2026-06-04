## JavaScript Performance Rules

- Always add async or defer to non-critical <script> tags — never block rendering
- Split bundles using dynamic import() at route and component level
- Tree-shake all dependencies — remove dead code before production builds
- Minify JS using Vite, SWC, or Rollup in production
- Move tasks longer than 50ms off the main thread using Web Workers
- Avoid unnecessary re-renders (React: memo, useMemo, useCallback)
- Prefer native HTML/CSS over JS for animations, toggles, and form validation
- Audit and remove unused npm dependencies regularly
- Avoid synchronous localStorage or cookie reads on the critical path
- Use requestIdleCallback or requestAnimationFrame for non-urgent DOM updates
- Prefer event delegation over attaching listeners to many individual elements
- Debounce or throttle scroll, resize, and input event handlers
- Keep comments to a minimum; place comments ONLY at the top of functions if needed, never inline.
