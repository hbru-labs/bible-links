import type { Handle } from '@sveltejs/kit';
import { prerendering } from '$app/env';

// would be used for SSR
const redis: Handle = async ({ event, resolve }) => {
	if (/(\/_ah\/redis\/?)$/.test(event.url.pathname) && !prerendering) {
		const { client } = await import('$lib/services/redis');

		const key = 'cached';
		let cached = await client.get(key);

		if (!cached) {
			const value = JSON.stringify(`CACHED: ${new Date().toISOString()}`);
			await client.set(key, value);
			cached = 'RENDERED';
		}
		event.locals['cached-data'] = cached;

		return Response.redirect(event.url.origin + '/', 303);
	}

	const response = await resolve(event, { ssr: false });
	return response;
};

export default redis;
