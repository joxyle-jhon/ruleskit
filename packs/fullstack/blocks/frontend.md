# Frontend Excellence

## HTML

- Use semantic HTML elements.
- Maintain a proper heading hierarchy.
- Use labels for every form input.
- Use descriptive alt text for images.
- Avoid unnecessary wrapper elements.

## CSS

- Prefer Flexbox and Grid.
- Build responsive layouts.
- Use logical spacing.
- Keep CSS modular.
- Avoid overly specific selectors.
- Respect `prefers-reduced-motion`.
- Use animations only when they improve usability.
- Keep transitions subtle and performant.

## JavaScript

- Minimize unnecessary re-renders.
- Lazy load components when appropriate.
- Lazy load images.
- Defer non-critical scripts.
- Avoid blocking the main thread.
- Debounce or throttle expensive event handlers.
- Memoize expensive computations only when profiling justifies it.

# Accessibility (A11Y)

- Ensure full keyboard accessibility.
- Maintain sufficient color contrast.
- Use semantic HTML before ARIA.
- Use ARIA only when necessary.
- Never rely solely on color to communicate information.
- Ensure focus states are visible.
- Make interactive elements accessible.
- Test with keyboard navigation.

# Performance

- Optimize for Core Web Vitals:
  - LCP
  - CLS
  - INP
- Minimize JavaScript bundles.
- Compress assets.
- Optimize images.
- Cache static assets.
- Use code splitting.
- Avoid unnecessary network requests.
- Batch API requests whenever possible.
- Optimize expensive rendering operations.
- Profile before optimizing.
