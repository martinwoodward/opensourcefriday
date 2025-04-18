import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const episodes = defineCollection({
  // Load Markdown and MDX files in the `src/content/episodes/` directory.
  loader: glob({ base: './src/content/episodes', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    thumbnailUrl: z.string(),
    videoId: z.string(),
	slug: z.string(),
    // Optional additional fields
    tags: z.array(z.string()).optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { episodes };
