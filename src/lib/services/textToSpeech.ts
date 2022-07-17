import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { PROJECT_ID, TextToSpeechLanguages } from '../utils/constants';
import safeParseJSON from '../utils/safeParseJSON';
import crypto from 'node:crypto';
// import saveSpeechAudio from './helpers/saveSpeechAudio';
import getSpeechAudio from './helpers/getSpeechAudio';

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

	// // Performs the text-to-speech request
	const [response] = await client
		.synthesizeSpeech({
			input: { text },
			// Select the language and SSML voice gender (optional)
			voice: { languageCode, ssmlGender: 'NEUTRAL' },
			// select the type of audio encoding
			audioConfig: { audioEncoding: 'MP3' }
		})
		.catch((e) => [JSON.stringify(e)]);

	return response; //saveSpeechAudio(filePath, response.audioContent);
}
