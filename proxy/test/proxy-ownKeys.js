let o={
    a:10, b:11
};


let p=new Proxy(o, {
    ownKeys:function(o){
        return ['a','c'];
        return [1, .1, true, false, undefined, null, {}, [] ];// TypeError
        return false;
    }
});


// for(let i in p){
//     console.log(i, p[i]);
// }


console.log(Object.keys(p));
console.log(Object.getOwnPropertyNames(p));
console.log(Object.getOwnPropertySymbols(p));
