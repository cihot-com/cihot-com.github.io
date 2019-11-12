let fm;
window.addEventListener('load',function(){
	fm = new FileManager()
	fm.drop(true)
	
	window.addEventListener('mousedown', function(e){
		if (e.which === 3) {
			e.preventDefault()
			fm.open()
		}
	})
	
	fm.addEventListener('change',function(e){
		document.body.innerHTML = fm.table.outerHTML
	})
})