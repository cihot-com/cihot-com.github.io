(function (undefined) {
	let $ = function (mainHandles, workerHandles) {
		let code = '', blob, url, worker;
		switch (typeof workerHandles) {
			case 'function':
				code += `addEventListener('message',${workerHandles.toString()});`;
				break;
			case 'object':
				let k, f;
				for (k in workerHandles) {
					f = workerHandles[k]
					k = k.replace(/^on(.+)/, '$1');	// 去掉开头的on
					code += `addEventListener('${k}',${f.toString()});`;
				}
				break;
			case 'string':
				code += workerHandles;
				break;
			default:
				throw new TypeError('workerHandles type is ' + workerHandles);
				break;
		}

		if (code) {
			if (!$.cache[code]) {
				blob = new Blob([code], { type: 'text/javascript' });
				url = URL.createObjectURL(blob);
				$.cache[code] = url;
			} else {
				url = $.cache[code];
			}
			worker = new Worker(url);
			switch (typeof mainHandles) {
				case 'function':
					worker.addEventListener('message', mainHandles);
					break;
				case 'object':
					let k, f;
					for (k in mainHandles) {
						f = mainHandles[k];
						k = k.replace(/^on(.+)/, '$1');	// 去掉开头的on
						worker.addEventListener(k, f);
					}
					break;
				default:
					throw new TypeError('mainHandles type is ' + mainHandles);
					break;
			}
		}
		return worker;
	};
	Object.defineProperty($, 'cache', { value: {} });
	Object.defineProperty(this, 'createLocalWorker', { value: $ });
}).call(window);