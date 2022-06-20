import { Client, type ClientOptions } from '@elastic/elasticsearch';
import { getSecret } from '../utils/secret';
import logger from '../utils/logger';
import type { ESResponse } from '../utils/types';

export type Index = 'bible';
let client: Client | null = null;

export function getClient(options: ClientOptions) {
	return (client ||= new Client(options));
}

export async function getES() {
	const { cloud_id, password, username } = await getSecret('es');
	const client = getClient({
		cloud: { id: cloud_id },
		auth: { username, password },
		name: 'bible-links'
	});
	return { client, api: getAPI(client) };
}

function getAPI(client: Client) {
	return logger.logMethodCalls({
		/**
		 * Search the bible index
		 */
		async search(index: Index, query: string) {
			const { hits } = await client.search<ESResponse>({
				index,
				body: {
					size: 140,
					query: {
						simple_query_string: {
							query,
							fields: ['text', 'book*', 'translation'],
							default_operator: 'AND'
						}
					}
				}
			});

			return hits.hits;
		}
	});
}
