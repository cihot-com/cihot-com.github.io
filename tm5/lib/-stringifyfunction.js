// 处理function字符串化
(function (g) {
	function stringify(f) {
		// 是否函数
		if (typeof f === 'function') {
			f = f.toString()

			let m;
			// arg=>arg
			if (m = f.match(/^([^\)]+?)\s*(=>)\s*([\s\S]+)$/u)) {
				if (!/\}$/.test(m[3])) m[3] = encloseBody('return ' + m[3] + ';');
				return 'function ' + encloseArgs(m[1]) + m[3];
			}

			// if (!/^function/.test(f)) {
			// 	m = f.match(/\([\s\S]+/u)
			// 	if (m) {
			// 		f = 'function ' + m[0];
			// 	}
			// }

			f = f.replace(/^(function)?([\s\S]*?)(\([\s\S]*?\))\s*(=>)?\s*(\{)?\s*([\s\S]*?)\s*(\})?$/u, function (a, b, c, d, e, f, g, h) {
				// d = removeCommentsByArguments(d)
				// log('--',d)
				// g = g.trim();
				// 不带花括号
				if (!h) {
					// 箭头函数
					if (e) g = 'return ' + g;
				}
				// console.error('--',g)
				g = '{' + g + ';}';

				return 'function ' + d + g;
			});

			let i = /\{/


		} else {
			// 参数f不是函数，默认返回匿名空函数
			f = 'function (){}';
		}
		return f
	}

	// 删除参数的备注。如 function (a/*comment*/, b/*comment*/) {} 中的 /*comment*/。
	function removeCommentsByArguments(str) {
		return str.replace(/\/\*([\s\S]*?)(?<!\\)\*\//gu, '');
	}

	// 给参数添加小括号
	function encloseArgs(s) {
		if (!/^\([\s\S]*\)$/u.test(s)) {
			s = removeCommentsByArguments(s);
			s = '(' + s + ')';
		}
		return s;
	}

	// 给函数体添加花括号
	function encloseBody(s) {
		if (!/^\{[\s\S]*\}$/u.test(s)) {
			s = '{' + s + '}';
		}
		return s;
	}


	// exprots
	// Function.prototype.toJSON = function () { return stringify.bind(this) }
	g.stringifyFunction = stringify
})(this)



{
	let { log } = console;

	let f = function /** comment (1) */f(a/* comment (2) {ok} */)/* comment (3) */ {
		/* comment (4) {ok} */
		return 'result';
	}


	// let s = f.toString()

	f = ({
		funcName /*comment*/(a,b/*comment*/)/*comment*/ {
			/*comment*/
			return 'funcBody';
		}
	}).funcName;

	


	let fs = new FunctionSplitor(f)
	log(fs.split())

}