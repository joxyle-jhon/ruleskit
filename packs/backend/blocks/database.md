## Database Rules

### Schema Design

- Every table must have a primary key — prefer `UUID v4` or `ULID` over auto-increment integers for public-facing IDs
- Always include audit columns: `created_at`, `updated_at` on every table; add `deleted_at` when soft-delete is needed
- Use soft-delete (`deleted_at` nullable timestamp) instead of hard-delete for all user-generated content
- Name tables in `snake_case`, plural nouns: `user_profiles`, `order_items`
- Name columns in `snake_case`: `first_name`, `expires_at`, `is_active`
- Use explicit column types — no `TEXT` for structured data, no `JSON` for queryable fields
- Set `NOT NULL` by default — only allow `NULL` when the absence of a value has distinct semantic meaning
- Define foreign key constraints at the database level — never rely on application-level enforcement only
- Add indexes on all foreign keys and all columns used in `WHERE`, `ORDER BY`, or `JOIN` clauses
- Never use `SELECT *` in application code — always select explicit columns

### Migrations

- Every schema change must be a numbered, reversible migration file — never alter the schema manually
- Migrations must be deterministic — running the same migration twice must be a no-op or idempotent
- Include both `up()` and `down()` (rollback) methods in every migration
- Never modify or delete existing migration files — only add new ones
- Test migrations on a copy of production data before deploying to production
- Never rename columns or tables directly in a migration — use a multi-step approach: add new column → copy data → update code → drop old column
- Zero-downtime migrations: add columns as nullable first, then backfill, then add constraints

### Query Performance

- Use `EXPLAIN ANALYZE` (PostgreSQL) or `EXPLAIN` (MySQL) before deploying any complex query
- Avoid N+1 queries — use eager loading, joins, or data loaders in all list endpoints
- Add database indexes before deploying features that filter, sort, or join on new columns
- Paginate all list queries — never return unbounded result sets
- Use cursor-based pagination for large or frequently updated datasets
- Set query timeouts to prevent runaway queries from blocking the database
- Avoid heavy aggregate queries on the main read path — use read replicas or pre-computed materialized views

### Transactions

- Wrap all multi-step operations that must succeed or fail together in a database transaction
- Keep transactions as short as possible — never do I/O (HTTP calls, file ops) inside a transaction
- Use serializable isolation only when strictly necessary — prefer `read committed` for most operations
- Always handle transaction failures explicitly — retry logic for deadlocks must use exponential backoff
- Lock as few rows as possible for as short a time as possible

### Connection Management

- Always use a connection pool — never open a new connection per request
- Set pool size based on database capacity, not application concurrency
- Set `connect_timeout`, `idle_timeout`, and `statement_timeout` on the pool
- Close connections gracefully on application shutdown — drain the pool before exiting
- Monitor pool utilization — alert when pool is exhausted
