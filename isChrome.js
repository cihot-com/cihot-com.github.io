// 20191211 DDB
function isChrome() {
	if (navigator) {
		const plugins = navigator.plugins
		const regExp = /^Chrome[\s\S]+ PDF\b/i
		if (plugins) {
			for (let i = 0, len = plugins.length; i < len; i++) {
				if (regExp.test(plugins.item(i).name)) {
					return true
				}
			}
		}
	}
	return false
}

if (!isChrome()) {
	location.replace('/chrome.html')
}
