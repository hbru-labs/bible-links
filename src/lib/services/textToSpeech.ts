import AbortController from 'node-abort-controller';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.AbortController = AbortController;
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { PROJECT_ID, TextToSpeechLanguages } from '../utils/constants';
import safeParseJSON from '../utils/safeParseJSON';
import crypto from 'node:crypto';
// import saveSpeechAudio from './helpers/saveSpeechAudio';
import getSpeechAudio from './helpers/getSpeechAudio';
import { captureException } from './sentryNode';

type SpeechLanguages = keyof typeof TextToSpeechLanguages;

// https://cloud.google.com/text-to-speech/docs/libraries
const client = new TextToSpeechClient({
	projectId: PROJECT_ID,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: safeParseJSON(process.env.GOOGLE_PRIVATE_KEY)
	}
});

export default async function textToSpeech(text: string, lang: SpeechLanguages) {
	const languageCode = TextToSpeechLanguages[lang];
	const textHash = crypto
		.createHash('md5')
		.update(text + languageCode)
		.digest('hex');

	const filePath = `${textHash}.mp3`;

	const existingResult = await getSpeechAudio(filePath);
	if (existingResult) return existingResult;

	// Performs the text-to-speech request
	try {
		const [response] = await client.synthesizeSpeech({
			input: { text },
			// Select the language and SSML voice gender (optional)
			voice: { languageCode, ssmlGender: 'NEUTRAL' },
			// select the type of audio encoding
			audioConfig: { audioEncoding: 'MP3' }
		});
		return response; //saveSpeechAudio(filePath, response.audioContent);
	} catch (error) {
		captureException(error, {
			extra: {
				endpoint: false,
				filename: 'textToSpeech.ts'
			}
		});

		return JSON.stringify(error);
	}
}
