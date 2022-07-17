import { google } from 'googleapis';

export async function initOAuth(scopes: string[]) {
	const auth = new google.auth.GoogleAuth({
		// Scopes can be specified either as an array or as a single, space-delimited string.
		scopes,
		credentials: {
			client_email: process.env.GOOGLE_CLIENT_EMAIL,
			private_key: process.env.GOOGLE_PRIVATE_KEY
		}
	});
	// Acquire an auth client, and bind it to all future calls
	const authClient = await auth.getClient();
	google.options({ auth: authClient });

	return { auth, authClient };
}
