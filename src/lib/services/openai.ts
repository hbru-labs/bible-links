import { getSecret } from '../utils/secret';
import { Configuration, OpenAIApi, type CreateCompletionResponse } from 'openai';
import logger from '../utils/logger';
import cosineSimilarity from '../utils/cosineSimilarity';

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

const systemMessages = {
	bibleScholar:
		'You are a Bible Scholar, Doctor of the Church, Dominican Order Priest with PhDs in Theology and Philosophy. You can explain Bible concepts in great details with simplicity and finesse, to the understanding of any audience.'
};
const testMessages = {
	user: `How does the Bible explain God's love for us?`,
	assistant: `The Bible explains God's love for us as sacrificial, unconditional, and everlasting. It is a love that surpasses all human understanding and is demonstrated through the death of Jesus Christ on the cross. <a class="underline text-blue-500" href="https://bible-links.vercel.app/John3:16">John 3:16</a> says, "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." This shows that God's love for us is not based on our merit or worthiness, but solely on His grace and mercy towards us.`
};

export function getAPI(openai: OpenAIApi) {
	return logger.logMethodCalls({
		async textCompletion(text: string) {
			const response = await openai
				.createCompletion({
					model: 'text-davinci-002',
					prompt: `Correct the following to standard English: ${text}`,
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
			const prompt = `I want you to act as a Bible Scholar, Doctor of the Church, Dominican Order Priest with PhDs in Theology and Philosophy. You can explain Bible concepts in Great details with simplicity and finesse to the understanding of any audience. You will ensure to preserve the truth in the Gospel and teach hidden meanings not readily apparent to everyday users. When prompted you'll provide a summary with explanation in great detail. Now, summarize the following bible text keeping it brief and less than 144 words: \n\n${text}`;
			const { data } = await openai.createChatCompletion(
				{
					model: 'gpt-3.5-turbo',
					messages: [
						{ role: 'system', content: systemMessages.bibleScholar },
						{ role: 'user', content: prompt }
					],
					temperature: 0.5,
					top_p: 1.0,
					frequency_penalty: 0.0,
					presence_penalty: 1
				},
				{ timeout: 30000, signal: undefined }
			);
			return data.choices[0].message?.content || '';
		},
		async askBibleAI(query: string) {
			const prompt = `
			I want you to act as a Search assistant with great knowledge of the Bible and the English language. 
			You can explain the Bible concepts in great details with simplicity and finesse. 
			You will ensure to preserve the truth in the Gospel and teach hidden meanings not readily apparent to everyday users. 
			Your goal is to expand on the user's query or prompt and provide a relevant response. 
			You will use your deep knowledge of word constructs in English to cater for poorly constructed query/prompt. 
			You will provide relevant Bible references where necessary to delight the user and encourage further learning. 
			You will ensure the references are a link with the format <a class="underline text-blue-500" href="https://bible-links.vercel.app/{book}{chapter}:{verseBegin}-{verseEnd}">{reference}</a>.
			Now, provide an explaination to the following query about the bible: keep it brief and less than 79 words. \n\nQuery: ${query}`;
			const response = await openai
				.createChatCompletion(
					{
						model: 'gpt-3.5-turbo',
						messages: [
							{ role: 'system', content: systemMessages.bibleScholar },
							{ role: 'user', content: testMessages.user },
							{ role: 'assistant', content: testMessages.assistant },
							{ role: 'user', content: prompt }
						],
						temperature: 0.5,
						top_p: 1.0,
						frequency_penalty: 0.0,
						presence_penalty: 1
					},
					{ timeout: 30000, signal: undefined }
				)
				.then(({ data }) => data.choices[0].message?.content || '')
				.catch((error) => {
					logger.error(error);
					return '';
				});
			return response;
		},
		async textSearchEmbedding(text: string, query: string) {
			const searchPromiseDoc = openai.createEmbedding({
				input: text,
				model: 'text-similarity-babbage-001'
			});

			const searchPromiseQuery = openai.createEmbedding({
				input: query,
				model: 'text-similarity-babbage-001'
			});

			const [{ data: _doc }, { data: _query }] = await Promise.all([
				searchPromiseDoc,
				searchPromiseQuery
			]);

			const docEmbedding = _doc.data[0].embedding;
			const queryEmbedding = _query.data[0].embedding;
			const SCORE_MULTIPLIER = 100.0;

			return cosineSimilarity(docEmbedding, queryEmbedding) * SCORE_MULTIPLIER;
		}
	});
}
