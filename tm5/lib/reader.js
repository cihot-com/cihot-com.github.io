function reader(file, batch=2097152) {
	reader = new FileReader();
	let value = option.val();
	if (method.update) {
		let start = 0;
		let total = file.size;
		let current = method;
		reader.onload = function (event) {
			try {
				current = current.update(event.target.result, value);
				asyncUpdate();
			} catch (e) {
				output.val(e);
			}
		};
		let asyncUpdate = function () {
			if (start < total) {
				output.val('hashing...' + (start / total * 100).toFixed(2) + '%');
				let end = Math.min(start + batch, total);
				reader.readAsArrayBuffer(file.slice(start, end));
				start = end;
			} else {
				output.val(current.hex());
			}
		};
		asyncUpdate();
	} else {
		output.val('hashing...');
		reader.onload = function (event) {
			try {
				output.val(method(event.target.result, value));
			} catch (e) {
				output.val(e);
			}
		};
		reader.readAsArrayBuffer(file);
	}
}
