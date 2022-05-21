'use strict';
(function(){
	const debug = console.debug;
	
	const colors = {
		blue: '007bff',
		indigo: '6610f2',
		purple: '6f42c1',
		pink: 'e83e8c',
		red: 'dc3545',
		orange: 'fd7e14',
		yellow: 'ffc107',
		green: '28a745',
		teal: '20c997',
		cyan: '17a2b8',
		white: 'fff',
		gray: '6c757d',
		graydark: '343a40',
		primary: '007bff',
		secondary: '6c757d',
		success: '28a745',
		info: '17a2b8',
		warning: 'ffc107',
		danger: 'dc3545',
		light: 'f8f9fa',
		dark: '343a40',
	};
	
	let handles = {};
	
	for (let k in colors) {
		let color = colors[k];
		let x = 0.5;
		let y = 4.5;
		if (handles[color]) {
			debug[k] = handles[color][1];
			debug[k + 2] = handles[color][2];
		} else {
			handles[color] = {};
			debug[k] = handles[color][1] = console.debug.bind(null, `%c★`, `color:#fff;background:#${color};padding:0px ${x + y}px;box-sizing:border-box;font-family:consolas;border-radius:1em;`);
			debug[k + 2] = handles[color][2] = console.debug.bind(null, `%c★`, `color:#${color};padding:0px ${y}px;border:${x}px solid #${color};box-sizing:border-box;font-family:consolas;border-radius:1em;`);
		}
	};
	

	debug.colors = colors;

	self.debug = debug;
}).call(null);
