import dayjs from '$lib/utils/dayjs';
import logger from '$lib/utils/logger';
import type { File } from '@google-cloud/storage';

export type Expiration = string | number | Date;

export default async function getSignedURL(
	bucketFile: File,
	expires: Expiration = dayjs().add(1, 'day').toDate()
) {
	const [signedURL] = await bucketFile
		.getSignedUrl({
			action: 'read',
			expires
		})
		.catch((e) => {
			logger.error('💥 GCS getSignedURL', { e });
			return [''];
		});

	return signedURL;
}
