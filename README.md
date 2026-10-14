# Kit web para federaciones de productores

Sitio institucional y comercial, rápido y editable sin código, para una federación de asociaciones de productores: directorio, catálogo, mapa, noticias, galería y consultas de compradores por WhatsApp. Esta versión es una **demostración**: todos los nombres, números y datos son inventados.

Hecho con [Astro](https://astro.build) (sitio estático, sin framework de interfaz), contenido en archivos Markdown/YAML y panel de edición con [Pages CMS](https://pagescms.org).

## Probarlo

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npm run check      # tipos y contenido
```

Para publicarlo en una subruta (por ejemplo GitHub Pages): `SITE_URL=https://usuario.github.io BASE_PATH=/mi-repo/ npm run build`. Todos los enlaces y recursos pasan por `url()` (`src/lib/url.ts`) y respetan esa ruta base.

## Dónde está cada cosa

| Qué | Dónde |
| --- | --- |
| Nombre, WhatsApp, correo, colores, mapa, URL | `src/site.config.ts` |
| Asociaciones, productos, noticias | `src/content/organizaciones`, `productos`, `noticias` (Markdown) |
| Galería | `src/content/galeria/galeria.yaml` |
| Imágenes | `public/media/` |
| Páginas y componentes | `src/pages`, `src/components`, `src/layouts` |
| Estilos (un solo CSS) | `src/styles/global.css` |
| Panel de edición | `.pages.yml` |
| Despliegue | `.github/workflows/deploy.yml` |

## Cómo funciona la "lista de consulta"

No es una tienda: no hay precios ni pagos. La persona agrega productos a una lista (se guarda solo en su navegador), anota cantidades, y el sitio arma un mensaje de WhatsApp por asociación. No hay servidor ni base de datos.

## Formulario de contacto

Si `formEndpoint` en `src/site.config.ts` está vacío, el formulario abre WhatsApp o el correo con el mensaje escrito. Si se pone la URL de un servicio de formularios (Formspree, Getform, etc.), el formulario envía los datos allí.

## Panel de edición (Pages CMS)

1. Subir el repositorio a GitHub.
2. Entrar a <https://app.pagescms.org/>, iniciar sesión con GitHub e instalar la aplicación sobre el repositorio.
3. Invitar a las personas editoras como colaboradoras del repositorio.

Cada guardado crea un cambio en Git y el sitio se vuelve a publicar solo. La página `/admin/` del sitio explica esto a las personas editoras; su enlace sale de `adminUrl` en la configuración.

## Imágenes y licencias

- **Código:** licencia MIT (ver `LICENSE`).
- **Contenido y imágenes de demostración** (textos de `src/content/`, SVG de `public/media/`): CC BY 4.0. Reemplácelos por los suyos.
- Las imágenes de ejemplo se regeneran con `node scripts/make-placeholders.mjs`.
- Los mapas usan teselas de OpenStreetMap (© colaboradores de OpenStreetMap). Para mucho tráfico, use un proveedor de teselas propio o con plan; ver la política de uso de OpenStreetMap.

## Datos de demostración a reemplazar

El video de la galería usa un identificador de ejemplo (`EJEMPLO12345`): cámbielo o bórrelo. Los números de WhatsApp `5917000xxxx` son falsos.

---

## English (for people forking this)

A forkable Astro static site for a federation of producer associations: association directory, product catalog, Leaflet/OpenStreetMap map, news, gallery, and WhatsApp click-to-chat inquiries (plus a localStorage "inquiry list", not a shop). Content lives in Markdown/YAML collections and is editable through Pages CMS. All demo names and data are invented; demo content and images are CC BY 4.0, code is MIT. UI text is in Spanish (Bolivia).

Make it yours in 5 steps:

1. **Edit `src/site.config.ts`**: name, tagline, WhatsApp, email, social links, map center, colors, `site` and `base`.
2. **Replace the content** in `src/content/` and the images in `public/media/` (or delete the demo files first). Schemas are in `src/content.config.ts`.
3. **Connect Pages CMS**: push to GitHub, open <https://app.pagescms.org/>, install it on the repo, invite editors. `.pages.yml` is already configured; set `adminUrl`.
4. **Deploy to a static host**: the included GitHub Actions workflow publishes to GitHub Pages (Settings → Pages → Source: GitHub Actions). Any static host works with `npm run build` and the `dist/` folder; set `SITE_URL` and `BASE_PATH` if you are not at the domain root.
5. **Set your domain**: add it in your host's settings, then update `site` in `src/site.config.ts` (or `SITE_URL`) and the `Sitemap:` line in `public/robots.txt`.
