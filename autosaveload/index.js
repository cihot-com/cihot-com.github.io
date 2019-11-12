let elements = {
	settings: document.querySelector('#settings'),
	form: settings.querySelector('form'),
	icon: settings.querySelector('.settings'),
	dialog: settings.querySelector('dialog'),
	submit: settings.querySelector('[name=submit]'),
}




let { icon, dialog, form } = elements

{
	icon.src = icons.settings
	icon.onclick = function (e) {
		if (dialog.open) {
			dialog.close()
		} else {
			dialog.showModal()
		}
	}

	// elements.dialog.show()

	elements.submit.onclick = function (e) {

	}

	form.onsubmit = function (e) {
		console.log(e)
	}

}


document.addEventListener('keydown', (e) => {
	let sk = stringifyKeyboardEvent(e)
	if (sk === 'ctrl+alt+o' || sk === 'ctrl+l') {
		e.preventDefault()
		elements.icon.click()
		console.log(true, sk)
	}
})


class AutoSaveData {
	constructor(name) {
		this.list = []
		this.opened = false
		this.name = name || location.pathname + 'autoSaveData'
		let data = localStorage.getItem(this.name)
		if (data) this.data = JSON.parse(data)
		this.hasData = Boolean(this.data)
	}
	
	add(selector, propertyName, isFunction) {
		this.list.push({ s: selector, p: propertyName, t: isFunction ? 1 : 0 })
	}

	start() {
		if (this.opened) return ;

		this.opened = true
		this.saveBinded = this.save.bind(this)
		this.loadBinded = this.save.bind(this)

		window.addEventListener('beforeunload', this.saveBinded)
		window.addEventListener('load', this.loadBinded)
	}
	
	stop() {
		if(!this.opened) return ;
		this.opened = false
		window.removeEventListener('beforeunload', this.saveBinded)
		window.removeEventListener('load', this.loadBinded)
	}

	save() {
		if(this.list.length === 0) return ;
		let data = {}
		this.list.forEach((row)=>{
			let { s, p, t } = row
			let vs = Array.from(document.querySelectorAll(s)).map((e)=>{
				return t ? e[p]() : e[p]
			})
			let v = vs.length > 1 ? vs : vs[0]
			
			if(!data[s]) data[s] = {}
			data[s][p] = { v, t }
		})
		if(Object.keys(data).length === 0) return ;
		localStorage.setItem(this.name, JSON.stringify(data))
	}
	load() {
		if (!this.hasData || this.list.length === 0) return;
		this.list.forEach((row) => {
			let { s, p, t } = row
			Array.from(document.querySelectorAll(s)).forEach((e, i) => {
				let o
				o = this.data[s]
				if(!o) return ;
				o = o[p]
				if(!o) return ;
				let { v, t:_t } = o
				if(t!==_t) return ;
				if(t) {
					if (Array.isArray(v)) {
						Reflect.apply(e[p], e, [v[v.length % i]])
					} else {
						Reflect.apply(e[p], e, [v])
					}
				}else{
					if(Array.isArray(v)) {
						e[p] = v[v.length % i]
					}else{
						e[p] = v
					}
				}
			})
		})
	}

}
let asd = new AutoSaveData()
asd.add('#settings form [name=username]', 'value')
asd.add('#settings form [name=password]', 'value')
asd.start()



