let str = `
aa
	a
	b
					dd
						2-1-1
					2-1
					2-1
			2-2
	cc
		3-1
		3-2
	dd
bb
		a
		d=dddd

		`
		cc
		3-1
		3-2
	dd


	cc
		3-1
3-2
	dd


initObject result 



let rows = str.split('\n')
// 过滤空白行
rows = rows.filter(e => !/^\s*$/.test(e))

let result

let i
let length = rows.length
if (length > 1) {
	let tab
	let table = []
	for (i = 0; i < length; i++) {
		let row = rows[i]// 当前数据
		let m = row.match(/^\t*/)
		tab// 之前的tab
		tab = m ? m[0].length : 0
		// console.log(tab)

		m = row.match(/[^\t]+/)
		let data = m ? m[0] : ''

		let k = '', v = ''
		m = data.indexOf('=')
		if (m !== -1) {
			k = data.slice(0, m)
			v = data.slice(m + 1)
		} else {
			v = data
		}

		table.push({ tab, k, v })
	}

	let tabMin = 100, tabMinCount = 0

	table.forEach(row => {
		tabMin = Math.min(row.tab, tabMin)
	})
	table.forEach((row, i) => {
		row.tab -= tabMin
		row.id = i
		let prevRow = table[i - 1]
		row.prevTab = prevRow ? prevRow.tab : -1
		if (row.tab === tabMin) {
			tabMinCount++
		}
		// parent
		// {
		let j = i - 1
		if (j > -1) {
			let prev = table[j]
			while (prev) {
				if (prev.tab < row.tab) {
					row.pid = prev.id
					break
				} else {
					row.pid = -1
				}
				prev = table[j--]
			}
		} else {
			row.pid = -1
		}
		// }
	})






	let p='';
	table.forEach((row, index) => {
		if (row.pid === -1){
			p=row.v;
			console.log(p)
			return;
		}
		if (row.tab > row.prevTab) {
			if (row.k == '') p = p + '/' + row.v
			else p = p + '/' + row.k

		}
		 else if (row.tab == row.prevTab) {
			if(p.indexOf('/')) p = p.slice(0, p.lastIndexOf('/'))
			if (row.k == '') p =p + '/' + row.v
			else p = p + '/' + row.k
		}
		 else {
			p = p.slice(0, p.lastIndexOf('/')) 
			if (row.k == '') p = p+ '/' + row.v
			else p = p + '/' + row.k
		}
		// row.p = p
		console.log(p)

	})



	let upid=table
	upid = upid.map(e=>e.pid)
	upid = Array.from(new Set(upid))
	upid = upid.sort((a,b)=>a>b)
	
	console.log(upid)
	

	table.forEach((row, index) => {
		if (row.pid === -1) {
			if (result === undefined) {

				// let type = typeof row.v
				if (row.k !== '') {
					// object
					result = { [row.k]: row.v }
				} else {
					// string, number, boolean
					result = row.v
				}

			} else {
				let type
				type = typeof result

				if(Array.isArray(result)) {
					if (row.k !== '') {
						// object
						result = Object.assign({}, result)
						result[row.k] = row.v
					} else {
						// string, number, boolean
						result.push(row.v)
					}
				}else{
					if (type === 'object') {// ???? if Array
						if (row.k !== '') {
							// object
							result[row.k] = row.v
						} else {
							// string, number, boolean
							let k = Object.keys(result).filter(e => /\d+/).pop()
							k = k ? (parseInt(k) + 1) : 0
							result[k] = row.v
						}
	
					} else {
						if (row.k !== '') {
							// let k = Object.keys(result).filter(e=>/\d+/).pop()
							// k = k ? (parseInt(k)+1) : 0
							// result[k] = result
							result = {0: result}
							result[row.k] = row.v
						} else {
							// string, number, boolean
							result = { 0: result, 1: row.v }
							
						}
	
					}
				}
			}

			let ks = Object.keys(result)
			let b = ks.every(e=>/\d+/.test(e))
			let { length } = ks

			if(b) {
				result.length = length
				result = Array.from(result)
			}

			// console.log('**', Object.keys(result), b, length)
			console.log('**', result, b)
			return
		}
		//row two start





		// if (row.tab > row.prevTab) {
		// 	if (row.k == '') p = table[index - 1].v + '/' + row.v
		// 	else p = table[index - 1].v + '/' + row.k

		// } else if (row.tab == row.prevTab) {
		// 	if (row.k == '') p = table[index - 1].v + '/' + row.v
		// 	else p = table[index - 1].v + '/' + row.k
		// } else {
		// 	p = p.slice(0, p.lastIndexOf('/'))
		// }
		// // row.p = p
		// console.log(p)

	})



	// table.forEach(row => {
	// 	let c
	// 	if(row.pid === -1) {
	// 		result
	// 		if(c===undefined) {
	// 			row.k
	// 		}
	// 	}
	// })
	// if (tabMinCount > 1) {
	// }else{
	// 	result = {}
	// 	table.forEach(row=>{

	// 	})
	// }

	console.log(table)
	console.log(tabMin, tabMinCount)

	console.log(result)
	// console.log(JSON.stringify(result))
}


