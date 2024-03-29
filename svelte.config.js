import 'dotenv/config'
import adapter from '@sveltejs/adapter-node';
import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true,
	}),

	kit: {
		adapter: isProd? vercel(): adapter(),
		prerender: {
			enabled: false,
		},
	}
};

export default config;
