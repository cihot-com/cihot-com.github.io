function tua(){
var userAgent = navigator.userAgent;
var isOpera = userAgent.indexOf("Opera") > -1;
var isIE = !isOpera && userAgent.indexOf("MSIE") > -1;
var isEdge = userAgent.indexOf("Edge") > -1;
var isFF = userAgent.indexOf("Firefox") > -1;
var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
var isChrome = !isEdge && !isSafari && userAgent.indexOf("Chrome") > -1;
var result = { isOpera:isOpera, isIE:isIE, isEdge:isEdge, isFF:isFF, isSafari:isSafari, isChrome:isChrome }
return result
}