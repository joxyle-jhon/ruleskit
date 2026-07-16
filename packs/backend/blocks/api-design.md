## API Design Rules

### RESTful Resource Naming

- Use plural nouns for resource collections: `/users`, `/orders`, `/products`
- Use singular noun for a single resource: `/users/{id}`, `/orders/{id}`
- Nest sub-resources only one level deep: `/users/{id}/posts` — not `/users/{id}/posts/{postId}/comments/{id}`
- Keep URLs lowercase, hyphen-separated: `/user-profiles` not `/userProfiles` or `/user_profiles`
- Never use verbs in endpoints — the HTTP method is the verb: `DELETE /users/{id}` not `POST /users/{id}/delete`
- Version the API in the URL prefix: `/api/v1/users` — never version per-resource

### HTTP Method Semantics

- `GET` — read only, must be idempotent, never mutate state
- `POST` — create a new resource, returns `201 Created` with `Location` header
- `PUT` — full replacement of a resource, must be idempotent
- `PATCH` — partial update of a resource, only send changed fields
- `DELETE` — remove a resource, returns `204 No Content` (or `200` with a body)
- Never use `GET` with a request body — use query params for filtering

### HTTP Status Codes

- `200 OK` — successful GET, PATCH, or DELETE with body
- `201 Created` — successful POST; include `Location: /resource/{id}` header
- `204 No Content` — successful DELETE or PATCH with no response body
- `400 Bad Request` — validation failure; always return structured error body
- `401 Unauthorized` — missing or invalid authentication token
- `403 Forbidden` — authenticated but not authorized for this resource
- `404 Not Found` — resource does not exist; never leak whether it existed
- `409 Conflict` — state conflict (e.g., duplicate email, concurrent edit)
- `422 Unprocessable Entity` — semantic validation failure (use over 400 for field-level errors)
- `429 Too Many Requests` — rate limit hit; include `Retry-After` header
- `500 Internal Server Error` — unexpected server-side failure; never expose stack traces

### Request & Response Shape

- Always respond with JSON; set `Content-Type: application/json`
- Wrap collections in a top-level key: `{ "data": [...], "meta": { "total": 100, "page": 1 } }`
- Wrap single resources: `{ "data": { "id": 1, ... } }`
- Wrap errors: `{ "error": { "code": "VALIDATION_FAILED", "message": "...", "fields": { "email": "required" } } }`
- Use consistent date format: ISO 8601 UTC — `2026-07-16T12:00:00Z`
- Use camelCase for JSON keys (or snake_case — pick one and enforce it everywhere)
- Never return `null` arrays — return an empty array `[]`
- Pagination must always include: `page`, `per_page`, `total`, `total_pages`

### Idempotency

- All `GET`, `PUT`, `DELETE` operations must be idempotent
- For `POST` operations that must be idempotent (payments, webhooks), require an `Idempotency-Key` header
- Store idempotency keys for at least 24 hours
- Return the same response for duplicate requests with the same key

### API Versioning

- Version in URL path: `/api/v1/`, `/api/v2/`
- Never break existing endpoints — add new versions, deprecate old ones
- Set `Deprecation` and `Sunset` headers on deprecated endpoints
- Maintain deprecated versions for a minimum of 6 months
- Document all breaking changes in a migration guide

### CORS

- Explicitly list allowed origins — never use wildcard `*` in production with credentials
- Set `Access-Control-Allow-Methods` to only the methods actually needed
- Set `Access-Control-Max-Age` to reduce preflight requests (e.g., `86400`)
- Allow credentials only for trusted origins: `Access-Control-Allow-Credentials: true`
