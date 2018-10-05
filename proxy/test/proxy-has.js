let o={
    a:10, b:11
};


let p=new Proxy(o, {
    has:function(o, key){
        let res=key in o;
        return res;
    }
});


console.log('a' in p);

Object.preventExtensions(o);
console.log('c' in p);