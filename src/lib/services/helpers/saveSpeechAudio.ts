import { BUCKET_NAME, CONSTRUCT_PATH } from '$lib/utils/constants';
import storage from '../storage';
import getSignedURL from './getSignedURL';

export default async function saveSpeechAudio(path: string, audioContent: string | Uint8Array) {
	const bucketFile = storage.bucket(BUCKET_NAME).file(CONSTRUCT_PATH(path));

	const payload = Buffer.from(audioContent);

	await bucketFile.save(payload, {
		metadata: {
			cacheControl: 'public,max-age=31536000',
			source: 'Google Text-to-Speech'
		},
		contentType: 'audio/mpeg'
	});

	return getSignedURL(bucketFile);
}
