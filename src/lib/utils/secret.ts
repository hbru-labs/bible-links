export const secretNames = ['elasticsearch', 'redis', 'upstash'] as const;
export type Secrets = {
	es: {
		username: string;
		password: string;
		cloud_id: string;
	};
	redis: {
		host: string;
		port: string;
		password: string;
		url: string;
	};
};

export async function getSecret<T extends keyof Secrets, K extends Secrets[T]>(
	name: T
): Promise<K> {
	const regex = new RegExp(name + '_', 'igm');
	return Object.entries(process.env)
		.map(([key, value]) => [lower(key), value])
		.filter(([key]) => key.startsWith(name))
		.map(([key, value]) => [key.replace(regex, ''), value])
		.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) as K;
}

function lower(t: string) {
	return t.toLocaleLowerCase();
}
