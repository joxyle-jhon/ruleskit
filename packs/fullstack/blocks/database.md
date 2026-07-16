# Database

- Prefer normalized schemas.
- Add indexes for frequently queried columns.
- Avoid N+1 queries.
- Use eager loading when appropriate.
- Use transactions for related write operations.
- Never use `SELECT *` in production queries.
- Prefer migrations over manual schema edits.
- Add foreign key constraints where appropriate.
- Optimize expensive queries.
- Soft delete only when business requirements justify it.

# Caching

- Cache expensive queries.
- Cache frequently requested static data.
- Use Redis or Memcached where appropriate.
- Configure sensible TTL values.
- Invalidate caches when underlying data changes.
- Avoid stale cache issues.
