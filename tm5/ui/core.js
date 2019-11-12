// DIV - menu
function createMenu(pos = 'top') {
	let elem = document.createElement('div')
	elem.className = `menu menu-${pos}`;
	document.body.appendChild(elem);
	return elem;
}
function getMenuIcons(menuElem) {
	let o = menuElem.children;
	for (let i = 0, len = o.length; i < len; i++) {

	}
}
function getMenuIcon(index = 0) {
	return menuElem.children[index];
}
// DIV - icon
function createIcon(name = 'focus', color = 'blue', highness = 24, iconHighness = '') {
	let div = document.createElement('div');
	div.style.backgroundColor = color;
	div.setAttribute('name', name);
	let l = div.classList;
	l.add('icon');
	l.add(`icon-${name}`);
	l.add(`w${highness}`);
	l.add(`h${highness}`);
	if (iconHighness) l.add('mask' + iconHighness);
	return div;
}
function setIconColor(element, color) {
	let s = element.style
	s.backgroundColor = color
	return element
}
function setIconSize(element, highness = 16) {
	let l = element.classList;
	let re = /^(w|h)\d+$/
	l.forEach(n => {
		if (re.test(n)) {
			l.remove(n);
		}
	});
	l.add(`w${highness}`);
	l.add(`h${highness}`);
	return element;
}
function setIconMaskSize(element, highness = 16) {
	let l = element.classList;
	let re = /^mask\d+$/
	l.forEach(n => {
		if (re.test(n)) {
			l.remove(n);
		}
	});
	l.add('mask' + highness);
	return element;
}
// DIV - grid
function createGrid(columns = '', rows = '') {
	let elem = document.createElement('div');
	let s = elem.style;
	s.display = 'grid';
	s.gridTemplateColumns = columns;
	s.gridTemplateRows = rows;
	return elem;
}





// class UIForm extends UIBase {
// 	static instances = {}

// 	constructor() {
// 		super();
// 		this.element = document.createElement('form');
// 		this.element.setAttribute('autocomplete', 'off');
// 	}

// 	item(name, type = 'text', icon = 'focus') {
// 		return new UIFormItem(type)
// 	}
// }



// class UIFormItem extends UIBase {
// 	constructor(type) {
// 		super();
// 		this.element = document.createElement('div')
// 		this.element.className = 'form-item';
// 	}

// 	center(b = true) {
// 		this.element.classList[b ? 'add' : 'remove']('center-box');
// 		return this;
// 	}

// 	icon(name = 'focus', color = 'var(--icon-color)', pos = 'left') {
// 		if (this.iconElement) {
// 			this.iconElement.className = `icon icon-${name}`
// 		} else {
// 			this.iconElement = createIcon(name, color, 24, 16)
// 		}
// 		if (pos === 'left') {
// 			this.element.insertAdjacentElement('afterbegin', this.iconElement)
// 		} else {
// 			this.element.insertAdjacentElement('beforeend', this.iconElement)
// 		}
// 		return this
// 	}
// 	iconColor(color) {
// 		if (this.iconElement) {
// 			this.iconElement.style.backgroundColor = color
// 		}
// 		return this
// 	}

// 	input(type) {
// 		let s = this.inputElement;
// 		if (s instanceof HTMLInputElement) {
// 		} else {
// 			s = this.inputElement = this.element.appendChild(document.createElement('input'));
// 			s.setAttribute('type', type);
// 			s.setAttribute('autocomplete', 'off');
// 		}
// 		return s;
// 	}
// }

// 只有一次
// import('./test.js').then((m)=>{ console.log(window.o); });
// import('./test.js').then((m)=>{ console.log(window.o); });
import('./test.js').then((m)=>{ console.log(window.o); });


