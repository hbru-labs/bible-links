import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async function ({ url }) {
	const query = url.searchParams.get('q');
	let error: Record<string, string> | undefined;

	if (!query) {
		error = { message: 'Missing query' };
	}

	return {
		body: { query, error }
	};
};
