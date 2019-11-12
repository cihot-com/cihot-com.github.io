const { log, warn, error, count, assert } = console

let dmp = new diff_match_patch();
dmp.Diff_Timeout = 0;

let obj = {
	temp: {},
	el: '#app',
	data: {
		timeout: dmp.Diff_Timeout,
		editcost: dmp.Diff_EditCost,
		text1: '★4 영웅 장비 세트(적중) 6부위를 전부 획득할 수 있습니다.',
		text2: '★4 영웅 장비 세트(집중) 6부위를 전부 획득할 수 있습니다.',
		text3: '',
		cleanupSemantic: true,
		cleanupEfficiency: false,
	},
	computed: {
		main() {
			let v = dmp.diff_main(this.text1, this.text2)// diffs
			if (this.cleanupSemantic) dmp.diff_cleanupSemantic(v)
			if (this.cleanupEfficiency) dmp.diff_cleanupEfficiency(v)
			return v
		},
		prettyHtml() {
			return dmp.diff_prettyHtml(this.main)// html
		},
		levenshtein() {
			return dmp.diff_levenshtein(this.main)// int
		},
		make() {
			return dmp.patch_make(this.main)// patches
			// dmp.patch_make(this.text1, this.text2)
			// dmp.patch_make(this.text1, this.main)

		},
		toText() {
			return dmp.patch_toText(this.make)// text
		},
		fromText() {
			return dmp.patch_fromText(this.toText)// patches
		},
		apply() {
			return dmp.patch_apply(this.make, this.text1)// [text2, result]
		},
		text4() {
			return dmp.patch_apply(this.make, this.text3)[0]
		}
	},
	methods: {
		onclick(e) {
			dmp[e.target.value](this.main)
			return false
		}
	},
	watch: {
		timeout: {
			handler(nv, ov) {
				dmp.Diff_Timeout = parseFloat(nv);
			},
			immediate: true,
			deep: false
		},
		editcost: {
			handler(nv, ov) {
				dmp.Diff_EditCost = parseFloat(nv);
			},
			immediate: true,
			deep: false
		},
		text3: {
			handler(nv, ov) {
				let args = [nv, this.text4]
				Reflect.apply(dr, this, args);
			}
		},
		text4: {
			handler(nv) {
				let args = [this.text3, nv]
				Reflect.apply(dr, this, args);
			}
		}
	}
};


let v = new Vue(obj);

function dr(a, b) {
	log(dmp.diff_main(a, b))
}


