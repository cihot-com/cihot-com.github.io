let { log, warn, error } = console

// new io(nsp, {path})
let s = new io({
	path: '/sio3001',
	reconnection: false,
	transports: ['websocket'],
	forceNew: true,
})



s.on('connect', function (...a) {
	log('connect', ...a)

	// s.emit('command', `throw new Error('this.conn.remoteAddress')`)
	let data = {
		username: 'ddb',
		password: shake256('123\0' + s.id, 256)
	}
	log(this.id, s.id)
	s.emit('login', data, (user) => {
		if (user) s.user = user
		log('登录', user ? '成功' : '失败')
	})
})

s.on('disconnect', warn)
s.on('connecting', warn)
s.on('reconnect', warn)
s.on('error', (message) => {
	error('[error]', message)
})
s.on('message_error', () => {
	error('[message_error]')
})
s.on('message', (...args)=>{
	log('[message]', ...args)
})


