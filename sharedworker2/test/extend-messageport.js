MessagePort.prototype.send = function (...m) {
	m.unshift('message')
	this.postMessage(m)
}

MessagePort.prototype.emit = function (...m) {
	this.postMessage(m)
}

MessagePort.prototype.on = function (type, method) {
	this.initMethods()
	this.initMethodsType(type)
	this.methods[type].push(method)
}

MessagePort.prototype.initMethods = function (){
	let b = typeof this.methods !== 'object' || this.methods === null
	if (b) {
		this.methods = Object.create(null)
	}
	return b// 是否初始化
}
MessagePort.prototype.initMethodsType = function (type) {
	let b = !Array.isArray(this.methods[type])
	if (b) {
		this.methods[type] = []
	}
	return b// 是否初始化
}

MessagePort.prototype.off = function (type, method) {
	this.initMethods()
	if(this.initMethodsType(type)) return ;
	let index = this.methods[type].lastIndexOf(method)
	if (index !== -1) this.methods[type].splice(index, 1)
}
MessagePort.prototype._close = MessagePort.prototype.close
MessagePort.prototype.close = function(){
	let e = new Event('close')
	e.id = this.id
	this.dispatchEvent(e)
	this.emit('close')
	this._close()
}

/* sd = new SharedWoker()

(sd.ports[0]   instanceof  MessagePort)    === true



// SocketIO
emit
send
 */