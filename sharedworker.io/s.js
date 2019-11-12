importScripts('/lib/socket.io.min.js');

let path = '/socket.io'
let socket = new io(path, {
	transports: ['websocket'],
	reconnection: true,
	query: {
		username: 'ddb'
	}
});

socket.on('connect', () => {
	if(port) port.postMessage({ type: 'connect', id: socket.id, nsp: socket.nsp })
})
socket.on('error', (error) => {
	if(port) port.postMessage({ type: 'error', error })
})
socket.on('disconnect', (e) => {
	if(port) port.postMessage({ type: 'disconnect', id: socket.id, nsp: socket.nsp })
})

socket.on('connect_error', stat.bind(null, 'connect_error'))
socket.on('reconnect_attempt', stat.bind(null, 'reconnect_attempt'))
socket.on('reconnect_error', stat.bind(null, 'reconnect_error'))

socket.on('error', stat.bind(null, 'error'))
socket.on('connect_timeout', stat.bind(null, 'connect_timeout'))
socket.on('reconnect', stat.bind(null, 'reconnect'))
socket.on('reconnecting', stat.bind(null, 'reconnecting'))
socket.on('reconnect_failed', stat.bind(null, 'reconnect_failed'))
