class Tip {
	constructor(target, element) {
		if (!(target instanceof HTMLElement)) throw new TypeError('The' + String(target) + ' must be an HTMLElement.');
		this.target = target;

		if (element instanceof HTMLElement) {
			this.element = element;
			this.element.style.position = '';
			this.element.style.float = '';
		} else {
			this.element = document.createElement('div');
		}
		this.element.classList.add('Tip');
		this.tipBox.appendChild(this.element);
		this.tipStyle;
	}

	get tipBox() {
		Tip.box = document.querySelector('#TipBox');
		if (!Tip.box) {
			Tip.box = document.createElement('div');
			Tip.box.setAttribute('id', 'TipBox');
			document.body.appendChild(Tip.box);
		}
		return Tip.box;
	}

	get tipStyle() {
		Tip.style = document.querySelector('style#TipStyle');
		if (!Tip.style) {
			Tip.style = document.createElement('style');
			Tip.style.setAttribute('id', 'TipStyle');
			document.head.appendChild(Tip.style);
			Tip.style.textContent = '.Tip { border: 1px solid #ccc; background-color:#fffe; position:absolute; overflow:auto; z-index:9007199254740991; white-space:pre-wrap; font-size: 9pt; }';
		}
		Tip.style.disabled = false;
		return Tip.style;
	}

	get rect() {
		if (!this._rect) {
			this._rect = this.target.getBoundingClientRect();
			setTimeout(() => {
				this._rect = null;
			})
		}
		return this._rect;
	}

	text(value) {
		this.element.textContent = value;
		return this;
	}

	html(value) {
		this.element.innerHTML = value;
		return this;
	}

	width(value) {
		this.element.style.width = (Number.isFinite(value) ? value : 200) + 'px';
		return this;
	}

	height(scale = 1) {
		this.element.style.height = (Number.isFinite(value) ? value : 200) + 'px';
		return this;
	}

	show() {
		this.element.hidden = false;
	}
	hide() {
		this.element.hidden = true
	}

	// 1 2 3
	// 4 5 6
	// 7 8 9
	pos(targetPos = 1, elementPos = 1) {
		let target = this.target;

		if (target.isConnected && target.hidden || target.style.display === 'none') return this;

		this.targetPos = targetPos;
		this.elementPos = elementPos;

		let targetRect = target.getBoundingClientRect();
		let x1, y1, x2, y2;
		switch (targetPos) {
			case 1:
				x1 = targetRect.left;
				y1 = targetRect.top;
				break;
			case 2:
				x1 = targetRect.left + targetRect.width / 2;
				y1 = targetRect.top;
				break;
			case 3:
				x1 = targetRect.left + targetRect.width;
				y1 = targetRect.top;
				break;
			case 4:
				x1 = targetRect.left;
				y1 = targetRect.top + targetRect.height / 2;
				break;
			case 5:
				x1 = targetRect.left + targetRect.width / 2;
				y1 = targetRect.top + targetRect.height / 2;
				break;
			case 6:
				x1 = targetRect.left + targetRect.width;
				y1 = targetRect.top + targetRect.height / 2;
				break;
			case 7:
				x1 = targetRect.left;
				y1 = targetRect.top + targetRect.height;
				break;
			case 8:
				x1 = targetRect.left + targetRect.width / 2;
				y1 = targetRect.top + targetRect.height;
				break;
			case 9:
				x1 = targetRect.left + targetRect.width;
				y1 = targetRect.top + targetRect.height;
				break;

			default:
				return;
		}

		let element = this.element;
		let s = this.element.style;
		s.right = '';
		s.bottom = '';
		switch (elementPos) {
			case 1:
				x2 = 0;
				y2 = 0;
				break;
			case 2:
				x2 = element.offsetWidth / 2;
				y2 = 0;
				break;
			case 3:
				x2 = element.offsetWidth;
				y2 = 0;
				break;
			case 4:
				x2 = 0;
				y2 = element.offsetHeight / 2;
				break;
			case 5:
				x2 = element.offsetWidth / 2;
				y2 = element.offsetHeight / 2;
				break;
			case 6:
				x2 = element.offsetWidth;
				y2 = element.offsetHeight / 2;
				break;
			case 7:
				x2 = 0;
				y2 = element.offsetHeight;
				break;
			case 8:
				x2 = element.offsetWidth / 2;
				y2 = element.offsetHeight;
				break;
			case 9:
				x2 = element.offsetWidth;
				y2 = element.offsetHeight;
				break;

			default:
				return;
		}
		s.left = (x1 - x2) + 'px';
		s.top = (y1 - y2) + 'px';

		return this;
	}

	update() {
		this.element.classList.add('Tip');
		this.pos(this.targetPos, this.elementPos);
		return this;
	}

	translate(...args) {
		args = args.map(e=>{
			if(typeof e==='number') {
				return `${e}px`;
			}
			return e;
		});
		let v = args.join(',');
		let s = this.element.style;
		if (/translate/.test(s.transform)) {
			s.transform = s.transform.replace(/translate\(([\s\S]+?)\)/, 'translate(' + v + ')')
		} else {
			s.transform += 'translate(' + v + ')';
		}
		return this;
	}

	rotate(r, o) {
		if(typeof r==='number') {
			r = r + 'deg';
		}
		let s = this.element.style;
		s.transformOrigin = o;
		if (/rotate/.test(s.transform)) {
			s.transform = s.transform.replace(/rotate\(([\s\S]+?)\)/, 'rotate(' + r + ')')
		} else {
			s.transform += 'rotate(' + r + ')';
		}
		return this;
	}
}

