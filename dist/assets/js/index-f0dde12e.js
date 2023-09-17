import{r as e}from"./index-fd32b983.js";import{g as t,u as n}from"./SVGVisualElement-41b90df8.js";import{u as r,P as s,L as o}from"./motion-7eb3bcc0.js";import{u as i}from"./use-unmount-effect-60e71a01.js";function c(){const t=e.useRef(!1);return r((()=>(t.current=!0,()=>{t.current=!1})),[]),t}class PopChildMeasure extends e.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function u({children:t,isPresent:n}){const r=e.useId(),s=e.useRef(null),o=e.useRef({width:0,height:0,top:0,left:0});return e.useInsertionEffect((()=>{const{width:e,height:t,top:i,left:c}=o.current;if(n||!s.current||!e||!t)return;s.current.dataset.motionPopId=r;const u=document.createElement("style");return document.head.appendChild(u),u.sheet&&u.sheet.insertRule(`\n          [data-motion-pop-id="${r}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${t}px !important;\n            top: ${i}px !important;\n            left: ${c}px !important;\n          }\n        `),()=>{document.head.removeChild(u)}}),[n]),e.createElement(PopChildMeasure,{isPresent:n,childRef:s,sizeRef:o},e.cloneElement(t,{ref:s}))}const a=({children:t,initial:r,isPresent:o,onExitComplete:i,custom:c,presenceAffectsLayout:a,mode:l})=>{const p=n(f),m=e.useId(),d=e.useMemo((()=>({id:m,initial:r,isPresent:o,custom:c,onExitComplete:e=>{p.set(e,!0);for(const t of p.values())if(!t)return;i&&i()},register:e=>(p.set(e,!1),()=>p.delete(e))})),a?void 0:[o]);return e.useMemo((()=>{p.forEach(((e,t)=>p.set(t,!1)))}),[o]),e.useEffect((()=>{!o&&!p.size&&i&&i()}),[o]),"popLayout"===l&&(t=e.createElement(u,{isPresent:o},t)),e.createElement(s.Provider,{value:d},t)};function f(){return new Map}const l=e=>e.key||"";const p=({children:n,custom:s,initial:u=!0,onExitComplete:f,exitBeforeEnter:p,presenceAffectsLayout:m=!0,mode:d="sync"})=>{let[h]=function(){const n=c(),[r,s]=e.useState(0),o=e.useCallback((()=>{n.current&&s(r+1)}),[r]);return[e.useCallback((()=>t.postRender(o)),[o]),r]}();const E=e.useContext(o).forceRender;E&&(h=E);const x=c(),P=function(t){const n=[];return e.Children.forEach(t,(t=>{e.isValidElement(t)&&n.push(t)})),n}(n);let y=P;const C=new Set,R=e.useRef(y),g=e.useRef(new Map).current,L=e.useRef(!0);if(r((()=>{L.current=!1,function(e,t){e.forEach((e=>{const n=l(e);t.set(n,e)}))}(P,g),R.current=y})),i((()=>{L.current=!0,g.clear(),C.clear()})),L.current)return e.createElement(e.Fragment,null,y.map((t=>e.createElement(a,{key:l(t),isPresent:!0,initial:!!u&&void 0,presenceAffectsLayout:m,mode:d},t))));y=[...y];const k=R.current.map(l),w=P.map(l),v=k.length;for(let e=0;e<v;e++){const t=k[e];-1===w.indexOf(t)&&C.add(t)}return"wait"===d&&C.size&&(y=[]),C.forEach((t=>{if(-1!==w.indexOf(t))return;const n=g.get(t);if(!n)return;const r=k.indexOf(t);y.splice(r,0,e.createElement(a,{key:l(n),isPresent:!1,onExitComplete:()=>{g.delete(t),C.delete(t);const e=R.current.findIndex((e=>e.key===t));if(R.current.splice(e,1),!C.size){if(R.current=P,!1===x.current)return;h(),f&&f()}},custom:s,presenceAffectsLayout:m,mode:d},n))})),y=y.map((t=>{const n=t.key;return C.has(n)?t:e.createElement(a,{key:l(t),isPresent:!0,presenceAffectsLayout:m,mode:d},t)})),e.createElement(e.Fragment,null,C.size?y:y.map((t=>e.cloneElement(t))))};export{p as A};