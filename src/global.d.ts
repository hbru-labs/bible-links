declare namespace NodeJS {
	export interface ProcessEnv {
		NODE_ENV: 'development' | 'production';
		UPSTASH_REDIS_REST_URL: string;
		REDIS_URL: string;
		REDIS_HOST: string;
		REDIS_PORT: string;
		REDIS_PASSWORD: string;
		UPSTASH_REDIS_REST_TOKEN: string;
		ES_CLOUD_ID: string;
		ES_USERNAME: string;
		ES_PASSWORD: string;
		GOOGLE_CLIENT_EMAIL: string;
		GOOGLE_PRIVATE_KEY: string;
		GOOGLE_ADC: string;
		GOOGLE_API_KEY: string
	}
}
