let COUNT = 0;
let PORTS = new Map();

onconnect = function (e) {
	let port = e.ports[0];
	let id = ++COUNT
	let acks = {}
	let value = { id, acks }
	
	PORTS.set(port, value)

	port.onmessage = function ({args}) {
		if(Array.isArray(args)) {
			let [ackNumber, type, ...data] = args
			


		}
		port.postMessage(value)
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