import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');
const packageJson = JSON.parse(read('package.json'));
const manifest = JSON.parse(read('manifest.json'));

if (manifest.name !== 'Gib Theme') throw new Error('manifest name must be Gib Theme');
if (!/^0\.\d+\.\d+$/.test(manifest.version)) throw new Error('public beta versions must remain in 0.x.x');
if (manifest.version !== packageJson.version) throw new Error('package and manifest versions must match');
if (manifest.minAppVersion !== '1.0.0') throw new Error('minimum Obsidian version must remain explicit');
if (manifest.author !== 'Giblicious') throw new Error('manifest author must be Giblicious');

for (const required of [
  'theme.css',
  'manifest.json',
  'README.md',
  'CHANGELOG.md',
  'LICENSE',
  'SECURITY.md',
  'AGENTS.md',
]) {
  if (!fs.existsSync(path.join(root, required))) throw new Error(`Missing public theme file: ${required}`);
}

if (fs.existsSync(path.join(root, 'theme-beta.css'))) {
  throw new Error('theme-beta.css would override theme.css in BRAT and is not part of this release policy');
}

const css = read('theme.css');
const cssRoot = postcss.parse(css, { from: path.join(root, 'theme.css') });
if (!css.includes('.theme-dark')) throw new Error('theme.css must define a dark color scheme');
if (!css.includes('.theme-light')) throw new Error('theme.css must define a light color scheme');
if (!css.includes('--accent-h:')) throw new Error('theme.css must define the Gib Theme accent system');
if (css.includes('rgba(var(--callout-color)')) {
  throw new Error('Callouts must treat --callout-color as a complete modern CSS color');
}
if (/--callout-quote:\s*\d+\s*,/.test(css)) {
  throw new Error('--callout-quote must be a complete CSS color, not a legacy RGB component list');
}
const calloutRules = [];
cssRoot.walkRules(rule => {
  if (rule.selector.trim() === '.callout') calloutRules.push(rule);
});
const calloutDeclarations = calloutRules.flatMap(rule => rule.nodes.filter(node => node.type === 'decl'));
if (!calloutDeclarations.some(node => node.prop === 'background-color' && node.value === 'var(--gib-callout-background)')) {
  throw new Error('Callouts must use the restrained theme surface');
}
if (!calloutDeclarations.some(node => node.prop === 'border' && node.value.includes('var(--gib-callout-border)'))) {
  throw new Error('Callouts must use the restrained theme border');
}
if (css.includes('border-inline-start-color: var(--callout-color)')) {
  throw new Error('Callouts must not use a loud semantic-color edge');
}
if (!css.includes('.callout-title') || !css.includes('color: var(--gib-callout-title)')) {
  throw new Error('Callout titles must use the warm neutral title color');
}
if (!css.includes('background-color: var(--gib-callout-title-background)')) {
  throw new Error('Callouts must have a differentiated warm-stone title band');
}
if (!css.includes('border-bottom: var(--callout-border-width) solid var(--gib-callout-border)')) {
  throw new Error('Callout title bands must have a quiet structural divider');
}
if (!css.includes('var(--callout-color) var(--gib-callout-title-tint)')
  || !css.includes('var(--callout-color) var(--gib-callout-divider-tint)')) {
  throw new Error('Callout title bands must carry a restrained semantic tint');
}
if (!css.includes('--gib-callout-title-tint:    12%;')
  || !css.includes('--gib-callout-title-tint:    9%;')) {
  throw new Error('Callout title tint must remain independently tuned for dark and light modes');
}
if (!css.includes('--callout-padding:           0;')
  || !css.includes('--callout-title-padding:     var(--size-4-2) var(--size-4-4);')
  || !css.includes('--callout-content-padding:   var(--size-4-3) var(--size-4-4);')) {
  throw new Error('Callout title and content sections must own their full-width padding');
}
if (!css.includes('color-mix(in srgb, var(--callout-color) 45%, var(--gib-callout-title))')) {
  throw new Error('Semantic callout color must be limited to a muted icon cue');
}
const butterCaretSelector = '.butter-editor-view .ProseMirror > p.butter-spawn-ephemeral';
const butterCaretRules = [];
cssRoot.walkRules(rule => {
  if (rule.selector.includes(butterCaretSelector)) butterCaretRules.push(rule);
});
const butterCaretDeclarations = butterCaretRules.flatMap(rule => rule.nodes.filter(node => node.type === 'decl'));
if (!butterCaretDeclarations.some(node => node.prop === 'overflow' && node.value === 'visible')) {
  throw new Error('Butter Editor new-line carets need a non-clipping fallback');
}
if (!butterCaretDeclarations.some(node => node.prop === 'overflow-clip-margin' && node.value === '4px')) {
  throw new Error('Butter Editor new-line carets need a bounded paint allowance');
}
if (!butterCaretDeclarations.some(node => node.prop === 'caret-color' && node.value === 'var(--caret-color)')) {
  throw new Error('Butter Editor new-line carets must retain the Obsidian caret color');
}
if (css.includes('body:not(.is-mobile) .status-bar')) {
  throw new Error('Gib Theme must not own status-bar layout or placement');
}
if (!css.includes('.workspace-split.mod-right-split.gib-tweaks-has-status-bar-footer::after')) {
  throw new Error('Gib Theme must keep its sidebar overlay out of the Gib Tweaks footer');
}
if (/url\s*\(\s*["']?https?:/i.test(css) || /@import\s+(?:url\s*\()?\s*["']?https?:/i.test(css)) {
  throw new Error('theme.css must not load remote runtime assets');
}

console.log(`Gib Theme ${manifest.version} passed CSS parsing, manifest, asset, and network checks.`);
