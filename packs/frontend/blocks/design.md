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
