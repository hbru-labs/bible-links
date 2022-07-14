import textToSpeech from '$lib/services/textToSpeech';
import logger from '$lib/utils/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async function ({ request }) {
	const { text } = await request.json();

	if (!text) {
		return {
			status: 400,
			error: {
				message: 'Please specify the text to generate speech for'
			}
		};
	}

	const response = await textToSpeech(text).catch((e) => {
		logger.error('E: textToSpeech', e);
		return { error: e };
	});

	if ('error' in response) {
		return {
			status: 500,
			error: response.error
		};
	}

	return {
		body: { data: 'response' }
	};
};
