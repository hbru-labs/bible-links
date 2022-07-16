import * as Sentry from '@sentry/node';

Sentry.init({
	dsn: 'https://4a08f6618f3c41c895319088ccde9a8c@o1321256.ingest.sentry.io/6577923',
	tracesSampleRate: 1.0,
	integrations: []
});

Sentry.setContext('sentry-node', {
	date: new Date()
});

export const transaction = Sentry.startTransaction({
	op: 'svelte-kit-server',
	name: 'Sentry Node Transaction'
});

export const captureException = Sentry.captureException;
