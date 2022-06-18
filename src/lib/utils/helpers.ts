/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
import logger from './logger';

export function logMethodCalls<T extends Record<string, (...args: any[]) => unknown>>(obj: T) {
	return new Proxy(obj, {
		get(target, propKey: string) {
			return <P extends unknown[]>(...args: P) => {
				logger.debug(`=> ${propKey} called with args:`, args);
				const result = target[propKey](...args);
				logger.debug(`<= ${propKey} returned`);
				return result;
			};
		}
	});
}
