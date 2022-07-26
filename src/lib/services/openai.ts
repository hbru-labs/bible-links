import { getSecret } from '$lib/utils/secret';
import { Configuration, OpenAIApi, type CreateCompletionResponse } from 'openai';
import logger from '../utils/logger';

let client: OpenAIApi | null = null;

function getClient(apiKey: string) {
	if (client) return client;

	const configuration = new Configuration({ apiKey });
	client = new OpenAIApi(configuration);
	return client;
}

export default async function getOpenAI() {
	const { api_key } = await getSecret('openai');
	const client = getClient(api_key);

	return {
		client,
		api: getAPI(client)
	};
}

export function getAPI(openai: OpenAIApi) {
	return logger.logMethodCalls({
		async textCompletion(text: string) {
			const response = await openai
				.createCompletion({
					model: 'text-davinci-002',
					prompt: `Correct this to standard English: ${text}`,
					temperature: 0,
					max_tokens: 60,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0
				})
				.catch((error) => {
					logger.error(error);
					return { data: error };
				});

			return response.data.error ? '' : (response.data as CreateCompletionResponse).choices[0].text;
		},
		async textSummarization(text: string) {
			const response = await openai
				.createCompletion({
					model: 'text-davinci-002',
					prompt: `${text}.\n\nTl;dr`,
					temperature: 0.5,
					max_tokens: 60,
					top_p: 1,
					frequency_penalty: 0,
					presence_penalty: 0
				})
				.catch((error) => {
					logger.error(error);
					return { data: error };
				});

			return response.data.error ? '' : (response.data as CreateCompletionResponse).choices[0].text;
		}
	});
}
