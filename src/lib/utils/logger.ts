import pino, { type LoggerOptions } from 'pino';

interface LoggerParams extends LoggerOptions {
	namespace: string;
}

export const initLogger = (opts: LoggerParams = { namespace: 'app-logger' }) =>
	pino({ name: opts.namespace });

export default initLogger();
