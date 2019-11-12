d3.select('#downloadChrome').remove()


/* 
dialog
	form
		label input username
		label input password

*/
const user = {}
user.dialog = document.body.appendChild(document.createElement('dialog'))
user.form = user.dialog.appendChild(document.createElement('form'))
user.form.method = 'dialog'
user.usernameLabel = user.form.appendChild(document.createElement('label'))
user.usernameLabel.textContent = lang().USERNAME
user.usernameInput = user.usernameLabel.appendChild(document.createElement('input'))
user.usernameInput.name = 'username'
user.usernameInput.type = 'text'
user.usernameInput.autofocus = true
user.usernameInput.autocomplete = true
user.usernameInput.pattern = '[0-9a-z_@\\.\\-]+'
user.usernameInput.required = true
user.passwordLabel = user.form.appendChild(document.createElement('label'))
user.passwordLabel.textContent = lang().PASSWORD
user.passwordInput = user.passwordLabel.appendChild(document.createElement('input'))
user.passwordInput.name = 'current-password'
user.passwordInput.type = 'password'
user.passwordInput.autocomplete = true
user.passwordInput.required = true
user.submitInput = user.form.appendChild(document.createElement('input'))
user.submitInput.type = 'submit'
user.submitInput.name = lang().SIGN_IN
user.submitInput.style.width = '100%'
user.form.addEventListener('submit', function (e) {
	let username = user.usernameInput.value
	let password = user.passwordInput.value
	user.passwordInput.value = ''// 安全考虑，清空该值。
	log({ username, password }, e)
	setTimeout(() => {
		history.replaceState({ username, password }, location.pathname)
	}, 100);
})
user.show = function () {
	if (!user.dialog.open) user.dialog.showModal()
}
user.hide = function () {
	user.dialog.close()
}





// 运行速度测试
function speedTest(fn) { let name = fn.name || 'test'; console.time(name); fn(); console.timeEnd(name); }






const options = {}
options.dialog = d3.select('body').append('dialog').node()
{
	let { dialog } = options
	let title = options.title = d3.select(dialog).append('h3').text(lang().OPTIONS).node()
	let menu = d3.select(dialog).append('menu').node()
	let submit = d3.select(menu).append('button').text(lang().APPLY).node()




	options.toggleDialog = function () {
		if (dialog.open) {
			dialog.close()
		} else {
			dialog.showModal()
		}
	}
}

// 读取用getComputedStyle的getPropertyValue()，设置用documentElement的setProperty()。
const root = new Proxy(document.documentElement, {
	get(t, k) {
		return getComputedStyle(t).getPropertyValue('--' + k)
	},
	set(t, k, v) {
		if (k.indexOf('_') === 0) {
			t.style.setProperty('--' + k.slice(1), v, true)
		}
		t.style.setProperty('--' + k, v)
	},
})

// if (!user.dialog.open) user.dialog.showModal()


const db = localforage.createInstance({ name: 'tm5Db', storeName: 'tm5Store' })






let s;
let connect = function (vue) {
	let s, opt;

	opt = {
		autoConnect: true,
		reconnection: false,
		transports: ['websocket'],
		forceNew: false,
		timeout: 5000,
		rememberUpgrade: true,
		// query: { token: '' },
	}

	s = io(`/`, opt)

	s.on('connect', function () {
		document.querySelector('#app').removeAttribute('style')
		// vue.userType = ''
		// console.log('connect')
	})

	s.on('disconnect', function () {
		vue.userType = 'guest'
	})

	s.on('message', function (...m) {
		console.log(...m)
	})

	s.on('vue', function (o) {
		if (typeof o === 'object' && o === null) return;
		for (let k in o) {
			let v = o[k]
			console.log(k, v, vue)
			vue[k] = v
		}
	})
	return s;
}



// let formctl = {
// 	updateButton: document.getElementById('updateDetails'),
// 	favDialog: document.getElementById('favDialog'),
// 	output: document.getElementsByTagName('output')[0],
// 	select: document.getElementsByTagName('select')[0],
// 	confirmBtn: document.getElementById('confirmBtn'),
// 	init(){
// 		if(this.inited) return false
// 		this.inited = true

// 		let { updateButton, favDialog, output, select, confirmBtn } = this
// 		updateButton.addEventListener('click', function onOpen() {
// 			if (favDialog.hidden) {
// 				favDialog.showModal()
// 			}
// 		})
// 		select.addEventListener('change', function onSelect(e) {
// 			confirmBtn.value = selectEl.value
// 		})

// 		favDialog.addEventListener('close', function onClose(e) {
// 			console.warn(e)
// 			output.value = favDialog.returnValue + " button clicked - " + (new Date()).toString()
// 		})
// 	}
// }

// formctl.init()



// {
// 	let tips = $('#statusDict tr').toArray().map(e => [$(e).find('.source').text(), $(e).find('.target').text()])
// 	tips.sort((a,b)=>{
// 		let al, bl;
// 		al = a[0].length
// 		bl = b[0].length
// 		if(al>bl){
// 			return -1
// 		}else if(al<bl){
// 			return 1
// 		}else{
// 			return a[0]>b[0] ? -1 : (a[0]<b[0] ? 1 : 0)
// 		}
// 	})

// 	function encode(s, tips){
// 		tips.forEach(function(e,i){
// 			while(s.indexOf(e)>-1){
// 				s = s.replace(e,`[${i}]`)
// 			}
// 		})
// 		return s;
// 	}
// 	let s = '고급 해적 모집 속도'

// 	console.log(encode(s, tips));


// }


/* 
d3.csv(url).then((data)=>{})

获得值为range范围，参考值为domain。输入domain得出range。
sl=d3.scaleLinear().domain([3,9]).range([0,100])
sl.ticks(20)
sl.domain()
sl.range()
y=d3.axisLeft(sl)

sb=d3.scaleBand().domain(['Name1','Name2','Name3']).range([0,100]).padding(0.05)
x=d3.axisBottom(sb)

d3.select('svg').append('g').call( x||y )


d3.histogram().domain(y.domain()).thresholds(y.ticks(20)).value(d=>d)


*/

void async function () {
	var margin = { top: 10, right: 30, bottom: 30, left: 40 },
		width = 460 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

	var svg = d3.select("body")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Read the data and compute summary statistics for each specie
	let data = await d3.csv("./assets/data/iris.csv")


	var y = d3.scaleLinear().domain([3.5, 8]).range([height, 0])
	svg.append("g").call(d3.axisLeft(y))

	var x = d3.scaleBand().range([0, width]).domain(["setosa", "versicolor", "virginica"]).padding(0.05)
	svg.append("g").call(d3.axisBottom(x)).attr("transform", "translate(0," + height + ")")

	var histogram = d3.histogram().domain(y.domain()).thresholds(y.ticks(20))

	var sumstat = d3.nest()
		.key(function (d) {
			return d.Species;
		})
		.rollup(function (d) {
			input = d.map(function (g) { return g.Sepal_Length; })
			bins = histogram(input)
			return bins
		})
		.entries(data)

	var maxNum = 0
	sumstat.forEach((e) => {
		allBins = e.value
		lengths = allBins.map(function (a) { return a.length; })
		longuest = d3.max(lengths)
		if (longuest > maxNum) {
			maxNum = longuest
		}
	})

	var xNum = d3.scaleLinear()
		.domain([-maxNum, maxNum])
		.range([0, x.bandwidth()])

	// Add the shape to this svg!
	svg
		.selectAll('notag')
		.data(sumstat)
		.enter()        // So now we are working group per group
		.append("g")
		.attr("transform", function (d) { return ("translate(" + x(d.key) + " ,0)") }) // Translation on the right to be at the group position
		.append("path")
		.datum(function (d) { return (d.value) })     // So now we are working bin per bin
		.style("stroke", "#000")
		.style("stroke-width", "1")
		// .style("stroke-dasharray", "5,2")
		.style("fill", "#696")
		.attr("d", d3.area()
			.x0(function (d) { return (xNum(-d.length)) })
			.x1(function (d) { return (xNum(d.length)) })
			.y(function (d) { return (y(d.x0)) })
			.curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
			// .curve(d3.curveCatmullRomOpen)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
			// .curve(d3.curveCatmullRomClosed)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
		)
}()




{
	// Histogram Graph
	// set the dimensions and margins of the graph
	let margin = Object.create({ top: 30, right: 50, bottom: 30, left: 30 }),
		svgWidth = 460,
		svgHeight = 400,
		width = svgWidth - margin.left - margin.right,
		height = svgHeight - margin.top - margin.bottom;

	// append the svg object to the body of the page
	let svg = d3.select('body')
		.append("svg").attr("width", svgWidth).attr("height", svgHeight)
		.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	// get the data
	d3.csv("./assets/data/1_OneNum.csv").then(function (data) {
		let maxPrice = d3.max(data, d => d.price)
		let x = d3.scaleLinear()
			.domain([0, maxPrice]) // 0-99
			.range([0, width])     // 0-400

		svg.append("g")
			.attr("transform", `translate(0,${height})`)
			.call(d3.axisBottom(x));

		let histogram = d3.histogram()
			.value(function (d) { return d.price; })
			.domain(x.domain())
			.thresholds(x.ticks(maxPrice / 3));


		// And apply this function to data to get the bins
		let bins = histogram(data);

		// Y axis: scale and draw:
		let y = d3.scaleLinear()
			.range([height, 0]);
		y.domain([0, d3.max(bins, function (d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
		svg.append("g")
			.call(d3.axisLeft(y));

		// append the bar rectangles to the svg element
		svg.selectAll("rect")
			.data(bins)
			.enter()
			.append("rect")
			.attr("x", 1)
			.attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
			.attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
			.attr("height", function (d) { return height - y(d.length); })
			.style("fill", "#ccf")
	});
}


{
	const W = 640;// width
	const H = 480;// height
	const IH = 20;// item height
	const MT = 30, MR = 30, MB = 30, ML = 30;// margin top,right,bottom,left.

	let svg = d3.select('body').append('svg')
		.attr('width', W)
		.attr('height', H)

	let g = svg.append('g')
	g.attr('transform', `translate(${ML},${MT})`)

	let y = d3.scaleLinear().domain([0, 100]).range([MT, H - MT - MB])
	g.append('g').call(d3.axisRight(y))

	g.attr('font-size', 16)

	for (let i = 0, len = 10; i < len; i++) {
		let text = g.append('text')
			.text(`Text-${i}`)
			.attr('x', ML + 100)
			.attr('y', i * IH + MT)
	}


	let items = g.selectAll('text').filter((d, i, a) => {
		return a[i].parentElement === g.node()
	})
		.transition()
		.duration(100)
		.ease(d3.easeBackIn)
		.attr('x', '200').on('end', (d, i, a) => d3.select(a[i]).attr('fill', 'red'))
		.transition()
		.duration(2000)
		.attr('x', '20').on('end', (d, i, a) => {
			d3.select(a[i]).transition().delay(d => i * 400).attr('fill', 'blue')
				.transition()
				.attr('x', '140').on('end', (d, i, a) => d3.select(a[i]).transition().delay(d => i * 400).attr('fill', 'black'))
		})

	// .each('x', function(d,i,a){ let e=d3.select(a[i]); e.attr('x', Number(e.attr('x'))+20); })

	log(items)


	// 	.attr('x', 40)
	// 	.attr('y',(d,i)=>i*(IH+4+2))
	// 	.each((d,i,a)=>{
	// 		let e = a[i]
	// 		e.y = i * (IH + 10)
	// 		e.textContent=i
	// 	})
	// 	.transition()
	// 	.text(d=>d)


}



let datas = []
let rand = d3.randomUniform(1000, 10000)
for (let i = 0; i < 1000; i++) {
	datas.push({ no: i + 1, source: rand().toString(16), target: '' })
}
log(datas)


let table = document.createElement('table')
table.dataset.pagelengthgrows = 100


class ShowTable {
	constructor(table) {
		if (table instanceof HTMLElement && table.nodeName === 'TABLE') {
			this._table = table
		} else {
			this._table = document.createElement('table')
		}
	}

	data(arr) {
		this._datas = Array.isArray(arr) ? arr : []
	}

	column(arr) {
		this._columns = arr
	}

	show(page, count, filter) {
		let { _datas, _table } = this
		let _current
		// 先把符合条件的弄出来
		if (typeof filter === 'function') {
			_current = this._current = _datas.filter(filter)
		}
		let _currentLength = _current.length

		if (_currentLength / count > page) {
			_
		} else {
			_current = []
		}



	}




}




function langGo(e) {
	var t = {
		keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
		literal: "true false iota nil",
		built_in: "append cap close complex copy imag len make new panic print println real recover delete"
	};
	return {
		aliases: ["golang"], 
		k: t, 
		i: "</", 
		c: [
			e.CLCM,
			e.CBCM,
			{ cN: "string", v: [e.QSM, { b: "'", e: "[^\\\\]'" }, { b: "`", e: "`" }] },
			{ cN: "number", v: [{ b: e.CNR + "[i]", r: 1 }, e.CNM] },
			{ b: /:=/ },
			{ cN: "function", bK: "func", e: /\s*\{/, eE: !0, c: [e.TM, { cN: "params", b: /\(/, e: /\)/, k: t, i: /["']/ }] }
		]
	}
}


{
	let e = document.createElement('pre')
	e.textContent = `你好，亲爱的祖国，我的家园！亲人。`
	document.body.appendChild(e)
	hljs.highlightBlock(e)
}