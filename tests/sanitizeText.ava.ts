import test from 'ava';
import sanitizeText, {
	sanitizePunctuations,
	uppercaseFirstChar,
	HAS_NEW_LINE
} from '../src/lib/utils/sanitizeText';

test('correctly sanitizes punctuation between 2 words', (t) => {
	t.is(sanitizePunctuations('hello,world!'), 'hello, world!');
	t.is(sanitizePunctuations('hello;world!'), 'hello; world!');
	t.is(sanitizePunctuations('hello.world!'), 'hello. world!');
	t.is(sanitizePunctuations('hello?world!'), 'hello? world!');
	t.is(sanitizePunctuations('hello!world!'), 'hello! world!');
});

test('only sanitizes on defined punctuations', (t) => {
	t.is(sanitizePunctuations('hello@world!'), 'hello@world!');
	t.is(sanitizePunctuations('hello#world!'), 'hello#world!');
	t.is(sanitizePunctuations('hello&world!'), 'hello&world!');
	t.is(sanitizePunctuations('hello$world!'), 'hello$world!');
	t.is(sanitizePunctuations('hello%world!'), 'hello%world!');
});

test('does not sanitize punctuation between 2 non-words', (t) => {
	t.is(sanitizePunctuations('hello,,world!'), 'hello,,world!');
	t.is(sanitizePunctuations('hello;-world!'), 'hello;-world!');
	t.is(sanitizePunctuations('hello.&world!'), 'hello.&world!');
	t.is(sanitizePunctuations('hello?$world!'), 'hello?$world!');
	t.is(sanitizePunctuations('hello!#world!'), 'hello!#world!');
});

test('can uppercase first character', (t) => {
	t.deepEqual(uppercaseFirstChar(['hello,world!']), ['Hello,world!']);
	t.deepEqual(uppercaseFirstChar(['hello', 'world!']), ['Hello', 'World!']);
});

test('properly constructs a paragraph', (t) => {
	const translation_id = HAS_NEW_LINE[0];
	t.is(sanitizeText('hello,world!', translation_id), 'Hello, world!');
});
