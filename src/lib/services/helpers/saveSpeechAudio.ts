import { bucketName } from '$lib/utils/constants';
import logger from '$lib/utils/logger';
import storage from '../storage';
import getSignedURL from './getSignedURL';

// const fullBucketName = `gs://${storage.bucket(bucketName).name}`;

export default async function saveSpeechAudio(path: string, audioContent: string | Uint8Array) {
	const bucketFile = storage.bucket(bucketName).file(path);

	const payload = Buffer.from(audioContent);
	logger.info({ payload });

	await bucketFile.save(payload, {
		metadata: {
			cacheControl: 'public,max-age=31536000',
			source: 'Google Text-to-Speech'
		},
		contentType: 'audio/mpeg'
	});

	const signedURL = await getSignedURL(bucketFile);

	return { uri: bucketFile.cloudStorageURI, signedURL };
}
