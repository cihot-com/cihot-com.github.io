let x={x:1};
let y={y:2};
let z={z:3,x:111};


console.log(Object.assign(x,y,z));

console.log(x);// { x: 111, y: 2, z: 3 }
console.log(y);// { y: 2 }
console.log(z);// { z: 3, x: 111 }
console.log(x.__proto__);


let r=Object.create(null);
Object.assign(r,x,y,z);
console.log(r);
console.log(r.__proto__);

