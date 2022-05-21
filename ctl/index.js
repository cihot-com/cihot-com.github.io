import io from '/module/socket.io.js'
import localforage from '/module/localforage.js'
import extendTextarea from './extend_textarea.js'

(async function () {
	//Define
	window.db = localforage.createInstance({
		name: 'dev',
		storeName: 'dev'
	})

	//Define
	let last = Object.assign(
		{ id: 0, type: 'SC', script: '', ack: 'console.log(...s)' },
		await db.getItem('last')
	)

	//Define
	window.ui = {}
	ui.form = document.querySelector('#left>form')
	ui.el = function (k) {
		return ui.form.elements.namedItem(k)
	}
	ui.get = function (k) {
		return ui.el(k).value
	}
	ui.set = function (k, v) {
		let el = ui.el(k)
		if (el) {
			if (v === null || v === undefined) {
				if (el.type === 'number') v = 0
				else v = ''
			}
			el.value = v
		}
	}
	ui.success = function (v) {
		ui.TOP.textContent = v
		ui.TOP.classList.add('success')
	}
	ui.error = function (v) {
		ui.TOP.textContent = v
		ui.TOP.classList.add('error')
	}
	ui.appendSavedButton = async function (id, type, script, ack, time) {
		let el = document.createElement('button')
		el.dataset.id = id
		el.dataset.type = type
		el.dataset.script = script
		if (ack) el.dataset.ack = ack
		el.dataset.time = time
		el.textContent = script.length > 34 ? script.substr(0, 30) + ' ...' : script
		ui.RIGHT.appendChild(el)
	}
	ui.TOP = document.querySelector('#top')
	ui.LEFT = document.querySelector('#left')
	ui.RIGHT = document.querySelector('#right')

	//Define
	window.socket = io('/tm4/', {
		autoconnection: true,
		transports: ['websocket'],
		query: {
			MACHINE_ID: 'JINXIDONG-TM4-CTL'
		}
	})

	//Use
	socket.on('connect', () => {
		console.log('[connect]', socket.id)
	})


	socket.on('message', (...s) => {
		let { length } = s
		let ack = s[length - 1]
		if (typeof ack === 'function') {
			s.pop()
			ack()
		} else {
			s.push(ack)
		}
		console.log('[message]', s.length, ...s, ack)
	})

	socket.on('error', console.error)

	socket.on('disconnect', (...s) => {
		console.log('[disconnect]', s.length, ...s)
	})

	socket.onAny((type, ...s) => {
		console.log(`[${type}]`, s.length, ...s)
	})
	socket.on('CC', (query, ack) => { ack('<skip>') })


	//Use
	ui.el('id').addEventListener('wheel', (event) => {
		let { target, wheelDeltaY } = event
		let n = parseInt(target.value)
		if (0 < wheelDeltaY) {
			target.value = Math.max(n - 1, 0)
		} else {
			target.value = n + 1
		}
	}, { passive: true })
	ui.el('save').addEventListener('click', async () => {
		let script = ui.get('script')
		if (script.replace(/\s+/, '').length == 0) {
			return ui.error('no script');
		}
		let ack = ui.get('ack')
		if (ack.replace(/\s+/, '').length == 0) {
			ack = ''
		}
		let id = ui.get('id')
		let type = ui.get('type')
		let time = Date.now()
		try {
			await db.setItem(id, { type, script, ack, time })
			ui.appendSavedButton(id, type, script, ack, time)
			ui.success('saved')
			ui.set('id', await getId())
		} catch (err) {
			ui.error(err.stack)
		}
	})
	ui.el('send').addEventListener('click', async () => {
		let script = ui.get('script')
		if (script.replace(/\s+/, '').length === 0) {
			return ui.error('no script');
		}
		let ack = ui.get('ack')
		if (ack.replace(/\s+/, '').length !== 0) {
			ack = new Function('...s', ack)
			socket.send(script, ack)
		} else {
			socket.send(script)
		}
	})
	ui.el('emit').addEventListener('click', async () => {
		let type = ui.get('type')
		if (type.replace(/\s+/, '').length === 0) {
			return ui.error('no type')
		}
		let script = ui.get('script')
		if (script.replace(/\s+/, '').length == 0) {
			return ui.error('no script')
		}
		let ack = ui.get('ack')
		if (ack.replace(/\s+/, '').length !== 0) {
			ack = new Function('...s', ack)
			socket.emit(type, script, ack)
		} else {
			socket.emit(type, script)
		}
	})
	ui.RIGHT.addEventListener('click', (event) => {
		let { target, ctrlKey } = event
		if (target.matches('button')) {
			ui.set('id', target.dataset.id)
			ui.set('type', target.dataset.type)
			ui.set('script', target.dataset.script)
			ui.set('ack', target.dataset.ack)
		}
	})
	//读取记录
	let keys = await db.keys()
	for (let i = 0, len = keys.length; i < len; i++) {
		let k = keys[i]
		if (/^\d+$/.test(k)) {
			let v = await db.getItem(k)
			ui.appendSavedButton(k, v.type, v.script, v.ack, v.time)
		}
	}
	ui.set('id', last.id)
	ui.set('type', last.type)
	ui.set('ack', last.ack)
	ui.set('script', last.script)

	async function getId(){
		let id = 0
		let s = await db.keys()
		s.forEach(k=>{
			if(/^\d+$/.test(k)) {
				id = Math.max(parseInt(k), id)
			}
		})
		return id
	}

	//Setting
	window.addEventListener('beforeunload', async () => {
		await db.setItem('last', {
			id: ui.get('id'),
			type: ui.get('type'),
			script: ui.get('script'),
			ack: ui.get('ack'),
		})
	})

	window.addEventListener('keydown', (event) => {
		if (!event.repeat) {
			if (event.keyCode === 13) {//Enter
				if (event.ctrlKey) {
					ui.el('emit').click()
					event.preventDefault()
				} else if (event.altKey) {
					ui.el('send').click()
					event.preventDefault()
				}
			} else if (event.keyCode === 83) {
				if (event.ctrlKey) {
					ui.el('save').click()
					event.preventDefault()
				}
			}
		}
	})

	window.addEventListener('contextmenu', (event) => {
		let { target } = event
		if (target.matches('#right button')) {
			event.preventDefault()
			let { id } = target.dataset
			if (/^\d+$/.test(id)) {
				db.removeItem(id).then(
					() => {
						target.remove()
						ui.success('deleted ' + id)
					},
					(err) => {
						ui.error(err)
					}
				)
			}
		}
	})

	extendTextarea(ui.el('script'))


})()





{
	//ui
	let el = document.querySelector('#top')
	document.querySelectorAll('textarea').forEach(e=>{
		e.addEventListener('focusin', handle)
		e.addEventListener('mouseup', handle)
		e.addEventListener('keydown', handle)
		e.addEventListener('keyup', handle)
		e.addEventListener('input', handle)
		function handle(event){
			let x = event.target
			let { selectionDirection:direction, selectionStart:start, selectionEnd:end} = x
			let text = ''
			requestAnimationFrame(()=>{
				if(start===end) {
					text += `${direction}: ${start}`
				}else{
					text += `${direction}: ${start}-${end}`
				}

                let prefix = x.value.slice(0,start)
				let m = prefix.match(/\n/g)
				let lineNo = 0
				let lineStartIndex = 0
				if(m) {
					lineNo = m.length
					lineStartIndex = prefix.lastIndexOf('\n')+1
				}
				text += ` , lineNo: ${lineNo} , lineStartIndex: ${lineStartIndex}`
				el.textContent = text
			})
		}
	})

	//document.addEventListener('keydown', ()=>{
	//	//let rect = window.getSelection().getRangeAt(0).getBoundingClientRect()
	//	let rect = window.getSelection().getRangeAt(0).getClientRects()
	//	console.log(rect)
	//	el.textContent = JSON.stringify(rect)
	//})
}





function autosave(){}

function autoload(){}


void function (){
	socket.emit('SC',`let s=this;
	let mgid=s.handshake.query.MACHINE_ID+'-'+s.handshake.query.gmail;
	let ps=dicts[mgid]
	ps.CF
	`, (dictArray=>{
		dict.array = dict.array.concat(dictArray)
	}))
}



