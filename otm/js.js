function JS(url) {
	this.methods = []
	let req = new XMLHttpRequest()
	req.open('GET', url, true)
	if(/\.json$/u.test(url)) req.responseType = 'json'
	req.onload = () => {
		let r, v = this.value = req.response
		this.methods.forEach((f) => {
			r = Reflect.apply(f, this, [v, r])
		})
	}
	this.req = req
}

JS.prototype.start = function (...fs) {
	this.methods.push(...fs.filter(f => typeof f === 'function'))
	this.req.send()
}


// test
{
	let js = new JS('data.json')
	js.methods.push(function(v){
		console.log(0, typeof v, v)
		return `data is ${v}`
	})

	js.start(function(v, r){
		console.log('1', r)
		return 'AONUN'
	}, function(v, r){
		console.log('2', r)
	})
}