let cliperText = document.body.querySelector('input[name=_viewData]').value

function parse(pwd) {
	let bin = unescape(cliperText).split(',');
	var text = '';
	for (var i = 0; i < bin.length; i++) {
		text = text + String.fromCharCode(Number(bin[i]) + pwd.charCodeAt(i % pwd.length));
	}
	return text
}

function crack() {
	let scriptElement = document.querySelector('script')
	let matched = /unescape\((\S+?)\)/.exec(scriptElement.textContent)
	let pwds = []
	document.querySelectorAll('script').forEach(e => {
		if (matched) {
			let mask = eval(matched[1])
			for (let y = 0; y <= 99; y++) {
				for (let m = 1; m <= 12; m++) {
					for (let d = 1; d <= 31; d++) {
						let pwd = String(y).padStart(2, '0') + String(m).padStart(2, '0') + String(d).padStart(2, '0')
						if (Math.abs(pwd << pwd) == mask) {
							pwds.push(pwd)
						}
					}
				}
			}
		}
	})
	return pwds
}

crack().forEach(pwd=>{
	let d = parse(pwd)
	if(/급여명세서/u.test(d) && /귀하의/u.test(d)) {
		console.log(pwd)
		console.log(d)
	}
})

