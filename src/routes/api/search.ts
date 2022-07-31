import type { RequestHandler } from '@sveltejs/kit';
import { getES } from '$lib/services/elasticsearch';
import logger from '$lib/utils/logger';
import got from 'got';

export const POST: RequestHandler = async function ({ url }) {
	const query = url.searchParams.get('q');
	if (!query) {
		return {
			body: { error: { message: 'Missing query' } }
		};
	}

	const { data: standardizedQuery } = await got(url.origin + '/api/text-completion', {
		method: 'POST',
		json: { query }
	})
		.json<{ data: string }>()
		.catch((error) => {
			logger.error('E: getting text completion', error);
			return { data: query };
		});

	logger.log({ standardizedQuery });

	// search elasticsearch api
	const { api } = await getES();
	const searchResultsPromise = [];
	if (standardizedQuery) {
		searchResultsPromise.push(api.search('bible', standardizedQuery));
	}
	if (query !== standardizedQuery) {
		searchResultsPromise.push(api.search('bible', query));
	}
	const [res1, res2 = []] = await Promise.all(searchResultsPromise);

	return {
		headers: {
			'cache-control': 'public, max-age=3600'
		},
		body: { data: JSON.stringify(res1.concat(res2)) }
	};
};
