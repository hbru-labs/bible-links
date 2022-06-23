import { getSecret } from '$lib/utils/secret';
import { Configuration, OpenAIApi } from 'openai';

let client: OpenAIApi | null = null;

function getClient(apiKey: string) {
	if (client) return client;

	const configuration = new Configuration({ apiKey });
	client = new OpenAIApi(configuration);
	return client;
}

export default async function getOpenAI() {
	const secret = await getSecret('openai');
	const client = getClient(secret);

	return {
		client,
		api: getAPI(client)
	};
}

export function getAPI(openai: OpenAIApi) {
	return {
		async textCompletion(text: string) {
			const response = await openai.createCompletion({
				model: 'text-davinci-002',
				prompt: `Correct this to standard English: ${text}`,
				temperature: 0,
				max_tokens: 60,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0
			});

			return response.data;
		}
	};
}
