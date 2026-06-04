## Image Performance Rules

- Use modern formats: WebP for photos, AVIF for maximum compression
- Always set explicit width and height attributes to prevent CLS
- Lazy load all below-the-fold images using loading="lazy"
- Use responsive images with srcset and sizes attributes
- Preload the LCP image using <link rel="preload" as="image">
- Compress all images before shipping — use Squoosh, ImageOptim, or sharp
- Use SVG for icons, logos, and simple illustrations
- Avoid CSS background-image for critical images — browser cannot preload them
- Use a CDN with automatic image optimization where possible
