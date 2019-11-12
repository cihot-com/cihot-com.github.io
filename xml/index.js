log = console.log

function ge(q, all=false) {
	return all ? document.querySelectorAll(q) : document.querySelector(q)
}


let prop, content, opt, source, target, tags

prop = ge('#prop')
content = ge('#content')
source = ge('#source')
target = ge('#target')

opt = {
	get content() {
		return content.checked
	},
	get prop() {
		return prop.value.split(',')
	},
	get document(){
		let p = (new DOMParser())
		let doc = p.parseFromString('<xml>' + source.value + '</xml>', 'text/xml')
		return doc
	},
	get tags(){
		return $('*', this.document).toArray()
	}
	
}


$(prop).on('change', clac)
$(content).on('change', clac)
$(source).on('input', clac)





function clac(e){
	tags = opt.tags
	console.log(tags)

	target.value = ''

	tags.forEach(e => {
		if(e.tagName==='xml') return ;
		let b
		b = opt.content
		if(b) {
			let v = e.textContent
			if (v) {
				target.value += v + '\n'
			}
		}

		b = opt.prop
		if(b) {
			b.forEach(k => {
				let v = e.getAttribute(k)
				if(v) {
					target.value += v+'\n'
				}
			});
		}

		
	})
}