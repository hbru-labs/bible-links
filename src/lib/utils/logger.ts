export function Logger() {
	function logMethodCalls<T extends Record<string, (...args: any[]) => unknown>>(obj: T) {
		return new Proxy(obj, {
			get(target, propKey: string) {
				return <P extends unknown[]>(...args: P) => {
					console.debug(`=> ${propKey} called with args:`, args);
					const result = target[propKey](...args);
					console.debug(`<= ${propKey} returned`);
					return result;
				};
			}
		});
	}
	type CustomLogger = typeof console & { logMethodCalls: typeof logMethodCalls };

	return new Proxy(console, {
		get(target, propKey: string) {
			if (propKey === 'logMethodCalls') {
				return logMethodCalls;
			}
			return target[propKey];
		}
	}) as CustomLogger;
}

export default Logger();
