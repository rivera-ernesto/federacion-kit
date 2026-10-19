import { siteConfig } from '../site.config';

const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

/**
 * Convierte una ruta interna ("/catalogo/", "/media/x.svg", "media/x.svg#a") en una URL
 * que respeta el `base` configurado. Usar para TODO enlace o recurso interno.
 * Las URLs absolutas (https:, mailto:, tel:, //) se devuelven sin cambios.
 */
export function url(path = '/'): string {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  const m = path.match(/^([^?#]*)(.*)$/)!;
  let p = m[1].replace(/^\/+/, '');
  if (p && !p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
  return `${base}/${p}${m[2]}`;
}

/** Enlace «Cómo llegar» a unas coordenadas, según la plantilla de site.config.ts. */
export function directionsUrl(lat: number, lon: number): string {
  return siteConfig.directionsUrl.replace('{lat}', String(lat)).replace('{lon}', String(lon));
}

/** URL absoluta (para canonical, Open Graph, JSON-LD). */
export function absoluteUrl(path = '/'): string {
  const site = (import.meta.env.SITE || siteConfig.site).replace(/\/+$/, '');
  const u = url(path);
  return /^https?:/i.test(u) ? u : `${site}${u}`;
}
