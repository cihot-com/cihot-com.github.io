let count, s;

autoIncrementInteger = 0;
s = new Set();

// sharedWorker
addEventListener('connect', function (e) {
	let port, authId, message;

	try {
		port = e.source;// e.ports[0] 是客户端 SharedWorker 实例
		port.start();
		
		authId = ++autoIncrementInteger;// 生成ID序号
		port.id = authId;
		s.add(port);

		port.postMessage(typeof importScripts);// 'function'
		
		// importScripts('./sw.port.js'); swPort(e);

		// Event: connect
		port.postMessage({
			type: e.type,
			data: {
				authId,
				message: `我(${authId})登录了`,
			}
		});

		// Event: message
		port.addEventListener('message', function (e) {
			e.data.symbol = 'sw-re'
			port.postMessage(e.data)
			let originalData = e.data;
			let { type, data } = originalData;
			render(type, data, port);
		});

	} catch (err) {
		e.ports[0].postMessage(err.stack);
	}
});

function render(type, data, port){
	let f = render[type];
	if(typeof f==='function') f(data, port);
}
render.close = function(data, port){
	broadcast({id:port.id,data});
	s.delete(port);
	port.close();
};
render.click = function(data, port){
	broadcast({size:s.size});
};


// 广播
function broadcast(data) {
	let type = 'broadcast';
	let message = {type, data};
	try {
		s.forEach(port => port.postMessage(message));
	} catch (err) {
		s.forEach(port => port.postMessage(err.stack));
	}
}

// sharedWorkerBack.js
