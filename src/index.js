export function toRegex(str) {
	return new RegExp(`(^|\\s+)${str}(?=\\s|$)`); // cannot lookbehind, mostly no support
}

export function has(node, str) {
	return toRegex(str).test(node.className);
}

export function add(node) {
	var i=1, len=arguments.length;
	for (; i < len; i++) {
		has(node, arguments[i]) || (node.className += ` ${arguments[i]}`);
	}
}

export function remove(node) {
	var i=1, len=arguments.length;
	for (; i < len; i++) {
		replace(node, arguments[i]);
	}
}

export function toggle(node, str, bool) {
	bool = bool == null ? !has(node, str) : bool;
	(bool ? add : remove)(node, str);
}

export function replace(node, old, nxt) {
	node.className = node.className.replace(toRegex(old), nxt ? (' '+nxt) : '');
}
