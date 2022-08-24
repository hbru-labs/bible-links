import type { RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';
import type { Redis } from '@upstash/redis';
import logger from '$lib/utils/logger';
import getOpenAI from '$lib/services/openai';

const headers = {
	'cache-control': 'public, max-age=3600'
};

export const POST: RequestHandler = async function ({ request }) {
	const { text, query } = await request.json();
	const textQueryHash = crypto
		.createHash('md5')
		.update(text + query)
		.digest('hex');

	let redisClient: Redis | null = null;

	try {
		const { redis } = await import('$lib/services/redis');
		const cached = await redis.get<string>(textQueryHash);

		if (cached) {
			return {
				headers,
				body: { data: cached, cached: true }
			};
		}
		redisClient = redis;
	} catch (error) {
		logger.error('E: reading from redis', error);
	}

	const openAI = await getOpenAI();
	const result = await openAI.api.textSearchEmbedding(text, query);

	if (result && redisClient)
		await redisClient.set(textQueryHash, JSON.stringify(result), { ex: 86400 });

	return {
		status: 200,
		headers,
		body: { data: result }
	};
};
