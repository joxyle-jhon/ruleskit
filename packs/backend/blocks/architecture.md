## Code Architecture Rules

### Layered Architecture

Structure every backend service in clear, separated layers:

```
HTTP Layer       → Controllers / Route Handlers
Business Layer   → Services / Use Cases
Data Layer       → Repositories / Models
Infrastructure   → External APIs, Queue, Cache, Mailer
```

- Controllers/handlers do only: parse request, call service, return response — no business logic
- Services/use-cases contain all business rules — no HTTP, no raw SQL
- Repositories abstract all database access — services never call the ORM/query builder directly
- Infrastructure adapters are behind interfaces — never call a third-party SDK directly from a service

### Single Responsibility

- Each class, function, and module must have exactly one reason to change
- If a service method does more than one conceptual operation, split it
- Avoid "God classes" — services with 15+ methods likely need to be split by sub-domain
- Keep functions short: < 20 lines for pure logic, < 40 lines for orchestration; extract if exceeded

### Dependency Injection

- Never instantiate dependencies with `new` inside a class — inject them through the constructor
- Use a DI container (built-in framework IoC or a lightweight container) — never rely on global singletons
- Code against interfaces, not implementations — swap implementations without changing business logic

### Backend Code Comment Rules

- Apply the same comment philosophy as frontend:
  - Comments explain **WHY** — never WHAT or HOW
  - Write self-documenting code first; refactor until it doesn't need a comment
  - Only WHY comments, file-level headers, public function docblocks, and TODO/FIXME markers are allowed
- PHP/Python/TypeScript docblocks only on public methods, constructors, and exported functions
- TODO/FIXME markers must include owner and ticket: `// TODO(@dev): replace with event bus — see JIRA-88`

### Naming Conventions

- Use intention-revealing names: `findActiveSubscriptionsByUser()` not `getStuff()`
- Boolean variables and methods must read as questions: `isExpired()`, `hasPermission()`, `canDelete()`
- Avoid abbreviations: `userRepository` not `usrRepo`; `calculateOrderTotal()` not `calcOrdTot()`
- Constants in `UPPER_SNAKE_CASE`: `MAX_LOGIN_ATTEMPTS`, `DEFAULT_PAGE_SIZE`
- Events in past tense: `OrderPlaced`, `UserDeactivated`, `PaymentFailed`
- Commands/DTOs in imperative: `PlaceOrder`, `DeactivateUser`, `ProcessPayment`

### Module Boundaries

- Group code by feature/domain, not by technical type:
  - **Good**: `src/orders/`, `src/users/`, `src/billing/`
  - **Bad**: `src/controllers/`, `src/models/`, `src/services/`
- Cross-domain access must go through a public interface — never reach into another domain's internals
- Shared code lives in a `shared/` or `common/` module — not inside a feature module
- Circular dependencies between modules are a design smell — resolve with events or interfaces

### Immutability & Side Effects

- Prefer immutable data structures and pure functions for transformations
- Clearly separate pure computation from side effects (DB writes, HTTP calls, emails)
- Functions with side effects must be explicitly named as such: `sendWelcomeEmail()` not `processUser()`
- Make side effects testable by injecting their dependencies
