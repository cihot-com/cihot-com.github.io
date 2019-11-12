MessagePort.prototype.send = function (...m) {
	this.postMessage(['message', ...m])
}

MessagePort.prototype.emit = function (...m) {
	this.postMessage(m)
}

MessagePort.prototype.on = function (type, method) {
	if (typeof this.methods !== 'object' || this.methods === null) {
		this.methods = Object.create(null)
	}
	if (!Array.isArray(this.methods[type])) {
		this.methods[type] = []
	}
	this.methods[type].push(method)
}

MessagePort.prototype.off = function (type, method) {
	if (typeof this.methods !== 'object' || this.methods === null) {
		this.methods = Object.create(null)
	}
	if (!Array.isArray(this.methods[type])) {
		this.methods[type] = []
		return false
	}
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