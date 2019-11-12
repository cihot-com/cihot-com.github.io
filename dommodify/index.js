let { log, warn, error } = console
let editor = document.querySelector('body>article>section.editable')


editor.addEventListener('DOMSubtreeModified', (e) => {
	log(e.type, e)
})


editor.addEventListener('DOMNodeInserted', (e) => {
	log(e.type, e)
})

editor.addEventListener('DOMNodeRemoved', (e) => {
	log(e.type, e)
})

editor.addEventListener('DOMNodeInsertedIntoDocument', (e) => {
	log(e.type, e)
})

editor.addEventListener('DOMNodeRemovedFromDocument', (e) => {
	log(e.type, e)
})

editor.addEventListener('DOMAttrModified', (e) => {
	log(e.type, e)
})

editor.addEventListener('DOMCharacterDataModified', (e) => {
	log(e.type, e)
})

editor.addEventListener('MutationObserver', (e) => {
	log(e.type, e)
})



let callback = function (mutationsList) {
	// childList
	// characterData
	for (var mutation of mutationsList) {
		let { type, target } = mutation
		if(type==='characterData') {
			log('[observer]', type, target.data, mutation)
		}else{
			log('[observer]', type, target)
		}
	}
}
let observer = new MutationObserver(callback);
let article = document.body;

let options = {
	childList: true,
	attributes: true,
	characterData: true,
	subtree: true,
};
/*
childList：子节点的变动。
attributes：属性的变动。
characterData：节点内容或节点文本的变动。
subtree：所有后代节点的变动。
*/

observer.observe(article, options);
// observer.disconnect()