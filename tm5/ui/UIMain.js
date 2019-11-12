import { UIBase } from './UIBase.js';

class UIMain extends UIBase {
	static instances = {}

	static get(name) {
		let ret;
		let s = UIMain.instances;
		for (let k in s) {
			if (k == name) {
				s[k].element.classList.remove('hidden')
				ret = s[k]
			} else {
				s[k].element.classList.add('hidden')
			}
		}
		return ret || new UIMain(name);
	}

	constructor(name) {
		super()
		let s;
		s = UIMain.instances[name];
		if (s instanceof UIMain) return s;

		s = this.element = document.body.appendChild(document.createElement('div'));
		s.className = 'main';
		UIMain.instances[name] = this;
		s.setAttribute('name', name);
	}

	center(b = true) {
		this.element.classList[b ? 'add' : 'remove']('center-box');
		return this;
	}

}

export { UIMain }
