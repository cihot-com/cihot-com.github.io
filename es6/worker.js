const
blobs = {},
urls={},
events = {},
innerCode = `this.add`

;


// this.addEventListener('message')


async function wk(filename='./worker-script.js') {
	let blob, url

	blob = blobs[filename]
	if(!blob) {
		let res = await fetch(filename)
		blob = await res.blob()
		blobs[filename] = blob
	}
	url = urls[filename]
	if(!url) {
		url = URL.createObjectURL(blob)
		urls[filename] = url
	}

	return new Worker(url)
}




export { wk }
export default { wk }
/* 
((g) => {
	const { log } = console

	let cacheWorkers = Object.create(null)
	let cacheUrls = Object.create(null);

	function createLocaleWorker(mainHandles, workerHandles) {
		let code, blob, url, worker;
		code = 'function send(...a){ this.postMessage(Array.from(a)) }; ';

		if (typeof workerHandles === 'string') {
			code += workerHandles;
		} else if (typeof workerHandles === 'function') {
			code += 'this.addEventListener(\'message\',' + workerHandles.toString() + ');';
		} else if (typeof workerHandles === 'object' && workerHandles) {
			// 输入
			let k, f;
			for (k in workerHandles) {
				f = workerHandles[k]
				if (k.length > 2) k = k.replace(/^on(.+)/, '$1');	// 去掉开头的on
				code += 'this.addEventListener(\'' + k + '\',' + f.toString() + ');';
			}
		} else {
			// 输入其他类型的代码
			code = 'addEventListener("message",(e)=>{console.log(e.data);});';
		}

		if (code) {
			if (!cacheUrls[code]) {
				blob = new Blob([code], { type: 'text/javascript' });
				url = URL.createObjectURL(blob);
				cacheUrls[code] = url;
			} else {
				url = cacheUrls[code];
			}
			worker = new Worker(url);
			if (typeof mainHandles === 'string') {
				code += mainHandles;
			} else if (typeof mainHandles === 'function') {
				worker.addEventListener('message', mainHandles);
			} else if (typeof mainHandles === 'object' && mainHandles) {
				let k, f;
				for (k in mainHandles) {
					f = mainHandles[k];
					if (k.length > 2) k = k.replace(/^on(.+)/, '$1');	// 去掉开头的on
					worker.addEventListener(k, f);
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
			this._autoReconnect = false;
			this.name = name;
			this.mainHandles = mainHandles;
			this.workerHandles = workerHandles;
			this.connect();
		}

		close() {
			if (this.name in cacheWorkers) {
				cacheWorkers[this.name].terminate();
				delete cacheWorkers[this.name];
			}
			if (this.worker) this.worker.terminate();
			delete this.worker;
		}

		destroy() {
			if (this.code in cacheUrls) {
				URL.revokeObjectURL(cacheUrls[this.code]);
				delete cacheUrls[this.code]
			}
			this.terminate()
			delete cacheWorkers[this.name]
		}

		connect() {
			this.close();
			cacheWorkers[this.name] = this.worker = createLocaleWorker(this.mainHandles, this.workerHandles);
		}

		send(...a) {
			try {
				this.worker.postMessage(a);
			} catch (e) {
				log('想要发送的数据', a)
				log('worker异常关闭，纠正了错误！')
				this.connect()
				this.worker.postMessage(a);
			}
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

let lw = new LocaleWorker('test',

	{
		message:()=>{
		},
		error:()=>{
		},
		massageerror:()=>{
		},
	},

	{
		message(){
			send()
		},
		close(){
		},
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



/* {
	let { log } = console
	let cache = {}
	// let cacheurljs = function cacheurljs(url, callback) {
	// 	if (cache[url]) return callback(cache[url])

	// 	let q = new XMLHttpRequest()
	// 	q.open('get', url)// 'worker.js'
	// 	q.onload = ({ target: { responseText } }) => {
	// 		let code = responseText
	// 		let blob = new Blob([code], { type: 'text/javascript' })
	// 		let objectURL = URL.createObjectURL(blob)

	// 		cache[url] = { code, blob, objectURL }
	// 		callback(cache[url])
	// 	};
	// 	q.send(null)
	// };

	let creator = function creator(name, code) {
		if (!code) code = ''
		let blob = new Blob([code], { type: 'text/javascript' })
		let objectURL = URL.createObjectURL(blob)
		return cache[name] = { code, blob, objectURL }
	};

	let cacheFn = function cacheFn(name, fn) {
		let code;
		let fnType = typeof fn;
		if (fnType === 'function') {
			code = fn.toString()
			if (code.charCodeAt(0) === 102) {
				// function (){...}
				let start = code.indexOf('{') + 1
				let end = code.lastIndexOf('}')
				code = code.slice(start, end).trim()
			} else {
				// ()=>{...}    or    ()=>...    or    e=>...
				let m = code.match(/^\s*([0-9A-Za-z\$_]|\(.+?\))\s*=>\s*\{?/u);
				let start = m[0].length;
				let length = code.length;
				let end = code.charCodeAt(length - 1) === 125 ? -1 : length;// }
				code = code.slice(start, end).trim()
			}
		} else if (fnType === 'string') {
			code = fn.trim()
		}
		let b = cache[name] !== null && typeof cache[name] === 'object';
		if (b) {
			if (cache[name].code !== code) {
				creator(name, code)
			}
		} else {
			creator(name, code)
		}
		return cache[name];
	};

	let listen = function (k, cw, w, f) {
		if (typeof f === 'function') {
			if (k === 'message') {
				// message
				w.addEventListener(k, (e) => Reflect.apply(f, cw, [e.data]))
			} else {
				// error | messageerror
				w.addEventListener(k, (e) => Reflect.apply(f, cw, [e]))
			}
		} else if (Array.isArray(f)) {
			f.forEach((f) => {
				Reflect.apply(listen, cw, [k, cw, w, f])
			})
		}
	}

	let hand = function hand(cw, w, handle) {
		let type = typeof handle
		if (handle !== null && type === 'object') {
			Object.keys(handle).forEach(k => {
				// onmessage(MessageEvent)
				// onerror(ErrorEvent)
				// onmessageerror(MessageErrorEvent)
				if (/^(on)?(message|error|messageerror)$/.test(k)) {
					if (/^on/.test(k)) k = k.slice(2)
					let f = handle[k]
					listen(k, cw, w, f)
				}
			})
		} else if (type === 'function') {
			w.addEventListener('message', (e) => Reflect.apply(handle, w, [e.data]))
		}
	}
fn           worker中的代码
		handle     

	let CachedWorker = function (name, fn, handle) {
		if (!(this instanceof CachedWorker)) return new CachedWorker(name, fn, handle)
		this.name = name
		this.handle = handle
		let cache = cacheFn(name, fn)
		let { code, objectURL } = cache
		this.createWorker(objectURL, handle, name)
	}

	Object.defineProperties(CachedWorker.prototype, {
		flush: {
			value() {
				this.createWorker(this.objectURL, this.handle)
			},
			enumerable: true,
		},
		createWorker: {
			value(objectURL, handle, name) {
				let w = this.worker
				if(w instanceof Worker) w.terminate()
				w = new Worker(objectURL, { name })
				hand(this, w, handle)
				this.worker = w
			},
			enumerable: true
		},
		postMessage: { value(...args) { this.worker.postMessage(...args) }, enumerable:true } ,
		cache: { get() { return cacheFn(this.name) }, enumerable: true },
		code: { get() { return this.cache.code }, enumerable: true },
		objectURL: { get() { return this.cache.objectURL }, enumerable: true },
	})

	Object.defineProperty(this, 'CachedWorker', { value: CachedWorker, enumerable: true })
	Object.defineProperty(CachedWorker, 'cache', { value: cache, enumerable: true })
}

let w1 = CachedWorker('w1', function () {
	postMessage(123123123)
	// postMessage(()=>{})
	// throw new Error('e')
	onmessage = function({data:e}){
		console.log(name, e)
		// close()
	}
}, {
	message(e){
		log(e)
	},
	error(e){
		log('error', e)
	},
	messageerror(e){
		log('merr', e)
	}
})
w1.postMessage('lalala..')


let w2 = CachedWorker('w2', 'onmessage=({data})=>{console.log(name, data)}')
w2.postMessage('hahaha!!')
// w2.terminate()// 这里比postMessage要快
*/