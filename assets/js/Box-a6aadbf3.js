import{B as e,d as t,r,T as n,C as o}from"./index-d2e29b82.js";const a={black:"#000",white:"#fff"},i={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},s={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},l={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},p={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},f={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},c={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},u={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"};function d(e){return null!==e&&"object"==typeof e&&e.constructor===Object}function m(e){if(!d(e))return e;const t={};return Object.keys(e).forEach((r=>{t[r]=m(e[r])})),t}function g(t,r,n={clone:!0}){const o=n.clone?e({},t):t;return d(t)&&d(r)&&Object.keys(r).forEach((e=>{"__proto__"!==e&&(d(r[e])&&e in t&&d(t[e])?o[e]=g(t[e],r[e],n):n.clone?o[e]=d(r[e])?m(r[e]):r[e]:o[e]=r[e])})),o}function h(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}function y(e){if("string"!=typeof e)throw new Error(h(7));return e.charAt(0).toUpperCase()+e.slice(1)}const b=e=>e,x=(()=>{let e=b;return{configure(t){e=t},generate:t=>e(t),reset(){e=b}}})(),k="$$material";function v(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}var A=t.bind();["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"].forEach((function(e){A[e]=A(e)}));const w=A;
/**
 * @mui/styled-engine v5.12.0
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function O(e,t){return w(e,t)}const $=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))},S=["values","unit","step"],C=t=>{const r=Object.keys(t).map((e=>({key:e,val:t[e]})))||[];return r.sort(((e,t)=>e.val-t.val)),r.reduce(((t,r)=>e({},t,{[r.key]:r.val})),{})};const T={borderRadius:4};function K(e,t){return t?g(e,t,{clone:!1}):e}const j={xs:0,sm:600,md:900,lg:1200,xl:1536},R={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${j[e]}px)`};function B(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const e=n.breakpoints||R;return t.reduce(((n,o,a)=>(n[e.up(e.keys[a])]=r(t[a]),n)),{})}if("object"==typeof t){const e=n.breakpoints||R;return Object.keys(t).reduce(((n,o)=>{if(-1!==Object.keys(e.values||j).indexOf(o)){n[e.up(o)]=r(t[o],o)}else{const e=o;n[e]=t[e]}return n}),{})}return r(t)}function P(e,t,r=!0){if(!t||"string"!=typeof t)return null;if(e&&e.vars&&r){const r=`vars.${t}`.split(".").reduce(((e,t)=>e&&e[t]?e[t]:null),e);if(null!=r)return r}return t.split(".").reduce(((e,t)=>e&&null!=e[t]?e[t]:null),e)}function I(e,t,r,n=r){let o;return o="function"==typeof e?e(r):Array.isArray(e)?e[r]||n:P(e,r)||n,t&&(o=t(o,n,e)),o}function W(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:o}=e,a=e=>{if(null==e[t])return null;const a=e[t],i=P(e.theme,n)||{};return B(e,a,(e=>{let n=I(i,o,e);return e===n&&"string"==typeof e&&(n=I(i,o,`${t}${"default"===e?"":y(e)}`,e)),!1===r?n:{[r]:n}}))};return a.propTypes={},a.filterProps=[t],a}const M={m:"margin",p:"padding"},_={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},z={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},E=function(e){const t={};return r=>(void 0===t[r]&&(t[r]=e(r)),t[r])}((e=>{if(e.length>2){if(!z[e])return[e];e=z[e]}const[t,r]=e.split(""),n=M[t],o=_[r]||"";return Array.isArray(o)?o.map((e=>n+e)):[n+o]})),G=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],F=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"];function L(e,t,r,n){var o;const a=null!=(o=P(e,t,!1))?o:r;return"number"==typeof a?e=>"string"==typeof e?e:a*e:Array.isArray(a)?e=>"string"==typeof e?e:a[e]:"function"==typeof a?a:()=>{}}function H(e){return L(e,"spacing",8)}function N(e,t){if("string"==typeof t||null==t)return t;const r=e(Math.abs(t));return t>=0?r:"number"==typeof r?-r:`-${r}`}function X(e,t,r,n){if(-1===t.indexOf(r))return null;const o=function(e,t){return r=>e.reduce(((e,n)=>(e[n]=N(t,r),e)),{})}(E(r),n);return B(e,e[r],o)}function Y(e,t){const r=H(e.theme);return Object.keys(e).map((n=>X(e,t,n,r))).reduce(K,{})}function q(e){return Y(e,G)}function D(e){return Y(e,F)}function U(...e){const t=e.reduce(((e,t)=>(t.filterProps.forEach((r=>{e[r]=t})),e)),{}),r=e=>Object.keys(e).reduce(((r,n)=>t[n]?K(r,t[n](e)):r),{});return r.propTypes={},r.filterProps=e.reduce(((e,t)=>e.concat(t.filterProps)),[]),r}function V(e){return"number"!=typeof e?e:`${e}px solid`}q.propTypes={},q.filterProps=G,D.propTypes={},D.filterProps=F;const J=W({prop:"border",themeKey:"borders",transform:V}),Q=W({prop:"borderTop",themeKey:"borders",transform:V}),Z=W({prop:"borderRight",themeKey:"borders",transform:V}),ee=W({prop:"borderBottom",themeKey:"borders",transform:V}),te=W({prop:"borderLeft",themeKey:"borders",transform:V}),re=W({prop:"borderColor",themeKey:"palette"}),ne=W({prop:"borderTopColor",themeKey:"palette"}),oe=W({prop:"borderRightColor",themeKey:"palette"}),ae=W({prop:"borderBottomColor",themeKey:"palette"}),ie=W({prop:"borderLeftColor",themeKey:"palette"}),se=e=>{if(void 0!==e.borderRadius&&null!==e.borderRadius){const t=L(e.theme,"shape.borderRadius",4),r=e=>({borderRadius:N(t,e)});return B(e,e.borderRadius,r)}return null};se.propTypes={},se.filterProps=["borderRadius"],U(J,Q,Z,ee,te,re,ne,oe,ae,ie,se);const le=e=>{if(void 0!==e.gap&&null!==e.gap){const t=L(e.theme,"spacing",8),r=e=>({gap:N(t,e)});return B(e,e.gap,r)}return null};le.propTypes={},le.filterProps=["gap"];const pe=e=>{if(void 0!==e.columnGap&&null!==e.columnGap){const t=L(e.theme,"spacing",8),r=e=>({columnGap:N(t,e)});return B(e,e.columnGap,r)}return null};pe.propTypes={},pe.filterProps=["columnGap"];const fe=e=>{if(void 0!==e.rowGap&&null!==e.rowGap){const t=L(e.theme,"spacing",8),r=e=>({rowGap:N(t,e)});return B(e,e.rowGap,r)}return null};fe.propTypes={},fe.filterProps=["rowGap"];function ce(e,t){return"grey"===t?t:e}U(le,pe,fe,W({prop:"gridColumn"}),W({prop:"gridRow"}),W({prop:"gridAutoFlow"}),W({prop:"gridAutoColumns"}),W({prop:"gridAutoRows"}),W({prop:"gridTemplateColumns"}),W({prop:"gridTemplateRows"}),W({prop:"gridTemplateAreas"}),W({prop:"gridArea"}));function ue(e){return e<=1&&0!==e?100*e+"%":e}U(W({prop:"color",themeKey:"palette",transform:ce}),W({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:ce}),W({prop:"backgroundColor",themeKey:"palette",transform:ce}));const de=W({prop:"width",transform:ue}),me=e=>{if(void 0!==e.maxWidth&&null!==e.maxWidth){const t=t=>{var r,n,o;return{maxWidth:(null==(r=e.theme)||null==(n=r.breakpoints)||null==(o=n.values)?void 0:o[t])||j[t]||ue(t)}};return B(e,e.maxWidth,t)}return null};me.filterProps=["maxWidth"];const ge=W({prop:"minWidth",transform:ue}),he=W({prop:"height",transform:ue}),ye=W({prop:"maxHeight",transform:ue}),be=W({prop:"minHeight",transform:ue});W({prop:"size",cssProperty:"width",transform:ue}),W({prop:"size",cssProperty:"height",transform:ue});U(de,me,ge,he,ye,be,W({prop:"boxSizing"}));const xe={border:{themeKey:"borders",transform:V},borderTop:{themeKey:"borders",transform:V},borderRight:{themeKey:"borders",transform:V},borderBottom:{themeKey:"borders",transform:V},borderLeft:{themeKey:"borders",transform:V},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:se},color:{themeKey:"palette",transform:ce},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:ce},backgroundColor:{themeKey:"palette",transform:ce},p:{style:D},pt:{style:D},pr:{style:D},pb:{style:D},pl:{style:D},px:{style:D},py:{style:D},padding:{style:D},paddingTop:{style:D},paddingRight:{style:D},paddingBottom:{style:D},paddingLeft:{style:D},paddingX:{style:D},paddingY:{style:D},paddingInline:{style:D},paddingInlineStart:{style:D},paddingInlineEnd:{style:D},paddingBlock:{style:D},paddingBlockStart:{style:D},paddingBlockEnd:{style:D},m:{style:q},mt:{style:q},mr:{style:q},mb:{style:q},ml:{style:q},mx:{style:q},my:{style:q},margin:{style:q},marginTop:{style:q},marginRight:{style:q},marginBottom:{style:q},marginLeft:{style:q},marginX:{style:q},marginY:{style:q},marginInline:{style:q},marginInlineStart:{style:q},marginInlineEnd:{style:q},marginBlock:{style:q},marginBlockStart:{style:q},marginBlockEnd:{style:q},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:le},rowGap:{style:fe},columnGap:{style:pe},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:ue},maxWidth:{style:me},minWidth:{transform:ue},height:{transform:ue},maxHeight:{transform:ue},minHeight:{transform:ue},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}};const ke=function(){function e(e,t,r,n){const o={[e]:t,theme:r},a=n[e];if(!a)return{[e]:t};const{cssProperty:i=e,themeKey:s,transform:l,style:p}=a;if(null==t)return null;if("typography"===s&&"inherit"===t)return{[e]:t};const f=P(r,s)||{};if(p)return p(o);return B(o,t,(t=>{let r=I(f,l,t);return t===r&&"string"==typeof t&&(r=I(f,l,`${e}${"default"===t?"":y(t)}`,t)),!1===i?r:{[i]:r}}))}return function t(r){var n;const{sx:o,theme:a={}}=r||{};if(!o)return null;const i=null!=(n=a.unstable_sxConfig)?n:xe;function s(r){let n=r;if("function"==typeof r)n=r(a);else if("object"!=typeof r)return r;if(!n)return null;const o=function(e={}){var t;return(null==(t=e.keys)?void 0:t.reduce(((t,r)=>(t[e.up(r)]={},t)),{}))||{}}(a.breakpoints),s=Object.keys(o);let l=o;return Object.keys(n).forEach((r=>{const o=(s=n[r],p=a,"function"==typeof s?s(p):s);var s,p;if(null!=o)if("object"==typeof o)if(i[r])l=K(l,e(r,o,a,i));else{const e=B({theme:a},o,(e=>({[r]:e})));!function(...e){const t=e.reduce(((e,t)=>e.concat(Object.keys(t))),[]),r=new Set(t);return e.every((e=>r.size===Object.keys(e).length))}(e,o)?l=K(l,e):l[r]=t({sx:o,theme:a})}else l=K(l,e(r,o,a,i))})),p=l,s.reduce(((e,t)=>{const r=e[t];return(!r||0===Object.keys(r).length)&&delete e[t],e}),p);var p}return Array.isArray(o)?o.map(s):s(o)}}();ke.filterProps=["sx"];const ve=ke,Ae=["breakpoints","palette","spacing","shape"];function we(t={},...r){const{breakpoints:n={},palette:o={},spacing:a,shape:i={}}=t,s=v(t,Ae),l=function(t){const{values:r={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:n="px",step:o=5}=t,a=v(t,S),i=C(r),s=Object.keys(i);function l(e){return`@media (min-width:${"number"==typeof r[e]?r[e]:e}${n})`}function p(e){return`@media (max-width:${("number"==typeof r[e]?r[e]:e)-o/100}${n})`}function f(e,t){const a=s.indexOf(t);return`@media (min-width:${"number"==typeof r[e]?r[e]:e}${n}) and (max-width:${(-1!==a&&"number"==typeof r[s[a]]?r[s[a]]:t)-o/100}${n})`}return e({keys:s,values:i,up:l,down:p,between:f,only:function(e){return s.indexOf(e)+1<s.length?f(e,s[s.indexOf(e)+1]):l(e)},not:function(e){const t=s.indexOf(e);return 0===t?l(s[1]):t===s.length-1?p(s[t]):f(e,s[s.indexOf(e)+1]).replace("@media","@media not all and")},unit:n},a)}(n),p=function(e=8){if(e.mui)return e;const t=H({spacing:e}),r=(...e)=>(0===e.length?[1]:e).map((e=>{const r=t(e);return"number"==typeof r?`${r}px`:r})).join(" ");return r.mui=!0,r}(a);let f=g({breakpoints:l,direction:"ltr",components:{},palette:e({mode:"light"},o),spacing:p,shape:e({},T,i)},s);return f=r.reduce(((e,t)=>g(e,t)),f),f.unstable_sxConfig=e({},xe,null==s?void 0:s.unstable_sxConfig),f.unstable_sx=function(e){return ve({sx:e,theme:this})},f}function Oe(e=null){const t=r.useContext(n);return t&&(o=t,0!==Object.keys(o).length)?t:e;var o}const $e=we();function Se(e=$e){return Oe(e)}const Ce=["sx"],Te=e=>{var t,r;const n={systemProps:{},otherProps:{}},o=null!=(t=null==e||null==(r=e.theme)?void 0:r.unstable_sxConfig)?t:xe;return Object.keys(e).forEach((t=>{o[t]?n.systemProps[t]=e[t]:n.otherProps[t]=e[t]})),n};function Ke(t){const{sx:r}=t,n=v(t,Ce),{systemProps:o,otherProps:a}=Te(n);let i;return i=Array.isArray(r)?[o,...r]:"function"==typeof r?(...t)=>{const n=r(...t);return d(n)?e({},o,n):o}:e({},o,r),e({},a,{sx:i})}function je(e){var t,r,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(r=je(e[t]))&&(n&&(n+=" "),n+=r);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function Re(){for(var e,t,r=0,n="";r<arguments.length;)(e=arguments[r++])&&(t=je(e))&&(n&&(n+=" "),n+=t);return n}const Be=["className","component"];function Pe(e,t=0,r=1){return Math.min(Math.max(t,e),r)}function Ie(e){if(e.type)return e;if("#"===e.charAt(0))return Ie(function(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&1===r[0].length&&(r=r.map((e=>e+e))),r?`rgb${4===r.length?"a":""}(${r.map(((e,t)=>t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}(e));const t=e.indexOf("("),r=e.substring(0,t);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(r))throw new Error(h(9,e));let n,o=e.substring(t+1,e.length-1);if("color"===r){if(o=o.split(" "),n=o.shift(),4===o.length&&"/"===o[3].charAt(0)&&(o[3]=o[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(n))throw new Error(h(10,n))}else o=o.split(",");return o=o.map((e=>parseFloat(e))),{type:r,values:o,colorSpace:n}}function We(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return-1!==t.indexOf("rgb")?n=n.map(((e,t)=>t<3?parseInt(e,10):e)):-1!==t.indexOf("hsl")&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),n=-1!==t.indexOf("color")?`${r} ${n.join(" ")}`:`${n.join(", ")}`,`${t}(${n})`}function Me(e){let t="hsl"===(e=Ie(e)).type||"hsla"===e.type?Ie(function(e){e=Ie(e);const{values:t}=e,r=t[0],n=t[1]/100,o=t[2]/100,a=n*Math.min(o,1-o),i=(e,t=(e+r/30)%12)=>o-a*Math.max(Math.min(t-3,9-t,1),-1);let s="rgb";const l=[Math.round(255*i(0)),Math.round(255*i(8)),Math.round(255*i(4))];return"hsla"===e.type&&(s+="a",l.push(t[3])),We({type:s,values:l})}(e)).values:e.values;return t=t.map((t=>("color"!==e.type&&(t/=255),t<=.03928?t/12.92:((t+.055)/1.055)**2.4))),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function _e(e,t){return e=Ie(e),t=Pe(t),"rgb"!==e.type&&"hsl"!==e.type||(e.type+="a"),"color"===e.type?e.values[3]=`/${t}`:e.values[3]=t,We(e)}const ze=["mode","contrastThreshold","tonalOffset"],Ee={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:a.white,default:a.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Ge={text:{primary:a.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:a.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Fe(e,t,r,n){const o=n.light||n,a=n.dark||1.5*n;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:"light"===t?e.light=function(e,t){if(e=Ie(e),t=Pe(t),-1!==e.type.indexOf("hsl"))e.values[2]+=(100-e.values[2])*t;else if(-1!==e.type.indexOf("rgb"))for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(-1!==e.type.indexOf("color"))for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return We(e)}(e.main,o):"dark"===t&&(e.dark=function(e,t){if(e=Ie(e),t=Pe(t),-1!==e.type.indexOf("hsl"))e.values[2]*=1-t;else if(-1!==e.type.indexOf("rgb")||-1!==e.type.indexOf("color"))for(let r=0;r<3;r+=1)e.values[r]*=1-t;return We(e)}(e.main,a)))}function Le(t){const{mode:r="light",contrastThreshold:n=3,tonalOffset:o=.2}=t,d=v(t,ze),m=t.primary||function(e="light"){return"dark"===e?{main:l[200],light:l[50],dark:l[400]}:{main:l[700],light:l[400],dark:l[800]}}(r),y=t.secondary||function(e="light"){return"dark"===e?{main:s[200],light:s[50],dark:s[400]}:{main:s[500],light:s[300],dark:s[700]}}(r),b=t.error||function(e="light"){return"dark"===e?{main:i[500],light:i[300],dark:i[700]}:{main:i[700],light:i[400],dark:i[800]}}(r),x=t.info||function(e="light"){return"dark"===e?{main:p[400],light:p[300],dark:p[700]}:{main:p[700],light:p[500],dark:p[900]}}(r),k=t.success||function(e="light"){return"dark"===e?{main:f[400],light:f[300],dark:f[700]}:{main:f[800],light:f[500],dark:f[900]}}(r),A=t.warning||function(e="light"){return"dark"===e?{main:c[400],light:c[300],dark:c[700]}:{main:"#ed6c02",light:c[500],dark:c[900]}}(r);function w(e){const t=function(e,t){const r=Me(e),n=Me(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}(e,Ge.text.primary)>=n?Ge.text.primary:Ee.text.primary;return t}const O=({color:t,name:r,mainShade:n=500,lightShade:a=300,darkShade:i=700})=>{if(!(t=e({},t)).main&&t[n]&&(t.main=t[n]),!t.hasOwnProperty("main"))throw new Error(h(11,r?` (${r})`:"",n));if("string"!=typeof t.main)throw new Error(h(12,r?` (${r})`:"",JSON.stringify(t.main)));return Fe(t,"light",a,o),Fe(t,"dark",i,o),t.contrastText||(t.contrastText=w(t.main)),t},$={dark:Ge,light:Ee};return g(e({common:e({},a),mode:r,primary:O({color:m,name:"primary"}),secondary:O({color:y,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:O({color:b,name:"error"}),warning:O({color:A,name:"warning"}),info:O({color:x,name:"info"}),success:O({color:k,name:"success"}),grey:u,contrastThreshold:n,getContrastText:w,augmentColor:O,tonalOffset:o},$[r]),d)}const He=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];const Ne={textTransform:"uppercase"},Xe='"Roboto", "Helvetica", "Arial", sans-serif';function Ye(t,r){const n="function"==typeof r?r(t):r,{fontFamily:o=Xe,fontSize:a=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:l=500,fontWeightBold:p=700,htmlFontSize:f=16,allVariants:c,pxToRem:u}=n,d=v(n,He),m=a/14,h=u||(e=>e/f*m+"rem"),y=(t,r,n,a,i)=>{return e({fontFamily:o,fontWeight:t,fontSize:h(r),lineHeight:n},o===Xe?{letterSpacing:(s=a/r,Math.round(1e5*s)/1e5)+"em"}:{},i,c);var s},b={h1:y(i,96,1.167,-1.5),h2:y(i,60,1.2,-.5),h3:y(s,48,1.167,0),h4:y(s,34,1.235,.25),h5:y(s,24,1.334,0),h6:y(l,20,1.6,.15),subtitle1:y(s,16,1.75,.15),subtitle2:y(l,14,1.57,.1),body1:y(s,16,1.5,.15),body2:y(s,14,1.43,.15),button:y(l,14,1.75,.4,Ne),caption:y(s,12,1.66,.4),overline:y(s,12,2.66,1,Ne),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return g(e({htmlFontSize:f,pxToRem:h,fontFamily:o,fontSize:a,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:l,fontWeightBold:p},b),d,{clone:!1})}function qe(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,0.2)`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,0.14)`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,0.12)`].join(",")}const De=["none",qe(0,2,1,-1,0,1,1,0,0,1,3,0),qe(0,3,1,-2,0,2,2,0,0,1,5,0),qe(0,3,3,-2,0,3,4,0,0,1,8,0),qe(0,2,4,-1,0,4,5,0,0,1,10,0),qe(0,3,5,-1,0,5,8,0,0,1,14,0),qe(0,3,5,-1,0,6,10,0,0,1,18,0),qe(0,4,5,-2,0,7,10,1,0,2,16,1),qe(0,5,5,-3,0,8,10,1,0,3,14,2),qe(0,5,6,-3,0,9,12,1,0,3,16,2),qe(0,6,6,-3,0,10,14,1,0,4,18,3),qe(0,6,7,-4,0,11,15,1,0,4,20,3),qe(0,7,8,-4,0,12,17,2,0,5,22,4),qe(0,7,8,-4,0,13,19,2,0,5,24,4),qe(0,7,9,-4,0,14,21,2,0,5,26,4),qe(0,8,9,-5,0,15,22,2,0,6,28,5),qe(0,8,10,-5,0,16,24,2,0,6,30,5),qe(0,8,11,-5,0,17,26,2,0,6,32,5),qe(0,9,11,-5,0,18,28,2,0,7,34,6),qe(0,9,12,-6,0,19,29,2,0,7,36,6),qe(0,10,13,-6,0,20,31,3,0,8,38,7),qe(0,10,13,-6,0,21,33,3,0,8,40,7),qe(0,10,14,-6,0,22,35,3,0,8,42,7),qe(0,11,14,-7,0,23,36,3,0,9,44,8),qe(0,11,15,-7,0,24,38,3,0,9,46,8)],Ue=["duration","easing","delay"],Ve={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},Je={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function Qe(e){return`${Math.round(e)}ms`}function Ze(e){if(!e)return 0;const t=e/36;return Math.round(10*(4+15*t**.25+t/5))}function et(t){const r=e({},Ve,t.easing),n=e({},Je,t.duration);return e({getAutoHeightDuration:Ze,create:(e=["all"],t={})=>{const{duration:o=n.standard,easing:a=r.easeInOut,delay:i=0}=t;return v(t,Ue),(Array.isArray(e)?e:[e]).map((e=>`${e} ${"string"==typeof o?o:Qe(o)} ${a} ${"string"==typeof i?i:Qe(i)}`)).join(",")}},t,{easing:r,duration:n})}const tt={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},rt=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function nt(t={},...r){const{mixins:n={},palette:o={},transitions:a={},typography:i={}}=t,s=v(t,rt);if(t.vars)throw new Error(h(18));const l=Le(o),p=we(t);let f=g(p,{mixins:(c=p.breakpoints,u=n,e({toolbar:{minHeight:56,[c.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[c.up("sm")]:{minHeight:64}}},u)),palette:l,shadows:De.slice(),typography:Ye(l,i),transitions:et(a),zIndex:e({},tt)});var c,u;return f=g(f,s),f=r.reduce(((e,t)=>g(e,t)),f),f.unstable_sxConfig=e({},xe,null==s?void 0:s.unstable_sxConfig),f.unstable_sx=function(e){return ve({sx:e,theme:this})},f}const ot=function(t={}){const{themeId:n,defaultTheme:a,defaultClassName:i="MuiBox-root",generateClassName:s}=t,l=O("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(ve);return r.forwardRef((function(t,r){const p=Se(a),f=Ke(t),{className:c,component:u="div"}=f,d=v(f,Be);return o.jsx(l,e({as:u,ref:r,className:Re(c,s?s(i):i),theme:n&&p[n]||p},d))}))}({themeId:k,defaultTheme:nt(),defaultClassName:"MuiBox-root",generateClassName:x.generate});export{ot as B,x as C,k as T,v as _,_e as a,Re as b,y as c,we as d,Ke as e,ve as f,nt as g,$ as i,O as s,Se as u};