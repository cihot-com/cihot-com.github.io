class TBL {
	constructor(table) {
		if (!(table instanceof HTMLTableElement)) throw new TypeError(table);
		if (table.tbl instanceof TBL) return table.tbl;

		Object.defineProperty(this, 'table', { value: table });

		if (!table.tHead) {
			let tHead = document.createElement('thead');
			table.insertAdjacentElement('afterbegin', tHead);
			tHead.appendChild(document.createElement('tr'));
			this.tHead = tHead;// 可变
		} else {
			this.tHead = table.querySelector('thead');
		}

		if (table.tBodies.length === 0) {
			let tBody = document.createElement('tbody');
			table.appendChild(tBody);
			this.tBody = tBody;// 可变
		} else {
			this.tBody = table.querySelector('tbody');
		}

		if (!table.tbl) {
			Object.defineProperty(table, 'tbl', { value: this });
		}
	}

	parentSize() {
		// let height = this.table.getBoundingClientRect().height;
		// let pe = this.table.parentElement;
		// do {
		// 	let h = pe.getBoundingClientRect().height;
		// 	if(height>h) height =h;
		// } while(pe = pe.parentElement);
		// return height;
		let ph = this.table.parentElement.getBoundingClientRect().height;
		let wh = window.innerHeight;
		return ph ? Math.min(ph, wh) : wh;
	}

	data(data) {
		if (data && Array.isArray(data)) {
			let height = this.parentSize();
			console.log(height)
			this._data = data;
			data.forEach((e, i) => {
				let tr = this.tBody.appendChild(document.createElement('tr'));
				for (let key in e) {
					let value = e[key];
					let td = tr.appendChild(document.createElement('td'));
					td.hidden = true;
					td.className = key;
					td.textContent = value;
				}
				if (tr.getBoundingClientRect().bottom > height) tr.hidden = true;
			});
			return this;
		} else {
			return this._data;
		}
	}


	rowDown() {
		let last = this.last()
		if (last === this.tBody.querySelector('tr:last-child')) {
			console.log('bottom');
			this.tBody.style.backgroundImage = 'linear-gradient(to top, #0001 8px, transparent 0)';
			clearTimeout(this.rowDownTimeout);
			this.rowDownTimeout = setTimeout(() => {
				this.tBody.style.backgroundImage = '';
			}, 1000)
			return this;
		}

		let first = this.first()
		if (last === first) return this;

		let height = this.parentSize();
		let currentFirst = first;

		while (true) {
			currentFirst = currentFirst.nextElementSibling;
			if (!currentFirst) {
				break;
			} else if (!currentFirst.hidden) {
				break;
			}
		}


		if (first === currentFirst || !currentFirst) return this;
		first.hidden = true;


		let current = currentFirst;
		let finishd = false;
		while (current = current.nextElementSibling) {
			if (finishd) {
				current.hidden = true;
			} else {
				current.hidden = false;
				let rect = current.getBoundingClientRect()
				if (rect.bottom > height) {
					// current.hidden = true;
					finishd = true;
				}
			}
		}
		return this;
	}

	rowUp() {
		let first = this.first()
		if (first === this.tBody.querySelector('tr:first-child')) {
			console.log('top');
			this.tBody.style.backgroundImage = 'linear-gradient(to bottom, #0001 8px, transparent 0)';
			clearTimeout(this.rowUpTimeout);
			this.rowUpTimeout = setTimeout(() => {
				this.tBody.style.backgroundImage = '';
			}, 500);
			return this;
		}
		let last = this.last()
		if (last === first) return this;

		let currentLast = last;

		while (true) {
			currentLast = currentLast.previousElementSibling;// or null
			if (!currentLast) {
				break;
			} else if (!currentLast.hidden) {
				break;
			}
		}
		if (last === currentLast || !currentLast) return this;
		console.log(last, currentLast)

		last.hidden = true;
		let height = this.parentSize();

		let current = currentLast;
		let finishd = false;
		while (current = current.previousElementSibling) {
			if (finishd) {
				current.hidden = true;
			} else {
				current.hidden = false;
				let rect = currentLast.getBoundingClientRect()
				if (rect.bottom > height) {
					// current.hidden = true;
					finishd = true;
				}
			}
		}
		return this;
	}

	first() {
		return this.tBody.querySelector('tr:not([hidden])');
	}

	last() {
		let trs = this.tBody.querySelectorAll('tr:not([hidden])');
		let trsLength = trs.length;
		if (trsLength === 0) {
			return null;
		} else {
			return trs.item(trs.length - 1);
		}
	}

	tr(index = 0) {
		return this.tBody.querySelectorAll('tr:not([hidden])').item(index);
	}

	head(...keys) {
		let keysLength = keys.length;
		if (keysLength === 0) return this;

		let headers = [];
		this.headers = headers;

		let headerTexts = [];
		this.headerTexts = headerTexts;

		for (let i = 0; i < keysLength; i++) {
			let e = keys[i];
			let type = typeof e;
			if (type === 'string') {
				headers.push({ [e]: e });
				headerTexts.push(e);
			} else if (type === 'object' && e !== null) {
				let k = Object.keys(e)[0];
				let v = String(e[k]);
				headers.push({ [k]: v });
				headerTexts.push(v);
			} else {
				let v = String(e);
				headers.push({ [v]: v });
				headerTexts.push(v);
			}
		}

		let headerTextsLength = headerTexts.length;
		if (headerTextsLength === 0) return this;

		let tr = this.tHead.querySelector('tr');
		if (!tr) tr = this.tHead.appendChild(document.createElement('tr'));
		let tds = tr.querySelectorAll('td');
		let tdsLength = tds.length;

		if (headerTextsLength === tdsLength) {
			let i = 0;
			for (; i < headerTextsLength; i++) {
				let k = headerTexts[i];
				let td = tds.item(i);
				td.textContent = k;
				td.className = k;
			}
		} else if (headerTextsLength < tdsLength) {
			let i = 0;
			for (; i < headerTextsLength; i++) {
				let k = headerTexts[i];
				let td = tds.item(i);
				td.textContent = k;
				td.className = k;
			}
			for (; i < tdsLength; i++) {
				tds.item(i).hidden = true;
			}
		} else if (tdsLength < headerTextsLength) {
			let i = 0;
			for (; i < tdsLength; i++) {
				let k = headerTexts[i];
				let td = tds.item(i);
				td.textContent = k;
				td.className = k;
			}
			for (; i < headerTextsLength; i++) {
				let k = headerTexts[i];
				let td = tr.appendChild(document.createElement('td'))
				td.textContent = k;
				td.className = k;
			}
		}
		return this;
	}

	rows() {

	}

	filter(fn) {
		if (!this.filterData) this.filterData = this._data;
		this.filterData = this.filterData.filter(fn)
	}
}

