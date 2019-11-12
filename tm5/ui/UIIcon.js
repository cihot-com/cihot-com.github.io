import { UIBase } from './UIBase.js';

class UIIcon extends UIBase {
	constructor(name, size, color) {
		super();
		this.element = document.createElement('div');
		this.name(name);
		this.size(size);
		this.color(color);
	}
	name(name = 'focus') {
		this.element.className = `icon icon-${name}`;
		return this;
	}
	size(n = 'var(--highnees)') {
		let s = this.element.style;
		s.width = s.height = typeof n === 'number' ? `${n}px` : n;
		return this;
	}
	color(c = 'var(--gray)') {
		this.element.style.backgroundColor = c
		return this;
	}
	cursor(name = 'pointer') {
		this.element.style.cursor = name;
		return this;
	}
	disabled(b = false) {
		this.element.classList[b?'add':'remove']('disabled')
		return this;
	}
}

export { UIIcon };
