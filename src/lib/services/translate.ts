import { TranslationServiceClient } from '@google-cloud/translate';

const projectId = 'bible-links-x01';
const location = 'global';

export type TargetLanguageCode =
	| 'en'
	| 'es'
	| 'fr'
	| 'de'
	| 'it'
	| 'ja'
	| 'ko'
	| 'nl'
	| 'pt'
	| 'zh'
	| 'ru';

// Instantiates a client
const translationClient = new TranslationServiceClient({
	projectId: projectId,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY
	}
});

export default async function translate(text: string, target: TargetLanguageCode) {
	// Construct and Run request
	const [response] = await translationClient.translateText({
		parent: `projects/${projectId}/locations/${location}`,
		contents: [text],
		mimeType: 'text/plain',
		sourceLanguageCode: 'en',
		targetLanguageCode: target
	});

	for (const translation of response.translations) {
		console.log(`Translation: ${translation.translatedText}`);
	}
}
