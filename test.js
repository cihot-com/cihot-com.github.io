const { log, warn } = console;

log('test.js')
log(typeof log, 'log')


class Application1 {

	contructor() {

		this.name = Date.now()
	}

	say() {
		log('A1!!!!!!')
	}

	hode() {

	}
}


function Application2() {
	this.name = '******A2-' + Math.random().toString(36)
}
Application2.prototype.say = function () {
	log('A2!')
}


function Apphgfyhf() {
	return 331231231
}

function Beta() {
	return 'BBB'
}








Promise.resolve('a').then(async () => {
	return await setTimeout(() => log(1), 1000);
}).then(log)



// 有一组队列等待处理。
// 处理完成后才可以进行下一个阶段。
// 中途可以放弃操作。


// 可使用事件处理机制

class Queue {
	constructor() {
		this.dataStore = [];
	}

	//向队列末尾添加一个元素，直接调用 push 方法即可
	add(element) {
		this.dataStore.push(element);
		return this;
	}

	//删除队列首的元素，可以利用 JS 数组中的 shift 方法
	out() {
		if (!this.isEmpty) this.dataStore.shift();
		return this;
	}

	clear() {
		this.dataStore.length = 0;
	}

	//我们通过判断 dataStore 的长度就可知道队列是否为空
	get isEmpty() {
		return this.dataStore.length === 0;
		return this;
	}

	//查看队首元素，直接返回数组首个元素即可
	get start() {
		if (!this.isEmpty) this.dataStore[0];
		return this;
	}

	//查看队首元素，直接返回数组最后一个元素即可
	//读取队列尾的元素
	get end() {
		if (!this.isEmpty) this.dataStore[this.dataStore.length - 1];
		return this;
	}

}