function cacheFile(url) {
	let urls = cacheFile.urls

	return new Promise((resolve, reject) => {
		let urls, q;
		urls = cacheFile.urls
		// cached
		if (urls.hasOwnProperty(url)) {
			return resolve(Object.assign({ url }, urls[url]))
		}
		// not cached
		q = new XMLHttpRequest()
		q.open('GET', url, true)
		q.onloadend = (e) => {
			if (q.readyState == 4) {
				if (q.status == 200 || q.status == 304) {
					urls[url] = {}

					let blob, objectURL;
					blob = urls[url].blob = cacheFile.toBlob(q.responseText)
					objectURL = urls[url].objectURL = cacheFile.toURL(blob)

					return resolve({ url, blob, objectURL })
				} else {
					return reject({ error: q.status })
				}
			}
		}
		q.send(null)
		setTimeout(reject, 5000)
	})
}

Object.defineProperty(cacheFile, 'urls', {
	value: {},
	enumerable: true,
});

Object.defineProperty(cacheFile, 'toBlob', {
	value: (code, type = 'text/javascript') => {
		return new Blob([code], { type })
	}
});
Object.defineProperty(cacheFile, 'toURL', {
	value: (blob) => {
		if (!(blob instanceof Blob)) cacheFile.toBlob(blob)
		return URL.createObjectURL(blob)
	}
});


