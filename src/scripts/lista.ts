// Lista de consulta: se guarda solo en el navegador (localStorage). No hay precios ni pagos.
export interface ItemLista {
  slug: string;
  nombre: string;
  href: string;
  orgId: string;
  orgNombre: string;
  orgWa: string;
  nota: string;
  /** Cantidad y presentación elegidas (ausentes en ítems del formato antiguo "Cantidad: N"). */
  cantidad?: number;
  presentacion?: string;
  /** Presentaciones del producto, para poder cambiarlas desde la lista. */
  presentaciones?: string[];
  /** Nota escrita a mano que acompaña la cantidad (solo ítems antiguos). */
  extra?: string;
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

export const UNIDAD = 'unidad';
export const clamp = (n: number) => (Number.isFinite(n) ? Math.min(9999, Math.max(1, Math.floor(n))) : 1);
/** Clave de línea: producto + presentación. */
export const claveDe = (i: { slug: string; presentacion?: string }) => `${i.slug}|${i.presentacion ?? ''}`;
/** Texto de la línea, p. ej. "2 × Frasco de 1 l"; conserva una nota escrita a mano (extra). */
export function textoNota(i: ItemLista) {
  if (i.cantidad === undefined) return i.nota;
  return `${i.cantidad} × ${i.presentacion || UNIDAD}${i.extra ? ` · ${i.extra}` : ''}`;
}
/** Lee el formato antiguo: "Cantidad: N" pasa a cantidad N; otra nota se conserva tal cual. */
function migrar(i: ItemLista): ItemLista {
  if (i.cantidad !== undefined) return i;
  const m = /^Cantidad: (\d+)(?: · (.*))?$/.exec(i.nota.trim());
  if (!m) return i;
  const n = { ...i, cantidad: clamp(parseInt(m[1], 10)), extra: m[2] };
  return { ...n, nota: textoNota(n) };
}

export const getLista = () => read<ItemLista[]>(KEY, []).map(migrar);
export const setLista = (l: ItemLista[]) => write(KEY, l);
/** Agrega la línea (producto + presentación) o, si ya existe, actualiza su cantidad. */
export function agregarOActualizar(item: ItemLista) {
  const l = getLista();
  const k = claveDe(item);
  setLista(l.some((i) => claveDe(i) === k) ? l.map((i) => (claveDe(i) === k ? { ...i, cantidad: item.cantidad, nota: item.nota } : i)) : [...l, item]);
}
/** Cambia cantidad y/o presentación de una línea; si la nueva presentación ya existe, las fusiona. */
export function actualizar(clave: string, cambio: { cantidad?: number; presentacion?: string }) {
  let l = getLista();
  const cur = l.find((i) => claveDe(i) === clave);
  if (!cur) return;
  const nuevo: ItemLista = { ...cur, ...cambio };
  nuevo.cantidad = clamp(nuevo.cantidad ?? 1);
  nuevo.nota = textoNota(nuevo);
  const k2 = claveDe(nuevo);
  const otro = k2 !== clave ? l.find((i) => claveDe(i) === k2) : undefined;
  if (otro) { nuevo.cantidad = clamp((otro.cantidad ?? 1) + nuevo.cantidad); nuevo.nota = textoNota(nuevo); l = l.filter((i) => i !== otro); }
  setLista(l.map((i) => (claveDe(i) === clave ? nuevo : i)));
}
export const quitarLinea = (clave: string) => setLista(getLista().filter((i) => claveDe(i) !== clave));
export const getPerfil = () => read<Perfil>(PERFIL, { nombre: '', ciudad: '' });
export const setPerfil = (p: Perfil) => write(PERFIL, p);
