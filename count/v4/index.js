const { log } = console;

let w, timeout;
$('#source').on('input', function (e) {
	if (w) w.terminate()
	w = worker('split', function () {
		const { log } = console;

		let re = {
			n: /[0-9]/,
			en: /[a-zA-Z]/,
			cn: /[\u4e00-\u9fa5]/,
			kr: /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,// [ㄱ-ㅎㅏ-ㅣ가-힣
			jp: /[\u3040-\u30ff\u31f0-\u31ff]/,
		}
		
		onmessage = function ({ data }) {
			let totalLength = data.length;
			let rows = data.split('\n')
			let rowsLength = rows.length
			let innerLength = 0
			rows.forEach(row=>{
				innerLength += row.length
			})
			let words = data.trim().split(/\s+/g)
			// 除去数值
			let wordsLength = words.length
			

			let str = data, current = 0, total = str.length, index, counter = {}, char, percent,
				res = { n: 0, en: 0, cn: 0, kr: 0, jp: 0, _: 0 },
				k, v, o;

			while (current < total) {
				index = current++;
				char = str[index];
				percent = current / total;
				Object.assign(res, { current, total, percent });

				if (re.n.test(char)) {
					res.n++;
				} else if (re.en.test(char)) {
					res.en++;
				} else if (re.cn.test(char)) {
					res.cn++;
				} else if (re.kr.test(char)) {
					res.kr++;
				} else if (re.jp.test(char)) {
					res.jp++;
				} else {
					res._++;
				}

				if (percent === 1) res.done = true;
			}
			postMessage({ rows, rowsLength, wordsLength, totalLength, innerLength , res })
			close()
		}
	}, function (data) {
		([ 'totalLength', 'innerLength', 'wordsLength', 'rowsLength', ]) .forEach(id=>{
			$('#'+id).text(data[id])
		});
		([ 'n', 'en', 'cn', 'kr', 'jp' ]) .forEach(id=>{
			$('#'+id).text(data.res[id])
		});
	})

	clearTimeout(timeout)
	timeout = setTimeout(()=>{
		let v = $(this).val()
		if(v) {
			w.postMessage(v)
		}else{
			(['totalLength', 'innerLength', 'wordsLength', 'rowsLength', 'n', 'en', 'cn', 'kr', 'jp' ]).forEach(id=>{
				$(`#${id}`).text('0')
			});
		}
	})
})


$('#clear').click(function (e) {
	if (w) w.terminate();
	document.querySelector('#source').value = ''
	let arr = ['totalLength', 'innerLength', 'wordsLength', 'rowsLength', 'n', 'en', 'cn', 'kr', 'jp']
	arr.forEach(id => {
		let e = document.querySelector(`#${id}`)
		e.textContent = '0'
	});
})