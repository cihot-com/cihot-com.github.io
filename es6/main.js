import { sub, m1, m2 } from "./sub.js";
import { name } from './m2.js';
import subs from './sub.js';// default

console.log('"sub"',      sub)
console.log('"m1"',       m1)
console.log('"name"',     name)
console.log('"subs"',     subs)
console.log('"this"',     this)
console.log('"window"',   window)
console.log('"document"', document)

window.subs = subs// 让其他<script type="module"></script>可以访问到



import { wk } from './worker.js'

window.wk = wk


wk().then(w=>{
	window.w=w
	window.w.postMessage({a:1}, function(...e){ console.log('ack', e) })
})

// console.log(wk(), wk()	)