export const PROJECT_ID = 'bible-links-x01';
export const BUCKET_NAME = 'text-to-speech-x01';
export const CONSTRUCT_PATH = (path: string) => `files/${path}`;

// supported languages: https://cloud.google.com/text-to-speech/docs/voices
export const TextToSpeechLanguages = {
	en: 'en-US',
	es: 'es-ES',
	fr: 'fr-FR',
	de: 'de-DE',
	it: 'it-IT',
	ja: 'ja-JP',
	ko: 'ko-KR',
	nl: 'nl-NL',
	pt: 'pt-PT',
	ru: 'ru-RU',
	af: 'af-ZA',
	hi: 'hi-IN'
} as const;

export const otherTranslations = Object.entries({
	almeida: 'João Ferreira de Almeida',
	bbe: 'Bible in Basic English',
	kjv: 'King James Version',
	'oeb-us': 'Open English Bible (US Edition)',
	'oeb-cw': 'Open English Bible (Commonwealth Edition)',
	rccv: 'Romanian Corrected Cornilescu Version',
	web: 'World English Bible',
	webbe: 'World English Bible (British Edition)'
});

export const seeOtherTranslationsLabel = {
	en: 'See other translations',
	es: 'Ver otras traducciones',
	fr: 'Voir les autres traductions',
	de: 'Siehe andere Übersetzungen',
	it: 'Vedi altre traduzioni',
	ja: 'その他の翻訳を見る',
	ko: '다른 번역을 보십시오',
	nl: 'Bekijk andere vertalingen',
	pt: 'Veja outras traduções',
	zh: '查看其他翻译',
	ru: 'Смотреть другие переводы',
	af: 'Sien ander vertalings',
	ig: 'Hụ ntụgharị asụsụ ndị ọzọ',
	yo: 'Wo awọn itumọ miiran',
	zu: 'Bona ezinye izinguqulo',
	ur: 'دیگر تراجم دیکھیں',
	he: 'ראה תרגומים אחרים',
	hi: 'अन्य अनुवाद देखें'
};
