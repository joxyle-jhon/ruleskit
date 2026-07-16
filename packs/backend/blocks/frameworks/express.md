## Express.js-Specific Rules

### Project Structure

- Use a layered folder structure: `src/routes/`, `src/controllers/`, `src/services/`, `src/repositories/`, `src/middleware/`
- Group by feature domain, not by technical type: `src/users/`, `src/orders/`, `src/billing/`
- Keep `app.ts` / `app.js` for Express app setup only; use `server.ts` for HTTP server startup and graceful shutdown
- Register routes from a central `src/routes/index.ts` — never scatter `app.use()` across the codebase

### Routing & Controllers

- Use `express.Router()` to scope routes — never mount everything directly on `app`
- Keep controllers thin: parse `req`, call service, return `res.json()` — no business logic in controllers
- Always use `async/await` with proper error propagation — wrap async route handlers or use a global async wrapper:

```typescript
const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

### Middleware

- Apply middleware in this order: security headers → CORS → request ID → body parser → authentication → logging → routes → error handler
- Use `helmet` for security headers on every Express app
- Use `express-rate-limit` on all public and authentication routes
- Always add `requestId` middleware early in the stack — attach a UUID to `req.id` for tracing
- The global error handler must be the **last** `app.use()` registered and must have signature `(err, req, res, next)`

### Input Validation

- Use `zod` or `joi` for schema-based request validation — never trust `req.body` directly
- Validate at the middleware layer before the controller receives the data:

```typescript
const validateBody = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(422).json({ error: result.error.flatten() });
  req.body = result.data;
  next();
};
```

### Error Handling

- Centralize all error handling in a single error middleware registered last
- Create a typed `AppError` class that carries `statusCode`, `code`, and `message`
- In development, include `stack` in error response; in production, never expose it

### TypeScript

- Enable strict mode: `"strict": true` in `tsconfig.json`
- Type all `req.body`, `req.params`, and `req.query` — use interface augmentation or typed schema parsing
- Never use `any` — use `unknown` and narrow with type guards

### Testing

- Use `supertest` for HTTP integration tests — test the full Express app, including middleware
- Separate unit tests (services, pure functions) from integration tests (routes + DB)
- Use an in-memory SQLite or a Docker test database — never run tests against a shared environment database
