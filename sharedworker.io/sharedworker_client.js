/*
SharedWorker的作用：在同一个域名下，让多个Page共享和传递数据。

注意：
不可以使用index.html下的<script>new SharedWorker(url)</script>
必须使用<script src="sharedworker.js"></script>外部文件创建new SharedWorker(url,opt)。
否则，当chrome打开多页面时关闭chrome程序后再重启时，虽然之前打开的多页面也会随着打开，却发现sharedWorker没能正常运行。


new SharedWorker(url, opt)
@url       文件路径必须连search和hash部分也相同。这意味着 sw.js、sw.js?v=1、sw.js#v1 是不同的。
@opt       名字，用于测试。MDN说可以是对象参数，但是对象没有成功，只能是字符串参数。
Ex:
opt = { type: 'module', credentials:omit, name: '对象名字',  }// type默认值为'classic'
opt = { name: '多线程主', type:'classic' }// type默认值为'classic'

sw = new SharedWorker('sharedworker_server.js', opt)
sw = new SharedWorker('./sharedworker_server.js?v=2', opt);// 这将打开与上面不同的sharedworker空间。
./sharedworker.js?t=140123456780 将被视为是不同的sharedworker
sw.js?v=1.0 （由于location.search的不同，会打开不同的共享工作区域命名空间）


*/
void function (undefined) {
	const { log, warn, error } = console

	void function connect(opt) {
		let sw, port;
		sw = new SharedWorker('sharedworker_server.js', opt)
		sw.onerror = (...e) => error('sw.onerror', ...e)
		port = sw.port;
		// port.addEventListener('messageerror', log)
		// port.addEventListener('error', log)
		// port.addEventListener('close', log)// 改写了原来的port.close，所以可以侦听close事件。
		port.addEventListener('message', function (e) {
			let { data } = e
			log(`[${typeof data}]`, data)
		});
		port.start()// 必须执行后，才可以接受message事件。
	
		window.addEventListener('beforeunload', function (e) {
			// localStorage.setItem('lasttime-before', new Date().toLocaleString())// 同步执行
			// port.postMessage('offline-before')// 等待异步执行
			port.close()
			// return 'wait'
		}, true)

		return port
	}();

	// window.onunload = function(){
	// 	localStorage.setItem('lasttime', new Date().toLocaleString())// 同步执行
	// 	port.postMessage('offline')// 不会等待异步执行
	// }


	// 与 worker.terminate() 相同，关闭自己
	// setTimeout(()=>port.close(), 1000)


	window.addEventListener('beforeunload',(e)=>{
		port.postMessage('offline-beforeunload')
	})




	// 与后台协议的交互数据
	// function chat(id, msg) {
	// 	port.postMessage({id, msg})
	// }

	// function broadcast(msg){
	// 	chat('broadcast', msg)
	// }

}()


MessagePort.prototype.send = function (...m) {
	m.unshift('message')
	this.postMessage(m)
}

MessagePort.prototype.emit = function (...m) {
	this.postMessage(m)
}

MessagePort.prototype.on = function (type, method) {
	this.initMethods()
	this.initMethodsType(type)
	this.methods[type].push(method)
}

MessagePort.prototype.initMethods = function () {
	let b = typeof this.methods !== 'object' || this.methods === null
	if (b) {
		this.methods = Object.create(null)
	}
	return b// 是否初始化
}
MessagePort.prototype.initMethodsType = function (type) {
	let b = !Array.isArray(this.methods[type])
	if (b) {
		this.methods[type] = []
	}
	return b// 是否初始化
}

MessagePort.prototype.off = function (type, method) {
	this.initMethods()
	if (this.initMethodsType(type)) return;
	let index = this.methods[type].lastIndexOf(method)
	if (index !== -1) this.methods[type].splice(index, 1)
}
MessagePort.prototype._close = MessagePort.prototype.close
MessagePort.prototype.close = function () {
	let e = new Event('close')
	e.id = this.id
	this.dispatchEvent(e)
	this.emit('close')
	this._close()
}