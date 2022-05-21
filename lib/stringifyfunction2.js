// 处理function字符串化
(function (g) {
	var { log } = console;

	function stringify(f) {
		if (!(f instanceof Function)) throw TypeError(typeof f);// 不是函数

		let fs = String(f);
		if (fs.indexOf('function () { [native code] }') > -1) throw new ReferenceError('[native code]');// 隐藏内容的函数

		if (fs.indexOf('function') === 0) {
			// 传统函数
			return fs;
		} else if (/^[a-zA-Z\$_][a-zA-Z\d_]*=>/.test(fs) || /^\([a-zA-Z\$_][a-zA-Z\d_]*\)=>/.test(fs)) {
			// 箭头函数
			let [head, body] = fs.split('=>');
			log(head, body);
			if (head.indexOf('(') !== 0) head = '(' + head;
			if (head.lastIndexOf(')') !== 0) head = ')' + head;
			if (body.indexOf('{') !== 0) body = '{' + body;
			if (body.lastIndexOf('}') !== 0) body = body + '}';
			return 'function '
		}
		return fs
	}
	g.stringifyFunction = stringify
})(this)

/*
e=>e
e=>{}
(e)=>e
(e)=>{}

function (){}

*/