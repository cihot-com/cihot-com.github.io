
let { log } = console
let code = document.getElementById('code')




let i = 0
let _context = []


function _eval(cmd, o) {
	return function (cmd) {
		return eval(cmd)
	}.bind(o)(cmd)
}


let cm = CodeMirror.fromTextArea(code, { mode: 'javascript', keyMap: 'sublime' })
cm.setOption('extraKeys', {
	'Ctrl-Enter': function (cm) {
		let code = cm.getValue()
		// _context.push(eval(code, _context)
	}
})



// if (document.readyState !== 'complete') {
// 	mergeSheets()
// } else {
// 	createStyle()
// 	asyncMergeSheets()
// }

cssd.set('body','background: #0c03')
cssd.set('body','color: #0c03')
let v  =cssd.get('body')
v.then(log)

function isString(o) {
	return typeof o ==='string' || o instanceof String
}
