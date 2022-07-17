import { TextToSpeechLanguages } from '../utils/constants';
import crypto from 'node:crypto';
import saveSpeechAudio from './helpers/saveSpeechAudio';
import getSpeechAudio from './helpers/getSpeechAudio';
// import got from 'got';
import { google } from 'googleapis';
// import { initOAuth } from './googleOauth';

type SpeechLanguages = keyof typeof TextToSpeechLanguages;

function hasError(r: any): r is { error: any } {
	return r.error !== undefined;
}

const texttospeech = google.texttospeech({
	version: 'v1',
	auth: process.env.GOOGLE_API_KEY
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
	// await initOAuth(['https://www.googleapis.com/auth/cloud-platform']);

	const result = await texttospeech.text
		.synthesize({
			requestBody: {
				input: { text },
				voice: { languageCode, ssmlGender: 'NEUTRAL' },
				audioConfig: { audioEncoding: 'MP3' }
			}
		})

		// send a post request to google text to speech api
		// const result = await got('https://texttospeech.googleapis.com/v1/text:synthesize', {
		// 	method: 'POST',
		// 	headers: {
		// 		Authorization: `Bearer ${process.env.GOOGLE_ADC}`,
		// 		'Content-Type': 'application/json; charset=utf-8'
		// 	},
		// 	json: {
		// 		input: { text },
		// 		voice: { languageCode, ssmlGender: 'NEUTRAL' },
		// 		audioConfig: { audioEncoding: 'MP3' }
		// 	}
		// })
		.then((r) => r.data)
		// .json<{ audioContent: string }>()
		.catch((err) => ({ error: err }));

	if (hasError(result)) {
		throw new Error(result.error);
	}

	return saveSpeechAudio(filePath, Buffer.from(result.audioContent, 'base64'));
}
