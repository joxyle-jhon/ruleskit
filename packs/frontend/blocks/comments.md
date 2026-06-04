## Code Comment Rules

### Core Philosophy

- Code is the primary medium of communication — comments are the last resort
- Write self-documenting code first: if code needs a comment to be understood, refactor it until it doesn't
- Comments explain WHY — never WHAT or HOW
- If a comment restates what the code already says, delete it

### What comments are allowed

- File-level header comment only (top of file) — one block, describes the module's purpose, not its implementation
- WHY comments — explain a non-obvious decision, workaround, or constraint
- TODO / FIXME markers — must include owner and ticket reference, e.g. `// TODO(@joxyle): replace with API call — see JIRA-42`
- Public API / function JSDoc — only for exported functions and components, describing params, return value, and side effects if non-obvious
- Regex or complex algorithm explanation — one line above, not inline

### What comments are NOT allowed

- Inline comments explaining what a line does
  - **BAD**: `total += item // add item to total`
  - **GOOD**: `total += item`
- Commented-out code — use version control, not comments
- Journal/changelog comments — use git history
- Redundant JSDoc that mirrors the function signature
  - **BAD**: `/** @param {string} name — the name */`
  - **GOOD**: omit it if the param name is self-explanatory
- Section divider comments inside a function
  - **BAD**: `// ---- validation ----`
  - **GOOD**: extract into a named function: `validateInput()`
- Noise comments: "Default constructor", "Returns the day of the month"

### Placement rules

- File header comment: top of file only, before all imports
- JSDoc: directly above the exported function or component, nowhere else
- WHY comment: single line directly above the relevant code — never inline
- No comments inside loops, conditionals, or JSX/template markup
- No trailing inline comments at the end of a line

### Self-documenting code rules (reduces need for comments)

- Use intention-revealing names: `isUserLoggedIn` not `x`, `calculateTax` not `fn`
- No magic numbers — define named constants: `MAX_RETRIES = 3` not `3`
- Keep functions short and single-purpose — if it needs a comment, split it
- Avoid abbreviations in variable and function names
- Boolean variables must read as questions: `isLoading`, `hasError`, `canSubmit`
