
let o  =  {
	a: 1,
	b: 2,
}

let p = new Proxy(o, {
	get(o, k, p) {
		
		if(k === 'a') {
			console.log('访问了a')

			return o[k]
		}

	},
	set(o, k, v, p) {



	},

})

p.a


let d = {
	get a() {
		console.log('d访问了a')
		return ;
	},
	set a(v){

	},
	// get b(){

	// },
	// set b(v){

	// }
}


d.a
// d.a = 2


