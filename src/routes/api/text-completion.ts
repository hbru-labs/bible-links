import getOpenAI from '$lib/services/openai';
import logger from '$lib/utils/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async function ({ request }) {
	const openAI = await getOpenAI();
	const { query } = await request.json();

	let result = await openAI.api.textCompletion(query);
	result = result.replace(/\n/gi, '');
	logger.log({ result });

	return {
		headers: {
			'cache-control': '3600'
		},
		body: { data: result }
	};
};
