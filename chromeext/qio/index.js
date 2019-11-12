function qio(src) {
	let l = window.document.createElement('div');
	l.textContent = 'Loading...';
	document.body.appendChild(l);
	l.setAttribute('style', 'position:fixed;right:0;top:0;background:#ff0;font-size:3em;z-Index:999;');
	let s = document.createElement("script");
	s.setAttribute('type', 'application/javascript');
	s.src = src;
	document.body.appendChild(s);
	s.onload = function () { l.remove() }
}
let btn = document.body.appendChild(document.createElement('button'))
btn.textContent = 'Q.io'
btn.onclick = () => qio('https://cihot.com/tm4/q.io.4.js')
let s = btn.style;
s.position = 'fixed';
s.bottom = 0;
s.left = 0;
s.opacity = 0.6;
s.backgroundColor = 'black';
s.color = 'white';
s.padding = '4px 14px';
s.zIndex = Number.MAX_SAFE_INTEGER;
console.log('qio');