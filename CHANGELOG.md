# Changelog

## 0.2.5

- Reverts the trapezoidal workspace tabs introduced in 0.2.4.
- Removes the global superellipse override and restores the theme's previous corner geometry.

## 0.2.4

- Gives non-stacked workspace tabs a tapered trapezoidal silhouette.
- Applies the shared superellipse curve to tab bodies, active-tab connectors, inset corners, and outset corners.
- Unifies every Obsidian corner-shape token across dark and light modes.
- Adds a release audit that rejects rounded theme rules without explicit corner-shape treatment.

## 0.2.3

- Removes theme-owned status-bar height, padding, alignment, and overflow layout.
- Leaves status-bar container layout and placement to Obsidian or the enabled Gib Tweaks plugin.
- Prevents an inactive Gib Tweaks installation from looking like a floating 43px corner bar.

## 0.2.2

- Stops the right-sidebar decorative shadow above the Gib Tweaks status footer.
- Uses the footer's live height so the theme cannot visually overlay relocated status items.

## 0.2.1

- Scopes main-workspace status-bar styling away from the Gib Tweaks right-sidebar footer.
- Prevents theme cascade rules from overriding the plugin's relocated status-bar layout.

## 0.2.0

- Renames the theme and public project from Claudish to Gib Theme.
- Changes the BRAT repository path to `Giblicious/Gib-Theme`.

## 0.1.0

- Publishes the original Claudish dark and light palettes as a BRAT-compatible Obsidian theme.
- Includes typography, callout, menu, suggestion, toggle, code, link, sidebar, ribbon, and status-bar styling.
- Establishes CSS parsing, manifest validation, CI, tagged releases, and vault-safe development policy.
