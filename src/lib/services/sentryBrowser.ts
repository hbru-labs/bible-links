import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
	dsn: 'https://6c1adb024c1a44c79abffe08280eb3af@o1321256.ingest.sentry.io/6577924',
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
	debug: true
});

Sentry.setContext('sentry-browser', {
	date: new Date()
});

setTimeout(() => {
	try {
		throw new Error('Error in setTimeout');
	} catch (e) {
		Sentry.captureException(e);
	}
}, 99);

export const captureException = Sentry.captureException;
