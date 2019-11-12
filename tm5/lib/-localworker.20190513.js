/**
准备：
	[require] 需要导入codecache.js
	[require] 需要导入functionanalyze.js

属性方法：
	lw.connect()
	lw.close()
	lw.on('xxx', fn)
	lw.off('xxx', fn)
	lw.emit('xxx', ...datas)
	lw.send(...datas)
	lw.abort()

LocalWorker.cache.urls
LocalWorker.cache.workers

注意：
需要优化一下缓存机制
LocalWorker缓存的是 code blob url 至于worker名字是可以重名的
LocalWorker.getWorkersByCode()
LocalWorker.workers = new Set()
LocalWorker
生成顺序： code -> blob -> url -> workers

	*/
((g) => {
	let { log, warn, info, error, debug } = console;
	let cacheWorkers = new Map();
	let cacheUrls = new Map();

	function extractEventName(name) {
		return name.length > 2 ? name.replace(/^on(.+)/u, '$1') : name;
	}
	function normalizeName(name) {
		return name.replace(/[`\-=\[\]\\;',\.\/~!@#\$%\^&\*()_\+\{\}\|\:"\<\>\?]/g, '\\$&');
	}

	function createLocalWorker(name, mainHandles, workerHandles) {
		let code, blob, url, worker;

		code = 'let {log,warn,error,info,debug,table,group,groupEnd}=console;\n'
		code += 'let data = {};\n';
		code += `let send = function (...a){ a.unshift("message"); postMessage(a); };\n`;
		code += `let emit = function (...a){ postMessage(a); };\n`;
		code += 'let handleMap=new Map();\n';
		// 镜像代码A1
		code += `addEventListener("message",function (e){
	let k=e.data[0], type, str, f;
	if(k==='_handle_') {
		type = e.data[1];
		str = e.data[2];// 函数的字符串形式
		try{
			f = eval('('+str+')');// 需要转换为函数，但需要抓去错误。
			if(typeof f==='function') {
				handleMap.set(type, f);
			}
		}catch(err){
			warn('handleMap warning:', err, e.data);
		}
	}else if(k==='_eval_'){
		e.data.slice(1).forEach(e=>eval(e));
	}else{
		let f = handleMap.get(k);
		if(typeof f==='function'){
			Reflect.apply(f, this, e.data.slice(1));
		}else{
			warn(e.data)
		}
	}
});\n`;

		if (typeof workerHandles === 'string') {
			// 适用于直接放入worker的脚本内容
			code += workerHandles;
		} else if (typeof workerHandles === 'function') {
			// 适用于worker中的message事件的侦听回调函数
			let f = new FunctionAnalyze(workerHandles).analyze().str;
			code += `handleMap.set("message",${f});\n`
		} else if (typeof workerHandles === 'object' && workerHandles !== null) {
			// 适用于worker中多个自定义事件的侦听回调函数
			let
				k,// message, error, abort
				f;// callback func
			for (k in workerHandles) {
				f = workerHandles[k];
				f = new FunctionAnalyze(f).analyze().str;// 函数转为字符串
				k = extractEventName(k)// 截取事件名称，去掉开头的on字符
				k = normalizeName(k)// 转义符：侦听事件名称的双引号
				code += `handleMap.set("${k}",${f});\n`
			}
		} else {
			// 输入其他类型的代码
			code += 'handleMap.set("message", (...a)=>warn(...a));\n';
		}

		if (!cacheUrls.has(code)) {
			blob = new Blob([code], { type: 'text/javascript' });
			url = URL.createObjectURL(blob);
			cacheUrls.set(code, url);
		} else {
			url = cacheUrls.get(code);
		}
		worker = new Worker(url, { name });
		worker.handleMap = new Map();
		// 镜像代码A1
		worker.addEventListener('message', function (e) {
			let k = e.data[0], h = e.target.handleMap;
			let f = h.get(k);
			if (typeof f === 'function') {
				Reflect.apply(f, e.target, e.data.slice(1));
			} else {
				console.debug(e.data);
			}
		});
		let h = worker.handleMap;
		if (typeof mainHandles === 'function') {
			h.set('message', mainHandles);
		} else if (typeof mainHandles === 'object' && mainHandles) {
			let k, f;
			for (k in mainHandles) {
				f = mainHandles[k];
				k = extractEventName(k);// 截取事件名称，去掉开头的on字符
				k = normalizeName(k);
				h.set(k, f);
			}
		} else {
			h.set('message', (e) => {
				debug(e.data);
			});
		}

		worker.code = code;
		worker.blob = blob;
		worker.url = url;

		return worker;
	}

	class LocalWorker {

		constructor(name, mainHandles, workerHandles) {
			Object.defineProperty(this, '_autoReconnect', { value: false, writable: true });
			this.data = {};
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
			if (worker instanceof Worker) {
				worker.terminate();
				delete this.worker;
			}
		}

		terminate() {
			return this.worker.terminate();
		}

		destroy() {
			let { code, name, worker } = this
			if (cacheUrls.has(code)) {
				URL.revokeObjectURL(cacheUrls.get(code));
				cacheUrls.delete(code);
			}
			if (worker instanceof Worker) worker.terminate();
			cacheWorkers.delete(name);

			console.debug('destroy', name)
		}

		// connect() {
		// 	if (cacheWorkers.has(name)) {
		// 		this.worker = cacheWorkers.get(this.name);
		// 	} else {
		// 		this.worker = createLocalWorker(this.name, this.mainHandles, this.workerHandles);
		// 		cacheWorkers.set(this.name, this.worker);
		// 	}
		// 	console.debug('connect', this.name);
		// }

		connect() {
			if (this.worker) {
				this.worker.terminate();
				this.worker = new Worker(this.worker.url, { name: this.worker.name });
			} else {
				this.worker = createLocalWorker(this.name, this.mainHandles, this.workerHandles);
			}

			debug(this.name + ' connect');
		}

		send(...a) {
			a.unshift('message')
			this.worker.postMessage(a);
		}

		emit(...a) {
			this.worker.postMessage(a)
		}

		handle(type, handle) {
			let a = ['_handle_', normalizeName(type), new FunctionAnalyze(handle).analyze().str];
			this.worker.postMessage(a)
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

		get handleMap() {
			// return this.worker && this.worker.h || new Map();// 静默处理错误
			return this.worker && this.worker.handleMap;
		}
	}



	g.LocalWorker = LocalWorker;
	let cache = LocalWorker.cache = []
	cache.workers = [];
	cache.workers = cacheWorkers;
	cache.urls = cacheUrls;

})(this);
