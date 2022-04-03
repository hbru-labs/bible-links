import type { RequestHandler } from '@sveltejs/kit';

const BASE_URL = 'https://bible-api.com';

export const post: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const url = `${BASE_URL}/${req.pathname}${req.query}`;
	const result = await fetch(url).then((r) => r.json());

	return {
		body: result
	};
};
