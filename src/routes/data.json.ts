import type { RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/services/redis';

const BASE_URL = 'https://bible-api.com';

export const post: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const key = `${req.pathname}-${req.query || ''}`;
	// check whether request was cached
	const cached = await client.get(key);
	if (cached) {
		return {
			body: {
				...JSON.parse(cached),
				cached: true
			}
		};
	}

	const url = `${BASE_URL}/${req.pathname}${req.query}`;
	const result = await fetch(url).then((r) => r.json());
	// cache result
	await client.set(key, JSON.stringify(result));

	return {
		body: result
	};
};
