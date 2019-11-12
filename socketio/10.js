let { log, warn, info, time, timeEnd, group, groupEnd } = console


function v(k, v) {
	let o = document.getElementById(k)
	if (o === null) return;
	let n = o.tagName
	if (n === 'INPUT') {
		let t = o.type
		if (t === 'checkbox' && t === 'radio') {
			if (v !== undefined) return o.checked = v
			else return o.checked
		} else {
			if (v !== undefined) return o.value = v
			else return o.value
		}
	}
	if (n === 'TEXTAREA') {
		if (v !== undefined) return o.value = v
		else return o.value
	}
	warn(o, k, v)
	return o
}

let s
function connect() {
	// let url = `${location.protocol}//${location.host}`
	let path = v('path')
	s = new io(path, {
		reconnection: false,
		transports: ['websocket'],
	})

	s.on('connect', (e) => {
		log('on', e)
	})
	s.on('reconnection', (e) => {
		log('re', e)
	})
	s.on('disconnect', (e) => {
		log('off', e)
	})
	s.on('message', (...e) => {
		log('msg', ...e)
	})

	s.on('error', (e)=>{ log('error', e) })
	s.on('connect_error', (e) => { log('connect_error', e) })
	s.on('connect_timeout', (e) => { log('connect_timeout', e) })
	s.on('reconnect', (e) => { log('reconnect', e) })
	s.on('reconnect_attempt', (e) => { log('reconnect_attempt', e) })
	s.on('reconnecting', (e) => { log('reconnecting', e) })
	s.on('reconnect_error', (e) => { log('reconnect_error', e) })
	s.on('reconnect_failed', (e) => { log('reconnect_failed', e) })
	s.on('ping', () => { log('ping'); this.pingTime = Date.now() })
	s.on('pong', (ms) => { log('pong', ms, Date.now()-this.pingTime) })
	

	return s
}

function disconnect() {
	s.disconnect()
}

document.addEventListener('click', (e) => {
	let id = e.target.id
	if (id === 'connect') {
		connect()
	} else if (id === 'disconnect') {
		disconnect()
	}
})


connect()



function input(name, type='text'){
	let o = document.createElement('input')
	o.classList.add(type)
	o.type = type
	o.placeholder = o.name = name
	return o
}

window.addEventListener('input', (e) => {
	verify(e.target)
})

function verify(o) {
	let _ = verify.f[o.tagName]
	if(_) {

	}
}
verify.f = {
	INPUT:{
		path(o) {


		}
	}
	
}



