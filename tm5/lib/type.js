function type(o) {
	if(o===null) return 'null'
	if(o===undefined) return 'undefined'
	let p = Object.getPrototypeOf(o)
	if (p) {
		let c = p.constructor
		if (typeof c==='function') {
			let e = /^function ([^\(]+?)\(/iu.exec(c.toString().replace(/\/\*[\s\S]+?\*\//gu, ''))
			return e ? e[1].trim() : typeof o
		}
	}else{
		return 'Object'
	}
	return typeof o
}


