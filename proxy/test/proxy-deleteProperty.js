let o={
  name:'金熙栋',
  age:19831014,
}

var p = new Proxy(o, {
  deleteProperty: function(o, k) {
    let res=delete o[k];
    console.log( (res?'已':'未能')+'删除', k);
    return res;
  }
});




console.log(o);
console.log(delete p.age);
console.log(o);


