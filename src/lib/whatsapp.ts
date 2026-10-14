import { siteConfig } from '../site.config';

export function waLink(text: string, number: string = siteConfig.whatsapp): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export const msgProducto = (producto: string, organizacion: string) =>
  `Hola, quisiera consultar por "${producto}" de ${organizacion}. ¿Está disponible y cómo puedo coordinar el pedido?`;

export const msgOrganizacion = (organizacion: string) =>
  `Hola, quisiera conocer más sobre ${organizacion} y sus productos.`;

export const msgGeneral = () =>
  `Hola, me gustaría recibir información sobre los productos de ${siteConfig.shortName}.`;
