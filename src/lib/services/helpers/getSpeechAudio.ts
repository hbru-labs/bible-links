import { BUCKET_NAME, CONSTRUCT_PATH } from '$lib/utils/constants';
import storage from '../storage';
import getSignedURL from './getSignedURL';

export default async function getSpeechAudio(path: string) {
	const bucket = storage.bucket(BUCKET_NAME);
	const bucketFile = bucket.file(CONSTRUCT_PATH(path));

	const [fileExist] = await bucketFile.exists().catch(() => [false]);

	if (!fileExist) return null;

	const signedURL = await getSignedURL(bucketFile);

	return signedURL;
}
