## Security Rules

### Authentication

- Use short-lived access tokens (15 minutes) and long-lived refresh tokens (7–30 days)
- Store refresh tokens in `httpOnly`, `Secure`, `SameSite=Strict` cookies — never in `localStorage`
- Hash all passwords with bcrypt, argon2id, or scrypt — never MD5, SHA-1, or plain SHA-256
- Minimum bcrypt cost factor: 12 in production; never store plaintext passwords or reversible hashes
- Always rate-limit login endpoints: max 5 attempts per IP per 15 minutes
- Implement account lockout after repeated failures with exponential backoff
- Invalidate all active sessions on password change or security-critical account update
- Use secure, random token generation — never timestamp-based or sequential IDs for tokens

### Authorization

- Apply principle of least privilege — every role gets only the permissions it needs
- Enforce authorization at the service/use-case layer, not just at the route/controller level
- Always verify resource ownership before returning or mutating data: check `user_id === auth.id`
- Use policy/ability objects (RBAC or ABAC) — never inline `if (user.role === 'admin')` in controllers
- Deny by default — require explicit permission grants, not blocklist logic
- Log all authorization failures with user ID, resource, and action for audit trail

### Input Validation & Sanitization

- Validate all input at the entry point (request/route level) before it reaches business logic
- Use an allowlist approach — explicitly define what is valid, reject everything else
- Never trust user input in SQL, shell commands, file paths, or HTML output — use parameterized queries always
- Validate content-type headers before parsing request bodies
- Set maximum length limits on all string inputs; reject oversized payloads at the server level
- Strip HTML from all user-supplied text fields unless rich text is explicitly required
- Never pass user input to `eval()`, `exec()`, or dynamic code execution functions

### SQL Injection Prevention

- Always use parameterized queries or prepared statements — never string-concatenate SQL
- Use an ORM with query builder — raw SQL only when necessary and always parameterized
- Limit database user permissions to only required operations (no DROP, no schema changes from app user)
- Never expose raw database error messages to API responses — catch and translate all DB exceptions

### Secrets Management

- Never commit secrets to version control — no API keys, passwords, connection strings in code
- Use environment variables for all secrets; validate their presence at application startup
- Use a secrets manager (Vault, AWS Secrets Manager, Doppler) for production environments
- Rotate all secrets regularly; have a documented emergency rotation procedure
- Never log secrets, tokens, or passwords — scrub sensitive fields from all logs

### Sensitive Data Exposure

- Never return more data than needed — always select only required fields, never `SELECT *` to API responses
- Mask or omit sensitive fields in API responses: passwords, full card numbers, SSN, tokens
- Use HTTPS-only in production — enforce with HSTS header: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- Encrypt sensitive data at rest using AES-256 or equivalent
- Never store sensitive data in URL query params — use POST body or headers

### CSRF Protection

- Use CSRF tokens for all state-mutating requests from browser clients (non-API cookie-auth flows)
- Double-submit cookie pattern or synchronizer token pattern — use your framework's built-in CSRF protection
- For pure API (token-based) endpoints, verify `Content-Type: application/json` to prevent CSRF

### Rate Limiting & Abuse Prevention

- Apply rate limiting at the API gateway or middleware level — not just per-route
- Use sliding window or token bucket algorithms
- Return `429 Too Many Requests` with `Retry-After` and `X-RateLimit-*` headers
- Apply stricter limits to authentication, password reset, and OTP endpoints

### Security Headers

Set these HTTP response headers on every response:

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

- Never use `X-Powered-By` — disable or remove it
- Never leak server version information in headers
