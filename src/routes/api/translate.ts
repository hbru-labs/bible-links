import translate from '$lib/services/translate';
import { TargetLanguageCode } from '$lib/utils/types';
import logger from '$lib/utils/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async function ({ request }) {
	const { text, target } = await request.json();

	if (!TargetLanguageCode[target]) {
		return {
			status: 400,
			body: {
				error: {
					message: 'Specified target language is not supported'
				}
			}
		};
	}

	if (!text) {
		return {
			status: 400,
			body: {
				error: {
					message: 'Please specify the text to translate'
				}
			}
		};
	}

	const translation = await translate(text, target).catch((e) => ({
		error: e
	}));

	if ('error' in translation) {
		logger.error('E: translation', translation.error);
		return {
			status: 500,
			body: { error: translation.error }
		};
	}

	return {
		body: JSON.stringify({ data: translation })
	};
};
