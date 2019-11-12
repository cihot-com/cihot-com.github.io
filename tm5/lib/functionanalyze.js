class FunctionAnalyze {
	constructor(fn) {
		this.fn = fn
		this.s = fn.toString()
		if (/\{ \[native code\] \}$/.test(this.s)) throw new Error('Thi\'s native code!');
	}

	get isArrow() {
		let k = '_arrow', value;
		if (Reflect.has(this, k)) {
			value = Reflect.get(this, k);
		} else {
			let s = this.s.replace(FunctionAnalyze.commentRe, '');
			if (/^function|^\S+\s*\(/.test(s)) {
				value = false;
			} else {
				if(/^\(/.test(s)) {
					value = true
				}else if (/\}$/.test(s)) {
					value = /\=\>\s*\{/.test(s)
				} else {
					value = /\)?\s*\=\>/.test(s);
				}
			}
			Object.defineProperty(this, k, { value });
		}
		return value;
	}

	analyze(s) {
		if (s === undefined) s = this.s;
		let commentRe = FunctionAnalyze.commentRe;
		let isArrow = this.isArrow;
		let splitRe = isArrow ? /\=\>/g : /\{/g;

		let indexs = (function () {
			let re = splitRe
			let m
			let ret = []
			while (m = re.exec(s)) {
				ret.push(m.index)
			}
			return ret;
		})();

		let areas = (function () {
			let re = commentRe;
			let m;
			let ret = [];
			while (m = re.exec(s)) {
				ret.push({ start: m.index, end: m.index + m[0].length })
			}
			return ret;
		})();

		let index = indexs.find(function (e, i) {
			return !areas.some(function (area) {
				let { start, end } = area;
				let isInner = start <= e && e <= end
				return isInner;
			});
		})

		let begin = s.slice(0, index);
		let end = s.slice(index);
		let args = this.extractArgs(begin);
		let body = this.extractBody(end);
		let str = 'function ' + args + body;
		
		return { isArrow, str, args, body };
	}

	extractArgs(begin) {
		begin = begin.replace(FunctionAnalyze.commentRe, '');
		let m = begin.match(/\([\s\S]*\)/u);
		let ret = m ? m[0] : begin;
		if (!(/^\(/.test(ret) && /\)$/.test(ret))) ret = '(' + ret.trim() + ')';
		return ret;
	}

	extractBody(end) {
		let isArrow = this.isArrow;
		let re = new RegExp('^\\s*' + FunctionAnalyze.commentRe.source + '\\s*', 'u');
		end = end.replace(/^\=\>\s*/, '');
		end = end.trim().replace(re, '');
		if (!(/\{/.test(end) && /\}$/.test(end))) {
			if (isArrow) end = 'return ' + end;
			end = '{' + end.trim() + '}';
		}
		return end;
	}

}
FunctionAnalyze.commentRe = /\/\*[\s\S]*?(?<!\\)\*\//gu;
