import test from 'ava';
import sanitizePunctuations from '../src/lib/utils/sanitizePunctuations';

test('correctly sanitizes punctuation between 2 words', (t) => {
	t.is(sanitizePunctuations('hello,world!'), 'hello, world!');
	t.is(sanitizePunctuations('hello;world!'), 'hello; world!');
	t.is(sanitizePunctuations('hello.world!'), 'hello. world!');
	t.is(sanitizePunctuations('hello?world!'), 'hello? world!');
	t.is(sanitizePunctuations('hello!world!'), 'hello! world!');
});
