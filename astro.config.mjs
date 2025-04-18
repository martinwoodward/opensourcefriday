// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/pages/opensourcefriday',
	// Removed base path to run at root
	integrations: [mdx(), sitemap()],
	output: 'static',
});
