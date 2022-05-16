import type { Handle } from '@sveltejs/kit';
import { client } from '$lib/services/redis';
import { prerendering } from '$app/env';

const redis: Handle = async ({ event, resolve }) => {
	if (!prerendering) {
		const key = 'cached';
		let cached = await client.get(key);

		if (!cached) {
			const value = JSON.stringify(`CACHED: ${new Date().toISOString()}`);
			await client.set(key, value);
			cached = 'RENDERED';
		}
		event.locals['cached-data'] = cached;
	}

	if (/(\/_ah\/redis\/?)$/.test(event.url.pathname)) {
		return Response.redirect(event.url.origin + '/', 303);
	}

	const response = await resolve(event, { ssr: false });
	return response;
};

export default redis;