# AI Self-Healing Workflow

When automated linting or formatting fails:

- Run the automated healing workflow.
- Restrict healing to:
  - Formatting
  - Style fixes
  - Safe lint corrections
- Never modify application logic automatically.
- Verify the project passes linting after healing.
- Do not overwrite user changes.
