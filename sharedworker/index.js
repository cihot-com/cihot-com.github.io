const { log, debug } = console

let sw = new SharedWorker('./sw.js', 'swName');// 共享线程
let { port } = sw;
// sw.onerror = (err) => log('[共享线程URI错误]', err);
sw.addEventListener('error', (err)=> log('[共享线程URI错误]', err), {passive:false});
port.start();
port.events = {};
log(sw)

// 个性化处理message，适用于：send() emit()
port.addEventListener('message', (e) => {
	let { data } = e;

	if (Array.isArray(data)) {
		// send() or emit();
		let [type, ...args] = data;

		if (type === 'connection') {
			port.id = args[0];
		}

		if (Array.isArray(port.events[type])) {
			port.events[type].forEach((handle) => {
				Reflect.apply(handle, port, args);
			})
		} else {
			port.events[type] = [];
			debug('[Raw]', data);
		}
	} else {
		debug('[Raw]', data);
	}
})


port.on('connect', (id) => console.log('我的连接', id));
port.on('close', (...m) => console.log('我的关闭', ...m));
port.on('otherconnect', (id) => console.log('其他连接', id));
port.on('otherclose', (...m) => console.log('其他关闭', ...m));
port.on('broadcast', (id, ...m) => console.log('群发消息', id, ...m));
port.on('unique', () => location.replace('about:blank'));
port.on('message', (...args) => log('我的消息', ...args));

window.addEventListener('beforeunload', (e) => {
	port.postMessage(['close']);
}, { passive: false });