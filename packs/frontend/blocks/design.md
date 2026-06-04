## Design Principles Rules

### Spacing & Layout

- Use a consistent spacing scale — multiples of 4px or 8px only
- Never use arbitrary spacing values — always reference a design token or scale
- Use CSS custom properties for all spacing, color, and typography values
- Use gap instead of margin for flex and grid children spacing
- Align to an 8pt grid system for all layout decisions

### Typography

- Define a type scale and never deviate from it (xs, sm, base, lg, xl, 2xl, 3xl)
- Limit font families to 2: one for headings, one for body
- Use relative units (rem, em) — never px for body text
- Set line-height: 1.5 for body, 1.2 for headings
- Never set font sizes below 14px for body content
- Use font-weight consistently — define allowed weights per typeface

### Color

- Use a token-based color system — never raw hex values in components
- Define semantic tokens: primary, secondary, surface, border, text, error, success, warning
- Maintain a minimum contrast ratio of 4.5:1 for all text
- Use color to communicate meaning, not just decoration

### Component API Design

- Components should do one thing well — single responsibility
- Props should be explicit and minimal — avoid prop drilling beyond 2 levels
- Prefer composition over configuration — use children/slots over complex prop APIs
- Components must be accessible by default: keyboard nav, ARIA roles, focus management
- Never hardcode content inside components — pass it as props or slots
- Components should be stateless where possible — lift state up
- Use consistent naming: PascalCase for components, camelCase for props
- Every interactive component must have a visible focus state
- Design for all states: default, hover, focus, active, disabled, loading, error, empty

### Accessibility

- Every image must have a descriptive alt or alt="" if decorative
- All interactive elements must be keyboard operable
- Use semantic HTML before reaching for ARIA roles
- Provide visible focus indicators — never outline: none without replacement
- All form inputs must have associated <label> elements
- Never rely on color alone to convey meaning
- Test with a screen reader before shipping any new component
- Respect prefers-reduced-motion for all animations

## Animation Design Principles

### Core Philosophy

- Animation must serve a purpose — never add motion for decoration alone
- Every animation should communicate state, guide attention, or confirm action
- Animation should reduce cognitive load, not add to it
- Less is more — when in doubt, remove the animation

### Timing & Duration

- Micro-interactions (hover, toggle, checkbox): 100–150ms
- UI transitions (modals, drawers, tooltips): 200–300ms
- Page transitions and complex sequences: 300–500ms
- Never exceed 500ms for any UI animation — it feels broken
- Use ease-out for elements entering the screen (fast start, slow end)
- Use ease-in for elements leaving the screen (slow start, fast exit)
- Use ease-in-out for elements moving within the screen
- Never use linear easing for UI — it feels mechanical and unnatural

### Performance Rules

- Only animate transform and opacity — these are GPU-accelerated
- Never animate width, height, top, left, margin, or padding — these trigger layout reflow and destroy performance
- Target 60fps minimum for all animations
- Use `will-change: transform` only on elements you know will animate — never apply it globally
- Use CSS transitions and `@keyframes` over JavaScript-driven animations for simple motion
- For complex sequences use Web Animations API or Framer Motion
- Never block the main thread with animation logic

### UX & Design Rules

- Follow Disney's Easing principle: animations should feel like physics-based motion, not robotic transitions
- Entrance animations should move elements in the direction they come from (slide up from bottom, fade in from left if navigating forward)
- Exit animations should be faster than entrance animations
- Animate only one primary element at a time — avoid simultaneous competing motion
- Use staggered delays (50–100ms apart) for lists animating in sequence
- Interactive elements must give immediate visual feedback on interaction (< 100ms)
- Never lock the UI during an animation — all animations must be interruptible

### Accessibility Rules

- Always implement `prefers-reduced-motion` — it is not optional:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Never use animation as the only way to convey information or state
- Avoid flashing or strobing effects — they can trigger seizures (WCAG 2.3.1: no more than 3 flashes per second)
- Looping animations must have a way to be paused by the user

### What NOT to do

- Do not animate on page load unless it communicates loading state
- Do not use bounce or elastic easing on functional UI elements — reserve it for playful/game contexts only
- Do not animate every state change — reserve it for meaningful transitions
- Do not chain more than 3 animations in a sequence without user intent
- Do not use CSS `animation: all` — always specify the exact property
- Do not add hover animations on mobile — there is no hover on touch devices (use `@media (hover: hover)` to scope hover effects to pointer devices)
