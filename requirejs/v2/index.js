let { log, warn } = console

requirejs.config({
	baseUrl:'./',
	paths: {
		json: '../r2/json.jsonp?callback=cbname',
	},
})


require(['json'], (json) => {})


function val(name, value) {
	let s = document.querySelectorAll(`[name=${JSON.stringify(name)}]`)
	if (s) s.forEach(e=>{
		e.textContent = value
	})
	log('set> ', name, value)
}

function callback(data) {
	val('jsonp', JSON.stringify(data))
}


