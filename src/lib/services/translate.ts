import { TranslationServiceClient } from '@google-cloud/translate';
import type { TargetLanguageCodeType } from '../utils/types';
import { PROJECT_ID } from '../utils/constants';
import safeParseJSON from '../utils/safeParseJSON';

const projectId = PROJECT_ID;
const location = 'global';

export type ITranslation = {
	translatedText: string;
	model: string;
	glossaryConfig: null;
	detectedLanguageCode: TargetLanguageCodeType;
};

// Instantiates a client
const translationClient = new TranslationServiceClient({
	projectId: projectId,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: safeParseJSON(process.env.GOOGLE_PRIVATE_KEY)
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
