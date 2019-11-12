class log {
	constructor(){
		
	}

	to(element) {
		this.element = element
		if(element instanceof HTMLTextAreaElement) {
			this.log = this.writeTextArea
		}else if(element instanceof HTMLElement) {
			this.log = this.writeElement
		}
	}

	writeTextArea(v) {
		this.element.value += v
	}

	writeElement(v){
		this.element.textContent += v
	}
}