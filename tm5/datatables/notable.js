class NoTable {
	constructor() {
		this.table = document.createElement('table');
		this.bodyData = [];
		this.headData = [];
		this.filteredBodyData = [];
	}

	body(data) {
		this.bodyData = Array.isArray(data) ? data : [];
		return arguments.length ? this : this.bodyData;
	}

	// ['name', {age:'年龄'}, ['sex','性别'], {key:'job',value:'工作'}]
	head(data) {
		let ret = [];
		if (Array.isArray(data)) {
			for (let i = 0, len = data.length; i < len; i++) {
				let e = data[i];
				if (e === undefined || e === null) continue;

				let o = Object.create(null);
				let type = typeof e;
				if (type === 'string') {
					o.k = e;
					o.v = e;
					ret.push(o);
				} else if (type === 'object' && e !== null) {
					if (Array.isArray(e)) {
						o.k = e[0];
						o.v = e[1];
						ret.push(o);
					} else {
						e = Object.entries(e)[0];
						if (Array.isArray(e)) {
							o.k = e[0];
							o.v = e[1];
							ret.push(o);
						}
					}
				}
			}
		}
		this.headData = ret;
		return arguments.length ? this : this.headData;
	}

	filterBodyData() {
		let ret = [];
		let d = this.bodyData;
		let h = this.headData;
		let dLen = d.length;
		let hLen = h.length;
		if (Array.isArray(d) && Array.isArray(h) && dLen && hLen) {
			for (let i = 0; i < dLen; i++) {
				let e = d[i];// 行数据
				if (e === undefined || e === null) continue;
				let row = [];
				for (let j = 0; j < hLen; j++) {
					let k = h[j].k;// 键
					let v = e[k];
					let o = Object.create(null);
					o.k = k;
					o.v = v;
					row.push(o);
				}
				ret.push(row);
			}
		}
		this.filteredBodyData = ret;
		return arguments.length ? this : this.filteredBodyData;
	}

	htmlHead() {
		let hd = this.headData;
		let hdLen = hd.length;

		if (hdLen) {
			let thead = document.createElement('thead');
			let tr = document.createElement('tr');
			thead.appendChild(tr);
			this.table.appendChild(thead);
			for (let i = 0; i < hdLen; i++) {
				let td = document.createElement('td');
				td.classList.add(hd[i].k);
				td.textContent = hd[i].v;
				tr.appendChild(td);
			}
		}
		return this;
	}
	createHtmlBody(start = 0, column) {
		let fbd = this.filteredBodyData;
		let fbdLen = fbd.length;

		if (fbdLen) {
			let tbody = document.createElement('tbody');
			this.table.appendChild(tbody);
			for (let i = start; i < fbdLen; i++) {
				let d = fbd[i];
				let dLen = d.length;
				let tr = document.createElement('tr');
				tbody.appendChild(tr);
				for (let i = 0; i < dLen; i++) {
					let o = d[i];
					let td = document.createElement('td');
					td.classList.add(o.k);
					td.textContent = o.v;
					tr.appendChild(td);
				}
			}
		}
		return this;
	}

	colgruop(...args) {
		let s = this.table.querySelectorAll('colgroup');
		for (let i = 0, len = s.length; i < len; i++) {
			let e = s.item(i);
			e.remove();
		}
		args.forEach((o) => {
			let node = document.createElement('colgroup');
			// this.table.insertAdjacentElement('afterbegin', node);
			this.table.appendChild(node);
			if(typeof o === 'object' && o !== null) {
				for (let k in o) {
					let v = o[k];
					if(k==='width' && typeof v==='number') {
						if(v<1) {
							v = v*100+'%';
						}
					}
					node.setAttribute(k, v);
				}
			}
		});
	}

	editable(k, b = true) {
		let s = this.table.getElementsByClassName(k);
		let len = s.length;
		let v = b ? 'plaintext-only' : false;
		for (let i = 0; i < len; i++) {
			let e = s.item(i);
			e.contentEditable = v;
		}
		return this;
	}
}



let noTable = new NoTable();
document.body.appendChild(noTable.table);

noTable.body([
	{ name: '金大大', age: 1983, job: '游戏', sex: '男' },
	{ name: '董大大', age: 1995, job: '餐饮', sex: '女' },
	{ name: '金小小', age: 2014, job: '孩子', sex: '女' },
]);

noTable.head(['name', 'sex', 'job', 'age']).filterBodyData(1).createHtmlBody();
noTable.editable('age', true);
console.log(noTable);
noTable.colgruop({span:2,width:100}, null, {width:80})