import { getLista } from './lista';

// Menú móvil
const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
const nav = document.getElementById('menu');
btn?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  btn.setAttribute('aria-expanded', String(open));
});

// Tema claro/oscuro: el botón alterna y guarda la elección; sin elección, sigue al sistema.
const root = document.documentElement;
const themeBtn = document.querySelector<HTMLButtonElement>('.theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches);
const syncThemeBtn = () => themeBtn?.setAttribute('aria-pressed', String(isDark()));
syncThemeBtn();
systemDark.addEventListener('change', syncThemeBtn);
themeBtn?.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('fepa:tema', next); } catch {}
  syncThemeBtn();
});
window.addEventListener('storage', (e) => {
  if (e.key !== 'fepa:tema') return;
  if (e.newValue === 'light' || e.newValue === 'dark') root.dataset.theme = e.newValue;
  else delete root.dataset.theme;
  syncThemeBtn();
});

// Contador de la lista de consulta
const paint = () => {
  const n = getLista().length;
  document.querySelectorAll<HTMLElement>('[data-lista-count]').forEach((el) => {
    el.textContent = String(n);
    el.dataset.n = String(n);
  });
};
paint();
window.addEventListener('lista:cambio', paint);
window.addEventListener('storage', paint);
