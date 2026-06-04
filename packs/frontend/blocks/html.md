## HTML Performance Rules

- Deliver critical above-the-fold HTML first; use SSR or SSG to reduce TTFB
- Place all <link rel="stylesheet"> in <head> — never below the fold
- Place <script> tags at end of <body> or use defer/async attributes
- Remove HTML comments, unnecessary whitespace, and dead markup in production
- Avoid deeply nested DOM trees (max 32 levels recommended)
- Enable Brotli or GZIP compression for all HTML responses
- Use semantic elements to reduce layout recalculation overhead
- Inline only truly critical HTML — avoid over-inlining large blocks
