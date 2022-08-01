export default function sanitizePunctuations(text: string) {
	// add appropriate space between words having punctuations using regex
	return text.replace(/([a-zA-Z_][\w])([?!.;,])([\w])/g, '$1$2 $3');
}
