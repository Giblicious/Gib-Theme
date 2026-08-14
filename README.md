# Gib Theme

Gib Theme is a warm, restrained theme for Obsidian with coordinated dark and light palettes. It uses warm stone neutrals, a parchment accent, readable serif document headings, quiet interface chrome, and carefully tuned code, callout, menu, link, and sidebar treatments.

## Highlights

- Coordinated dark and light color systems.
- Warm neutral interface chrome with a restrained accent palette.
- Serif document titles and headings paired with clean interface typography.
- Refined callouts, menus, suggestions, toggles, code blocks, links, sidebars, and status bar.
- No remote fonts, images, analytics, or other runtime network dependencies.
- Optional compatibility with [Gib Tweaks](https://github.com/Giblicious/Gib-Tweaks) for typography overrides and workspace behavior.
- Status-bar and sidebar-overlay rules are scoped so Gib Tweaks can place the bar in a full-width right footer without theme cascade conflicts.

## Install with BRAT

1. Install and enable **BRAT** in Obsidian.
2. Open BRAT settings and choose **Add Beta Theme**.
3. Enter `Giblicious/Gib-Theme`.
4. Select **Gib Theme** under **Settings → Appearance → Themes**.

BRAT reads the root-level `theme.css` and `manifest.json`. This repository intentionally does not use `theme-beta.css`, so the tested main theme file is always the BRAT source.

## Development

```sh
npm ci
npm run check
```

The check parses the complete stylesheet, validates release metadata and required assets, and rejects remote runtime dependencies. Develop in this repository, not inside a real Obsidian vault.

## Release

1. Update the version in `package.json` and `manifest.json`.
2. Update `CHANGELOG.md`.
3. Run `npm run check` and commit the tested files.
4. Push the commit and create a numeric tag matching the manifest, such as `0.1.0`.
5. Verify CI and the GitHub release assets. BRAT remains responsible for installing or updating the theme in Obsidian.

## License

MIT
