let workerGlobal = this;

console.log(workerGlobal.__proto__.constructor.name);
console.log(workerGlobal.workers);
workerGlobal.addEventListener('message', (e)=>{
	let { data } = e;

	if(data==='inc') {
		return importScripts('inc.js');
	}
	
	if(data instanceof ArrayBuffer) {
		data[1] = 1;
		data[3] = 2;
		data[5] = 3;
		data[7] = 4;
		workerGlobal.postMessage(data, [data]);
	}

	if(data instanceof Array) {
		data[0] = 'a';
	}
	console.log(`<worker-${workerGlobal.name}>`, typeof data, data.__proto__ && data.__proto__.constructor.name, data, data.say);
});


