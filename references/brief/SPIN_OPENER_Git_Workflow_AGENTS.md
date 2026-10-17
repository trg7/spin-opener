# Git workflow for SPIN OPENER agents

Inspect `git status`, current branch and recent history before edits. Preserve all pre-existing user changes. Never discard uncommitted work.

- Commit a verified baseline after Stage 0 and focused, independently working milestones within each approved stage.
- Before significant experiments, preserve a known-good checkpoint. Never commit broken work as a supposedly verified checkpoint.
- Before commits, inspect diffs and run relevant lint, typecheck, tests and build. For documentation-only stages, validate documentation and paths.
- Stage relevant files explicitly, not blindly with `git add -A`. Never commit secrets, `.env*`, dependencies, build artifacts or unnecessary large images.
- Use Conventional Commits, e.g. `feat(hero): implement responsive hero`.
- Update relevant decision, asset and animation documentation alongside material changes.
- Local commits are allowed within an approved stage. Do not push, deploy, merge, force push, rebase shared branches or delete branches without user approval.
- After each stage, provide commit hashes, changed files, checks run, screenshot results if available, and unresolved issues. Stop for user review.
