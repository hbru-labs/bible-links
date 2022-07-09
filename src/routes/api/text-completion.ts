import getOpenAI from '$lib/services/openai';
import type { RequestHandler } from '@sveltejs/kit';
import type { Redis } from '@upstash/redis';
import crypto from 'node:crypto';
import logger from '$lib/utils/logger';

export const post: RequestHandler = async function ({ request }) {
	const { query } = await request.json();
	const queryHash = crypto.createHash('md5').update(query).digest('hex');

	let redisClient: Redis | null = null;

	try {
		const { redis } = await import('$lib/services/redis');
		const cached = await redis.get<string>(queryHash);
		if (cached) {
			return {
				body: { data: cached, cached: true }
			};
		}
		redisClient = redis;
	} catch (error) {
		logger.error('E: reading from redis', error);
	}

	const openAI = await getOpenAI();
	let result = await openAI.api.textCompletion(query);
	result = result.replace(/\n/gi, '');

	if (result && redisClient) await redisClient.set(queryHash, JSON.stringify(result), { ex: 180 });

	return {
		headers: {
			'cache-control': 'public, max-age=3600'
		},
		body: { data: result }
	};
};
