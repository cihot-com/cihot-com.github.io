if (localStorage) {
	let proto = localStorage.__proto__;
	if (!proto.forEach) {
		proto.forEach = function (callback) {
			for (let i = 0, len = this.length; i < len; i++) {
				let k = this.key(i)
				let v = this.getItem(k)
				callback(v, k, i)
			}
		}
	}

	if (!proto.set) {
		proto.set = function (k, v) {
			if (v instanceof Function) {
				v = 'undefined'
			} else if (v === null || v === undefined) {
				v = String(v)
			} else {
				v = JSON.stringify(v)
			}
			localStorage.setItem(k, v)
		}
	}

	if(!proto.get) {
		proto.get = function (k) {
			let v = localStorage.getItem(k)
			if(v) {
				if(v==='undefined') {
					v = undefined
				}else {
					v = JSON.parse(v)
				}
			}
			return v
		}
	}

	if(!proto.remove) {
		proto.remove = localStorage.removeItem
	}
}
