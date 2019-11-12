let { log, warn } = console

requirejs.config({
	baseUrl:'./',
})


require(['commonjs'], (cmd) => {
	log(cmd)
	val('commonjs', cmd.toString())
})


function val(name, value) {
	let s = document.querySelectorAll(`[name=${JSON.stringify(name)}]`)
	if (s) s.forEach(e=>{
		e.textContent = value
	})
	log('set> ', name, value)
}

function callback(data) {
	val('commonjs', JSON.stringify(data))
}

