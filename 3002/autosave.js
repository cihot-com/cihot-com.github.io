window.addEventListener('beforeunload', function (e){
	let names = 
	document.querySelectorAll('input').forEach((input)=>{
		let name = input.getAttribute('name')
		if(name) {
			localStorage.setItem(name, input.value)
		}
	})
}, false)


document.addEventListener('load', function (e){
	localStorage.forEach(name)
	document.querySelectorAll

	

})


function autosave(selector) {
	document.querySelectorAll(selector)
}

function InputTextSaver(input) {
	input.value
}