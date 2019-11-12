function Head(...fieldNames) {
	this.from(fieldNames)
}
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
Head.prototype.make = function(){
	if(this.element instanceof HTMLTableSectionElement) {
		this.element.textContent = ''
	}else if(this.parent instanceof HTMLTableElement){
		this.element = this.parent.createTHead()
	}else{
		this.element = document.createElement('thead')
	}
	let tr = document.createElement('tr')
	this.element.appendChild(tr)
	this.content.forEach( k =>{
		let th = document.createElement('th')
		th.textContent = k
		tr.appendChild(th)
	})
	return this
}
Head.prototype.to = function(o) {
	if(o instanceof HTMLTableElement) {
		this.parent = o
		this.element = o.createTHead()
	}else if(o instanceof HTMLTableSectionElement) {
		this.element = o
		this.parent = o.parentElement
	}else if(o instanceof Head) {
		Object.defineProperty(this, 'element', {
			configurable:true,
			get(){
				return o.element
			},
			set(v){
				o.element = v
			}
		})
	}else{
		this.element = document.createElement('thead')
		this.parent = undefined
	}
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
		this.parent = o
		return this.fromTHead(o.createTHead())
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

// Head.prototype.make = function (o) {
// 	return (
// 		this.makeTable(o).OK ||
// 		this.makeTHead(o).OK ||
// 		this.makeThis().OK
// 	) && this
// }
// Head.prototype.makeTable = function(o) {
// 	if(o instanceof HTMLTableElement) {
// 		this.parent = o
// 		return this.makeTHead(o.createTHead(), true)
// 	}else{
// 		this.OK = false
// 	}
// 	console.log('makeTable', this)// test
// 	return this
// }
// Head.prototype.makeTHead = function (o, create){
// 	if(o instanceof HTMLTableSectionElement) {
// 		this.element = o
// 		if(create) {
// 			this.content.forEach(fieldName=>{
// 				let th = document.createElement('th')
// 				th.textContent = fieldName
// 				o.appendChild(th)
// 			})
// 		}else{
// 			let i = 1
// 			o.querySelectorAll('tr:nth-child(1) th').forEach(fieldName=>{
// 				this.content.add(fieldName + (this.content.has(fieldName) ? (i++) : ''))
// 			})
// 		}
// 		this.OK = true
// 	}else{
// 		this.element = undefined
// 		this.OK = false
// 	}
// 	console.log('makeTHead', this)// test
// 	return this
// }
// Head.prototype.makeThis = function() {
// 	if(this.element instanceof HTMLTableSectionElement) {
// 		let fieldNames = this.toArray()
// 		this.element.querySelectorAll('th').forEach((th,i)=>{
// 			th.textContent = fieldNames[i]
// 		})
// 	}else{
// 		let tHead = (this.parent && this.parent.createTHead()) || document.createElement('thead')
// 		let tr = document.createElement('tr')
// 		this.content.forEach(fieldName=>{
// 			let th = tr.appendChild(document.createElement('th'))
// 			th.textContent = fieldName
// 		})
// 		tHead.appendChild(tr)
// 		this.element = tHead
// 	}
// 	this.OK = true
// 	return this
// }