# Database & Caching Hygiene

- **Database Hygiene**:
  - Write optimized, performant database queries. Avoid N+1 query problems by using eager loading.
  - Implement indexes on columns that are frequently filtered or used in JOIN clauses.
  - Use database transactions when performing multiple write operations that must succeed or fail together.
- **Caching Strategies**:
  - Implement Redis or Memcached caching for heavy queries or static database configurations.
  - Set appropriate TTL (Time To Live) and cache eviction policies to avoid stale data.
