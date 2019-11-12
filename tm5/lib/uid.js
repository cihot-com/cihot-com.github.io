/* 
ms    缓存uid的时间，默认为5秒。

id为最终结果
mark为唯一标识，运行uid时，只能获取到1个。
uid.counter 是避免uid重复的机制，当now+rand一样时就会累计次数。
*/
function uid(ms = 5000) {
	let _date = new Date()
	let now = _date.getTime().toString(36).padStart(8, '0')
	let rand = Math.random().toString(36).slice(2).padEnd(12, '0')
	let mark = uid.mark;
	let prefix = now + rand + uid.mark;
	let count
	if (uid.counter.has(prefix)) {
		count = uid.counter.get(prefix) + 1;
	} else {
		count = 1;
	}
	uid.counter.set(prefix, count);
	count = count.toString(36).padStart(3, '0');
	id = prefix + count;

	setTimeout(() => uid.counter.clear(), ms)
	
	return {
		id,
		mark,
		now,
		rand,
		count,
		toString() { return id },
		toJSON() { return id },
		getDate() { return _date }
	}
}
uid.counter = new Map()
uid.mark = Math.random().toString(36).substr(4, 2)
Object.freeze(uid)

try {
	module.exports = uid
} catch (e) {
	this.uid = uid
}

