function replaceByDict(str, dict, ai=0, bi=1) {
	let ret = ''
	let one = function (str) {
		let ret, a, b, ab
		for (let row of dict) {
			a = row[ai]
			b = row[bi]
			let index = str.indexOf(a)
			if (index === 0) {
				ab = row
				ret += b
				break
			}
		}
		if (ab) {
			ret = b
			str = str.slice(a.length)
		} else {
			ret = str.slice(0, 1)
			str = str.slice(1)
		}
		return { ret, str }
	}

	while (str.length) {
		let o = one(str)
		str = o.str
		ret += o.ret
	}
	return ret
}