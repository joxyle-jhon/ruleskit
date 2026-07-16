# General Full-Stack Standards

- **Environment Variables**: Never hardcode secrets, API keys, credentials, or environment-specific values. Use `.env` files and retrieve them via system environment interfaces (e.g. `process.env`, `getenv()`).
- **Communication & Serialization**:
  - Prefer JSON for API payloads and configuration files.
  - Follow camelCase for JS/TS keys and snake_case or kebab-case for system configuration parameters.
- **Logging standards**:
  - Implement structured logging for server side (e.g., Winston, Pino, or standard framework loggers).
  - Never log sensitive user data (passwords, credit cards, PII) in plain text.
- **Type Safety**:
  - Share typescript types or API schemas between frontend and backend when possible (e.g., using OpenAPI spec, tRPC, or mono-repo shared types).
