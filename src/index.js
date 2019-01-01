function toRegex(str) {
	return new RegExp('(^|\\s+)' + str + '(?=\\s|$)');
}

export function has(node, str) {
	return toRegex(str).test(node.className);
}

export function add(node) {
	for (var i=1; i < arguments.length; i++) {
		has(node, arguments[i]) || (node.className += ' ' + arguments[i]);
	}
}

export function remove(node) {
	for (var i=1; i < arguments.length; i++) {
		replace(node, arguments[i]);
	}
}

export function toggle(node, str, bool) {
	bool = bool == null ? !has(node, str) : bool;
	(bool ? add : remove)(node, str);
	return bool;
}

export function replace(node, old, nxt) {
	node.className = node.className.replace(toRegex(old), nxt ? (' '+nxt) : '');
}
