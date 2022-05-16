import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async function ({ url }) {
	try {
		return {
			body: {
				redis: (await fetch(`${url.origin}/_ah/redis`)).statusText
			}
		};
	} catch (error) {
		return { status: 500, body: error };
	}
};
