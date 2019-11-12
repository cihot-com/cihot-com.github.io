const { debug } = console

let url = `${location.hostname}:3000/ns1`
let ns = io(url, {
	// path:'/sio3000',
	reconnection: true,
	reconnectionAttempts: Infinity,
	reconnectionDelay: 5000,
	reconnectionDelayMax: 5000,
	policyPort: 3000,
	transports: ['websocket'],
	// timestampRequests: true,
	// timestampParam: 'tsr',
})


ns.on('message', function (...e) {
	debug('message', ...e)
})

ns.send(1)
ns.send(2, 2)
ns.send(3, 3, 3)
ns.send(3, 3, debug)



url = `${location.hostname}:3000`
s = io(url, {
	// path:'/sio3000',
	reconnection: true,
	reconnectionAttempts: Infinity,
	reconnectionDelay: 5000,
	reconnectionDelayMax: 5000,
	policyPort: 3000,
	transports: ['websocket'],
	// timestampRequests: true,
	// timestampParam: 'tsr',
})


s.on('message', function (...e) {
	debug('message', ...e)
})

s.send(1)
s.send(2, 2)
s.send(3, 3, 3)
s.send(3, 3, debug)