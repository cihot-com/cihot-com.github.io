this.addEventListener('message', (e)=>{

	console.log('worker-script.js', e.data, e)
	this.postMessage(e.data)
})


console.log('wkscript!')