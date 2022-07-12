import { TranslationServiceClient } from '@google-cloud/translate';

// Instantiates a client
const translationClient = new TranslationServiceClient();

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
