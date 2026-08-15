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
if (!css.includes('clip-path: polygon(') || !css.includes('--gib-tab-slope')) {
  throw new Error('Gib Theme must define the trapezoidal tab silhouette');
}
if (!css.includes('body.theme-dark *::before') || !css.includes('body.theme-light *::after')) {
  throw new Error('Gib Theme must apply superellipse geometry to UI surfaces and pseudo-corners');
}

const cornerShapeTokens = [
  '--corner-shape',
  '--bases-cards-corner-shape',
  '--button-corner-shape',
  '--embed-actions-corner-shape',
  '--input-corner-shape',
  '--menu-corner-shape',
  '--metadata-property-corner-shape',
  '--pill-corner-shape',
  '--search-input-corner-shape',
  '--tab-switcher-preview-corner-shape',
  '--tag-corner-shape',
];
const sharedGeometryRule = cssRoot.nodes.find(node =>
  node.type === 'rule'
  && node.selector.includes('body.theme-dark')
  && node.selector.includes('body.theme-light')
);
if (!sharedGeometryRule) throw new Error('Dark and light themes must share one corner geometry contract');
for (const token of cornerShapeTokens) {
  const declaration = sharedGeometryRule.nodes.find(node => node.type === 'decl' && node.prop === token);
  if (!declaration || !declaration.value.includes('--gib-corner-shape')) {
    throw new Error(`Shared superellipse geometry is missing token: ${token}`);
  }
}

const unshapedRoundedRules = [];
cssRoot.walkRules(rule => {
  const hasRoundedCorner = rule.nodes.some(node =>
    node.type === 'decl'
    && /^border(?:-.+)?-radius$/.test(node.prop)
    && !/^0(?:\s|$)/.test(node.value)
  );
  if (!hasRoundedCorner) return;
  const hasCornerShape = rule.nodes.some(node =>
    node.type === 'decl' && /^corner(?:-.+)?-shape$/.test(node.prop)
  );
  if (!hasCornerShape) unshapedRoundedRules.push(rule.selector);
});
if (unshapedRoundedRules.length) {
  throw new Error(`Rounded rules missing explicit superellipse treatment: ${unshapedRoundedRules.join(', ')}`);
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
