import type { RequestHandler } from '@sveltejs/kit';
import type { Redis } from '@upstash/redis';
import { type JSON_DATA, TargetLanguageCode, type TargetLanguageCodeType } from '$lib/utils/types';
import translate from '$lib/services/translate';
import got from 'got';

const BASE_URL = 'https://bible-api.com';
const headers = {
	'cache-control': 'max-age=86400'
};

async function getTranslation(text: string, lang: TargetLanguageCodeType) {
	return translate(text, lang)
		.then(([r]) => r.translatedText)
		.catch(() => text);
}

export const post: RequestHandler = async ({ request }) => {
	const req = await request.json();
	const tr = req['translation'];
	const lang = req['language'];

	const englishLang = TargetLanguageCode.en === lang;

	const key = `${req.pathname}-${tr || ''}`;
	let redisClient: Redis | null = null;

	try {
		const { redis } = await import('$lib/services/redis');
		// check whether request was cached
		const cached = await redis.get<JSON_DATA>(key);
		if (cached) {
			if (!englishLang) {
				cached.text = await getTranslation(cached.text, lang);
			}
			return {
				headers,
				body: {
					...cached,
					cached: true
				}
			};
		}

		redisClient = redis;
	} catch (error) {
		console.log('E: reading from redis', error);
	}

	const url = `${BASE_URL}/${req.pathname}?translation=${tr}`;
	const result = await got(url).json<any>(); //((r) => r.json());
	// cache the result
	if (result.text) {
		await redisClient?.set(key, JSON.stringify(result));
		if (!englishLang) {
			result.text = await getTranslation(result.text, lang);
		}
	}

	return {
		headers,
		body: result
	};
};
