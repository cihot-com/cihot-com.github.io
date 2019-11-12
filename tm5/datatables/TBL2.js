/* 
数据绑定，渲染需要个数的tr。

*/

class TBL {
	constructor(table) {
		if (!(table instanceof HTMLTableElement)) throw new TypeError(table); // 参数table不是<TABLE>时报错！
		if (table.tbl instanceof TBL) return table.tbl;                       // 若有现成的table.tbl就直接使用。
		Object.defineProperty(this, 'table', { value: table });               // 扩展this.table
		if (!table.tbl) {
			Object.defineProperty(table, 'tbl', { value: this });             // 没有table.tbl时进行赋值。
		}
	}

	appendTo(parent) {
		if (parent instanceof Element) {      // 如果parent是Element实例
			parent.appendChild(this.table);   // 将table加入到parent中
		}
	}

	initthead() {
		let table = this.table;
		if (!table.querySelector('thead')) {
			let thead = document.createElement('thead');
			table.insertAdjacentElement('afterbegin', thead);
			thead.appendChild(document.createElement('tr'));
			this.thead = thead;// 可变
		} else {
			this.thead = table.querySelector('thead');
		}
	}

	get thead() {
		let table = this.table;
		let thead = table.querySelector('thead')
		if (!thead) thead = table.insertAdjacentElement('afterbegin', document.createElement('thead'));
		return thead;
	}

	get tbody() {
		let table = this.table;
		let tbody = table.querySelector('tbody');
		if (!tbody) tbody = table.appendChild(document.createElement('tbody'));
		return tbody;
	}

	get tfoot() {
		let table = this.table;
		let tfoot = table.querySelector('tfoot');
		if (!tfoot) tfoot = table.appendChild(document.createElement('tfoot'));
		return tfoot;
	}

	get caption() {
		let table = this.table;
		let caption = table.querySelector('caption');
		if (!caption) caption = table.appendChild(document.createElement('caption'));
		return caption;
	}

	// headers('source',{target:'译文'},['no','序号'])
	headers(...keys) {
		this._headers = [];

		let keysLength = keys.length;
		if (keysLength === 0) {
			return this;
		}
		
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

		let thead = this.thead;
		let tr = thead.querySelector('tr');
		if (!tr) tr = thead.appendChild(document.createElement('tr'));
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

	down(index) {
		let e;

		this.tbody.innerText = '';

		
		while(e = this._data[index++]) {
			let tr = this.tbody.appendChild(document.createElement('tr'));

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
				let tr = this.tbody.appendChild(document.createElement('tr'));
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
		if (last === this.tbody.querySelector('tr:last-child')) {
			console.log('bottom');
			this.tbody.style.backgroundImage = 'linear-gradient(to top, #0001 8px, transparent 0)';
			clearTimeout(this.rowDownTimeout);
			this.rowDownTimeout = setTimeout(() => {
				this.tbody.style.backgroundImage = '';
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
		if (first === this.tbody.querySelector('tr:first-child')) {
			console.log('top');
			this.tbody.style.backgroundImage = 'linear-gradient(to bottom, #0001 8px, transparent 0)';
			clearTimeout(this.rowUpTimeout);
			this.rowUpTimeout = setTimeout(() => {
				this.tbody.style.backgroundImage = '';
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
		return this.tbody.querySelector('tr:not([hidden])');
	}

	last() {
		let trs = this.tbody.querySelectorAll('tr:not([hidden])');
		let trsLength = trs.length;
		if (trsLength === 0) {
			return null;
		} else {
			return trs.item(trs.length - 1);
		}
	}

	tr(index = 0) {
		return this.tbody.querySelectorAll('tr:not([hidden])').item(index);
	}

	rows() {

	}

	filter(fn) {
		if (!this.filterData) this.filterData = this._data;
		this.filterData = this.filterData.filter(fn)
	}
}

