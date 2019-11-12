let { log, warn } = console


// 使用缓存
let w1 = cacheWorker('w1', function () {
	let {log} = console
	let i = Number.MAX_SAFE_INTEGER-100;
	let j = 200
	let mission = setInterval(() => {
		i = i+1
		this.postMessage(i)
		// log(i)
		if (i >= Number.MAX_SAFE_INTEGER && j-- <= 0) {
			clearInterval(mission)
			close()
		}
	});
}, {
		message(data) {
			log(data)
			document.querySelectorAll('.log').forEach((e,i)=>{
				e.innerHTML = i+'-'+data
				e.style.background = rand()
			})

			function rand(size=3){
				let result = '#'
				while(size-->0) {
					result += Math.floor(Math.random()*16).toString()
				}
				// log(result)
				return result
			}
		},
		error(e) {
			log('error', e)
		},
		messageerror(e) {
			log('merr', e)
		}
	})

