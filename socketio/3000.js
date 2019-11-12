let { log, warn, error, info, debug, time, timeEnd, group, groupEnd } = console
let version = '20190809h'
let sock3000 = {}
let currents = {}
let projects = new Map()
let messages = new Map()
let sources = new Map()
let dicts = []
let dict = {}
let idb = localforage.createInstance({ name: '3000' })
let searchWindow
let calcTimeout
let sysmsg = $('<div>').css({ position: 'fixed', left: 50, bottom: 0, backgroundColor: '#ffc' }).appendTo('body')
let bulkWindow
let userPanel = {
	$: $('#userPanel'),
	$username: $('#userPanel').find('[name=username]'),
	$password: $('#userPanel').find('[name=password]'),
	$connect: $('#userPanel').find('[name=connect]'),
	$loginStatus: $('#userPanel').find('[name=loginStatus]'),
	get username() { return this.$username.val() },
	get password() { return this.$password.val() },
	login() {
		let { username, password } = this
		// console.log(username,password)
		sock = new Sock()
		sock.login(username, password)
	},
	show() { this.$.removeClass('hide') },
	hide() { this.$.addClass('hide') },
}
userPanel.$connect.on('click', (e) => {
	userPanel.login()
})
userPanel.hide()

let mainPanel = {
	$: $('#mainPanel'),
	show() { this.$.removeClass('hide') },
	hide() { this.$.addClass('hide') },
}
let $mask = $('<div>').css({
	width: '100%', height: '100%', margin: 0, padding: 0,
	backgroundColor: '#f007', color: '#fff', fontSize: '2em', fontWeight: 'bold',
	position: 'fixed', left: 0, top: 0, zIndex: 9,
	display: 'grid', justifyContent: 'center', alignContent: 'center',
}).prependTo('body').text('正在读取数据，请稍后……')




$(window).on('beforeunload', (e) => {
	e.preventDefault()
	let user = {
		username: userPanel.username,
		password: userPanel.password,
		projects
	}

	idb.setItem('user', user)
	localStorage.setItem('version', version)
})
$(window).on('load', async (e) => {
	// 版本更新时，下载读取数据
	if (localStorage.getItem('version') != version) {
		await idb.clear()
		log('重新读取')
	}
	$('#version').text(version)


	let user = await idb.getItem('user')
	if (user) {
		let { username, password } = user
		if (username) { userPanel.$username.val(username); }
		if (password) { userPanel.$password.val(password); }
		if (user.projects instanceof Map) projects = user.projects
		projects.forEach(row => {
			setTimeout(() => {
				doProject(row)
			})
		})
		if (username && password) {
			setTimeout(() => {
				userPanel.login()
			})
		} else {
			setTimeout(() => {
				userPanel.show()
				$mask.hide()
			})
		}
	} else {
		projects = new Map()
		userPanel.show()
		$mask.hide()
	}
})

$(window).on('keydown', (e) => {
	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = e

	// console.warn(keyCode)
	// CTRL+W
	if (keyCode === 87 && ctrlKey) {
		e.preventDefault()
		e.return = false
		return false
	}

	// 打开搜索替换窗口
	// CTRL+F(70)
	else if (keyCode === 70 && ctrlKey && !shiftKey && !altKey && !repeat) {
		// log('CTRL+F')
		// searchWindow = wopen({ name: 'searchWindow', location:0})
		e.preventDefault()
		let b = $('.workSearch').is('.hide')
		if (b) {
			$('.workSearch').removeClass('hide')
			$('#workTargetSearch').focus()
		} else {
			$('.workSearch').addClass('hide')
		}
	}

	// 打开替换窗口
	// CTRL+SHIFT+F
	else if (keyCode === 70 && ctrlKey && shiftKey && !altKey && !repeat) {
		let e = $('.workSearch')
		if (e.is('.hide')) {
			e.removeClass('hide')
			$('#workSourceSearch').focus()
		} else {
			$('#works').find('.workrow').filter('.hide').each((i, e) => {
				let $e = $(e)
				$e.removeClass('hide')
			})
			e.addClass('hide')
		}
	}

	// F10
	else if (keyCode === 121 && !ctrlKey && !shiftKey && !altKey && !repeat) {
		$('#workSourceSearch').val($('#source').val()).trigger({ keyCode: 13 })
	}


	// 开启或关闭网络参考
	// PAUSE
	else if (keyCode === 19 && !ctrlKey && !shiftKey && !altKey && !repeat) {
		let $e = $('#isUseNetReference')
		// 按下的瞬间是旧的选择状态
		let b = $e.prop('checked')
		if (b) {
			gSearch.close()
		}
		$e.prop('checked', !b)
	}

	// CTRL+P
	else if (keyCode === 80 && ctrlKey && !shiftKey && !altKey && !repeat) {
		gSearch.papago.postMessage({ type: 'getTextRequest', outSelector: '#txtTarget', inSelector: '#target' })

	}


	// ALT+UP
	else if (keyCode === 38 && !ctrlKey && !shiftKey && altKey) {
		saveCacheText()

		if (currents.$workrow && currents.$workrow.length) {
			currents.$workrow = currents.$workrow.prevAll().not('.hide').first()
		} else {
			currents.$workrow = $('#works .workrow').not('.hide').first()
		}
		currents.$workrow.trigger({ type: 'mouseup' })
		let e = currents.$workrow.get(0)
		if (e) e.scrollIntoView({ block: 'center' })

		showRecords('#records')
	}

	// ALT+DOWN
	else if (keyCode === 40 && !ctrlKey && !shiftKey && altKey) {
		saveCacheText()

		if (currents.$workrow && currents.$workrow.length) {
			currents.$workrow = currents.$workrow.nextAll().not('.hide').first()
		} else {
			currents.$workrow = $('#works .workrow').not('.hide').first()
		}
		currents.$workrow.trigger({ type: 'mouseup' })
		let e = currents.$workrow.get(0)
		if (e) e.scrollIntoView({ block: 'center' })

		showRecords('#records')
	}


	// CTRL+L    show records to #tips
	else if (keyCode === 76 && ctrlKey && !shiftKey && !altKey && !repeat) {
		e.preventDefault()

		showRecords('#tips')
	}

	// CTRL+B
	else if (keyCode === 66 && ctrlKey && !shiftKey && !altKey && !repeat) {
		e.preventDefault()
		if (currents.$workrow && currents.$workrow.length) {
			let b = !bulkWindow || bulkWindow.closed
			if (b) {
				bulkWindow = wopen('3000.bulk.html', { name: '3000bulk', width: screen.width / 2, height: screen.height / 2 })
				setTimeout(init, 1000)
			} else {
				init()
			}
			bulkWindow.onmessage = ({ data }) => {
				if (Array.isArray(data)) {
					data.forEach(row => {
						let { sourceId, source, target, type } = row
						if (type === 'addDict') {
							if (source !== target) {
								sock.s.emit('project', JSON.stringify({ type, source, target }), (...args) => log(...args, source, target))
							}
						}
						else if (type === 'addTarget') {
							if (source !== target) {
								sock.s.emit('project', JSON.stringify({ type, sourceId, target }), (...args) => log(...args, sourceId, target))
							}
						}
					})
				}
			}

			function init() {
				let o = {}
				o.source = $('#source').val().replace(/\r|\n/g, '\\n')
				o.target = $('#target').val().replace(/\r|\n/g, '\\n')
				o.sources = Array.from(sources).map(e => ({ id: e[0], source: e[1] }))
				o.dict = Object.entries(dict).map(e => ({ source: e[0], target: e[1] }))

				log('postMessage', o)
				bulkWindow.postMessage(o)
			}
		}
	}

	// F2
	else if (keyCode === 113 && !ctrlKey && !shiftKey && !altKey && !repeat) {
		e.preventDefault()
		let $target = $('.workrow .target').filter(':empty').eq(0)
		if ($target.length) {
			$target.trigger({ type: 'mouseup' })
			$target.get(0).scrollIntoView({ block: 'center' })
		}
	}

	// CTRL+S   切换sort功能界面
	else if (keyCode === 83 && ctrlKey && !shiftKey && !altKey && !repeat) {
		e.preventDefault()
		$('.workSort')[$('.workSort').is('.hide') ? 'removeClass' : 'addClass']('hide')

		// workSourceSortByLength
	}

	// log(keyCode)
})


function v(k, v) {
	let o = document.getElementById(k)
	if (o === null) return;
	let n = o.tagName
	let t
	if (n === 'INPUT') {
		t = o.type
		if (t === 'checkbox' && t === 'radio') {
			if (v !== undefined) return o.checked = v
			else return o.checked
		} else {
			if (v !== undefined) return o.value = v
			else return o.value
		}
	} else if (n === 'TEXTAREA') {
		if (v !== undefined) return o.value = v
		else return o.value
	} else if (o.isConnected) {
		o = o.querySelector(`[name=${k}]`)
		n = o.tagName
		if (n === 'INPUT') {
			t = o.type
			if (t === 'checkbox' && t === 'radio') {
				if (v !== undefined) return o.checked = v
				else return o.checked
			} else {
				if (v !== undefined) return o.value = v
				else return o.value
			}
		} else if (n === 'TEXTAREA') {
			if (v !== undefined) return o.value = v
			else return o.value
		}
	}
	return o
}

function lastProjects() {
	let ret = new Map()
	projects.forEach(row => {
		let { id, username, btime, data } = row;
		let { type, source, target, sourceId, dict } = data
		if (type === 'addSource') {

		}
		ret.set()

	})
}



let sock




class Sock {
	constructor() {

	}

	login(username, password) {
		this.username = username
		this.password = password

		let { protocol, hostname } = location
		let url = `${protocol}//${hostname}`

		let s = this.s = new io(url, {
			path: '/sio3000',
			reconnection: false,
			transports: ['websocket'],
			forceNew: true,
		})

		s.on('connect', (e) => {
			s.emit('login', username, password, (user) => {
				if (user) {
					this.user = s.user = user
					s.emit('synchronize', 'project', getProjectsMaxId(), (b, name) => {
						$mask.hide()
					})

					userPanel.$loginStatus.text('登录成功')
					log('登录成功')
					userPanel.hide()
					mainPanel.show()
					$mask.show()

					calcSourceChars()
				} else {
					userPanel.$loginStatus.text('登录失败')
					log('登录失败')
					mainPanel.hide()
					userPanel.show()
				}
			})
		})

		/* 
		重新连接时，需要同步。
		*/
		s.on('reconnection', (e) => {
			log('re', e)
			s.emit('synchronize', 'project', getProjectsMaxId())
		})

		/* 
		断开连接时，UI变化。
		*/
		s.on('disconnect', (...args) => {
			userPanel.$loginStatus.text('断开连接')
			log('off', ...args)
			userPanel.show()
			mainPanel.hide()
			$mask.hide()
		})


		/* 
		同步project
		*/
		s.on('project', (row) => {
			// log('-project sync-', row)
			// save project row
			// 本地记录project，以便下一次页面刷新时读取进度。
			doProject(row)
			projects.set(row.id, row)

			clearTimeout(calcTimeout)
			calcTimeout = setTimeout(calcSourceChars, 1000)
			// idb.setItem(String(row.id), row)
		})

		s.on('synchronize', (type) => {
			if (type === 'project') {
				s.emit('synchronize', type, getProjectsMaxId(), (b) => {
					log('synchronize', type, b)
					$mask.hide()
				})
			}
		})
	}

	synchronize(name, lastId = 0, callback) {
		log(name, '同步开始')
		this.s.emit('synchronize', name, lastId, function (b) {
			b = b ? '成功' : '失败'
			log(name, '同步' + b)
			if (typeof callback === 'function') callback(b, name)
		})
	}
}


function calcSourceChars() {
	let sourceChar = 0, hasTarget = false, totalSourceChar = 0, hasTargetSourceChar = 0
	$('.workrow').each((i, e) => {
		let $source = $(e).find('.source')
		let $target = $(e).find('.target')

		sourceChar = $source.text().trim().length
		hasTarget = Boolean($target.text().trim().length)

		if (hasTarget) hasTargetSourceChar += sourceChar
		totalSourceChar += sourceChar
	})

	$('#hasTargetSourceChar').text(hasTargetSourceChar)
	$('#totalSourceChar').text(totalSourceChar)
}

function doProject(row) {

	if (typeof row.data === 'string') {
		row.data = JSON.parse(row.data)

		let msg = ''
		if (row.data.type === 'addSource') {
			msg = '加入了原文'
		} else if (row.data.type === 'addTarget') {
			msg = '提交了译文'
		} else if (row.data.type === 'addDict') {
			msg = '提交了词库'
		} else {
			msg = row.data.type
		}
		sysmsg.text(row.username + msg).show()
		setTimeout(() => {
			sysmsg.hide()
		}, 2000);
	}

	let { id, username, btime, data } = row
	let { type, source, sourceId, target } = data
	sourceId = Number(sourceId)

	// 添加source  {type:'addSource', source:'text' }
	// 添加target  {type:'addTarget', target:'text', sourceId:10 }
	// 添加dict    {type:'addDict', source:'text', target:'text' }
	if (type === 'addSource') {
		projectAddSource(row)
	} else if (type === 'addTarget') {


		let $source = $(`#works .source[id=${sourceId}]`)
		let $target = $source.next('.target').text(target)

		$target.attr({ btime, username })

		source = $source.text()
		target = target || $target.text()

		dicts.unshift({ source, target, username, btime })
		dict[source] = target

		// 如果当前编辑中的格子被其他人编辑，则高亮显示。
		if (currents.$workrow && (currents.$workrow.find('.source').attr('id') == sourceId) && row.username !== sock.user.username) {
			$('#target').addClass('warn')
			setTimeout(() => {
				$('#target').removeClass('warn')
			}, 2000);
		}

	} else if (type === 'addDict') {
		if (source && target) {
			dicts.push({ source, target, username, btime })
			dict[source] = target
			log(type, source, target)
		}
	}

	// show mask message
	$mask.text('正在同步记录 #' + row.id)
}

function readProject() {
	idb.iterate((row, id) => {
		projects.set(id, row)
	}, () => {
		log('本地读取完毕')
	})
}

function projectAddSource(row) {
	let { id, btime, data } = row
	$('<div>').addClass('workrow').attr({ btime })
		.append($('<div>').attr({ id, class: 'source', lang: 'ko' }).text(data.source))
		.append($('<div>').attr({ class: 'target', lang: 'zh-CN' }))
		.appendTo('#works')

	$('<div>').appendTo('#minimap').addClass('minirow').text(id)
	sources.set(id, data.source)
}

function getProjectsMaxId() {
	let id = 0;
	projects.forEach(row => {
		id = Math.max(id, row.id)
	});
	return id
}


// 隐藏workrow行
$('#works').on('contextmenu', (e) => {
	e.preventDefault()
	let { originalEvent } = e
	let { which, button } = originalEvent

	if (button === 2 && which === 3) {
		let $target = $(e.target)
		log(e.target)

		if ($target.is('.workrow')) {
			e.stopImmediatePropagation()
			e.stopPropagation()
			return $target.addClass('hide')
		}

		$target = $target.parent('.workrow')
		if ($target.length) {
			e.stopImmediatePropagation()
			e.stopPropagation()
			return $target.addClass('hide')
		}
	}
})



// // ui
$('#works').on('mouseup', '.workrow', (e) => {

	// 有选取文字，则保存到剪贴板中
	if (window.getSelection().toString()) document.execCommand('copy')

	let $workrow = currents.$workrow = $(e.currentTarget)
	let sourceText = $workrow.find('.source').text()
	let targetText = $workrow.find('.target').text()


	$('#source').val(sourceText)
	$('#target').val(targetText).attr({ _currentId: $workrow.find('.source').id })

	doActive()
	showRecords('#records')
	$('#target').focus()

	// 网络参考
	if ($('#isUseNetReference').prop('checked')) { gSearch(sourceText, 'zh-CN') }
})

$('#target').on('keydown', (e) => {
	let v = $('#target').val().replace(/\n/g, ' ')
	if (e.keyCode == 13) {
		e.preventDefault()

		if (v) {
			if (!isHaveDict()) {
				let $source = currents.$workrow.find('.source')
				let sourceId = Number($source.attr('id'))
				let data = { type: 'addTarget', target: v, sourceId }

				let sourceText = $source.text()
				let oldTargetText = dict[sourceText]
				dict[sourceText] = v

				data = JSON.stringify(data)
				sock.s.emit('project', data, (b) => {
					let _target = currents.$workrow.find('.target').get(0)
					if (_target) {
						let status = b ? 'done' : 'error'
						let cl = _target.classList
						cl.add('status')
						setTimeout(() => {
							cl.remove(status)
							cl.remove('warn')
						}, 1000)
					}

					doNext()
					doActive()
					showRecords('#records')
					if (b) {
						sock.synchronize('project', getProjectsMaxId())
					} else {
						if (oldTargetText) dict[sourceText] = oldTargetText
						else delete dict[sourceText]
						alert('您没有权限！')
					}
				})
			} else {
				currents.$workrow.find('.target').text($('#target').val())
				doNext()
				doActive()
				showRecords('#records')
			}
		}
	}

})
$('#target').on('keydown', (e) => {
	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = originalEvent

	if (ctrlKey && !shiftKey && !altKey) {
		if (keyCode !== 38 && keyCode !== 40) return;
		// log(e.keyCode)// 38:up, 40:down
		e.preventDefault()

		if (typeof currents.tipIndex !== 'number') currents.tipIndex = -1

		// 10个可选项目, 索引可以是 -10 ~ 9
		// CTRL+UP
		if (keyCode === 38) {
			currents.tipIndex = (currents.tipIndex - 1) % $('#tips .target').length
		}
		// CTRL+DOWN
		else if (keyCode === 40) {
			currents.tipIndex = (currents.tipIndex + 1) % $('#tips .target').length
			console.log('现在添加', keyCode)
		}

		// log('keydown - tipIndex', currents.tipIndex)

		let tip = currents.$tip = $('#tips').find('.target').eq(currents.tipIndex)

		$('#tips .active').removeClass('active')
		tip.addClass('active')
		tip.get(0).scrollIntoView({ block: 'center' })
	}
})




$('#target').on('keyup', (e) => {

	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = originalEvent


	// CTRL
	if (keyCode === 17) {
		let tip = $('#tips .target.active')
		if (tip.length) {
			let target = tip.text()

			let t = $('#target').get(0)

			let { selectionStart: start } = t
			let end = start + target.length

			let left = t.value.slice(0, t.selectionStart)
			let right = t.value.slice(t.selectionEnd)
			t.value = left + target + right

			t.setSelectionRange(start, end)

			// 初始化激活和索引
			$('#tips .active').removeClass('active')
			currents.tipIndex = -1
		}
	}

	// CTRL+INSERT
	else if (keyCode === 45 && ctrlKey && !shiftKey && !altKey) {

		let target = $('#source').val()
		let t = $('#target').get(0)
		let { selectionStart: start } = t
		let end = start + target.length

		let left = t.value.slice(0, t.selectionStart)
		let right = t.value.slice(t.selectionEnd)
		t.value = left + target + right

		t.setSelectionRange(start, end)
	}
})
$('#target').on('keydown', (e) => {
	if (e.keyCode === 9) {
		e.preventDefault()
		$('#source').focus().get(0).setSelectionRange(0, 0)
	}
})

$('#target').on('keyup', function insertTips(e) {
	let { originalEvent } = e
	let { type, keyCode, ctrlKey, shiftKey, altKey, repeat } = originalEvent

	// F9
	if (keyCode === 120 && !ctrlKey && !shiftKey && !altKey && !repeat) {
		e.preventDefault()

		// 插入找到的内容
		let $source = $('#source')
		let $target = $('#target')
		let r = matchs($source.val())
		if (r) setTargetText(r)
	}


})
$('#target').on('blur', saveCacheText)
function saveCacheText() {
	if (currents.$workrow && currents.$workrow.length) {
		let $target = currents.$workrow.find('.target')
		let oldVale = $target.text()
		let newValue = $('#target').val()

		if (oldVale !== newValue) {
			$target.text(newValue).addClass('warn')
		}
	}
}

function isHaveDict() {
	return dict[$('#source').val()] === $('#target').val()
}

function doNext() {
	if (!currents.$workrow) return false;
	let next = currents.$workrow.nextAll().not('.hide').eq(0)
	if (next.length) {
		currents.$workrow = next
		currents.$workrow.trigger({ type: 'mouseup' })
		let e = currents.$workrow.get(0)
		if (e) e.scrollIntoView({ block: 'center' })
		return true
	}
	return false
}

function doActive() {
	$('#works').find('.active').removeClass('active')
	currents.$workrow.addClass('active')

	let source = currents.$workrow.find('.source').text()

	$('#tips').empty()

	let tips = similar(source)
	tips.forEach(e => {
		let { source, target, percent } = e
		$('<div class="source" lang="ko"></div>').text(source).appendTo('#tips')
		$('<div class="percent"></div>').text(percent).appendTo('#tips')
		$('<div class="target" lang="zh-CN"></div>').text(target).appendTo('#tips')
	})
}

function showRecords(parentSelector) {
	$(parentSelector).empty()
	let a = getRecords()
	a.forEach(e => {
		$('<div>').addClass('source').text(new Date(Number(e.btime)).toLocaleString()).appendTo(parentSelector)
		$('<div>').addClass('percent').text(e.username).appendTo(parentSelector)
		$('<div>').addClass('target').text(e.target).appendTo(parentSelector)
	})
}


// function dmpSource(source) {
// 	let dmp = new diff_match_patch()

// 	dict.forEach(e=>{
// 		log(e)

// 		dmp.match_main()
// 	})
// }


// return {source, target, percent}
function similar(str, p = 40) {
	let ret = []
	for (let source in dict) {
		let target = dict[source]
		let percent = Math.round(similarText(str, source, true))
		if (percent >= p) ret.push({ source, target, percent })
	}
	return ret.sort((a, b) => {
		let ap = a.percent
		let bp = b.percent
		if (ap > bp) {
			return -1
		} else if (ap < bp) {
			return 1
		} else {
			return 0
		}
	});
}

function indexOfSource(str) {
	let regExp = /\s+/gu
	str = str.replace(regExp, '')
	let ret = []
	for (let source in dict) {
		let target = dict[source]
		let index = source.replace(regExp, '').indexOf(str)
		if (index > -1) ret.push({ source, target })
	}
	// {source, target}
	return ret.sort((a, b) => {
		let al = a.source.length
		let bl = b.source.length
		if (al > bl) {
			return 1
		} else if (al < bl) {
			return -1
		} else {
			return 0
		}
	});
}







userPanel.$password.on('keyup', (e) => {
	if (e.keyCode === 13) {
		userPanel.login()
	}
})

userPanel.$username.on('keyup', (e) => {
	if (e.keyCode === 13) {
		userPanel.$password.focus()
	}
})


function getRecords() {
	let a = []
	if (currents.$workrow && currents.$workrow.length) {
		let $_source = currents.$workrow.find('.source')
		let st = $_source.text()
		let sid = Number($_source.attr('id'))
		projects.forEach(e => {
			let { username, btime, data: { type, target, source, sourceId } } = e

			if (type === 'addTarget') {
				if (sourceId == sid) {
					a.push({ username, btime, target })
				}
			}
			else if (type == 'addDict') {
				if (source == st) {
					a.push({ username, btime, target })
				}
			}
		})
	}
	return a
}


function showSearchPanel() {
	$('.searchPanel').removeClass('hide')
}


// 添加souce
function initSources() {
	$.get('3000.unique.txt').then(t => {
		let a = t.split('\n').filter(e => e.trim())
		// log(a)
		let i = 0, len = a.length

		function next() {
			log(i, len)
			if (i >= len) return;
			let source = a[i]
			if (source) {
				addSource(source, next)
			}
			i++
		}
		next()
	})
}

function addSource(source, ack) {
	sock.s.emit('project', JSON.stringify({ type: 'addSource', source }), ack)
}
function addDict(source, target) {
	sock.s.emit('project', JSON.stringify({ type: 'addDict', source, target }))
}


function initDicts() {
	$.get('3000.dict.txt').then(t => {
		let a = t.split('\n').map(e => e.split('\t')).filter(e => e && e.length)
		a.forEach(row => {
			let [source, target] = row
			addDict(source, target)
		})
	})
}




function downloadFile(filename, content) {
	var a = document.createElement('a');
	var blob = new Blob([content]);
	var url = window.URL.createObjectURL(blob);
	// filename = filename + formatName(location.search) + '_' + Date.now() + '.txt';
	a.href = url;
	a.download = filename;
	a.click();
	window.URL.revokeObjectURL(url);
}

function saveProjects() {
	let data = JSON.stringify(Array.from(projects).map(e => e[1]))
	if (data) downloadFile('projects.json', data)
	else log('no data')
}



$('#workSourceSearch').on('keydown', (e) => {
	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = e

	if (keyCode === 13) {
		e.preventDefault()

		let $a = $('<a></a>')
		let v = e.target.value
		if (v.length === 0) return log('搜索为空');

		v = $a.text(v).html()

		let $workrows
		if (!ctrlKey && !shiftKey && !altKey && !repeat) {
			// ENTER
			$workrows = $('#works').find('.workrow').removeClass('hide')
		} else if (!ctrlKey && shiftKey && !altKey && !repeat) {
			// SHIFT+ENTER
			$workrows = $('#works').find('.workrow').filter('.hide')
		} else if (!ctrlKey && !shiftKey && altKey && !repeat) {
			// ALT+ENTER
			$workrows = $('#works').find('.workrow').not('.hide')
		}

		$workrows.each((i, e) => {
			let $workrow = $(e)
			let $item = $workrow.find('.source')
			let item = $a.text($item.text()).html()

			let re = new RegExp(v.split('').map(e => {
				let code = e.charCodeAt(0)
				if (0 <= code && code <= 255 && !/[\w\s]/.test(e)) {
					return '\\' + e
				} else {
					return e
				}
			}, 'giu').join('\\s*'), 'giu')

			let has = re.test(item)
			if (!ctrlKey && !shiftKey && !altKey && !repeat) {
				if (has) $item.html(item.replace(re, '<i>$&</i>'))
				else $workrow.addClass('hide')
			} else if (!ctrlKey && shiftKey && !altKey && !repeat) {
				if (has) {
					$item.html(item.replace(re, '<i>$&</i>'))
					$.$workrow.removeClass('hide')
				}
			} else if (!ctrlKey && !shiftKey && altKey && !repeat) {
				if (has) {
					$.$workrow.addClass('hide')
				}
			}
		})


	} else if (keyCode === 27 && !repeat && !ctrlKey && !shiftKey && !altKey) {
		// ESC(18)
		$('#workSourceSearch, #workTargetSearch, #workTargetReplace').val('')
		e.preventDefault()

		$('#works .workrow').each((i, e) => {
			$(e).removeClass('hide')
			$(e).find('.source').each((i, e) => $(e).text($(e).text()))// 字符串化
			$(e).find('.target').each((i, e) => $(e).text($(e).text()))// 字符串化
		})
		$('.workrow.active').trigger({ type: 'mouseup' })

		$('#workSourceSearch').val('')
		$('.workSearch').addClass('hide')

	}
})

// 基于上面代码进行适当调整 $('#workSourceSearch').on('keydown', (e)=>{
$('#workTargetSearch').on('keydown', (e) => {
	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = e
	if (keyCode === 13) {
		let $a = $('<a></a>')
		let v = e.target.value
		if (v.length === 0) return log('搜索为空');

		e.preventDefault()

		v = $a.text(v).html()

		let $workrows
		$workrows = $('#works').find('.workrow').not('.hide')// 不同

		$workrows.each((i, e) => {
			let $workrow = $(e)
			let $item = $workrow.find('.target')// 不同
			let item = $a.text($item.text()).html()

			let re = new RegExp(v.split('').map(e => {
				let code = e.charCodeAt(0)
				if (0 <= code && code <= 255 && !/[\w\s]/.test(e)) {
					return '\\' + e
				} else {
					return e
				}
			}).join('\\s*'), 'giu')

			$workrow.removeClass('hide')
			if (re.test(item)) {
				$item.html(item.replace(re, '<i>$&</i>'))
			} else {
				$workrow.addClass('hide')
			}
		})

		$('#workTargetSearch').focus()
	} else if (keyCode === 27 && !repeat && !ctrlKey && !shiftKey && !altKey) {
		// ESC(18)
		$('#workSourceSearch, #workTargetSearch, #workTargetReplace').val('')
		e.preventDefault()

		$('#works .workrow').each((i, e) => {
			$(e).removeClass('hide')
			$(e).find('.source').each((i, e) => $(e).text($(e).text()))// 字符串化
			$(e).find('.target').each((i, e) => $(e).text($(e).text()))// 字符串化
		})
		$('.workrow.active').trigger({ type: 'mouseup' })

		$('#workTargetSearch').val('')
		$('.workSearch').addClass('hide')
	}
})

// workTargetReplace
$('#workTargetReplace').on('keydown', (e) => {
	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = e
	if (keyCode === 13) {
		let $a = $('<a></a>')
		let v = e.target.value
		// if (v.length === 0) return log('搜索为空');

		e.preventDefault()
		let $workrows
		$workrows = $('#works').find('.workrow').not('.hide')

		log($workrows.length)

		if (ctrlKey) {
			$workrows.each((i, e) => {
				let $workrow = $(e)
				let $item = $workrow.find('.target')
				if ($item.has('i')) {
					$item.text($item.text())

					let $source = $workrow.find('.source')
					let sourceId = Number($source.attr('id'))
					let target = $item.text()
					// if (target.length === 0) return log('addTarget为空', sourceId);
					let type = 'addTarget'
					// log(({ type, target, sourceId }));

					sock.s.emit('project', JSON.stringify({ type, target, sourceId }), function (b, ...a) {
						let status = b ? 'done' : 'error'
						$workrow.addClass(status)
						setTimeout(() => {
							$workrow.removeClass(status)
						}, 1000);

						log('批量替换', b)
					})
				}
			})
		} else {
			$workrows.each((i, e) => {
				let $workrow = $(e)
				let $item = $workrow.find('.target')

				if ($item.has('i')) {
					$item.find('i').text(v)
				}
			})
		}

		$('#workTargetReplace').focus()

	} else if (keyCode === 27 && !repeat && !ctrlKey && !shiftKey && !altKey) {
		// ESC(18)
		$('#workSourceSearch, #workTargetSearch, #workTargetReplace').val('')
		e.preventDefault()

		$('#works .workrow').each((i, e) => {
			$(e).removeClass('hide')
			$(e).find('.source').each((i, e) => $(e).text($(e).text()))// 字符串化
			$(e).find('.target').each((i, e) => $(e).text($(e).text()))// 字符串化
		})
		$('.workrow.active').trigger({ type: 'mouseup' })

		$('#workTargetReplace').val('')
		$('.workSearch').addClass('hide')
	}
})





$('#source').on('mouseup', (e) => {
	let { originalEvent } = e
	let { type, keyCode, ctrlKey, shiftKey, altKey, repeat } = originalEvent
	let str = window.getSelection().toString().replace(/\s+/g, '').trim()

	if (str.length) {
		document.execCommand('copy')
		$('#tips').empty()

		let tips = indexOfSource(str)
		tips.concat(similar(str))
		tips.forEach(e => {
			let { source, target, percent } = e
			source = highlight(source, str)
			$('<div class="source" lang="ko"></div>').html(source).appendTo('#tips')
			$('<div class="percent"></div>').text(percent || NaN).appendTo('#tips')
			$('<div class="target" lang="zh-CN"></div>').text(target).appendTo('#tips')
		})
		$('#target').focus()

		// 网络参考
		if (ctrlKey) {
			if ($('#isUseNetReference').prop('checked')) { gSearch(str, 'zh-CN') }
		}
	}
})
$('#source').on('keyup', (e) => {
	let { originalEvent } = e
	let { type, keyCode, ctrlKey, shiftKey, altKey, repeat } = originalEvent
	let str = window.getSelection().toString().replace(/\s+/g, '').trim()

	// SHIFT+LEFT    SHIFT+UP    SHIFT+RIGHT    SHIFT+DOWN
	if (str.length && (shiftKey && (keyCode == 37 || keyCode === 38 || keyCode === 39 || keyCode === 40))) {
		document.execCommand('copy')
		$('#tips').empty()

		let tips = similar(str)
		tips.forEach(e => {
			let { source, target, percent } = e
			$('<div class="source" lang="ko"></div>').text(source).appendTo('#tips')
			$('<div class="percent"></div>').text(percent).appendTo('#tips')
			$('<div class="target" lang="zh-CN"></div>').text(target).appendTo('#tips')
		})
	}

	// SHIFT
	if (str.length && (keyCode === 16 && !ctrlKey && !altKey && !repeat)) {
		$('#target').focus()
	}

})








function matchs(str) {
	let regExp, r
	let rs = [
		/\/\w+/,
		/(?:\p{Open_Punctuation})[0-9a-zA-Z]{6,}(?:\p{Close_Punctuation})/,
		/\[-\]/,
		/\{\d\}/,
		/(?:[\-\+] *)?(?:,?\d{1,3})*(?:\.?\d+)(?:(?:e)\d+)?(?: *%)?/,
		/\p{Number}+/,
		/\p{Punctuation}/,
		/\p{Emoji}+/,
		/[\\x00-\\x19\\x21-\\xff＃＆＊＠§※★☆○●◎◇◆□■△▲▽▼◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑®※≪≫▶◀]/,
	]
	regExp = new RegExp(rs.map((e) => e.source).join('|'), 'giu')

	r = str.match(regExp)
	if (r) {
		r = r.filter(e => e !== '.')
		r = r.join('').replace('：', ':');
	}
	// log(regExp, r);
	return r
}


function setTargetText(target) {
	target = target
	let t = $('#target').get(0)
	let { selectionStart: start, selectionEnd } = t
	let end = start + target.length

	let left = t.value.slice(0, start)
	let right = t.value.slice(selectionEnd)
	t.value = left + target + right

	t.setSelectionRange(start, end)
}



$('#workSourceSortByLength').click(() => sortByLength('source'))
$('#workTargetSortByLength').click(() => sortByLength('target'))
$('#workSourceSortByOld').click(() => sortByOld())
function sortByLength(name) {
	let i = sortByLength.i = -sortByLength.i

	$('.workrow').sort((a, b) => {
		let al = $(a).find('.' + name).text().length
		let bl = $(b).find('.' + name).text().length
		return al > bl ? i : (al < bl ? -i : 0)
	}).detach().appendTo('#works')
}
sortByLength.i = -1

function sortByOld() {
	$('.workrow').sort((a, b) => {
		let al = Number($(a).find('.source').attr('id'))
		let bl = Number($(b).find('.source').attr('id'))
		return al > bl ? 1 : (al < bl ? -1 : 0)
	}).detach().appendTo('#works')
}

function highlight(source, word) {
	let $a = $('<a></a>')
	let item = $a.text(source).html()
	if (!word) return item

	let v = $a.text(word).html()

	let re = new RegExp(v.split('').map(e => {
		let code = e.charCodeAt(0)
		if (0 <= code && code <= 255 && !/[\w\s]/.test(e)) {
			return '\\' + e
		} else {
			return e
		}
	}).join('\\s*'), 'giu')
	if (re.test(item)) {
		return item.replace(re, '<i>$&</i>')
	}
	return item
}


$('#isUseNetReference').on('click', (e) => {
	if (e.currentTarget.checked) {
		gSearch.close()
	}
})




// // dict 词库编辑器
// onmessage = ({ data }) => {
// 	if (data) {
// 		let { type, source, target } = data
// 		if (type === 'addDict' && source && target) {
// 			addDict(source, target)
// 		}
// 	}
// }



// 全部显示
$('#workrowShowAllButton').on('click', (e) => {


	e.preventDefault()
	$('#works .workrow').each((i, e) => {
		$(e).removeClass('hide')
		$(e).find('.source').each((i, e) => clearChildren(e))// 字符串化
		$(e).find('.target').each((i, e) => clearChildren(e))// 字符串化

		function clearChildren(e) {
			if (!e.children.length) {
				$(e).text($(e).text())
			}
		}
	})

	$('.workrow.active').trigger({ type: 'mouseup' })

	$('.workSearch').addClass('hide')
	$('#workSourceSearch, #workTargetSearch, #workTargetReplace').val('').prop('disabled', false)
})



function downloadAll() {
	downloadFile('source.cf.txt', Array.from(sources).map(e => e[1]).join('\n'))
	downloadFile('dict.cf.txt', Object.entries(dict).map(e => e[0] + '\t' + e[1]).join('\n'))
}

function fill(dicts) {
	let ret = []
	$('#works .workrow').each((i, e) => {
		let $s = $(e).find('.source')
		let $t = $(e).find('.target')
		let s = $s.text()
		let t = $t.text()

		dicts.forEach(e => {
			let { source, target } = e
			if (s === source && t !== target) {
				let sourceId = Number($s.attr('id'))
				let o = { type: 'addTarget', target, sourceId }
				ret.push(o)
				// sock.s.emit('project', JSON.stringify(o), log)
			}
		})
	})
	return ret
}
function addTarget(sourceId, target, callback) {
	return new Promise((resolve, reject) => {
		let type = 'addTarget'
		let data = { type, sourceId, target }
		sock.s.emit('project', JSON.stringify(data), (...args) => {
			if (typeof callback !== 'function') callback(...args)
			resolve(...args)
		})
	})
}


$('#downloadTM4Dict').on('click', (e) => {
	downloadFile('dict.cf.txt', Object.entries(dict).map(e => e[0] + '\t' + e[1]).join('\n'))
})
$('#downloadWorks').on('click', (e) => {
	downloadFile('works.cf.txt', $('#works .workrow').toArray().map((e) => $(e).find('.source').text() + '\t' + $(e).find('.target').text()).join('\n'))
})


$('#clearIDB').click(() => {
	idb.clear(() => {
		alert('캐시 삭제 완료.')
	})
})




$('#show').click(() => {
	$('<svg>').appendTo('body')

	idb.getItem('user').then((o) => {
		o.projects.forEach((row) => {
			let { id, username, btime, data: { type, source, target } } = row
			
		})
	})


})