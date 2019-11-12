Object.keys(console).forEach((name)=>{
	if(!window[name] && typeof console[name]==='function') {
		window[name] = console[name]
		// console.log(name)
	}
})