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
if (!calloutDeclarations.some(node => node.prop === 'background-color' && node.value === 'var(--background-secondary)')) {
  throw new Error('Callouts must have a visible fallback background');
}
if (!calloutDeclarations.some(node => node.prop === 'border-inline-start-color' && node.value === 'var(--callout-color)')) {
  throw new Error('Callouts must have a visible type-colored edge');
}
if (!css.includes('color-mix(') || !css.includes('--gib-callout-background-mix')) {
  throw new Error('Callouts must have a type-colored modern background tint');
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
