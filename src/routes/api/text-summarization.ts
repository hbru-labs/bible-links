import type { RequestHandler } from '@sveltejs/kit';
import crypto from 'node:crypto';
import type { Redis } from '@upstash/redis';
import logger from '$lib/utils/logger';
import getOpenAI from '$lib/services/openai';

const headers = {
	'cache-control': 'public, max-age=3600'
};

export const post: RequestHandler = async function ({ request }) {
	const { text } = await request.json();
	const textHash = crypto.createHash('md5').update(text).digest('hex');

	let redisClient: Redis | null = null;

	try {
		const { redis } = await import('$lib/services/redis');
		const cached = await redis.get<string>(textHash);

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
	let result = await openAI.api.textSummarization(text);
	result = result.replace(/\n/gi, '');

	if (result.startsWith(':')) result = result.substring(1);

	if (result && redisClient) await redisClient.set(textHash, JSON.stringify(result), { ex: 86400 });

	return {
		status: 200,
		headers,
		body: { data: result }
	};
};
