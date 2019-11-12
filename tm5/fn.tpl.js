function tpl(url = 'index', opt) {
	return new Promise(function (resolve, reject) {
		// format url
		if (!/^tpl\//.test(url)) url = `tpl/${url}`
		if (!/\.html$/.test(url)) url = `${url}.html`
		// generate uid
		let id = uid()
		// format opt
		opt = Object.assign({ el: `#${id}` }, opt)
		let l = new XMLHttpRequest()
		l.open('GET', url)
		// l.responseType = 'text'
		l.onload = function (e) {
			// console.log(l.readyState, l.DONE, l.status)// 4 4 200
			if (l.readyState === l.DONE && l.status === 200) {
				// console.warn(l.responseURL)
				// console.warn(l.response)
				let div = document.createElement('div')
				document.body.appendChild(div)
				div.setAttribute('id', id)
				div.innerHTML = l.response
				return resolve(new Vue(opt))
			}
		}
		l.onerror = l.onabort = function (err) { reject(err) }
		l.send()
	})
}