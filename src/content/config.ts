import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string().optional(),
  }),
});

export const collections = {
  pages,
};
