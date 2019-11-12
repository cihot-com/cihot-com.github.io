


function PathObject(o,d='/') {
	return new Proxy(o, {
		set(o, k, v) {
			let c = o
			let ks = k.split(d)
			k = ks.pop()
			ks.forEach(k=>{
				c = o[k]
				if(c === undefined) {
					c = {}
				}
			})
			if(c === undefined ) {
				c = {}
			}
			c[k] = v
		},
		get(o, k) {
			let c = o
			let ks = k.split(d)
			ks.some(k=>{
				c = c[k]
				return c === undefined
			})
			return c
		}
	})
}


let o = {a:{b:'A/B'}}
let po = new PathObject(o)

console.log(po['a/b'], o)
console.log(po['a/c/d/g'], o)

po['c'] = 'C'
console.log(po['a/d'], o)

