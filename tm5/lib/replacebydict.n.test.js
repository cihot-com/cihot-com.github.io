const replaceByDict = require('./replacebydict.n.js')


!function test() {
	let dict = [
		['你好帅', 'You\'re handsome'],
		['你好', 'hello'],
		['好', 'good']
	]

	let str = '你好，很好，你好帅！'

	let ret = replaceByDict(str, dict)
	console.log(ret)
}()