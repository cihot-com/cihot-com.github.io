function sum(...args) {
  return args.reduce((r,e)=>r+e);
}

p=new Proxy(sum, {
  apply: function(f, thisArg, args) {
    let res=f(...args);


    console.log('<apply>', thisArg, f.name,'(', ...args,')', '结果为', res);

    if(thisArg) thisArg.sum=res;

    return res;
  }
});


let o={name:'金熙栋'};

console.log(p.bind(o)(1,2,3,4,5));
console.log(o);