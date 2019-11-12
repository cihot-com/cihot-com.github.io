let { log } = console;


!function (g) {



	// 以下代码为了引出re
	// let source = '^()[]{}<>\\/|.?*+-=!:$'.split('').sort((a, b) => a > b ? 1 : -1).reduce((r, e) => r + '\\' + e, '')
	// let re = new RegExp('[' + source + ']', 'g');
	let re = /[\!\$\(\)\*\+\-\.\/\:\<\=\>\?\[\\\]\^\{\|\}]/g

	function regsource(s) {
		if (typeof s === 'string') {
			return s.replace(re, '\\$&')
		}
		return ''
	}

	g.regsource = regsource
	g.re = re

}(this)




let { regsource, re } = this
let test = function (s, b) {
	let re = new RegExp(regsource(s))

	let e = re.test(s)
	if(b) {
		if(!e) log(s)
	} else {
		log(e ? e : s)
	}
}



test('a912{}--asfj')
test('a912/nihao/')
test('a912.{0}')
test('<html>')
test('啊(1{4})')
test(re.source)

for(let i=0; i<=0xffff; i++) {
	test(String.fromCharCode(i), true)
}
log('end!')


log(String.fromCodePoint(0x1ff3f, 0xff3f))