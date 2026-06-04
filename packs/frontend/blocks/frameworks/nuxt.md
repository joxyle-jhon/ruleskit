## Nuxt Specific Rules

- Use <NuxtImg> or <NuxtPicture> instead of raw <img>
- Use useLazyFetch and useLazyAsyncData for non-critical data
- Enable Nuxt's payload extraction to avoid re-fetching on hydration
- Use definePageMeta({ ssr: false }) only when truly necessary
- Lazy-load heavy components: const MyComp = defineAsyncComponent(...)
- Avoid importing globally in plugins — use route-level code splitting
- Enable Brotli compression in the Nitro server config
- Use useHead for preload and prefetch hints per page
