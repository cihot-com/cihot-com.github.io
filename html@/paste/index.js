const { log } = console

let cd, text

document.onpaste = function(e){
	e.preventDefault()

	cd = e.clipboardData

	text = rn(cd.getData('text'))

	r0.deleteContents()
	r0.insertNode(new Text(text))
	// sel.removeAllRanges()
	log(sel.anchorNode,sel.anchorOffset, sel.focusNode,sel.focusOffset)
	// sel.setBaseAndExtent(sel.anchorNode,0,sel.anchorNode,0)

	log(r0.collapsed)
}

function rn(text) {
	return text.replace(/\n/g, '\\n')
}


Object.defineProperty(window, 'r0', {
	get(){
		return window.getSelection().getRangeAt(0)
	}
})

Object.defineProperty(window, 'sel', {
	get(){
		return window.getSelection()
	}
})