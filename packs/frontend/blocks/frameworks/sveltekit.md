## SvelteKit Specific Rules

- Use load() in +page.server.js for SSR data — avoid client-side fetch waterfalls
- Use preload hints via <link rel="preload"> inside <svelte:head>
- Prefer +page.server.js over +page.js when data doesn't need to be reactive
- Use import() for heavy client-only components with {#await}
- Leverage built-in prerendering for static routes (prerender = true)
- Avoid hydration mismatches — keep server and client data consistent
- Use $app/environment browser check before accessing window or document
