addEventListener('message', (ev)=>{
	console.log(ev.data)
	throw new Error('custom')
})

