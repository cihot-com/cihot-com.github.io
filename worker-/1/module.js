
let o={
	name:'module',
	version:Date.now()
};


importScripts('/lib/sha3.min.js');


console.log(shake_256('jinxidong', 16));