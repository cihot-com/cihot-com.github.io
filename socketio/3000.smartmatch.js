// smartMath
function smartMatch(source, sourceTargetArray, dict) {
	let ret = '';
	let o = strDiff(source, sourceTargetArray[0]);
	let d1 = o.diff1, d2 = o.diff2, len1 = d1.length, len2 = d2.length, d1Value, d2Value;
	let regexp = /^[\x01-\xff]+$/;
	if (len1 === len2) {// 不同点个数一样
		let startResult = [];
		startResult.push('⁉ Replace');
		ret = sourceTargetArray[1];
		for (let i = 0; i < len1; i++) {
			d1Value = d2Value = '';
			if (regexp.test(d1[i])) {
				ret = ret.replace(d2[i], d1[i]);
				startResult.push(d2[i] + ' -> ' + d1[i]);
			} else {
				dict.array.some(function (e) {
					if (e && (typeof e[0] === 'string') && e[0] && (typeof e[1] === 'string') && e[1]) {
						if (e[0].trim() === d1[i].trim()) d1Value = e[1].trim();
						if (e[0].trim() === d2[i].trim()) d2Value = e[1].trim();
						if (d1Value && d2Value) return true;
					}
				});
				if (d2Value) {
					ret = ret.replace(d2Value, d1Value || d1[i]);
					if (d1Value) {
						startResult.push(d2Value + ' -> ' + d1Value);
					} else {
						startResult.push(d2Value + ' *> ' + d1[i]);
					}
				} else {
					if (d1Value) {
						startResult.push(d2[i] + ' *> ' + d1Value);
					} else {
						startResult.push(d2[i] + ' *> ' + d1[i]);
					}
				}
			}
		}
		startResult.push('[Use] ' + sourceTargetArray[1]);
	} else if (len1 == 0) {
		// len2多，所以要删除多余的部分
		let startResult = [];
		startResult.push('⁉ Remove');
		ret = sourceTargetArray[1];
		for (let i = 0; i < len2; i++) {
			d2Value = '';
			if (regexp.test(d2[i])) {
				ret = ret.replace(d2[i], '');
			} else {
				dict.array.some(function (e) {
					if (e && (typeof e[0] === 'string') && e[0] && (typeof e[1] === 'string') && e[1]) {
						if (e[0].trim() === d2[i].trim()) {
							d2Value = e[1];
							return true;
						}
					}
				});
				if (d2Value) {
					ret = ret.replace(d2Value, '');
					startResult.push('[x] ' + d2Value);
				} else {
					startResult.push('[*] ' + d2[i]);
				}
			}
		}
		startResult.push('[Use] ' + sourceTargetArray[1]);
	} else if (len2 == 0) {
		// len1多，所以要找到内容，添加进去
		let startResult = [];
		ret = sourceTargetArray[1];
		startResult.push('‼ Add');
		for (let i = 0; i < len1; i++) {
			d1Value = '';
			if (regexp.test(d1[i])) {
				startResult.push('[*]' + d1[i]);
			} else {
				dict.array.some(function (e) {
					if (e && (typeof e[0] === 'string') && e[0] && (typeof e[1] === 'string') && e[1]) {
						if (e[0].trim() === d1[i].trim()) {
							d1Value = e[1];
							return true;
						}
					}
				});
				if (d1Value) {
					startResult.push('[*] ' + d1Value);
				} else {
					startResult.push('[*] ' + d1[i]);
				}
			}
		}
		startResult.push('[Use] ' + sourceTargetArray[1]);
	} else {
		ret = sourceTargetArray[1];
		let startResult = [];
		startResult.push('❌ No smart');
		startResult.push('[*]' + d1.join('|') + ' <- ' + d2.join('|'));
		// ❌💯‼️⁉️
	}
	return ret;
}
function strDiff(str1, str2, separator) {
	str1 = str1 || "";
	str2 = str2 || "";
	// separator = separator || /\b|[\s,\.\!_\-\+]+|\{\\r\\n\}|\\n/;// 原来的
	separator = separator || /[\s,\.\!_\-\+]+|\{\\r\\n\}|\\n/;
	// arr中有ele元素
	function hasElement(arr, ele) {
		// 内存循环
		let hasItem1 = false;
		for (let i2 = 0; i2 < arr.length; i2++) {
			//
			let item2 = arr[i2] || "";
			if (!item2) {
				continue;
			}
			//
			if (ele == item2) {
				hasItem1 = true;
				break;
			}
		}
		return hasItem1;
	};
	function inAnotB(a, b) { // 在A中，不在B中
		let res = [];
		for (let i1 = 0; i1 < a.length; i1++) {
			let item1 = a[i1] || "";
			if (!item1) {
				continue;
			}
			let hasItem1 = hasElement(b, item1);
			if (!hasItem1) {
				res.push(item1);
			}
		}
		return res;
	};
	//
	let list1 = str1.split(separator);
	let list2 = str2.split(separator);
	//
	let diff1 = inAnotB(list1, list2);
	let diff2 = inAnotB(list2, list1);
	// 返回结果
	let result = {
		diff1: diff1,
		diff2: diff2,
		separator: separator
	};
	return result;
};

console.log(strDiff('abc', 'ab,d'))

function run(dict, st, o) {
	if (st in o) {
		// t  需要填充的该target单元格
		// st t单元格的当前内容
		// tt 需要填充的100%匹配的最新内容
		let tt = o[st]
		// 已经填好的内容与100%内容一致时，直接退出操作。
		if (st === tt) return { removeClass: 'done doneAuto doneAutoSpace doneAutoNumber doneSmart', addClass: 'done' };
		// if (clickEvent.altKey) return t.parent().remove();
		return { text: tt, removeClass: 'done doneAuto doneAutoSpace doneAutoNumber doneSmart', addClass: 'doneAuto' };
	}

	// 如果没有直接找到一致内容，则需要只能匹配了。
	// 智能忽略空格匹配
	if (st.length === 0) { return; }
	let regexp = new RegExp('^' + Search.getRegExp(st).source + '$');
	for (let k in o) {
		if (regexp.test(k)) {
			// 找到一致内容
			// if (clickEvent.altKey) return t.parent().remove();
			return { text: o[k], removeClass: 'done doneAuto doneAutoSpace doneAutoNumber doneSmart', addClass: 'doneAutoSpace' };// 淡灰色
		}
	}

	// 数值匹配
	{
		let result = '', accepted, p;
		let regExp = ArgText.numberRegExp;
		let stNoNumber = st.replace(regExp, '');
		if (regExp.test(st)) {
			let arr = dict.array;
			arr.some(e => {
				let s = e[0], t = e[1];
				if (regExp.test(s)) {
					let sNoNumber = s.replace(regExp, '');
					if (sNoNumber === stNoNumber) {
						p = ArgText.makeTextPair(s, t);
						let stMade = ArgText.makeText(st);
						accepted = p.a.args.length === stMade.args.length
						if (accepted) {
							result = p.make(stMade.args);
						}
						return accepted;
					}
				}
			});

			if (accepted) {
				return { text: result, removeClass: 'done doneAuto doneAutoSpace doneAutoNumber doneSmart', addClass: p.accepted ? 'doneAutoNumber' : 'doneSmart' };// 不要继续往下执行。
			}
		}
	}

	// 一个词的替换
	{
		if (dict.search(st, 80).some(kv => {
			let tt;
			try {
				tt = kkv(st, kv, dict.array)
			} catch (err) {
				console.warn(err)
			}
			if (tt) {
				return { text: tt, addClass: 'doneAutoNumber' }
			}
		})) {
			return {};
		}
	}



	// 只能忽略数字英文符号等的匹配。
	let filterRegExp = /[\x00-\xff]/g, _k, _v;
	for (let k in o) {
		_k = k.replace(filterRegExp, '');
		if (_k == st.replace(filterRegExp, '')) {
			let v = smartMatch(st, [k, o[k]], dict);
			return { text: v, addClass: 'doneSmart' };
		}
	}

	// 实在是没有找到，需要做最后的处理。
	// 按下ctrl时，保留原来内容。按下alt时，删除找到的内容。找到内容时，自动替换背景颜色为灰色。
	// if (!clickEvent.ctrlKey) {
	// 	t.text('').removeAttr('style');
	// }
	return {}
}
function kkv(k, kv, dict) {
	if(!Array.isArray(dict)) dict = []
	let dmp = new diff_match_patch()
	let r = dmp.diff_main(kv.source || kv[0], k).filter(e => e[0] !== 0)
	let l = r.length
	if (l === 2 && r[0][0] === -1 && r[1][0] === 1) {
		// console.log(r[0][1])
		let search = dictSearch(r[0][1], 100, 0, dict)[0]
		// console.log(search)
		if (search) {
			let replace = dict.search(r[1][1], 100)[0]
			// console.log(replace)
			if (replace) {
				let v = kv.target || kv[1]
				// console.log(v, search[1],replace[1], v.replace(search[1],replace[1]))
				if (v) return v.replace(search[1], replace[1])
			}
		}
	}
	return false
}
kkv('식량 500 증가', { source: '식량 3000 증가', target: '粮食增加3000' })

function dictSearch(s, p = 0, i = 0, dict) {
	let r = []
	let t = typeof s
	if (t !== 'string' && s.length === 0) return r;

	Object.entries(dict).forEach(function (e, index) {
		let _s = e[i], sv = similar(s, e[i], true);
		if (sv >= p) {
			r.push(([]).concat(e, sv, index));
		}
	});

	r.sort(function (a, b) {
		// 0:source, 1:target, 2:similar, 3:index
		let a_similar = parseFloat(a[2]);
		let b_similar = parseFloat(b[2]);
		if (a_similar === b_similar) {
			let a_index = parseFloat(a[3]);
			let b_index = parseFloat(b[3]);
			return a_index > b_index ? -1 : (a_index === b_index ? 0 : 1)
		} else {
			return a_similar > b_similar ? -1 : (a_similar === b_similar ? 0 : 1);
		}
	});
	// r.reverse();
	return r;
}

// dictSearch(Object.entries(





/*
格式翻译工具

例文：
[Global Risk] Switcher 소속의 스칼렛.\n헬리콥터 분대를 지휘한다.
[Global Risk] Hidden Dragon 소속의 잉유에.\n보병 분대를 지휘한다.
[Global Risk] JNS 소속의 야오린.\n전투차량 분대를 지휘한다.


操作：
随便选择一条记录，按下F7进入格式定义窗口。
在原文和译文分别设定变量。


例文：
[Global Risk] JNS 소속의 야오린.\n전투차량 분대를 지휘한다.
[{0}] {1} 소속의 {2}.\n{3} 분대를 지휘한다.

[Global Risk]兰所属的姚淋。\n指挥战斗车辆分队。
[{0}] {1}所属的{2}。\n指挥{3}分队。


操作：
查找符合这个格式的原文句型

搜索结果：
1) [Global Risk] Switcher 소속의 스칼렛.\n헬리콥터 분대를 지휘한다.
2) [Global Risk] Hidden Dragon 소속의 잉유에.\n보병 분대를 지휘한다.
3) [Global Risk] JNS 소속의 야오린.\n전투차량 분대를 지휘한다.
4) [Global Risk] 속의 야오린속의 야오린속의 야오린속의 야오린. JNS 소속의 야오린.\n전투차량 분대를 지휘한다.

操作：
勾选去掉第4号句子的套用。该句符合机器逻辑条件，但人工检查后发现，实际上并不符合条件。
高亮显示这些匹配到的内容，并分析显示没有找到的词库，并提示用户添加定义词库。

词库例文：
Global Risk =》
JNS=》
야오린=》
전투차량=》战斗车辆


操作：
应用预览。如果没有设定词库，则用原文填充，设定了词库的直接保存到词库中。
确定无误后，最终提交到服务器上。


*/

// class UIFormaterTranslation {
// 	constructor(parent){
// 		let $e = this.$element = $(`
// <div calss="UIFormaterTranslation">
// 	<div class="editor">
// 		<div class="source"></div>
// 		<div class="target"></div>
// 	</div>
// 	<div class="editPreview">
// 		<div class="source"></div>
// 		<div class="target"></div>
// 	</div>
// 	<div class="works"></div>
// 	<div>
// 		<form>
// 			<input type="button" name="find" value="分析">
// 			<input type="button" name="submit" value="提交">
// 		</form>
// 	</div>
// </div>
// 		`).appendTo(parent)

// 		this.init()
// 	}

// 	init(){
// 		this.$sourceOfEditor = $e.find('.editor .source')
// 		this.$targetOfEditor = $e.find('.editor .target')
// 		this.$sourceOfEditorPreview = $e.find('.editPreview .source')
// 		this.$targetOfEditorPreview = $e.find('.editPreview .target')
// 		this.$works = $e.find('.')
// 		this.buttons = {
// 			$find: $e.find('form [name="find"]')
// 		}
// 	}
// }

