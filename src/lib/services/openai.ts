import { getSecret } from '$lib/utils/secret';

export async function textCompletion(text: string) {
	const secret = await getSecret('openai');
	const URL = 'https://api.openai.com/v1/completions';

	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + secret
		},
		body: JSON.stringify({
			model: 'text-davinci-002',
			prompt: `Correct this to standard English: ${text}`,
			temperature: 0,
			max_tokens: 60,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0
		})
	}).then((r) => r.json());

	return response;
}
