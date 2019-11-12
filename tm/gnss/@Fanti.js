let { log, warn } = console

let path = require('path')
let o = require('../index.js')
global.term = o.term
global.toCN = global.jianti = o.toCN
global.toTW = global.fanti = o.toTW

o = require('./term.js')

// 使用上面的定义，进行最终的简体繁体转换。


// 读取文件
const fs = require('fs')
var dirname = 'D:\\Downloads/'
var filenames = fs.readdirSync(dirname)

filenames = filenames.filter(function (filename) {
  return /(?<!\.NAN)\.txt$/.test(filename)
})

log(filenames)

function read(path, n) {
  let ret = ''// 文本内容处理结果
  // log(path)    //filename
  var text = fs.readFileSync(path, { flag: 'r', encoding: 'ucs2' })
  // 内容按换行分为row
  text.split(/\r\n|\n/).forEach((row)=>{
    let a = row.split('\t')
    if(a.some(e=>e)) {
      if(a[1] && a[1].length) {
        a[1] = fanti(a[1])// 仅对翻译内容进行繁体转换
      }
      ret += a.join('\t')+'\r\n'
    }
  })
  return ret;
}

filenames.forEach(function (filename, index) {
  let data = read(dirname + filename)
  // log(data)
  // fs.writeFileSync(dirname+filename.replace('.txt','.NAN.txt'), data, {encoding:'ucs2'})
  fs.writeFileSync(dirname + filename, data, { encoding: 'ucs2' })
  log(index, filename)
})
