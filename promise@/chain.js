const { log } = console

function fn1(v, resolve) {
	log(arguments.callee.name, v)
	setTimeout(resolve, 500, (v + 1))
}
function fn2(v, resolve) {
	log(arguments.callee.name, v)
	setTimeout(resolve, 300, (v + 1))
}
function fn3(v, resolve) {
	log(arguments.callee.name, v)
	setTimeout(resolve, 100, (v + 1))
}
function complete(v, resolve) {

}


// 传统编程思路

// Promise.resolve(0).then(function (value) {
// 	return new Promise(function (resolve, reject) {
// 		Reflect.apply(fn1, { value, resolve, reject }, [value, resolve, reject])
// 	})
// }).then(function (value) {
// 	return new Promise(function (resolve, reject) {
// 		Reflect.apply(fn2, { value, resolve, reject }, [value, resolve, reject])
// 	})
// }).then(function (value) {
// 	return new Promise(function (resolve, reject) {
// 		Reflect.apply(fn3, { value, resolve, reject }, [value, resolve, reject])
// 	})
// }).then(function (value) {

// })



// 类编
class Chain {
	constructor(initValue) {
		this.fns = []
		this.running = false
		this.fn
		this.promise = Promise.resolve(initValue)
		this.value = initValue
		this.start()
	}

	add(fn) {
		if (typeof fn === 'function') {
			this.fns.push(fn)
			this.start()
		}
		return this
	}

	start(handle) {
		if (!this.running) {
			this.running = true
			this.promise = this.promise.then(this.next.bind(this))
		}
		if(typeof handle==='function') Reflect.apply(handle, this, [])
		return this
	}

	stop(handle) {
		if (this.running) {
			this.running = false
		}
		if (typeof handle === 'function') Reflect.apply(handle, this, [])
		return this
	}

	clear() {
		if(this.running) this.running=false
		this.fns = []
	}

	next(value) {
		if(this.fns.length) {
			let fn = this.fns.shift()
			this.promise = new Promise((resolve, reject) => {
				Reflect.apply(fn, this, [value, resolve, reject])
			})
			if (this.running) this.promise.then(this.next.bind(this))
		}else{
			this.running = false
		}
		return this.promise
	}
}


// 测试
!function (){
	let c = new Chain(1000)
	log('开始任务')
	c.add(fn1).add(fn2).add(fn3).add((v, next) => { log('任务完成。3秒后添加新任务。'), next(v) })



	setTimeout(() => {
		log('开始新任务，预约1秒后暂时停止任务。')

		setTimeout(() => {
			c.stop(() => log('中途停止。3秒后继续……'))
			setTimeout(() => { c.start() }, 3000);
		}, 1000);


		c.add(fn1).add(fn1).add(fn1).add(fn2).add(fn3).add(() => log('任务结束'))
	}, 3000);

}()
