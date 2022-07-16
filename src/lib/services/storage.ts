import { Storage } from '@google-cloud/storage';
import { PROJECT_ID } from '../utils/constants';
import safeParseJSON from '../utils/safeParseJSON';

const storage = new Storage({
	projectId: PROJECT_ID,
	credentials: {
		client_email: process.env.GOOGLE_CLIENT_EMAIL,
		private_key: safeParseJSON(process.env.GOOGLE_PRIVATE_KEY)
	}
});

export default storage;
