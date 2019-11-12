function uid() {
	if (!uid.mark) uid.mark = Math.random().toString(36).substr(4, 2)
	if (!(uid.counter instanceof Map)) uid.counter = new Map()
	let now = Date.now().toString(36).padStart(8, '0')
	let rand = Math.random().toString(36).slice(2).padEnd(12, '0')
	let mark = uid.mark;
	let prefix = now + rand + uid.mark;
	let count
	if (uid.counter.has(prefix)) {
		count = uid.counter.get(prefix) + 1;
	} else {
		count = 1;
	}
	uid.counter.clear();
	uid.counter.set(prefix, count);
	count = count.toString(36);
	id = prefix + count;
	return {
		id,
		mark,
		now,
		rand,
		count,
		toString() { return id },
		toJSON() { return id },
		getDate() { Date.parse(parseInt(now,36)) }
	}
}


try {
	module.exports = uid
} catch (e) {
	this.uid = uid
}