// Filtros del lado del cliente. Sin JavaScript, la lista completa se ve igual.
const form = document.querySelector<HTMLElement>('[data-filters]');
if (form) {
  const items = [...document.querySelectorAll<HTMLElement>('[data-filter-item]')];
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  const empty = document.querySelector<HTMLElement>('[data-filter-empty]');
  const selects = [...form.querySelectorAll<HTMLSelectElement>('select[data-filter]')];
  const apply = () => {
    let shown = 0;
    for (const it of items) {
      const ok = selects.every((s) => !s.value || it.dataset[s.dataset.filter!] === s.value);
      it.hidden = !ok;
      if (ok) shown++;
    }
    if (status) status.textContent = `${shown} de ${items.length} resultados`;
    if (empty) empty.hidden = shown > 0;
  };
  selects.forEach((s) => s.addEventListener('change', apply));
  form.addEventListener('submit', (e) => e.preventDefault());
  form.hidden = false;
  apply();
}
