class TagManager {
	static get(id, handle) {
		let element = document.getElementById(id)
		let components = {}
		let result = {}
		Array.from(document.querySelectorAll('input')).forEach(input => {
			let { name } = input;
			if (!name) return;
			name = camelize(name)
			components[name] = input;
			Object.defineProperty(result, name, {
				get() {
					return input.value
				},
				set(v) {
					input.value = v
				},
				enumerable: true,
			})
			input.autocomplete = 'off'
		})
		result._id = id
		result._components = components
		result._element = element
		result._no = function () {
			Object.values(components).forEach(c => c.disabled = true)
		}
		result._yes = function () {
			Object.values(components).forEach(c => c.disabled = false)
		}

		// 侦听事件
		for (let name in handle) {
			let c = components[name]
			let h = handle[name]
			if (c && h) {
				for (let type in h) {
					let fn = h[type]
					c.addEventListener(type, fn.bind(result))
				}
			}
		}

		return result
	}

	static set(id, components) {
		let element = document.getElementById(id)
		if (!element) {
			element = document.createElement('div')
			element.id = id
			document.body.appendChild(element)
		}
		components.forEach(o => {
			let { tag, name, value } = o
			if (tag) {
				let e = document.createElement(tag)
				if (name) {
					name = camelize(name)
					e.name = name
				}
				if (value) {
					if (tag === 'input' || tag === 'textarea') {
						e.value = value
					}
				}
			}
		})
		return TagManager.get(id)
	}
}


var o = TagManager.get('test-login', {
	loginButton: {
		click() {
			let { email, password} = this

			s.quest('userLogin', {email, password}, function login(data){
				o.result = JSON.stringify(data)
				this._yes()
			})
			this._no()
		}
	}
})


