// Lista de consulta: se guarda solo en el navegador (localStorage). No hay precios ni pagos.
export interface ItemLista {
  slug: string;
  nombre: string;
  href: string;
  orgId: string;
  orgNombre: string;
  orgWa: string;
  nota: string;
}
export interface Perfil { nombre: string; ciudad: string }

const KEY = 'fepa:lista';
const PERFIL = 'fepa:perfil';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privado o almacenamiento bloqueado: la lista no se guarda */
  }
  window.dispatchEvent(new CustomEvent('lista:cambio'));
}

export const getLista = () => read<ItemLista[]>(KEY, []);
export const setLista = (l: ItemLista[]) => write(KEY, l);
export const enLista = (slug: string) => getLista().some((i) => i.slug === slug);
export function agregar(item: ItemLista) {
  const l = getLista();
  if (!l.some((i) => i.slug === item.slug)) setLista([...l, item]);
}
/** Agrega el producto o, si ya está, solo actualiza su nota (cantidad). */
export function agregarOActualizar(item: ItemLista) {
  const l = getLista();
  if (l.some((i) => i.slug === item.slug)) setLista(l.map((i) => (i.slug === item.slug ? { ...i, nota: item.nota } : i)));
  else setLista([...l, item]);
}
export const quitar = (slug: string) => setLista(getLista().filter((i) => i.slug !== slug));
export const getPerfil = () => read<Perfil>(PERFIL, { nombre: '', ciudad: '' });
export const setPerfil = (p: Perfil) => write(PERFIL, p);
