console.warn('page unique checking...');

let sw = new SharedWorker('sharedWorker.js');
let port = sw.port;

port.o = Object.create(null);
port.start();
port.send = function(message) {
	port.postMessage({message});
};
port.broadcast = function(broadcast) {
	port.postMessage({broadcast});
};

// let id = Math.random().toString().slice(2);


port.onmessage = function (e) {
	// this === port
	let data=e.data;
	
	if(typeof data.set==='object') {
		Object.assign(port.o, data.set);
		console.log(port.o);
	}
	if(data.message!==undefined) {
		console.log('sw.onmessage', data.message);
	}
	if(data.checkUniqueResult===false) {
		location.replace('about:blank');
	}
	if(data.checkUnique) {
		if(port.o.id!==data.checkUnique) location.replace('about:blank');
	}
};

port.onerror = port.onmessageerror = function (e) {
	console.error(e);
};

window.onclick = function (e) {
	let o={checkUnique:port.o.id};
	port.postMessage(o);
};

window.oncontextmenu = function (e) {
	e.preventDefault();
	let o={message: `${port.o.id}: (${e.offsetX},${e.offsetY})`};
	port.postMessage(o);
};

window.onwheel = function(e) {
	let o = {broadcast: `${port.o.id}: (${e.offsetX},${e.offsetY})`};
	port.postMessage(o);
}

window.onbeforeunload = function(e) {
	port.postMessage({offLine:true});
}