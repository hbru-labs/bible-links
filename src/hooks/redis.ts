import type { Handle } from '@sveltejs/kit';
import { prerendering } from '$app/env';

// would be used for SSR
const prod = process.env.NODE_ENV === 'production';
const redis: Handle = async ({ event, resolve }) => {
	if (/(\/_ah\/redis\/?)$/.test(event.url.pathname) && !prerendering) {
		const { redis } = await import('$lib/services/redis');

		const key = 'cached';
		let cached = await redis.get<string>(key);

		if (!cached) {
			const value = JSON.stringify(`CACHED: ${new Date().toISOString()}`);
			await redis.set(key, value);
			cached = 'RENDERED';
		}
		event.locals['cached-data'] = cached;

		return Response.redirect(event.url.origin + '/', 303);
	}

	const response = await resolve(event, { ssr: prod });
	return response;
};

export default redis;
