import is1 from './s1.js';// export default {}
// console.log(is1)// 只有default，没有单独export的内容。



// name没有被单独export过，所以报错！
import { sex } from './s1.js'
// console.log(sex)


import * as is1_2 from './s1.js';
// console.log(is1_2)// Module
// for(let k in is1_2) {
	// console.log(k, is1_2[k])
// }

// let is1_2 = 1// 报错，已经被定义

// console.log('---', this)

export * from './s1.js'
export default { sex }
// import o from './s2.js'      o === { sex }
