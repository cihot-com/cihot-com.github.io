"use strict"

// 用于同时对好几个对象进行相同的读写操作   link(a,b,c).name
function link(...objects) {
	objects = objects.filter(e => {
		let type = typeof e;
		return (type === 'object' && e) || type === 'function';
	});
	return new Proxy(Object.create(null), {
		get(o, k, p) {
			let result = objects.map(e => Reflect.get(e, k));
			result._proxy = p;
			result._objects = objects;
			return result;
		},
		set(o, k, v, p) {
			objects.forEach(e => Reflect.set(e, k, v));
		}
	});
}