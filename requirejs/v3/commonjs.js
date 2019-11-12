define(function (require, exports, module) {

	function cmd(...s) {
		console.log('cmd>', ...s)
	}
	module.exports = cmd
})