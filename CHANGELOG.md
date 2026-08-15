# Changelog

## 0.2.11

- Reduces callout title tint to a barely perceptible semantic wash.
- Uses five percent in dark mode and three percent in light mode.
- Softens the matching divider tint while retaining the differentiated title section.

## 0.2.10

- Tints each callout title band toward its semantic callout color.
- Uses restrained, mode-specific blends so the tint stays within Gib Theme's warm stone palette.
- Carries a softer version of the tint into the title divider while preserving neutral title text.

## 0.2.9

- Adds a differentiated warm-stone title band to callouts.
- Separates the heading and body with a quiet structural divider.
- Gives the title and content independent full-width spacing in Obsidian and Butter Editor.

## 0.2.8

- Prevents Butter Editor's newly inserted paragraph wrapper from clipping the caret.
- Preserves Butter's spawn animation with a bounded four-pixel paint allowance.
- Keeps the caret synchronized with Obsidian's active caret color.

## 0.2.7

- Reworks callouts as quiet warm-stone panels that match the rest of Gib Theme.
- Removes the saturated background tint and thick semantic-color edge.
- Keeps callout types recognizable through a restrained icon tint only.

## 0.2.6

- Restores clearly visible callout surfaces in dark and light modes.
- Replaces obsolete RGB-component callout syntax with current complete CSS colors.
- Adds a type-colored leading edge, accessible fallback surface, and modern color-mixed tint.
- Adds release checks that reject transparent or legacy-colored callout styling.

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
