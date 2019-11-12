window.log = console.log

let sock

let userPanel = {
	$: $('#userPanel'),
	$username: $('#userPanel').find('[name=username]'),
	$password: $('#userPanel').find('[name=password]'),
	$connect: $('#userPanel').find('[name=connect]'),
	get username() { return this.$username.val() },
	get password() { return this.$password.val() },
	login(){
		let { username, password } = this
		// console.log(username,password)
		sock = new Sock()
		sock.login(username, password)
	},
	show() { this.$.show() },
	hide() { this.$.hide() },
	toggle() { this.$.toggle() },
}
userPanel.$connect.on('click', (e)=>{
	userPanel.login()
})



class Sock {
	constructor() {

	}

	login(username, password) {
		this.username = username
		this.password = password

		let { protocol, hostname } = location
		let url = `${protocol}//${hostname}`

		let s = this.s = new io(url, {
			reconnection: false,
			transports: ['websocket'],
			forceNew: true,
		})

		s.on('connect', (e) => {
			s.emit('login', username, password, (user) => {
				if (user) {
					this.user = s.user = user
					this.synchronize('project')
				}
				log('登录' + (user ? '成功' : '失败'))
			})
		})
	}

	synchronize(name){
		log(name, '同步开始')
		this.s.emit('synchronize', name, function (b) {
			b = b ? '成功' : '失败'
			log(name, '同步'+b)
		})
	}
}