# Next.js Full-Stack Best Practices

- **Routing & Server Components**: Use React Server Components (RSC) for data fetching to minimize client bundle size. Fetch data directly from databases or backend services in Server Components.
- **Route Handlers**: Use API Route Handlers under `/app/api/` for endpoints consumed by external clients or mobile applications.
- **Server Actions**: Use Server Actions (`'use server'`) for handling form submissions and mutation requests securely without building separate endpoints.
- **Caching**: Leverage Next.js data cache and fetch options (`revalidate`, `tags`) to optimize page speed and data freshness.
