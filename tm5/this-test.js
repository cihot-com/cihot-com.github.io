let o = {
	name: 'jinxidong',
	f(){
		console.log(this.name)
	}
}

o.f()// "jinxidong"


global.name = 'global'

let f = o.f
f()// "global"


