class Table {
	constructor(){
		this._table = document.createElement('table')
	}

	head(...ks){
		this._ks = ks
		let h =this._thead = this._table.createTHead()
		h.innerHTML = ''
		let tr = h.appendChild(document.createElement('tr'))
		ks.forEach(k=>{
			let th = tr.appendChild(document.createElement('th'))
			th.textContent = k
		})
		return h
	}

	body(vs) {
		if(this._ks)
		this._vs = vs
		let b = this.tableBody = new TableBody(vs)
		Reflect.apply(b.make, b, this._ks)
		this._table.appendChild(b.el)
		return b
	}


	sort(o, re) {
		this._table.replaceWith(this.tableBody.sort(o, re).make(this._ks).el)
		return this
	}

	filter(f) {
		this.tableBody.filter(f).make(this._ks)
		return this
	}

	filterSort(f,o,re){
		this.tableBody.filter(f).sort(o,re).make(tis._ks)
		return this
	}

	get el(){
		return this._table
	}
}

class TableBody {
	constructor(vs) {
		this._vs = vs
	}
	filter(f) {
		this._fvs = _vs.filter(f)
		return this
	}
	clearFilter () {
		this._fvs = undefined
		return this
	}
	sort(o, re = false) {
		this._svs = re ? this._vs : (this._fvs || this._vs)
		this._svs.sort((a, b) => {
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
	compare(a, b, k, v) {
		return v * ( a[k] > b[k] ? 1 : (a[k] < b[k] ? -1 : 0) )
	}
	make(...ks){
		let b = this._element = document.createElement('tbody')
		let vs = this._svs || this._fvs || this._vs
		vs.forEach(v=>{
			let tr = b.appendChild(document.createElement('tr'))
			if(Array.isArray(ks) && ks.length>0) {
				ks.forEach(k=>{
					let td = tr.appendChild(document.createElement('td'))
					td.textContent = v[k]
					console.log(ks)
				})
			}else{
				console.log(2)
				if(Array.isArray(v)) {
					v.forEach(v=>{
						let td = tr.appendChild(document.createElement('td'))
						td.textContent = v
					})
				}else{
					let td = tr.appendChild(document.createElement('td'))
					td.textContent = v
				}
			}
			console.log(tr)
		})
		return b
	}

	get el(){
		return this._element
	}
}

