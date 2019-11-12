let { log, info, warn } = console



Object.defineProperties(self, {
	selection: {
		get(){
			return window.getSelection()
		}
	},
	range: {
		get() {
			return window.getSelection().getRangeAt(0)
		}
	},
	rangeCount: {
		get(){
			return window.getSelection().rangeCount
		}
	}
})


$('.textmodify').focus()


$('.textmodify').on('input keydown keyup', (e)=>{
	let { type, target } = e

	$('#' + type).empty()
		.append(rv('startOffset'))
		.append(rv('endOffset'))
		.append(rv('startContainer'))
		.append(rv('endContainer'))

	function rv(name) {
		let value = range[name]
		if(value instanceof Text) {
			// 内容为Text，需要调用data取到文本。
			value = value.data
		} else if (value instanceof HTMLDivElement && (value.classList.contains('modify') || value.classList.contains('textmodify'))) {
			// 内容为空，value将会返回div本身。
			value = ':self:'
		}
		return $('<span calss="name">').text(name).add($('<span class="value">').text(value)).add($('<br>'))
	}
})


// keydown: 按键盘，可获取div旧内容
// keyup：按键盘，可获取div最新内容（文本，光标位置）
// input：只有输入了内容时，才会获得最新内容，移动光标时无法获取内容。
