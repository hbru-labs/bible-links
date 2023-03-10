import getOpenAI from '$lib/services/openai';
import type { RequestHandler } from '@sveltejs/kit';
import type { Redis } from '@upstash/redis';
import crypto from 'node:crypto';
import logger from '$lib/utils/logger';

const headers = {
	'cache-control': 'public, max-age=3600'
};

export const POST: RequestHandler = async function ({ request }) {
	const { query } = await request.json();
	const queryHash = crypto.createHash('md5').update(`${query}:ask:the-bible_ai`).digest('hex');
	let redisClient: Redis | null = null;

	try {
		const { redis } = await import('$lib/services/redis');
		const cached = await redis.get<string>(queryHash);
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
	const result = await openAI.api.askBibleAI(query);
	if (result && redisClient)
		await redisClient.set(queryHash, JSON.stringify(result), { ex: 86400 });

	return {
		headers,
		body: { data: result }
	};
};
