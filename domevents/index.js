const s = window.getSelection()// document.getSelection() 同等

const log = function (e) {
	console.log(e.type, e.target, e)
}

let app = document.querySelector('#app')
app.addEventListener("DOMContentLoaded", log, false)
app.addEventListener('DOMAttrModified', log, false)
app.addEventListener('DOMAttributeNameChanged', log, false)
app.addEventListener('DOMCharacterDataModified', log, false)
app.addEventListener('DOMElementNameChanged', log, false)
app.addEventListener('DOMNodeInserted', log, false)
app.addEventListener('DOMNodeInsertedIntoDocument', log, false)
app.addEventListener('DOMNodeRemoved', log, false)
app.addEventListener('DOMNodeRemovedFromDocument', log, false)
app.addEventListener('DOMSubtreeModified', log, false)

let sample1 = document.querySelector('#sample1')

function add() {
	app.appendChild(sample1)
}

function remove() {
	sample1.remove()
}

function modify() {
	sample1.textContent = Math.random().toString(16).toUpperCase()
}

function range(startOffset, endOffset) {
	let text = sample1.childNodes.item(0)
	s.setBaseAndExtent(text, startOffset, text, endOffset)
	// console.log(s.isCollapsed)
	// s.getRangeAt(0).collapsed
	return s
}

function extend(offset) {
	s.extend(sample2.childNodes.item(0), offset)
	return s
}


function createRange(start, startOffset, end, endOffset) {
	let range = document.createRange()
	range.setStart(start, startOffset)
	range.setEnd(end, endOffset)

	let selection = window.getSelection()
	selection.removeAllRanges()
	selection.addRange(range)
	return range
}


function move(a=0,d=0,g=0){
	let alter = ['move', 'extend']
	let direction = ['forward', 'backward', 'left', 'right']
	let granularity = ['character','word','sentence','line','paragraph','lineboundary','sentenceboundary','paragraphboundary','documentboundary']
	
	return s.modify(alter[a], direction[d], granularity[g])
}


s.isCollapsed//  [true]位置   [false]范围
s.type// [Caret]位置   [Range]范围
console.log(s.baseNode == s.anchorNode)// 起始
console.log(s.extentNode == s.focusNode)// 结束