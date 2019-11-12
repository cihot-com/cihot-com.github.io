let { log } = console

async function time(fn, name) {
	name = name || fn.name || 'time'
	console.time(name)
	await fn()
	console.timeEnd(name)
}

// /*
// 需求
// 有一堆数据，已超过1000个标签的渲染。
// 指定一个表格。
// 设定标题。
// 设置数据查看器。
// 设置行数。

// */
// let data = [
// 	{ name: 'jinxidong', age: 2019 - 1983, desc: 'ddb' },
// 	{ name: 'dongxue', age: 2019 - 1995, desc: 'ddm' },
// 	{ name: 'jinxiaoqing', age: 2019 - 2014, desc: 'dd' },
// ]

// t('table').data([{}]).th(['name', 'age'])


function nn(name, rename=name) {
	log(name, rename)


}



log(nn('123'))