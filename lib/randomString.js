"use strict"
function randomString(len=10, prefix='') {
	let ret = Math.random().toString(36).slice(2);
	ret = prefix+ret;
	let length = ret.length;
	if(length<len) {
		return randomString(len, ret);
	}else if(length>len) {
		return ret.substr(0,len);
	}
	return ret;
}