## Error Handling Rules

### Core Philosophy

- Errors are first-class citizens — design your error model before you design your happy path
- Every error must be caught, categorized, logged, and returned in a consistent shape
- Never let an unhandled exception reach the user — always have a global error boundary
- Distinguish between operational errors (expected, recoverable) and programmer errors (bugs, unexpected)

### Structured Error Responses

All API error responses must use this consistent shape:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "One or more fields are invalid.",
    "fields": {
      "email": "must be a valid email address",
      "password": "must be at least 8 characters"
    },
    "request_id": "req_01J4KX9Z2MWV..."
  }
}
```

- `code` — machine-readable constant, uppercase with underscores
- `message` — human-readable, safe to show to the user, no internal details
- `fields` — only on validation errors; maps field name to error message
- `request_id` — always include for every error so it can be traced in logs

### Error Categories & Codes

Define a finite set of error codes — never use arbitrary strings:

- `VALIDATION_FAILED` — input did not pass validation (422)
- `AUTHENTICATION_REQUIRED` — no or invalid auth token (401)
- `PERMISSION_DENIED` — authenticated but not authorized (403)
- `RESOURCE_NOT_FOUND` — entity does not exist (404)
- `CONFLICT` — state conflict such as duplicate email (409)
- `RATE_LIMITED` — too many requests (429)
- `INTERNAL_ERROR` — unexpected server error (500)
- `SERVICE_UNAVAILABLE` — downstream dependency is down (503)

### Validation Errors

- Validate all fields and return all errors at once — not one at a time
- Distinguish between missing fields (`required`) and wrong format (`invalid_format`)
- Never leak schema structure in error messages — say "Email is invalid" not "Column email failed NOT NULL constraint"
- Sanitize all user-supplied data before using it in error messages

### Logging

- Log all 5xx errors with: timestamp, request_id, user_id (if auth), route, method, error message, and stack trace
- Log 4xx errors at `warn` level — do not alert on them, but retain for audit
- Never log sensitive data: passwords, tokens, credit card numbers, PII
- Use structured logging (JSON format) — never concatenated strings
- Include a `request_id` in every log line — generated at the start of each request

```json
{
  "level": "error",
  "timestamp": "2026-07-16T12:00:00Z",
  "request_id": "req_01J4KX9Z2MWV",
  "user_id": "usr_01J4KX",
  "method": "POST",
  "path": "/api/v1/orders",
  "status": 500,
  "error": "Cannot read property 'id' of undefined",
  "stack": "..."
}
```

### Global Error Handler

- Register a single global error handler — never scatter try/catch without re-throwing to it
- The global handler must: log the error, determine the correct HTTP status, return a safe response
- In production: never expose `stack`, internal file paths, or raw database errors in API responses
- In development: include `stack` and `debug` fields in error responses for faster debugging

### Retries & Circuit Breakers

- Wrap all external service calls (HTTP, queues, third-party APIs) in a circuit breaker
- Retry only on transient errors (`503`, `429`, network timeout) — never retry on `400`, `401`, `403`, `404`
- Use exponential backoff with jitter for retries: `delay = min(cap, base * 2^attempt) + random(0, base)`
- Maximum 3 retry attempts before failing and logging `CIRCUIT_OPEN`
- Circuit breaker states: closed (normal) → open (failing fast) → half-open (testing recovery)

### Graceful Degradation

- Identify which dependencies are critical vs. non-critical
- For non-critical failures (analytics, recommendations, notifications): log, continue, return partial data
- For critical failures (database, auth service): fail fast and return a clear `503 Service Unavailable`
- Always set timeouts on all outbound HTTP and database calls — default max: 5 seconds
