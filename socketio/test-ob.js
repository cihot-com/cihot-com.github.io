
{

	let o = { a: 1 }


	let _ob_ = {}
	let id =0

	log(o)

	let _o = _ob_[id] = {}
	Reflect.ownKeys(o).forEach(k => {
		let s = Object.getOwnPropertyDescriptor(o, k)
		log(k, s)
		
		Object.defineProperty(_o, k, {
			get(){},
			set(){}
		})
	})

}