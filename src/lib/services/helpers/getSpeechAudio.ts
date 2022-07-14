import { bucketName } from '$lib/utils/constants';
import storage from '../storage';
import getSignedURL from './getSignedURL';

type GetSpeechAudioResponse = Promise<{ uri: URL; signedURL: string } | null>;

export default async function getSpeechAudio(path: string): GetSpeechAudioResponse {
	const bucketFile = storage.bucket(bucketName).file(path);

	const [fileExist] = await bucketFile.exists().catch(() => [false]);

	if (!fileExist) return null;

	const signedURL = await getSignedURL(bucketFile);

	return { uri: bucketFile.cloudStorageURI, signedURL };
}
