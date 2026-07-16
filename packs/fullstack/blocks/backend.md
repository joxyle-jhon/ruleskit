# Backend Excellence

- **API Design Conventions**:
  - Adhere to RESTful API conventions: use plural nouns for endpoints (e.g. `/api/v1/users`) and correct HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`).
  - Return appropriate HTTP status codes: `200 OK` for success, `201 Created` for resource creation, `400 Bad Request` for validation errors, `401 Unauthorized` for missing auth, `403 Forbidden` for permissions errors, and `404 Not Found`.
- **Security Standards**:
  - Validate and sanitize all inputs to prevent SQL injection, XSS, and command injection.
  - Implement robust authentication (JWT, OAuth, Sessions) and use HTTPS everywhere.
  - Configure CORS (Cross-Origin Resource Sharing) correctly to restrict origins to authorized clients.
- **Error Handling**:
  - Use structured, consistent error response formats.
  - Catch all uncaught exceptions to prevent server crashes.
