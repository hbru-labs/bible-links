import type { RequestHandler } from '@sveltejs/kit';
import { getES } from '$lib/services/elasticsearch';
import getOpenAI from '$lib/services/openai';
import logger from '$lib/utils/logger';

export const post: RequestHandler = async function ({ url }) {
	const query = url.searchParams.get('q');
	if (!query) {
		return {
			body: { error: { message: 'Missing query' } }
		};
	}

	// translate the query to standard English (Grammar correction) using OpenAI
	const openAI = await getOpenAI();
	let standardizedQuery = await openAI.api.textCompletion(query);
	standardizedQuery = standardizedQuery.replace(/\n/gi, '');
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
		body: { data: JSON.stringify(res1.concat(res2)) }
	};
};
