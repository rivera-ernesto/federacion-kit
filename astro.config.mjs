// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/site.config.ts';

// Desplegar en una subruta (p. ej. GitHub Pages): BASE_PATH=/mi-repo/ SITE_URL=https://usuario.github.io
const normalizeBase = (/** @type {string} */ b) => {
  const clean = b.trim().replace(/^\/+|\/+$/g, '');
  return clean ? `/${clean}/` : '/';
};

const site = (process.env.SITE_URL || siteConfig.site).replace(/\/+$/, '');
const base = normalizeBase(process.env.BASE_PATH ?? siteConfig.base);

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'never' },
  integrations: [
    sitemap({
      filter: (page) => !/\/(mi-lista|admin)\/$/.test(page),
    }),
  ],
});
