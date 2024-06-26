class StringSplitter {

	constructor(str) {
		this.s = [str]
	}

	init(str) {
		//Object.defineProperty(this, 'originalString', {
		//	set(v) {
		//		if (typeof v === 'string') this._originalString = v
		//	},
		//	get() {
		//		return this._originalString
		//	},
		//	enumerable: true
		//})
		//Object.defineProperty(this, 's', {
		//	set(v) {
		//		if (Array.isArray(v)) this._s = v
		//	},
		//	get() {
		//		return this._s
		//	},
		//	enumerable: true
		//})

		//this.s = [str]
	}

	set originalString(v) {
		if (typeof v === 'string') this._originalString = v
	}
	get originalString() {
		return this._originalString
	}
	set s(v) {
		if (Array.isArray(v)) this._s = v
	}
	get s() {
		return this._s
	}

	clear() {
		this.s.length = 0
	}

	split(delimiter, ignoreFlags, pack) {
		this.s.forEach((e, i, s) => {
			if (typeof e === 'string') {
				let ss = StringSplitter.split(e, delimiter, ignoreFlags, pack)
				s.splice(i, 1, ss)
			}
		})
		let s = []
		this.s.forEach(e => Array.isArray(e) ? s.push(...e) : s.push(e))
		this.s = s
		return this
	}

	static split(str, delimiter, ignoreFlags, pack) {
		//delimiter   RegExp
		let s = []
		let beforeStr = ''
		let afterStr = str
		let b = true
		let hasCallback = typeof pack === 'function'

		delimiter = StringSplitter.formatDelimiter(delimiter, ignoreFlags)

		while (b) {
			b = false
			afterStr.replace(delimiter, (...args) => {
				let matchedAllStr = args[0]//matched all string
				let matchedIndex = args[args.length - 2]//matched index
				b = true
				beforeStr = afterStr.slice(0, matchedIndex)
				if(hasCallback) {
					pack({s, beforeStr, afterStr, matchedAllStr, matchedIndex})
				}else{
					if (beforeStr) s.push(beforeStr)
					s.push(new StringSplitterDelimiter(delimiter, matchedAllStr))
				}
				afterStr = afterStr.substr(matchedIndex + matchedAllStr.length)
				return '';
			})
			if (afterStr === str) b = false
		}
		if (afterStr) s.push(afterStr)
		return s
	}

	static formatDelimiter(delimiter, ignoreFlags = 'gy') {
		if (delimiter instanceof RegExp) {
			/*
			RegExp.prototype.flags:
			g → global     全部匹配。
			i → ignoreCase 忽略大小写。
			m → multiline  多行，只影响【^】和【$】。
			s → dotAll     singleline的意思。这让【.】可以匹配到任何字符如\r\n\u2028\u2029\v\f\u0085，只影响【.】。
			u → unicode    可匹配unicode字符
			y → sticky     紧接着匹配。

			*/
			if (typeof ignoreFlags === 'string' && ignoreFlags.length) {
				let { source, flags } = delimiter
				let flagsNew = flags
				new Set(ignoreFlags).forEach(x=>flagsNew = flagsNew.replace(x, ''))

				StringSplitter.originalDelimiter = delimiter
				StringSplitter.delimiter = new RegExp(source, flags)
			}
			return StringSplitter.delimiter
		}
		StringSplitter.originalDelimiter = delimiter
		StringSplitter.delimiter = delimiter
		return StringSplitter.delimiter
	}

	static json(o) {
		return JSON.stringify(o, (k, v) => {
			if (v instanceof RegExp) return { type: 'regexp', source: v.source }
			return v
		})
	}
}

class StringSplitterDelimiter {
	constructor(delimiter, value) {
		this.delimiter = delimiter
		this.value = value
	}
	toString() {
		return '*'
	}
}


function PathObject(o, d = '/') {
	return new Proxy(o, {
		set(o, k, v) {
			let c = o
			let ks = k.split(d)
			k = ks.pop()
			ks.forEach(k => {
				c = o[k]
				if (c === undefined) {
					c = {}
				}
			})
			if (c === undefined) {
				c = {}
			}
			c[k] = v
		},
		get(o, k) {
			let c = o
			let ks = k.split(d)
			ks.some(k => {
				c = c[k]
				return c === undefined
			})
			return c
		}
	})
}


function extend(to, _from) {
	for (var key in _from) {
		to[key] = _from[key];
	}
	return to
}

function protos(o) {
	let a = []
	if (o === null || o === undefined || o === true || o === false) return a
	let p = o
	while (p = p.__proto__) {
		a.push(p)
	}
	return a
}

function cached(fn) {
	var cache = Object.create(null);
	return (function cachedFn(str) {
		var hit = cache[str];
		return hit || (cache[str] = fn(str))
	})
}

let camelizeRE = /-(\w)/g
let camelize = cached(function (str) {
	return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
})


let hyphenateRE = /\B([A-Z])/g
let hyphenate = cached(function (str) {
	return str.replace(hyphenateRE, '-$1').toLowerCase()
})


let capitalize = cached(function (str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
})

function isObject(obj) {
	return obj !== null && typeof obj === 'object'
}


function looseEqual(a, b) {
	if (a === b) { return true }
	var isObjectA = isObject(a);
	var isObjectB = isObject(b);
	if (isObjectA && isObjectB) {
		try {
			var isArrayA = Array.isArray(a);
			var isArrayB = Array.isArray(b);
			if (isArrayA && isArrayB) {
				return a.length === b.length && a.every(function (e, i) {
					return looseEqual(e, b[i])
				})
			} else if (a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime()
			} else if (!isArrayA && !isArrayB) {
				var keysA = Object.keys(a);
				var keysB = Object.keys(b);
				return keysA.length === keysB.length && keysA.every(function (key) {
					return looseEqual(a[key], b[key])
				})
			} else {
				/* istanbul ignore next */
				return false
			}
		} catch (e) {
			/* istanbul ignore next */
			return false
		}
	} else if (!isObjectA && !isObjectB) {
		return String(a) === String(b)
	} else {
		return false
	}
}

function looseIndexOf(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (looseEqual(arr[i], val)) { return i }
	}
	return -1
}


// transfer object to array
function otoa(o) {
	let a = []
	for (let k in o) {
		try {
			a[k] = o[k]
		} catch (err) {
			console.warn(err)
			console.warn(k, o[k])
		}
	}
	return a
}
// transfer array to object
function atoo(a) {
	return Object.assign({}, a)
}

function group(rows, key = 's') {
	let single = {}, multiple = {}, other = [], r = {}, hasSingle = false, hasMultiple = false, hasOther = false
	for (let e of rows) {
		let k = e[key]
		if (k === undefined) {
			other.push(e)
			if (!hasOther) hasOther = true
		} else if (!Array.isArray(r[k])) {
			r[k] = [e]
			single[k] = e
			if (!hasSingle) hasSingle = true
		} else {
			r[k].push(e)
			delete single[k]
			multiple[k] = r[k]
			if (!hasMultiple) hasMultiple = true
		}
	}
	return { single, multiple, other, hasSingle, hasMultiple, hasOther, key }
}

