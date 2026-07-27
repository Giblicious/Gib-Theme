# Gib Theme agent policy

These instructions apply to every automated or AI-assisted change in this repository.

## Obsidian theme deployment

- Gib Theme installations managed by BRAT must be installed and updated only through BRAT from the public GitHub repository.
- Never copy, replace, patch, or delete `theme.css`, `manifest.json`, or any other theme artifact inside a user's Obsidian vault.
- Never treat a successful local check as permission to deploy its output into a real vault.
- Publishing ends after the tested commit, numeric tag, GitHub release, and release assets are available. Report that BRAT can now update; do not perform BRAT's client-side installation step on the user's behalf.
- If BRAT cannot update or a required root asset is unavailable, stop and report the problem. Do not fall back to a manual installation.
- A manual install is allowed only when the user explicitly requests it in that same turn and confirms the exact target vault.
- Do not restart Obsidian, reload the app, change the active theme, or alter Appearance settings without explicit permission in the current turn.

## User-owned runtime state

- Every real vault and its `.obsidian` directory are user-owned runtime state, not deployment targets or working directories.
- Treat the installed theme and Obsidian appearance configuration as read-only diagnostic input unless the user explicitly requests a settings change.
- Never print, commit, log, or expose personal values read from runtime configuration.
- Test installation behavior only in disposable test vaults created specifically for testing, never in a user's real vault.

## Release boundary

- Validate, commit intentionally, push, create the numeric version tag, wait for CI and release success, and verify the public release assets.
- Before publishing, ensure `package.json`, `manifest.json`, and `CHANGELOG.md` agree on the release version.
- Keep `theme.css` and `manifest.json` at the repository root for BRAT. Do not add `theme-beta.css` unless the release strategy is intentionally changed, because BRAT prefers it over `theme.css`.
- Client installation and theme activation remain BRAT's and the user's responsibility.

## Required handoff

- State exactly what was published and where.
- When a BRAT update is required, say that the repository is ready for BRAT and leave the installed vault untouched.
- Never claim the client theme is updated merely because repository files or release assets were published.
