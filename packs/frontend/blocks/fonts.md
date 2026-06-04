## Font Performance Rules

- Always use font-display: swap or font-display: optional to prevent FOIT
- Preload critical fonts: <link rel="preload" as="font" crossorigin>
- Subset fonts to only the characters actually used on the page
- Prefer variable fonts over loading multiple font weight files
- Self-host fonts when possible to avoid third-party DNS lookup latency
- Limit font families to 2 maximum per page
- Use system font stacks as fallback to reduce layout shift during font swap
