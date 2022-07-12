import { TranslationServiceClient } from '@google-cloud/translate';

const projectId = 'bible-links-x01';
const location = 'global';

// convert the above type to enum
export enum TargetLanguageCode {
	en = 'en',
	es = 'es',
	fr = 'fr',
	de = 'de',
	it = 'it',
	ja = 'ja',
	ko = 'ko',
	nl = 'nl',
	pt = 'pt',
	zh = 'zh',
	ru = 'ru'
}

export type TargetLanguageCodeType = keyof typeof TargetLanguageCode;
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
		private_key: JSON.parse(process.env.GOOGLE_PRIVATE_KEY)
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
