let scriptList = [
	"./src/phaser.v3.19.0.min.js",
	"./src/d3.v5.11.0.min.js",
	"./src/socket.io.v2.2.0.min.js",
	"./src/localforage.v1.5.4.min.js",
	"./src/objectid.min.js",
	"./src/similar.min.js",
]

class TextCache {
	constructor() {
		this.data = {}
	}

	async add(dataList) {
		let { data } = this
		let iterator = dataList.values()
		void function next() {
			let e = iterator.next()
			if (e.done) return data;
			let uri = e.value
			if (data.hasOwnProperty(uri)) {
				console.warn('[cache ok]', uri)
				next()
			}
			fetch(uri).then((res) => {
				if (res.ok) {
					// res.text().then((text) => {
					// 	data[uri] = text
					// 	next()
					// })
					res.blob().then((blob) => {
						data[uri] = blob
						let tag = document.createElement('script')
						tag.src = URL.createObjectURL(blob)
						document.head.appendChild(tag)
						next()
					})
					console.log('[fetch ok]', uri, res)
				} else {
					console.error('[fetch ng]', uri)
					next()
				}
			})
		}()
	}

	async remove(...dataList) {
		let { data } = this
		dataList.forEach((uri) => {
			delete data[uri]
		})
	}

	async update() {
		return add(Object.keys(this.data))
	}
}

let cache = new TextCache()
cache.add(scriptList).then(console.warn)

setTimeout(console.log, 1000, cache.data)