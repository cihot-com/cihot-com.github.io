let workers = {}
let messageId = 0;
let thisArg = this;

addEventListener('message', (e) => {

	let { data } = e;

	if (data !== null && typeof data === 'object') {

		let action = data.action;
		let name = data.name;

		if (action === 'stop') {
			if (workers[name] instanceof Worker) {
				workers[name].terminate();
				delete workers[name];
			}

		} else if (action === 'start') {
			if (workers[name] instanceof Worker) {
				return;
			}
			workers[name] = new Worker('./calc.js', { name });
			workers[name].addEventListener('message', (e) => {
				let { data } = e;
				thisArg.postMessage({ action, name, data, messageId });
			});

		} else if (action === 'message') {
			messageId++;
			console.log(name, workers[name])

			workers[name] && workers[name].postMessage({
				messageId,
				data: data.data,
			});
		}

	}

})