## Performance Rules

### Response Time Targets

- API endpoints (read): p50 < 50ms, p95 < 200ms, p99 < 500ms
- API endpoints (write): p50 < 100ms, p95 < 400ms, p99 < 1000ms
- Batch/export endpoints: < 10s with streaming or background job
- Any endpoint consistently exceeding p95 > 500ms must be investigated and optimized before shipping

### Database Performance

- Detect and eliminate all N+1 query patterns before a feature ships — use query logging in development
- Always paginate: default `per_page=20`, max `per_page=100`, never return unbounded results
- Use `LIMIT` on all list queries, even when pagination is expected to cover it
- Profile slow queries weekly using the slow query log (MySQL: `slow_query_log`, PG: `pg_stat_statements`)
- Use read replicas to distribute read load — route all reporting/analytics queries to the replica
- Use database indexes strategically — unused indexes degrade write performance, audit them quarterly

### Asynchronous Processing

- Offload any operation taking > 500ms to a background job or queue (email, PDF generation, webhooks, image processing)
- Use job queues (Redis Queue, BullMQ, Laravel Queues, Sidekiq) for all async work
- Implement dead letter queues for failed jobs — never silently discard failures
- Set job timeouts — a job that runs indefinitely is a bug
- Design jobs to be idempotent — retrying a failed job must not cause duplicate effects
- Use priority queues for user-facing vs. background work

### Payload Optimization

- Compress all API responses: enable gzip or Brotli at the reverse proxy level
- Implement sparse fieldsets: allow clients to request only needed fields — `?fields=id,name,email`
- Implement pagination metadata in a `meta` wrapper, not as inline fields in the response body
- Stream large responses instead of buffering them in memory (CSV exports, file downloads)
- Set `Content-Encoding`, `Content-Length`, and `Transfer-Encoding` headers correctly

### Concurrency & Throughput

- Set a maximum request timeout at the server level (e.g., 30 seconds) — never allow infinite waits
- Implement backpressure — queue or reject requests when the server is under overload
- Use horizontal scaling (multiple instances) behind a load balancer rather than vertical scaling alone
- Stateless design: no in-process session state, no local file system dependency — all state in the database or cache
- Use connection pooling for all downstream services: database, Redis, external APIs

### Monitoring & Observability

- Track and alert on: request rate, error rate, and response time (RED method)
- Use distributed tracing (OpenTelemetry, Jaeger) for services with multiple downstream calls
- Set up automated alerts for: p95 latency > 1s, error rate > 1%, CPU > 80%, memory > 85%
- Measure and expose a `/healthz` endpoint: returns `200 OK` when healthy, `503` when degraded
- Keep a performance baseline — run load tests before major releases using k6, Artillery, or Locust
