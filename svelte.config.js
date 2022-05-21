import 'dotenv/config'
import adapter from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

const isProd = process.env.NODE_ENV === 'production';
console.log(`isProd: ${isProd}`);
console.log(`REDIS_URL: ${process.env.REDIS_URL}`);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: isProd? vercel(): adapter(),
		prerender: {
			enabled: false,
		},
		vite: {
			define: { 'process.env': process.env },
		}
	}
};

export default config;
