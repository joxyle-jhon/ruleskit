# Nuxt Full-Stack Best Practices

- **Server-Side Rendering (SSR)**: Leverage Nuxt SSR and hybrid rendering to maximize SEO performance and initial load speeds.
- **Server Routes**: Implement full-stack logic using Nuxt Server Engine (Nitro) under the `/server/api/` or `/server/routes/` directories.
- **Data Fetching**: Use Nuxt-native composables (`useFetch`, `useAsyncData`) to fetch server side during page render and client side during hydration.
- **State Management**: Use `useState` for sharing global reactive state across the client and server side without state leaking between requests.
