# classico [![Build Status](https://travis-ci.org/lukeed/classico.svg?branch=master)](https://travis-ci.org/lukeed/classico)

> A tiny (253B) shim for when [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) cannot be used~!

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

### toRegex(str<String>)
Returns: `RegExp`

Converts the given String into a RegExp – used within [`classico.has`](#hasnode-str) and [`classico.replace`](#replacenode-oldclass-newclass).


### has(node<Element>, str<String>)
Returns: `RegExp`

Checks if the Element's `className` contains the class value – akin to `Element.classList.contains()`.


### add(node<Element>, ...str<String>)

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

Remove the class value(s) to the Element's `className` – akin to `Element.classList.remove()`.

```js
let elem = document.body;

// remove one class
classico.remove(elem, 'foo');

// remove multiple classes
classico.remove(elem, 'bar', 'baz');
```


### replace(node<Element>, oldClass<String>, newClass<String>)

Replaces an existing class with a new class – akin to `Element.classList.replace()`.

> **Important:** If `newClass` is not defined then `oldClass` will be removed entirely!


### toggle(node<Element>, str<String>, force<Boolean>)

Toggles the existence of a class for an Element – akin to `Element.classList.toggle()`.

When `force` is not defined, the `str` value will be added if not already and removed if it existed.

If `force` is defined and truthy, the `str` value will be added.<br>
If `force` is defined and falsey, the `str` value will be removed.


## License

MIT © [Luke Edwards](https://lukeed.com)
