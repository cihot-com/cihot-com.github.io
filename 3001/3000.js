let { log, warn, info, time, timeEnd, group, groupEnd } = console
let sock3000 = {}
let currents = {}
let projects = new Map()
let messages = new Map()
let sources = new Map()
let dicts = []
let dict = {}
let idbProjects = localforage.createInstance({name:'3000', storeName:'projects'})
let idb = localforage.createInstance({ name: '3000' })
let searchWindow
let sock
let userPanel, mainPanel
let $mask = $('<div>').css({
	width: '100%', height: '100%', margin: 0, padding: 0,
	backgroundColor: '#f00d', color: '#fff', fontSize: '2em', fontWeight: 'bold',
	position: 'fixed', left: 0, top: 0, zIndex: 9,
	display: 'grid', justifyContent: 'center', alignContent: 'center',
}).prependTo('body')




$(window).on('load', async (e) => {
	initPanels()

	let i = 0
	let len = await idbProjects.length()

	$mask.text('正在读取本地数据……')
	idbProjects.iterate((row)=>{
		if(row && row.id) {
			projects.set(row.id, row)
			$mask.text(`本地记录${projects.size}`)
		}
	}, (err, ret)=>{
		let {size} = projects

		$mask.text(`已完成，共${size}个本地数据记录。`)

		for(let i=0; i<size; i++) {
			let row = projects.get(i)
			if(row && row.id) {
				runProject(row)
			}
		}

		idb.getItem('user').then((user)=>{
			if(user) {
				let { username, password } = user
				if (username) { userPanel.$username.val(username); }
				if (password) { userPanel.$password.val(password); }
				if (username && password) {
					userPanel.login();
				}
			}
		})
		$mask.hide()
	})
})
$(window).on('beforeunload', (e) => {
	e.preventDefault()
	let username = userPanel.$username.val()
	let password = userPanel.$password.val()

	idb.setItem('user', {username, password})
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


function initPanels(){
	userPanel = {
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
	
	mainPanel = {
		$: $('#mainPanel'),
		show() { this.$.removeClass('hide') },
		hide() { this.$.addClass('hide') },
	}
}





class Sock {
	constructor() {

	}

	login(username, password) {
		this.username = username
		this.password = password

		let { protocol, hostname } = location
		let url = `${protocol}//${hostname}`

		let s = this.s = new io(url, {
			reconnection: false,
			transports: ['websocket'],
			forceNew: true,
		})

		s.on('connect', (e) => {
			s.emit('login', username, password, (user) => {
				if (user) {
					this.user = s.user = user
					s.emit('synchronize', 'project', projects.size, (b, name) => {
						$mask.hide()
					})

					userPanel.$loginStatus.text('登录成功')
					log('登录成功')
					userPanel.hide()
					mainPanel.show()
					$mask.show()
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
			s.emit('synchronize', 'project', projects.size)
		})

		/* 
		断开连接时，UI变化。
		*/
		s.on('disconnect', (...args) => {
			userPanel.$loginStatus.text('断开连接')
			log('off', ...args)
			userPanel.show()
			mainPanel.hide()
		})


		/* 
		同步project
		*/
		s.on('project', (row) => {
			// log('-project sync-', row)
			// save project row
			// 本地记录project，以便下一次页面刷新时读取进度。
			idbProjects.setItem(String(row.id), row)
			runProject(row)
			// idb.setItem(String(row.id), row)
		})

		s.on('synchronize', (type) => {
			if (type === 'project') {
				s.emit('synchronize', type, projects.size, (b) => {
					log('synchronize', type, b)
					$mask.hide()
				})
			}
		})
	}

	synchronize(name, lastId = 0, callback) {
		log(name, '同步开始')
		this.s.emit('synchronize', name, function (b) {
			b = b ? '成功' : '失败'
			log(name, '同步' + b)
			if (typeof callback === 'function') callback(b, name)
		})
	}
}



function runProject(row) {

	// 如果是直接读取projects变量，则data应该是已经解析过的JSON对象。
	// 如果来自服务器的数据，那么就是字符串了。
	if(typeof row.data==='string') row.data = JSON.parse(row.data)

	let { id, username, btime, data } = row
	let { type, source, sourceId, target } = data
	sourceId = Number(sourceId)

	// 添加source  {type:'addSource', source:'text' }
	// 添加target  {type:'addTarget', target:'text', sourceId:10 }
	// 添加dict    {type:'addDict', source:'text', target:'text' }
	if (type === 'addSource') {
		projectAddSource(row)
	} else if (type === 'addTarget') {

		
		$source = $(`#works .source[id=${sourceId}]`)
		$target = $source.next('.target').text(target)

		$target.attr({ btime, username })

		source = $source.text()
		target = target || $target.text()

		dicts.unshift({ source, target, username, btime })
		dict[source] = target

		// 如果当前编辑中的格子被其他人编辑，则高亮显示。
		if (currents.$workrow && (currents.$workrow.find('.source').attr('id') == sourceId)) {
			$('#target').addClass('warn')
			setTimeout(() => {
				$('#target').removeClass('warn')
			}, 2000);
		}

		// 统计剩余字数
		// let sourceCharCount = 0
		// $('#works .workrow').each((row) => {
		// 	let $row = $(row)
		// 	let $source = $row.find('.source')
		// 	let $target = $row.find('.target')
		// 	// status
		// })

	} else if (type === 'addDict') {
		dicts.push({ source, target, username, btime })
		dict[source] = target
	}

	// 根据服务器的project事件，保存到本地运行时和本地数据库中。
	projects.set(row.id, row)

	requestAnimationFrame(() => {
		$mask.text('同步' + row.id + '个操作记录，请耐心等待……')
	})
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
	$('<div>').addClass('workrow')
		.append($('<div>').attr({ id, btime, class: 'source', lang: 'ko' }).text(data.source))
		.append($('<div>').attr({ class: 'target', lang: 'zh-CN' }))
		.appendTo('#works')

	sources.set(id, data.source)
}














// // ui
$('#works').on('click', '.workrow', (e) => {
	log(e.currentTarget)

	let $workrow = currents.$workrow = $(e.currentTarget)
	let sourceText = $workrow.find('.source').text()
	let targetText = $workrow.find('.target').text()

	$('#source').val(sourceText)
	$('#target').val(targetText).attr({ _currentId: $workrow.find('.source').id })

	doActive()
	$('#target').focus()
})

$('#target').on('keydown', (e) => {
	let v = $('#target').val()
	if (e.keyCode == 13 && v) {
		e.preventDefault()
		let sourceId = currents.$workrow.find('.source').attr('id')
		let data = JSON.stringify({ type: 'addTarget', target: v, sourceId })
		sock.s.emit('project', data, (b) => {
			let _target = currents.$workrow.find('.target').get(0)
			if (_target) {
				let status = b ? 'done' : 'error'
				let cl = _target.classList
				cl.add('status')
				setTimeout(() => {
					cl.remove(status)
				}, 1000)
			}
			if (currents.$workrow.next()) {
				currents.$workrow = currents.$workrow.next()
				currents.$workrow.click()
				let e = currents.$workrow.get(0)
				if (e) e.scrollIntoView(false)
			}
			doActive()
			if (b) sock.synchronize('project', projects.size)
		})
	}

})


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


// function dmpSource(source) {
// 	let dmp = new diff_match_patch()

// 	dict.forEach(e=>{
// 		log(e)

// 		dmp.match_main()
// 	})
// }


// return {source, target, percent}
function similar(str, p = 5) {
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



$('#target').on('keydown', (e) => {
	let { originalEvent } = e
	let { ctrlKey, keyCode, repeat } = originalEvent

	if (ctrlKey) {
		if (keyCode !== 38 && keyCode !== 40) return;
		// log(e.keyCode)// 38:up, 40:down
		e.preventDefault()

		if (typeof currents.tipIndex !== 'number') currents.tipIndex = -1

		// 10个可选项目, 索引可以是 -10 ~ 9
		if (keyCode === 38) currents.tipIndex = (currents.tipIndex - 1) % $('#tips .target').length
		else if (keyCode === 40) currents.tipIndex = (currents.tipIndex + 1) % $('#tips .target').length

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

	if (keyCode === 17) {
		log(originalEvent)
		let tip = $('#tips .target.active')
		if (tip.length) {
			let target = tip.text()

			let t = $('#target').get(0)
			let left = t.value.slice(0, t.selectionStart)
			let right = t.value.slice(t.selectionEnd)
			t.value = left + target + right

			// 初始化激活和索引
			$('#tips .active').removeClass('active')
			currents.tipIndex = -1
		}
	} else if (keyCode === 45 && ctrlKey && !shiftKey && !altKey) {
		let target = $('#source').val()
		let t = $('#target').get(0)
		let left = t.value.slice(0, t.selectionStart)
		let right = t.value.slice(t.selectionEnd)
		t.value = left + target + right
	}
})




$(window).on('keydown', (e) => {
	let { originalEvent } = e
	let { keyCode, ctrlKey, shiftKey, altKey, repeat } = e
	// 打开搜索替换窗口
	{
		// CTRL+F(70)
		// CTRL+H(72)
		if (keyCode === 70 && ctrlKey && !shiftKey && !altKey && !repeat) {
			// log('CTRL+F')
			// searchWindow = wopen({ name: 'searchWindow', location:0})
			e.preventDefault()

			$('.workSearch').removeClass('hide')
			$('#workTargetSearch').focus()
		}
	}

	// 打开替换窗口
	{
		// CTRL+SHIFT+F
		if (keyCode === 70 && ctrlKey && shiftKey && !altKey && !repeat) {
			let e = $('.workSearch')
			if (e.is('.hide')) {
				e.removeClass('hide')
				$('#workSourceSearch').focus()
			} else {
				$('#works').find('.workrow').filter('.hide').each((i, e) => {
					let $e = $(e)
					$e.removeClass('hide').text($e.text())
				})
				e.addClass('hide')
			}
		}
	}
})

function showSearchPanel() {
	$('.searchPanel').removeClass('hide')
}


// 添加souce
// function initSources(){
// 	$.get('3000.cf.unique.txt').then(t => {
// 		let a= t.split('\n')
// 		log(a)
// 		a.forEach(source=>{
// 			addSource(source)
// 		})
// 	})
// }
function addSource(source) {
	sock.s.emit('project', JSON.stringify({ type: 'addSource', source }))
}


function initDicts() {
	$.get('3000.cf.dict.txt').then(t => {
		let a = t.split('\n').map(e => e.split('\t')).filter(e => e && e.length)
		a.forEach(row => {
			let [source, target] = row
			addDict(source, target)
		})
	})
}
function addDict(source, target) {
	sock.s.emit('project', JSON.stringify({ type: 'addDict', source, target }))
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
		
		$('#workSourceSearch').prop('disabled', true)
		v = $a.text(v).html()

		let $workrows
		if (!ctrlKey && !shiftKey && !altKey && !repeat) {
			$workrows = $('#works').find('.workrow')
		} else if (!ctrlKey && shiftKey && !altKey && !repeat) {
			$workrows = $('#works').find('.workrow').filter('.hide')
		} else if (!ctrlKey && !shiftKey && altKey && !repeat) {
			$workrows = $('#works').find('.workrow').not('.hide')
		}

		$workrows.each((i, e) => {
			let $workrow = $(e)
			let $item = $workrow.find('.source')
			let item = $a.text($item.text()).html()

			let re = new RegExp(v.split('').map(e => {
				let code = e.charCodeAt(0)
				if (code > 0 && code < 255) {
					return '\\' + e
				} else {
					return e
				}
			}).join('\\s*'), 'gu')

			$workrow.removeClass('hide')
			if (re.test(item)) {
				$item.html(item.replace(re, '<i>$&</i>'))
			} else {
				$workrow.addClass('hide')
			}
		})

		$('#workSourceSearch').prop('disabled', false).focus()

	} else if (keyCode === 27 && !repeat && !ctrlKey && !shiftKey && !altKey) {
		// ESC(18)
		e.preventDefault()
		$('#workSourceSearch').prop('disabled', true)

		$('#works .workrow').each((i, e) => {
			$(e).removeClass('hide')
			$(e).find('.source').each((i, e) => $(e).text($(e).text()))// 字符串化
			$(e).find('.target').each((i, e) => $(e).text($(e).text()))// 字符串化
		})
		$('.workrow.active').click()

		$('#workSourceSearch').prop('disabled', false).val('')
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
		$('#workTargetSearch').prop('disabled', true)

		v = $a.text(v).html()

		let $workrows
		$workrows = $('#works').find('.workrow').not('.hide')// 不同

		$workrows.each((i, e) => {
			let $workrow = $(e)
			let $item = $workrow.find('.target')// 不同
			let item = $a.text($item.text()).html()

			let re = new RegExp(v.split('').map(e => {
				let code = e.charCodeAt(0)
				if (code > 0 && code < 255) {
					return '\\' + e
				} else {
					return e
				}
			}).join('\\s*'), 'gu')

			$workrow.removeClass('hide')
			if (re.test(item)) {
				$item.html(item.replace(re, '<i>$&</i>'))
			} else {
				$workrow.addClass('hide')
			}
		})

		$('#workTargetSearch').prop('disabled', false).focus()
	} else if (keyCode === 27 && !repeat && !ctrlKey && !shiftKey && !altKey) {
		// ESC(18)
		e.preventDefault()
		$('#workTargetSearch').prop('disabled', true)

		$('#works .workrow').each((i, e) => {
			$(e).removeClass('hide')
			$(e).find('.source').each((i, e) => $(e).text($(e).text()))// 字符串化
			$(e).find('.target').each((i, e) => $(e).text($(e).text()))// 字符串化
		})
		$('.workrow.active').click()

		$('#workTargetSearch').prop('disabled', false).val('')
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
		if (v.length === 0) return log('搜索为空');

		e.preventDefault()
		$('#workTargetReplace').prop('disabled', true)


		let $workrows
		$workrows = $('#works').find('.workrow').not('.hide')

		if (ctrlKey) {
			$workrows.each((i, e) => {
				let $workrow = $(e)
				let $item = $workrow.find('.target')
				if ($item.has('i')) {
					$item.text($item.text())

					let $source = $workrow.find('.source')
					let sourceId = Number($source.attr('id'))
					let target = $item.text()
					let type = 'addTarget'
					// log(({ type, target, sourceId }));

					sock.s.emit('project', JSON.stringify({type, target, sourceId}), function(b,...a){
						let status = b ? 'done' : 'error'
						$workrow.addClass(status)
						setTimeout(() => {
							$workrow.removeClass(status)
						}, 1000);

						log('批量替换',b)
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

		$('#workTargetReplace').prop('disabled', false).focus()

	} else if (keyCode === 27 && !repeat && !ctrlKey && !shiftKey && !altKey) {
		// ESC(18)
		e.preventDefault()
		$('#workTargetReplace').prop('disabled', true)

		$('#works .workrow').each((i, e) => {
			$(e).removeClass('hide')
			$(e).find('.source').each((i, e) => $(e).text($(e).text()))// 字符串化
			$(e).find('.target').each((i, e) => $(e).text($(e).text()))// 字符串化
		})
		$('.workrow.active').click()

		$('#workTargetReplace').prop('disabled', false).val('')
		$('.workSearch').addClass('hide')
	}
})