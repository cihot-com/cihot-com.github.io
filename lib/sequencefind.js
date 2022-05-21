/* 
a: abc
b: --a--b----c--
*/
function sequenceFind(a, b, ignoreSpaces = true) {
	let regexp = /\s/
	loop: for (let i = 0, { length } = a; i < length; i++) {
		let ac = a[i]
		if (regexp.test(ac)) {
			continue loop
		}
		for (let i = 0, { length } = b; i < length; i++) {
			let bc = b[i]
			if (ac === bc) {
				b = b.slice(i + 1)
				continue loop
			}
		}
		return false
	}
	return true
}