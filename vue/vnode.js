function VNode(...args){
	if(!(this instanceof VNode)) return new VNode(...args)
	let len = args.length;
	let name, value, props;
	if(len===1) {
		value = args[0]
		this.node = document.createTextNode(value)
	}else if(len === 2) {
		name = args[0]
		value=  args[1]
		this.node = document.createElement(name ,value)
		this.node.textContent = value
	}else if(len >= 3) {
		name = args[0]
		value = args[1]
		this.node = document.createElement(name ,value)
		props = args.slice(2)
		props.forEach(prop=>{
			if(prop!==null && typeof prop==='object'){
				for(let k in prop) {
					let v = prop[k]
					if(v) {
						this.node.setAttribute(k, prop[k])
					}else {
						this.node.removeAttribute(k)
					}
				}
			}
		})
	}
}
VNode.prototype.extend = function(prop) {
	if (prop !== null && typeof prop === 'object') {
		for (let k in prop) {
			let v = prop[k]
			if (v) {
				this.node.setAttribute(k, prop[k])
			} else {
				this.node.removeAttribute(k)
			}
		}
	}
}

