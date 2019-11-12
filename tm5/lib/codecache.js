/* 
定义：
code   代码
blob   根据代码生成的Blob文件
url    根据blob生成的objectURL地址

_datas         Cache的数据集合，里面根据code为主键，含有blob和url等重要信息。
codes          返回_datas中的code集合。
add(code)      如果_datas已存在code，则直接用缓存内容，如果没有则新建后添加到_datas中。
remove(code)   从_datas中删除code行数据记录
script(code)   返回标签。虽然内部都调用add(code)，但每次都会生成新的<script>标签。
run(code)      运行脚本。虽然内部都调用add(code)，但每次都会生成新的<script>标签。
worker(code)   虽然内部都调用add(code)，但每次都会生成新的worker实例。
*/
class CodeCache {
	constructor() {
		Object.defineProperty(this, '_datas', { value: [] });
	}

	get(code) {
		return this._datas.find(e => code === e.code);
	}

	add(code) {
		let ret = this._datas.find(e => code === e.code);
		if (!ret) {
			let blob = new Blob([code], { type: 'text/javascript' });
			let url = URL.createObjectURL(blob);

			ret = { code, blob, url };
			Object.freeze(ret);
			this._datas.push(ret);
		}
		return ret;
	}

	remove(code) {
		let a = this._datas, i = a.length
		while (--i >= 0) {
			let e = a[i]
			if (e.code === code) {
				URL.revokeObjectURL(e.url);
				a.splice(i, 1);
				break;
			}
		}
		return a;
	}

	script(code) {
		let o = this.add(code)
		let e = document.createElement('script')
		e.src = o.url
		return e
	}

	run(code) {
		let e = this.script(code)
		document.head.appendChild(e)
		e.remove()
		return e
	}

	worker(code, name) {
		let o = this.add(code)
		let w = new Worker(o.url, { name })
		// 设置只读属性
		Object.defineProperties(w, {
			code: { value: o.code, enumerable: true },
			blob: { value: o.blob, enumerable: true },
			url: { value: o.url, enumerable: true },
			name: { value: name, enumerable: true },
		})
		return w
	}

	each(fn){
		if(typeof fn==='function') {
			this._datas.forEach(fn)
		}
	}

	get codes() {
		return this._datas.map(e => e.code)
	}
}