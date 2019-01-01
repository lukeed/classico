# classico [![Build Status](https://badgen.now.sh/travis/lukeed/classico)](https://travis-ci.org/lukeed/classico)

> A tiny (255B) shim for when [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) cannot be used~!

This module exposes three module definitions:

* **ES Module**: `dist/classico.mjs`
* **CommonJS**: `dist/classico.js`
* **UMD**: `dist/classico.min.js`


## Install

```
$ npm install --save classico
```


## Usage

```js
import { remove, toggle } from 'classico';

const $ = document.querySelector.bind(document);

const isOpen = 'menu__open';

$('.menu-nav').onclick = () => {
  toggle(document.body, isOpen);
};

$('.menu-overlay').onclick = () => {
  remove(document.body, isOpen);
};
```


## API

### has(node<Element>, str<String>)
Returns: `Boolean`

Checks if the Element's `className` contains the class value – akin to `Element.classList.contains()`.


### add(node<Element>, ...str<String>)
Returns: `undefined`

Add the class value(s) to the Element's `className` – akin to `Element.classList.add()`.

> **Note:** Classico will not append a className if the Element already contains it.

```js
let elem = document.body;

// add one class
classico.add(elem, 'foo');

// add multiple classes
classico.add(elem, 'foo', 'bar', 'baz');
//=> Only 'bar' & 'baz' were added this time!
```


### remove(node<Element>, ...str<String>)
Returns: `undefined`

Remove the class value(s) to the Element's `className` – akin to `Element.classList.remove()`.

```js
let elem = document.body;

// remove one class
classico.remove(elem, 'foo');

// remove multiple classes
classico.remove(elem, 'bar', 'baz');
```


### replace(node<Element>, oldClass<String>, newClass<String>)
Returns: `undefined`

Replaces an existing class with a new class – akin to `Element.classList.replace()`.

> **Important:** If `newClass` is not defined then `oldClass` will be removed entirely!


### toggle(node<Element>, str<String>, force<Boolean>)
Returns: `Boolean`

Toggles the existence of a class for an Element – akin to `Element.classList.toggle()`.

When `force` is not defined, the `str` value will be added if not already and removed if it existed.

If `force` is defined and truthy, the `str` value will be added.<br>
If `force` is defined and falsey, the `str` value will be removed.

Returns `true` if the class was successfully added to the Element.<br>
Returns `false` if the class was removed from the Element's `className` value.


## License

MIT © [Luke Edwards](https://lukeed.com)
