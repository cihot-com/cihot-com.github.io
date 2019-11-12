function randStr() {
	let ret = Math.random().toString(36).slice(2);
	if (Math.random() > 0.5) {
		let pos = 4 + Math.ceil(Math.random() * ret.length - 5);
		ret = ret.replace(new RegExp(`(?<=[\\s\\S]{${pos}})`), '\n');
	}
	return ret;
}