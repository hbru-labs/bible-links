import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

Sentry.init({
	dsn: 'https://4a08f6618f3c41c895319088ccde9a8c@o1321256.ingest.sentry.io/6577923',

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});

export const transaction = Sentry.startTransaction({
	op: 'test',
	name: 'My First Test Transaction'
});
export const captureException = Sentry.captureException(e);
