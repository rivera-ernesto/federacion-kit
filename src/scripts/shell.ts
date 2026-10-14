import { getLista } from './lista';

// Menú móvil
const btn = document.querySelector<HTMLButtonElement>('.menu-btn');
const nav = document.getElementById('menu');
btn?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open') ?? false;
  btn.setAttribute('aria-expanded', String(open));
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
