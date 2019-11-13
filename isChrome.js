function isChrome() {
	return Boolean(typeof chrome === 'object' && chrome.csi && navigator.userAgent.indexOf('Chrome') >= 0 && navigator.userAgent.indexOf('OPR')===-1);
};
if(!isChrome()) location.replace('/chrome.html');