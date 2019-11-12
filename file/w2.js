// 每1秒钟制写出一个内容
let prefix = rand()+rand()

setInterval(() => {
  this.postMessage(prefix + '-' + Math.random())
}, 1000);

function rand(){
  return String.fromCharCode('A'.charCodeAt(0) + 26 * Math.random())
}