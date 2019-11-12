import Vue  from '/lib/vue.m.js'
import { TweenMax } from '/lib/tweenmax.m.js'
import jQuery from '/lib/jquery.m.js'
import DMP from '/lib/diff_match_patch.m.js'

let { log, warn, error } = console


window.dmp = new DMP()

// let r = dmp.diff_main('abc','abd')

// log(dmp.diff_commonPrefix('1234', '1234xyz'))// 头部吻合4个
// log(dmp.diff_commonSuffix('abcdef1234', '1234'))// 尾部吻合4个
// log(dmp.diff_commonOverlap_('xxx123456', '456xxx'))// 拼接吻合3个

// log(dmp.diff_halfMatch_('A345Z', 'a345z'))// ["A", "Z", "a", "z", "345"] 打散元素
// log(dmp.diff_halfMatch_('alpha\nbeta\nalpha\n', 'beta\nalpha\nbeta\n'))
// log(dmp.diff_linesToChars_('alpha\nbeta\nalpha\n', 'beta\nalpha\nbeta\n'))
// log(dmp.diff_linesToChars_('a', 'b'))

// window.main = dmp.diff_main('A345Z', 'a345z')

// log(main)
// log(dmp.diff_text1(main))
// log(dmp.diff_text2(main))
// log(dmp.diff_toDelta(main))
// log(dmp.diff_xIndex(main, 2))


window.main = dmp.diff_main('A3456789Z', 'a3456789z',true)
log(main)
// let sockets = [];
// new Vue({
// 	el: '#connection',
// 	data: {
// 		url: 'wss:/test.cihot.com',
// 	},
// 	methods: {
// 		connect() {
// 			let v;
// 			let s = new WebSocket(this.url);
// 			s.onopen = function (...e) {
// 				console.log(...e);
// 				let div = document.createElement('div');
// 				div.innerHTML = `<label>type:<input v-model="type" type="text"></label><label>data:<input v-model="data" type="text" @keydown="emit"></label><button @click="emit">emit</button><strong>{{id}}</strong><p>{{msg}}</p>`;
// 				document.querySelector('#sockets').appendChild(div)
// 				v = new Vue({
// 					el: div,
// 					data: {
// 						type: '',
// 						data: '',
// 						msg: '',
// 					},
// 					computed: {
// 						id() {
// 							return s.id;
// 						}
// 					},
// 					methods: {
// 						emit(e) {
// 							if (e.type === 'keydown' && e.keyCode !== 13) return false;
// 							s.send(this.type, this.data);
// 						}
// 					}
// 				});
// 				v.type = ['cmd', 'broadcast'][Math.floor(2 * Math.random())];// 类型中随机选择1个
// 			};
// 			s.onclose = function (...e) {
// 				console.log(...e);
// 				console.log(this.id + '@disconnect');
// 				setTimeout(() => {
// 					let div = v.$el;
// 					div.style.background = '#fcc';
// 					div.remove();
// 				}, 2000);
// 			};
// 			s.onerror = function (...e) {
// 				console.log(...e);
// 			};
// 			s.onmessage = function (...e) {
// 				console.log(...e);
// 				// console.log(this.id + '@message', m);
// 				v.msg = e;
// 			};
// 			sockets.push(s);
// 		}
// 	}
// });

// let path, opt, msg, vue;
// opt = {
// 	forceNew: true,
// 	transports: ['websocket'],
// 	path,
// 	reconnection: false,
// 	autoConnect: true,
// 	// 没有下述参数
// 	// query: {pass: '*PASS', }
// };


// // query 用?key=value&key=value发送
// () => {
// 	let s;
// 	s = io('/?auth=ddb#hash', opt);
// 	// s.open()      s.connect()
// 	// s.close()     s.disconnect()
// 	// 已触发下列事件
// 	s.on('connect', function () { console.warn(`${s.id}@connect`, this.id) });
// 	s.on('disconnect', (...e) => console.warn(e));// "transport close" 或 "io server disconnect"
// 	s.on('message', (...m) => console.log(`${s.id}@message`, ...m));
// 	s.on('error', (...e) => console.warn(e));
// 	s.on('ping', () => console.log(`${s.id}@ping`));
// 	s.on('pong', () => console.log(`${s.id}@pong`, Date.now() - s.now, s.now = Date.now()));
// 	// 未触发下列事件
// 	// s.on('open',(...e)=>console.warn(e));
// 	// s.on('connection',(...e)=>console.warn(e));
// 	// s.on('close',(...e)=>console.warn(e));
// 	// s.on('disconnection',(...e)=>console.warn(e));
// }


// // 自称黑名单，断开连接。
// () => {
// 	let s;
// 	s2 = io('/?deny=1', opt);
// 	s2.on('connect', function () {
// 		console.warn(`${s.id}@connect`);
// 	});
// 	s2.on('disconnect', function (signal) {
// 		console.warn(`${this.id || 'deny'}@disconnect`, signal);
// 	});
// 	s2.on('error', function (...e) {
// 		console.log(`${this.id}@error`, ...e);
// 	});
// 	s2.on('message', function (...m) {
// 		console.log(`${this.id}@message`, ...m);
// 	});
// }


// // 向服务器发送一条消息，返回验证相同消息，客户端断开连接
// () => {
// 	let s;
// 	s = io('/?auth=admin', opt);
// 	s.msg = 'messageTest';
// 	s.on('message', function (m) {
// 		if (this.msg === m && this.connected) {
// 			console.log('测试消息成功', this.id, this.disconnect().connected ? '依然连接' : '已断开');
// 		} else {
// 			console.error('测试消失不一致');
// 		}
// 	});
// 	s.on('connect', function () {
// 		console.warn('s@connect', this.id);
// 		this.send(this.msg);
// 	});
// }

// // // 对s进行私聊
// // s4 = io('/?auth=s4', opt);
// // s4.on('connect', function(){
// // 	this.emit('tomessage', s.id, 'ToMessage');
// // });



// // 用户验证
// // 进入房间
// // 房间聊天
// // 退出房间
// // 私聊
// // 广播
// // 上线
// // 下线
// // 频道人数，房间人数，好友人数


// // opt.path         路径

// // 命名空间(namespace)
// // 客户端
// // io(namespace, option)
// // io('https://test.cihot.com:443/namespace?token=ooo', opt)     全写
// // io('/nsp?token=ooo', opt)                                     可以省略协议域名端口

// // 服务端
// // io().of('/namespace').on('connect',socket=>{});


// // 
// // ()=>
// !function () {
// 	let ta, timeout, href, delaySave;
// 	ta = document.querySelector('#s_cmd');
// 	href = location.href;
// 	delaySave = (text) => {
// 		clearTimeout(timeout);
// 		setTimeout(() => {
// 			localStorage.setItem(href, text);
// 			console.log('delaySave', href, text);
// 		}, 5000);
// 	};
// 	ta.onkeydown = function (e) {
// 		if (e.keyCode === 13 && e.ctrlKey && ta.value.trim().length) {
// 			e.preventDefault();
// 			s.send('cmd', ta.value);
// 		}
// 	};
// 	ta.value = localStorage.getItem(href);
// }


// // 退出前保存
// // ()=>
// {
// 	window.addEventListener('beforeunload', function (e) {
// 		localStorage.setItem('beforeunload', new Date().toLocaleString(), function () {
// 			console.log(1)
// 		})
// 		// e.returnValue = '停止信息';
// 	});
// 	// 读取上一次关闭时间
// 	console.log(localStorage.getItem('beforeunload'));
// }


// // 用于同时对好几个对象进行相同的读写操作   link(a,b,c).name
// function link(...objects) {
// 	objects = objects.filter(e => {
// 		let type = typeof e;
// 		return (type === 'object' && e) || type === 'function';
// 	});
// 	return new Proxy(Object.create(null), {
// 		get(o, k, p) {
// 			let result = objects.map(e => Reflect.get(e, k));
// 			result._proxy = p;
// 			result._objects = objects;
// 			return result;
// 		},
// 		set(o, k, v, p) {
// 			objects.forEach(e => Reflect.set(e, k, v));
// 		}
// 	});
// }