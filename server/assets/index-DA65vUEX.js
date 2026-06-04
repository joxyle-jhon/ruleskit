import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
const config$3 = {
  id: "backend",
  label: "Backend",
  status: "coming-soon",
  description: "API design, security, caching, and performance rules for backend engineers",
  icon: "server",
  frameworks: [
    { id: "agnostic", label: "Framework-agnostic", frameworkFile: null },
    { id: "express", label: "Express", frameworkFile: null },
    { id: "nestjs", label: "NestJS", frameworkFile: null },
    { id: "fastify", label: "Fastify", frameworkFile: null },
    { id: "django", label: "Django", frameworkFile: null },
    { id: "laravel", label: "Laravel", frameworkFile: null }
  ],
  blocks: [],
  extras: []
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$3
}, Symbol.toStringTag, { value: "Module" }));
const config$2 = {
  id: "devops",
  label: "DevOps",
  status: "coming-soon",
  description: "CI/CD, Docker, Kubernetes, and infra-as-code rules for DevOps engineers",
  icon: "cloud",
  frameworks: [],
  blocks: [],
  extras: []
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$2
}, Symbol.toStringTag, { value: "Module" }));
const config$1 = {
  id: "frontend",
  label: "Frontend",
  status: "stable",
  description: "Performance, design, and DX rules for frontend engineers",
  icon: "layout",
  source: "roadmap.sh/frontend-performance-best-practices",
  frameworks: [
    { id: "agnostic", label: "Framework-agnostic", frameworkFile: null },
    { id: "nextjs", label: "Next.js", frameworkFile: "nextjs.md" },
    { id: "nuxt", label: "Nuxt", frameworkFile: "nuxt.md" },
    { id: "sveltekit", label: "SvelteKit", frameworkFile: "sveltekit.md" },
    { id: "angular", label: "Angular", frameworkFile: "angular.md" },
    { id: "vanilla", label: "Vanilla JS", frameworkFile: null }
  ],
  blocks: ["html", "css", "javascript", "images", "fonts", "network", "web-vitals"],
  optionalBlocks: [{ id: "design", label: "Design principles", default: true }],
  extras: [
    { id: "husky", label: "Husky + lint-staged", default: true },
    { id: "eslint", label: "ESLint", default: true },
    { id: "stylelint", label: "Stylelint", default: true },
    { id: "prettier", label: "Prettier", default: true },
    { id: "lighthouse", label: "Lighthouse CI budget", default: false }
  ]
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config$1
}, Symbol.toStringTag, { value: "Module" }));
const config = {
  id: "mobile",
  label: "Mobile",
  status: "coming-soon",
  description: "Performance, accessibility, and UX rules for mobile engineers",
  icon: "smartphone",
  frameworks: [],
  blocks: [],
  extras: []
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: config
}, Symbol.toStringTag, { value: "Module" }));
const __vite_glob_1_0 = `## CSS Performance Rules

- Never use render-blocking CSS — load non-critical styles with media="print" onload swap
- Inline critical above-the-fold CSS directly in <head> (< 14kb recommended)
- Remove unused CSS using PurgeCSS or Tailwind's built-in purge config
- Split CSS by route — do not ship one global stylesheet for all pages
- Avoid expensive CSS properties: box-shadow on scroll, filter, backdrop-filter in loops
- Use CSS containment (contain: layout style) on isolated components
- Use will-change sparingly and only for known animation targets
- Prefer CSS animations over JS-driven animations for transform and opacity
- Use CSS logical properties (margin-inline, padding-block) to reduce overrides
- Modularize styles via CSS Modules, SCSS partials, or scoped styles
`;
const __vite_glob_1_1 = '## Design Principles Rules\n\n### Spacing & Layout\n- Use a consistent spacing scale — multiples of 4px or 8px only\n- Never use arbitrary spacing values — always reference a design token or scale\n- Use CSS custom properties for all spacing, color, and typography values\n- Use gap instead of margin for flex and grid children spacing\n- Align to an 8pt grid system for all layout decisions\n\n### Typography\n- Define a type scale and never deviate from it (xs, sm, base, lg, xl, 2xl, 3xl)\n- Limit font families to 2: one for headings, one for body\n- Use relative units (rem, em) — never px for body text\n- Set line-height: 1.5 for body, 1.2 for headings\n- Never set font sizes below 14px for body content\n- Use font-weight consistently — define allowed weights per typeface\n\n### Color\n- Use a token-based color system — never raw hex values in components\n- Define semantic tokens: primary, secondary, surface, border, text, error, success, warning\n- Maintain a minimum contrast ratio of 4.5:1 for all text\n- Use color to communicate meaning, not just decoration\n\n### Component API Design\n- Components should do one thing well — single responsibility\n- Props should be explicit and minimal — avoid prop drilling beyond 2 levels\n- Prefer composition over configuration — use children/slots over complex prop APIs\n- Components must be accessible by default: keyboard nav, ARIA roles, focus management\n- Never hardcode content inside components — pass it as props or slots\n- Components should be stateless where possible — lift state up\n- Use consistent naming: PascalCase for components, camelCase for props\n- Every interactive component must have a visible focus state\n- Design for all states: default, hover, focus, active, disabled, loading, error, empty\n\n### Accessibility\n- Every image must have a descriptive alt or alt="" if decorative\n- All interactive elements must be keyboard operable\n- Use semantic HTML before reaching for ARIA roles\n- Provide visible focus indicators — never outline: none without replacement\n- All form inputs must have associated <label> elements\n- Never rely on color alone to convey meaning\n- Test with a screen reader before shipping any new component\n- Respect prefers-reduced-motion for all animations\n';
const __vite_glob_1_2 = '## Font Performance Rules\n\n- Always use font-display: swap or font-display: optional to prevent FOIT\n- Preload critical fonts: <link rel="preload" as="font" crossorigin>\n- Subset fonts to only the characters actually used on the page\n- Prefer variable fonts over loading multiple font weight files\n- Self-host fonts when possible to avoid third-party DNS lookup latency\n- Limit font families to 2 maximum per page\n- Use system font stacks as fallback to reduce layout shift during font swap\n';
const __vite_glob_1_3 = "## Angular Specific Rules\n\n- Use OnPush change detection on all components by default\n- Lazy load all feature modules via loadChildren in the router config\n- Use @defer blocks (Angular 17+) for below-the-fold components\n- Avoid subscribing in templates — use the async pipe instead\n- Use trackBy in all *ngFor loops to prevent full list re-renders\n- Enable NgOptimizedImage for all images\n- Use signals (Angular 16+) over RxJS for local component state\n- Analyze bundles with ng build --stats-json + webpack-bundle-analyzer\n";
const __vite_glob_1_4 = '## Next.js Specific Rules\n\n- Always use next/image — never raw <img> for content images\n- Always use next/font — never load Google Fonts via <link> in _document\n- Use dynamic() with ssr: false for client-only heavy components\n- Choose rendering per route: SSG > ISR > SSR > CSR (performance order)\n- Avoid bloating _app.js — only global providers belong there\n- Use next/script with strategy="lazyOnload" for non-critical scripts\n- Enable Next.js bundle analyzer to catch oversized chunks\n- Use Partial Prerendering (PPR) where available (Next.js 14+)\n- Prefer React Server Components for data-fetching\n- Use generateStaticParams for dynamic SSG routes\n';
const __vite_glob_1_5 = "## Nuxt Specific Rules\n\n- Use <NuxtImg> or <NuxtPicture> instead of raw <img>\n- Use useLazyFetch and useLazyAsyncData for non-critical data\n- Enable Nuxt's payload extraction to avoid re-fetching on hydration\n- Use definePageMeta({ ssr: false }) only when truly necessary\n- Lazy-load heavy components: const MyComp = defineAsyncComponent(...)\n- Avoid importing globally in plugins — use route-level code splitting\n- Enable Brotli compression in the Nitro server config\n- Use useHead for preload and prefetch hints per page\n";
const __vite_glob_1_6 = `## SvelteKit Specific Rules

- Use load() in +page.server.js for SSR data — avoid client-side fetch waterfalls
- Use preload hints via <link rel="preload"> inside <svelte:head>
- Prefer +page.server.js over +page.js when data doesn't need to be reactive
- Use import() for heavy client-only components with {#await}
- Leverage built-in prerendering for static routes (prerender = true)
- Avoid hydration mismatches — keep server and client data consistent
- Use $app/environment browser check before accessing window or document
`;
const __vite_glob_1_7 = '## HTML Performance Rules\n\n- Deliver critical above-the-fold HTML first; use SSR or SSG to reduce TTFB\n- Place all <link rel="stylesheet"> in <head> — never below the fold\n- Place <script> tags at end of <body> or use defer/async attributes\n- Remove HTML comments, unnecessary whitespace, and dead markup in production\n- Avoid deeply nested DOM trees (max 32 levels recommended)\n- Enable Brotli or GZIP compression for all HTML responses\n- Use semantic elements to reduce layout recalculation overhead\n- Inline only truly critical HTML — avoid over-inlining large blocks\n';
const __vite_glob_1_8 = '## Image Performance Rules\n\n- Use modern formats: WebP for photos, AVIF for maximum compression\n- Always set explicit width and height attributes to prevent CLS\n- Lazy load all below-the-fold images using loading="lazy"\n- Use responsive images with srcset and sizes attributes\n- Preload the LCP image using <link rel="preload" as="image">\n- Compress all images before shipping — use Squoosh, ImageOptim, or sharp\n- Use SVG for icons, logos, and simple illustrations\n- Avoid CSS background-image for critical images — browser cannot preload them\n- Use a CDN with automatic image optimization where possible\n';
const __vite_glob_1_9 = "## JavaScript Performance Rules\n\n- Always add async or defer to non-critical <script> tags — never block rendering\n- Split bundles using dynamic import() at route and component level\n- Tree-shake all dependencies — remove dead code before production builds\n- Minify JS using Vite, SWC, or Rollup in production\n- Move tasks longer than 50ms off the main thread using Web Workers\n- Avoid unnecessary re-renders (React: memo, useMemo, useCallback)\n- Prefer native HTML/CSS over JS for animations, toggles, and form validation\n- Audit and remove unused npm dependencies regularly\n- Avoid synchronous localStorage or cookie reads on the critical path\n- Use requestIdleCallback or requestAnimationFrame for non-urgent DOM updates\n- Prefer event delegation over attaching listeners to many individual elements\n- Debounce or throttle scroll, resize, and input event handlers\n";
const __vite_glob_1_10 = '## Network & Caching Rules\n\n- Set Cache-Control: max-age=31536000, immutable on all versioned/hashed assets\n- Set Cache-Control: no-cache on HTML files so browsers always revalidate\n- Use a CDN for all static assets — JS, CSS, images, fonts\n- Preload critical resources: <link rel="preload"> for LCP image, key fonts, critical JS\n- Prefetch next-page resources: <link rel="prefetch"> for likely navigation targets\n- Minimize third-party scripts — each adds DNS lookup and connection overhead\n- Load third-party scripts with async or defer — never synchronously\n- Use HTTP/2 or HTTP/3 on your server and CDN\n- Enable Early Hints (103) on your CDN before full response\n- Implement a Service Worker caching strategy for repeat visit performance\n- Use dns-prefetch and preconnect for known third-party origins\n';
const __vite_glob_1_11 = '## Core Web Vitals Rules\n\nTarget thresholds (Google "Good" range):\n  LCP — Largest Contentful Paint  : < 2.5s\n  INP — Interaction to Next Paint : < 200ms\n  CLS — Cumulative Layout Shift   : < 0.1\n\nLCP:\n- Ensure the LCP element is server-rendered, not JS-injected\n- Preload the LCP image with <link rel="preload" as="image">\n- Never lazy load the LCP image\n- Minimize render-blocking resources above the fold\n- Use SSR or SSG to reduce TTFB\n\nINP:\n- Break up long tasks (> 50ms) using scheduler.yield() or setTimeout chunking\n- Avoid heavy synchronous JS on click and input handlers\n- Move non-UI work to Web Workers\n- Debounce expensive event handlers\n\nCLS:\n- Always set width and height on images and video elements\n- Reserve space for ads and dynamic content using aspect-ratio CSS\n- Avoid inserting content above existing content after page load\n- Use font-display: optional to prevent font-swap layout shifts\n- Never animate layout-affecting properties: top, left, width, height\n';
const __vite_glob_2_0 = 'module.exports = {\n  extends: ["./base.js"],\n  plugins: ["@angular-eslint"],\n  rules: {\n    "@angular-eslint/prefer-on-push-component-change-detection": "error",\n    "@angular-eslint/no-empty-lifecycle-method": "error",\n    "@angular-eslint/use-lifecycle-interface": "error",\n    "@angular-eslint/component-selector": [\n      "error",\n      { type: "element", prefix: "app", style: "kebab-case" }\n    ]\n  }\n}\n';
const __vite_glob_2_1 = 'module.exports = {\n  env: { browser: true, es2022: true, node: true },\n  extends: [\n    "eslint:recommended",\n    "plugin:jsx-a11y/recommended",\n    "plugin:import/recommended",\n    "prettier"\n  ],\n  plugins: ["jsx-a11y", "import", "no-relative-import-paths"],\n  rules: {\n    "no-console": ["warn", { allow: ["warn", "error"] }],\n    "no-debugger": "error",\n    "import/no-duplicates": "error",\n    "import/no-cycle": ["error", { maxDepth: 3 }],\n    "no-relative-import-paths/no-relative-import-paths": [\n      "warn",\n      { allowSameFolder: true, rootDir: "src", prefix: "@" }\n    ],\n    "jsx-a11y/alt-text": "error",\n    "jsx-a11y/anchor-is-valid": "error",\n    "jsx-a11y/no-autofocus": "warn",\n    "jsx-a11y/interactive-supports-focus": "error",\n    "jsx-a11y/click-events-have-key-events": "error"\n  }\n}\n';
const __vite_glob_2_2 = 'module.exports = {\n  extends: ["./base.js", "next/core-web-vitals"],\n  rules: {\n    "@next/next/no-img-element": "error",\n    "@next/next/no-html-link-for-pages": "error",\n    "@next/next/no-sync-scripts": "error",\n    "@next/next/no-css-tags": "error",\n    "@next/next/no-page-custom-font": "error",\n    "@next/next/google-font-display": "error",\n    "@next/next/no-before-interactive-script-outside-document": "error"\n  }\n}\n';
const __vite_glob_2_3 = 'module.exports = {\n  extends: ["./base.js", "plugin:svelte/recommended"],\n  rules: {\n    "svelte/no-unused-svelte-ignore": "error",\n    "svelte/valid-compile": "error",\n    "svelte/no-at-html-tags": "warn"\n  }\n}\n';
const __vite_glob_2_4 = 'module.exports = {\n  extends: ["./base.js", "plugin:vue/vue3-recommended"],\n  rules: {\n    "vue/no-unused-vars": "error",\n    "vue/no-v-html": "warn",\n    "vue/require-v-for-key": "error",\n    "vue/no-use-v-if-with-v-for": "error",\n    "vue/component-api-style": ["error", ["script-setup", "composition"]]\n  }\n}\n';
const __vite_glob_2_5 = '#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\necho "ruleskit: running pre-commit checks..."\nnpx lint-staged\n';
const __vite_glob_2_6 = '#!/usr/bin/env sh\n. "$(dirname -- "$0")/_/husky.sh"\n\necho "ruleskit: running pre-push checks..."\nnpm run build --if-present\nnpx lhci autorun --config=.lighthouserc.json || echo "⚠ Lighthouse budget warning"\n';
const __vite_glob_2_7 = '[\n  {\n    "path": "/*",\n    "timings": [\n      { "metric": "interactive", "budget": 3000 },\n      { "metric": "first-contentful-paint", "budget": 1500 },\n      { "metric": "largest-contentful-paint", "budget": 2500 },\n      { "metric": "cumulative-layout-shift", "budget": 0.1 },\n      { "metric": "total-blocking-time", "budget": 200 }\n    ],\n    "resourceSizes": [\n      { "resourceType": "script", "budget": 150 },\n      { "resourceType": "total", "budget": 500 },\n      { "resourceType": "image", "budget": 200 },\n      { "resourceType": "stylesheet", "budget": 50 },\n      { "resourceType": "font", "budget": 75 }\n    ],\n    "resourceCounts": [\n      { "resourceType": "third-party", "budget": 5 },\n      { "resourceType": "script", "budget": 10 }\n    ]\n  }\n]\n';
const __vite_glob_2_8 = 'module.exports = {\n  "*.{js,jsx,ts,tsx,vue,svelte}": [\n    "eslint --fix --max-warnings=0",\n    "prettier --write"\n  ],\n  "*.{css,scss}": [\n    "stylelint --fix",\n    "prettier --write"\n  ],\n  "*.{json,md,yaml,yml}": [\n    "prettier --write"\n  ],\n  "*.{jpg,jpeg,png,gif,webp}": [\n    "imagemin-lint-staged"\n  ]\n}\n';
const __vite_glob_2_9 = 'module.exports = {\n  semi: false,\n  singleQuote: true,\n  trailingComma: "es5",\n  printWidth: 80,\n  tabWidth: 2,\n  useTabs: false,\n  bracketSpacing: true,\n  bracketSameLine: false,\n  arrowParens: "always",\n  endOfLine: "lf"\n}\n';
const __vite_glob_2_10 = 'module.exports = {\n  extends: [\n    "stylelint-config-standard",\n    "stylelint-config-recess-order"\n  ],\n  plugins: ["stylelint-no-unsupported-browser-features"],\n  rules: {\n    "declaration-property-value-disallowed-list": {\n      "transition": ["/all/"],\n      "animation": ["/all/"]\n    },\n    "plugin/no-unsupported-browser-features": [\n      true,\n      { severity: "warning", ignore: ["css-nesting"] }\n    ],\n    "color-no-invalid-hex": true,\n    "unit-disallowed-list": ["px"],\n    "number-max-precision": 2,\n    "shorthand-property-no-redundant-values": true,\n    "declaration-no-important": true\n  }\n}\n';
const __vite_glob_3_0 = "# ruleskit — {{PACK}} Rules\n# Generated by ruleskit — https://ruleskit.dev\n# Pack: {{PACK}} | Framework: {{FRAMEWORK}}\n# Source: {{SOURCE}}\n\n{{BLOCKS}}\n\n## Severity Labels\n🔴 High   — fix before shipping\n🟡 Medium — fix this sprint\n🟢 Low    — nice to have\n\n## Response Format\nWhen reviewing code:\n1. Tag each issue: [HTML] [CSS] [JS] [IMAGE] [FONT] [NETWORK] [VITALS] [DESIGN] [A11Y]\n2. Label severity: 🔴 High | 🟡 Medium | 🟢 Low\n3. Always provide a concrete fix with code\n4. Lead with highest impact issues first\n5. Reference the specific line or pattern — no generic feedback\n";
const __vite_glob_3_1 = '---\ndescription: {{PACK}} Best Practices\nglobs: ["**/*.tsx","**/*.ts","**/*.jsx","**/*.js","**/*.vue","**/*.svelte","**/*.html","**/*.css","**/*.scss"]\nalwaysApply: true\n---\n\n# ruleskit — {{PACK}} Rules\n# Generated by ruleskit — https://ruleskit.dev\n# Pack: {{PACK}} | Framework: {{FRAMEWORK}}\n# Source: {{SOURCE}}\n\n{{BLOCKS}}\n\n## Audit Response Format\n- Tag: [HTML] [CSS] [JS] [IMAGE] [FONT] [NETWORK] [VITALS] [DESIGN] [A11Y]\n- Severity: 🔴 High | 🟡 Medium | 🟢 Low\n- Always include a concrete code fix\n- Lead with highest impact issues\n';
const __vite_glob_3_2 = "# SKILL: {{PACK}} Agent\n# Generated by ruleskit — https://ruleskit.dev\n# Pack: {{PACK}} | Framework: {{FRAMEWORK}}\n# Source: {{SOURCE}}\n\n## Role\nYou are a {{PACK}} code quality reviewer.\nWhen a developer shares code, audit it against the rules below\nand return structured, actionable findings only.\n\n## Rules\n\n{{BLOCKS}}\n\n## Output Format\nFor each issue found:\n  DOMAIN   : [HTML | CSS | JS | IMAGE | FONT | NETWORK | VITALS | DESIGN | A11Y]\n  SEVERITY : 🔴 High | 🟡 Medium | 🟢 Low\n  ISSUE    : one sentence describing the problem\n  FIX      : concrete code snippet or action\n\nLead with 🔴 issues. Skip domains with no issues.\nNever give generic advice — always tie findings to the actual code provided.\n";
const packModules = /* @__PURE__ */ Object.assign({
  "/packs/backend/pack.config.ts": __vite_glob_0_0,
  "/packs/devops/pack.config.ts": __vite_glob_0_1,
  "/packs/frontend/pack.config.ts": __vite_glob_0_2,
  "/packs/mobile/pack.config.ts": __vite_glob_0_3
});
const blockFiles = /* @__PURE__ */ Object.assign({
  "/packs/frontend/blocks/css.md": __vite_glob_1_0,
  "/packs/frontend/blocks/design.md": __vite_glob_1_1,
  "/packs/frontend/blocks/fonts.md": __vite_glob_1_2,
  "/packs/frontend/blocks/frameworks/angular.md": __vite_glob_1_3,
  "/packs/frontend/blocks/frameworks/nextjs.md": __vite_glob_1_4,
  "/packs/frontend/blocks/frameworks/nuxt.md": __vite_glob_1_5,
  "/packs/frontend/blocks/frameworks/sveltekit.md": __vite_glob_1_6,
  "/packs/frontend/blocks/html.md": __vite_glob_1_7,
  "/packs/frontend/blocks/images.md": __vite_glob_1_8,
  "/packs/frontend/blocks/javascript.md": __vite_glob_1_9,
  "/packs/frontend/blocks/network.md": __vite_glob_1_10,
  "/packs/frontend/blocks/web-vitals.md": __vite_glob_1_11
});
const configFiles = /* @__PURE__ */ Object.assign({
  "/packs/frontend/configs/eslint/angular.js": __vite_glob_2_0,
  "/packs/frontend/configs/eslint/base.js": __vite_glob_2_1,
  "/packs/frontend/configs/eslint/nextjs.js": __vite_glob_2_2,
  "/packs/frontend/configs/eslint/svelte.js": __vite_glob_2_3,
  "/packs/frontend/configs/eslint/vue.js": __vite_glob_2_4,
  "/packs/frontend/configs/husky/pre-commit": __vite_glob_2_5,
  "/packs/frontend/configs/husky/pre-push": __vite_glob_2_6,
  "/packs/frontend/configs/lighthouse/budget.json": __vite_glob_2_7,
  "/packs/frontend/configs/lint-staged/base.js": __vite_glob_2_8,
  "/packs/frontend/configs/prettier/base.js": __vite_glob_2_9,
  "/packs/frontend/configs/stylelint/base.js": __vite_glob_2_10
});
const templateFiles = /* @__PURE__ */ Object.assign({
  "/core/templates/cursorrules.template.md": __vite_glob_3_0,
  "/core/templates/mdc.template.md": __vite_glob_3_1,
  "/core/templates/skill.template.md": __vite_glob_3_2
});
const packs = Object.entries(packModules).map(([path, mod]) => ({ path, config: mod.default })).sort((a, b) => {
  const order = ["frontend", "backend", "devops", "mobile"];
  return order.indexOf(a.config.id) - order.indexOf(b.config.id);
}).map((x) => x.config);
const registry = {
  getPacks() {
    return packs;
  },
  getStablePacks() {
    return packs.filter((p) => p.status === "stable");
  },
  getPack(id) {
    return packs.find((p) => p.id === id);
  },
  getBlock(packId, blockName) {
    const key = Object.keys(blockFiles).find(
      (k) => k === `/packs/${packId}/blocks/${blockName}.md`
    );
    return key ? blockFiles[key] : "";
  },
  getFrameworkBlock(packId, file) {
    const key = `/packs/${packId}/blocks/frameworks/${file}`;
    return blockFiles[key] ?? "";
  },
  getConfigFile(packId, relPath) {
    const key = `/packs/${packId}/configs/${relPath}`;
    return configFiles[key] ?? "";
  },
  getTemplate(name) {
    const key = `/core/templates/${name}.template.md`;
    return templateFiles[key] ?? "";
  }
};
const ICONS = {
  layout: "▢",
  server: "▤",
  cloud: "☁",
  smartphone: "▯"
};
function PackGrid({ packs: packs2, selectedId, onSelect }) {
  return /* @__PURE__ */ jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: packs2.map((p) => {
    const stable = p.status === "stable";
    const selected = stable && selectedId === p.id;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => stable && onSelect(p.id),
        disabled: !stable,
        className: `group relative flex flex-col items-start gap-3 rounded-lg border p-5 text-left transition ${selected ? "border-primary bg-primary/10 glow-primary" : stable ? "border-border bg-surface hover:border-border-strong hover:bg-surface-elevated" : "cursor-not-allowed border-border bg-surface/40 opacity-60"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl text-primary", children: ICONS[p.icon] ?? "◆" }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: `rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${stable ? "border-success/50 text-success" : "border-warning/50 text-warning"}`,
                children: stable ? "stable" : "soon"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-foreground", children: p.label }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground leading-relaxed", children: p.description })
          ] })
        ]
      },
      p.id
    );
  }) });
}
const FORMAT_META = {
  cursorrules: {
    template: "cursorrules",
    filename: ".cursorrules",
    language: "markdown"
  },
  mdc: {
    template: "mdc",
    filename: ".cursor/rules/{{pack}}.mdc",
    language: "markdown"
  },
  skill: {
    template: "skill",
    filename: "SKILL.md",
    language: "markdown"
  }
};
function composeBlocks(pack, frameworkId, selectedOptionalBlocks) {
  const parts = [];
  for (const blockId of pack.blocks) {
    const content = registry.getBlock(pack.id, blockId).trim();
    if (content) parts.push(content);
  }
  for (const opt of pack.optionalBlocks ?? []) {
    if (selectedOptionalBlocks.includes(opt.id)) {
      const content = registry.getBlock(pack.id, opt.id).trim();
      if (content) parts.push(content);
    }
  }
  const fw = pack.frameworks.find((f) => f.id === frameworkId);
  if (fw?.frameworkFile) {
    const content = registry.getFrameworkBlock(pack.id, fw.frameworkFile).trim();
    if (content) parts.push(content);
  }
  return parts.join("\n\n");
}
function generate(options) {
  const pack = registry.getPack(options.packId);
  if (!pack) throw new Error(`Unknown pack: ${options.packId}`);
  const blocks = composeBlocks(
    pack,
    options.frameworkId,
    options.selectedOptionalBlocks
  );
  const frameworkLabel = pack.frameworks.find((f) => f.id === options.frameworkId)?.label ?? "Framework-agnostic";
  const ruleFiles = options.formats.map((fmt) => {
    const meta = FORMAT_META[fmt];
    const tpl = registry.getTemplate(meta.template);
    const content = tpl.replaceAll("{{BLOCKS}}", blocks).replaceAll("{{PACK}}", pack.label).replaceAll("{{FRAMEWORK}}", frameworkLabel).replaceAll("{{SOURCE}}", pack.source ?? "");
    const filename = meta.filename.replaceAll("{{pack}}", pack.id);
    return { filename, content, language: meta.language };
  });
  const extraFiles = generateExtras(pack.id, options.extras, options.frameworkId);
  return [...ruleFiles, ...extraFiles];
}
function generateExtras(packId, extras, frameworkId) {
  if (packId !== "frontend") return [];
  const files = [];
  if (extras.includes("husky")) {
    files.push({
      filename: ".husky/pre-commit",
      content: registry.getConfigFile(packId, "husky/pre-commit"),
      language: "bash"
    });
    files.push({
      filename: ".husky/pre-push",
      content: registry.getConfigFile(packId, "husky/pre-push"),
      language: "bash"
    });
    files.push({
      filename: ".lintstagedrc.js",
      content: registry.getConfigFile(packId, "lint-staged/base.js"),
      language: "javascript"
    });
  }
  if (extras.includes("eslint")) {
    const fwFile = frameworkId === "nextjs" ? "eslint/nextjs.js" : frameworkId === "nuxt" ? "eslint/vue.js" : frameworkId === "sveltekit" ? "eslint/svelte.js" : frameworkId === "angular" ? "eslint/angular.js" : "eslint/base.js";
    files.push({
      filename: "eslint.config.js",
      content: registry.getConfigFile(packId, fwFile),
      language: "javascript"
    });
  }
  if (extras.includes("stylelint")) {
    files.push({
      filename: ".stylelintrc.js",
      content: registry.getConfigFile(packId, "stylelint/base.js"),
      language: "javascript"
    });
  }
  if (extras.includes("prettier")) {
    files.push({
      filename: ".prettierrc.js",
      content: registry.getConfigFile(packId, "prettier/base.js"),
      language: "javascript"
    });
  }
  if (extras.includes("lighthouse")) {
    files.push({
      filename: ".lighthouserc.json",
      content: registry.getConfigFile(packId, "lighthouse/budget.json"),
      language: "json"
    });
  }
  return files;
}
function buildCliCommand(opts) {
  const formats = opts.formats.length === 3 ? "all" : opts.formats.join(",");
  const extras = opts.extras.length ? `--extras ${opts.extras.join(",")}` : "--no-extras";
  return `npx ruleskit init --pack ${opts.packId} --framework ${opts.frameworkId} --format ${formats} ${extras}`;
}
const FORMAT_OPTIONS = [
  { id: "cursorrules", label: "Cursor", ext: ".cursorrules" },
  { id: "mdc", label: "Cursor Rules", ext: ".mdc" },
  { id: "skill", label: "Agent Skill", ext: "SKILL.md" }
];
function Generator({ pack }) {
  const [formats, setFormats] = useState(["cursorrules"]);
  const [frameworkId, setFrameworkId] = useState(pack.frameworks[0]?.id ?? "agnostic");
  const [optionalBlocks, setOptionalBlocks] = useState(
    (pack.optionalBlocks ?? []).filter((b) => b.default).map((b) => b.id)
  );
  const [extras, setExtras] = useState(
    pack.extras.filter((e) => e.default).map((e) => e.id)
  );
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(null);
  const files = useMemo(
    () => generate({
      packId: pack.id,
      frameworkId,
      selectedOptionalBlocks: optionalBlocks,
      extras,
      formats
    }),
    [pack.id, frameworkId, optionalBlocks, extras, formats]
  );
  useEffect(() => {
    setFrameworkId(pack.frameworks[0]?.id ?? "agnostic");
    setOptionalBlocks(
      (pack.optionalBlocks ?? []).filter((b) => b.default).map((b) => b.id)
    );
    setExtras(pack.extras.filter((e) => e.default).map((e) => e.id));
    setActiveTab(0);
    setCopied(null);
  }, [pack.id]);
  useEffect(() => {
    if (activeTab >= files.length) setActiveTab(0);
  }, [files.length, activeTab]);
  const cliCmd = buildCliCommand({
    packId: pack.id,
    frameworkId,
    extras,
    formats
  });
  const toggle = (arr, v) => arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  const downloadZip = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const f of files) zip.file(f.filename, f.content);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ruleskit-${pack.id}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const copy = async (text, key) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };
  const active = files[activeTab];
  return /* @__PURE__ */ jsxs("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsx(Section, { step: "01", title: "Output format", hint: "Pick one or more file formats", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: FORMAT_OPTIONS.map((f) => {
      const on = formats.includes(f.id);
      return /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            const next = toggle(formats, f.id);
            setFormats(next.length ? next : [f.id]);
          },
          className: `group rounded-md border px-4 py-3 text-left transition ${on ? "border-primary bg-primary/10 text-foreground glow-primary" : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-mono opacity-70", children: f.ext }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm font-medium", children: f.label })
          ]
        },
        f.id
      );
    }) }) }),
    /* @__PURE__ */ jsx(Section, { step: "02", title: "Framework", hint: "Adds framework-specific rules", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: pack.frameworks.map((fw) => {
      const on = frameworkId === fw.id;
      return /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFrameworkId(fw.id),
          className: `rounded-md border px-3 py-2 text-sm font-mono transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"}`,
          children: fw.label
        },
        fw.id
      );
    }) }) }),
    /* @__PURE__ */ jsx(Section, { step: "03", title: "Extras", hint: "Optional rule blocks and tooling configs", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
      (pack.optionalBlocks ?? []).map((b) => /* @__PURE__ */ jsx(
        Toggle,
        {
          label: b.label,
          sub: "rule block",
          on: optionalBlocks.includes(b.id),
          onChange: () => setOptionalBlocks(toggle(optionalBlocks, b.id))
        },
        b.id
      )),
      pack.extras.map((e) => /* @__PURE__ */ jsx(
        Toggle,
        {
          label: e.label,
          sub: "config file",
          on: extras.includes(e.id),
          onChange: () => setExtras(toggle(extras, e.id))
        },
        e.id
      ))
    ] }) }),
    /* @__PURE__ */ jsx(Section, { step: "04", title: "Live preview", hint: `${files.length} file${files.length === 1 ? "" : "s"} ready`, children: /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-lg border border-border bg-surface", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1 overflow-x-auto border-b border-border bg-background/40 px-2 py-2", children: files.map((f, i) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(i),
          className: `whitespace-nowrap rounded px-3 py-1.5 text-xs font-mono transition ${i === activeTab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"}`,
          children: f.filename
        },
        f.filename + i
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => active && copy(active.content, "preview"),
            className: "absolute right-3 top-3 z-10 rounded border border-border bg-surface-elevated px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground",
            children: copied === "preview" ? "copied!" : "copy"
          }
        ),
        /* @__PURE__ */ jsx("pre", { className: "max-h-[480px] overflow-auto p-5 text-xs leading-relaxed text-foreground/90", children: /* @__PURE__ */ jsx("code", { children: active?.content ?? "" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(Section, { step: "05", title: "Ship it", hint: "Download or copy the CLI command", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: downloadZip,
            className: "flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary",
            children: "↓ Download .zip"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => copy(cliCmd, "cli"),
            className: "flex-1 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-mono text-foreground transition hover:bg-surface-elevated",
            children: copied === "cli" ? "✓ copied!" : "$ copy CLI command"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 overflow-x-auto rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: "$" }),
        " ",
        cliCmd
      ] })
    ] })
  ] });
}
function Section({
  step,
  title,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxs("section", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-primary", children: step }),
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "— ",
        hint
      ] })
    ] }),
    children
  ] });
}
function Toggle({
  label,
  sub,
  on,
  onChange
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: onChange,
      className: `flex items-center justify-between rounded-md border px-4 py-3 text-left transition ${on ? "border-primary/60 bg-primary/5" : "border-border bg-surface hover:border-border-strong"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: label }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground font-mono", children: sub })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-border"}`,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: `h-4 w-4 rounded-full bg-background transition ${on ? "translate-x-4" : ""}`
              }
            )
          }
        )
      ]
    }
  );
}
const CLI_EXAMPLES = [
  {
    label: "Defaults (frontend, agnostic, .cursorrules + tooling)",
    cmd: "npx ruleskit init"
  },
  {
    label: "Next.js + Cursor .mdc rules only",
    cmd: "npx ruleskit init --pack frontend --framework nextjs --format mdc --no-extras"
  },
  {
    label: "All formats + lint/husky extras",
    cmd: "npx ruleskit init --pack frontend --framework nextjs --format all"
  },
  {
    label: "Rules only, no config files",
    cmd: "npx ruleskit init --no-extras"
  }
];
const OUTPUTS = [
  { file: ".cursorrules", desc: "Legacy Cursor project rules" },
  { file: ".cursor/rules/<pack>.mdc", desc: "Cursor rules with globs" },
  { file: "SKILL.md", desc: "Agent skill format" }
];
const EXTRAS = [
  ".husky/pre-commit & pre-push",
  "eslint.config.js",
  ".stylelintrc.js",
  ".prettierrc.js",
  ".lintstagedrc.js",
  ".lighthouserc.json"
];
function UseInstructions() {
  return /* @__PURE__ */ jsx("section", { id: "use", className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 py-20", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-2 font-mono text-xs text-primary", children: "for developers" }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Use ruleskit in your project" }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed", children: "You do not need this repo. Generate rule files for your stack, drop them in your app root, and commit so your team and AI agents share the same standards." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-surface p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-mono text-sm font-semibold text-primary", children: "01 — Website" }),
        /* @__PURE__ */ jsxs("ol", { className: "mt-4 space-y-3 text-sm text-muted-foreground list-decimal list-inside", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Pick a pack above (",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-foreground font-mono", children: "frontend" }),
            " is stable today)"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Choose format, framework, and extras" }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Download .zip" }),
            " or copy the CLI command from step 05"
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Extract into your project root and commit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-surface p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-mono text-sm font-semibold text-primary", children: "02 — CLI" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "From your project directory (Node 18+):" }),
        /* @__PURE__ */ jsxs("code", { className: "mt-3 block rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-xs text-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "$" }),
          " npx ruleskit init"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-4 text-xs text-muted-foreground", children: [
          "Available after the",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: "ruleskit" }),
          " package is published to npm. Until then, use the zip download."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "CLI examples" }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 space-y-3", children: CLI_EXAMPLES.map((ex) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "rounded-md border border-border bg-surface/50 overflow-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "border-b border-border px-4 py-2 text-xs text-muted-foreground", children: ex.label }),
            /* @__PURE__ */ jsxs("code", { className: "block overflow-x-auto px-4 py-3 font-mono text-xs text-foreground", children: [
              /* @__PURE__ */ jsx("span", { className: "text-primary", children: "$" }),
              " ",
              ex.cmd
            ] })
          ]
        },
        ex.cmd
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 grid gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Generated files" }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2", children: OUTPUTS.map((o) => /* @__PURE__ */ jsxs(
          "li",
          {
            className: "flex flex-col gap-0.5 rounded-md border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-foreground", children: o.file }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: o.desc })
            ]
          },
          o.file
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Optional extras" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          "Toggle in the generator or pass",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: "--extras" }),
          " /",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: "--no-extras" })
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-1.5 font-mono text-xs text-muted-foreground", children: EXTRAS.map((e) => /* @__PURE__ */ jsx("li", { className: "rounded border border-border/60 bg-surface/30 px-3 py-2", children: e }, e)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold", children: "Team workflow" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 font-mono text-xs text-muted-foreground leading-relaxed", children: "generate → commit to git → AI reads rules → optional Husky/ESLint on commit" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
        "If you enable Husky or ESLint extras, install matching devDependencies in your project (",
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: "eslint" }),
        ",",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: "husky" }),
        ",",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-mono", children: "lint-staged" }),
        ", etc.)."
      ] })
    ] })
  ] }) });
}
function Home() {
  const packs2 = registry.getPacks();
  const stablePacks = registry.getStablePacks();
  const [selectedId, setSelectedId] = useState(stablePacks[0]?.id ?? "");
  const selected = registry.getPack(selectedId);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-lg font-bold text-primary", children: "▲" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-sm font-semibold tracking-tight", children: "ruleskit" }),
        /* @__PURE__ */ jsx("span", { className: "ml-2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground", children: "v1" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-5 text-xs font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsx("a", { href: "#how", className: "hover:text-foreground", children: "how it works" }),
        /* @__PURE__ */ jsx("a", { href: "#use", className: "hover:text-foreground", children: "for developers" }),
        /* @__PURE__ */ jsx("a", { href: "#roadmap", className: "hover:text-foreground", children: "roadmap" }),
        /* @__PURE__ */ jsx("a", { href: "https://github.com", className: "rounded border border-border px-2.5 py-1 hover:border-border-strong hover:text-foreground", children: "github" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden border-b border-border bg-grid", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-6xl px-6 py-24 sm:py-32", children: [
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground", children: [
          /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success animate-pulse" }),
          "v1 — frontend pack ships today"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl", children: [
          "AI rules for every",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "engineering discipline" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed", children: [
          "Generate ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: ".cursorrules" }),
          ",",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: ".mdc" }),
          ", or",
          " ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: "SKILL.md" }),
          " files pre-loaded with performance, design, and linting rules for your stack. Drop them in your project. Your AI follows them automatically."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#generator", className: "rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-primary hover:opacity-90", children: "Generate my rules file ↓" }),
          /* @__PURE__ */ jsxs("code", { className: "rounded-md border border-border bg-surface px-4 py-3 text-sm font-mono text-foreground", children: [
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: "$" }),
            " npx ruleskit init"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { id: "generator", className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-baseline gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-primary", children: "00" }),
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Pick your pack" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "— each discipline is self-contained" })
      ] }),
      /* @__PURE__ */ jsx(PackGrid, { packs: packs2, selectedId, onSelect: setSelectedId }),
      selected && selected.status === "stable" && /* @__PURE__ */ jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsx(Generator, { pack: selected }) }),
      selected && selected.status !== "stable" && /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-lg border border-warning/30 bg-warning/5 p-6 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-warning", children: selected.label }),
        " pack is coming soon. Follow along on GitHub for updates."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "how", className: "border-b border-border bg-surface/30", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "How it works" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: ["Pick your pack and framework", "Toggle extras: design rules, hooks, linting", "Download the zip or run npx ruleskit init", "Your agent and pipeline follow them automatically"].map((step, i) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-surface p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "font-mono text-xs text-primary", children: [
          "step ",
          String(i + 1).padStart(2, "0")
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 text-sm text-foreground leading-relaxed", children: step })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx(UseInstructions, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "What's covered (frontend pack)" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6", children: ["Performance", "Design", "Accessibility", "Git Hooks", "Linting", "Lighthouse CI"].map((label) => /* @__PURE__ */ jsx("div", { className: "rounded-md border border-border bg-surface px-4 py-6 text-center text-sm font-mono text-muted-foreground hover:border-primary hover:text-foreground transition", children: label }, label)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { id: "roadmap", className: "border-b border-border bg-surface/30", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-6 py-20", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Pack roadmap" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex flex-wrap items-center gap-3 font-mono text-sm", children: [{
        label: "v1 Frontend",
        state: "shipped"
      }, {
        label: "v2 Backend",
        state: "next"
      }, {
        label: "v3 DevOps",
        state: "later"
      }, {
        label: "v4 Mobile",
        state: "later"
      }].map((m, i, arr) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: `rounded-md border px-3 py-2 ${m.state === "shipped" ? "border-success text-success" : m.state === "next" ? "border-primary text-primary" : "border-border text-muted-foreground"}`, children: m.label }),
        i < arr.length - 1 && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "→" })
      ] }, m.label)) })
    ] }) }),
    /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs font-mono text-muted-foreground sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "Frontend rules sourced from",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://roadmap.sh/frontend-performance-best-practices", className: "text-foreground hover:text-primary", children: "roadmap.sh/frontend-performance-best-practices" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx("a", { href: "https://github.com", className: "hover:text-foreground", children: "github" }),
        /* @__PURE__ */ jsx("a", { href: "https://npmjs.com", className: "hover:text-foreground", children: "npm" }),
        /* @__PURE__ */ jsx("a", { href: "https://roadmap.sh", className: "hover:text-foreground", children: "roadmap.sh" })
      ] })
    ] }) })
  ] });
}
export {
  Home as component
};
