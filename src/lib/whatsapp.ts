import { siteConfig } from '../site.config';

/** Nota que acompaña cada mensaje en la demostración. */
export const NOTA_DEMO =
  '(Mensaje de demostración: este sitio no tiene números reales, así que usted elige a quién enviarlo. En el sitio real, este mensaje llega directo a la asociación o a la federación.)';

/** Enlace de WhatsApp. En la demostración (whatsappSinNumero) abre WhatsApp sin destinatario. */
export function waUrl(number: string, text?: string): string {
  if (siteConfig.whatsappSinNumero) {
    const t = (text ? `${text}\n\n` : '') + NOTA_DEMO;
    return `https://wa.me/?text=${encodeURIComponent(t)}`;
  }
  const q = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${number.replace(/\D/g, '')}${q}`;
}

export function waLink(text: string, number: string = siteConfig.whatsapp): string {
  return waUrl(number, text);
}

export const msgProducto = (producto: string, organizacion: string) =>
  `Hola, quisiera consultar por "${producto}" de ${organizacion}. ¿Está disponible y cómo puedo coordinar el pedido?`;

export const msgOrganizacion = (organizacion: string) =>
  `Hola, quisiera conocer más sobre ${organizacion} y sus productos.`;

export const msgGeneral = () =>
  `Hola, me gustaría recibir información sobre los productos de ${siteConfig.shortName}.`;
