const fs = require('fs')

const data = require('./collect_hanyu_baidu.json')

//console.log(data)

let oks = []

data.forEach(({char,text})=>{
	let regexp = /\b\S+?“(\S{1})”/g
	if(regexp.test(text)) {
		//let tw = text.match(regexp)
		//let cn = char
		//oks.push([ cn, tw ])
		//console.log(text.match(regexp)[1], char)

		oks.push({
			char,
			data: text.match(regexp)
		})
	}
})

console.log(oks)

fs.writeFileSync('collect_hanyu_baidu_jianfan.json', JSON.stringify(oks,null,2), 'utf8')