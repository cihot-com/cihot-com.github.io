let arr = [
	'ccccc',
	'bccccc4',
	'abc',
	'abx',
	'ab',
	'ax',
	'a',
	'b',
	'bx',
	'bb',
]


arr.sort(function (a,b){
	let al=a.length, bl=b.length;
	if(al>bl) {
		return -1;
	}else if(al<bl) {
		return 1;
	}else{
		if(a>b) {
			return 1;
		}else if(a<b){
			return -1;
		}else{
			return 0;
		}
	}
});


console.log(arr);
