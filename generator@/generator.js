const { log } = console

let array = ['a','b','c']


function generator(array){
	let index = 0
	function *generator(array){
		while(true){
			if( array.length <= index ) {
				index = 0
			}
			yield array[index]
			index++// yield虽然是next().value，但不像return一样会忽略下文。
		}
	}
	
	let originalGenerator = generator(array)
	return {
		array,
		originalGenerator,
		get index(){
			return index
		},
		next(){
			return originalGenerator.next().value
		}
	}	
}




// test
{

	let g = generator(array)
	
	
	log(g.next(), g.index)
	log(g.next(), g.index)
	log(g.next(), g.index)
	log('shift', g.array.shift())
	log(g.next(), g.index)
	log(g.next(), g.index)
	log(g.next(), g.index)
	log('shift', g.array.shift())
	log(g.next(), g.index)
	log(g.next(), g.index)
	log(g.next(), g.index)
	log('push', g.array.push('D'))
	log(g.next(), g.index)
	log(g.next(), g.index)
	log(g.next(), g.index)
}