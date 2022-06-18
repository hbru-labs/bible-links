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
	return Object.entries(process.env)
		.filter(([key]) => lower(key).startsWith(name))
		.reduce((acc, [key, value]) => ({ ...acc, [lower(key)]: value }), {}) as K;
}

function lower(t: string) {
	return t.toLocaleLowerCase();
}
