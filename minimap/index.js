let { log, warn } = console


function rect(size = 4) {
	let e = document.createElement('span')
	e.classList.add('rect' + parseInt(size))
	return e
}

let p = document.querySelector('#minimap')
let i = 1000
while (i-- > 0) {
	p.appendChild(rect(8))
}



let fpsElement = document.createElement('pre')
document.body.appendChild(fpsElement)


let fpsRecordElement = document.createElement('pre')
document.body.appendChild(fpsRecordElement)

let fps = 0
let fpsMin = Number.MAX_SAFE_INTEGER
let fpsMax = Number.MIN_SAFE_INTEGER
let lastRecordTime = Date.now()


// 使用缓存
let w = cacheWorker('w', function () {
	let { log } = console

	function randomBackground(size = 3) {
		let result = '#'
		while (size-- > 0) {
			result += Math.floor(Math.random() * 16).toString()
		}
		// log(result)
		return result
	}

	function random(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1))
	}

	let i = 0
	let mission = setInterval(() => {
		i = i + 1
		postMessage({ index: random(0, 1000 - 1), background: randomBackground() })
		if (i >= Number.MAX_SAFE_INTEGER) {
			clearInterval(mission)
			close()
		}
	});
}, {
		message(data) {
			// log(data)
			p.children[data.index].style.background = data.background

			let _time = Date.now()
			let _fps = _time - lastRecordTime
			lastRecordTime = _time
			fpsMax = Math.max(fpsMax, _fps)
			fpsMin = Math.min(fpsMin, _fps)
			fpsElement.innerText = _fps
			fpsRecordElement.innerText = `(${fpsMin}/${fpsMax})`
			fps = _fps
		},
		error(e) {
			log('error', e)
		},
		messageerror(e) {
			log('merr', e)
		}
	})

