const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jszip.min-Cu51i9sX.js","assets/index-C7gm57S4.js"])))=>i.map(i=>d[i]);
import{j as e,r as u,_ as R}from"./index-C7gm57S4.js";const O={id:"backend",label:"Backend",status:"coming-soon",description:"API design, security, caching, and performance rules for backend engineers",icon:"server",frameworks:[{id:"agnostic",label:"Framework-agnostic",frameworkFile:null},{id:"express",label:"Express",frameworkFile:null},{id:"nestjs",label:"NestJS",frameworkFile:null},{id:"fastify",label:"Fastify",frameworkFile:null},{id:"django",label:"Django",frameworkFile:null},{id:"laravel",label:"Laravel",frameworkFile:null}],blocks:[],extras:[]},I=Object.freeze(Object.defineProperty({__proto__:null,default:O},Symbol.toStringTag,{value:"Module"})),U={id:"devops",label:"DevOps",status:"coming-soon",description:"CI/CD, Docker, Kubernetes, and infra-as-code rules for DevOps engineers",icon:"cloud",frameworks:[],blocks:[],extras:[]},E=Object.freeze(Object.defineProperty({__proto__:null,default:U},Symbol.toStringTag,{value:"Module"})),M={id:"frontend",label:"Frontend",status:"stable",description:"Performance, design, and DX rules for frontend engineers",icon:"layout",source:"roadmap.sh/frontend-performance-best-practices",frameworks:[{id:"agnostic",label:"Framework-agnostic",frameworkFile:null},{id:"nextjs",label:"Next.js",frameworkFile:"nextjs.md"},{id:"nuxt",label:"Nuxt",frameworkFile:"nuxt.md"},{id:"sveltekit",label:"SvelteKit",frameworkFile:"sveltekit.md"},{id:"angular",label:"Angular",frameworkFile:"angular.md"},{id:"vanilla",label:"Vanilla JS",frameworkFile:null}],blocks:["html","css","javascript","images","fonts","network","web-vitals"],optionalBlocks:[{id:"design",label:"Design principles",default:!0}],extras:[{id:"husky",label:"Husky + lint-staged",default:!0},{id:"eslint",label:"ESLint",default:!0},{id:"stylelint",label:"Stylelint",default:!0},{id:"prettier",label:"Prettier",default:!0},{id:"lighthouse",label:"Lighthouse CI budget",default:!1}]},D=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"})),$={id:"mobile",label:"Mobile",status:"coming-soon",description:"Performance, accessibility, and UX rules for mobile engineers",icon:"smartphone",frameworks:[],blocks:[],extras:[]},z=Object.freeze(Object.defineProperty({__proto__:null,default:$},Symbol.toStringTag,{value:"Module"})),B=`## CSS Performance Rules

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
`,K=`## Design Principles Rules

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
`,G=`## Font Performance Rules

- Always use font-display: swap or font-display: optional to prevent FOIT
- Preload critical fonts: <link rel="preload" as="font" crossorigin>
- Subset fonts to only the characters actually used on the page
- Prefer variable fonts over loading multiple font weight files
- Self-host fonts when possible to avoid third-party DNS lookup latency
- Limit font families to 2 maximum per page
- Use system font stacks as fallback to reduce layout shift during font swap
`,H=`## Angular Specific Rules

- Use OnPush change detection on all components by default
- Lazy load all feature modules via loadChildren in the router config
- Use @defer blocks (Angular 17+) for below-the-fold components
- Avoid subscribing in templates — use the async pipe instead
- Use trackBy in all *ngFor loops to prevent full list re-renders
- Enable NgOptimizedImage for all images
- Use signals (Angular 16+) over RxJS for local component state
- Analyze bundles with ng build --stats-json + webpack-bundle-analyzer
`,W=`## Next.js Specific Rules

- Always use next/image — never raw <img> for content images
- Always use next/font — never load Google Fonts via <link> in _document
- Use dynamic() with ssr: false for client-only heavy components
- Choose rendering per route: SSG > ISR > SSR > CSR (performance order)
- Avoid bloating _app.js — only global providers belong there
- Use next/script with strategy="lazyOnload" for non-critical scripts
- Enable Next.js bundle analyzer to catch oversized chunks
- Use Partial Prerendering (PPR) where available (Next.js 14+)
- Prefer React Server Components for data-fetching
- Use generateStaticParams for dynamic SSG routes
`,J=`## Nuxt Specific Rules

- Use <NuxtImg> or <NuxtPicture> instead of raw <img>
- Use useLazyFetch and useLazyAsyncData for non-critical data
- Enable Nuxt's payload extraction to avoid re-fetching on hydration
- Use definePageMeta({ ssr: false }) only when truly necessary
- Lazy-load heavy components: const MyComp = defineAsyncComponent(...)
- Avoid importing globally in plugins — use route-level code splitting
- Enable Brotli compression in the Nitro server config
- Use useHead for preload and prefetch hints per page
`,V=`## SvelteKit Specific Rules

- Use load() in +page.server.js for SSR data — avoid client-side fetch waterfalls
- Use preload hints via <link rel="preload"> inside <svelte:head>
- Prefer +page.server.js over +page.js when data doesn't need to be reactive
- Use import() for heavy client-only components with {#await}
- Leverage built-in prerendering for static routes (prerender = true)
- Avoid hydration mismatches — keep server and client data consistent
- Use $app/environment browser check before accessing window or document
`,Y=`## HTML Performance Rules

- Deliver critical above-the-fold HTML first; use SSR or SSG to reduce TTFB
- Place all <link rel="stylesheet"> in <head> — never below the fold
- Place <script> tags at end of <body> or use defer/async attributes
- Remove HTML comments, unnecessary whitespace, and dead markup in production
- Avoid deeply nested DOM trees (max 32 levels recommended)
- Enable Brotli or GZIP compression for all HTML responses
- Use semantic elements to reduce layout recalculation overhead
- Inline only truly critical HTML — avoid over-inlining large blocks
`,q=`## Image Performance Rules

- Use modern formats: WebP for photos, AVIF for maximum compression
- Always set explicit width and height attributes to prevent CLS
- Lazy load all below-the-fold images using loading="lazy"
- Use responsive images with srcset and sizes attributes
- Preload the LCP image using <link rel="preload" as="image">
- Compress all images before shipping — use Squoosh, ImageOptim, or sharp
- Use SVG for icons, logos, and simple illustrations
- Avoid CSS background-image for critical images — browser cannot preload them
- Use a CDN with automatic image optimization where possible
`,X=`## JavaScript Performance Rules

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
`,Z=`## Network & Caching Rules

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
`,Q=`## Core Web Vitals Rules

Target thresholds (Google "Good" range):
  LCP — Largest Contentful Paint  : < 2.5s
  INP — Interaction to Next Paint : < 200ms
  CLS — Cumulative Layout Shift   : < 0.1

LCP:
- Ensure the LCP element is server-rendered, not JS-injected
- Preload the LCP image with <link rel="preload" as="image">
- Never lazy load the LCP image
- Minimize render-blocking resources above the fold
- Use SSR or SSG to reduce TTFB

INP:
- Break up long tasks (> 50ms) using scheduler.yield() or setTimeout chunking
- Avoid heavy synchronous JS on click and input handlers
- Move non-UI work to Web Workers
- Debounce expensive event handlers

CLS:
- Always set width and height on images and video elements
- Reserve space for ads and dynamic content using aspect-ratio CSS
- Avoid inserting content above existing content after page load
- Use font-display: optional to prevent font-swap layout shifts
- Never animate layout-affecting properties: top, left, width, height
`,ee=`module.exports = {
  extends: ["./base.js"],
  plugins: ["@angular-eslint"],
  rules: {
    "@angular-eslint/prefer-on-push-component-change-detection": "error",
    "@angular-eslint/no-empty-lifecycle-method": "error",
    "@angular-eslint/use-lifecycle-interface": "error",
    "@angular-eslint/component-selector": [
      "error",
      { type: "element", prefix: "app", style: "kebab-case" }
    ]
  }
}
`,ne=`module.exports = {
  env: { browser: true, es2022: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "prettier"
  ],
  plugins: ["jsx-a11y", "import", "no-relative-import-paths"],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "import/no-duplicates": "error",
    "import/no-cycle": ["error", { maxDepth: 3 }],
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      { allowSameFolder: true, rootDir: "src", prefix: "@" }
    ],
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/no-autofocus": "warn",
    "jsx-a11y/interactive-supports-focus": "error",
    "jsx-a11y/click-events-have-key-events": "error"
  }
}
`,te=`module.exports = {
  extends: ["./base.js", "next/core-web-vitals"],
  rules: {
    "@next/next/no-img-element": "error",
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-sync-scripts": "error",
    "@next/next/no-css-tags": "error",
    "@next/next/no-page-custom-font": "error",
    "@next/next/google-font-display": "error",
    "@next/next/no-before-interactive-script-outside-document": "error"
  }
}
`,re=`module.exports = {
  extends: ["./base.js", "plugin:svelte/recommended"],
  rules: {
    "svelte/no-unused-svelte-ignore": "error",
    "svelte/valid-compile": "error",
    "svelte/no-at-html-tags": "warn"
  }
}
`,se=`module.exports = {
  extends: ["./base.js", "plugin:vue/vue3-recommended"],
  rules: {
    "vue/no-unused-vars": "error",
    "vue/no-v-html": "warn",
    "vue/require-v-for-key": "error",
    "vue/no-use-v-if-with-v-for": "error",
    "vue/component-api-style": ["error", ["script-setup", "composition"]]
  }
}
`,oe=`#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "ruleskit: running pre-commit checks..."
npx lint-staged
`,ae=`#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "ruleskit: running pre-push checks..."
npm run build --if-present
npx lhci autorun --config=.lighthouserc.json || echo "⚠ Lighthouse budget warning"
`,ie=`[
  {
    "path": "/*",
    "timings": [
      { "metric": "interactive", "budget": 3000 },
      { "metric": "first-contentful-paint", "budget": 1500 },
      { "metric": "largest-contentful-paint", "budget": 2500 },
      { "metric": "cumulative-layout-shift", "budget": 0.1 },
      { "metric": "total-blocking-time", "budget": 200 }
    ],
    "resourceSizes": [
      { "resourceType": "script", "budget": 150 },
      { "resourceType": "total", "budget": 500 },
      { "resourceType": "image", "budget": 200 },
      { "resourceType": "stylesheet", "budget": 50 },
      { "resourceType": "font", "budget": 75 }
    ],
    "resourceCounts": [
      { "resourceType": "third-party", "budget": 5 },
      { "resourceType": "script", "budget": 10 }
    ]
  }
]
`,le=`module.exports = {
  "*.{js,jsx,ts,tsx,vue,svelte}": [
    "eslint --fix --max-warnings=0",
    "prettier --write"
  ],
  "*.{css,scss}": [
    "stylelint --fix",
    "prettier --write"
  ],
  "*.{json,md,yaml,yml}": [
    "prettier --write"
  ],
  "*.{jpg,jpeg,png,gif,webp}": [
    "imagemin-lint-staged"
  ]
}
`,de=`module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf"
}
`,ce=`module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order"
  ],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "declaration-property-value-disallowed-list": {
      "transition": ["/all/"],
      "animation": ["/all/"]
    },
    "plugin/no-unsupported-browser-features": [
      true,
      { severity: "warning", ignore: ["css-nesting"] }
    ],
    "color-no-invalid-hex": true,
    "unit-disallowed-list": ["px"],
    "number-max-precision": 2,
    "shorthand-property-no-redundant-values": true,
    "declaration-no-important": true
  }
}
`,me=`# ruleskit — {{PACK}} Rules
# Generated by ruleskit — https://ruleskit.dev
# Pack: {{PACK}} | Framework: {{FRAMEWORK}}
# Source: {{SOURCE}}

{{BLOCKS}}

## Severity Labels
🔴 High   — fix before shipping
🟡 Medium — fix this sprint
🟢 Low    — nice to have

## Response Format
When reviewing code:
1. Tag each issue: [HTML] [CSS] [JS] [IMAGE] [FONT] [NETWORK] [VITALS] [DESIGN] [A11Y]
2. Label severity: 🔴 High | 🟡 Medium | 🟢 Low
3. Always provide a concrete fix with code
4. Lead with highest impact issues first
5. Reference the specific line or pattern — no generic feedback
`,ue=`---
description: {{PACK}} Best Practices
globs: ["**/*.tsx","**/*.ts","**/*.jsx","**/*.js","**/*.vue","**/*.svelte","**/*.html","**/*.css","**/*.scss"]
alwaysApply: true
---

# ruleskit — {{PACK}} Rules
# Generated by ruleskit — https://ruleskit.dev
# Pack: {{PACK}} | Framework: {{FRAMEWORK}}
# Source: {{SOURCE}}

{{BLOCKS}}

## Audit Response Format
- Tag: [HTML] [CSS] [JS] [IMAGE] [FONT] [NETWORK] [VITALS] [DESIGN] [A11Y]
- Severity: 🔴 High | 🟡 Medium | 🟢 Low
- Always include a concrete code fix
- Lead with highest impact issues
`,pe=`# SKILL: {{PACK}} Agent
# Generated by ruleskit — https://ruleskit.dev
# Pack: {{PACK}} | Framework: {{FRAMEWORK}}
# Source: {{SOURCE}}

## Role
You are a {{PACK}} code quality reviewer.
When a developer shares code, audit it against the rules below
and return structured, actionable findings only.

## Rules

{{BLOCKS}}

## Output Format
For each issue found:
  DOMAIN   : [HTML | CSS | JS | IMAGE | FONT | NETWORK | VITALS | DESIGN | A11Y]
  SEVERITY : 🔴 High | 🟡 Medium | 🟢 Low
  ISSUE    : one sentence describing the problem
  FIX      : concrete code snippet or action

Lead with 🔴 issues. Skip domains with no issues.
Never give generic advice — always tie findings to the actual code provided.
`,fe=Object.assign({"/packs/backend/pack.config.ts":I,"/packs/devops/pack.config.ts":E,"/packs/frontend/pack.config.ts":D,"/packs/mobile/pack.config.ts":z}),_=Object.assign({"/packs/frontend/blocks/css.md":B,"/packs/frontend/blocks/design.md":K,"/packs/frontend/blocks/fonts.md":G,"/packs/frontend/blocks/frameworks/angular.md":H,"/packs/frontend/blocks/frameworks/nextjs.md":W,"/packs/frontend/blocks/frameworks/nuxt.md":J,"/packs/frontend/blocks/frameworks/sveltekit.md":V,"/packs/frontend/blocks/html.md":Y,"/packs/frontend/blocks/images.md":q,"/packs/frontend/blocks/javascript.md":X,"/packs/frontend/blocks/network.md":Z,"/packs/frontend/blocks/web-vitals.md":Q}),ge=Object.assign({"/packs/frontend/configs/eslint/angular.js":ee,"/packs/frontend/configs/eslint/base.js":ne,"/packs/frontend/configs/eslint/nextjs.js":te,"/packs/frontend/configs/eslint/svelte.js":re,"/packs/frontend/configs/eslint/vue.js":se,"/packs/frontend/configs/husky/pre-commit":oe,"/packs/frontend/configs/husky/pre-push":ae,"/packs/frontend/configs/lighthouse/budget.json":ie,"/packs/frontend/configs/lint-staged/base.js":le,"/packs/frontend/configs/prettier/base.js":de,"/packs/frontend/configs/stylelint/base.js":ce}),xe=Object.assign({"/core/templates/cursorrules.template.md":me,"/core/templates/mdc.template.md":ue,"/core/templates/skill.template.md":pe}),N=Object.entries(fe).map(([n,r])=>({path:n,config:r.default})).sort((n,r)=>{const o=["frontend","backend","devops","mobile"];return o.indexOf(n.config.id)-o.indexOf(r.config.id)}).map(n=>n.config),c={getPacks(){return N},getStablePacks(){return N.filter(n=>n.status==="stable")},getPack(n){return N.find(r=>r.id===n)},getBlock(n,r){const o=Object.keys(_).find(s=>s===`/packs/${n}/blocks/${r}.md`);return o?_[o]:""},getFrameworkBlock(n,r){const o=`/packs/${n}/blocks/frameworks/${r}`;return _[o]??""},getConfigFile(n,r){const o=`/packs/${n}/configs/${r}`;return ge[o]??""},getTemplate(n){const r=`/core/templates/${n}.template.md`;return xe[r]??""}},be={layout:"▢",server:"▤",cloud:"☁",smartphone:"▯"};function he({packs:n,selectedId:r,onSelect:o}){return e.jsx("div",{className:"grid gap-3 sm:grid-cols-2 lg:grid-cols-4",children:n.map(s=>{const i=s.status==="stable",a=i&&r===s.id;return e.jsxs("button",{onClick:()=>i&&o(s.id),disabled:!i,className:`group relative flex flex-col items-start gap-3 rounded-lg border p-5 text-left transition ${a?"border-primary bg-primary/10 glow-primary":i?"border-border bg-surface hover:border-border-strong hover:bg-surface-elevated":"cursor-not-allowed border-border bg-surface/40 opacity-60"}`,children:[e.jsxs("div",{className:"flex w-full items-center justify-between",children:[e.jsx("span",{className:"text-2xl text-primary",children:be[s.icon]??"◆"}),e.jsx("span",{className:`rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${i?"border-success/50 text-success":"border-warning/50 text-warning"}`,children:i?"stable":"soon"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"text-sm font-semibold text-foreground",children:s.label}),e.jsx("div",{className:"mt-1 text-xs text-muted-foreground leading-relaxed",children:s.description})]})]},s.id)})})}const ve={cursorrules:{template:"cursorrules",filename:".cursorrules",language:"markdown"},mdc:{template:"mdc",filename:".cursor/rules/{{pack}}.mdc",language:"markdown"},skill:{template:"skill",filename:"SKILL.md",language:"markdown"}};function ye(n,r,o){const s=[];for(const a of n.blocks){const l=c.getBlock(n.id,a).trim();l&&s.push(l)}for(const a of n.optionalBlocks??[])if(o.includes(a.id)){const l=c.getBlock(n.id,a.id).trim();l&&s.push(l)}const i=n.frameworks.find(a=>a.id===r);if(i?.frameworkFile){const a=c.getFrameworkBlock(n.id,i.frameworkFile).trim();a&&s.push(a)}return s.join(`

`)}function ke(n){const r=c.getPack(n.packId);if(!r)throw new Error(`Unknown pack: ${n.packId}`);const o=ye(r,n.frameworkId,n.selectedOptionalBlocks),s=r.frameworks.find(l=>l.id===n.frameworkId)?.label??"Framework-agnostic",i=n.formats.map(l=>{const m=ve[l],f=c.getTemplate(m.template).replaceAll("{{BLOCKS}}",o).replaceAll("{{PACK}}",r.label).replaceAll("{{FRAMEWORK}}",s).replaceAll("{{SOURCE}}",r.source??"");return{filename:m.filename.replaceAll("{{pack}}",r.id),content:f,language:m.language}}),a=je(r.id,n.extras,n.frameworkId);return[...i,...a]}function je(n,r,o){if(n!=="frontend")return[];const s=[];if(r.includes("husky")&&(s.push({filename:".husky/pre-commit",content:c.getConfigFile(n,"husky/pre-commit"),language:"bash"}),s.push({filename:".husky/pre-push",content:c.getConfigFile(n,"husky/pre-push"),language:"bash"}),s.push({filename:".lintstagedrc.js",content:c.getConfigFile(n,"lint-staged/base.js"),language:"javascript"})),r.includes("eslint")){const i=o==="nextjs"?"eslint/nextjs.js":o==="nuxt"?"eslint/vue.js":o==="sveltekit"?"eslint/svelte.js":o==="angular"?"eslint/angular.js":"eslint/base.js";s.push({filename:"eslint.config.js",content:c.getConfigFile(n,i),language:"javascript"})}return r.includes("stylelint")&&s.push({filename:".stylelintrc.js",content:c.getConfigFile(n,"stylelint/base.js"),language:"javascript"}),r.includes("prettier")&&s.push({filename:".prettierrc.js",content:c.getConfigFile(n,"prettier/base.js"),language:"javascript"}),r.includes("lighthouse")&&s.push({filename:".lighthouserc.json",content:c.getConfigFile(n,"lighthouse/budget.json"),language:"json"}),s}function we(n){const r=n.formats.length===3?"all":n.formats.join(","),o=n.extras.length?`--extras ${n.extras.join(",")}`:"--no-extras";return`npx ruleskit init --pack ${n.packId} --framework ${n.frameworkId} --format ${r} ${o}`}const _e=[{id:"cursorrules",label:"Cursor",ext:".cursorrules"},{id:"mdc",label:"Cursor Rules",ext:".mdc"},{id:"skill",label:"Agent Skill",ext:"SKILL.md"}];function Ne({pack:n}){const[r,o]=u.useState(["cursorrules"]),[s,i]=u.useState(n.frameworks[0]?.id??"agnostic"),[a,l]=u.useState((n.optionalBlocks??[]).filter(t=>t.default).map(t=>t.id)),[m,v]=u.useState(n.extras.filter(t=>t.default).map(t=>t.id)),[f,b]=u.useState(0),[S,y]=u.useState(null),p=u.useMemo(()=>ke({packId:n.id,frameworkId:s,selectedOptionalBlocks:a,extras:m,formats:r}),[n.id,s,a,m,r]);u.useEffect(()=>{i(n.frameworks[0]?.id??"agnostic"),l((n.optionalBlocks??[]).filter(t=>t.default).map(t=>t.id)),v(n.extras.filter(t=>t.default).map(t=>t.id)),b(0),y(null)},[n.id]),u.useEffect(()=>{f>=p.length&&b(0)},[p.length,f]);const C=we({packId:n.id,frameworkId:s,extras:m,formats:r}),k=(t,d)=>t.includes(d)?t.filter(g=>g!==d):[...t,d],F=async()=>{const t=(await R(async()=>{const{default:h}=await import("./jszip.min-Cu51i9sX.js").then(T=>T.j);return{default:h}},__vite__mapDeps([0,1]))).default,d=new t;for(const h of p)d.file(h.filename,h.content);const g=await d.generateAsync({type:"blob"}),A=URL.createObjectURL(g),w=document.createElement("a");w.href=A,w.download=`ruleskit-${n.id}.zip`,w.click(),URL.revokeObjectURL(A)},P=async(t,d)=>{await navigator.clipboard.writeText(t),y(d),setTimeout(()=>y(null),1500)},j=p[f];return e.jsxs("div",{className:"space-y-10",children:[e.jsx(x,{step:"01",title:"Output format",hint:"Pick one or more file formats",children:e.jsx("div",{className:"grid grid-cols-2 gap-3 sm:grid-cols-4",children:_e.map(t=>{const d=r.includes(t.id);return e.jsxs("button",{onClick:()=>{const g=k(r,t.id);o(g.length?g:[t.id])},className:`group rounded-md border px-4 py-3 text-left transition ${d?"border-primary bg-primary/10 text-foreground glow-primary":"border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"}`,children:[e.jsx("div",{className:"text-xs font-mono opacity-70",children:t.ext}),e.jsx("div",{className:"mt-1 text-sm font-medium",children:t.label})]},t.id)})})}),e.jsx(x,{step:"02",title:"Framework",hint:"Adds framework-specific rules",children:e.jsx("div",{className:"flex flex-wrap gap-2",children:n.frameworks.map(t=>{const d=s===t.id;return e.jsx("button",{onClick:()=>i(t.id),className:`rounded-md border px-3 py-2 text-sm font-mono transition ${d?"border-primary bg-primary text-primary-foreground":"border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"}`,children:t.label},t.id)})})}),e.jsx(x,{step:"03",title:"Extras",hint:"Optional rule blocks and tooling configs",children:e.jsxs("div",{className:"grid gap-2 sm:grid-cols-2",children:[(n.optionalBlocks??[]).map(t=>e.jsx(L,{label:t.label,sub:"rule block",on:a.includes(t.id),onChange:()=>l(k(a,t.id))},t.id)),n.extras.map(t=>e.jsx(L,{label:t.label,sub:"config file",on:m.includes(t.id),onChange:()=>v(k(m,t.id))},t.id))]})}),e.jsx(x,{step:"04",title:"Live preview",hint:`${p.length} file${p.length===1?"":"s"} ready`,children:e.jsxs("div",{className:"overflow-hidden rounded-lg border border-border bg-surface",children:[e.jsx("div",{className:"flex items-center gap-1 overflow-x-auto border-b border-border bg-background/40 px-2 py-2",children:p.map((t,d)=>e.jsx("button",{onClick:()=>b(d),className:`whitespace-nowrap rounded px-3 py-1.5 text-xs font-mono transition ${d===f?"bg-primary text-primary-foreground":"text-muted-foreground hover:bg-surface-elevated hover:text-foreground"}`,children:t.filename},t.filename+d))}),e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:()=>j&&P(j.content,"preview"),className:"absolute right-3 top-3 z-10 rounded border border-border bg-surface-elevated px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground",children:S==="preview"?"copied!":"copy"}),e.jsx("pre",{className:"max-h-[480px] overflow-auto p-5 text-xs leading-relaxed text-foreground/90",children:e.jsx("code",{children:j?.content??""})})]})]})}),e.jsxs(x,{step:"05",title:"Ship it",hint:"Download or copy the CLI command",children:[e.jsxs("div",{className:"flex flex-col gap-3 sm:flex-row",children:[e.jsx("button",{onClick:F,className:"flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary",children:"↓ Download .zip"}),e.jsx("button",{onClick:()=>P(C,"cli"),className:"flex-1 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-mono text-foreground transition hover:bg-surface-elevated",children:S==="cli"?"✓ copied!":"$ copy CLI command"})]}),e.jsxs("div",{className:"mt-3 overflow-x-auto rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-xs text-muted-foreground",children:[e.jsx("span",{className:"text-primary",children:"$"})," ",C]})]})]})}function x({step:n,title:r,hint:o,children:s}){return e.jsxs("section",{children:[e.jsxs("div",{className:"mb-4 flex items-baseline gap-3",children:[e.jsx("span",{className:"font-mono text-xs text-primary",children:n}),e.jsx("h3",{className:"text-base font-semibold text-foreground",children:r}),e.jsxs("span",{className:"text-xs text-muted-foreground",children:["— ",o]})]}),s]})}function L({label:n,sub:r,on:o,onChange:s}){return e.jsxs("button",{onClick:s,className:`flex items-center justify-between rounded-md border px-4 py-3 text-left transition ${o?"border-primary/60 bg-primary/5":"border-border bg-surface hover:border-border-strong"}`,children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-sm font-medium text-foreground",children:n}),e.jsx("div",{className:"text-xs text-muted-foreground font-mono",children:r})]}),e.jsx("div",{className:`h-5 w-9 rounded-full p-0.5 transition ${o?"bg-primary":"bg-border"}`,children:e.jsx("div",{className:`h-4 w-4 rounded-full bg-background transition ${o?"translate-x-4":""}`})})]})}const Se=[{label:"Defaults (frontend, agnostic, .cursorrules + tooling)",cmd:"npx ruleskit init"},{label:"Next.js + Cursor .mdc rules only",cmd:"npx ruleskit init --pack frontend --framework nextjs --format mdc --no-extras"},{label:"All formats + lint/husky extras",cmd:"npx ruleskit init --pack frontend --framework nextjs --format all"},{label:"Rules only, no config files",cmd:"npx ruleskit init --no-extras"}],Ce=[{file:".cursorrules",desc:"Legacy Cursor project rules"},{file:".cursor/rules/<pack>.mdc",desc:"Cursor rules with globs"},{file:"SKILL.md",desc:"Agent skill format"}],Pe=[".husky/pre-commit & pre-push","eslint.config.js",".stylelintrc.js",".prettierrc.js",".lintstagedrc.js",".lighthouserc.json"];function Ae(){return e.jsx("section",{id:"use",className:"border-b border-border",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-20",children:[e.jsx("div",{className:"mb-2 font-mono text-xs text-primary",children:"for developers"}),e.jsx("h2",{className:"text-2xl font-bold",children:"Use ruleskit in your project"}),e.jsx("p",{className:"mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed",children:"You do not need this repo. Generate rule files for your stack, drop them in your app root, and commit so your team and AI agents share the same standards."}),e.jsxs("div",{className:"mt-12 grid gap-8 lg:grid-cols-2",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-surface p-6",children:[e.jsx("h3",{className:"font-mono text-sm font-semibold text-primary",children:"01 — Website"}),e.jsxs("ol",{className:"mt-4 space-y-3 text-sm text-muted-foreground list-decimal list-inside",children:[e.jsxs("li",{children:["Pick a pack above ("," ",e.jsx("span",{className:"text-foreground font-mono",children:"frontend"})," is stable today)"]}),e.jsx("li",{children:"Choose format, framework, and extras"}),e.jsxs("li",{children:[e.jsx("span",{className:"text-foreground",children:"Download .zip"})," or copy the CLI command from step 05"]}),e.jsx("li",{children:"Extract into your project root and commit"})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface p-6",children:[e.jsx("h3",{className:"font-mono text-sm font-semibold text-primary",children:"02 — CLI"}),e.jsx("p",{className:"mt-4 text-sm text-muted-foreground",children:"From your project directory (Node 18+):"}),e.jsxs("code",{className:"mt-3 block rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-xs text-foreground",children:[e.jsx("span",{className:"text-primary",children:"$"})," npx ruleskit init"]}),e.jsxs("p",{className:"mt-4 text-xs text-muted-foreground",children:["Available after the"," ",e.jsx("span",{className:"font-mono text-foreground",children:"ruleskit"})," package is published to npm. Until then, use the zip download."]})]})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h3",{className:"text-base font-semibold",children:"CLI examples"}),e.jsx("div",{className:"mt-4 space-y-3",children:Se.map(n=>e.jsxs("div",{className:"rounded-md border border-border bg-surface/50 overflow-hidden",children:[e.jsx("div",{className:"border-b border-border px-4 py-2 text-xs text-muted-foreground",children:n.label}),e.jsxs("code",{className:"block overflow-x-auto px-4 py-3 font-mono text-xs text-foreground",children:[e.jsx("span",{className:"text-primary",children:"$"})," ",n.cmd]})]},n.cmd))})]}),e.jsxs("div",{className:"mt-12 grid gap-8 lg:grid-cols-2",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-base font-semibold",children:"Generated files"}),e.jsx("ul",{className:"mt-4 space-y-2",children:Ce.map(n=>e.jsxs("li",{className:"flex flex-col gap-0.5 rounded-md border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between",children:[e.jsx("span",{className:"font-mono text-xs text-foreground",children:n.file}),e.jsx("span",{className:"text-xs text-muted-foreground",children:n.desc})]},n.file))})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-base font-semibold",children:"Optional extras"}),e.jsxs("p",{className:"mt-2 text-xs text-muted-foreground",children:["Toggle in the generator or pass"," ",e.jsx("span",{className:"font-mono text-foreground",children:"--extras"})," /"," ",e.jsx("span",{className:"font-mono text-foreground",children:"--no-extras"})]}),e.jsx("ul",{className:"mt-4 space-y-1.5 font-mono text-xs text-muted-foreground",children:Pe.map(n=>e.jsx("li",{className:"rounded border border-border/60 bg-surface/30 px-3 py-2",children:n},n))})]})]}),e.jsxs("div",{className:"mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6",children:[e.jsx("h3",{className:"text-base font-semibold",children:"Team workflow"}),e.jsx("p",{className:"mt-3 font-mono text-xs text-muted-foreground leading-relaxed",children:"generate → commit to git → AI reads rules → optional Husky/ESLint on commit"}),e.jsxs("p",{className:"mt-3 text-xs text-muted-foreground",children:["If you enable Husky or ESLint extras, install matching devDependencies in your project (",e.jsx("span",{className:"font-mono",children:"eslint"}),","," ",e.jsx("span",{className:"font-mono",children:"husky"}),","," ",e.jsx("span",{className:"font-mono",children:"lint-staged"}),", etc.)."]})]})]})})}function Fe(){const n=c.getPacks(),r=c.getStablePacks(),[o,s]=u.useState(r[0]?.id??""),i=c.getPack(o);return e.jsxs("div",{className:"min-h-screen bg-background text-foreground",children:[e.jsx("header",{className:"sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur",children:e.jsxs("div",{className:"mx-auto flex max-w-6xl items-center justify-between px-6 py-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{className:"font-mono text-lg font-bold text-primary",children:"▲"}),e.jsx("span",{className:"font-mono text-sm font-semibold tracking-tight",children:"ruleskit"}),e.jsx("span",{className:"ml-2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",children:"v1"})]}),e.jsxs("nav",{className:"flex items-center gap-5 text-xs font-mono text-muted-foreground",children:[e.jsx("a",{href:"#how",className:"hover:text-foreground",children:"how it works"}),e.jsx("a",{href:"#use",className:"hover:text-foreground",children:"for developers"}),e.jsx("a",{href:"#roadmap",className:"hover:text-foreground",children:"roadmap"}),e.jsx("a",{href:"https://github.com",className:"rounded border border-border px-2.5 py-1 hover:border-border-strong hover:text-foreground",children:"github"})]})]})}),e.jsxs("section",{className:"relative overflow-hidden border-b border-border bg-grid",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none"}),e.jsxs("div",{className:"relative mx-auto max-w-6xl px-6 py-24 sm:py-32",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground",children:[e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-success animate-pulse"}),"v1 — frontend pack ships today"]}),e.jsxs("h1",{className:"mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl",children:["AI rules for every"," ",e.jsx("span",{className:"text-gradient-primary",children:"engineering discipline"}),"."]}),e.jsxs("p",{className:"mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed",children:["Generate ",e.jsx("span",{className:"font-mono text-foreground",children:".cursorrules"}),","," ",e.jsx("span",{className:"font-mono text-foreground",children:".mdc"}),", or"," ",e.jsx("span",{className:"font-mono text-foreground",children:"SKILL.md"})," files pre-loaded with performance, design, and linting rules for your stack. Drop them in your project. Your AI follows them automatically."]}),e.jsxs("div",{className:"mt-10 flex flex-wrap items-center gap-4",children:[e.jsx("a",{href:"#generator",className:"rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-primary hover:opacity-90",children:"Generate my rules file ↓"}),e.jsxs("code",{className:"rounded-md border border-border bg-surface px-4 py-3 text-sm font-mono text-foreground",children:[e.jsx("span",{className:"text-primary",children:"$"})," npx ruleskit init"]})]})]})]}),e.jsx("section",{id:"generator",className:"border-b border-border",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-20",children:[e.jsxs("div",{className:"mb-8 flex items-baseline gap-3",children:[e.jsx("span",{className:"font-mono text-xs text-primary",children:"00"}),e.jsx("h2",{className:"text-2xl font-bold",children:"Pick your pack"}),e.jsx("span",{className:"text-xs text-muted-foreground",children:"— each discipline is self-contained"})]}),e.jsx(he,{packs:n,selectedId:o,onSelect:s}),i&&i.status==="stable"&&e.jsx("div",{className:"mt-16",children:e.jsx(Ne,{pack:i})}),i&&i.status!=="stable"&&e.jsxs("div",{className:"mt-12 rounded-lg border border-warning/30 bg-warning/5 p-6 text-sm",children:[e.jsx("span",{className:"font-mono text-warning",children:i.label})," pack is coming soon. Follow along on GitHub for updates."]})]})}),e.jsx("section",{id:"how",className:"border-b border-border bg-surface/30",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-20",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"How it works"}),e.jsx("div",{className:"mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",children:["Pick your pack and framework","Toggle extras: design rules, hooks, linting","Download the zip or run npx ruleskit init","Your agent and pipeline follow them automatically"].map((a,l)=>e.jsxs("div",{className:"rounded-lg border border-border bg-surface p-5",children:[e.jsxs("div",{className:"font-mono text-xs text-primary",children:["step ",String(l+1).padStart(2,"0")]}),e.jsx("div",{className:"mt-3 text-sm text-foreground leading-relaxed",children:a})]},l))})]})}),e.jsx(Ae,{}),e.jsx("section",{className:"border-b border-border",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-20",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"What's covered (frontend pack)"}),e.jsx("div",{className:"mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6",children:["Performance","Design","Accessibility","Git Hooks","Linting","Lighthouse CI"].map(a=>e.jsx("div",{className:"rounded-md border border-border bg-surface px-4 py-6 text-center text-sm font-mono text-muted-foreground hover:border-primary hover:text-foreground transition",children:a},a))})]})}),e.jsx("section",{id:"roadmap",className:"border-b border-border bg-surface/30",children:e.jsxs("div",{className:"mx-auto max-w-6xl px-6 py-20",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Pack roadmap"}),e.jsx("div",{className:"mt-10 flex flex-wrap items-center gap-3 font-mono text-sm",children:[{label:"v1 Frontend",state:"shipped"},{label:"v2 Backend",state:"next"},{label:"v3 DevOps",state:"later"},{label:"v4 Mobile",state:"later"}].map((a,l,m)=>e.jsxs("span",{className:"flex items-center gap-3",children:[e.jsx("span",{className:`rounded-md border px-3 py-2 ${a.state==="shipped"?"border-success text-success":a.state==="next"?"border-primary text-primary":"border-border text-muted-foreground"}`,children:a.label}),l<m.length-1&&e.jsx("span",{className:"text-muted-foreground",children:"→"})]},a.label))})]})}),e.jsx("footer",{children:e.jsxs("div",{className:"mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs font-mono text-muted-foreground sm:flex-row sm:items-center",children:[e.jsxs("div",{children:["Frontend rules sourced from"," ",e.jsx("a",{href:"https://roadmap.sh/frontend-performance-best-practices",className:"text-foreground hover:text-primary",children:"roadmap.sh/frontend-performance-best-practices"})]}),e.jsxs("div",{className:"flex gap-4",children:[e.jsx("a",{href:"https://github.com",className:"hover:text-foreground",children:"github"}),e.jsx("a",{href:"https://npmjs.com",className:"hover:text-foreground",children:"npm"}),e.jsx("a",{href:"https://roadmap.sh",className:"hover:text-foreground",children:"roadmap.sh"})]})]})})]})}export{Fe as component};
