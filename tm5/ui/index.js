import { UIMenu, UIMain, UIIcon } from './UI.js';
import { Collection } from './Collection.js';

const menus = {}, mains = {}, icons = {};

window.D = {
	menus,
	mains,
	icons,
}

menus.nav = UIMenu.get('nav', 'top').end('').begin('50%')


menus.bottom = createMenu('bottom');
menus.right = createMenu('right');


new UIMenu('status', 'right');


// 根据网络状态，显示图标。
function listenNetStat() {
	const ON = 'var(--success)';
	const OFF = 'var(--dangel)';
	let statusMenu = UIMenu.get('nav','right');
	let wifiIcon = createIcon('wifi', navigator.onLine ? ON : OFF);
	wifiIcon.classList.add('disabled');
	statusMenu.append(wifiIcon);
	window.addEventListener('online', function (e) {
		let s = wifiIcon.style;
		s.backgroundColor = ON;
		s.maskImage = s.webkitMaskImage = `url(${iconDatas['wifi']})`;
	}, { passive: true });
	window.addEventListener('offline', function (e) {
		let s = wifiIcon.style;
		s.backgroundColor = OFF;
		s.maskImage = s.webkitMaskImage = `url(${iconDatas['wifi-1']})`;
	}, { passive: true });
}
listenNetStat();




// // lang.setLanguage('zh-CN')
// lang.username = '用户名'
// lang.password = '密码'




// css style :root value
function createRootKey(k) {
	return `var(--${k})`;
}


{
	icons.user = new UIIcon('user').appendTo(menus.nav).on('click', (e) => {
		UIMain.get('user');
	}, { passive: false });


	// icons.user = menus.top.appendChild(createIcon('user', createRootKey('gray')));
	// icons.user.addEventListener('click', (e) => {
	// 	UIMain.get('user')
	// 	icons.user.style.backgroundColor = createRootKey('blue');
	// }, { passive: false });
	icons.folder = new UIIcon('folder').appendTo(menus.nav).on('click', (e) => {
		UIMain.get('folder');
	}, { passive: false });

	// icons.folder = menus.top.appendChild(createIcon('folder', createRootKey('gray')));
	// icons.folder.addEventListener('click', (e) => {
	// 	UIMain.get('folder')
	// 	icons.folder.style.backgroundColor = createRootKey('blue');
	// }, { passive: false });

	mains.user = {};

	let main, box, s;

	main = UIMain.get('user').center()

	// div > form > [ box{ usernameIcon, input}, box{ passwordIcon, input }, box { controlIcon, input, input } ]

	let form = main.element.appendChild(document.createElement('form'));
	form.className = 'center-item';
	form.autocomplete = 'off';
	form.style.width = '320px';


	let usernameBox = form.appendChild(createGrid('32px auto'));
	s = usernameBox.style
	s.height = '2em';
	s.marginBottom = '1em';
	s.gridGap = '2px';

	let usernameIcon = usernameBox.appendChild(createIcon('user', createRootKey('blue'), 32, 16));
	let usernameInput = usernameBox.appendChild(document.createElement('input'));
	usernameInput.type = 'text';
	usernameInput.name = 'username';
	usernameInput.autofocus = 'on';
	usernameInput.autocomplete = 'off';
	usernameInput.maxLength = 255;

	function isUsername(value) {
		let re = /^[a-z0-9A-Z]+$/g;
		return re.test(value);
	}
	function isNotUsername(value) {
		let re = /[^a-z0-9A-Z]+/g;
		return re.test(value);
	}
	function nolmalizeUsername(value) {
		let re = /[^a-z0-9A-Z]+/g;
		if (re.test(value)) {
			value = value.replace(re, '');
		}
		return value;
	}

	usernameInput.addEventListener('keydown', (e) => {
		// console.log(isNotUsername(e.key))
		if (e.keyCode === 13 && isUsername(usernameInput.value)) {
			// 按回车，且用户名符合规则。
			// console.log('Username OK');
		} else if (isNotUsername(e.key)) {
			// 用户名不符合规则。
			// console.log('Input NG')
			e.preventDefault();
			e.stopImmediatePropagation();// 阻止事件继续触发（本例keydown）
			e.stopPropagation();// 阻止事件流继续触发（本例input,paste,beforepaste）
		} else {
			// 正常输入
		}
	}, { passive: false, capture: true, once: false });

	usernameInput.addEventListener('input', (e) => {
		// console.log(e.type, e.target.value)
		e.target.value = nolmalizeUsername(e.target.value);
	}, { passive: false, capture: true, once: false });


	let passwordBox = form.appendChild(createGrid('32px auto'));
	s = passwordBox.style;
	s.height = '2em';
	s.marginBottom = '1em';
	s.gridGap = '2px';

	let passwordIcon = passwordBox.appendChild(createIcon('keyboard', 'var(--blue)', 32, 16));
	let passwordInput = passwordBox.appendChild(document.createElement('input'));
	s = passwordInput;
	s.name = 'current-password';
	s.type = 'password';
	s.autocomplete = 'off';
	s.addEventListener('keydown', (e) => {
		if (e.keyCode === 13) {
			disableForm();
			setTimeout(enableForm, 2000);
		}
	});

	// 未免频发，暂时禁用组件。
	function disableForm() {
		// form.style.filter = 'grayscale(1)';
		usernameInput.disabled = true;
		passwordInput.disabled = true;
		loginInput.disabled = true;
		resetPasswordInput.disabled = true;
		usernameIcon.style.backgroundColor = 'var(--gray)';
		passwordIcon.style.backgroundColor = 'var(--gray)';
		controlIcon.style.backgroundColor = 'var(--gray)';
		loginInput.style.backgroundColor = 'var(--gray)';
		resetPasswordInput.style.backgroundColor = 'var(--gray)';
	}
	function enableForm() {
		// form.style.filter = '';
		usernameInput.disabled = false;
		passwordInput.disabled = false;
		loginInput.disabled = false;
		resetPasswordInput.disabled = false;
		usernameIcon.style.backgroundColor = 'var(--blue)';
		passwordIcon.style.backgroundColor = 'var(--blue)';
		controlIcon.style.backgroundColor = 'var(--blue)';
		loginInput.style.backgroundColor = 'var(--blue)';
		resetPasswordInput.style.backgroundColor = 'var(--blue)';
	}

	let controlBox = form.appendChild(createGrid('32px repeat(2, 1fr)'));
	controlBox.style.gridGap = '2px';

	let controlIcon = controlBox.appendChild(createIcon('network', 'var(--blue)', 32, 16));

	let loginInput = controlBox.appendChild(document.createElement('input'));
	s = loginInput;
	s.type = 'button';
	s.value = 'Login';
	s = loginInput.style;
	s.border = 'none';
	s.color = 'var(--white)';
	s.backgroundColor = 'var(--blue)';
	s.textAlign = 'center';
	s.height = '2em';

	loginInput.addEventListener('click', (e) => {
		login();
	}, { passive: false });

	function login() {
		let username = usernameInput.value;
		let password = passwordInput.value;
		console.log(username, password);
		disableForm();
		setTimeout(enableForm, 2000);
	}

	let resetPasswordInput = controlBox.appendChild(document.createElement('input'));
	resetPasswordInput.value = 'Reset Password';
	resetPasswordInput.type = 'button';
	s = resetPasswordInput.style;
	s.border = 'none';
	s.color = 'var(--white)';
	s.backgroundColor = 'var(--blue)';
	s.textAlign = 'center';
	s.height = '2em';





	mains.user.username = {};

	Object.defineProperty(mains.user, 'username', { value: {}, enumerable: true });

	Object.defineProperty(mains.user.username, 'value', {
		get() { return usernameInput.value; },
		set(v) { usernameInput.value = nolmalizeUsername(v); },
	});
	Object.defineProperty(mains.user.username, 'element', {
		get() { return usernameInput; }
	});
	Object.defineProperty(mains.user.username, 'icon', {
		get() { return usernameIcon; }
	});

	Object.defineProperty(mains.user, 'password', { value: {}, enumerable: true });
	Object.defineProperty(mains.user.password, 'value', {
		get() { return passwordInput.value; },
		set(v) { passwordInput.value = v; },
	});
	Object.defineProperty(mains.user.password, 'element', {
		get() { return passwordInput; }
	});
	Object.defineProperty(mains.user.password, 'icon', {
		get() { return passwordIcon; }
	});



}


// 状态
// status.login = false
// status.login = true


menus.left = new UIMenu('left')
menus.left.appendTo(document.body)

icons.file = menus.left.addIcon('file', createRootKey('dark')).icon
icons.file.addEventListener('click', (e) => {
	UIMain.get('file')

});



let i = new UIIcon('setting').appendTo(UIMain.get('file'))
i.on('click', console.log).cursor()


console.log(new Collection('a').has('a'))



let c = new Collection('a').set('aaa', { a: 1 }).set('bbb', { b: 2 })

console.log(c.has('aaa'), c.get('bbb'))

console.log(c.del('aaa').e)

