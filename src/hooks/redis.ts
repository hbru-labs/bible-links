import type { Handle } from '@sveltejs/kit';
import { client } from '$lib/services/redis';
import { prerendering } from '$app/env';

const redisHook: Handle = async ({ event, resolve }) => {
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

	const response = await resolve(event);
	return { ...response };
};

export default redisHook;
