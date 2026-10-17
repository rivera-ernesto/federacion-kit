// Genera la imagen para compartir (Open Graph), 1200×630 PNG, con el nombre del sitio.
// Uso: node scripts/make-og.mjs   (vuelva a correrlo después de cambiar el nombre o los colores)
import sharp from 'sharp';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../src/site.config.ts';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media', 'og.png');
const c = siteConfig.colors;
const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
const tree = (x, y, s, col) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="0" width="12" height="70" fill="${c.earth}"/><circle cx="0" cy="-10" r="48" fill="${col}"/><circle cx="-30" cy="15" r="32" fill="${col}"/><circle cx="30" cy="15" r="32" fill="${col}"/></g>`;
const trees = [[90, 470, 1.2, '#3f7a52'], [250, 500, 1, c.forest], [400, 520, 0.8, '#3f7a52'], [800, 520, 0.8, c.forest],
  [950, 495, 1, '#3f7a52'], [1110, 470, 1.2, c.forest]].map((t) => tree(...t)).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3efe4"/><stop offset="1" stop-color="#8bb58a"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<circle cx="1040" cy="120" r="56" fill="#f0c75e" opacity=".85"/>
${trees}
<rect y="560" width="1200" height="70" fill="${c.forestDark}"/>
<text x="600" y="200" text-anchor="middle" font-family="Georgia, serif" font-size="68" font-weight="700" fill="${c.forestDark}">${esc(siteConfig.shortName)}</text>
<text x="600" y="262" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${c.forestDark}">${esc(siteConfig.name)}</text>
<text x="600" y="606" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${c.cream}">${esc(siteConfig.tagline)}</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(out);
console.log(`Imagen para compartir: ${out}`);
