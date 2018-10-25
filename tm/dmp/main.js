let dmp = new diff_match_patch();
let obj = {
	el: '#app',
	data: {
		timeout: 1,
		text1: 'abc',
		text2: 'cba',
		rows: '',
		dmp_1: new diff_match_patch(),
		dmp_2: new diff_match_patch(),
	},
	computed: {
		main: function () {
			let v = dmp.diff_main(this.text102, this.text202);
			console.log('diff_main', this.text102, this.text202, JSON.stringify(v));
			return v;
		},
		patches: function () {
			let v = dmp.patch_make(this.text102, this.text202);
			return v;
		},
		html: function () {
			let v = dmp.diff_prettyHtml(this.main);
			return v;
		},
		length_1(){
			return this.text1.length;
		},
		length_2(){
			return this.text2.length;
		},
		text103() {
			let a=this.text102;
			let b=this.text202;
			if(a.length===0||b.length===0) return '';
			let dmp = new diff_match_patch();
			let main = dmp.diff_main(b,a);
			let html = dmp.diff_prettyHtml(main);
			console.log(html);
			return html;
		},
		text203() {
			let a = this.text102;
			let b = this.text202;
			if(a.length===0||b.length===0) return '';
			let dmp = new diff_match_patch();
			let main = dmp.diff_main(a,b);
			return dmp.diff_prettyHtml(main);
		},
		text104(){
			let a = this.text102;
			let b = this.text202;
			if (a.length === 0 || b.length === 0) return '';
			let dmp = new diff_match_patch();
			let main = dmp.diff_main(b, a);
			return JSON.stringify(main);
		},
		text204() {
			let a = this.text102;
			let b = this.text202;
			if (a.length === 0 || b.length === 0) return '';
			let dmp = new diff_match_patch();
			let main = dmp.diff_main(a, b);
			return JSON.stringify(main);
		},
		diff_main_1(){
			
		},
		diff_main_2(){},
		diff_cleanupSemantic_1(){

		}
	},
	watch: {
		timeout: {
			handler(n, o) {
				dmp.Diff_Timeout = parseFloat(n);
				console.log('timeout', n, o);
			},
			immediate: true,
			deep: false
		},

		// text102: {
		// 	handler(n) {

		// 		console.log(n)
		// 		dr.bind(this)();
		// 	}
		// },
		// text202: {
		// 	handler(n) {
		// 		dr.bind(this)();
		// 	}
		// }
	},
	methods: {
		onInput(e){
			console.log(e.target);
		}
	}
};

dmp.Diff_Timeout = 0;
let v = new Vue(obj);

function dr(a,b) {
	let res = [];
	if (a.length == 0 || b.length == 0) {
		return res;
	}
	a = String(a).split('\n');
	b = String(b).split('\n');
	if (a.length !== b.length) {
		return res;
	}
	a.forEach((e, i) => res.push(dmp.diff_main(e, b[i]).filter(e => e[0] !== 0).map(e => e[1])));
	v.rows = res.join('\n');
	return res;
}


let test = localforage.createInstance('test');
test.getItem('text1').then(e=>{
	if(typeof e==='string') v.text1=e;
});
test.getItem('text2').then(e=>{
	if(typeof e==='string') v.text2=e;
});

