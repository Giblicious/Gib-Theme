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
postcss.parse(css, { from: path.join(root, 'theme.css') });
if (!css.includes('.theme-dark')) throw new Error('theme.css must define a dark color scheme');
if (!css.includes('.theme-light')) throw new Error('theme.css must define a light color scheme');
if (!css.includes('--accent-h:')) throw new Error('theme.css must define the Gib Theme accent system');
if (/url\s*\(\s*["']?https?:/i.test(css) || /@import\s+(?:url\s*\()?\s*["']?https?:/i.test(css)) {
  throw new Error('theme.css must not load remote runtime assets');
}

console.log(`Gib Theme ${manifest.version} passed CSS parsing, manifest, asset, and network checks.`);
