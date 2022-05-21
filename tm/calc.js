const fs = require('fs')

let data = fs.readFileSync('./dict0.txt', 'utf-8')
let rows = data.split(/\r?\n/g).map(e=>e.split(/\t/g))
console.log('文件分割行数：', rows.length)
rows = rows.filter(e=>e.length==2)
console.log('筛选分割行数：', rows.length)


let oks = []
let ngs = []
let sames = new Set()
let dissimilars = []
rows.forEach(([cn,tw],index)=>{
	if(cn.length == tw.length) {
		for(let i=0, {length}=cn; i<length; i++) {
			let charCN = cn[i]
			let charTW = tw[i]

			if(charCN === charTW) {
				sames.add(charCN)
			}else{
				let e = dissimilars.find(e=>e[0]===charCN)
				if(e) {
					if(!e[1].includes(charTW)) {
						e[1].push(charTW)
					}
				}else{
					dissimilars.push([charCN, [charTW] ])
				}
			}
		}
		
	}else{
		ngs.push([cn,tw])
	}
})


sames.forEach(char=>{
	let e = dissimilars.find(e=>e[0]===char)
	if(e) {
		e[1].push(char)
		console.log(char)
	}
})

let result = []
dissimilars.forEach(([cn, tws])=>{
	tws.forEach(tw=>{
		result.push(`${cn}	${tw}`)
	})
})
fs.writeFileSync('dict0_calc.txt', result.join('\n'), 'utf8')