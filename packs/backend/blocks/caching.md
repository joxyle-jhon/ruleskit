## Caching Rules

### When to Cache

- Cache read-heavy, infrequently changing data: user profiles, product catalogs, config lookups
- Never cache data that must always be real-time: authentication state, financial balances, inventory counts for purchase
- Cache at the layer closest to the consumer: HTTP cache → application cache → database query cache
- Always define a TTL (time-to-live) — never cache indefinitely without an expiry

### Cache Keys

- Make cache keys deterministic and collision-free: include pack name, version, and all input parameters
- Format: `{namespace}:{version}:{entity}:{id}:{variant}` — e.g., `api:v1:user:123:profile`
- Never use raw user input as a cache key — always hash or sanitize it
- Use consistent serialization for complex query params: sort keys, normalize values before hashing

### HTTP Caching

- Set `Cache-Control` headers on all responses:
  - Static assets: `Cache-Control: public, max-age=31536000, immutable`
  - Authenticated API responses: `Cache-Control: private, no-store`
  - Public, cacheable API responses: `Cache-Control: public, max-age=60, stale-while-revalidate=300`
- Use `ETag` or `Last-Modified` for conditional requests on mutable resources
- Never cache responses containing sensitive or user-specific data with `public` directive
- Set `Vary` header when response differs by `Accept`, `Accept-Encoding`, or `Authorization`

### Application-Level Cache (Redis / Memcached)

- Use Redis as the canonical application cache — prefer Redis over in-memory for multi-instance deployments
- Use Redis Cluster or Sentinel in production — never rely on a single Redis node
- Set a max memory policy: `allkeys-lru` for general cache, `volatile-lru` for TTL-based cache
- Never use Redis as the primary database — it is a cache, not a source of truth
- Serialize cache values to a stable format (JSON or MessagePack) — never store language-specific serializations

### Cache Invalidation

- Prefer TTL-based expiration over manual invalidation for simplicity
- For strong consistency requirements, use write-through cache: update cache and database atomically
- Use cache tags or namespaces to invalidate related keys together: `cache:bust:user:{id}:*`
- On entity update, invalidate all cache keys that contain that entity's data
- Never rely on cache for authorization decisions — always re-validate permissions from the source of truth

### Cache Stampede Prevention

- Use probabilistic early expiration or staggered TTLs to prevent simultaneous regeneration
- Implement cache locking (mutex lock) for expensive cache misses: only one worker regenerates, others wait
- Set a short lock TTL (2–5 seconds) with automatic expiry to prevent deadlocks

### Cache Monitoring

- Track hit rate, miss rate, and eviction rate — alert if hit rate drops below 80%
- Monitor memory usage — alert if cache memory exceeds 80% of capacity
- Log all cache misses for slow or expensive operations
- Set `X-Cache: HIT | MISS` headers on API responses for debugging
