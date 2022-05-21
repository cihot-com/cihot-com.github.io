const fs = require('fs')

const dict0 = fs.readFileSync('./dict0.txt', 'utf-8')
const dict1 = fs.readFileSync('./dict1.txt', 'utf-8')

function parseTextToArray(d) {
	return d.split(/\r?\n/).map(e=>e.split(/\t/)).filter(e=>Array.isArray(e)&&e.length>=2)
}

const dict = parseTextToArray(dict0).concat(parseTextToArray(dict1))


let result = new Set()

dict.forEach(e => {
	let [cn,tw] = e
	if(cn.length===tw.length) {
		for(let i=0, { length } = cn; i<length; i++) {
			if(cn[i] !== tw[i]){
				result.add(tw[i])
			}
		}
	}
})

result = Array.from(result)

fs.writeFileSync('./collect_dict0_1_fan.txt', result.join(''), 'utf8')