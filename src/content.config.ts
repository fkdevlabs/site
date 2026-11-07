import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Paket som visas på /paket/ och kan väljas i beställningsformuläret.
const paket = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/paket' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    price: z.number(),
    pricePrefix: z.string().optional(),
    priceSuffix: z.string().default('exkl. moms'),
    monthly: z.number().optional(),
    delivery: z.string().optional(),
    features: z.array(z.string()).default([]),
    popular: z.boolean().default(false),
    buttonText: z.string().default('Beställ'),
    order: z.number().default(100),
  }),
});

// Kundcase / referensarbeten.
const arbeten = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/arbeten' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    industry: z.string(),
    year: z.number(),
    url: z.string().optional(),
    image: z.string().default('/images/placeholder-case.svg'),
    excerpt: z.string(),
    tags: z.array(z.string()).default([]),
    results: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    quote: z.string().optional(),
    quoteBy: z.string().optional(),
    featured: z.boolean().default(true),
    order: z.number().default(100),
  }),
});

export const collections = { paket, arbeten };
