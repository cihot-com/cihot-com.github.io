
class BulkProxy {
	constructor(o) {
		return new Proxy(o, {
			get(o, k, p) {
				let a = o[k]
				if (Array.isArray(a)) {
					a = a[0]
					if (Array.isArray(a)) {
						return a[0][a[1]]
					}
				}
			},
			set(o, k, v, p) {
				let a = o[k]
				if (Array.isArray(a)) {
					a.forEach(e => {
						if (e[2]) {
							if (Array.isArray(v)) {
								e[0][e[1]](...v)
							} else {
								e[0][e[1]](v)
							}
						} else {
							e[0][e[1]] = v
						}
					})
				}
			}
		})
	}
}



// test

// let o1 = {
// 	a: 1,
// 	f(...a) {
// 		let args = a.length ? JSON.stringify(a).slice(1, -1):''
// 		console.log(`> o1.f(${ args })`, this)
// 	}
// }

// let o2 = {
// 	A: 1,
// 	F(...a) {
// 		let args = a.length ? JSON.stringify(a).slice(1, -1):''
// 		console.log(`> o2.f(${ args })`, this)
// 	}
// }

// let bp = new BulkProxy({
// 	setA: [[o1, 'a'], [o2, 'A']],
// 	callFunction: [[o1, 'f', true], [o2, 'F', true]]
// })

// bp.setA = 600
// log(o1.a, o2.A)

// bp.callFunction = '呼叫'