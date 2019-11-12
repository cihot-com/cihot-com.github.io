function Body(name = 'main') {
	this.name = (typeof name === 'string' && name.length > 0) ? name : generateName()
}
Object.defineProperty(Body.prototype, 'content', {
	get() { return this._rows },
	set(v) { this._rows = v },
	enumerable: true
})
Body.prototype.getRows = function getRows() {
	let v = ((name) => {
		let v = this[name]
		if (Array.isArray(v)) {
			return v
		} else if (v !== undefined) {
			this[name] = undefined
		}
		return false
	})// 注意：这里如果不用箭头函数的话，this将被解析为window。
	return v('_sortedRows') || v('_filteredRows') || v('_rows') || (this._rows = [])// 到最后都没有就重置_rows
}
Body.prototype.setRows = function setRows(rows) {
	this._sortedRows = this._filteredRows = undefined
	this._rows = Array.isArray(rows) ? rows : []
	return this
}
Body.prototype.to = function (o) {
	if(o instanceof HTMLTableElement) {
		this.parent = o
		let tBody = o.tBodies.namedItem(this.name)
		if(!tBody) {
			tBody = o.tBodies.item(0)
			let tBodyName = tBody.getAttribute('name')
			if(tBodyName) {
				tBody = document.createElement('tbody')
				o.appendChild(tBody)
			}else{
				tBody.setAttribute('name',this.name)
			}
		}
		this.element = tBody
	}
}
Body.prototype.from = function (o) {
	this.OK = Boolean(
		this.fromTable(o) ||
		this.fromTBody(o) ||
		this.fromArray(o) ||
		this.fromBody(o))
	return this
}
// 导入表格数据，如果有tHead，那this._rows就根据tHead弄成对象数据，如果没有tHead，那就只弄成数组数据。
Body.prototype.fromTable = function (o) {
	if (o instanceof HTMLTableElement) {
		this.parent = o
		let tbs = o.tBodies
		let tb = tbs.namedItem(this.name)
		if (!tb) {
			tb = tbs.item(0)
			if (!tb) {
				tb = document.createElement('tbody')
				o.appendChild(tb)
			}
			tb.setAttribute('name', this.name)
		}
		this.element = tb
		let c = this._rows = []
		if (o.tHead) {
			this.fieldNames = Array.from(o.tHead.querySelectorAll('tr:nth-child(1) th')).map(th => th.textContent)
			if (this.fieldNames.length === 0) this.fieldNames = undefined
		}
		tb.querySelectorAll('tr').forEach(tr => {
			if (this.fieldNames) {
				let row = Object.create(null)
				c.push(row)
				tr.querySelectorAll('td').forEach((td, i) => {
					row[this.fieldNames[i]] = td.textContent
				})
			} else {
				let row = []
				c.push(row)
				tr.querySelectorAll('td').forEach(td => {
					row.push(td.textContent)
				})
			}
		})
		this.OK = true
	} else {
		this.OK = false
	}
	return this
}
Body.prototype.fromTBody = function (o) {
	if (o instanceof HTMLTableSectionElement) {
		this.element = o
		let c = this.content = []
		o.querySelectorAll('tr').forEach(tr => {
			let row = []
			c.push(row)
			tr.querySelectorAll('td').forEach(td => {
				row.push(td.textContent)
			})
		})
		this.OK = true
	} else {
		this.OK = false
	}
	return this
}
Body.prototype.fromArray = function (o) {
	if (Array.isArray(o)) {
		o.filter((row => Array.isArray(row) && row.length > 0) || (typeof row === 'object' && row !== null))
		this.OK = true
	} else {
		this.OK = false
	}
	return this
}
Body.prototype.fromBody = function (o) {
	if (o instanceof Body) {
		this.element = o.element
		this.content = o.content
	}
}
Body.prototype.ok = function () {
	return this.OK
}

Body.prototype.add = function (...rows) {
	if (Array.isArray(this._rows)) this._rows.splice(this._rows.length, 0, ...rows)
	if (Array.isArray(this._sortedRows)) this._sortedRows.splice(this._rows.length, 0, ...rows)
	if (Array.isArray(this._filteredRows)) this._filteredRows.splice(this._rows.length, 0, ...rows)
	return this
}

Body.prototype.filter = function filter(f, re = false) {
	this._filteredRows = (re ? this._rows : this.getRows()).filter(f)
	return this
}
Body.prototype.clearFilter = function () {
	this._filteredRows = undefined
	return this
}
Body.prototype.sort = function sort(o, re = false) {
	this._sortedRows = re ? this._rows : (this._filteredRows || this._rows)
	this._sortedRows.sort((a, b) => {
		let k, v, r
		for (k in o) {
			v = o[k]
			if (v === 0) continue
			r = this.compare(a, b, k, v)
			if (r !== 0) break
		}
		return r
	})
	return this
}
Body.prototype.compare = function compare(a, b, k, v) {
	return v * ( a[k] > b[k] ? 1 : (a[k] < b[k] ? -1 : 0) )
}
Body.prototype.clearSort = function () {
	this._sortedRows = undefined
	return this
}
Body.prototype.empty = function(){
	if(this.element instanceof HTMLTableSectionElement) {
		this.element.remove()
		this.element = undefined
	}
	return this
}
Body.prototype.make = function(){
	if(this.element instanceof HTMLTableSectionElement) {
		let rows = this.getRows()
		this.element.querySelectorAll('tr').forEach((tr,i)=>{
			let row = rows[i]
			tr.querySelectorAll('td').forEach((td,i)=>{
				td.textContent = row[ this.fieldNames ? this.fieldNames[i] : i]
			})
		})
		return this
	}else if(this.parent instanceof HTMLTableElement){
		if (this.parent.tHead) {
			this.fieldNames = Array.from(this.parent.tHead.querySelectorAll('tr:nth-child(1) th')).map(th => th.textContent)
			if (this.fieldNames.length === 0) this.fieldNames = undefined
		}
		let tb = document.createElement('tbody')
		tb.setAttribute('name',this.name)
		this.element = tb
		this.parent.appendChild(tb)
		let rows = this.getRows()
		rows.forEach(row=>{
			let tr = document.createElement('tr')
			if(this.fieldNames){
				this.fieldNames.forEach(k=>{
					let td = document.createElement('td')
					td.textContent = row[k]
					tr.appendChild(td)
				})
			}else{
				row.forEach(v=>{
					let td = document.createElement('td')
					td.textContent = v
					tr.appendChild(td)
				})
			}
			tb.appendChild(tr)
		})
	}else{
		
	}
	return this
}
// make(void 0)
// make(true)
// make(table)
// make(tbody)
// make(body)
// Body.prototype.make = function (o) {
// 	if (o instanceof HTMLTableElement) {
// 		this.make(o.tBodies.namedItem(this.name), o)
// 	}
// 	let rows = this.getRows()
// 	if (!(o instanceof HTMLTableSectionElement)) {// 不是<tbody>
// 		o = document.createElement('tbody')
// 		o.setAttribute('name', this.name)
// 		rows.forEach(row => {
// 			let tr = document.createElement('tr')
// 			o.appendChild(tr)
// 			row.forEach(e => {
// 				let td = document.createElement('td')
// 				td.textContent = e
// 				tr.appendChild(td)
// 			})
// 		})
// 		let p = arguments[1] || this.element && this.element.parentElement
// 		if (p instanceof HTMLTableElement) {
// 			let tbody = p.tBodies.namedItem(this.name)
// 			if (tbody) {
// 				tbody.replaceWith(o)
// 			} else {
// 				arguments[1].appendChild(o)
// 			}
// 		}
// 	} else {// 是<tbody>
// 		o.querySelectorAll('tr').forEach((tr, i) => {
// 			let row = rows[i]
// 			tr.querySelectorAll('td').forEach((td, i) => {
// 				if (row) {
// 					let v = row[i] !== undefined ? row[i] : ''
// 					td.textContent = v
// 				} else {
// 					td.textContent = ''
// 				}
// 			})
// 		})
// 	}
// 	this.element = o
// 	return this
// }

// Body.prototype.make = function () {
// 	if (!(this.element instanceof HTMLTableSectionElement)) {
// 		let e = this.element
// 		let p = e.parentElement
// 		let rows = this.getRows()
// 		let ks = []
// 		let hasK = false
// 		if (p instanceof HTMLTableElement) {
// 			let h = p.querySelector('thead')
// 			if (h) {
// 				hasK = true
// 				let i = 0
// 				h.querySelectorAll('th').forEach(th => {
// 					let k = th.textContent.trim()
// 					ks.push(k.length ? k : i++)
// 				})
// 			}
// 		}
// 		e.querySelectorAll('tr').forEach((tr, i) => {
// 			let row = rows[i]
// 			tr.querySelectorAll('td').forEach((td, i) => {
// 				td.textContent = (hasK ? row[ks[i]] : row[i]) || ''
// 			})
// 		})
// 	} else {
// 		this.element = document.createElement('tbody')
// 		let e = this.element
// 		let p = e.parentElement
// 		let rows = this.getRows()
// 		let ks
// 		let hasK = false
// 		if (p instanceof HTMLTableElement) {
// 			let h = p.querySelector('thead')
// 			if (h) {
// 				hasK = true
// 				ks = []
// 				let i = 0
// 				h.querySelectorAll('th').forEach(th => {
// 					let k = th.textContent.trim()
// 					ks.push(k.length ? k : i++)
// 				})
// 			}
// 		}
// 		console.log(hasK, ks)
// 		rows.forEach(row => {
// 			let tr = this.element.appendChild(document.createElement('tr'))



// 			row.map(v => {
// 				let result = Object.create(null)

// 				ks.forEach(k => {
// 					result[k] = v[k]
// 				})
// 				return result
// 			}).forEach(v => {
// 				Array.from(v).forEach(v => {
// 					let td = tr.appendChild(document.createElement('td'))
// 					console.log(v)
// 					td.textContent = v
// 				})
// 			})
// 		})
// 	}
// 	return this
// }


// Body.prototype.makeToTbody = function (o, reflush) {
// 	if (o instanceof HTMLTableElement) {
// 		let tbodyElement = o.tBodies.namedItem(this.name) || o.tBodies.item(0)
// 		if (reflush || !(tbodyElement instanceof HTMLTableSectionElement)) {
// 			tbodyElement = document.createElement('tbody')
// 			o.appendChild(tbodyElement)
// 		}
// 		let rows = this.getRows()

// 		rows.forEach(row => {
// 			let tr = document.createElement('tr')
// 			o.appendChild(tr)
// 			row.forEach(e => {
// 				let td = document.createElement('td')
// 				td.textContent = e
// 				tr.appendChild(td)
// 			})
// 		})
// 		tbodyElement
// 	}
// }
// Body.prototype.makeGrid = function () {
// 	let rows = this.getRows()
// }
// Body.prototype.toGrid = function () {
// 	return this.getRows().map(row => {
// 		let tr = document.createElement('tr')
// 		row.forEach(e => {
// 			let td = document.createElement('td')
// 			td.textContent = e
// 			tr.appendChild(td)
// 		})
// 		return tr
// 	})
// }

// function generateName(size = 8) {
// 	return Math.random().toString(16).substr(2, Math.min(8, size))
// }
// Body.prototype.filterHead = function (o) {
// 	if (o instanceof Head) {
// 		this._filteredRows = this.getRows().map(row => {
// 			return o.toArray().map(k => row[k] || '')
// 		})
// 	} else if (o instanceof HTMLTableSectionElement) {
// 		this._filteredRows = Array.from(o.querySelectorAll('th')).map(th => {
// 			return row[th.textContent]
// 		})
// 	}
// 	return this
// }


