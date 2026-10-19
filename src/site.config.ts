/**
 * Identidad del sitio. Todo lo que un fork debe cambiar está aquí.
 * Todos los nombres, números y datos son INVENTADOS (sitio de demostración).
 */
export const siteConfig = {
  // Despliegue (se pueden sobreescribir con las variables SITE_URL y BASE_PATH)
  site: 'https://example.org',
  base: '/',

  // Identidad
  name: 'Federación Ejemplo de Productores Amazónicos',
  shortName: 'FEPA Demo',
  tagline: 'Productos del bosque en pie, directo de quienes lo cuidan',
  description:
    'Federación de demostración que reúne a asociaciones de productores de la Amazonía norte de Bolivia: pulpas, cacao silvestre, harinas y castaña.',
  locale: 'es-BO',
  lang: 'es',

  // Contacto (números ficticios, formato internacional sin "+")
  whatsapp: '59170000001',
  email: 'contacto@example.org',
  address: 'Oficina de demostración, Amazonía norte de Bolivia',
  social: {
    facebook: 'https://facebook.com/ejemplo',
    instagram: 'https://instagram.com/ejemplo',
    youtube: '',
  },

  // Formulario de contacto: URL de un servicio de formularios (Formspree, Getform, etc.).
  // Si está vacío, el formulario arma un mensaje de WhatsApp o un correo, sin servidor.
  formEndpoint: '',

  // Panel de edición (Pages CMS). Cambiar por la URL real del repositorio.
  adminUrl: 'https://app.pagescms.org/',

  // Mapa
  map: { center: [-11.0, -66.1] as [number, number], zoom: 7 },
  // Botón «Cómo llegar»: abre la ruta en OpenStreetMap, el mismo mapa abierto del sitio.
  // Alternativa que abre Google Maps (la aplicación, si está instalada), a cambio de pasar por Google:
  // 'https://www.google.com/maps/dir/?api=1&destination={lat},{lon}'
  directionsUrl: 'https://www.openstreetmap.org/directions?to={lat}%2C{lon}',

  // Colores (se aplican como variables CSS)
  colors: {
    forest: '#1f4d3a',
    forestDark: '#143528',
    earth: '#6b4a2f',
    cream: '#f7f1e3',
    asai: '#4b2a5c',
  },
  // Colores del tema oscuro: rellenos con texto blanco (forest, asai) y textos claros
  // sobre fondo oscuro (link, heading, accent). Verificar contraste AA al cambiarlos.
  colorsDark: {
    forest: '#2c6a4f',
    forestDark: '#0c1d15',
    cream: '#181e1a',
    asai: '#6b3f80',
    link: '#8fd1a6',
    heading: '#d6e8cf',
    accent: '#d3b2e6',
  },

  demoNotice: 'Sitio de demostración: nombres y datos inventados. WhatsApp se abre con el mensaje ya escrito y usted elige a quién enviarlo.',
  // En la demostración no hay números reales: WhatsApp se abre sin destinatario.
  // En el sitio real, poner false y usar los números de cada asociación.
  whatsappSinNumero: true,
};

export type SiteConfig = typeof siteConfig;
