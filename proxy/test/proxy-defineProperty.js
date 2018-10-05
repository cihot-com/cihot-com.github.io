let o={
  x:1,
  y:2,
};


let p=new Proxy(o, {
  defineProperty: function(o, k, desc, p) {
    let res=Object.defineProperty(o,k,desc);// return o

    console.log('defineProperty', k, desc, res);
    return true;
  }
});

var desc = {
  configurable: true,
  enumerable: true,
  value: 200,
  writable: true,
};



p.z=100;// 等同于 desc={ value: 100, writable: true, enumerable: true, configurable: true }

Object.defineProperty(p,'w',desc);
p.w=9
// Object.defineProperty(p, 'z', desc);

console.log(o);





{
	let o={}
	Object.defineProperty(o,'q',{value:400,configurable:true,enumerable:true});
	Object.defineProperty(o,'q',{configurable:true});

	// 只要有{configurable:true}，就可以重新定义。
	Object.defineProperty(o,'q',{value:200,writable:true,enumerable:true});
	console.log(o);
}

