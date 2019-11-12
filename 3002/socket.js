let s = new io({
	path: '/sio3002',
	reconnection: false,
	transports: ['websocket'],
	forceNew: true,
})

s.on('connect', function (...a) {
	log('connect', ...a)

	// s.emit('command', `throw new Error('this.conn.remoteAddress')`)
	// let data = {
	// 	username: 'ddb',
	// 	password: shake256('456\0' + s.id, 256)
	// }
	log(this.id, s.id)
	s.emit('login', data, (user) => {
		if (user) {
			s.user = user
			log('<login>','登录成功')
			ui.loginForm.hide()
		}else{
			log('<login>','登录失败')
		}
	})
})

s.on('error', (message) => {
	error('[error]', message)
})

s.on('message', (...args)=>{
	log('[message]', ...args)
})

s.on('disconnect', (...a) => {
	error('disconnect', a)
	ui.loginForm.show()
})

// if(this===undefined) module.exports = s
// s.on('message_error', () => { error('[message_error]') })// 好像没有
// s.on('connect_error', (err) => { warn('connect_error', err) })
// s.on('connect_timeout', (...a)=>{ warn('connect_timeout', a) })
// s.on('reconnect', (attempt) => { warn('reconnect', attempt) })
// s.on('reconnect_attempt', (attempt) => { warn('reconnect_attempt', attempt) })
// s.on('reconnecting', (attempt)=>{ warn('reconnecting', attempt) })
// s.on('reconnect_error', (err)=>{ warn('reconnect_error', err) })
// s.on('reconnect_failed', ()=>{ warn('reconnect_failed') })
// s.on('ping', ()=>{ warn('ping') })
// s.on('pong', (ms)=>{ warn('pong', ms) })


