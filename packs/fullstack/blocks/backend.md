# API Standards

- Follow RESTful conventions.
- Use plural resource names.

Examples:

```
GET    /api/v1/users
POST   /api/v1/users
PUT    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

- Use appropriate HTTP methods.
- Return proper HTTP status codes.
- Keep response formats consistent.
- Include machine-readable error codes.
- Version breaking API changes.
- Support pagination.
- Support filtering.
- Support sorting.
- Support searching through query parameters.
- Keep endpoints resource-oriented.

# Backend Excellence

- Validate all incoming requests.
- Sanitize all user input.
- Never trust client-side validation.
- Keep business logic outside controllers.
- Use middleware for cross-cutting concerns.
- Centralize error handling.
- Log unexpected failures.
- Avoid duplicated validation logic.
- Use dependency injection where appropriate.

# Security

- Always use HTTPS.
- Hash passwords using Argon2 or bcrypt.
- Never store plaintext passwords.
- Validate authorization on every protected endpoint.
- Implement authentication using JWT, OAuth, or secure sessions.
- Configure CORS correctly.
- Protect against SQL Injection.
- Protect against XSS.
- Protect against CSRF when using cookies.
- Protect against command injection.
- Use parameterized queries.
- Escape HTML output where necessary.
- Rotate secrets regularly.
- Implement rate limiting for authentication endpoints.
- Never expose stack traces in production.
- Never expose sensitive internal information.

# Error Handling

- Never swallow exceptions.
- Handle expected errors gracefully.
- Log unexpected errors.
- Return user-friendly messages.
- Return structured error responses.
- Include request IDs for easier debugging.
- Do not expose implementation details.

Example:

```json
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "User does not exist."
  }
}
```

# Logging

- Use structured logging.
- Include timestamps.
- Include request identifiers.
- Include severity levels.
- Never log:
  - Passwords
  - Tokens
  - Credit card information
  - Personally identifiable information (PII)
  - Secrets
