const { log } = console

function timeout(v, ms = 500) {
	return new Promise((y, n) => {
		setTimeout(() => {
			y(v + '_')
		}, ms);
	})
}



!function () {
	timeout(100).then((v) => {
		log(v)
		return timeout(v)
	}).then(log)
}



async function afn(v) {
	await timeout()
	return v
}



!async function () {
	log('start')
	await afn(200).then((v) => {
		return timeout(v)

	}).then(log)
	log('end')
}




!async function () {
	let o = timeout(1000)

	let oc = o.catch((v) => {
		return timeout(2000)
	})

	let ot = o.then((v) => {
		log(o, ot, oc)
		return timeout('next', 2000)
	})

	let ott = ot.then((v) => {
		log(o, ot, ott, otc)
	})
	let otc = ot.catch(v => {
		warn(o, ot, ott, otc)
	})

	return timeout('finish', 2000)

}
// ().then(log)



!function () {
	Promise.resolve('A').then(async function (v) {
		log(v)
		await timeout(null, 2000)
		return 'B'
	}).then(log)
}




!function () {
	new Promise(async function (y, n) {
		log('start')// new时直接运行
		let v = await timeout('C', 2000)// 获取该值需要2秒
		y(v)// 2秒后运行
	}).then(log)
}



!function () {

	function chain(fns, name = 'default') {

		function nameToArray(name) {
			if (!Array.isArray(chain.fns[name])) {
				return chain.fns[name] = []
			}
			return chain.fns[name]
		}

		async function run(fns) {
			let fn
			while (fn = fns.shift()) {
				log(await fn())
			}
			chain.running = false
		}

		// main
		{
			let _fns = nameToArray(name)
			_fns = _fns.concat(fns)
			log(_fns)
			if (chain.running === false) run(_fns)
		}
	}
	Object.defineProperty(chain, 'fns', { value: { default: [] } })
	Object.defineProperty(chain, 'clear', { value() { this.fns = [] } })
	chain.running = false








	chain([timeout.bind(null, 1, 1000), timeout.bind(null, 2, 2000)], 'mama')
	// log(chain.clear())
	setTimeout(() => {
		chain([timeout.bind(null, 1, 1000), timeout.bind(null, 2, 2000)], 'mama')
	}, 1000);





}


!async function () {



	let fns = []
	let p
	let v
	let running = false
	function add(fn, ...args) {
		if (typeof fn !== 'function') return;
		fns.push({fn, args})
		if (!running) {
			run()
			running = true
		}
		// log('add', fns)
	}
	async function run() {
		let o
		while (o = fns.shift()) {
			let {fn, args} = o
			log('run', fn)
			v = await afn(v, fn, args)
		}
		running = false
	}

	function afn(value, fn, args){
		return new Promise((resolve,reject)=>{
			return p = Reflect.apply(fn, {value, resolve, reject}, args)
		})
	}

	add(function (a,b,c){
		// this.value
		// this.resolve
		log('fn1', a,b,c, this.value, p)
		setTimeout(this.resolve, 2000, true)
	}, 1,2,3)

	add(function (a) {
		log('fn2', a, this.value, p)
		setTimeout(this.resolve, 2000, false)
	}, 4)

}()