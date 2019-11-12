addEventListener('message', (e) => {
	let { data:d } = e;

	if (typeof d === 'object' && d !== null) {

		let { messageId, data } = d
		postMessage({
			messageId,
			data: JSON.stringify(data),
		})
	}

});


let i = 0;
while(i++) {
	if(i%10===0) console.log(name, i);
}