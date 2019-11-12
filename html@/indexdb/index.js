let { log, error, warn, info, table } = console

function connect(name, version = 1) {
	return new Promise((resolve, reject) => {
		let request = indexedDB.open(name, version)
		request.addEventListener('success', e => {
			console.log('连接数据库成功', e)
			let db = request.result
			resolve(db)
		})

		request.addEventListener('error', e => {
			console.log('连接数据库失败', e)
			// reject(e)
		})
		request.addEventListener('blocked', e => {
			console.error('已被屏蔽', e)
			// reject(e)
		})
		request.addEventListener('upgradeneeded', e => {
			console.error('升级', e)
			let db = request.result
			upgrade(db, {
				store0: { autoIncrement: 1 },
				store1: { keyPath: 'key', autoIncrement: 1 },
				store2: { keyPath: 'key', autoIncrement: 0 }
			}, {})
		})
	})
}


function upgrade(db, stores, indexs) {
	let result = { stores: {} }

	for (let name in stores) {
		let { keyPath, autoIncrement } = stores[name]
		let options = {}
		// keyPath 只能是一个，且为字符串。
		if (keyPath) options.keyPath = keyPath

		// if (autoIncrement) options.autoIncrement = true
		if (autoIncrement) options.autoIncrement = autoIncrement
		let store = db.createObjectStore(name, options)
		result[name] = store
		console.log('创建对象仓库成功', name, options)

		let indexs = store.indexs
		for (let name in indexs) {
			let { keyPath, options } = indexs[name]
			if (keyPath) {


				store.createIndex(name, keyPath, options)
				// options.unique
				// options.multiEntry   如果keyPath为数组：true时每个元素，false整个建立

				log(store.name, '创建索引成功', name, keyPath, options)
			}
		}
	}

}

function readwrite(name) {
	let tx = db.transaction(name, 'readwrite')

}

function readonly() {
	let tx = db.transaction(name, 'readonly')

}


function initStores(db, mode = 'readwrite') {
	return new Proxy(Object.create(null), {
		get(o, k, p) {
			let f = Array.prototype.some
			let b = f.call(db.objectStoreNames, (e) => k === e)
			let result
			if (b) {
				let tx = db.transaction(k, mode)
				tx.addEventListener('abort', (e) => {
					warn(e)
				})
				tx.addEventListener('success', (e) => {
					log(e.target.result)
				})
				tx.addEventListener('error', (e) => {
					error(e)
				})
				let store = tx.objectStore(k)
				// log(store.name)
				// log(store.keyPath)
				// log(store.autoIncrement)
				// log(store.transaction)// {name, version, mode, db, objectStoreNames, onabort, oncomplete, onerror}
				// log(store.indexNames)
				// add(), clear(), count(), createInedex(), delete(), deleteIndex(), get(), getAll(), getAllKeys(), getKey(), index(), openCursor(), openKeyCursor(), put 

				result = new Proxy(store, {
					get(o, k, p) {
						if (typeof o[k] === 'function') {
							if (k === 'openCursor' || k === 'openKeyCursor') {
								return function (range, direction, ack) {
									// c.direction    'next'或'nextunique'或'prev'或'prevunique'
									// c.primaryKey 1
									// c.source store
									// c.key 1
									// c.value      'next'
									// c.update(), c.delete(), c.
									let b = typeof ack === 'function'
									let q = o[k].call(o, range, direction)
									q.addEventListener('success', (e) => ack(e.target.result, e.source))
									q.addEventListener('error', function (e) { if (b) { ack(q.error, q.result) } reject(q.error) })

								}
							}
							return new Proxy(o[k], {
								apply(f, p, a) {
									return new Promise((resolve, reject) => {
										let len = a.length
										let ack = a[len - 1]
										let b = typeof ack === 'function'
										if (b) a.pop()
										let q = Reflect.apply(f, o, a)
										// log(q.readyState)// 'pending'或'done'
										// log(q.result)// 必须完成后调用，否则报错。
										// log(q.error)// 必须完成后调用，否则报错。
										// log(q.source)// IDBObjectStore实例 或 IDBIndex实例
										// log(q.transaction)// IDBTransaction实例
										// log(q.transaction===store.transaction)// 相同
										q.addEventListener('success', function (e) { log(1, e); if (b) { ack(q.error, q.result) } resolve(q.result) })
										q.addEventListener('error', function (e) { if (b) { ack(q.error, q.result) } reject(q.error) })
									})
								}

							})
						}
						return o[k]
					}
				})
			}
			return result
		}
	})
}



let x
!function test() {
	connect('demo').then(db => {
		x = db
		log(db.name, db.objectStoreNames)

		db.r = initStores(db, 'readonly')
		db.w = initStores(db, 'readwrite')

		// log(db.w.store0.add({a:1},log))

		db.w.store0.openCursor(IDBKeyRange.lowerBound(2), 'prev', function (c) {
			if(c){
				log(c.key, c.value)
				c.continue()
			}else{
				log('end')
			}
		})
	})

}()