import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Pages CMS puede guardar la referencia como "rio-claro", "rio-claro.md" o una ruta;
// se normaliza al id del archivo. src/lib/data.ts valida que la organización exista.
const refId = z
  .string()
  .transform((s) => s.split('/').pop()!.replace(/\.md$/, ''));

const organizaciones = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/organizaciones' }),
  schema: z.object({
    nombre: z.string(),
    sigla: z.string(),
    municipio: z.string(),
    departamento: z.string(),
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    descripcion: z.string(),
    fotos: z.array(z.string()).default([]),
    capacidad: z.string(),
    familias: z.number().int().positive(),
    contacto: z.object({
      whatsapp: z.string().regex(/^\d{8,15}$/, 'WhatsApp en formato internacional, solo dígitos'),
      email: z.email(),
      canales: z
        .array(z.object({ nombre: z.string(), url: z.url() }))
        .default([]),
    }),
  }),
});

const productos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/productos' }),
  schema: z.object({
    nombre: z.string(),
    categoria: z.enum(['pulpas', 'cacao', 'harinas', 'otros']),
    organizacion: refId,
    presentaciones: z.array(z.string()).default([]),
    disponibilidad: z.enum(['disponible', 'por-pedido', 'fuera-de-temporada']),
    temporada: z.string().optional(),
    foto: z.string().optional(),
  }),
});

const noticias = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/noticias' }),
  schema: z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    tipo: z.enum(['noticia', 'feria', 'evento', 'oportunidad']),
    resumen: z.string(),
    foto: z.string().optional(),
  }),
});

const galeria = defineCollection({
  loader: glob({ pattern: 'galeria.yaml', base: './src/content/galeria' }),
  schema: z.object({
    items: z.array(
      z.object({
        imagen: z.string(),
        descripcion: z.string(),
        video: z.url().optional(),
      }),
    ),
  }),
});

export const collections = { organizaciones, productos, noticias, galeria };
