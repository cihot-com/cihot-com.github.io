const lua = require('./lua+parser')
const { log } = console
const fs = require('fs')
const path = require('path')

// let p = path.join(__dirname, './module_battle.lua')


// let data = fs.readFileSync(p, { encoding: 'utf8' })

// let data2 = ''
// lua(data)().uints.forEach(e => {
// 	// console.log(e.str, typeof e.str)
// 	let { id, msg } = e.str
// 	data2 += `${id}\t${msg.replace(/\n/g, '\\n').replace(/\t/g, '\\t')}\n`
// })

// fs.writeFileSync(path.join(__dirname, './demo.json'), data2, { encoding: 'utf8' })



let dir = fs.readdirSync(path.join(__dirname, './lua'))
dir = dir.filter(filename=>/.+\.lua$/.test(filename))


dir.forEach(filename=>{
	
})