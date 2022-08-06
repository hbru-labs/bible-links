export const HAS_NEW_LINE = ['web', 'oeb-cw', 'oeb-us'];

export function sanitizePunctuations(text: string) {
	// add appropriate space between words having punctuations using regex
	return text.replace(/([a-zA-Z_][\w])([?!.;,])([\w])/g, '$1$2 $3');
}

export function uppercaseFirstChar(paragraphs: string[]) {
	return paragraphs
		.filter((paragraph) => paragraph.length > 0)
		.map((line) => line.replace(/\b\w/, (char) => char.toUpperCase()));
}

export function constructParagraphs(text: string) {
	return uppercaseFirstChar(text.split('\n')).join('\n\n');
}

export function constructSentences(text: string) {
	return text.replace(/\n/g, ' ').split('. ').join('.\n');
}

export default function sanitizeText(text: string, tr: string) {
	const finalOps = (sanitized: string) =>
		HAS_NEW_LINE.includes(tr) ? sanitized : constructSentences(sanitized);

	const sanitized = sanitizePunctuations(text);
	return constructParagraphs(finalOps(sanitized));
}
