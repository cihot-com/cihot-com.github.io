var arr = [1, [[2, 3], 4], [[5], 6,7]];


function* flat(a) {
	var length = a.length;
	for (var i = 0; i < length; i++) {
		var item = a[i];

		if (typeof item !== 'number') {
			yield* flat(item);
		} else {
			yield item;
		}
	}
}

function* oflat(a, level=0) {
	var length = a.length;
	for (var i = 0; i < length; i++) {
		var item = a[i];

		if (typeof item !== 'number') {
			yield* oflat(item, level+1);
		} else {
			yield {item,level};
		}
	}
}


function* flatRight(a) {
	let i = a.length;
	while (0 <= (--i)) {
		let item = a[i];
		if (Array.isArray(item)) {
			yield* flatRight(item);
		} else {
			yield item;
		}
	}
}


function* oflatRight(a, level=0) {
	let i = a.length;
	while(0 <= (--i)) {
		let item = a[i]
		if (Array.isArray(item)) {
			yield* oflatRight(item, level+1);
		} else {
			yield {item, level};
		}
	}
}



let a = []
for (let f of oflatRight(arr)) {
	// console.log(f)
	a.push(f)
}

console.log(a)
