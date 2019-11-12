// 选择后设置变量
let { log } = console


class PatternTranslate {

	constructor() {
		// 需要按其类型进行初始化赋值
		this.sourceRegExp = RegExp
		this.targetPattern = String
		this.dict = Array
	}

	preTranslate(sourceText) {
		// @sourceText  需要翻译的内容
		// if(!Array.isArray(dict)) dict = []// 需要防止报错？
		let { sourceRegExp, targetPattern, dict } = this
		// 原文是否符合格式
		let b = sourceRegExp.test(sourceText)
		if (!b) return false
		let m = sourceText.match(sourceRegExp)
		let { groups } = m
		let ret = targetPattern.map((e) => {
			let t = typeof e
			if (t === 'object' && e !== null) {
				let { name, type } = e
				let s = groups[name]
				if (type === 'copy') {
					return s
				} else if (type === 'dict') {
					let a = dict.filter(e => e.source === s).map(e => e.target)
					let len = a.length
					// log('***', a, len)
					if (len === 0) {
						return { original: s }
					} else if (len === 1) {
						return a[0]
					} else {
						return a
					}
				}
			}
			return e
		})
		// log(sourceText)
		// log('↓')
		// log(ret)
		return ret
	}

	static preTranslate(sourceText, sourceRegExp, targetPattern, dict) {
		let pt = new PatternTranslate()
		pt.sourceRegExp = sourceRegExp
		pt.targetPattern = targetPattern
		pt.dict = dict

		return pt.preTranslate(sourceText)
	}
}


void function test() {

	let sourceText = '你好，妈妈！2020'

	let source = '你好，老师！2019'
	let target = '[2019] 안녕하세요, 선생님!'

	// 用HTML划分出arg的范围，并生成以下内容。
	// 变量名要对应，如arg1、arg2。类型的取值范围为copy、dict。
	let sourceRegExp = /^你好，(?<arg1>[\s\S]+)！(?<arg2>[\s\S]+)$/iu
	let targetPattern = ['[', { name: 'arg2', type: 'copy' }, '] 안녕하세요, ', { name: 'arg1', type: 'dict' }, '!']// 注意转义用$$


	let dict = [{ source: '妈妈', target: '어머님' }]
	let rs = PatternTranslate.preTranslate(sourceText, sourceRegExp, targetPattern, dict)
	log(rs)

	// 词库有多个收录
	// [ '[', '2020', '] 안녕하세요, ', [ '엄마', '어머니' ], '!' ]

	// 词库有一个收录
	// [ '[', '2020', '] 안녕하세요, ', '어머님', '!' ]

	// 词库没有收录
	// ['[', '2020', '] 안녕하세요, ', { original: '妈妈' }, '!']
}



let SM = SelectionManager = {
	get s() { return window.getSelection() },
	get range() { return this.s.getRangeAt(0); },
	set range(v) {
		if (v instanceof Range) {
			this.s.removeAllRanges();
			this.s.addRange(v);
		}
	},
	get text() { return this.range.toString(); },
	set text(v) {
		this.range.deleteContents();
		this.range.insertNode(document.createTextNode(v));
		this.range.collapse();
	},
	arg(i) {
		let e = document.createElement('code')
		e.setAttribute('argindex', i)
		e.textContent = this.text
		this.range.deleteContents();
		this.range.insertNode(e);
		this.range.collapse();
	}
};


function formatRegExpSource(e) {
	let source = '^$\\/.:!?|*+-([{<>}])'
	source = source.split('').map(e => '\\' + e).join('|')
	let regExp = new RegExp(source, 'g')
	return e.replace(regExp, '\\$&')
}
function formatRegExpReplacement(str) {
	return str.replace(/\$/g, '$$')
}
function testIgnoreSpace(a, b) {
	a = a.replace(/\s/gu, '')
	b = b.replace(/\s/gu, '')
	return a === b
}


let v = new Vue({
	el: '#app',
	data: {
		source: '',
		target: '',
		sourceArgs: [],
		targetArgs: [],
		sources: [],
		matchSources: [],
		dict: [],
		results: [],
		dictNeeds: [],
	},
	computed: {
		sourceRegExp() {
			let { source, sourceArgs } = this
			let str = '^'
			if (sourceArgs.length === 0) {
				str = formatRegExpSource(source)
			} else {
				let args = sourceArgs.map((e, i) => {
					let o = {}
					o.index = i
					o.start = e.selectionStart
					o.end = e.selectionEnd
					o.text = e.selectionText
					return o
				}).sort((a, b) => a.start - b.start)
				let i = 0
				let len = source.length
				args.forEach(e => {
					let { index, start, end, text } = e
					let chunk = source.slice(i, start)// 截取原文
					chunk = formatRegExpSource(chunk)
					str += chunk
					str += `(?<arg${index}>[\\s\\S]+?)`// 插入参数
					i = end
				})
				str += formatRegExpSource(source.slice(i, len))// 截取原文到最后
				str += '$'
			}
			let re
			try{
				re = new RegExp(str, 'i')
			}catch(err){
				console.warn(err)
				alert('程序出错，需要联系站长。')
			}
			return re
		},
		targetPattern() {
			let { target, targetArgs } = this
			let pattern = []
			if (targetArgs.length === 0) {
				pattern.push(formatRegExpReplacement(target))
			} else {
				let args = targetArgs.map((e, i) => {
					let o = {}
					o.index = i
					o.start = e.selectionStart
					o.end = e.selectionEnd
					o.text = e.selectionText
					return o
				}).sort((a, b) => a.start - b.start)
				let i = 0
				let len = target.length
				args.forEach(e => {
					let { index, start, end, text } = e
					let chunk = target.slice(i, start)// 截取原文
					chunk = formatRegExpReplacement(chunk)// 替换的时候转义符为$，注意这个就行吧？
					pattern.push(chunk)
					let type = /^\s*\p{Number}+\s*$/.test(text) ? 'copy' : 'dict'
					pattern.push({ name: `arg${index}`, type })
					i = end
				})
				pattern.push(target.slice(i, len))// 截取原文到最后
			}
			return pattern
		}
	},
	methods: {
		addSourceArg(event) {
			// let selection = window.getSelection()
			// let { anchorNode, focusNode } = selection

			// if(anchorNode==focusNode) {
			// 	if(anchorNode.nodeType !== Element.TEXT_NODE) return log('选择错误')
			// 	SM.arg(this.sourceArgs.length)
			// 	this.sourceArgs.push({ id:0, text: SM.text })
			// }
			this._addArg('source')
		},
		addTargetArg(event) {
			this._addArg('target')
		},
		clearSourceArg() {
			this.sourceArgs = []
			let str = this.source
			let targetElement = $(this.$el).find('.maker .target').get(0)
			this.source = ''
			setTimeout(() => this.source = str, 0)

		},
		clearTargetArg() {
			this.targetArgs = []
			let str = this.target
			this.target = ''
			setTimeout(() => this.target = str, 0)
		},
		_addArg(name) {
			let element = $(this.$el).find('.maker .' + name).get(0)
			let { selectionStart, selectionEnd, selectionDirection } = element
			if (selectionStart === selectionEnd) return log('开始和结束点一样')

			let selectionText = this[name].slice(selectionStart, selectionEnd)
			let b = this[name + 'Args'].every(e => {
				return e.selectionText !== selectionText && e.selectionStart !== selectionStart && e.selectionEnd !== selectionEnd
			})
			if (b) {
				this[name + 'Args'].push({ selectionText, selectionStart, selectionEnd })
			}
		},
		calc() {
			let { sourceRegExp, targetPattern, sources, dict } = this
			console.count('calc!')
			
			let results = []
			sources.map(e => {
				let { id, source: sourceText } = e
				let b = sourceRegExp.test(sourceText)
				if (b) {
					let o = {
						id: $('<td>').addClass('id').text(id),
						source: $('<td>').text(sourceText).addClass('source'),
					}
					let pts = PatternTranslate.preTranslate(sourceText, sourceRegExp, targetPattern, dict)

					let td = $('<td>').addClass('target')
					// toHTML of target
					pts.map(e => {
						if (Array.isArray(e)) {
							e.forEach((word) => $('<code>').addClass('clickdelete').text(word))
						} else if (e && e.original) {
							let { original } = e
							let b = false
							dict.forEach(st => {
								let stb = testIgnoreSpace(st.source, original)
								if (stb) {
									$('<code>').addClass('clickdelete').text(st.target).appendTo(td)
								}
								b = b || stb
							})
							if (b === false) $('<code>').addClass('original editable').attr({ original }).text(original).appendTo(td)
						} else {
							td.append(e)
						}
					})
					o.target = td
					results.push(o)
				}
			})

			requestAnimationFrame(()=>{
				$('#works').empty()
				results.forEach(e=>{
					$('<tr>').append(e.id).append(e.source).append(e.target).appendTo('#works')
				})
			})
			log(results)
		},
		submit() {
			if (opener) {
				console.count("submit!")
				let ret = []
				$('#works tr').each((i, e) => {
					let sourceId = Number($(e).find('.id').text())
					let source = $(e).find('.source').text().trim()
					let $target = $(e).find('.target')
					let target = $target.text().trim()

					if(target){
						ret.push({ sourceId, source, target, type: 'addTarget' })
	
						$target.find('.original').each((i, e) => {
							let source = $(e).attr('original').trim()
							let target = $(e).text().trim()
							ret.push({ type: 'addDict', source, target })
						})
					}

				})

				// opener.postMessage(ret)
				requestAnimationFrame(()=>{
					postMessage(ret)
				})
			}
		}
	}
})



window.addEventListener('message', ({ data }) => {
	// PatternTranslate.preTranslate(sourceText, sourceRegExp, targetPattern, dict)
	let { source, target, sources, dict } = data
	try{
		v.source = source || ''
		v.target = target || ''
		v.sources = sources || []
		v.dict = dict || []
		v.sourceArgs = []
		v.targetArgs = []
		v.results = []
		log(data, v)
	}catch(err) {
		console.warn(err)
		alert('程序出错，需要联系站长。')
	}
})

$(window).on('contextmenu', function (e) {
	e.preventDefault()
	let {target} = e
	let $t = $(target)

	if($t.is('#works td')) {
		$t.parent('tr').remove()
	}

	else if($t.is('.clickdelete')) {
		$t.remove()
	}
})