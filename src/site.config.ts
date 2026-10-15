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

  // Colores (se aplican como variables CSS)
  colors: {
    forest: '#1f4d3a',
    forestDark: '#143528',
    earth: '#6b4a2f',
    cream: '#f7f1e3',
    asai: '#4b2a5c',
  },

  demoNotice: 'Sitio de demostración: nombres y datos inventados. WhatsApp se abre con el mensaje ya escrito y usted elige a quién enviarlo.',
  // En la demostración no hay números reales: WhatsApp se abre sin destinatario.
  // En el sitio real, poner false y usar los números de cada asociación.
  whatsappSinNumero: true,
};

export type SiteConfig = typeof siteConfig;
