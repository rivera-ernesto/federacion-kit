// Genera las imágenes de ejemplo (SVG livianos) en public/media/.  Uso: node scripts/make-placeholders.mjs
// Reemplácelas por fotos reales desde el panel (Pages CMS) o copiándolas a public/media/.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'media');
mkdirSync(out, { recursive: true });

const C = { forest: '#1f4d3a', leaf: '#3f7a52', light: '#8bb58a', cream: '#f7f1e3', sand: '#e8dcc0',
  earth: '#6b4a2f', clay: '#a8703f', asai: '#4b2a5c', asai2: '#6e3f86', sky: '#cfe3dc', river: '#5f9ea0',
  amber: '#d99a2b', orange: '#e08a3c', gold: '#f0c75e' };

const wrap = (bg1, bg2, inner, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" role="img" aria-label="${label}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs>
<rect width="800" height="600" fill="url(#g)"/>${inner}</svg>\n`;

const leaf = (x, y, r, s = 1, col = C.leaf) =>
  `<path d="M0 0C40 -60 120 -70 170 -10C120 40 40 50 0 0Z" fill="${col}" transform="translate(${x} ${y}) rotate(${r}) scale(${s})"/>`;
const river = (y, col = C.river, op = 0.55) =>
  `<path d="M0 ${y}C150 ${y - 40} 250 ${y + 40} 400 ${y}S650 ${y - 40} 800 ${y}V600H0Z" fill="${col}" opacity="${op}"/>`;
const tree = (x, y, s = 1, col = C.forest) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="0" width="12" height="70" fill="${C.earth}"/><circle cx="0" cy="-10" r="48" fill="${col}"/><circle cx="-30" cy="15" r="32" fill="${col}"/><circle cx="30" cy="15" r="32" fill="${col}"/></g>`;
const sun = (x, y, r = 50) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.gold}" opacity=".85"/>`;
const circ = (pts, r, col, hi) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/><circle cx="${x - r / 3}" cy="${y - r / 3}" r="${r / 4}" fill="${hi}" opacity=".5"/>`).join('');

const motifs = {
  asai: () => leaf(180, 190, -25, 1.4) + leaf(620, 170, 205, 1.4) + `<path d="M400 120V260M400 200L300 330M400 200L500 330M400 200L360 360M400 200L440 360" stroke="${C.earth}" stroke-width="6" fill="none"/>` +
    circ([[300,350],[330,380],[360,395],[500,350],[470,380],[440,395],[400,410],[400,360],[345,340],[455,340],[380,300],[420,300],[400,260],[300,320],[500,320]], 30, C.asai, C.asai2),
  majo: () => leaf(150, 150, -15, 1.6) + leaf(650, 140, 195, 1.6) + `<path d="M400 110V250M400 180L310 300M400 180L490 300M400 180L400 330M400 180L350 320M400 180L450 320" stroke="${C.earth}" stroke-width="5" fill="none"/>` +
    [[310,320],[490,320],[400,350],[350,340],[450,340],[330,270],[470,270],[400,300],[380,260],[420,260]].map(([x,y]) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="30" fill="#3a1f4a"/><ellipse cx="${x-6}" cy="${y-9}" rx="5" ry="9" fill="#8a5aa0" opacity=".5"/>`).join(''),
  copoazu: () => leaf(160, 170, -20, 1.3) + leaf(640, 160, 200, 1.3) + [[300,370,0],[480,360,18],[390,300,-12]].map(([x,y,r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="90" ry="62" fill="${C.clay}"/><ellipse rx="90" ry="62" fill="none" stroke="${C.earth}" stroke-width="3" stroke-dasharray="4 7"/><ellipse cx="-25" cy="-20" rx="26" ry="12" fill="#fff" opacity=".18"/></g>`).join(''),
  cacao: () => leaf(160, 160, -20, 1.2) + leaf(650, 150, 200, 1.2) + `<g transform="translate(400 330) rotate(-12)"><path d="M-150 0C-110 -95 110 -95 150 0C110 95 -110 95 -150 0Z" fill="${C.orange}"/>` +
    [-90,-45,0,45,90].map(x => `<path d="M${x} -78V78" stroke="#b9651f" stroke-width="5" fill="none"/>`).join('') + `<ellipse cx="-50" cy="-40" rx="45" ry="14" fill="#fff" opacity=".2"/></g>`,
  cacaoPasta: () => `<ellipse cx="400" cy="400" rx="230" ry="60" fill="${C.earth}" opacity=".35"/><path d="M200 380C200 250 600 250 600 380C600 450 200 450 200 380Z" fill="#4a2c1a"/><ellipse cx="400" cy="372" rx="200" ry="50" fill="#5d3a24"/><ellipse cx="340" cy="360" rx="70" ry="12" fill="#fff" opacity=".12"/>` + leaf(150, 170, -20, 1.1) + leaf(660, 160, 200, 1.1),
  nibs: () => `<ellipse cx="400" cy="420" rx="230" ry="55" fill="${C.earth}" opacity=".3"/>` + Array.from({length: 46}, (_, i) => { const a = i * 2.4, r = 20 + (i * 37 % 150); return `<rect x="${400 + Math.cos(a) * r * 1.3 - 12}" y="${380 + Math.sin(a) * r * 0.45 - 8}" width="24" height="16" rx="4" fill="${i % 3 ? '#4a2c1a' : '#6b3f24'}" transform="rotate(${i * 37 % 90} ${400 + Math.cos(a) * r * 1.3} ${380 + Math.sin(a) * r * 0.45})"/>`; }).join('') + leaf(150, 170, -20, 1.1) + leaf(660, 160, 200, 1.1),
  harina: () => `<ellipse cx="400" cy="440" rx="250" ry="60" fill="${C.earth}" opacity=".25"/><path d="M180 400C180 300 260 250 400 250S620 300 620 400C620 470 180 470 180 400Z" fill="${C.sand}"/><path d="M230 360C300 300 500 300 570 360" stroke="#fff" stroke-width="8" fill="none" opacity=".5"/>` + leaf(120, 190, -25, 1.8, C.leaf) + leaf(690, 180, 205, 1.8, C.light),
  castana: () => leaf(150, 150, -20, 1.2) + `<g transform="translate(330 340)"><circle r="105" fill="#7a4d2b"/><circle r="105" fill="none" stroke="#4a2c1a" stroke-width="4" stroke-dasharray="3 9"/><path d="M-70 -40C-20 -90 40 -90 80 -30" stroke="#a8703f" stroke-width="10" fill="none" opacity=".6"/></g>` +
    [[520,400,10],[590,350,-30],[560,440,60]].map(([x,y,r]) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-35 0C-20 -50 30 -50 40 5L0 40Z" fill="${C.sand}"/><path d="M-35 0C-20 -50 30 -50 40 5" fill="none" stroke="#7a4d2b" stroke-width="7"/></g>`).join(''),
  miel: () => { let h = ''; for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = 190 + c * 70 + (r % 2) * 35, y = 230 + r * 60; h += `<polygon points="${[0,1,2,3,4,5].map(k => `${x + 34 * Math.cos(k * Math.PI / 3 + Math.PI / 6)},${y + 34 * Math.sin(k * Math.PI / 3 + Math.PI / 6)}`).join(' ')}" fill="${(r + c) % 3 ? C.amber : C.gold}" stroke="#fff" stroke-width="4" opacity=".92"/>`; } return h + `<path d="M330 90C360 60 440 60 470 90" stroke="${C.earth}" stroke-width="5" fill="none"/>`; },
  achachairu: () => leaf(170, 170, -20, 1.3) + leaf(640, 160, 200, 1.3) + circ([[330,350],[400,330],[470,350],[365,410],[435,410],[400,270]], 52, C.orange, '#fff'),
  platano: () => `<path d="M200 360C260 220 520 200 620 330C520 300 330 310 200 360Z" fill="${C.gold}" stroke="#c9a02c" stroke-width="5"/><path d="M200 390C260 270 520 260 620 360C520 340 330 350 200 390Z" fill="#f4d878" stroke="#c9a02c" stroke-width="5"/>` + leaf(130, 170, -20, 1.8) + leaf(690, 170, 205, 1.8, C.light),
  aceite: () => `<path d="M330 200h140v40l40 60v190c0 20-15 30-35 30H325c-20 0-35-10-35-30V300l40-60Z" fill="${C.amber}" opacity=".92"/><rect x="345" y="170" width="110" height="36" rx="8" fill="${C.earth}"/><rect x="330" y="330" width="140" height="90" rx="10" fill="${C.cream}" opacity=".85"/>` + leaf(140, 190, -20, 1.2) + leaf(670, 180, 200, 1.2),
  rio: () => sun(620, 150, 60) + `<path d="M0 330C100 290 200 310 300 290S600 270 800 300V600H0Z" fill="${C.leaf}"/>` + river(400, C.river, .8) + river(470, '#7db7b2', .7) + tree(130, 250, 1.1) + tree(250, 275, .8, C.leaf) + tree(690, 250, 1),
  bosque: () => sun(160, 130, 45) + [60, 170, 280, 390, 500, 610, 720].map((x, i) => tree(x, 240 + (i % 3) * 30, 1.3 - (i % 3) * .15, i % 2 ? C.forest : C.leaf)).join('') + `<rect y="470" width="800" height="130" fill="${C.forestDark ?? '#143528'}" opacity=".5"/>`,
  casa: () => sun(650, 130, 50) + `<rect y="400" width="800" height="200" fill="${C.leaf}"/>` + river(500, C.river, .6) + `<rect x="300" y="290" width="200" height="130" fill="${C.sand}"/><polygon points="280,295 400,200 520,295" fill="${C.earth}"/><rect x="380" y="340" width="40" height="80" fill="${C.clay}"/>` + tree(150, 300, 1) + tree(660, 310, .9),
  mercado: () => `<rect y="430" width="800" height="170" fill="${C.sand}"/>` + [0,1,2,3].map(i => `<g transform="translate(${90 + i * 170} 240)"><polygon points="0,0 150,0 165,60 -15,60" fill="${i % 2 ? C.asai : C.forest}"/><polygon points="0,0 38,0 30,60 -15,60" fill="#fff" opacity=".18"/><rect x="0" y="60" width="8" height="140" fill="${C.earth}"/><rect x="142" y="60" width="8" height="140" fill="${C.earth}"/><rect x="0" y="150" width="150" height="50" fill="${C.clay}"/>${circ([[30,140],[70,140],[110,140]], 18, [C.asai, C.orange, C.gold][i % 3], '#fff')}</g>`).join(''),
  taller: () => `<rect y="420" width="800" height="180" fill="${C.sand}"/><rect x="120" y="260" width="560" height="170" fill="${C.cream}" stroke="${C.earth}" stroke-width="5"/><rect x="170" y="310" width="140" height="120" fill="${C.river}" opacity=".6"/><rect x="350" y="310" width="140" height="120" fill="${C.leaf}" opacity=".7"/><rect x="530" y="310" width="100" height="120" fill="${C.asai}" opacity=".7"/><polygon points="100,265 400,150 700,265" fill="${C.forest}"/>`,
};

const files = {
  'hero': ['#dcebe0', '#8fbf9f', 'rio'],
  'og-default': ['#dcebe0', '#6fa684', 'bosque'],
  'org-rio-claro': ['#d6e8e4', '#7db7b2', 'rio'], 'org-rio-claro-2': ['#dcebe0', '#9bc5a8', 'casa'],
  'org-castanal-del-norte': ['#e6dcc2', '#b8a070', 'bosque'], 'org-castanal-del-norte-2': ['#efe6d0', '#c9b98a', 'taller'],
  'org-mujeres-del-asai': ['#e7dcec', '#a58ab5', 'taller'], 'org-mujeres-del-asai-2': ['#dcebe0', '#8fbf9f', 'casa'],
  'org-cacaoteros-del-bosque': ['#efe0cf', '#c79a6e', 'bosque'], 'org-cacaoteros-del-bosque-2': ['#e6dcc2', '#b8a070', 'casa'],
  'org-copoazu-unido': ['#f1e6d0', '#d9b27a', 'rio'], 'org-copoazu-unido-2': ['#dcebe0', '#9bc5a8', 'taller'],
  'org-raices-del-majo': ['#dfe9d6', '#8aa97a', 'bosque'], 'org-raices-del-majo-2': ['#d6e8e4', '#7db7b2', 'casa'],
  'prod-pulpa-de-asai': ['#efe3f2', '#c4a6d1', 'asai'], 'prod-pulpa-de-copoazu': ['#f4e7d3', '#d9b27a', 'copoazu'],
  'prod-pulpa-de-majo': ['#e9e0ee', '#b79bc4', 'majo'], 'prod-pulpa-de-achachairu': ['#f8e9d3', '#eab97a', 'achachairu'],
  'prod-cacao-silvestre-en-grano': ['#f4e5d0', '#d6a874', 'cacao'], 'prod-pasta-de-cacao': ['#ecdccb', '#b8906a', 'cacaoPasta'],
  'prod-nibs-de-cacao': ['#efe2d0', '#c9a37a', 'nibs'], 'prod-harina-de-platano': ['#f7efc9', '#e3cf7a', 'platano'],
  'prod-harina-de-castana': ['#f1e6d0', '#cdb98a', 'harina'], 'prod-castana-pelada': ['#efe6d0', '#c9b98a', 'castana'],
  'prod-aceite-de-castana': ['#f6ecc9', '#e6c77a', 'aceite'], 'prod-miel-de-melipona': ['#f8ecc4', '#eac56a', 'miel'],
  'noticia-feria': ['#e6dcc2', '#c9b98a', 'mercado'], 'noticia-taller': ['#dcebe0', '#8fbf9f', 'taller'],
  'noticia-cosecha': ['#efe3f2', '#b79bc4', 'asai'], 'noticia-oportunidad': ['#d6e8e4', '#7db7b2', 'rio'],
  'gal-1': ['#d6e8e4', '#7db7b2', 'rio'], 'gal-2': ['#efe3f2', '#c4a6d1', 'asai'], 'gal-3': ['#f4e5d0', '#d6a874', 'cacao'],
  'gal-4': ['#e6dcc2', '#c9b98a', 'mercado'], 'gal-5': ['#efe6d0', '#c9b98a', 'castana'], 'gal-6': ['#dfe9d6', '#8aa97a', 'bosque'],
  'gal-7': ['#f8ecc4', '#eac56a', 'miel'], 'gal-8': ['#dcebe0', '#8fbf9f', 'casa'],
};

for (const [name, [a, b, m]] of Object.entries(files)) {
  writeFileSync(join(out, `${name}.svg`), wrap(a, b, motifs[m](), `Ilustración de ejemplo (${m})`));
}
console.log(`${Object.keys(files).length} imágenes en ${out}`);
