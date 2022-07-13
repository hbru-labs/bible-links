import { TranslationServiceClient } from '@google-cloud/translate';
import type { TargetLanguageCodeType } from '../utils/types';

const projectId = 'bible-links-x01';
const location = 'global';

export type ITranslation = {
	translatedText: string;
	model: string;
	glossaryConfig: null;
	detectedLanguageCode: TargetLanguageCodeType;
};

const safeJSONParse = (str: string) => {
	try {
		return JSON.parse(str);
	} catch (e) {
		return { private_key: str };
	}
};

// Instantiates a client
const translationClient = new TranslationServiceClient({
	projectId: projectId,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: safeJSONParse(process.env.GOOGLE_PRIVATE_KEY).private_key
	}
});

export default async function translate(text: string, target: TargetLanguageCodeType) {
	// Construct and Run request
	const [response] = await translationClient.translateText({
		parent: `projects/${projectId}/locations/${location}`,
		contents: [text],
		mimeType: 'text/plain',
		sourceLanguageCode: 'en',
		targetLanguageCode: target
	});

	return response.translations;
}
