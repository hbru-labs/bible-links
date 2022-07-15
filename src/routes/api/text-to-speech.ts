import textToSpeech from '$lib/services/textToSpeech';
import logger from '$lib/utils/logger';
import type { RequestHandler } from '@sveltejs/kit';
import { TextToSpeechLanguages } from '$lib/utils/constants';

export const post: RequestHandler = async function ({ request }) {
	const { text, code } = await request.json();

	if (!text || !TextToSpeechLanguages[code]) {
		return {
			status: 400,
			body: {
				error: {
					message: 'Please specify the text and language code'
				}
			}
		};
	}

	const response = await textToSpeech(text, code).catch((e) => {
		logger.error('E: textToSpeech', e);
		return { error: e };
	});

	if (typeof response === 'string') {
		return {
			headers: {
				'cache-control': 'public, max-age=31536000'
			},
			body: { data: response }
		};
	}

	return {
		status: 500,
		body: { error: response.error }
	};
};
