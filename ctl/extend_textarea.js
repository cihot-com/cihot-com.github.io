function extendTextarea(el) {
	el.addEventListener('keydown', (ev) => {
		let { key, target, ctrlKey } = ev
		let { selectionStart, selectionEnd, value } = target
		if (key === 'Enter') {
			let chunk = value.slice(0, selectionEnd)
			let index = chunk.lastIndexOf('\n')
			if (-1 < index) {
				chunk = chunk.slice(index + 1)
				let m = chunk.match(/^\s+/)
				if (m && m[0]) {
					target.setRangeText('\n' + m[0], selectionStart, selectionEnd, 'end')
					ev.preventDefault()
				}
			}
		} else if (key === '/' && ctrlKey) {
			ev.preventDefault()
			let chunk = value.slice(selectionStart, selectionEnd)
			if (selectionStart === selectionEnd) {
				let chunk = value.slice(0, selectionEnd)
				let index = chunk.lastIndexOf('\n')
				let { length } = 0
				if (-1 < index) {
					chunk = chunk.slice(index + 1)
					if (/^\s*\/\//.test(chunk)) {
						//"select" 选择新插入的文本。
						//"start"将选择内容移动到插入文本之前。
						//"end" 将选择内容移动到插入的文本之后。
						//"preserve"尝试保留选择。这是默认值。
						chunk = chunk.replace(/^(\s*)\/\//, '$1')
					} else {
						chunk = chunk.replace(/^\s+/m, '$&//')
					}
					console.log(index + 1, selectionEnd)
					target.setRangeText(chunk, index + 1, selectionEnd, 'end')
				} else {
					if (/^\s*\/\//.test(chunk)) {
						chunk = chunk.replace(/^\s*\/\//gm, '')
					} else {
						chunk = chunk.replace(/^\s*/gm, '$&//')
					}
					target.setRangeText(chunk, selectionStart, selectionEnd, 'end')
				}
				ev.preventDefault()
			}
		}
	}, { capture: true })
}

export default extendTextarea