import{H as e,I as r,J as t,K as n}from"./index-fd32b983.js";function a(e,r){if(void 0===e.inserted[r.name])return e.insert("",r,e.sheet,!0)}function s(e,t,n){var a=[],s=r(e,a,n);return a.length<2?n:s+t(a)}var i=function e(r){for(var t="",n=0;n<r.length;n++){var a=r[n];if(null!=a){var s=void 0;switch(typeof a){case"boolean":break;case"object":if(Array.isArray(a))s=e(a);else for(var i in s="",a)a[i]&&i&&(s&&(s+=" "),s+=i);break;default:s=a}s&&(t&&(t+=" "),t+=s)}}return t};var o=function(o){var f=e(o);f.sheet.speedy=function(e){this.isSpeedy=e},f.compat=!0;var c=function(){for(var e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a];var s=t(r,f.registered,void 0);return n(f,s,!1),f.key+"-"+s.name};return{css:c,cx:function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return s(f.registered,c,i(r))},injectGlobal:function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];var s=t(r,f.registered);a(f,s)},keyframes:function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];var s=t(r,f.registered),i="animation-"+s.name;return a(f,{name:s.name,styles:"@keyframes "+i+"{"+s.styles+"}"}),i},hydrate:function(e){e.forEach((function(e){f.inserted[e]=!0}))},flush:function(){f.registered={},f.inserted={},f.sheet.flush()},sheet:f.sheet,cache:f,getRegisteredStyles:r.bind(null,f.registered),merge:s.bind(null,f.registered,c)}}({key:"css"});o.flush,o.hydrate,o.cx,o.merge,o.getRegisteredStyles,o.injectGlobal,o.keyframes;var f=o.css;o.sheet,o.cache;export{f as c};