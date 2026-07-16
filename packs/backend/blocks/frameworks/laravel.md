## Laravel-Specific Rules

### Project Structure & Conventions

- Follow the Laravel convention: controllers, models, and services live in `app/`; business logic belongs in `app/Services/` or `app/Actions/`
- Use Actions (single-class invokable objects) for complex use cases: `app/Actions/Orders/PlaceOrderAction.php`
- Use Form Requests for all input validation — never validate in controllers manually
- Group routes by domain in separate route files: `routes/api/orders.php`, `routes/api/users.php`
- Bind interfaces to implementations in `AppServiceProvider` — never `new` a service inside a controller

### Eloquent & Database

- Use Eloquent relationships over raw joins for readability; use query builder raw only when needed for performance
- Always eager load relationships for list endpoints: `User::with(['posts', 'profile'])->paginate()`
- Never use `User::all()` in production — always paginate or add a `LIMIT`
- Use `firstOrFail()` and `findOrFail()` instead of `find()` followed by a manual 404 check
- Define `$fillable` on every model — never use `$guarded = []` in production
- Use model factories for all test data — never seed production data manually in tests
- Add database indexes in migrations, not as an afterthought: `$table->index(['user_id', 'created_at'])`
- Use Eloquent's `scopeActive()`, `scopeByUser()`, etc. for reusable query constraints

### Migrations & Schema

- Every migration must have a complete `down()` method that reverses the `up()` method
- Never modify existing migrations — always create a new migration for schema changes
- Use `after()` to position new columns logically: `$table->string('phone')->after('email')->nullable()`
- Use Laravel's built-in column types: `timestamps()`, `softDeletes()`, `foreignId()->constrained()`
- Add foreign key constraints at the database level via migrations, not only in Eloquent

### Authentication & Authorization

- Use Laravel Sanctum for SPA/token auth; use Passport only for full OAuth2 server needs
- Use Laravel's built-in Gates and Policies for all authorization logic — never check roles inline in controllers
- Register all policies in `AuthServiceProvider::policies()`
- Use `authorize()` in controllers or `$this->authorize()` — never skip authorization checks
- Revoke all tokens on password change: `$user->tokens()->delete()`
- Rate limit authentication routes with `RateLimiter::for()` in `RouteServiceProvider`

### API Resources

- Always use API Resources (`JsonResource`) to transform Eloquent models for API responses — never expose raw models
- Use `ResourceCollection` for lists; define `$wrap = 'data'` consistently
- Include pagination meta via `ResourceCollection`'s default pagination wrapping
- Never return raw arrays from controllers — always use a Resource or a Response facade

```php
// Bad
return response()->json($user->toArray());

// Good
return new UserResource($user);
```

### Queues & Jobs

- Dispatch all non-critical work to queues: emails, notifications, webhooks, PDF generation
- Use `implements ShouldQueue` on all jobs that can tolerate async processing
- Set `$tries = 3` and `$backoff = [10, 60, 180]` (seconds) on all queue jobs
- Implement `failed()` method on every job to handle and log permanent failures
- Use `ShouldBeUnique` for jobs that must not overlap (e.g., invoice generation per order)
- Separate queues by priority: `high`, `default`, `low` — route jobs explicitly

### Events & Listeners

- Use Events + Listeners for cross-domain side effects — never call another service directly from a service
- Dispatch events after a successful database transaction, not inside it
- Use `ShouldQueue` on Listeners for non-critical side effects (sending emails, logging, webhooks)
- Name events in past tense: `OrderPlaced`, `UserRegistered`, `PaymentFailed`

### Validation

- Use Form Requests for every controller action that receives input — never `$request->validate()` inline in complex actions
- Return 422 for validation failures (Laravel default) — never 400 for field-level errors
- Use custom `messages()` and `attributes()` in Form Requests for user-friendly error messages
- Add authorization logic in `authorize()` method of Form Request — not in the controller

### Configuration & Environment

- Never hardcode values that differ between environments — use `config()` and `.env`
- Always define a `config/` file for each domain-specific config group
- Cache config in production: `php artisan config:cache` and `route:cache`
- Validate required environment variables at startup — use `env()` with no default for required vars so they throw immediately
- Never call `env()` outside of `config/` files — use `config('app.key')` instead

### Testing

- Write feature tests for every API endpoint — test the full HTTP stack, not just units
- Use `RefreshDatabase` or `DatabaseTransactions` trait in all tests that touch the database
- Use `actingAs()` for authenticated endpoint tests — never bypass auth middleware
- Use `assertStatus()`, `assertJsonStructure()`, and `assertJsonFragment()` over raw assertions
- Use HTTP faking (`Http::fake()`) for all external HTTP calls in tests
- Mock queued jobs with `Queue::fake()` — assert jobs were dispatched, not that they ran

### Performance

- Enable `php artisan optimize` (route, config, view cache) in production deployment
- Use Laravel's built-in rate limiting middleware on all public and auth endpoints
- Use `whenLoaded()` in API Resources to avoid loading relationships that haven't been eager loaded
- Defer expensive operations with `dispatch()->afterResponse()` for fire-and-forget tasks after the response is sent
- Use `chunk()` or `lazy()` for batch processing large datasets — never `get()` on millions of rows

### Security

- Always use CSRF protection on web routes — disable only for stateless API routes under `/api`
- Use `$table->string('password')` minimum of 60 chars; use `Hash::make()` — never `md5()` or plain text
- Validate file uploads: allowed MIME types, max size, store in non-public disk by default
- Use signed URLs for temporary file access: `Storage::temporaryUrl()` or `URL::signedRoute()`
- Run `php artisan key:generate` once and rotate `APP_KEY` only as a planned security event
