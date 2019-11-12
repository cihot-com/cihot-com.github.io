class Collection {
	static s = {}
	constructor(name) {
		if (Collection.s[name]) return Collection.s[name];
		Collection.s[name] = this;
		this.e = {}
	}
	has(name) {
		return this.e.hasOwnProperty(name);
	}
	get(name) {
		return this.e[name] || null;
	}
	set(name, value) {
		this.e[name] = value;
		return this;
	}
	del(name) {
		delete this.e[name];
		return this;
	}
}
export { Collection };
