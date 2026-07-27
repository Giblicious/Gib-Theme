# Security

Please report security issues privately through GitHub's security advisory form for this repository. Do not open a public issue for an unpatched vulnerability.

Gib Theme is a static stylesheet. It does not require accounts, credentials, telemetry, analytics, or runtime network access. Release validation rejects remote HTTP and HTTPS assets in `theme.css`.

The installed theme directory and Obsidian appearance settings are user-owned runtime state. They must not be overwritten during development or publishing.
