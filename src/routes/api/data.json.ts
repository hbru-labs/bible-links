import type { RequestHandler } from '@sveltejs/kit';
import type { Redis } from '@upstash/redis';
import type { JSON_DATA } from '$lib/types';

const BASE_URL = 'https://bible-api.com';
const headers = {
	'cache-control': 'max-age=86400'
};

export const post: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const key = `${req.pathname}-${req.query || ''}`;
	let redisClient: Redis | null = null;

	try {
		const { redis } = await import('$lib/services/redis');
		// check whether request was cached
		const cached = await redis.get<JSON_DATA>(key);
		if (cached) {
			return {
				headers,
				body: {
					...cached,
					cached: true
				}
			};
		}

		redisClient = redis;
	} catch (error) {
		console.log('E: reading from redis', error);
	}

	const url = `${BASE_URL}/${req.pathname}${req.query}`;
	const result = await fetch(url).then((r) => r.json());
	// cache the result
	if (result.text) {
		await redisClient?.set(key, JSON.stringify(result));
	}

	return {
		headers,
		body: result
	};
};
