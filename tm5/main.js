ss('[data-name=target]')
	.set('-webkit-user-modify','read-write-plaintext-only')
ss('[data-name=source],[data-name=target]')
	.set('width','50vw')


let showStart = 0
let showLen = 20
let len = 100
let i = 0

let data = []
for (i = 0; i < len; i++) {
	data.push({
		no: i + 1,
		source: randStr(20),
		target: randStr(20),
		textKey: randStr(8),
	})
}

data[89].target = 'a'.repeat(1000)

let dt = new DataTable('#table')
	.limit(10)
	.data(data)
	.head(['no', 'source', 'target','no'])
	.start(89)
	.progress()


let width = 200, height = 10
let svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height)
let g = svg.append('g')
let bar = g.append('rect')
	.attr('fill', '#060')
	.attr('width', width)
	.attr('height', height)
let pos = g.append('rect')
	.attr('fill', '#ff0')
	.attr('height', height)

let progressDiv = document.body.appendChild(document.createElement('div'))
let progressSS = ss('body > div:last-child').set('height','10px').set('width','100%').set('background-color','#ccc')
progressDiv.addEventListener('mousedown',function(event){
	log(event.x/ progressDiv.getBoundingClientRect().width)
})


dt.wheel(function (e) {
	// svg版本
	let { start, end } = e.currentTarget.dataset
	start = +start
	end = +end
	// console.debug(this, start, end)
	pos.attr('x', start * width)
	pos.attr('width', (end - start) * width)


	// div的css版本
	let tbody = e.currentTarget
	start = Math.round(start * 100)
	end = Math.round(end * 100)
	progressSS.set('background-image', `linear-gradient(to right, #ccc ${start}%, #00f 0%, #00f ${end}%, #ccc 0%)`)
})

dt.body().addEventListener('keydown', function (e) {
	if (!e.repeat && e.keyCode === 13 && e.ctrlKey) {
		e.preventDefault()
		let tr = e.target
		while (tr.nodeName !== 'TR') {
			tr = tr.parentElement
		}
		if (tr) {
			let d = data[tr.dataset.index]
			tr.querySelectorAll('td').forEach((td) => {
				let k = td.dataset.name
				let v = td.textContent
				d[k] = v
				console.debug('write')
			})
			console.debug(d, tr)
		}
	}
})