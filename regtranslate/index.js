class IgnoreSpecialCharacterRegExp {
	constructor(specialCharacters = '\\/|(){}[].?*+-=<:!^$') {
		this.chars = specialCharacters
	}
	set chars(v) {
		this._chars = v
		this._regExp = this.createSpcRegExp()
	}
	get chars() {
		return this._chars
	}
	createSpcRegExp(opt = 'g') {
		return new RegExp(this._chars.split('').map(e => `\\${e}`).join('|'), opt)
	}
	get regExp() {
		return this._regExp
	}
	format(source) {
		return source.replace(this.regExp, '\\$&')
	}
	toRegExp(source, opt = 'g') {
		source = this.format(source)
		// console.log(source)
		return new RegExp(source, opt)
	}
}

{


	// let iscre = new IgnoreSpecialCharacterRegExp()
	// let r = iscre.toRegExp(' ')
	// console.log('1234 abcd .+ + +++'.match(r))
	// console.log(iscre.format('1234 abcd .+ + +++'))
	// console.log('1234 abcd .+ + +++'.replace(r, '*'))



	// 可以在chrome中用鼠标选取，用快捷键输入号码，得出如下一组模版。
	let sTag = `{0}({1})소환, 승급하거나 보석 스킬 슬롯 개방에 필요한 재료\n[A3DB57FF]영웅 소환 또는 몬스터 사냥 시 리더로 참전할 경우 획득 가능`
	let tTag = `召唤、升级{1}({0})或开放宝石技能槽位所需的材料\n[A3DB57FF]召唤英雄或狩猎怪物时以领队身份参战时可以获得`

	// 这是新的原文
	let s = `라시드(불)소환, 승급하거나 보석 스킬 슬롯 개방에 필요한 재료\n[A3DB57FF]영웅 소환 또는 몬스터 사냥 시 리더로 참전할 경우 획득 가능`

	// 这是词库
	let dict = [
		{ s: '라시드', t: '拉希德' },
		{ s: '불', t: '火' },
	]


	// 问题语句
	let sTagErrors = [
		'{0} - {{1}',
		'{0} - {}',
	]


	// { ---> {{
	// (.+?)
	// {{ ---> {

	// 原文所有单个{符号转为{{符号

	let dict = '零壹贰叁肆伍陆柒捌玖'.split('')
	sTagErrors.forEach(s=>{
		
		let r = s.replace(/\{/g, '{{')
		log(s, '-->', r)
	})

	// // 用{{分割原文，只剩单个{符号
	// log(sTag.split(/{{/g))

	// let re = /(?<!(\{\{)+)\{([^\{\}]+?)\}/g
	// log(sTag.match(re))

	// let r = sTag.replace(re, (...a) => {
	// 	log(...a.slice(0, -1))
	// 	return '.+?'
	// })


	// log(r)

	function log(...a) {
		console.log(...a);
	}

	// 指定参数区域
	// 分析s2中的参数区域
	// 对参数区域进行搜索，和编辑


	class StringPos {
		constructor(string, index) {
			this.string = string
			this.length = string.length - 1
			this.setIndex(index)
		}
		setIndex(index = 0) {
			this.index = this.formatIndex(index)
			this.currentChar = this.string.charAt(index)
			this.prevChar = index - 1 < 0 ? null : this.string.charAt(index - 1)
			this.nextChar = this.length < index + 1 ? null : this.string.charAt(index + 1)
			return this
		}
		formatIndex(v) {
			return Math.min(Math.max(0, v), this.length)
		}
		prev() {
			this.setIndex(this.index - 1)
			return this
		}
		next() {
			this.setIndex(this.index + 1)
			return this
		}
		get pair() {
			let { prevChar, currentChar, nextChar } = this
			return { prevChar, currentChar, nextChar, index: this.index, start: prevChar === null, end: nextChar === null }
		}
	}

	class StatCollection {
		constructor() {
			this.collection = []
			this.area = []
			this.lastIndex = 0
		}

		setStart(name, char, index) {
			this.collection.push({ name, char, index })
			this.lastName = name
			this.lastChar = char
			this.lastIndex = index
		}

		setEnd(name, char, index) {
			if (item.lastName === name) {
				let item = this.collection.pop()
				this.area.push({ name, startChar: item.char, start: item.index, endChar: char, end: index })
			}
		}

		// lastFind(name) {
		// 	let { colletion: col } = this
		// 	let { length: i } = col
		// 	while (0 <= --i) {
		// 		let e = col[i]
		// 		if(name === e.name) {
		// 			return {}
		// 		}
		// 	}
		// }

	}


	{
		function fn(pair) {
			let r = false
			let { prevChar, currentChar, nextChar } = pair
			if (currentChar === '{') {
				if(prevChar !== '{') {
					sc.setStart('{Area}')
				}else{
					sc.setEnd('{Area}')
				}
				r = true
			}
			return r
		}
		let rules = [ fn ]


		let sp = new StringPos('abc{{d}efg')
		let sc = new StatCollection()

		function collect(pair) {
			let o
			for (let rule of rules) {
				o = rule(pair)
				if (o) {
					// sp[o.method](o.name, o.index)
					break
				}
			}
		}

		while (true) {
			let { pair } = sp
			collect(pair)
			if (pair.end) break;
			sp.next()
		}

		log(sc.collection)

	}
}
