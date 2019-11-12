let sw, port, info, v, opt;

info = {
	el: '#swInfo',
	data: {
		id: -1,
		log: [],
	},
};
v = new Vue(info);

// 共享工作
// sw.js?v=1.0 （由于location.search的不同，会打开不同的共享工作区域命名空间）
// opt = { name: '好名字', type: 'module' }// type默认值为'classic'
sw = new SharedWorker('shared-worker-back.js', opt);
sw.addEventListener('error', console.warn)
sw.addEventListener('close', console.warn)
port = sw.port;// port of sharedworker
port.start();
port.methods = Object.create(null)
port.addEventListener('messageerror', console.warn)
port.addEventListener('error', console.warn)
port.addEventListener('close', console.warn)// 改写了原来的port.close，所以可以侦听close事件。
port.addEventListener('message', function (e) {
	let { data } = e
	if (Array.isArray(data)) {
		let type = data[0]
		data = data.slice(1)
		if (type === 'warning') {
			// 这部分是针对客户端的内容，如果客户端向服务端发送了非数组内容，则反馈客户端此警告！
			console.warn(data)
		}else if(type === 'connect') {
			// 连接后保存自身id
			this.id = data[0]
		}else if(type === 'close') {
			let e = new Event(type)
			e.id = data[0]
			this.dispatchEvent(e)
		}
		let methods = this.methods[type]
		if (Array.isArray(methods) && methods.length) {
			methods.forEach(method => {
				// console.info('执行特别函数')
				Reflect.apply(method, port, data)
			})
		}
	} else {
		// 来自服务端的信息不是数组时警告！
		console.warn(e.data)
	}
});


// 以上代码固定
// 以下可以自由编辑

port.on('connect', (id, msg) => {
	v.id = id
	v.log.push(msg)
})
port.on('message', (...m) => console.log(...m))
port.on('close', (...m) => console.log('close',...m))
port.on('newconnect', (id)=>console.log('有新连接',id))


// port.addEventListener('message', function (e) {
// 	console.log('message', e.data)
// });



