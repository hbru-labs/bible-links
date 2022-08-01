import test from 'ava';
import sanitizePunctuations from '../src/lib/utils/sanitizePunctuations';

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
