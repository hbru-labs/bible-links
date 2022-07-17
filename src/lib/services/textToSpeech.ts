import { TextToSpeechLanguages } from '../utils/constants';
import crypto from 'node:crypto';
import saveSpeechAudio from './helpers/saveSpeechAudio';
import getSpeechAudio from './helpers/getSpeechAudio';
import { google } from 'googleapis';

type SpeechLanguages = keyof typeof TextToSpeechLanguages;

const googleTextToSpeech = google.texttospeech({
	version: 'v1',
	auth: process.env.GOOGLE_API_KEY
});

function hasError(r: any): r is { error: unknown } {
	return r.error !== undefined;
}

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
	const result = await googleTextToSpeech.text
		.synthesize({
			requestBody: {
				input: { text },
				voice: { languageCode, ssmlGender: 'NEUTRAL' },
				audioConfig: { audioEncoding: 'MP3' }
			}
		})
		.then((r) => r.data)
		.catch((err) => ({ error: err }));

	if (hasError(result)) {
		throw new Error(result.error);
	}
	return saveSpeechAudio(filePath, Buffer.from(result.audioContent, 'base64'));
}
