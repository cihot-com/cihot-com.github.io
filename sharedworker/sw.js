let autoIncrementInteger = 0;
let ports = []

// 扩展portd的原型：send() emit() on() off()
importScripts('./extend.MessagePort.js');


// sharedWorker
addEventListener('connect', function (e) {
	let port = e.source;// e.ports[0] 是客户端 SharedWorker 实例
	port.id = ++autoIncrementInteger;// 生成ID序号
	port.events = Object.create({
		broadcast(...args) {
			if (typeof handle !== 'function') return;
			ports.forEach((port) => {
				port.send(...args);
			})
		}
	})// 带broadcast默认事件句柄的对象

	function debug(...args) {
		port.postMessage(args);
	}


	port.addEventListener('message', (e) => {
		let { data } = e
		if (Array.isArray(data)) {
			// send() or emit()
			let { type, args, ackId } = data

			if (type === 'connection') {
				port.id = args[0]
			}

			if (Array.isArray(port.events[type])) {
				port.events[type].forEach((handle) => {
					Reflect.apply(handle, port, args)
				})
			} else {
				port.events[type] = []
				debug('[Raw]', data)
			}
		} else {
			debug('[Raw]', data)
		}
	})
	port.start()
	ports.push(port);

	try {
		port.postMessage(this.name);
		port.emit('connect', port.id);

		// 导入外部js
		importScripts('./run_script.js')// 多次调用将重新运行
		port.send('runScript', typeof runScript)
		runScript(port, 'run script', runScript.desc)

		// port.postMessage(typeof importScripts);// 'function'
		port.send('onmessageerror', port.onmessageerror === null)

		// port.emit(e.type, port.id)// Event: connect

		port.on('desc', () => {
			port.send('desc', runScript && runScript.desc)
		})

	} catch (err) {
		port.postMessage(err.stack);
	}
});
