import type { RequestHandler } from '@sveltejs/kit';
import type { Redis } from 'ioredis';

const BASE_URL = 'https://bible-api.com';

export const post: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const key = `${req.pathname}-${req.query || ''}`;
	let redisClient: Redis | null = null;

	try {
		const { client } = await import('$lib/services/redis');
		// check whether request was cached
		const cached = await client.get(key);
		if (cached) {
			return {
				body: { ...JSON.parse(cached), cached: true }
			};
		}

		redisClient = client;
	} catch (error) {
		console.log('E: reading from redis', error);
	}

	const url = `${BASE_URL}/${req.pathname}${req.query}`;
	const result = await fetch(url).then((r) => r.json());
	// cache result
	await redisClient?.set(key, JSON.stringify(result));
	return {
		body: result
	};
};
