function log(...a) {

	let e = document.createElement('div')
	let s = e.style
	s.setProperty('border-top', '2px solid #ccc')
	e.append(a)
	document.body.appendChild(e)
	console.log(...a)
}

function test1() {

	let task = new Task()

	task.add(function (no) {
		log('[test1] 测试开始！', no, this.data)
		setTimeout(() => {
			this.resolve('[test1] 延迟')
		}, 500);
	}, 'No.1')

	task.add(function (no) {
		log('[test1] 测试resolve竞赛', no, this.data)
		setTimeout(() => {
			this.resolve(2000)
		}, 500);
		setTimeout(() => {
			this.resolve(20)
		}, 400);
		// this.reject(0)
	}, 'No.2')

	task.add(function (no) {
		log('[test1] 竞赛结果', no, this.data)
		this.resolve('准备结束')
	}, 'No.3')

	task.add(async function (no) {
		setTimeout(() => {
			log('[test1] 测试结束', no, this.data)
			this.resolve('test1宣告结束！')
		}, 500)
	}, 'No.4')


	// task.run()// 运行 No.1
	// task.pause = true
	// task.run()// 不继续运行
	// task.pause = false
	// task.run()// 运行 No.2

	return task

}


function test2() {
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
			log('[test2]', '查询用户是否存在', Boolean(user))
			this.resolve(user)
		}, 500)
	}
	function checkPassword(password) {
		// 可以在这个位置手动添加 this.error() 来处理 this.reject()。
		log('[test2]', '检查密码是否正确')
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
			log('[test2]', '登陆成功')
		} else {
			log('[test2]', '登录失败')
		}
		this.resolve('本次测试结束')
	}

	let task = new Task()

	task.add(hasUsername, 'user1')
	task.add(checkPassword, 'pass1', passwordError)
	task.add(login)

	// 同上
	// task.list = [
	// 	{ fn: hasUsername, args: ['user1'], error() { console.error('没有用户') } },
	// 	{ fn: checkPassword, args: ['user1'], error: passwordError },
	// 	{ fn: hasUsername, args: ['user1'] },
	// ]

	// task.run()
	return task
}



let task = new Task()
task.add(test2())// test2 task
task.add(test1())// test1 task
task.run()
// setTimeout(() => {
// 	task.run(1)
// }, 400); 



task.oncomplete = function(data){
	log(data)
	console.warn(this.data, this)
}
