import { getCollection, type CollectionEntry } from 'astro:content';

export type Org = CollectionEntry<'organizaciones'>;
export type Producto = CollectionEntry<'productos'>;
export type Noticia = CollectionEntry<'noticias'>;

export const categorias = {
  pulpas: 'Pulpas de fruta',
  cacao: 'Cacao',
  harinas: 'Harinas',
  otros: 'Otros',
} as const;

export const disponibilidades = {
  disponible: 'Disponible',
  'por-pedido': 'Por pedido',
  'fuera-de-temporada': 'Fuera de temporada',
} as const;

export const tiposNoticia = {
  noticia: 'Noticia',
  feria: 'Feria',
  evento: 'Evento',
  oportunidad: 'Oportunidad',
} as const;

export async function getOrgs(): Promise<Org[]> {
  return (await getCollection('organizaciones')).sort((a, b) =>
    a.data.nombre.localeCompare(b.data.nombre, 'es'),
  );
}

export async function getProductos(): Promise<Producto[]> {
  const [prods, orgs] = await Promise.all([getCollection('productos'), getOrgs()]);
  const ids = new Set(orgs.map((o) => o.id));
  for (const p of prods) {
    if (!ids.has(p.data.organizacion)) {
      throw new Error(
        `Producto "${p.id}": la organización "${p.data.organizacion}" no existe en src/content/organizaciones/.`,
      );
    }
  }
  return prods.sort((a, b) => a.data.nombre.localeCompare(b.data.nombre, 'es'));
}

export async function getNoticias(): Promise<Noticia[]> {
  return (await getCollection('noticias')).sort(
    (a, b) => b.data.fecha.getTime() - a.data.fecha.getTime(),
  );
}

export async function getGaleria() {
  const [entry] = await getCollection('galeria');
  return entry?.data.items ?? [];
}

export const fechaLarga = (d: Date) =>
  new Intl.DateTimeFormat('es-BO', { dateStyle: 'long', timeZone: 'UTC' }).format(d);

/** Convierte un enlace de YouTube en una URL de incrustación sin cookies. */
export function youtubeEmbed(link: string): string | null {
  try {
    const u = new URL(link);
    let id = '';
    if (u.hostname.includes('youtu.be')) id = u.pathname.slice(1);
    else if (u.pathname.startsWith('/embed/')) id = u.pathname.split('/')[2];
    else id = u.searchParams.get('v') ?? '';
    return /^[\w-]{6,}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}
