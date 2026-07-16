# SvelteKit Full-Stack Best Practices

- **Load Functions**: Fetch data using server-only load functions (`+page.server.ts` or `+layout.server.ts`) to avoid leaking secrets and tokens to the client.
- **Form Actions**: Leverage SvelteKit Form Actions (`+page.server.ts` exports) to perform form data mutation and server-side validation.
- **API Endpoints**: Use `+server.ts` files to expose RESTful endpoints and handle customs HTTP methods (`GET`, `POST`, etc.) programmatically.
- **Page Transitions**: Enhance page hydration and transitions with Svelte stores and progressive enhancement via `use:enhance`.
