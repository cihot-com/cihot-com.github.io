// 退出前保存
// ()=>
window.addEventListener('beforeunload', function (e) {
	// 最后退出时间
	localStorage.setItem('lastOnlineTime', Date.now())
	// e.returnValue = '停止信息';
});
// 读取上一次关闭时间
console.log(localStorage.getItem('beforeunload'));