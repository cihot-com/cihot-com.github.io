const { log } = console

let data = 
{
	bindTitle: 'v-vind:title',
	checkbox: false,
	b: true,
	dict:[
		{source:'nihao',target:'你好'},
		{source:'wohao',target:'我好'},
		{source:'dajiahao',target:'大家好'},
	],
	rows: [
		{name:'A'},
		{name:'B'},
		{name:'C'},
		{name:'D'},
		{name:'E'},
	],
	v1: 1,
}


let v = new Vue({
	el: '#app', 
	data,
	computed: {
		checked() {
			return this.checkbox
		},
		checkboxDescription(){
			return this.checked ? '已关灯' : '已开灯'
		},
		st(){
			return this.dict.map(e=>e)
		},
		v2(){
			log('v2')
			return this.v1+'->'+2
		}
	},
	watch:{
		checked(nv, ov,o){
			document.body.classList[nv?'add':'remove']('black')
		},
		v1(){
			log(this.v2)
		}
	},
	methods:{
		submit(){
			this.v1
			log(1)
		}
	}
})

// let i = 0
// while(i++<1000){
// 	v.dict.push({source: Math.random().toString('36'), target: Math.random().toString('36')})
// }


function getRows(n=0){
	return [
		{ name:'a-' + n },
		{ name:'b-' + n },
		{ name:'c-' + n },
		{ name:'d-' + n },
		{ name:'e-' + n },
	]
}

