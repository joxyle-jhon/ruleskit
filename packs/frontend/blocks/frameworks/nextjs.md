## Next.js Specific Rules

- Always use next/image — never raw <img> for content images
- Always use next/font — never load Google Fonts via <link> in \_document
- Use dynamic() with ssr: false for client-only heavy components
- Choose rendering per route: SSG > ISR > SSR > CSR (performance order)
- Avoid bloating \_app.js — only global providers belong there
- Use next/script with strategy="lazyOnload" for non-critical scripts
- Enable Next.js bundle analyzer to catch oversized chunks
- Use Partial Prerendering (PPR) where available (Next.js 14+)
- Prefer React Server Components for data-fetching
- Use generateStaticParams for dynamic SSG routes
