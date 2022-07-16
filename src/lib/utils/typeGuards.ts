import { TextToSpeechLanguages } from './constants';

export function isTranslationLang(lang: string): lang is keyof typeof TextToSpeechLanguages {
	return TextToSpeechLanguages[lang] !== undefined;
}
