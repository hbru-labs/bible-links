import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { PROJECT_ID } from '../utils/constants';
import safeParseJSON from '../utils/safeParseJSON';
import crypto from 'node:crypto';
import saveSpeechAudio from './helpers/saveSpeechAudio';
import getSpeechAudio from './helpers/getSpeechAudio';

// https://cloud.google.com/text-to-speech/docs/libraries
const client = new TextToSpeechClient({
	projectId: PROJECT_ID,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: safeParseJSON(process.env.GOOGLE_PRIVATE_KEY)
	}
});

export default async function textToSpeech(text: string) {
	const textHash = crypto.createHash('md5').update(text).digest('hex');
	const existingResult = await getSpeechAudio(textHash);

	if (existingResult) return existingResult;

	// Performs the text-to-speech request
	const [response] = await client.synthesizeSpeech({
		input: { text: text },
		// Select the language and SSML voice gender (optional)
		voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
		// select the type of audio encoding
		audioConfig: { audioEncoding: 'MP3' }
	});

	const result = await saveSpeechAudio(`${textHash}.mp3`, response.audioContent);

	return result;
}
