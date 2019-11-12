var unicodeLetters = 'a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD';

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
	var c = (str + '').charCodeAt(0);
	return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def(obj, key, val, enumerable) {
	Object.defineProperty(obj, key, {
		value: val,
		enumerable: !!enumerable,
		writable: true,
		configurable: true
	});
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + unicodeLetters + ".$_\\d]"));
function parsePath(path) {
	if (bailRE.test(path)) {
		return
	}
	var segments = path.split('.');
	return function (obj) {
		for (var i = 0; i < segments.length; i++) {
			if (!obj) { return }
			obj = obj[segments[i]];
		}
		return obj
	}
}




// test
let { log } = console
let k = parsePath('a.b.c')

let o = {
	a: {
		b: {
			c: 3,
			d: 4,
		}
	}
}

log(k(o))