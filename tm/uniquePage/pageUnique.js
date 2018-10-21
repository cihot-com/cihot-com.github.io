let sw = new SharedWorker('sharedWorker.js');
let port = sw.port;

port.o = Object.create(null);
// port.start();

port.send = function(message) {
	port.postMessage({message});
};

port.onmessage = function (e) {
	let data=e.data;
	
	// sharedWorker会发来一个checkUnique, 如果该值与
	if(data.checkUnique) {
		console.log(`服务器命令唯一性认证. ${data.checkUnique}`);
		
		if(port.o.id!==data.checkUnique) location.replace('about:blank');
	}

	if(data.set) {
		Object.assign(port.o, data.set);
		console.log(`获得了ID: ${port.o.id} (${port.o.upline})`);
	}
};

port.onerror = port.onmessageerror = function (e) {
	console.error(e);
};

