
class FileManagerUI extends EventTarget {
	constructor(id){
		super()
		if(!id) id = Date.now()+Math.random()
		let c = document.getElementById(id)
		if(!c) {
			c = document.createElement('div')
			c.setAttribute('id', id)
			document.body.appendChild(c)
		}
		this.content = c
	}
	link(fm){
		this.fm
	}
	create(file){
		let c = document.createElement('div')
		c.classList.add('file')
		function create(k){
			let c = document.createElement('span')
			c.textContent = k
			return c
		}
		c.appendChild(create(file.name))
		c.appendChild(create(file.type))
		c.appendChild(create(file.size))
		this.content.setAttribute('data-name',file.name)
		this.content.setAttribute('data-type',file.type)
		this.content.setAttribute('data-size',file.size)
		this.content.appendChild(c)
		return this
	}
	delete(name){
		this.content.childNodes.forEach(c=>{
			if(c.getAttribute('data-name')===name) c.remove()
			return true
		})
	}
	add(file) {
		this.content
	}
	table(){
		
	}
}