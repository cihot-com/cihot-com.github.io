class FileManager extends EventTarget {

	constructor() {
		super()
		this.initInputInstance()
		this.files = new Set()
		this.caches = new Map()
	}

	/* 
	fm.open('.txt,.log,.js,.json,.conf')
	fm.open('.png,.jpg,.bmp,.tiff')
	fm.open('.zip,.7z,.rar')
	*/
	open(accept) {
		if (accept) {
			this.inputInstance.setAttribute('accept', accept)
		} else {
			this.inputInstance.removeAttribute('accept')
		}
		this.inputInstance.click()
		return this
	}

	initInputInstance() {
		let e
		e = document.createElement('input')
		e.type = 'file'
		e.multiple = true
		e.addEventListener('change', (e) => {
			let files = e.target.files
			Array.from(files).forEach((file) => {
				this.addFile(file)
			})
		})
		this.inputInstance = e
		return this
	}

	setImported(file) {
		file.imported = Date.now()
		Object.defineProperty(file, 'importedDate', { get() { return new Date(this.imported) } })
	}

	each(f) {
		this.files.forEach(file => f(file))
		return this
	}

	addFile(file) {
		if (this.files.has(file)) return this;
		this.setImported(file)
		let v = new Event('change')
		if (file instanceof File || file instanceof Blob) {
			v.file = file
			this.files.add(file)
			this.dispatchEvent(v)
		}
		return this
	}

	delete(filename) {
		this.files.delete(filename)
		return this
	}

	clearFiles() {
		let v = new Event('change')
		v.add = new Set()
		v.delete = v.files = this.files
		this.files = new Set()
		this.dispatchEvent(v)
		return this
	}

	clearCaches() {
		this.caches.clear()
		return this
	}

	clear() {
		this.clearFiles()
		this.clearCaches()
		return this
	}

	read(file, cb) {
		return new Promise((resolve, reject) => {
			let type = 'text'
			let r
			if (this.caches.has(file)) {
				r = this.caches.get(file)
				return cb ? cb(r) : resolve(r)
			}

			let fr = new FileReader()
			fr.addEventListener('load', (e) => {
				r = fr.result
				let v = new Event('load')
				v.file = file
				v.data = r
				this.caches.set(file, r)
				this.dispatchEvent(v)
				return cb ? cb(null, r) : resolve(r)
			})
			fr.addEventListener('error', (e) => {
				return cb ? cb(e) : reject(e)
			})
			fr.addEventListener('abort', (e) => {
				return cb ? cb(e) : reject(e)
			})
			fr.addEventListener('progress', (e) => {
				let v = new Event('progress')
				let { loaded, total } = e
				v.file = file
				v.loaded = loaded
				v.total = total
				v.percent = Math.floor(100 * loaded / total)
				this.dispatchEvent(v)
			})

			if (file.type) {
				if (/^(text|application)\/(plain|javascript|html|css|json)$/.test(file.type)) {
					fr.readAsText(file)
				} else if (/^image\/(jpeg|png)$/.test(file.type)) {
					fr.readAsDataURL(file)
				} else {
					fr.readAsArrayBuffer(file)
				}
			} else {
				fr.readAsArrayBuffer(file)
			}
		})
	}

	get table() {
		function create(name, value) {
			let td = document.createElement(name)
			td.textContent = value
			return td
		}
		let table = document.createElement('table')
		let thead = table.createTHead()
		let tr = document.createElement('tr')
		thead.appendChild(tr)

		tr.appendChild(create('th', 'name'))
		tr.appendChild(create('th', 'ext'))
		tr.appendChild(create('th', 'size'))
		tr.appendChild(create('th', 'lastmodified date'))
		tr.appendChild(create('th', 'imported date'))
		let tbody = document.createElement('tbody')
		table.appendChild(tbody)
		this.files.forEach(file => {
			tr = document.createElement('tr')
			tbody.appendChild(tr)


			tr.appendChild(create('td', file.name))
			let ext = file.name.match(/\.\w+?$/)
			tr.appendChild(create('td', ext ? ext[0] : ''))
			tr.appendChild(create('td', file.size))
			tr.appendChild(create('td', file.lastModifiedDate.toNormalString()))
			tr.appendChild(create('td', file.importedDate.toNormalString()))

			let btn
			btn = tr.appendChild(create('td', 'share'))
			btn.addEventListener('click', function (e) {
				console.log(this)
			})
		})
		return table
	}

	drop(use = true) {
		if (use && !this.dropped) {
			window.addEventListener('dragover', this._preventDefault.bind(this))
			window.addEventListener('drop', this._dropHandle.bind(this))
			this.dropped = use
		} else if (!use && this.dropped) {
			window.removeEventListener('dragover', this._preventDefault.bind(this))
			window.removeEventListener('drop', this._dropHandle.bind(this))
			this.dropped = use
		}
		return this
	}
	_dropHandle(e) {
		e.preventDefault()
		let files = e.dataTransfer.files
		files = Array.from(files)
		files.forEach(file => this.addFile(file))
	}
	_preventDefault(e) {
		e.preventDefault()
	}

	makeDownload(fileName, content) {
		var blob = new Blob([content]);

		// var aLink = document.createElement('a');
		// aLink.download = fileName;
		// aLink.href = URL.createObjectURL(blob);
		// aLink.click()
		this.download(blob, fileName)
	}

	download(file, name) {
		var aLink = document.createElement('a');
		aLink.download = name || file.name;
		aLink.href = URL.createObjectURL(file);
		aLink.click()
	}


}


function DropManager() { }
DropManager._running = false
DropManager.targets = new Set()
DropManager.add = function (q) {
	DropManager.targets.add(q)
	DropManager.start()
}
DropManager.delete = function (q) {
	DropManager.targets.delete(q)
	if (DropManager.targets.size === 0) {
		DropManager.stop()
	}
}
DropManager.start = function(){
	if (!DropManager._running) {
		window.addEventListener('dragover', DropManager._preventDefault.bind(this))
		window.addEventListener('drop', DropManager._dropHandle.bind(this))
	}
	DropManager._running = true
}
DropManager.stop = function () {
	if (DropManager._running) {
		window.removeEventListener('dragover', DropManager._preventDefault.bind(this))
		window.removeEventListener('drop', DropManager._dropHandle.bind(this))
	}
	DropManager._running = false
}
DropManager._preventDefault = function (e) {
	e.preventDefault()
}
DropManager._dropHandle = function (e) {
	e.preventDefault()
	let files = e.dataTransfer.files
	files = Array.from(files)
	let target = e.target
	let b = DropManager.where(target)
	if (b) {
		DropManager.handle(files, target)
	}
}
DropManager.handle = function (files, target) {
	console.log(files, target)
	// files.forEach(file => console.log(file))
}
DropManager.where = function (target) {
	return Array.from(DropManager.targets).some(q=>(new Set(document.querySelectorAll(q))).has(target))
}

DropManager.add('td')






