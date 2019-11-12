const { log, warn } = console

// pending
// fulfilled
// rejected


let p = new Promise((resolve, reject) => {
	log('start promise')
	setTimeout(() => {
		// resolve('yes')
		// log(p)// Promise { 'yes' }(已成功)  - resolved(已定型)

		reject('no')
		log(p)// Promise { <rejected> 'no' }(已失败)  - resolved(已定型)

	}, 500);
})


log(p)// Promise { <pending> }（进行中）


// p.then(
// 	function resolved(v) {
// 		log(1, v)
// 		return v
// 	},
// 	function rejected(v) {
// 		warn(1, v)
// 		return v
// 	}
// ).then(
// 	function y(v) {
// 		log(2, v)
// 		return v
// 	},
// 	function n(v) {
// 		warn(2, v)
// 		return v
// 	}
// )


p.then(function resolved(v) {
	log(1, v)
	return v
}).catch(function rejected(v) {
	warn(1, v)
	throw new Error('custom error')// catch 2
	return new Error('custom error')// then 2
}).then(function y(v) {
	log(2, v)
	return v
}).catch(function n(v) {
	warn(2, v)
	return v
})




new Promise(function(resolve, reject){
	resolve(1)// 只认可第一次的状态改变，以下都无法改变状态。
	resolve(2)
	resolve(3)
	reject(1)
}).then(log)


