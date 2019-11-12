class Task {
	constructor() {
		this.list = []// Array [ Current, ... ]
		this.current// Object { fn, args, promise }
		this.data// any
		this.pause = false// Boolean
		this.count = 0
		this.oncomplete// function
	}

	// 添加fn和args到list中
	add(fn, args, onerror) {
		if (typeof fn === 'function') {
			if (!Array.isArray(args)) {
				if (args) {
					args = [args]
				} else {
					args = []
				}
			}
			this.list.push({ fn, args, onerror })// add Current
		} else if (fn instanceof Task) {
			fn.pause = true
			this.list = this.list.concat(fn.list)
		}
	}

	run(forcibly = false) {
		if (forcibly) {
			if (this.current) this.current = undefined
			if (this.pause) this.pause = false
		}

		if (this.pause) return;// 防止重复运行
		
		this.pause = false

		if (this.current) {
			if (this.current.promise) return;

			let { current } = this

			let promise = current.promise = new Promise((resolve, reject) => {
				current.resolve = resolve
				current.reject = reject
				current.task = this
				Object.defineProperty(current, 'data', { get() { return this.task.data } })
				Reflect.apply(current.fn, current, current.args)
			})

			promise.then(async (data) => {
				this.data = data
				// this.current.data = data// 不知为什么，无法给current加属性了。
				if(this.list[0]) {
					this.current = undefined
					this.run()
				}else if (typeof this.oncomplete === 'function') {
					await Reflect.apply(this.oncomplete, this.current, [data])
					this.current = undefined
				}
			}).catch((data) => {
				let fn = this.current.onerror
				if (typeof fn === 'function') {
					Reflect.apply(fn, current, [data])
				} else {
					throw new Error(data)
				}
				this.current = undefined
			})
		} else {
			let e = this.list.shift()
			if (e) {
				this.current = e
				this.run()
				this.count++
			}
		}
	}
}
