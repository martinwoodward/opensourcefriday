import { defineCollection, z } from 'astro:content';

const episodes = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		thumbnailUrl: z.string(),
		videoId: z.string(),
		slug: z.string(),
		tags: z.array(z.string()).optional(),
		featured: z.boolean().optional().default(false),
	}),
});

export const collections = { episodes };
