class RegArea {
	constructor() {
		this.s = ''
		this.n = NaN
		this.ongoing = false
		this.begin = false// 是否开始
		this.bn
		this.done = false
	}
	update(n) {
		if(this.done) return this.s;
		if (this.begin === false) {
			this.s += RegArea.unicode(n);
			this.n = n;
			this.begin = true
		} else {
			if (this.n + 1 === n) {
				if (this.ongoing) {
					this.n = n
				} else {
					this.s += '-'
					this.ongoing = true
					this.bn = this.n
					this.n = n
				}
			} else {
				if (this.bn === this.n) {
					this.s = this.s.slice(0, -6)
				} else {
					this.s += RegArea.unicode(this.n)
					this.s += RegArea.unicode(n)
				}
				// init
				this.n = n
				this.begin = true
				this.ongoing = false
			}
		}
	}
	end() {
		if(this.done) return this.s;
		if (this.ongoing) this.s += RegArea.unicode(this.n)
		this.s = '['+this.s+']';
		return this.s
	}

	static unicode(n) {
		return '\\u' + n.toString(16).padStart(4, '0');
	}
}

/* let area = new RegArea()
let a = [0, 1, 2, 6, 7, 9, 10, 11]
a.forEach(e => area.update(e))
area.end()
log(area.s) */