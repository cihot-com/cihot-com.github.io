import def from "./d/default.js";

let { log } = console


log(def)


import * as m1 from "./d/m1.js";
log(m1)// {v, a, b, c}

import m1_def from "./d/m1.js";
log(m1_def)
log(m1_def.f())



// import * as mm from './d/default.js'// mm是所有export内容，其中就有default输出
import mm from './d/default.js'// mm只是default
log(mm)

// import('/lib/jquery.min.js').then((jQuery) => log('jquery done', jQuery))


// 可以访问
// log(window, document.body)



import jQuery from '/lib/jquery.m.js'
$('<div>').text('jQuery测试').appendTo('body')


import similarText from "/lib/similartext.m.js";
top.similarText = similarText
$('<div></div>').text('similar测试'+ similarText('你好','大家好',true)).appendTo('body')




import diff_match_patch from '/lib/diff_match_patch.m.js'
let dmp = new diff_match_patch()
let diff = dmp.diff_main('中国人','中华人民共和国')
log(diff)
$('<div></div>').text('dmp测试'+ JSON.stringify(diff)).appendTo('body')

// top.diff_match_patch = diff_match_patch

