importScripts('/lib/similar-text.js')

let isTest = /test/.test(location.host)
let { log, warn, error, table } = console
log = (...a) => { isTest ? log(...a) : '' }

onmessage = (e) => {
	let { data } = e
	let { tm, source } = data

	let tmRows = toRows(tm)
	let sourceRows = toRows(source)
	let sourceRowsLength = sourceRows.reduce((r,e)=>r+e.length,0)

	let tmLength = tm.length || '0'
	let sourceLength = source.length || '0'

	let tmSize = tmRows.length
	let sourceSize = sourceRows.length


	let match100set = new Set()
	let match100counter = 0
	
	sourceRows.forEach(source=>{
		// duplicate
		let n = source.length
		if(match100set.has(source)){
			match100counter = n
		}else{
			match100set.add(source)
		}


		// count
		let padd, cadd
		tmRows.some(tm=>{
			padd = similarText(source, tm, true)
			return padd>=60
		})

		cadd = source.length

		let total = `${tmLength}/${tmSize}, ${sourceLength}/${sourceSize}`

		postMessage({ padd, cadd, total, match100counter, sourceRowsLength})
	})
}



async function createSimilarWorker(a, rows) {
	let w = new Worker('w-staff.js')
	w.onmessage = (e) => {
		let { data } = e
		log('similar.staff.onmessage', data)
		postMessage('to-main')
	}
	w.postMessage(a, b)
	s.push(w)
	return w
}


function toRows(str, noEmpty=true) {
	let rows
	rows = str.split('\n')
	if(noEmpty) rows = rows.filter(e=>e)
	return rows
}