import translate, { TargetLanguageCode } from '$lib/services/translate';
import logger from '$lib/utils/logger';
import type { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async function ({ request }) {
	const { text, target } = await request.json();

	if (!TargetLanguageCode[target]) {
		return {
			status: 400,
			error: {
				message: 'Specified target language is not supported'
			}
		};
	}

	if (!text) {
		return {
			status: 400,
			error: {
				message: 'Please specify the text to translate'
			}
		};
	}

	const translation = await translate(text, target).catch((e) => ({
		error: e
	}));

	if ('error' in translation) {
		logger.error('E: translation', translation.error);
		return { status: 500, error: translation.error };
	}

	return {
		body: JSON.stringify({ data: translation })
	};
};
