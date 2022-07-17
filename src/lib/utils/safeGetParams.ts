const keysToDefault = {
	translation: 'kjv',
	language: 'en',
	media: 'text'
} as const;

export default function safeGetQS(
	searchParam: URLSearchParams,
	key: keyof typeof keysToDefault
): string | null {
	return searchParam.get(key) || keysToDefault[key];
}
