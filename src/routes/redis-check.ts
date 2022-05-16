import type { RequestHandler } from '@sveltejs/kit';
import { client } from '$lib/services/redis';

export const get: RequestHandler = async function () {
	try {
		let redisStatus = 'not-ok';
		const key = 'cache-key';
		redisStatus = await client.get(key).then(() => 'ok');

		return {
			body: {
				redis: redisStatus
			}
		};
	} catch (error) {
		return { status: 500, body: error };
	}
};
