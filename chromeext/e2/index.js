if (opener) {
	window.addEventListener('message', onMessage.bind(this), false)

	function onMessage(e) {
		let { data } = e
		let dataType = typeof data
		if(dataType==='object' && dataType!==null) {
			if(data.type === 'exec' && data.script) {
				let tag = document.createElement('script')
				tag.textContent = data.script
				document.body.appendChild(tag)
				tag.remove()
			}
		}
	
		function send(data) {
			opener.postMessage(data, '*')
		}
	}

	console.log('侦听中')
}

console.log('插件')


let o = {
	get name(){
		return this._name;
	}
}