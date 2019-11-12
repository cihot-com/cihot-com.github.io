let autoIncrementInteger, s;
autoIncrementInteger = 0;
s = new Set();
// 扩展全局方法
importScripts('extend-messageport.js')
function broadcast(...m) {
	try {
		s.forEach(port => port.emit(...m));
	} catch (err) {
		s.forEach(port => port.emit('error',err.stack));
	}
}
// sharedWorker
addEventListener('connect', (e)=>{
	let port;
	try {
		port = e.source;// e.ports[0] 是客户端 SharedWorker 实例
		port.start();
		port.id = ++autoIncrementInteger;// 生成ID序号
		s.add(port);
		broadcast('newconnect', port.id)
		port.emit('connect', port.id)
		port.addEventListener('message', function (e) {
			let { data } = e
			if (Array.isArray(data)) {
				let type = data[0]
				data = data.slice(1)
				let methods = this.methods[type]
				if (Array.isArray(methods) && methods.length) {
					methods.forEach(method => {
						Reflect.apply(method, port, data)
					})
				}
			} else {
				// 来自客户端的信息不是数组时警告！
				port.postMessage(['warning',data])
			}
		})
		port.addEventListener('messageerror', (e) => {
			port.postMessage(e)
		})
		port.addEventListener('error',(e)=>{
			port.postMessage(e)
		})


		// 以上不要编辑
		// 以下可以自由编辑


		// 可以导入外部脚本
		// importScripts('/lib/localforage.js')
		// let db = localforage.createInstance({name:'test', storeName:'sharedWorkerTest'})
		// 退出窗口时保存时间
		// db.setItem('id', port.id)

		// 测试内容
		// port.postMessage(e.source===e.ports[0])// true
		// port.postMessage(e.ports.length)// 1
		// port.postMessage(typeof importScripts);// 'function' 可以导入外部js文件
		// port.send(Object.getOwnPropertyNames(port))
		// port.postMessage(port.id)
		// port.postMessage(typeof port.send)
		// port.postMessage(port.id)

		port.on('broadcast', (...m)=>broadcast(...m))

		port.on('reback', function (...m){
			port.send(...m)
		})

		port.on('closeme', ()=>port.close())
		// port.on('close', ()=>broadcast(port.id))

	} catch (err) {
		port.postMessage(['warning', err.stack]);
	}
});
