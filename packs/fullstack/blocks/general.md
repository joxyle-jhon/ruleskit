# General Principles

- Prioritize readability, maintainability, and simplicity.
- Write code that is easy to understand before optimizing prematurely.
- Follow the DRY (Don't Repeat Yourself) principle.
- Follow the KISS (Keep It Simple, Stupid) principle.
- Prefer explicit code over clever code.
- Keep functions and classes focused on a single responsibility.
- Refactor duplicated logic into reusable modules.
- Avoid unnecessary abstractions.
- Make the smallest safe change necessary to solve the problem.

# Code Quality

- Use meaningful names for variables, functions, classes, and files.
- Remove unused code, imports, variables, and dependencies.
- Avoid deeply nested conditionals by using early returns.
- Prefer composition over inheritance.
- Follow SOLID principles where appropriate.
- Keep functions small and focused.
- Keep files organized and cohesive.
- Never leave commented-out code in production.
- Avoid magic numbers and unexplained constants.
- Extract reusable logic instead of copying code.

# Project Architecture

- Keep UI, business logic, and data access separated.
- Keep controllers/routes thin.
- Place business logic inside services.
- Centralize shared utilities.
- Follow a consistent folder structure.
- Avoid circular dependencies.
- Prefer dependency injection where appropriate.
- Favor reusable components over duplicated implementations.

# Environment & Configuration

- Never hardcode:
  - Secrets
  - API keys
  - Passwords
  - Tokens
  - Database credentials
  - Environment-specific values
- Store configuration inside `.env` files.
- Access configuration only through environment interfaces.
- Provide sensible defaults where appropriate.
- Validate required environment variables during application startup.

# TypeScript Standards

- Enable strict mode.
- Never use `any` unless absolutely unavoidable.
- Prefer `unknown` over `any`.
- Prefer interfaces for object contracts.
- Prefer type aliases for unions and utility types.
- Export reusable types instead of duplicating definitions.
- Avoid unnecessary type assertions.
- Prefer readonly types where mutation isn't intended.
- Keep shared types synchronized across frontend and backend.

# Testing

- Write unit tests for business logic.
- Write integration tests for APIs.
- Test critical authentication flows.
- Add regression tests when fixing bugs.
- Keep tests deterministic.
- Never modify production behavior solely to satisfy tests.
- Do not remove failing tests without understanding the cause.

# Documentation

- Keep README up to date.
- Document public APIs.
- Document environment variables.
- Document setup instructions.
- Remove obsolete documentation.
- Keep examples synchronized with the codebase.

# Git & Version Control

- Never modify unrelated files.
- Preserve existing formatting.
- Keep commits focused.
- Never rewrite project history.
- Never remove functionality unless requested.
- Avoid unnecessary file renames.
- Make minimal, safe changes.

# AI Coding Behavior

When generating or modifying code:

- Follow the existing project architecture.
- Follow existing coding conventions.
- Reuse existing utilities before creating new ones.
- Do not introduce new dependencies unless clearly justified.
- Do not rename public APIs unless requested.
- Do not perform speculative refactors.
- Ask for clarification when requirements are ambiguous.
- Preserve backward compatibility whenever possible.

# Production Readiness

Before considering work complete:

- Remove debugging statements.
- Remove temporary code.
- Remove unused imports.
- Remove unused variables.
- Ensure formatting passes.
- Ensure linting passes.
- Ensure tests pass.
- Ensure builds succeed.
- Verify no secrets are committed.
- Guard unfinished features behind feature flags.

# Communication & Serialization

- Prefer JSON for APIs.
- Use camelCase for JavaScript and TypeScript.
- Use snake_case or kebab-case where platform conventions require it.
- Keep API responses consistent.
- Share schemas or types between frontend and backend whenever possible.

# Audit Response Format

When reviewing code:

- Lead with the highest-impact issues.
- Tag findings using:

```
[HTML]
[CSS]
[JS]
[TS]
[API]
[DB]
[SECURITY]
[PERFORMANCE]
[A11Y]
[NETWORK]
[VITALS]
[DESIGN]
```

- Use severity levels:

```
🔴 High
🟡 Medium
🟢 Low
```

- Always provide a concrete code fix.
- Keep comments concise.
- Prefer top-of-function documentation over inline comments.
- Explain why an issue matters, not just what is wrong.
