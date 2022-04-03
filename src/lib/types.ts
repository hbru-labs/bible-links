export interface Verse {
	book_id: string; // e.g. 'JHN';
	book_name: string; // e.g. 'John';
	chapter: number;
	verse: number;
	text: string; // 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life';
}

export interface JSON_DATA {
	reference: string; // e.g. 'John 3:16';
	verses: Verse[];
	text: string; // same as text above
	translation_id: string; // 'kjv';
	translation_name: string; // 'King James Version';
	translation_note: string; // 'Public Domain';
}
