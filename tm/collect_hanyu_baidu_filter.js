const fs = require('fs')
const data = require('./collect_hanyu_baidu.json')


console.log('length:', data.length)

let regexp = /\t繁 体\n\t(\S{1})\n/


let charFanti = new Set()

data.forEach(({char,text}, i)=>{
	let m = text.match(regexp)
	if(m) {
		if(char !== m[1]) charFanti.add(m[1])
	}else{
		charFanti.add(char)
	}
})

charFanti = Array.from(charFanti)

//charFanti = charFanti.join('')
//charFanti = charFanti.replace(/(?:.{10})/g, (m)=>m+'\n')
//console.log(charFanti.length)
fs.writeFileSync('./collect_hanyu_baidu_filted.txt', JSON.stringify(charFanti),'utf8')