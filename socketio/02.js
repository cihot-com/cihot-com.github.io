let port, path, url, sid, opts, s, socket, autoConnect;
// url = `${location.protocol}//${location.hostname}:${port}`;

opt = {
	transports: ['websocket'],
	reconnection: true,
};

s = io(opt);

s.on('message', (data) => {
	showMsg(data)
	// console.log('message', data)
})

s.on('connect', () => {
	showMsg(`My id is ${s.id}.`)
})



let msg = document.getElementById('msg')
msg.onkeydown = function (e) {
	let { keyCode, target: { value } } = e
	if (keyCode === 13) {
		if (value.trim()) {
			let element = showSendMsg(`[${s.id}] ${value}`)
			s.emit('broadcast', value, function () {
				element.classList.remove('sending')
			})
		}
		e.target.value = ''
		e.target.focus()
	}
}


function showSendMsg(v) {
	let e = document.createElement('div')
	document.getElementById('log').appendChild(e)
	e.classList.add('message')
	e.classList.add('sending')
	e.innerText = v
	animation(e)
	return e
}

function showMsg(v) {
	let e = document.createElement('div')
	document.getElementById('log').appendChild(e)
	e.classList.add('message')
	if (typeof v === 'object' && v !== null) {
		let { id, msg } = v
		v = `[${id}] ${msg}`
	}
	e.innerText = v
	animation(e)
	return e
}

function animation(e){
	TweenMax.from(e, 1, {
		css: {
			rotation: -5,
			background: '#eee',
		},
		invalidate: true,
		onComplete() {
			e.scrollIntoView()
		}
	})
}


cssd.set('.message', `
	white-space: pre-line;
	border-bottom: 2px solid #fff3;
	border-left: 2px solid #9c9;
	margin-top: 4px;
	`)
cssd.set('.sending', `
	border-bottom: 2px dashed #333;
	border-left: 2px dashed #0003;
	`)
cssd.set('#msg', `
	position: fixed;
	width: 100%;
	height:2.5em;
	left:0;
	top:0;
	font-size:1em;
	`)
cssd.set('#log',
	`margin-top: 3em;
`)
cssd.set('*', `
	transition: .5s;
	font-size: 1em;
	font-family: Verdana,"MS Ghotic",Tahoma;`)