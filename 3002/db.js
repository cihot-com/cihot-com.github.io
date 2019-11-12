let db = localforage.createInstance({name:'3002',storeName:'test', driver:localforage.LOCALSTORAGE })

log(db)



let { time , timeEnd } = console

void async function (){
	let arr = []
	let c = function(){
		return Math.random().toString(16)
	}
	for(let i=0; i<1000; i++) {
		arr.push({[i]: c()+c()+c() })
	}
	time('set')
	await db.setItem('arr', arr)
	timeEnd('set')

	await db.setItem('obj', {a:1,b:2})

	// time('get')
	// await db.getItem('arr')
	// timeEnd('get')
}()




let ls = {
	driver: localStorage,
	set(k,v) {
		this.driver.setItem(k, JSON.stringify(v))
	},
	get(k) {
		return JSON.parse(this.driver.getItem(k))
	}
}

