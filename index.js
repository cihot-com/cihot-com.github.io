import isChrome from '/module/is_chrome.js'
if (!isChrome()) {
	document.body.style.background = 'red'
}



window.vm = new Vue({
	data: {
		links: [
			{ href: `https://aonun.com/tm1`, text: `TM1(翻译工具)` },
			{ href: `https://aonun.com/tm2`, text: `TM2(翻译工具)` },
			{ href: `https://aonun.com/tm3`, text: `TM3(翻译工具)` },
			{ href: `/tm4`, text: `TM4(翻译工具)` },
			{ href: `/tm`, text: `简繁体转换` },
			{ href: `/count`, text: `Count(字数统计)` },
			{ href: `/uniqueline`, text: `Unique Line` },
			{ href: `/cookie`, text: `Cookie` },
			{ href: `/jszip`, text: `JSZip压缩+解压缩` },
			{ href: `/login-local`, text: `浏览器本地登录` },
			{ href: `/login-google`, text: `浏览器谷歌登录` },
		],
	}
})

vm.$mount('#links')









//console.log('<script> index : module');
//import hotkey from './module/hotkey.js';
////import copyright from './index-copyright.js';


//var { log } = console

//let keyboard = document.querySelector('#keyboard');
//let mouse = document.querySelector('#mouse');

//window.addEventListener('keydown', (ev) => {
//	switch (ev.key) {
//		case 'F5':
//		case 'F12':
//			return;
//	}
//	ui('hotkey', hotkey(ev));
//	ui('keyCode', ev.keyCode);
//	ui('key', ev.key);
//	ui('code', ev.code);
//	ui('repeat', ev.repeat);

//	switch (ev.target.tagName) {
//		case 'INPUT':
//		case 'TEXTAREA':
//			break;
//		default:
//			ev.preventDefault();
//			break;
//	}
//	return false;
//});

//window.onmouseup = window.onmousedown = window.onmousemove = (ev) => {
//	ui('which', ev.which);
//	ui('x', ev.x);
//	ui('y', ev.y);
//	ui('layerX', ev.layerX);
//	ui('layerY', ev.layerY);
//	if (ev.type !== 'mousemove') log(ev);
//}

//let ui = function (id, value, propertyName = 'textContent') {
//	let e = ui.elements[id];
//	if (!e) {
//		e = document.getElementById(id);
//		if (!e) {
//			e = document.createElement('div');
//			e.setAttribute('id', id);
//		}
//		ui.elements[id] = e;
//	}
//	e[propertyName] = value;
//};
//ui.elements = {};
//ui.propertyName = 'textContent';

//function post(url, data, useJSON = true) {
//	return new Promise(function (resolve, reject) {
//		let q = new XMLHttpRequest();
//		q.open('POST', url, true);
//		q.onload = function (e) {
//			resolve(e.response);
//		};
//		q.onabort = q.onerror = function (e) {
//			reject(e);
//		};
//		if (useJSON) {
//			q.setRequestHeader('content-type', 'application/json');
//			data = JSON.stringify(data);
//		} else {
//			let usp = new URLSearchParams();
//			for (let k in data) {
//				let v = data[k];
//				if (Array.isArray(v)) {
//					v.forEach(e => {
//						usp.append(k, e)
//					});
//				} else {
//					usp.append(k, v);
//				}
//			}
//			data = usp.toString();
//		}
//		q.send(data);
//	});
//}

//self.post = post;



{
	let runIndex = 0
	let elParent = document.createElement('article');
	let elCode = document.createElement('textarea');
	let elNum = document.createElement('input');
	let elRun = document.createElement('button');
	elCode.toggleAttribute('autofocus', true);
	elCode.addEventListener('keydown', (e) => {
		if (e.keyCode === 13 && e.ctrlKey && !e.altKey && !e.shiftKey) {
			elRun.click();
		}
	});
	elNum.type = 'number';
	elNum.defaultValue = 10000
	elRun.textContent = 'Run sync script';
	elRun.addEventListener('click', async (e) => {
		let fn = Function(elCode.value)
		let num = elNum.value;
		num = parseInt(num);
		if (isNaN(num)) num = 0;
		let timeLabel = 'run' + runIndex
		console.time(timeLabel)
		while (num-- > 0) {
			fn.call(null);
		}
		console.timeEnd(timeLabel)
	});
	function br() {
		return document.createElement('br');
	}
	elParent.append(elCode, br(), elNum, elRun);
	document.body.appendChild(elParent);
}







window.p = 'property'
let l = 'let'
var v = 'var'
const C = 'CONST'
function f() { return 'Function' }