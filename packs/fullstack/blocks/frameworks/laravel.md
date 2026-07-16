# Laravel Full-Stack Best Practices

- **Inertia.js & Blade**: When building full-stack Laravel apps, use Inertia.js (with React or Vue) to merge single-page app UX with server-side routing, or standard Blade templates for simpler layouts.
- **Form Validation**: Always validate requests in Laravel using Form Request classes (`php artisan make:request`) before querying the database.
- **Eloquent ORM**: Prevent N+1 queries by using eager loading via `.with()` on model queries.
- **Queues & Jobs**: Defer time-consuming operations (e.g. sending emails, processing uploads) to background queues.
