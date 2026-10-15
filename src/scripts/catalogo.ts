// Catálogo: cambio de vista (íconos / lista) y agregado rápido a la lista de consulta.
import { agregarOActualizar, getLista } from './lista';

const VIEW_KEY = 'fepa:vista';
const results = document.querySelector<HTMLElement>('[data-results]');

// --- Vista ---
const toggle = document.querySelector<HTMLElement>('[data-view-toggle]');
if (results && toggle) {
  const buttons = [...toggle.querySelectorAll<HTMLButtonElement>('button[data-view]')];
  const setView = (v: string, save: boolean) => {
    results.dataset.view = v;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
    if (save) {
      try { localStorage.setItem(VIEW_KEY, v); } catch { /* sin almacenamiento: no se recuerda */ }
    }
  };
  let saved = '';
  try { saved = localStorage.getItem(VIEW_KEY) ?? ''; } catch { /* ignorar */ }
  if (saved === 'lista' || saved === 'iconos') setView(saved, false);
  buttons.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view!, true)));
  toggle.hidden = false;
}

// --- Agregado rápido ---
const live = document.querySelector<HTMLElement>('[data-quick-live]');
const clamp = (n: number) => (Number.isFinite(n) ? Math.min(9999, Math.max(1, Math.floor(n))) : 1);
const NOTA = /^Cantidad: \d+$/;

document.querySelectorAll<HTMLElement>('[data-filter-item]').forEach((card) => {
  const quick = card.querySelector<HTMLElement>('[data-quick]');
  if (!quick) return;
  const input = quick.querySelector<HTMLInputElement>('[data-qty-input]')!;
  const add = quick.querySelector<HTMLButtonElement>('[data-quick-add]')!;
  const step = (d: number) => { input.value = String(clamp((parseInt(input.value, 10) || 1) + d)); };
  quick.querySelector('[data-qty-minus]')!.addEventListener('click', () => step(-1));
  quick.querySelector('[data-qty-plus]')!.addEventListener('click', () => step(1));
  input.addEventListener('change', () => { input.value = String(clamp(parseInt(input.value, 10))); });
  let timer = 0;
  add.addEventListener('click', () => {
    const qty = clamp(parseInt(input.value, 10));
    input.value = String(qty);
    const d = card.dataset;
    const previa = getLista().find((i) => i.slug === d.slug)?.nota.trim() ?? '';
    // Conserva una nota escrita a mano; solo reemplaza una cantidad puesta desde el catálogo.
    const nota = !previa || NOTA.test(previa) ? `Cantidad: ${qty}` : `Cantidad: ${qty} · ${previa.replace(/^Cantidad: \d+ · /, '')}`;
    agregarOActualizar({ slug: d.slug!, nombre: d.nombre!, href: d.href!, orgId: d.orgId!, orgNombre: d.orgNombre!, orgWa: d.orgWa!, nota });
    const label = add.textContent;
    if (!add.dataset.label) add.dataset.label = label ?? 'Agregar';
    add.textContent = 'Agregado ✓';
    if (live) live.textContent = `${d.nombre}: ${qty} en tu lista de consulta.`;
    clearTimeout(timer);
    timer = window.setTimeout(() => { add.textContent = add.dataset.label!; }, 2000);
  });
  quick.hidden = false;
});
