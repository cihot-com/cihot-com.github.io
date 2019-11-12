import {default as m2} from './d2/m2.js'

function def() {
	return 'function default'
}

let name = 'default'

export { name, m2, def }
export default { name, m2, def, _name:'default object' }
// export * from './d2/m2.js'


// let deep = 'DEEP'
// !function(){
// 	export {deep}
// }()