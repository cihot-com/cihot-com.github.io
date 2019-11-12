class Task {
	constructor() {
		this.list = []// Array [ Current, ... ]
		this.current// Object { fn, args, promise }
		this.data// any
		this.pause = false// Boolean
	}

	// 添加fn和args到list中
	add(fn, args, error) {
		if (typeof fn !== 'function') return false

		if (!Array.isArray(args)) {
			if (args) {
				args = [args]
			} else {
				args = []
			}
		}
		this.list.push({ fn, args, error })// add Current
	}

	run() {
		if (this.pause) return;
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

			promise.then((data) => {
				this.data = data
				// this.current.data = data// 不知为什么，无法给current加属性了。
				this.current = undefined
				this.run()
			}).catch((data) => {
				let fn = this.current.error
				if (typeof fn === 'function') {
					Reflect.apply(fn, current, [data])
				} else {
					throw new Error(data)
				}
				this.current = undefined
				this.list = []
			})
		} else {
			this.current = this.list.shift()
			if (this.current) this.run()
		}
	}

}



void function () {

	let task = new Task({ name: '你好' })

	task.add(function (no) {
		log(no, this.data, '开始啦')
		setTimeout(() => {
			this.resolve('下一个')
		}, 500);
	}, 'No.1')

	task.add(function (no) {
		log(no, this.data, '看哪个resolve先到吧？')
		setTimeout(() => {
			this.resolve(2000)
		}, 500);
		setTimeout(() => {
			this.resolve(20)
		}, 400);
		// this.reject(0)
	}, 'No.2')

	task.add(function (no) {
		log(no, this.data, '先到了')
		this.resolve('ddb1494')
	}, 'No.3')

	task.add(async function (no) {
		setTimeout(() => {
			log(no, this.data, '检测成功')
			this.resolve('金熙栋')
		}, 500)
	}, 'No.4')

	task.add(async function (no) {
		log(no, this.data, '<---昵称')
	}, 'No.5')




	task.run()// 运行 No.1
	task.pause = true
	task.run()// 不继续运行
	task.pause = false
	task.run()// 运行 No.2

}


void function () {
	// 用户登录过程
	let db = [
		{ username: 'user1', password: 'pass1', name: '用户1' },
		{ username: 'user2', password: 'pass2', name: '用户2' },
		{ username: 'user3', password: 'pass3', name: '用户3' },
		{ username: 'user4', password: 'pass4', name: '用户4' },
		{ username: 'user5', password: 'pass5', name: '用户5' },
	]

	function hasUsername(username) {
		// 假设数据库查询数据会延迟
		setTimeout(() => {
			let user = db.find((e) => e.username === username)
			this.resolve(user)
		}, 500)
	}
	function checkPassword(password) {
		// 可以在这个位置手动添加 this.error() 来处理 this.reject()。
		if (this.data) {
			setTimeout(() => {
				let b = this.data.password === password
				if (b) this.resolve(this.data)
				else this.reject('密码错误')
			}, 500);
		} else {
			this.reject('没有用户')
		}
	}
	function passwordError(data) {
		console.error(data, this.data, this.args)
	}
	function login() {
		if (this.data) {
			log('登陆成功')
		} else {
			log('登录失败')
		}
	}

	let task = new Task()

	task.add(hasUsername, 'user1')
	task.add(checkPassword, 'pass11', passwordError)
	task.add(login)

	// 同上
	// task.list = [
	// 	{ fn: hasUsername, args: ['user1'], error() { console.error('没有用户') } },
	// 	{ fn: checkPassword, args: ['user1'], error: passwordError },
	// 	{ fn: hasUsername, args: ['user1'] },
	// ]

	task.run()
}()


// function checkUser(username) {

// }
// [ checkUser, checkPassword, checkPermission, login]