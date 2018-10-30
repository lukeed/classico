const test = require('tape');
const classico = require('../dist/classico');

const isObject = x => Object.prototype.toString.call(x, '[object Object]');
const toElement = str => ({ className: str || '' });

test('exports', t => {
	t.true(isObject(classico), 'exports an Object');

	['add', 'has', 'remove', 'replace', 'toRegex', 'toggle'].forEach(k => {
		t.is(typeof classico[k], 'function', `~> classico.${k} is a function`);
	});

	t.end();
});

test('toRegex', t => {
	let foo = classico.toRegex('foo');
	t.true(foo instanceof RegExp, 'returns RegExp instance');
	t.same(foo.toString(), '/(^|\\s+)foo(?=\\s|$)/', '~> is expected RegExp pattern');

	// regular replace – always remove leadspace
	t.is(' foo bar'.replace(foo, 'NEW'), 'NEW bar');
	t.is('foo bar'.replace(foo, 'NEW'), 'NEW bar');
	t.is('   foo'.replace(foo, 'NEW'), 'NEW');

	t.end();
});

test('has', t => {
	let foo = 'foo';

	['foobar', 'foofoo', 'foo-', 'foo_', 'foo$', 'foo1'].forEach(str => {
		t.false(classico.has(toElement(str), foo), `has(".${str}", "${foo}") ~> false`);
	});

	['foo', '  foo', 'foo  ', ' foo '].forEach(str => {
		let x = toElement(str);
		t.true(classico.has(x, foo), `has(".${str}", "${foo}") ~> true`);
	});

	console.log(' '); // spacer

	let bar = 'ab12CD34';

	['ab12cd34', 'ab12CD345', 'bab12cd34', 'ab12CD34_', 'ab12CD34$', 'Ab12Cd34'].forEach(str => {
		t.false(classico.has(toElement(str), bar), `has(".${str}", "${bar}") ~> false`);
	});

	['ab12CD34', '  ab12CD34', 'ab12CD34  ', ' ab12CD34 '].forEach(str => {
		let x = toElement(str);
		t.true(classico.has(x, bar), `has(".${str}", "${bar}") ~> true`);
	});

	t.end();
});

test('add', t => {
	let foo = toElement();

	classico.add(foo, 'hello');
	t.is(foo.className, ' hello', 'adds className (with leadspace)');

	classico.add(foo, 'hello');
	t.is(foo.className, ' hello', 'does not duplicate existing className');

	classico.add(foo, 'world');
	t.is(foo.className, ' hello world', 'adds additional className correctly');

	console.log(' '); // ---

	let bar = toElement('foo');

	classico.add(bar, 'bar');
	t.is(bar.className, 'foo bar', 'does not overwrite existing className');

	classico.add(bar, 'baz', 'bat');
	t.is(bar.className, 'foo bar baz bat', 'supports variadic className assignment');

	t.end();
});

test('replace', t => {
	let fn = classico.replace;
	let x = toElement();

	fn(x, 'foo', 'bar');
	t.is(x.className, '', 'does nothing when no match');

	x = toElement('foo bar');
	fn(x, 'foo', 'new');
	t.is(x.className, ' new bar', 'match; adds 1 lead space');

	fn(x, 'new', 'hello');
	t.is(x.className, ' hello bar', 'match; keeps 1 (max) lead space');

	x = toElement(' hello world');
	fn(x, 'hello', 'goodbye');
	fn(x, 'world', 'everyone');
	t.is(x.className, ' goodbye everyone', 'match; replaced multiple');

	console.log(' ');

	x = toElement('foo bar baz');
	fn(x, 'foo');
	t.is(x.className, ' bar baz', 'match; remove item when no replacement');
	fn(x, 'baz');
	t.is(x.className, ' bar', 'match; remove item when no replacement');
	fn(x, 'bar');
	t.is(x.className, '', 'match; remove item when no replacement');

	t.end();
});

test('remove', t => {
	let foo = toElement();

	classico.remove(foo, 'hello');
	t.is(foo.className, '', 'does nothing when not existing');

	let bar = toElement('hello world');
	classico.remove(bar, 'hello');
	t.is(bar.className, ' world', 'removes the className; leaves space');

	classico.remove(bar, 'world');
	t.is(bar.className, '', 'removes the className; empty');

	let baz = toElement('hello world');
	classico.remove(baz, 'hello', 'world');
	t.is(baz.className, '', 'supports variadic className removal');

	t.end();
});

test('toggle', t => {
	let { toggle } = classico;

	let foo = toElement();

	toggle(foo, 'hello');
	t.is(foo.className, ' hello', '(hello) ~> adds the className');

	toggle(foo, 'hello');
	t.is(foo.className, '', '(hello) ~> removes the className');

	console.log(' ');

	let bar = toElement('foo bar');

	toggle(bar, 'bar');
	t.is(bar.className, 'foo', '(bar) ~> removes existing className');

	toggle(bar, 'foo');
	t.is(bar.className, '', '(foo) ~> removes existing className');

	toggle(bar, 'bar');
	t.is(bar.className, ' bar', '(bar) ~> reapplies className');

	console.log(' ');

	let baz = toElement('howdy');

	toggle(baz, 'howdy', true);
	t.is(baz.className, 'howdy', '(howdy) ~> does not duplicate existing className');

	toggle(baz, 'howdy', false);
	t.is(baz.className, '', '(howdy) ~> force-remove className via toggle');

	toggle(baz, 'howdy', false);
	t.is(baz.className, '', '(howdy) ~> force-remove does nothing when className not present');

	toggle(baz, 'howdy');
	t.is(baz.className, ' howdy', '(howdy) ~> adds className once again');

	t.end();
});
