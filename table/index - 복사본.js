// let table = document.createElement('table')

// document.body.appendChild(table)

// let data = {
// 	head: [{ id: 1, name: 0, desc: 0 }],
// 	body: []
// }

// for (let i = 0, len = 26; i < len; i++) {
// 	data.body.push({
// 		id: i + 1,
// 		name: String.fromCharCode('A'.charCodeAt(0) + i) + Math.floor(10 * Math.random()) + String.fromCharCode('Z'.charCodeAt(0) - i),
// 		desc: 'description',
// 	})
// }

// console.log(data);


// class Table {
// 	constructor(id) {
// 		let element
// 		if (typeof id==='string') {
// 			element = document.getElementById(id)
// 		} else if(id instanceof HTMLTableElement){
// 			element = id
// 		} else {
// 			element = document.createElement('table')
// 			document.body.appendChild(element)
// 		}
// 		this.element = element

// 		this.head = new Set()
// 	}

// 	getIndexByHead(k) {
// 		return Array.from(this.head).indexOf(k)
// 	}

// 	fromArray(body) {
// 		if (Array.isArray(body)) {
// 			body.forEach(e => {
// 				let tr = document.createElement('tr')
// 				for(let k in e){
// 					let v = e[k]
// 					let td = document.createElement('td')
// 					td.textContent(e)
// 					tr.appendChild(td)
// 				}
// 				e.forEach(e => {
// 					let td = document.createElement('td')
// 					td.textContent(e)
// 					tr.appendChild(td)
// 				})
// 				this.element.appendChild(tr)
// 			})
// 		}
// 	}
// 	parseObject(o) {

// 		if(Array.isArray(body)) {
// 			let tr = document.createElement(tr)
// 		}
// 	}
// 	sort(){

// 	}
// }

// let t = new Table(table)
// // t.from(data.body)



// let body = [
// 	{ id: 1, name: 'name', code: 1000 },
// 	{ id: 2, nickname: 'nickname', code: 1000 },
// 	{ id: 3, desc: 'desc', code: 2000 },
// 	{ id: 4, nickname: 'kingais', code: 1000 },
// ]

// function sort(o) {
// 	body.sort((a, b) => {
// 		let k, v, r
// 		for (k in o) {
// 			v = o[k]
// 			if (v === 0) continue
// 			r = compare(a, b, k, v) * v
// 			if (r !== 0) break
// 		}
// 		return r
// 	})
// }

// function compare(a, b, k, v) {
// 	return a[k] > b[k] ? 1 : (a[k] < b[k] ? -1 : 0)
// }

// sort({ code: 1, id: -1 })
// console.log(body)



// init
// let _ksSet = new Set()
// let _ksArray
// let ks = {
// 	add(v) {
// 		if (!_ksSet.has(v)) {
// 			_ksSet.add(v)
// 			_ksArray = Array.from(_ksSet)
// 		}
// 		return this
// 	},
// 	delete(v) {
// 		if (_ksSet.has(v)) {
// 			_ksSet.delete(v)
// 			_ksArray = Array.from(_ksSet)
// 		}
// 		return this
// 	},
// 	index(v) {
// 		return _ksArray.indexOf(v)
// 	},
// 	s() {
// 		return _ksArray
// 	}
// }


// // obj -> arr
// let arr = []
// body.forEach(o => {
// 	let row = []
// 	for (let k in o) {
// 		ks.add(k)
// 		let v = o[k]
// 		let i = ks.index(k)
// 		row[i] = v
// 	}
// 	arr.push(row)
// })


// // arr -> table
// let k = ks.s()

// let table = document.body.appendChild(document.createElement('table'))
// let thead = table.appendChild(document.createElement('thead'))
// let tbody = table.appendChild(document.createElement('tbody'))

// let tr = document.createElement('tr')

// k.forEach(fieldName => {
// 	let th = document.createElement('th')
// 	th.textContent = fieldName
// 	tr.appendChild(th)
// })
// thead.appendChild(tr)

// arr.forEach(row => {
// 	tr = document.createElement('tr')
// 	for (let i = 0, len = k.length; i < len; i++) {
// 		let td = document.createElement('td')
// 		let v = row[i]
// 		td.textContent = undefined !== v ? v : ''
// 		tr.appendChild(td)
// 		tbody.appendChild(tr)
// 	}
// })


{

	// Table 类

	// 数据

	// 提取内容
	// table.head = Set {} // 不会提取任何body数据
	// table.head = Set {'id','code'} // 只提取body数据中的id和code

	// 设置提取内容
	// table.head.add('id')    // 需要提取id
	// table.head.delete('id') // 不再提取id
	// table.head = new Set(['id','code'])  // 提取id和code

	// table.headFilter = Set {'name'}                   // 不渲染name，数据依然存在
	// table.bodyFilter = { main:()=>{}, node:()=>{} }   // 不渲染包含过滤内容的行


	// 设置数据
	// table.body( [] )             // 指定名称为main的tbody数据
	// table.body( { node: [] } )   // 指定名称为node的tbody数据

	// table.bodys = { main:[], node:[] }   // 重新指定tbody
	// 通过 table.bodys 可以访问到隶属的其他body
	// 由于table可以拥有多个tbody

	// 渲染准备
	// 根据要渲染的头的个数，修改列的个数，如tr中的th和td个数。

	// 渲染
	// 根据head和body以及filter数据进行表格填写
	// table.load()

	// 排序数据
	// table.sort({id:1, code:-1})     // id升序，code倒序

}


// ex
// new Head()
// new Head('id','name')
function Head(...fieldNames) {
	this.from(fieldNames)
}
// 
Head.prototype.toggle = function (k) {
	this.content[this.content.has(k) ? 'delete' : 'add'](k)
	return this
}
Head.prototype.add = function (...ks) {
	ks.forEach(k => this.content.add(k))
	return this
}
Head.prototype.delete = function (...ks) {
	ks.forEach(k => this.content.delete(k))
	return this
}
Head.prototype.clear = function () {
	this.content.clear()
	return this
}
Head.prototype.toArray = function () {
	return Array.from(this.content)
}
Head.prototype.indexOf = function (...ks) {
	let a = this.toArray()
	let r = ks.map(k => a.indexOf(k))
	return r.length === 1 ? r[0] : r
}
// make(true)   重构 <thead> 标签
// make(table)  使用该table下的tHead，若没有thead就创建thead并添加到该table下。
// make(thead)  将数据渲染到该thead中并设置element为该thead
// make(void 0) 如果element为thead则将数据渲染到该thead中，否则创建element
// make(head)   渲染
Head.prototype.make = function (o) {
	// if (o === true || o === false) {
	// 	if (this.element instanceof HTMLTableSectionElement) {
	// 		console.log(1)
	// 		let table = this.element.parentElement
	// 		this.element = undefined
	// 		this.make()
	// 		if (table instanceof HTMLTableElement) {
	// 			table.tHead = this.element
	// 		}
	// 		return this
	// 	}
	// }
	// if (o === undefined && this.element) return this.make(this.element)
	// if (o instanceof Head) return this.make(o.element)
	// if (o instanceof HTMLTableElement) return this.make(o.tHead, o)
	// if (!(o instanceof HTMLTableSectionElement)) {
	// 	let tr = document.createElement('tr')
	// 	this.content.forEach(e => {
	// 		let th = document.createElement('th')
	// 		th.textContent = e
	// 		tr.appendChild(th)
	// 	})
	// 	o = document.createElement('thead')
	// 	o.appendChild(tr)
	// 	if (arguments[1] instanceof HTMLTableElement) arguments[1].tHead = o// table
	// } else {
	// 	let es = this.toArray()
	// 	o.querySelectorAll('tr th').forEach((td, i) => {
	// 		td.textContent = es[i]
	// 	})
	// }
	// this.element = o
	// return this
	return (
		this.makeTable(o).OK ||
		this.makeTHead(o).OK ||
		this.makeThis().OK
	) && this
}
Head.prototype.makeTable = function(o) {
	if(o instanceof HTMLTableElement) {
		return this.makeTHead(o.tHead)
	}else{
		this.OK = false
	}
	return this
}
Head.prototype.makeTHead = function (o){
	if(o instanceof HTMLTableSectionElement) {
		// 有tHead，按tHead规格进行填充
		let i = 1
		o.querySelectorAll('th').forEach(fieldName=>{
			this.content.add(fieldName + (this.content.has(fieldName) ? (i++) : ''))
		})
		this.element = o.tHead
		this.OK = true
	}else{
		this.element = undefined
		this.OK = false
	}
	return this
}
Head.prototype.makeThis = function() {
	let table, tHead
	let tr = document.createElement('tr')
	this.content.forEach(fieldName=>{
		let th = tr.appendChild(document.createElement('th'))
		th.textContent = fieldName
	})
	if(this.element) {
		table = this.element.parentElement
		table.deleteTHead()
		tHead = table.createTHead()
	}else{
		tHead = document.createElement('thead')
	}
	tHead.appendChild(tr)
	this.OK = true
	return this
}
Head.prototype.from = function (o) {
	return (
		this.fromTable(o).OK ||
		this.fromTHead(o).OK ||
		this.fromArray(o).OK ||
		this.fromSet(o).OK ||
		this.fromHead(0).OK
	) && this
}
Head.prototype.fromTHead = function(o) {
	if(o instanceof HTMLTableSectionElement) {
		this.content.clear()
		let i = 0
		o.querySelectorAll('tr:nth-child(1) th').forEach(th => {
			let k = th.textContent.trim()
			if (k.length===0) {
				k = String(i)
				i++
			}
			this.content.add(k)
		})
		this.element = o
		this.OK = true
	}else{
		this.OK = false
	}
	return this
}
Head.prototype.fromTable = function(o) {
	if(o instanceof HTMLTableElement) {
		return this.fromTHead(o.thead)
	}else{
		this.OK = false
	}
	return this
}
Head.prototype.fromHead = function(o){
	if(o instanceof Head) {
		this.content = o.content
		this.OK = true
	}else{
		this.OK = false
	}
	return this
}
Head.prototype.fromArray = function (o) {
	if(Array.isArray(o)) {
		this.content = new Set(o.map(fieldName=>String(fieldName)))
		this.OK = true
	}else{
		this.OK = false
	}
	return this
}
Head.prototype.fromSet = function(o) {
	if(o instanceof Set) {
		this.content = o
		this.OK = true
	}else{
		this.OK = false
	}
	return this
}


/* 
Body

new Body

*/





// ex
let h = new Head('id', 'name')
h.make(table.tHead)

// let b = new Body('main')
// b.from(table)
// b.setRows([
// 	{ id: 1, name: '小张', age: 23 },
// 	{ id: 2, name: '小李', age: 22 },
// 	{ id: 3, name: '小王', age: 21 },
// 	{ id: 4, name: '小金', age: 20 },
// 	{ id: 5, name: '小红', age: 18 },
// 	{ id: 6, name: '小崔', age: 19 },
// ])
// b.filterHead(h)
// b.make()

// body2
// b = new Body([
// 	{ id: 4, name: '老金', age: 66 },
// 	{ id: 5, name: '老红', age: 58 },
// 	{ id: 6, name: '老崔', age: 78 },
// ])
// b.filterHead(h)
// b.name = 'main'
// b.make()
// table.appendChild(b.element)



/* 



*/
function Table(colSize = 1, rowSize = 1) {
	this.element = document.createElement('table')
	this.element.appendChild(document.createElement('thead'))
	this.element.appendChild(document.createElement('tbody')).setAttribute('name', 'main')
	this.size(colSize, rowSize)
}
Object.defineProperty(Table.prototype, 'rowSize', {
	get() {
		return this._rowSize
	},
	set(v) {
		this._rowSize = v
		Array.from(this.element.tBodies).forEach(tbody => {
			let trs = tbody.querySelectorAll('tr')
			let len = trs.length
			if (len > v) {
				Array.from(trs).slice(len).forEach(tr => tr.remove())
			} else if (len < v) {
				let i = v - len
				while (i-- > 0) {
					let tr = tbody.appendChild(document.createElement('tr'))
					let j = this._colSize
					while (j-- > 0) tr.appendChild(document.createElement('td'))
				}
			}
		})
	}
})
Object.defineProperty(Table.prototype, 'colSize', {
	get() {
		return this._colSize
	},
	set(v) {
		this._colSize = v
		Array.from(this.element.tBodies).forEach(tbody => {
			tbody.querySelectorAll('tr').forEach(tr => {
				let tds = tr.querySelectorAll('td')
				let len = tds.length
				if (len > v) {
					Array.from(tds).slice(len).forEach(td => td.remove())
				} else if (len < v) {
					let i = v - len
					while (i-- > 0) {
						tr.appendChild(document.createElement('td'))
					}
				}
			})
		})
	}
})
Object.defineProperty(Table.prototype, 'parent', {
	set(v) {
		v.appendChild(this.element)
	},
	get() {
		return this.element.parentElement
	}
})
Object.defineProperty(Table.prototype, 'size', {
	value(colSize, rowSize) {
		this.colSize = Number.isSafeInteger(colSize) ? colSize : 1
		this.rowSize = Number.isSafeInteger(rowSize) ? rowSize : 1
		return this
	}
})
Table.prototype.getBodys = function () {
	return Array.from(this.element.tBodies)
}
Table.prototype.getBody = function () {

}
Table.prototype.make = function (table) {

}

Table.prototype.getRows = function () {
	return this.element.querySelectorAll('tbody tr')
}
Table.prototype.getTbodys = function () { }


let t = new Table(2, 10)
document.body.appendChild(t.element)
console.log(t.rowSize, t.colSize)

Array.from(t.element.querySelectorAll('td')).forEach(td => {
	td.onmouseenter = function () {
		this.classList.add('on')
	}
	td.onmouseleave = function () {
		this.classList.remove('on')
	}
})
// 		let b = Array.from(this.content.tBodies).some(tbody=>tbody.getAttribute('name')==='main')


