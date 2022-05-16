import Redis from 'ioredis';

export const client = new Redis(process.env.REDIS_URL);

client.on('error', function (err) {
	throw err;
});
