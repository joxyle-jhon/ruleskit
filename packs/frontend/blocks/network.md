## Network & Caching Rules

- Set Cache-Control: max-age=31536000, immutable on all versioned/hashed assets
- Set Cache-Control: no-cache on HTML files so browsers always revalidate
- Use a CDN for all static assets — JS, CSS, images, fonts
- Preload critical resources: <link rel="preload"> for LCP image, key fonts, critical JS
- Prefetch next-page resources: <link rel="prefetch"> for likely navigation targets
- Minimize third-party scripts — each adds DNS lookup and connection overhead
- Load third-party scripts with async or defer — never synchronously
- Use HTTP/2 or HTTP/3 on your server and CDN
- Enable Early Hints (103) on your CDN before full response
- Implement a Service Worker caching strategy for repeat visit performance
- Use dns-prefetch and preconnect for known third-party origins
