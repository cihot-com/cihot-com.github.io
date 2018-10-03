let o={
  x:1,
  y:2,
};


let p=new Proxy(o, {
  defineProperty: function(o, k, desc) {
    console.log(k);
    // return false;
    return true;
  }
});

var desc = {
  configurable: true,
  enumerable: true,
  value: 10
};



p.z=100;

console.log(p.z);
console.log(o);
// Object.defineProperty(p, 'z', desc);

