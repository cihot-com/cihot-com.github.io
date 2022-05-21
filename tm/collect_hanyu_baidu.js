function crawl(char) {
	return fetch(`https://hanyu.baidu.com/s?wd=${encodeURI(char)}`)
		.then(res => res.text()).then(d => {
			let dp = new DOMParser()
			let dom = dp.parseFromString(d, 'text/html')
			let el = dom.body.querySelector('#word-body')
			if (!el) {
				el = dom.body
			}
			el.querySelectorAll('a').forEach(e => e.remove())
			el.querySelectorAll('script').forEach(e => e.remove())
			let val = el.textContent.replace(/^\s*$/gm, '').replace(/^\s+/gm, '\t')
			//console.log(val)
			return val
		}).catch((err) => {
			return err
		})
}


//取下一个范围
function* numbering(min = 0x4e00, max = 0x9fa5) {
	while (min <= max) {
		yield String.fromCharCode(min)
		min++
	}
}

let oks = []
let ngs = []
let g = numbering()

function todo() {
	let { done, value: char } = g.next()
	if (done) {
		console.log('%cEND', 'color:blue')
	} else {
		crawl(char).then(text => {
			if (text) {
				oks.push({ char, text })
				console.log('o', char)
			} else {
				ngs.push({ char, text })
				console.log('x', char, text)
			}
			todo()
			//setTimeout(todo, 10)

		}).catch(err => {
			console.warn(err)
			todo()
			//setTimeout(todo, 10)

		})
	}
}

function downloadFile(filename, content) {
	let a = document.createElement('a')
	let blob
	if (content instanceof Blob) {
		blob = content
	} else {
		blob = new Blob([content])
	}
	let url = window.URL.createObjectURL(blob)
	a.href = url
	a.download = filename
	a.click()
	setTimeout(() => window.URL.revokeObjectURL(url), 100)
}

todo()


//rs.filter(e=>e.text)