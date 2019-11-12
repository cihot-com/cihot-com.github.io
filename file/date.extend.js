Date.prototype.toNormalString = function (dateSeparator = '-', timeSeparator = ':', separator = ' ') {
	return this.toNormalDateString(dateSeparator) + separator + this.toNormalTimeString(timeSeparator);
}
Date.prototype.toNormalDateString = function (separator = '-') {
	return String(this.getFullYear()).padStart(4, '0') + separator + String((this.getMonth() + 1)).padStart(2, '0') + separator + String(this.getDate()).padStart(2, '0');
}
Date.prototype.toNormalTimeString = function (separator = ':') {
	return String(this.getHours()).padStart(2, '0') + separator + String(this.getMinutes()).padStart(2, '0') + separator + String(this.getSeconds()).padStart(2, '0');
}

