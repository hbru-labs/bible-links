export interface BibleDocument {
	testament: string;
	book: string;
	chapter: string;
	verse: string;
	book_verse: string;
	text: string;
	translation: string;
	timestamp: number;
}

export interface ESResponse {
	_id: string;
	_index: string;
	_score: number;
	_source: BibleDocument;
}
