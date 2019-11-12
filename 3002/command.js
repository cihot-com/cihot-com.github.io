let commandForm = document.querySelector('#commandForm')

$(document).on('keydown', '#commandForm #command', (e)=>{
	let sk = hotkey(e)
	let code = commandForm.command.value.trim()

	if(sk==='ctrl+enter' && code) {
		run(code)
	}
})

$(document).on('click', '#commandForm #run', (e)=>{
	let code = commandForm.command.value.trim()
	if(code) {
		run(code)
	}
})

function run(code){
	if(s.connected) {
		s.emit('command', code, (rs)=>{
			console.info('[command]', rs, code)
		})
	}else{
		warn('没有连接')
	}
}