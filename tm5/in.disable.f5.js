// 禁用F5
window.addEventListener('keydown',function(e){
	if(e.keyCode===116) {
		e.preventDefault()
		// e.returnValue=false;
		console.log(e)
		console.log(e.ctrlKey)

		
		
		// test tag
		let e = document.getElementById('k');
		if(e) {
			let k = e.value
			console.warn(check(k))
		}
	}
})




function check(k) {
	let hasRepeat = /repeat/i.test(k)
	let hasCtrl = /ctrl/i.test(k)
	let hasAlt = /alt/i.test(k)
	let hasShift = /shift/i.test(k)
	let hasMeta = /meta/i.test(k)
	let key = /(-|+).$/u.match(k)[0]
	return { hasRepeat, key, hasCtrl, hasAlt, hasShift, hasMeta }
}