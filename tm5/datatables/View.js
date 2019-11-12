class View {
	constructor() {
		let table = document.createElement('table');
		let thead = document.createElement('thead');
		let tbody = document.createElement('tbody');
		let caption = document.createElement('caption');
		table.appendChild(thead);
		table.appendChild(tbody);
		table.appendChild(caption);
		this.table = table;
		this.thead = thead;
		this.tbody = tbody;
		this.caption = caption;
	}

	headers(...keys) {
		this._headers = keys.map(key => {
			if (typeof key === 'string') {
				return { name: key, className: key };
			} else if (typeof key === 'object' && key) {
				return key;
			}
		});
		return this;
	}

	datas(datas, ...keys) {
		this._datas = Array.isArray(datas) ? datas.slice(0) : [];
		this._datasLength = datas.length
		this._keys = Array.isArray(keys) ? keys.slice(0) : [];
		this._keysLength = keys.length;
		return this;
	}

	drawHeaders(headers) {
		// thead
		if (arguments.length === 0) {
			headers = this._headers;
		}
		this.thead.innerHTML = '';
		let tr = document.createElement('tr');
		headers.forEach(e => {
			let { name, className } = e;
			let td = document.createElement('td');
			td.textContent = name;
			td.className = className;
			tr.appendChild(td);
		});
		this.thead.appendChild(tr);
		return this;
	}

	drawDatas(datas) {
		// tbody
		this.tbody.innerHTML = '';
		datas.forEach((data) => {
			let tr = document.createElement('tr');
			tr.data = data;
			this._keys.forEach((key) => {
				let td = document.createElement('td');
				td.textContent = data[key];
				td.classList.add(key)
				td.dataset.key = key;
				tr.appendChild(td);
			});
			this.tbody.appendChild(tr);
		});
		return this;
	}

	draw() {
		this.drawHeaders(this._headers);
		this.drawDatas(this._datas);
		return this;
	}

	observe(cb) {
		// 原先使用的方法是，侦听'DOMCharacterDataModified'事件。
		// chrome出现黄色警告，建议使用MutationObserver实例，因此改善代码。
		// this.table.addEventListener('DOMCharacterDataModified', (e) => { console.log(e.type, e); });
		// if (!this.synced) {
		// 	this.table.addEventListener('DOMCharacterDataModified', this.onsync, { passive: false });
		// 	this.synced = true;
		// }

		if (!(this.mutationObserver instanceof MutationObserver)) {
			// 创建MutationObserver实例
			this.mutationObserver = new MutationObserver(function (mutationsList) {
				// MDN案例代码使用了对象遍历，但经过测试得出数组遍历效率更快，因此改善代码。
				// for (let mutation of mutationsList) { }

				let tr, td, mutation, current;
				for (let i = 0, len = mutationsList.length; i < len; i++) {
					// mutationsList中包含多个mutation对象，所以当我们获取到需要的TR和TD后就应该退出循环。
					mutation = mutationsList[i];
					// console.log(i, len, mutation.type, mutation.target);
					current = mutation.target;
					if (current.nodeName === 'TBODY') return;// 翻页时触发，就是删除所有TR标签后加入新标签的时候。
					if (mutation.type === 'characterData') {
						current = mutation.target;
					}
					do {
						if (current.nodeName === 'TD') {
							td = current;
						} else if (current.nodeName === 'TR') {
							tr = current;
							break;
						}
					} while (current = current.parentElement)
					if (tr && td) {
						break;
					}
				}
				// console.log(mutation.type, tr,td, current)
				let { key } = td.dataset;
				let { data } = tr;
				// 未解：存在最后一个换行符的问题。最后输入换行符时无法删除。除非最后输入其他字符后才能删除。
				let value = td.textContent.replace(/\n\n$/, '\n');
				if (typeof cb === 'function') {
					// console.log(tr, data)
					cb.call(this, data[key], value, data);
				}
				data[key] = value;
			});
		}
		this.mutationObserver.observe(this.tbody, {
			// attributes: true,
			childList: true,
			characterData: true,
			subtree: true,
		})
		return this;
	}

	disconnect() {
		this.mutationObserver.disconnect();
		return this;
	}

	split(n, isCreateButton = false) {
		this._datasSplit = [];
		let start = 0, end, len = Math.ceil(this._datasLength / n);
		while (start < this._datasLength) {
			end = start + n;
			this._datasSplit.push(this._datas.slice(start, end));
			start = end;
			// console.log(start, end);
		}

		if (isCreateButton) {
			let btn, page = -1;
			while (page < len) {
				btn = document.createElement('a');
				btn.classList.add('pageButton');
				this.caption.appendChild(btn);
				// start-(end-1)
				btn.textContent = page === -1 ? 'All' : page * n;
				btn.dataset.page = page;
				btn.onpointerdown = (e) => {
					// console.log(e.target.dataset.page);
					this.page(e.target.dataset.page);
				};
				page++;
			}
		}
		this._datasSplitLength = this._datasSplit.length;
		return this;
	}

	page(n) {
		let e = this._datasSplit[n];
		if (Array.isArray(e)) {
			this.drawDatas(e);
		} else {
			this.drawDatas(this._datas);
		}
		return this;
	}

	drawCaption() {
		this.caption.innerHTML = '';
	}

}