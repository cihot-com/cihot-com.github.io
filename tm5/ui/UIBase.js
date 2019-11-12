class UIBase {
	appendTo(parent) {
		if (parent instanceof HTMLElement) {
			parent.appendChild(this.element);
		} else if (parent instanceof UIBase) {
			parent.element.appendChild(this.element);
		}
		return this;
	}
	append(child) {
		this.element.appendChild(child instanceof UIBase ? child.element : child);
		return this;
	}
	insert(child) {
		this.element.insertAdjacentElement('afterbegin', child);
		return this;
	}
	hide() {
		this.element.classList.add('hidden');
		return this;
	}
	show() {
		this.element.classList.remove('hidden');
		return this;
	}
	on(type, handle, opt) {
		this.element.addEventListener(type, handle, opt)
		return this;
	}
	once(type, handle, opt) {
		opt = opt || {};
		opt.once = true;
		this.element.addEventListener(type, handle, opt);
		return this;
	}
	off(type, handle) {
		this.element.removeEventListener(type, handle, opt);
		return this;
	}
	style(k, v, b = false) {
		this.element.style[k] = v + (b ? '!important' : '');
		return this;
	}
}


export { UIBase }
