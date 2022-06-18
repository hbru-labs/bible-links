import type { RequestHandler } from '@sveltejs/kit';
import { getES } from '$lib/services/elasticsearch';

export const post: RequestHandler = async function ({ url }) {
	const query = url.searchParams.get('q');
	if (!query) {
		return {
			body: { error: { message: 'Missing query' } }
		};
	}

	// search elasticsearch api
	const { api } = await getES();
	const response = await api.search('bible', query);

	return {
		body: { data: JSON.stringify(response) }
	};
};
