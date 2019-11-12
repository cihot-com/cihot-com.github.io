let { log, warn } = console

log(requirejs === require)

requirejs.config({
	baseUrl:'./',
	paths: {
		data: '../r/data',
		datas: '../r/datas',
		getdata: '../r/getdata',
		data2: '../r2/data2',
		json: '../r2/json.jsonp?callback=cbname',
	},
})


require(['data', 'getdata', 'datas'], (data, getdata, datas) => {
	log(data)
	log(getdata)
	log(datas)

	val('data', JSON.stringify(data))
	val('getdata', JSON.stringify(getdata))
	val('datas', JSON.stringify(datas))
})


function val(name, value) {
	let s = document.querySelectorAll(`[name=${JSON.stringify(name)}]`)
	if (s) s.forEach(e=>{
		e.textContent = value
	})
	log('set> ', name, value)
}