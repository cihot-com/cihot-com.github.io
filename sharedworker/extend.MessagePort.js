// 扩展portd的原型：send() emit() on() off()
if (MessagePort && typeof MessagePort.prototype) {

	/* 
	serverPort.on("login", (user,pass,ack)=>{
		ack(res = user===pass)
	})

	clientPort.emit("login", "user", "pass", (res)=>log(res))


	              user, pass
	           --------------->
	clientPort                  serverPort
	           <---------------
	                 res
	
	*/
	function onMessage(e) {
		let { data } = e;
		if (data) {
			let { ackId } = data;
			if (ackId) {
				let ack = port.acks[ackId];
				if (typeof ack === 'function') {
					let { args } = data;
					if (!Array.isArray(args)) args = [];
					Reflect.apply(ack, port, args);
				}
				delete port.acks[ackId];
			}
		}
		e.stopPropagation();
		e.preventDefault();
	}

	function initInstance(port) {
		if(!port.acks) {
			port.acks = { autoIncrement: 0 };
			port.addEventListener('message', onMessage, { passive: true });
		}
	}

	MessagePort.prototype.send = function (...args) {
		initInstance(this);
		let length = args.length;
		if (length > 0) {
			let type = 'message';
			let ack = args.pop();
			if (typeof ack === 'function') {
				let ackId = ++this.acks.autoIncrement;
				this.acks[ackId] = ack;
				this.postMessage({ type, args, ackId });
			} else {
				args.push(ack);
				this.postMessage({ type, args });
			}
		}
		return this;
	}
	MessagePort.prototype.emit = function (...args) {
		initInstance(this);
		let length = args.length;
		if (length > 0) {
			let type = args.unshift();
			if (typeof type === 'string') {
				let ack = args.pop();
				if (typeof ack === 'function') {
					let ackId = ++this.acks.autoIncrement;
					this.acks[ackId] = ack;
					this.postMessage({ type, args, ackId });
				} else {
					args.push(ack);
					this.postMessage({ type, args });
				}
			}
		}
		return this
	}
	MessagePort.prototype.on = function (type, handle) {
		if (typeof handle === 'function') {
			if (!Array.isArray(this.events[type])) {
				this.events[type] = [];
			}
			this.events[type].push(handle);
		}
		return this;
	}
	MessagePort.prototype.off = function (type, handle) {
		if (typeof handle !== 'function') {
			if (Array.isArray(this.events[type])) {
				let i = this.events[type].lastIndexOf(handle);
				if (i > -1) {
					this.events[type].splice(i, 1);
				}
			} else {
				this.events[type] = [];
			}
		} else {
			delete this.events[type];
		}
		return this;
	}
}