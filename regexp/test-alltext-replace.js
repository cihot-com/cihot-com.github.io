let textReplacer = {}
textReplacer.regExps = {
	search: new RegExp('\\/^[-](|)*+?!{}.$'.split('').map(e=>'\\'+e).join('|'),'g'),
	replace: /\$|\&/g,
}
textReplacer.search = function search(str) {
	return str.replace(textReplacer.regExps.search, '\\$&')
}
textReplacer.replace = function(str, a, b) {
	a = new RegExp(textReplacer.search(a),'g')
	b = b.replace(/\$/g, '$$$$')
	return str.replace(a, b)
}
Object.freeze(textReplacer)


/* 

console.log( textReplacer.replace('abc$def$ghi', '$', '$&' ) )
*/

console.log(textReplacer.replace('^abc+def+ghi$', '+', '-'))