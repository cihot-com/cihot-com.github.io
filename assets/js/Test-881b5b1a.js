import{r as e,z as t,D as n,i as r,k as o,R as s,j as i,b as a,w as c,e as u,d as l}from"./index-d2e29b82.js";function f(e,t){return function(){return e.apply(t,arguments)}}const{toString:d}=Object.prototype,{getPrototypeOf:p}=Object,h=(m=Object.create(null),e=>{const t=d.call(e);return m[t]||(m[t]=t.slice(8,-1).toLowerCase())});var m;const g=e=>(e=e.toLowerCase(),t=>h(t)===e),y=e=>t=>typeof t===e,{isArray:b}=Array,w=y("undefined");const E=g("ArrayBuffer");const O=y("string"),S=y("function"),v=y("number"),R=e=>null!==e&&"object"==typeof e,x=e=>{if("object"!==h(e))return!1;const t=p(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)},A=g("Date"),T=g("File"),j=g("Blob"),N=g("FileList"),C=g("URLSearchParams");function P(e,t,{allOwnKeys:n=!1}={}){if(null==e)return;let r,o;if("object"!=typeof e&&(e=[e]),b(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const o=n?Object.getOwnPropertyNames(e):Object.keys(e),s=o.length;let i;for(r=0;r<s;r++)i=o[r],t.call(null,e[i],i,e)}}function _(e,t){t=t.toLowerCase();const n=Object.keys(e);let r,o=n.length;for(;o-- >0;)if(r=n[o],t===r.toLowerCase())return r;return null}const D="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:global,U=e=>!w(e)&&e!==D;const F=(B="undefined"!=typeof Uint8Array&&p(Uint8Array),e=>B&&e instanceof B);var B;const L=g("HTMLFormElement"),k=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),z=g("RegExp"),I=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};P(n,((n,o)=>{!1!==t(n,o,e)&&(r[o]=n)})),Object.defineProperties(e,r)},q="abcdefghijklmnopqrstuvwxyz",M="0123456789",H={DIGIT:M,ALPHA:q,ALPHA_DIGIT:q+q.toUpperCase()+M};const V={isArray:b,isArrayBuffer:E,isBuffer:function(e){return null!==e&&!w(e)&&null!==e.constructor&&!w(e.constructor)&&S(e.constructor.isBuffer)&&e.constructor.isBuffer(e)},isFormData:e=>{let t;return e&&("function"==typeof FormData&&e instanceof FormData||S(e.append)&&("formdata"===(t=h(e))||"object"===t&&S(e.toString)&&"[object FormData]"===e.toString()))},isArrayBufferView:function(e){let t;return t="undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&E(e.buffer),t},isString:O,isNumber:v,isBoolean:e=>!0===e||!1===e,isObject:R,isPlainObject:x,isUndefined:w,isDate:A,isFile:T,isBlob:j,isRegExp:z,isFunction:S,isStream:e=>R(e)&&S(e.pipe),isURLSearchParams:C,isTypedArray:F,isFileList:N,forEach:P,merge:function e(){const{caseless:t}=U(this)&&this||{},n={},r=(r,o)=>{const s=t&&_(n,o)||o;x(n[s])&&x(r)?n[s]=e(n[s],r):x(r)?n[s]=e({},r):b(r)?n[s]=r.slice():n[s]=r};for(let o=0,s=arguments.length;o<s;o++)arguments[o]&&P(arguments[o],r);return n},extend:(e,t,n,{allOwnKeys:r}={})=>(P(t,((t,r)=>{n&&S(t)?e[r]=f(t,n):e[r]=t}),{allOwnKeys:r}),e),trim:e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""),stripBOM:e=>(65279===e.charCodeAt(0)&&(e=e.slice(1)),e),inherits:(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},toFlatObject:(e,t,n,r)=>{let o,s,i;const a={};if(t=t||{},null==e)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)i=o[s],r&&!r(i,e,t)||a[i]||(t[i]=e[i],a[i]=!0);e=!1!==n&&p(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:h,kindOfTest:g,endsWith:(e,t,n)=>{e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return-1!==r&&r===n},toArray:e=>{if(!e)return null;if(b(e))return e;let t=e.length;if(!v(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},forEachEntry:(e,t)=>{const n=(e&&e[Symbol.iterator]).call(e);let r;for(;(r=n.next())&&!r.done;){const n=r.value;t.call(e,n[0],n[1])}},matchAll:(e,t)=>{let n;const r=[];for(;null!==(n=e.exec(t));)r.push(n);return r},isHTMLForm:L,hasOwnProperty:k,hasOwnProp:k,reduceDescriptors:I,freezeMethods:e=>{I(e,((t,n)=>{if(S(e)&&-1!==["arguments","caller","callee"].indexOf(n))return!1;const r=e[n];S(r)&&(t.enumerable=!1,"writable"in t?t.writable=!1:t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")}))}))},toObjectSet:(e,t)=>{const n={},r=e=>{e.forEach((e=>{n[e]=!0}))};return b(e)?r(e):r(String(e).split(t)),n},toCamelCase:e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,(function(e,t,n){return t.toUpperCase()+n})),noop:()=>{},toFiniteNumber:(e,t)=>(e=+e,Number.isFinite(e)?e:t),findKey:_,global:D,isContextDefined:U,ALPHABET:H,generateString:(e=16,t=H.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n},isSpecCompliantForm:function(e){return!!(e&&S(e.append)&&"FormData"===e[Symbol.toStringTag]&&e[Symbol.iterator])},toJSONObject:e=>{const t=new Array(10),n=(e,r)=>{if(R(e)){if(t.indexOf(e)>=0)return;if(!("toJSON"in e)){t[r]=e;const o=b(e)?[]:{};return P(e,((e,t)=>{const s=n(e,r+1);!w(s)&&(o[t]=s)})),t[r]=void 0,o}}return e};return n(e,0)}};function J(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=(new Error).stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}V.inherits(J,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:V.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const W=J.prototype,K={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach((e=>{K[e]={value:e}})),Object.defineProperties(J,K),Object.defineProperty(W,"isAxiosError",{value:!0}),J.from=(e,t,n,r,o,s)=>{const i=Object.create(W);return V.toFlatObject(e,i,(function(e){return e!==Error.prototype}),(e=>"isAxiosError"!==e)),J.call(i,e.message,t,n,r,o),i.cause=e,i.name=e.name,s&&Object.assign(i,s),i};function G(e){return V.isPlainObject(e)||V.isArray(e)}function $(e){return V.endsWith(e,"[]")?e.slice(0,-2):e}function X(e,t,n){return e?e.concat(t).map((function(e,t){return e=$(e),!n&&t?"["+e+"]":e})).join(n?".":""):t}const Q=V.toFlatObject(V,{},null,(function(e){return/^is[A-Z]/.test(e)}));function Z(e,t,n){if(!V.isObject(e))throw new TypeError("target must be an object");t=t||new FormData;const r=(n=V.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,(function(e,t){return!V.isUndefined(t[e])}))).metaTokens,o=n.visitor||u,s=n.dots,i=n.indexes,a=(n.Blob||"undefined"!=typeof Blob&&Blob)&&V.isSpecCompliantForm(t);if(!V.isFunction(o))throw new TypeError("visitor must be a function");function c(e){if(null===e)return"";if(V.isDate(e))return e.toISOString();if(!a&&V.isBlob(e))throw new J("Blob is not supported. Use a Buffer instead.");return V.isArrayBuffer(e)||V.isTypedArray(e)?a&&"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}function u(e,n,o){let a=e;if(e&&!o&&"object"==typeof e)if(V.endsWith(n,"{}"))n=r?n:n.slice(0,-2),e=JSON.stringify(e);else if(V.isArray(e)&&function(e){return V.isArray(e)&&!e.some(G)}(e)||(V.isFileList(e)||V.endsWith(n,"[]"))&&(a=V.toArray(e)))return n=$(n),a.forEach((function(e,r){!V.isUndefined(e)&&null!==e&&t.append(!0===i?X([n],r,s):null===i?n:n+"[]",c(e))})),!1;return!!G(e)||(t.append(X(o,n,s),c(e)),!1)}const l=[],f=Object.assign(Q,{defaultVisitor:u,convertValue:c,isVisitable:G});if(!V.isObject(e))throw new TypeError("data must be an object");return function e(n,r){if(!V.isUndefined(n)){if(-1!==l.indexOf(n))throw Error("Circular reference detected in "+r.join("."));l.push(n),V.forEach(n,(function(n,s){!0===(!(V.isUndefined(n)||null===n)&&o.call(t,n,V.isString(s)?s.trim():s,r,f))&&e(n,r?r.concat(s):[s])})),l.pop()}}(e),t}function Y(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,(function(e){return t[e]}))}function ee(e,t){this._pairs=[],e&&Z(e,this,t)}const te=ee.prototype;function ne(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function re(e,t,n){if(!t)return e;const r=n&&n.encode||ne,o=n&&n.serialize;let s;if(s=o?o(t,n):V.isURLSearchParams(t)?t.toString():new ee(t,n).toString(r),s){const t=e.indexOf("#");-1!==t&&(e=e.slice(0,t)),e+=(-1===e.indexOf("?")?"?":"&")+s}return e}te.append=function(e,t){this._pairs.push([e,t])},te.toString=function(e){const t=e?function(t){return e.call(this,t,Y)}:Y;return this._pairs.map((function(e){return t(e[0])+"="+t(e[1])}),"").join("&")};const oe=class InterceptorManager{constructor(){this.handlers=[]}use(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){V.forEach(this.handlers,(function(t){null!==t&&e(t)}))}},se={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},ie={isBrowser:!0,classes:{URLSearchParams:"undefined"!=typeof URLSearchParams?URLSearchParams:ee,FormData:"undefined"!=typeof FormData?FormData:null,Blob:"undefined"!=typeof Blob?Blob:null},isStandardBrowserEnv:(()=>{let e;return("undefined"==typeof navigator||"ReactNative"!==(e=navigator.product)&&"NativeScript"!==e&&"NS"!==e)&&("undefined"!=typeof window&&"undefined"!=typeof document)})(),isStandardBrowserWebWorkerEnv:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&"function"==typeof self.importScripts,protocols:["http","https","file","blob","url","data"]};function ae(e){function t(e,n,r,o){let s=e[o++];const i=Number.isFinite(+s),a=o>=e.length;if(s=!s&&V.isArray(r)?r.length:s,a)return V.hasOwnProp(r,s)?r[s]=[r[s],n]:r[s]=n,!i;r[s]&&V.isObject(r[s])||(r[s]=[]);return t(e,n,r[s],o)&&V.isArray(r[s])&&(r[s]=function(e){const t={},n=Object.keys(e);let r;const o=n.length;let s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}(r[s])),!i}if(V.isFormData(e)&&V.isFunction(e.entries)){const n={};return V.forEachEntry(e,((e,r)=>{t(function(e){return V.matchAll(/\w+|\[(\w*)]/g,e).map((e=>"[]"===e[0]?"":e[1]||e[0]))}(e),r,n,0)})),n}return null}const ce={"Content-Type":void 0};const ue={transitional:se,adapter:["xhr","http"],transformRequest:[function(e,t){const n=t.getContentType()||"",r=n.indexOf("application/json")>-1,o=V.isObject(e);o&&V.isHTMLForm(e)&&(e=new FormData(e));if(V.isFormData(e))return r&&r?JSON.stringify(ae(e)):e;if(V.isArrayBuffer(e)||V.isBuffer(e)||V.isStream(e)||V.isFile(e)||V.isBlob(e))return e;if(V.isArrayBufferView(e))return e.buffer;if(V.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let s;if(o){if(n.indexOf("application/x-www-form-urlencoded")>-1)return function(e,t){return Z(e,new ie.classes.URLSearchParams,Object.assign({visitor:function(e,t,n,r){return ie.isNode&&V.isBuffer(e)?(this.append(t,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)}},t))}(e,this.formSerializer).toString();if((s=V.isFileList(e))||n.indexOf("multipart/form-data")>-1){const t=this.env&&this.env.FormData;return Z(s?{"files[]":e}:e,t&&new t,this.formSerializer)}}return o||r?(t.setContentType("application/json",!1),function(e,t,n){if(V.isString(e))try{return(t||JSON.parse)(e),V.trim(e)}catch(r){if("SyntaxError"!==r.name)throw r}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){const t=this.transitional||ue.transitional,n=t&&t.forcedJSONParsing,r="json"===this.responseType;if(e&&V.isString(e)&&(n&&!this.responseType||r)){const n=!(t&&t.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(o){if(n){if("SyntaxError"===o.name)throw J.from(o,J.ERR_BAD_RESPONSE,this,null,this.response);throw o}}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ie.classes.FormData,Blob:ie.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};V.forEach(["delete","get","head"],(function(e){ue.headers[e]={}})),V.forEach(["post","put","patch"],(function(e){ue.headers[e]=V.merge(ce)}));const le=ue,fe=V.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),de=Symbol("internals");function pe(e){return e&&String(e).trim().toLowerCase()}function he(e){return!1===e||null==e?e:V.isArray(e)?e.map(he):String(e)}function me(e,t,n,r,o){return V.isFunction(r)?r.call(this,t,n):(o&&(t=n),V.isString(t)?V.isString(r)?-1!==t.indexOf(r):V.isRegExp(r)?r.test(t):void 0:void 0)}class AxiosHeaders{constructor(e){e&&this.set(e)}set(e,t,n){const r=this;function o(e,t,n){const o=pe(t);if(!o)throw new Error("header name must be a non-empty string");const s=V.findKey(r,o);(!s||void 0===r[s]||!0===n||void 0===n&&!1!==r[s])&&(r[s||t]=he(e))}const s=(e,t)=>V.forEach(e,((e,n)=>o(e,n,t)));return V.isPlainObject(e)||e instanceof this.constructor?s(e,t):V.isString(e)&&(e=e.trim())&&!/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())?s((e=>{const t={};let n,r,o;return e&&e.split("\n").forEach((function(e){o=e.indexOf(":"),n=e.substring(0,o).trim().toLowerCase(),r=e.substring(o+1).trim(),!n||t[n]&&fe[n]||("set-cookie"===n?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)})),t})(e),t):null!=e&&o(t,e,n),this}get(e,t){if(e=pe(e)){const n=V.findKey(this,e);if(n){const e=this[n];if(!t)return e;if(!0===t)return function(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}(e);if(V.isFunction(t))return t.call(this,e,n);if(V.isRegExp(t))return t.exec(e);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=pe(e)){const n=V.findKey(this,e);return!(!n||void 0===this[n]||t&&!me(0,this[n],n,t))}return!1}delete(e,t){const n=this;let r=!1;function o(e){if(e=pe(e)){const o=V.findKey(n,e);!o||t&&!me(0,n[o],o,t)||(delete n[o],r=!0)}}return V.isArray(e)?e.forEach(o):o(e),r}clear(e){const t=Object.keys(this);let n=t.length,r=!1;for(;n--;){const o=t[n];e&&!me(0,this[o],o,e,!0)||(delete this[o],r=!0)}return r}normalize(e){const t=this,n={};return V.forEach(this,((r,o)=>{const s=V.findKey(n,o);if(s)return t[s]=he(r),void delete t[o];const i=e?function(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,((e,t,n)=>t.toUpperCase()+n))}(o):String(o).trim();i!==o&&delete t[o],t[i]=he(r),n[i]=!0})),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return V.forEach(this,((n,r)=>{null!=n&&!1!==n&&(t[r]=e&&V.isArray(n)?n.join(", "):n)})),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map((([e,t])=>e+": "+t)).join("\n")}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const n=new this(e);return t.forEach((e=>n.set(e))),n}static accessor(e){const t=(this[de]=this[de]={accessors:{}}).accessors,n=this.prototype;function r(e){const r=pe(e);t[r]||(!function(e,t){const n=V.toCamelCase(" "+t);["get","set","has"].forEach((r=>{Object.defineProperty(e,r+n,{value:function(e,n,o){return this[r].call(this,t,e,n,o)},configurable:!0})}))}(n,e),t[r]=!0)}return V.isArray(e)?e.forEach(r):r(e),this}}AxiosHeaders.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]),V.freezeMethods(AxiosHeaders.prototype),V.freezeMethods(AxiosHeaders);const ge=AxiosHeaders;function ye(e,t){const n=this||le,r=t||n,o=ge.from(r.headers);let s=r.data;return V.forEach(e,(function(e){s=e.call(n,s,o.normalize(),t?t.status:void 0)})),o.normalize(),s}function be(e){return!(!e||!e.__CANCEL__)}function we(e,t,n){J.call(this,null==e?"canceled":e,J.ERR_CANCELED,t,n),this.name="CanceledError"}V.inherits(we,J,{__CANCEL__:!0});const Ee=ie.isStandardBrowserEnv?{write:function(e,t,n,r,o,s){const i=[];i.push(e+"="+encodeURIComponent(t)),V.isNumber(n)&&i.push("expires="+new Date(n).toGMTString()),V.isString(r)&&i.push("path="+r),V.isString(o)&&i.push("domain="+o),!0===s&&i.push("secure"),document.cookie=i.join("; ")},read:function(e){const t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}};function Oe(e,t){return e&&!/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)?function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}(e,t):t}const Se=ie.isStandardBrowserEnv?function(){const e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a");let n;function r(n){let r=n;return e&&(t.setAttribute("href",r),r=t.href),t.setAttribute("href",r),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:"/"===t.pathname.charAt(0)?t.pathname:"/"+t.pathname}}return n=r(window.location.href),function(e){const t=V.isString(e)?r(e):e;return t.protocol===n.protocol&&t.host===n.host}}():function(){return!0};function ve(e,t){let n=0;const r=function(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o,s=0,i=0;return t=void 0!==t?t:1e3,function(a){const c=Date.now(),u=r[i];o||(o=c),n[s]=a,r[s]=c;let l=i,f=0;for(;l!==s;)f+=n[l++],l%=e;if(s=(s+1)%e,s===i&&(i=(i+1)%e),c-o<t)return;const d=u&&c-u;return d?Math.round(1e3*f/d):void 0}}(50,250);return o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,a=s-n,c=r(a);n=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:a,rate:c||void 0,estimated:c&&i&&s<=i?(i-s)/c:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const Re={http:null,xhr:"undefined"!=typeof XMLHttpRequest&&function(e){return new Promise((function(t,n){let r=e.data;const o=ge.from(e.headers).normalize(),s=e.responseType;let i;function a(){e.cancelToken&&e.cancelToken.unsubscribe(i),e.signal&&e.signal.removeEventListener("abort",i)}V.isFormData(r)&&(ie.isStandardBrowserEnv||ie.isStandardBrowserWebWorkerEnv)&&o.setContentType(!1);let c=new XMLHttpRequest;if(e.auth){const t=e.auth.username||"",n=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.set("Authorization","Basic "+btoa(t+":"+n))}const u=Oe(e.baseURL,e.url);function l(){if(!c)return;const r=ge.from("getAllResponseHeaders"in c&&c.getAllResponseHeaders());!function(e,t,n){const r=n.config.validateStatus;n.status&&r&&!r(n.status)?t(new J("Request failed with status code "+n.status,[J.ERR_BAD_REQUEST,J.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}((function(e){t(e),a()}),(function(e){n(e),a()}),{data:s&&"text"!==s&&"json"!==s?c.response:c.responseText,status:c.status,statusText:c.statusText,headers:r,config:e,request:c}),c=null}if(c.open(e.method.toUpperCase(),re(u,e.params,e.paramsSerializer),!0),c.timeout=e.timeout,"onloadend"in c?c.onloadend=l:c.onreadystatechange=function(){c&&4===c.readyState&&(0!==c.status||c.responseURL&&0===c.responseURL.indexOf("file:"))&&setTimeout(l)},c.onabort=function(){c&&(n(new J("Request aborted",J.ECONNABORTED,e,c)),c=null)},c.onerror=function(){n(new J("Network Error",J.ERR_NETWORK,e,c)),c=null},c.ontimeout=function(){let t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const r=e.transitional||se;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new J(t,r.clarifyTimeoutError?J.ETIMEDOUT:J.ECONNABORTED,e,c)),c=null},ie.isStandardBrowserEnv){const t=(e.withCredentials||Se(u))&&e.xsrfCookieName&&Ee.read(e.xsrfCookieName);t&&o.set(e.xsrfHeaderName,t)}void 0===r&&o.setContentType(null),"setRequestHeader"in c&&V.forEach(o.toJSON(),(function(e,t){c.setRequestHeader(t,e)})),V.isUndefined(e.withCredentials)||(c.withCredentials=!!e.withCredentials),s&&"json"!==s&&(c.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&c.addEventListener("progress",ve(e.onDownloadProgress,!0)),"function"==typeof e.onUploadProgress&&c.upload&&c.upload.addEventListener("progress",ve(e.onUploadProgress)),(e.cancelToken||e.signal)&&(i=t=>{c&&(n(!t||t.type?new we(null,e,c):t),c.abort(),c=null)},e.cancelToken&&e.cancelToken.subscribe(i),e.signal&&(e.signal.aborted?i():e.signal.addEventListener("abort",i)));const f=function(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}(u);f&&-1===ie.protocols.indexOf(f)?n(new J("Unsupported protocol "+f+":",J.ERR_BAD_REQUEST,e)):c.send(r||null)}))}};V.forEach(Re,((e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(n){}Object.defineProperty(e,"adapterName",{value:t})}}));const xe=e=>{e=V.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=V.isString(n)?Re[n.toLowerCase()]:n));o++);if(!r){if(!1===r)throw new J(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT");throw new Error(V.hasOwnProp(Re,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`)}if(!V.isFunction(r))throw new TypeError("adapter is not a function");return r};function Ae(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new we(null,e)}function Te(e){Ae(e),e.headers=ge.from(e.headers),e.data=ye.call(e,e.transformRequest),-1!==["post","put","patch"].indexOf(e.method)&&e.headers.setContentType("application/x-www-form-urlencoded",!1);return xe(e.adapter||le.adapter)(e).then((function(t){return Ae(e),t.data=ye.call(e,e.transformResponse,t),t.headers=ge.from(t.headers),t}),(function(t){return be(t)||(Ae(e),t&&t.response&&(t.response.data=ye.call(e,e.transformResponse,t.response),t.response.headers=ge.from(t.response.headers))),Promise.reject(t)}))}const je=e=>e instanceof ge?e.toJSON():e;function Ne(e,t){t=t||{};const n={};function r(e,t,n){return V.isPlainObject(e)&&V.isPlainObject(t)?V.merge.call({caseless:n},e,t):V.isPlainObject(t)?V.merge({},t):V.isArray(t)?t.slice():t}function o(e,t,n){return V.isUndefined(t)?V.isUndefined(e)?void 0:r(void 0,e,n):r(e,t,n)}function s(e,t){if(!V.isUndefined(t))return r(void 0,t)}function i(e,t){return V.isUndefined(t)?V.isUndefined(e)?void 0:r(void 0,e):r(void 0,t)}function a(n,o,s){return s in t?r(n,o):s in e?r(void 0,n):void 0}const c={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:a,headers:(e,t)=>o(je(e),je(t),!0)};return V.forEach(Object.keys(e).concat(Object.keys(t)),(function(r){const s=c[r]||o,i=s(e[r],t[r],r);V.isUndefined(i)&&s!==a||(n[r]=i)})),n}const Ce="1.3.6",Pe={};["object","boolean","number","function","string","symbol"].forEach(((e,t)=>{Pe[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));const _e={};Pe.transitional=function(e,t,n){return(r,o,s)=>{if(!1===e)throw new J(function(e,t){return"[Axios v1.3.6] Transitional option '"+e+"'"+t+(n?". "+n:"")}(o," has been removed"+(t?" in "+t:"")),J.ERR_DEPRECATED);return t&&!_e[o]&&(_e[o]=!0),!e||e(r,o,s)}};const De={assertOptions:function(e,t,n){if("object"!=typeof e)throw new J("options must be an object",J.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const s=r[o],i=t[s];if(i){const t=e[s],n=void 0===t||i(t,s,e);if(!0!==n)throw new J("option "+s+" must be "+n,J.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new J("Unknown option "+s,J.ERR_BAD_OPTION)}},validators:Pe},Ue=De.validators;class Axios{constructor(e){this.defaults=e,this.interceptors={request:new oe,response:new oe}}request(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},t=Ne(this.defaults,t);const{transitional:n,paramsSerializer:r,headers:o}=t;let s;void 0!==n&&De.assertOptions(n,{silentJSONParsing:Ue.transitional(Ue.boolean),forcedJSONParsing:Ue.transitional(Ue.boolean),clarifyTimeoutError:Ue.transitional(Ue.boolean)},!1),null!=r&&(V.isFunction(r)?t.paramsSerializer={serialize:r}:De.assertOptions(r,{encode:Ue.function,serialize:Ue.function},!0)),t.method=(t.method||this.defaults.method||"get").toLowerCase(),s=o&&V.merge(o.common,o[t.method]),s&&V.forEach(["delete","get","head","post","put","patch","common"],(e=>{delete o[e]})),t.headers=ge.concat(s,o);const i=[];let a=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(a=a&&e.synchronous,i.unshift(e.fulfilled,e.rejected))}));const c=[];let u;this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)}));let l,f=0;if(!a){const e=[Te.bind(this),void 0];for(e.unshift.apply(e,i),e.push.apply(e,c),l=e.length,u=Promise.resolve(t);f<l;)u=u.then(e[f++],e[f++]);return u}l=i.length;let d=t;for(f=0;f<l;){const e=i[f++],t=i[f++];try{d=e(d)}catch(p){t.call(this,p);break}}try{u=Te.call(this,d)}catch(p){return Promise.reject(p)}for(f=0,l=c.length;f<l;)u=u.then(c[f++],c[f++]);return u}getUri(e){return re(Oe((e=Ne(this.defaults,e)).baseURL,e.url),e.params,e.paramsSerializer)}}V.forEach(["delete","get","head","options"],(function(e){Axios.prototype[e]=function(t,n){return this.request(Ne(n||{},{method:e,url:t,data:(n||{}).data}))}})),V.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(Ne(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}Axios.prototype[e]=t(),Axios.prototype[e+"Form"]=t(!0)}));const Fe=Axios;class CancelToken{constructor(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");let t;this.promise=new Promise((function(e){t=e}));const n=this;this.promise.then((e=>{if(!n._listeners)return;let t=n._listeners.length;for(;t-- >0;)n._listeners[t](e);n._listeners=null})),this.promise.then=e=>{let t;const r=new Promise((e=>{n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e,r,o){n.reason||(n.reason=new we(e,r,o),t(n.reason))}))}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}static source(){let e;return{token:new CancelToken((function(t){e=t})),cancel:e}}}const Be=CancelToken;const Le={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Le).forEach((([e,t])=>{Le[t]=e}));const ke=Le;const ze=function e(t){const n=new Fe(t),r=f(Fe.prototype.request,n);return V.extend(r,Fe.prototype,n,{allOwnKeys:!0}),V.extend(r,n,null,{allOwnKeys:!0}),r.create=function(n){return e(Ne(t,n))},r}(le);ze.Axios=Fe,ze.CanceledError=we,ze.CancelToken=Be,ze.isCancel=be,ze.VERSION=Ce,ze.toFormData=Z,ze.AxiosError=J,ze.Cancel=ze.CanceledError,ze.all=function(e){return Promise.all(e)},ze.spread=function(e){return function(t){return e.apply(null,t)}},ze.isAxiosError=function(e){return V.isObject(e)&&!0===e.isAxiosError},ze.mergeConfig=Ne,ze.AxiosHeaders=ge,ze.formToJSON=e=>ae(V.isHTMLForm(e)?new FormData(e):e),ze.HttpStatusCode=ke,ze.default=ze;const Ie=ze,qe=e=>{let t;const n=new Set,r=(e,r)=>{const o="function"==typeof e?e(t):e;if(!Object.is(o,t)){const e=t;t=(null!=r?r:"object"!=typeof o)?o:Object.assign({},t,o),n.forEach((n=>n(t,e)))}},o=()=>t,s={setState:r,getState:o,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{n.clear()}};return t=e(r,o,s),s};var Me={},He={get exports(){return Me},set exports(e){Me=e}},Ve={},Je={},We={get exports(){return Je},set exports(e){Je=e}},Ke={},Ge=e;var $e="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},Xe=Ge.useState,Qe=Ge.useEffect,Ze=Ge.useLayoutEffect,Ye=Ge.useDebugValue;function et(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!$e(e,n)}catch(r){return!0}}var tt="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=Xe({inst:{value:n,getSnapshot:t}}),o=r[0].inst,s=r[1];return Ze((function(){o.value=n,o.getSnapshot=t,et(o)&&s({inst:o})}),[e,n,t]),Qe((function(){return et(o)&&s({inst:o}),e((function(){et(o)&&s({inst:o})}))}),[e]),Ye(n),n};Ke.useSyncExternalStore=void 0!==Ge.useSyncExternalStore?Ge.useSyncExternalStore:tt,We.exports=Ke;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nt=e,rt=Je;var ot="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},st=rt.useSyncExternalStore,it=nt.useRef,at=nt.useEffect,ct=nt.useMemo,ut=nt.useDebugValue;Ve.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var s=it(null);if(null===s.current){var i={hasValue:!1,value:null};s.current=i}else i=s.current;s=ct((function(){function e(e){if(!c){if(c=!0,s=e,e=r(e),void 0!==o&&i.hasValue){var t=i.value;if(o(t,e))return a=t}return a=e}if(t=a,ot(s,e))return t;var n=r(e);return void 0!==o&&o(t,n)?t:(s=e,a=n)}var s,a,c=!1,u=void 0===n?null:n;return[function(){return e(t())},null===u?void 0:function(){return e(u())}]}),[t,n,r,o]);var a=st(e,s[0],s[1]);return at((function(){i.hasValue=!0,i.value=a}),[a]),ut(a),a},He.exports=Ve;const lt=t(Me),{useSyncExternalStoreWithSelector:ft}=lt;const dt=t=>{const n="function"==typeof t?(e=>e?qe(e):qe)(t):t,r=(t,r)=>function(t,n=t.getState,r){const o=ft(t.subscribe,t.getState,t.getServerState||t.getState,n,r);return e.useDebugValue(o),o}(n,t,r);return Object.assign(r,n),r};var pt=(e=>e?dt(e):dt)((function(e,t){return{progressDisplay:!1,value:"store-value",setValue:function(t){e({value:t})}}})),ht="https://reqres.in/api",mt=15e3;localStorage.getItem("accessToken");var gt=Ie.create({baseURL:ht,timeout:mt,withCredentials:!1});gt.defaults.headers.post["Content-Type"]="application/json",gt.interceptors.request.use(function(){var e=r(o().mark((function e(t){var n,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=null!==(n=localStorage.getItem("accessToken"))&&void 0!==n?n:"")&&t.headers&&(t.headers.Authorization="Bearer ".concat(r)),pt.setState({progressDisplay:!0}),e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),(function(e){return pt.setState({progressDisplay:!1}),Promise.reject(e)})),gt.interceptors.response.use((function(e){return pt.setState({progressDisplay:!1}),"object"===n(e.data)&&null!==e.data&&"data"in e.data?e.data.data:e.data}),(function(e){var t=e.response,n=(null==t?void 0:t.data)||{};return null==t||t.status,pt.setState({progressDisplay:!1}),Promise.reject(n)}));var yt,bt={}.VITE_AWS_BUCKET_NAME;const wt={get:function(e,t,n){var r=n||{};return r.params=t,gt.get(e,r)},post:function(e,t,n){var r=t||{};return gt.post(e,r,n)},put:function(e,t,n){var r=t||{};return gt.put(e,r,n)},delete:function(e,t){return gt.delete(e,t)},uploadFile:(yt=r(o().mark((function e(t){var n,r,s,i,a,c,u,l=arguments;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=l.length>1&&void 0!==l[1]?l[1]:null!==(n=t.name)&&void 0!==n?n:"demo.txt",e.next=4,fetch("https://ce7gtvr0ig.execute-api.ap-northeast-2.amazonaws.com/api/?s3&v=1",{method:"POST",headers:{},body:JSON.stringify({fileName:s,bucketName:bt})});case 4:return i=e.sent,e.next=7,i.json();case 7:return a=e.sent,c=new FormData,Object.keys(a.fields).forEach((function(e){return c.append(e,a.fields[e])})),c.append("file",t),e.next=13,fetch(a.url,{method:"POST",body:c});case 13:if(!((i=e.sent).status>=400)){e.next=16;break}throw new Error("Failed to upload via presigned POST");case 16:return u=null!==(r=i.headers.get("Location"))&&void 0!==r?r:"https://s3.ap-northeast-2.amazonaws.com/".concat(bt,"/").concat(s),e.abrupt("return",u);case 18:case"end":return e.stop()}}),e)}))),function(e){return yt.apply(this,arguments)})};var Et={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},Ot=s.createContext&&s.createContext(Et),St=globalThis&&globalThis.__assign||function(){return St=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},St.apply(this,arguments)},vt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};function Rt(e){return e&&e.map((function(e,t){return s.createElement(e.tag,St({key:t},e.attr),Rt(e.child))}))}function xt(e){return function(t){return s.createElement(At,St({attr:St({},e.attr)},t),Rt(e.child))}}function At(e){var t=function(t){var n,r=e.attr,o=e.size,i=e.title,a=vt(e,["attr","size","title"]),c=o||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),s.createElement("svg",St({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,r,a,{className:n,style:St(St({color:e.color||t.color},t.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),i&&s.createElement("title",null,i),e.children)};return void 0!==Ot?s.createElement(Ot.Consumer,null,(function(e){return t(e)})):t(Et)}function Tt(e){return xt({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"g",attr:{},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z"}}]}]})(e)}function jt(){var t=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=e.useState(t),r=u(n,2),o=r[0],s=r[1];return{value:o,onChange:function(e){s(e.target.value)}}}(),n=t.value,r=t.onChange;return e.useEffect((function(){wt.get("/usersxxxxx/1000").then(console.log).catch((function(e){}))})),i(Nt,{children:[a("h1",{children:"해결책"}),a(Tt,{}),a("input",c({type:"text"},{value:n,onChange:r})),n,i("div",{children:["1",i("div",{children:["2",a("div",{children:"3"})]})]})]})}var Nt=l("div",{target:"e1rda8u70"})({name:"deo6nv",styles:"div{border:2px solid #fff;}"});export{jt as default};