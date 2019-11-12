let COUNT = 0;
let PORTS = new Map();

onconnect = function (e) {
	let port = e.ports[0];
	let id = ++COUNT
	let acks = {}
	let events = {}

	PORTS.set(port, value)

	port.addEventListener('message', function ({ args }) {
		let ack, type, data, argType
		if (Array.isArray(args)) {
			argType = typeof args[0]
			if (argType === 'number') {
				ack = args[0]
				type = args[1]
				data = args.slice(2)
			} else if (argType === 'string') {
				type = args[0]
				data = args.slice(1)
			}
		} else {
			port.postMessage(['error', 'Require an array.', args])
		}
	})

	function on(type, handle) {
		if (!Array.isArray(this.events[type])) {
			this.events[type] = [handle]
		}
		this.events[type].push(handle)
	}
	function off(type, handle) {
		if (Array.isArray(this.events[type])) {
			this.events[type] = this.events[type].filter(e => e !== handle)
		}
	}
	function send(...args) {
		let lastArg = args[-1]
		let lastArgType = typeof lastArg
		if (lastArgType === 'function') {
			let ack = ++this.ack
			this.acks[ack] = lastArg
			this.port.postMessage([ack, 'message', ...args.slice(0, -1)])
		} else {
			this.port.postMessage(['message', args])
		}
	}

	try {
		// 【错误】window is not defined
		// port.postMessage(window ? 'OK' : 'NG')


		// 【错误】document is not defined
		// port.postMessage(document ? 'OK' : 'NG')


		// 注意：var 的变量将会在 this 中可见。
		// this = { name, onconnect, close,
		// 	webkitRequestFileSystem, webkitRequestFileSystemSync,
		// 	webkitResolveLocalFileSystemURL, webkitResolveLocalFileSystemSyncURL }
		// port.postMessage(Object.keys(this))


		// 【错误】无法克隆函数并且传递。
		// port.postMessage(function A() { })


		// this.close()// 关闭了就没有了

		// function
		// port.postMessage(typeof console.log)
		port.postMessage(e.ports.length)
	} catch (err) {
		port.postMessage(err.message)
	}
}

