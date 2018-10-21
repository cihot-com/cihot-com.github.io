let sw = new SharedWorker('sharedWorker.js');
let port = sw.port;

port.o = Object.create(null);
// port.start();

port.send = function (message) {
	port.postMessage({ message });
};

port.onmessage = function (e) {
	let data = e.data;

	// sharedWorker会发来一个checkUnique, 如果该值与
	if (data.checkUnique) {

		let result = port.o.id !== data.checkUnique;

		document.body.insertAdjacentText(
			'afterbegin',
			`唯一性认证结果为:${result?'关闭':'保留'}页面.`
		);

		if (result) {
			setTimeout(e=>{
				location.replace('about:blank');
			},2000);
		}
	}

	if (data.set) {
		Object.assign(port.o, data.set);
		document.body.insertAdjacentText(
			'afterbegin',
			`获得了ID: ${port.o.id} (${port.o.upline})`
		);

	}
};

port.onerror = port.onmessageerror = function (e) {
	console.error(e);
};

