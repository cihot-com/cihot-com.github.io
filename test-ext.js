if (opener) {
	window.addEventListener('message', onMessage, false)
}

function onMessage(e) {
	let { data } = e
}