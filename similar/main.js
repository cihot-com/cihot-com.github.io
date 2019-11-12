let isTest = /test/.test(location.host)
let { log, warn, error, table } = console
if (!isTest) log = () => { }

let ws, wd

let ids = [
	'#tm',
	'#source',
	'#segmentp100',
	'#segmentp95_99',
	'#segmentp85_94',
	'#segmentp75_84',
	'#segmentp50_74',
	'#nomatch',
	'#character100',
	'#character95_99',
	'#character85_94',
	'#character75_84',
	'#character50_74',
	'#nomatchc',
	'#total',
	'#filenet',
	'#match100counter',
	'#nomatch100counter',
]

function getElem(q, needAll = false) {
	return needAll ? document.querySelectorAll(q) : document.querySelector(q)
}

let es = ids.reduce((r, q) => {
	let needAll = q.charAt(0) !== '#'
	r[q] = getElem(q, needAll)
	return r
}, {})


let n = new Proxy(ids,{
	get(ids,k,p) {
		return toInteger(es[k].textContent)
	},
	set(ids,k,v,p) {
		return es[k].textContent = v
	},
})

let ms = {
	get tm() {
		return es['#tm'].value
	},
	get source() {
		return es['#source'].value
	},
	get segmentp100() { return toInteger(es['#segmentp100'].textContent) },
	set segmentp100(v) {
		return es['#segmentp100'].textContent = v
	},
	get segmentp95_99() { return toInteger(es['#segmentp95_99'].textContent) },
	set segmentp95_99(v) {
		return es['#segmentp95_99'].textContent = v
	},

	get segmentp85_94() { return toInteger(es['#segmentp85_94'].textContent) },
	set segmentp85_94(v) {
		return es['#segmentp85_94'].textContent = v
	},
	get segmentp75_84() { return toInteger(es['#segmentp75_84'].textContent) },
	set segmentp75_84(v) {
		return es['#segmentp75_84'].textContent = v
	},
	get segmentp50_74() { return toInteger(es['#segmentp50_74'].textContent) },
	set segmentp50_74(v) {
		return es['#segmentp50_74'].textContent = v
	},
	get nomatch() { return toInteger(es['#nomatch'].textContent) },
	set nomatch(v) {
		return es['#nomatch'].textContent = v
	},

	get character100() { return toInteger(es['#character100'].textContent) },
	set character100(v) {
		return es['#character100'].textContent = v
	},
	get character95_99() { return toInteger(es['#character95_99'].textContent) },
	set character95_99(v) {
		return es['#character95_99'].textContent = v
	},

	get character85_94() { return toInteger(es['#character85_94'].textContent) },
	set character85_94(v) {
		return es['#character85_94'].textContent = v
	},
	get character75_84() { return toInteger(es['#character75_84'].textContent) },
	set character75_84(v) {
		return es['#character75_84'].textContent = v
	},
	get character50_74() { return toInteger(es['#character50_74'].textContent) },
	set character50_74(v) {
		return es['#character50_74'].textContent = v
	},
	get nomatchc() { return toInteger(es['#nomatchc'].textContent) },
	set nomatchc(v) {
		return es['#nomatchc'].textContent = v
	},

	get filenet() { return toInteger(es['#filenet'].textContent) },
	set filenet(v) {
		return es['#filenet'].textContent = v
	},
	get total() { return es['#total'].textContent },
	set total(v) {
		return es['#total'].textContent = v
	},
	get match100counter() { return toInteger(es['#match100counter'].textContent) },
	set match100counter(v) {
		return es['#match100counter'].textContent = v
	},
	get nomatch100counter() { return toInteger(es['#nomatch100counter'].textContent) },
	set nomatch100counter(v) {
		return es['#nomatch100counter'].textContent = v
	},
	clear() {
		this.segmentp100 = 0
		this.segmentp95_99 = 0
		this.segmentp85_94 = 0
		this.segmentp75_84 = 0
		this.segmentp50_74 = 0
		this.nomatch = 0
		this.character100 = 0
		this.character95_99 = 0
		this.character85_94 = 0
		this.character75_84 = 0
		this.character50_74 = 0
		this.nomatchc = 0
		this.filenet = 0
		this.total = 0
		this.nomatch100counter = 0
		this.match100counter = 0
	},
	clac() {
		this.clear()
		let { tm, source } = this
		// console.log(tm, source)
		this.clacSimilar({ tm, source })
		// this.clacDuplicate({ source })
	},
	clacSimilar(o) {
		if (ws) ws.terminate()
		ws = new Worker('w-similar.js')
		ws.onmessage = (e) => {
			let { data } = e
			let { padd, cadd, total, match100counter, sourceRowsLength } = data
			// console.log('ws.onmessage', data)
			if (typeof padd === 'number') {
				if (padd === 100) {
					this.segmentp100++
					this.character100+=cadd
				} else if (95 <= padd && padd < 100) {
					this.segmentp95_99++
					this.character95_99+=cadd
				} else if (85 <= padd && padd < 95) {
					this.segmentp85_94++
					this.character85_94 += cadd
				} else if (75 <= padd && padd < 85) {
					this.segmentp75_84++
					this.character75_84 += cadd
				} else if (50 <= padd && padd < 75) {
					this.segmentp50_74++
					this.character50_74 += cadd
				} else {
					this.nomatch++
					this.nomatchc+=cadd
				}
			}

			if (total) this.total = total

			if(match100counter) {
				this.match100counter += match100counter
			}
			if (sourceRowsLength) {
				this.nomatch100counter = sourceRowsLength - this.match100counter
			}
		}

		ws.postMessage(o)
	},
	__proto__: n,
}

ms.clear();

es['#tm'].oninput = es['#source'].oninput = (e) => {
	ms.clac()
}

function toInteger(s) {
	s = parseInt(s)
	return isNaN(s) ? 0 : s
}


{
	let onmessage = function onmessage({data}){
		console.log(data)
	}

	

	

	// log(localWorker)
}