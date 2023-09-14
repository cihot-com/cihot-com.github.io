import{n as e,b as t,c as n,R as r,j as o}from"./index-8f1f19a3.js";const u=e.div`
  h3 {
    margin: 1rem;
    padding: 0;
  }

  > .controls {
    button {
      min-width: 2.5em;
      padding: 0.5em;
      border: 1px solid #000;
      border-radius: 0;
      :hover {
        filter: brightness(1.2);
      }
      :active {
        filter: brightness(0.8);
      }
    }
    button:first-of-type {
      border-right: none;
      border-radius: 4px 0 0 4px;
    }
    button:last-of-type {
      border-left: 1px dashed #000;
      border-radius: 0 4px 4px 0;
    }
  }

  > div {
    margin: 1rem;
    padding: 1rem;
    border-radius: 0.3rem;
    width: 10rem;

    @media (prefers-color-scheme: light) {
      color: #000;
      background-color: #0001;
    }
    @media (prefers-color-scheme: dark) {
      color: #fff;
      background-color: #fff1;
    }
  }
`,s=e=>{let t;const n=new Set,r=(e,r)=>{const o="function"==typeof e?e(t):e;if(!Object.is(o,t)){const e=t;t=(null!=r?r:"object"!=typeof o)?o:Object.assign({},t,o),n.forEach((n=>n(t,e)))}},o=()=>t,u={setState:r,getState:o,subscribe:e=>(n.add(e),()=>n.delete(e)),destroy:()=>{n.clear()}};return t=e(r,o,u),u};var c={exports:{}},i={},a={exports:{}},l={},d=t;var f="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},b=d.useState,v=d.useEffect,h=d.useLayoutEffect,x=d.useDebugValue;function p(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!f(e,n)}catch(r){return!0}}var g="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=b({inst:{value:n,getSnapshot:t}}),o=r[0].inst,u=r[1];return h((function(){o.value=n,o.getSnapshot=t,p(o)&&u({inst:o})}),[e,n,t]),v((function(){return p(o)&&u({inst:o}),e((function(){p(o)&&u({inst:o})}))}),[e]),x(n),n};l.useSyncExternalStore=void 0!==d.useSyncExternalStore?d.useSyncExternalStore:g,a.exports=l;var S=a.exports,m=t,w=S;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var j="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},y=w.useSyncExternalStore,E=m.useRef,O=m.useEffect,k=m.useMemo,V=m.useDebugValue;i.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var u=E(null);if(null===u.current){var s={hasValue:!1,value:null};u.current=s}else s=u.current;u=k((function(){function e(e){if(!i){if(i=!0,u=e,e=r(e),void 0!==o&&s.hasValue){var t=s.value;if(o(t,e))return c=t}return c=e}if(t=c,j(u,e))return t;var n=r(e);return void 0!==o&&o(t,n)?t:(u=e,c=n)}var u,c,i=!1,a=void 0===n?null:n;return[function(){return e(t())},null===a?void 0:function(){return e(a())}]}),[t,n,r,o]);var c=y(e,u[0],u[1]);return O((function(){s.hasValue=!0,s.value=c}),[c]),V(c),c},c.exports=i;const C=n(c.exports),{useSyncExternalStoreWithSelector:D}=C;const I=e=>{const n="function"==typeof e?(e=>e?s(e):s)(e):e,r=(e,r)=>function(e,n=e.getState,r){const o=D(e.subscribe,e.getState,e.getServerState||e.getState,n,r);return t.useDebugValue(o),o}(n,e,r);return Object.assign(r,n),r},M=(R=(e,t)=>({count:0,show:!1,text:"store-text",increment:()=>e((e=>({count:e.count+1}))),decrement:()=>e((e=>({count:e.count-1}))),set:e,get:t}))?I(R):I;var R;function z(){const{increment:e,decrement:t,show:n,set:u}=M(),s=r.useRef(null);return o.jsxs("div",{className:"controls",children:[o.jsx("button",{onClick:()=>t(),onMouseDown:e=>{s.current=window.setInterval((()=>{t()}),100)},onMouseUp:e=>{s.current&&(window.clearInterval(s.current),s.current=null)},children:"-"}),o.jsx("button",{onClick:()=>e(),onMouseDown:t=>{s.current=window.setInterval((()=>{e()}),100)},onMouseUp:e=>{s.current&&(window.clearInterval(s.current),s.current=null)},children:"+"}),o.jsx("button",{onClick:()=>u((e=>({show:!e.show}))),children:n?"hide":"show"})]})}function A(){return o.jsx("div",{id:"zustand-subscribe",children:"subscribe"})}function P(){const e=M();return o.jsxs(u,{children:[o.jsx("h3",{children:"Zustand Test Page"}),o.jsxs("div",{children:["count: ",e.count]}),o.jsx(z,{}),o.jsx(A,{}),o.jsx("pre",{children:"\n          Rendering 너무한다.\n          Context API 사용하기보다 못하다.\n        "})]})}M.subscribe(((e,t)=>{document.querySelectorAll("#zustand-subscribe").forEach((n=>n.textContent=`(${t.count}) --\x3e ${e.count}`))}));export{P as default};
