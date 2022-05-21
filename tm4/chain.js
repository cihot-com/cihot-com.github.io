class Chain {
	constructor(d) {
		this.init(d)
	}

	init(result) {
		this.promise = Promise.resolve(this)
		this.to(result)
		return this
	}

	//afn(af, ...args) {
	//	const chain = this
	//	chain.promise = chain.promise.then(() => {
	//		return af(chain, ...args).then((result) => {
	//			chain.result = result
	//			chain.error = null
	//			return chain
	//		}, (error) => {
	//			chain.error = error.message
	//			//chain.error = error instanceof Error ? error.message : error
	//			return Promise.reject(chain.error)
	//		})
	//	})
	//	//ignore PromiseRejectionHandledWarning
	//	//chain.promise.catch(chain.promiseRejectionHandle)
	//	return chain
	//}
	afn(af, ...args) {
		const chain = this
		chain.promise = chain.promise.then(async () => {
			try {
				chain.result = await af(chain, ...args)
				chain.error = null
				return chain
			} catch (err) {
				chain.error = err.message
				return chain.error
			}
		})
		//ignore PromiseRejectionHandledWarning
		chain.promise.catch(chain.promiseRejectionHandle)
		return chain
	}

	//!!Not recommended for use
	gfn(gf, f, ...args) {
		let x = gf()
		let eg
		while (eg = x.next()) {
			let { value, done } = eg
			if (done) {
				break
			} else {
				this.to(f, value, ...args)
			}
		}
		return this
	}

	fn(f, ...args) {
		const chain = this
		chain.promise = chain.promise.then((T) => {
			return Chain.cp(chain, f, ...args)
		})
		//ignore PromiseRejectionHandledWarning
		//chain.promise.catch(chain.promiseRejectionHandle)
		return chain
	}

	p(p) {
		const chain = this
		return this.fn((chain, resolve, reject) => {
			p.then((result) => {
				chain.result = result
				chain.error = null
				resolve(result)
			}, (error) => {
				chain.error = error instanceof Error ? error.message : error
				reject(chain.error)
			})
		})

		//return this.afn(async(chain)=>{
		//	try{
		//		chain.result = await p
		//		chain.error = null
		//		return chain.result
		//	}catch(error) {
		//		chain.error = error.message
		//		return chain.error
		//	}
		//})


		//const chain = this
		//chain.error = null
		//chain.promise = chain.promise.then(() => p.then((v) => {
		//	chain.result = v
		//	chain.error = null
		//	return chain
		//}, (v) => {
		//	chain.error = v
		//	return Promise.reject(v)
		//}))
		//return chain



		//chain.promise = chain.promise.then((T) => p.then((v) => {
		//	T.result = v
		//	return T
		//}))
		//return chain

		//chain.promise = chain.promise.then(p.then(
		//	(result) => {
		//		chain.result = result
		//		return Promise.resolve(result)
		//	},
		//	(error) => {
		//		chain.error = error
		//		return Promise.reject(error)
		//	}
		//))
		//return chain
	}

	to(x, ...args) {
		if (Chain.isAsyncFunction(x)) {
			return this.afn(x, ...args)
		} else if (Chain.isGeneratorFunction(x)) {
			return this.gfn(x, ...args)
		} else if (Chain.isFunction(x)) {
			return this.fn(x, ...args)
		} else if (x instanceof Promise) {
			return this.p(x)
		} else {
			//console.log(`%cRequire param instanceof [ AsyncFunction, GeneratorFunction, Function, Promise ].`, 'color:blue')
			return this.afn(async (chain) => {
				chain.error = null
				return x
			})
			//throw new TypeError('Parameter require is a Promise or Function.')
		}
	}

	delay(ms = 1000) {
		this.to((chain, resolve) => {
			setTimeout(() => {
				resolve(chain.result)
			}, ms)
		})
		return this
	}

	afne(af, ...args) {
		const chain = this
		chain.promise = chain.promise.then(
			Chain.pipe,
			async () => {
				chain.result = await af(chain, ...args)
				chain.error = null
				return chain
			})
		return chain
	}

	//!!Not recommended for use
	gfne(gf, f, ...args) {
		const chain = this
		let x = gf()
		let eg
		while (eg = x.next()) {
			let { value, done } = eg
			if (done) {
				break
			} else {
				chain.err(f, value, ...args)
			}
		}
		return chain
	}

	fne(f, ...args) {
		const chain = this
		chain.promise = chain.promise.then(
			Chain.pipe,
			(error) => {
				return Chain.cp(chain, f, ...args)
			})
		return chain
	}

	pe(p) {
		const chain = this
		chain.promise = chain.promise.then(
			Chain.pipe,
			p.then((result) => {
				chain.result = result
				chain.error = null
				return result
			})
				.catch((error) => {
					chain.error = error instanceof Error ? error.message : error
					return Promise.reject(chain.error)
				})
		)
		return chain
	}


	err(x, ...args) {
		if (Chain.isAsyncFunction(x)) {
			return this.afne(x, ...args)
		} else if (Chain.isGeneratorFunction(x)) {
			return this.gfne(x, ...args)
		} else if (Chain.isFunction(x)) {
			return this.fne(x, ...args)
		} else if (x instanceof Promise) {
			return this.pe(x)
		} else {
			//console.log(`%cRequire param instanceof [ AsyncFunction, GeneratorFunction, Function, Promise ].`, 'color:blue')
			return this.pe(Promise.resolve(x))
			//throw new TypeError('Parameter require is a Promise or Function.')
		}
	}

	//For testing
	print() {
		//return this.fne((chain, resolve, reject) => {
		//	this.promise.then(
		//		(v) => {
		//			console.log('[ OK ]', all ? chain : chain.result, { v })
		//			resolve(v)
		//		},
		//		(v) => {
		//			console.log('[ NG ]', all ? chain : chain.error, { v })
		//			reject(Promise.reject(v))
		//		})
		//})
		////print and pipe
		const chain = this
		this.promise = this.promise.then(
			(v) => {
				let { result, error } = chain
				console.log('<print>:', { result, error })
				//return chain.result
				//return Promise.resolve(v)
				return Promise.resolve(chain)
			},
			(v) => {
				let { result, error } = chain
				console.log('<print>!', { error, result })
				//return v//Danger: Ignore Rejected
				//return Promise.reject(v)
				return Promise.reject(chain.error)
			})
		return chain
	}

	promiseRejectionHandle(error) {
		//this === undefined
		console.log('<warn>!', error)
	}

	static pipe(v) { return v }

	static cp(chain, f, ...args) {
		return new Promise((resolve, reject) => {
			function _resolve(result) {
				chain.result = result
				chain.error = null
				resolve(chain)
			}
			function _reject(error) {
				chain.error = error
				reject(chain)
			}
			f(chain, _resolve, _reject, ...args)
		})
	}

	static isPromise(v) { return v instanceof Promise }

	static isFunction(fn) { return fn instanceof Function }

	static isAsyncFunction(fn) {
		return fn instanceof Chain.AsyncFunction
		//return fn[Symbol.toStringTag] === 'AsyncFunction'
	}

	static isGeneratorFunction(fn) {
		return fn instanceof Chain.GeneratorFunction
	}

	static AsyncFunction = (async () => { }).constructor

	static GeneratorFunction = (function* () { }).constructor;
}
