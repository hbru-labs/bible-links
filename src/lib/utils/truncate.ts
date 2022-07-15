export function truncate(text: string, length = 140) {
	return text.length > length ? text.slice(0, length) + '...' : text;
}
