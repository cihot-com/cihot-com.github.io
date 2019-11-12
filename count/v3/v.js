function v(q, opt) {
	let s = document.querySelectorAll(q)
	// return s.length ? Array.from(s) : null

	s = Array.from(s)


	for(let k in opt) {
		console.log(Object.getOwnPropertyDescriptor(opt, k))
	}

	
}


let {log } = console




