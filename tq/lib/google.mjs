function google(q, tl) {
	return new Promise(function(y,n)){
		let url = `https://cihot.com/google/?q=${encodeURIComponent(q)}&tl=${encodeURIComponent(tl)}`;
		let xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.responseType = 'application/json';
		xhr.onload = function (e) {
			y(xhr.result);
		}
		xhr.onabort = xhr.onxhr.onerror = function () {
			y([]);
		}
		xhr.send();
	}
}

export { google };