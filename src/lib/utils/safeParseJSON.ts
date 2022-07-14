export default function safeParseJSON(text: string) {
	try {
		return JSON.parse(text);
	} catch (error) {
		return text;
	}
}
