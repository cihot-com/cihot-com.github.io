(function (){
  function O(name='金熙栋'){
    this.name=name;
  };

  this.O=new Proxy(O, {
    construct:function(O,args){
      let instance=new O(...args);

      console.log('<construct> new ', O.name, '(',...args,')');
      
      return instance;
    }
  });
})(this);

let o=new O('金小情');

console.log(o);

new O();