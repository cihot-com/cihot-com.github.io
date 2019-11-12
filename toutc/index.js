let ui = {
	get sourceElement() {
		return document.querySelector('#source')
	},
	get targetElement() {
		return document.querySelector('#target')
	},
	get source() {
		return document.querySelector('#source').value
	},

	set source(v) {
		return document.querySelector('#source').value = v
	},

	get target() {
		return document.querySelector('#target').value
	},

	set target(v) {
		return document.querySelector('#target').value = v
	},
}



ui.sourceElement.addEventListener('input', (e)=>{
	let { log } = console
	// ui.source =  `[KTS] 2019.07.04 09: 00 ~[KST] 2019.08.04 23: 59`
	let datetimeRegExp = /(?<Y>\d{4})\s*(\.|\-|\/)\s*(?<m>\d{1,2})\s*\2\s*(?<d>\d{1,2})\s*(?<H>\d{1,2})\s*:\s*(?<i>\d{1,2})/g
	ui.target = ui.source.replace(datetimeRegExp, (...args) => {
		let { Y, m, d, H, i } = args.pop()

		let date = new Date(Y, parseInt(m) - 1, d, H, i)
		log(ftime('Y.m.d H:i', date, true))
		return ftime('Y.m.d H:i', date, true)
	}).replace(/\[[KST]{3}\]/gi, '[UTC]')

})

// void function test() {
// 	let { log } = console
// 	let str = `[KTS] 2019.07.04 09: 00 ~[KST] 2019.08.04 23: 59`

// 	let datetimeRegExp = /(?<Y>\d{4})\s*(\.|\-|\/)\s*(?<m>\d{1,2})\s*\2\s*(?<d>\d{1,2})\s*(?<H>\d{1,2})\s*:\s*(?<i>\d{1,2})/g


// 	let rs = str.replace(datetimeRegExp, (...args) => {
// 		let { Y, m, d, H, i } = args.pop()

// 		let date = new Date(Y, parseInt(m) - 1, d, H, i)
// 		log(ftime('Y.m.d H:i', date, true))
// 		return ftime('Y.m.d H:i', date, true)
// 	})

// 	console.log(rs)
// }()


function ftime(format = 'Y/m/d H:i:s.ms', date = new Date(), utc = false) {
	let rs
	if (typeof format === 'string') {
		rs = format.replace(/\b[A-Za-z]+\b/g, (m) => {
			switch (m) {
				case 'Y': return date[`get${utc ? 'UTC' : ''}FullYear`]().toString().padStart(4, '0')
				case 'm': return (date[`get${utc ? 'UTC' : ''}Month`]() + 1).toString().padStart(2, '0')
				case 'd': return date[`get${utc ? 'UTC' : ''}Date`]().toString().padStart(2, '0')
				case 'H': return date[`get${utc ? 'UTC' : ''}Hours`]().toString().padStart(2, '0')
				case 'i': return date[`get${utc ? 'UTC' : ''}Minutes`]().toString().padStart(2, '0')
				case 's': return date[`get${utc ? 'UTC' : ''}Seconds`]().toString().padStart(2, '0')
				case 'ms': return date[`get${utc ? 'UTC' : ''}Milliseconds`]().toString().padStart(3, '0')
				default: return m
			}
		})
	} else {
		rs = date.toLocaleString()
	}
	return rs
}