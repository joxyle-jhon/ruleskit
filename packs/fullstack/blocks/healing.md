# AI Self-Healing Workflow

- **Automatic Violation Healing**:
  - When linting or formatting fails during pre-commit hooks, run an automated script (e.g. `.devkit/heal.js`) that uses the Anthropic API (or similar) to automatically fix common, non-disruptive lint issues.
  - Verification: The healing agent must run the linter/formatter on the modified file to verify the violation was resolved before writing the final changes to the workspace.
  - Scope: Never auto-heal complex logic changes; restrict healing to formatting, styling, and simple linter rule violations.
