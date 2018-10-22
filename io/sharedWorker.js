let id = 0;
let ports = new Set();

this.onconnect = function (event) {
	id++;

	// let type = event.type;// 'connect'
	let port = event.ports[0];
	port.start();
	broadcast({checkUnique:id});
	port.o = Object.create(null);
	port.o.id = id;
	port.postMessage({ set: { id, mark:4 } });
	broadcast({checkUnique:id},port);

	port.onmessage = function (e) {
		let data = e.data;
		// port.postMessage({message: {data, type:'server pipe'}});

		if (data.checkUnique) {
			let checkUniqueResult = id === data.checkUnique;
			port.postMessage({ checkUniqueResult, message: `result is ${checkUniqueResult}.` });
		}
		if (data.message) {
			let o = {message:`server catch message: ${data.message}`};
			port.postMessage(o);
		}
		if(data.broadcast) {
			// port.postMessage({message:'broadcasted'});
			broadcast({message:{
				status: 'broadcasted',
				onLineCount:ports.size,
				data: data.broadcast
			}});
		}
		if(data.offLine) {
			ports.delete(port);
		}
	};

	
	port.onerror = port.onmessgeerror = function(e) {
		broadcast({message:port.o.id+':'+e.message});
	}

	ports.add(port);
}

function broadcast(o,p){
	// if(p) p.postMessage({message:'me'});
	ports.forEach((port)=>{
		if(p && p===port) return ;
		port.postMessage(o);
	});
}
