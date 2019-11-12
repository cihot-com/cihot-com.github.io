// importScripts('./s.js');

// id 自动增序
let
	id = 0,
	ports = []


// 初始化函数。扩展MessagePort的方法。
Object.defineProperty(MessagePort.prototype, 'send', {
	value(...args) {
		args.unshift('message')
		this.postMessage(args)
	},
	enumerable: false,
})
Object.defineProperty(MessagePort.prototype, 'emit', {
	value(...args) {
		this.postMessage(args)
	},
	enumerable: false,
})
Object.defineProperty(MessagePort.prototype, 'on', {
	value(type, handle) {
		if (!handle) return;
		if (!Array.isArray(this.events[type])) this.events[type] = []
		this.events[type].push(handle)
	},
	enumerable: false,
})
Object.defineProperty(MessagePort.prototype, 'off', {
	value(type, handle) {
		if (!handle) return delete this.events[type];
		let s = this.events[type]
		if (Array.isArray(s)) {
			for (let i = s.length - 1; i >= 0; i--) {
				if (s[i] === handle) s.splice(i, 1)
			}
		}
	},
	enumerable: false,
})
Object.defineProperty(MessagePort.prototype, 'doHandles', {
	value(e) {
		let { data } = e
		let [ type, ...args ] = data
		let s = this.events[type]
		if(Array.isArray(s)) {
			s.forEach((handle)=>{
				Reflect.apply(handle, this, args)
			})
		}
	},
	enumerable: true,
})
Object.defineProperty(MessagePort.prototype, 'broadcast', {
	get() {
		let myport = this
		function send(...args){
			args.unshift('message')
			ports.forEach(port => {
				try {
					if (myport !== port) port.postMessage(args)/// 如果不报错就去掉try，毕竟影响性能。
				} catch (err) {
					myport.postMessage(err.stack)
				}
			})
		}
		function emit(...args){
			ports.forEach(port => {
				try {
					port.postMessage(args)/// 如果不报错就去掉try，毕竟影响性能。
				} catch (err) {
					myport.postMessage(err.stack)
				}
			})
		}
		return { send: send.bind(this), emit: emit.bind(this) }
	},
	enumerable: true,
})



// throw new Error('asdfjaklsj')// 放在哪里前台都收不到该错误

// sharedWorker
addEventListener('connect', (e) => {

	let port = e.source;// e.ports[0] 均是客户端 SharedWorker 实例
	port.start()// 必须执行后，才可以接受message事件。

	Object.defineProperty(port, 'events', { value: port.events = Object.create(null), enumerable:true })
	Object.defineProperty(port, 'id', { value: ++id, enumerable: true })// 生成ID序号
	Object.defineProperty(port, 'ports', { value: ports, enumerable: true })
	ports.push(port)

	// 运行events中注册的handle函数
	port.addEventListener('message', function (e){
		let { data } = e
		let [type, ...args] = data
		let s = this.events[type]
		if (Array.isArray(s)) {
			s.forEach((handle) => {
				Reflect.apply(handle, this, args)
			})
		}
	})

	// 
	// port.postMessage(['connect', id, true])// 通知前端已连接完毕，并返回id。
	// port.broadcast.send(['connect', id, false])
	
	// 群发通知。连接事件，包含id和是否自己。
	ports.forEach(p => {
		port.postMessage(['connect', id, p === port])
	})


	// port.addEventListener('close', (e) => { broadcast(port, { offline: port.id }) })// 没有close事件
	port.addEventListener('messageerror', (e) => port.postMessage('[sw.messageerror]' + e))// 未知事件
	port.addEventListener('error', (e) => port.postMessage('[sw.error]' + e))// 未知事件
	

	try {
		// 可以导入外部脚本，使用indexedDB进行本地保存。
		importScripts('/lib/localforage.js')
		let db = localforage.createInstance({name:'test', storeName:'sharedWorkerTest'})
		// db.setItem('id', port.id)
		port.postMessage(typeof db);

		// 测试内容
		// window===undefined
		// e.ports.length===1
		// e.ports[0]===e.source
		// port.postMessage(name)// 前台页面调用时输入的名称。例如：new SharedWorker(url,name)。默认值为undefined。
		// port.postMessage(Object.getOwnPropertyNames(this))// 可见支持 IndexedDB, XMLHttpRequest
		// port.postMessage(new Error('故意报错'))// 传递成了字符串
		// port.postMessage(typeof importScripts);// 'function' 可以导入外部js文件
		// port.postMessage(Object.getOwnPropertyNames(port))
		// port.postMessage(port.id)
		// port.postMessage(port.__proto__.constructor === MessagePort)// 可见想要扩展port，扩展MessagePort就行。

		// importScripts('/lib/socket.io.min.js')// 导入socket.io
		if (typeof io === 'function') port.postMessage('has io')
		port.postMessage(['scoket', typeof socket])

		port.postMessage(typeof port.send)
		port.send(1, 2, 3)

		importScripts('s.js')

		port.on('pong', (...a)=> log('pong', ...a))

		// 每10秒进行一次断开检查
		// let interval = setInterval(() => {
		// 	port.emit('ping')
		// }, 1000);

		port.send('close is '+typeof port.close)

		port.on('socketId', function(){
			port.send(s.id);
		})



	} catch (err) {
		port.postMessage(err.stack);
	}
});



// 广播，向所有port们发送数据。
function broadcast(myport, m) {
	ports.forEach(port => {
		try {
			if (myport !== port) port.postMessage(m)
		} catch (err) {
			myport.postMessage(err.stack)
		}
	})
}
