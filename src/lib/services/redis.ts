import Redis from 'ioredis';

export const client = new Redis(
	'rediss://:85fdbebe00d24bbb80a35088185cfbf7@global-fine-fish-30210.upstash.io:30210'
);

client.on('error', function (err) {
	throw err;
});
