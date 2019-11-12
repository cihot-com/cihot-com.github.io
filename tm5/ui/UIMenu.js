import { UIBase } from './UIBase.js';

class UIMenu extends UIBase {
	static instances = {}
	static positions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left', top: 'top', right: 'right', bottom: 'bottom', left: 'left' }

	static normalizePos(pos) {
		return UIMenu.positions[pos] || 'top';
	}

	static get(name, pos = 'top') {
		if (UIMenu.instances[name] instanceof UIMenu) return UIMenu.instances[name];
		return UIMenu.instances[name] = new UIMenu(name, pos);
	}

	constructor(name, pos = 'top') {
		super();
		if (UIMenu.instances[name] instanceof UIMenu) {
			return UIMenu.instances[name];
		}
		this.element = document.body.appendChild(document.createElement('div'));
		this.element.className = `menu`;
		this._pos = UIMenu.normalizePos(pos);
		this.pos(this._pos);
	}

	pos(i) {
		if (arguments.length) {
			this._pos = UIMenu.normalizePos(i);
			let s = this.element.classList;
			s.forEach((name) => {
				if (/menu-(top|right|bottom|left)/.test(name)) {
					s.remove(name);
				}
			});
			s.add(`menu-${this._pos}`);
			this.clearPositionStyles();
			return this;
		} else {
			return this._pos;
		}
	}

	clearPositionStyles() {
		let s = this.element.style;
		s.top = '';
		s.bottom = '';
		s.left = '';
		s.right = '';
		return this;
	}

	begin(i) {
		let t = typeof i;
		if (t === 'number') i = `${i}px`;
		else if (t !== 'string') return this;
		let s = this.element.style;
		switch (this._pos) {
			case 'top':
			case 'bottom':
				s.top = '';
				s.bottom = '';
				s.left = i;
				break;
			default:
				s.top = i;
				s.left = '';
				s.right = '';
		}
		return this;
	}
	end(i) {
		let t = typeof i;
		if (t === 'number') i = `${i}px`;
		else if (t !== 'string') return this;
		let s = this.element.style;
		switch (this._pos) {
			case 'top':
			case 'bottom':
				s.top = '';
				s.bottom = '';
				s.right = i;
				break;
			default:
				s.bottom = i;
				s.left = '';
				s.right = '';
		}
		return this;
	}

	static normalizeValue(n) {

	}

	getItem(i = 0) {
		return this.element.children.item(i);
	}
	get items() {
		return this.element.children;
	}
	get length() {
		return this.element.children.length;
	}

	addIcon(...args) {
		this.icon = this.element.appendChild(createIcon(...args))
		return this;
	}
	getIconByIndex(i = 0) {
		return this.element.querySelectorAll(`.icon`).item(i);
	}
	getIconsByName(n) {
		return Array.prototype.filter.call(this.element.querySelectorAll('.icon'), (e) => e.getAttribute('name') === n);
	}
	getIcon(n) {
		let t = typeof n;
		if (t === 'number') return this.getIconByIndex(n);
		else if (t === 'string') return this.getIconsByName(n);
		return null;
	}


	min() {
		if (this.type === 'top' || this.type === 'bottom') {
			this.element.style.height = this.radius + 'px';
		} else {
			this.element.style.width = this.radius + 'px';
		}
		return this;
	}
	max() {
		if (this.type === 'top' || this.type === 'bottom') {
			this.element.style.height = this.weight + 'px';
		} else {
			this.element.style.width = this.weight + 'px';
		}
		return this;
	}
}

export { UIMenu };
