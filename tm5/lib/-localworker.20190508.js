// 需要导入stringifyfunction.js
/*
lw.connect()
lw.close()
lw.on('xxx', fn)
lw.off('xxx', fn)
lw.emit('xxx', ...datas)
lw.send(...datas)
lw.abort()
 */
((g) => {
	let cacheWorkers = new Map();
	let cacheUrls = new Map();

	function createLocaleWorker(name, mainHandles, workerHandles) {
		let code, blob, url, worker;
		code = 'let {log,warn,error,info}=console;\nfunction send(...a){console.log(a);this.postMessage(a);};';

		if (typeof workerHandles === 'string') {
			code += workerHandles;
		} else if (typeof workerHandles === 'function') {
			code += 'this.addEventListener("message",' + stringifyFunction(workerHandles) + ');';
		} else if (typeof workerHandles === 'object' && workerHandles !== null) {
			let
				k,// message, error, abort
				f;// callback func
			for (k in workerHandles) {
				f = workerHandles[k]
				if (k.length > 2) k = k.replace(/^on(.+)/, '$1');// 截取事件名称，去掉开头的on字符
				k = k.replace(/"/g, '\\"');// 转义符：侦听事件名称的双引号
				f = stringifyFunction(f);
				if(k==='message') {
					code += `let _onmessage=${f};this.addEventListener("${k}",function(e){_onmessage(e.data)});`
				}else{
					code += `this.addEventListener("${k}",${f});`;
				}
			}
			log(code)
		} else {
			// 输入其他类型的代码
			code = 'this.addEventListener("message",(e)=>{console.warn(e.data);});\n';
		}

		if (code) {
			if (!cacheUrls.has(code)) {
				blob = new Blob([code], { type: 'text/javascript' });
				url = URL.createObjectURL(blob);
				cacheUrls.set(code, url);
			} else {
				url = cacheUrls.get(code);
			}
			worker = new Worker(url, {name});
			if (typeof mainHandles === 'string') {
				code += mainHandles;
			} else if (typeof mainHandles === 'function') {
				worker.addEventListener('message', mainHandles);
			} else if (typeof mainHandles === 'object' && mainHandles) {
				let k, f;
				for (k in mainHandles) {
					f = mainHandles[k];
					if (k.length > 2) k = k.replace(/^on(.+)/, '$1');// 去掉开头的on
					worker.addEventListener(k, k==='message' ? function(e){ f(...e.data) } : f)
				}
			} else {
				worker.addEventListener('message', (e) => {
					console.log(e.data);
				});
			}
		}
		worker.code = code;
		worker.url = url;
		return worker;
	}

	class LocaleWorker {

		constructor(name, mainHandles, workerHandles) {
			Object.defineProperty(this, '_autoReconnect', { value: false, writable: true});
			this.name = name;
			this.mainHandles = mainHandles;
			this.workerHandles = workerHandles;
			this.connect();
		}

		close() {
			let { name, worker } = this
			if (cacheWorkers.has(name)) {
				cacheWorkers.get(name).terminate();
				cacheWorkers.delete(name);
			}
			if (worker) {
				worker.terminate();
				delete this.worker;
			}
		}

		destroy() {
			let { code, name, terminate } = this
			if (cacheUrls.has(code)) {
				URL.revokeObjectURL(cacheUrls.get(code));
				cacheUrls.delete(code);
			}
			terminate();
			cacheWorkers.delete(name);
		}

		connect() {
			console.debug('connect');
			this.close();
			this.worker = createLocaleWorker(this.name, this.mainHandles, this.workerHandles);
			cacheWorkers.set(this.name, this.worker);
			this.worker.onclose = this.worker.onerror = this.worker.onabort = function(...e) { console.debug('*abort',...e) }
		}

		send(...a) {
			this.worker.postMessage(a);
		}

		set autoReconnect(b) {
			this._autoReconnect = b;
			if (this._autoReconnect === false && b) {
				this.worker.addEventListener('close', this.connect.bind(this));
			} else {
				this.worker.removeEventListener('close', this.connect.bind(this));
			}
		}
		get autoReconnect() {
			return this._autoReconnect;
		}
	}

	g.LocaleWorker = LocaleWorker;
	LocaleWorker.cache = { workers: cacheWorkers, urls: cacheUrls };

})(this)

/*

{ onmessage, onerror, onmessageerror }

let lw = new LocaleWorker('test',
	{
		message: (data)=>{},
		error: (err)=>{},
		massageerror: ()=>{},
	},
	{
		message:()=>{
			send()
		},
		close:()=>{},
		error(){}
	}
);

lw.send(1,2,3,4)
lw.worker
lw.url
lw.close()

LocaleWorker.cache.workers
LocaleWorker.cache.urls

*/



