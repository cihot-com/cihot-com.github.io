class UIC {
	constructor(selector) {
		Object.defineProperty(this, 'selector', { value: selector, enumerable: true })
	}

	get tag() {
		return $(this.selector)
	}

	get tagName() {
		return this.tag.prop('tagName')
	}

	get key() {
		return this.tagName === 'INPUT' ? 'val' : 'text'
	}

	get value() {
		return this.tag[this.key]()
	}

	set value(v) {
		this.tag[this.key](v)
	}

	hide(b){
		this.tag.addClass('hide')
	}
	show() {
		this.tag.removeClass('hide')
	}
}

let ui = {
	loginForm: new UIC('#login'),
	username: new UIC('#username'),
	password: new UIC('#password'),
}


$(document).on('input', '#username, #password', (e) => {
	let id = $(e.target).attr('id')
	log(id, ui[id].value)
})
$(document).on('click', '#login', (e)=>{
	log('* click', e.target)
	if(s.connected) {
		let data = {
			username: ui.username.value,
			password: shake256(ui.password.value + '\0' + s.id, 256)
		}
		s.emit('login', data, (user) => {
			if (user) {
				s.user = user
				log('登录成功')
			} else {
				log('登录失败')
			}
		})
	}
})

export { ui, UIC }