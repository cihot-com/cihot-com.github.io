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

		// <parent>
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
		// </parent>
	})

	let p
	table.forEach((row, index) => {
		
		row



	})

	function getParent(pid) {
		if (pid === -1) {
			if (result === undefined) result = ''
			return result
		}
		let e = table[pid]
		if (e.obj === undefined) {
			if (e.k === undefined) {
				e.obj = v
			} else {
				e.obj = { [e.k]: e.v }
			}
			e.obj = e.v
		}
		return e.obj
	}



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
}

