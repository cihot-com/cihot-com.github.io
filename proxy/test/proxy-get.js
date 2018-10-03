let useDebug=true;

function O(name,age){
    this.name=name;
    this.age=age;
}
O.prototype.say=function(){
    return '我叫'+this.name;
};


let o=new O('金熙栋',19831014);

let p=new Proxy(o, {
    get:function(o, key, proxy){
        let value=o[key];
        let valueType=typeof value;
        console.log('<读取>',key,'为',value,`(${valueType}类型)`);

        // if(value===undefined) throw new ReferenceError(`没有 o.${key}`);// 可以没有时报错
        return value;
    },
    // get:function(tar,k,p){
    //     // this 就是h。这个。
    //     let v=tar[k];
    //     let vType=typeof v;
    //     if(useDebug){
    //         console.group('读');
    //         // console.log('对象',tar);
    //         console.log('键',k);
    //         console.log('值',v);
    //         console.log('类型',vType);
    //         console.log(Object.getOwnPropertyDescriptor(tar,k));
    //         console.groupEnd('读');
    //     }
    //     // return vType==='function' ? v.bind(tar): v;
    //     return v;
    // }
});

console.log(p.name);
console.log(p.say());
