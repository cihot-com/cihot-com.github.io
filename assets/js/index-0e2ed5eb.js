import{b as e,n as t,j as n}from"./index-8f1f19a3.js";import{p as o,v as r,b as s,d as i,c,e as l,f,u as a,w as d,g}from"./SVGVisualElement-210c37ed.js";import{r as h}from"./resolve-element-7c72327c.js";import{u,m as p}from"./motion-abf7f7de.js";import{a as m}from"./use-transform-bfeb503f.js";import"./index-7074372a.js";import"./use-motion-value-cdb7a71a.js";const v=new WeakMap;let x;function w({target:e,contentRect:t,borderBoxSize:n}){var o;null===(o=v.get(e))||void 0===o||o.forEach((o=>{o({target:e,contentSize:t,get size(){return function(e,t){if(t){const{inlineSize:e,blockSize:n}=t[0];return{width:e,height:n}}return e instanceof SVGElement&&"getBBox"in e?e.getBBox():{width:e.offsetWidth,height:e.offsetHeight}}(e,n)}})}))}function y(e){e.forEach(w)}function b(e,t){x||"undefined"!=typeof ResizeObserver&&(x=new ResizeObserver(y));const n=h(e);return n.forEach((e=>{let n=v.get(e);n||(n=new Set,v.set(e,n)),n.add(t),null==x||x.observe(e)})),()=>{n.forEach((e=>{const n=v.get(e);null==n||n.delete(t),(null==n?void 0:n.size)||null==x||x.unobserve(e)}))}}const E=new Set;let L;function W(e){return E.add(e),L||(L=()=>{const e={width:window.innerWidth,height:window.innerHeight},t={target:window,size:e,contentSize:e};E.forEach((e=>e(t)))},window.addEventListener("resize",L)),()=>{E.delete(e),!E.size&&L&&(L=void 0)}}const z=50,j=()=>({time:0,x:{current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0},y:{current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}}),H={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function S(e,t,n,s){const i=n[t],{length:c,position:l}=H[t],f=i.current,a=n.time;i.current=e["scroll"+l],i.scrollLength=e["scroll"+c]-e["client"+c],i.offset.length=0,i.offset[0]=0,i.offset[1]=i.scrollLength,i.progress=o(0,i.scrollLength,i.current);const d=s-a;i.velocity=d>z?0:r(i.current-f,d)}const B={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},O={start:0,center:.5,end:1};function k(e,t,n=0){let o=0;if(void 0!==O[e]&&(e=O[e]),"string"==typeof e){const t=parseFloat(e);e.endsWith("px")?o=t:e.endsWith("%")?e=t/100:e.endsWith("vw")?o=t/100*document.documentElement.clientWidth:e.endsWith("vh")?o=t/100*document.documentElement.clientHeight:e=t}return"number"==typeof e&&(o=t*e),n+o}const P=[0,0];function A(e,t,n,o){let r=Array.isArray(e)?e:P,s=0,i=0;return"number"==typeof e?r=[e,e]:"string"==typeof e&&(r=(e=e.trim()).includes(" ")?e.split(" "):[e,O[e]?e:"0"]),s=k(r[0],n,o),i=k(r[1],t),s-i}const M={x:0,y:0};function Y(e,t,n){let{offset:o=B.All}=n;const{target:r=e,axis:c="y"}=n,l="y"===c?"height":"width",f=r!==e?function(e,t){let n={x:0,y:0},o=e;for(;o&&o!==t;)if(o instanceof HTMLElement)n.x+=o.offsetLeft,n.y+=o.offsetTop,o=o.offsetParent;else if(o instanceof SVGGraphicsElement&&"getBBox"in o){const{top:e,left:t}=o.getBBox();for(n.x+=t,n.y+=e;o&&"svg"!==o.tagName;)o=o.parentNode}return n}(r,e):M,a=r===e?{width:e.scrollWidth,height:e.scrollHeight}:{width:r.clientWidth,height:r.clientHeight},d={width:e.clientWidth,height:e.clientHeight};t[c].offset.length=0;let g=!t[c].interpolate;const h=o.length;for(let s=0;s<h;s++){const e=A(o[s],d[l],a[l],f[c]);g||e===t[c].interpolatorOffsets[s]||(g=!0),t[c].offset[s]=e}g&&(t[c].interpolate=s(t[c].offset,i(o)),t[c].interpolatorOffsets=[...t[c].offset]),t[c].progress=t[c].interpolate(t[c].current)}function G(e,t,n,o={}){return{measure:()=>function(e,t=e,n){if(n.x.targetOffset=0,n.y.targetOffset=0,t!==e){let o=t;for(;o&&o!==e;)n.x.targetOffset+=o.offsetLeft,n.y.targetOffset+=o.offsetTop,o=o.offsetParent}n.x.targetLength=t===e?t.scrollWidth:t.clientWidth,n.y.targetLength=t===e?t.scrollHeight:t.clientHeight,n.x.containerLength=e.clientWidth,n.y.containerLength=e.clientHeight}(e,o.target,n),update:t=>{!function(e,t,n){S(e,"x",t,n),S(e,"y",t,n),t.time=n}(e,n,t),(o.offset||o.target)&&Y(e,n,o)},notify:()=>t(n)}}const R=new WeakMap,T=new WeakMap,V=new WeakMap,X=e=>e===document.documentElement?window:e;function N(e,{container:t=document.documentElement,...n}={}){let o=V.get(t);o||(o=new Set,V.set(t,o));const r=j(),s=G(t,e,r,n);if(o.add(s),!R.has(t)){const e=()=>{for(const e of o)e.measure()},n=()=>{for(const e of o)e.update(f.timestamp)},r=()=>{for(const e of o)e.notify()},s=()=>{c.read(e,!1,!0),c.update(n,!1,!0),c.update(r,!1,!0)};R.set(t,s);const l=X(t);window.addEventListener("resize",s,{passive:!0}),t!==document.documentElement&&T.set(t,(a=s,"function"==typeof(i=t)?W(i):b(i,a))),l.addEventListener("scroll",s,{passive:!0})}var i,a;const d=R.get(t);return c.read(d,!1,!0),()=>{var e;l(d);const n=V.get(t);if(!n)return;if(n.delete(s),n.size)return;const o=R.get(t);R.delete(t),o&&(X(t).removeEventListener("scroll",o),null===(e=T.get(t))||void 0===e||e(),window.removeEventListener("resize",o))}}function C(e,t){d(Boolean(!t||t.current))}const F=()=>({scrollX:g(0),scrollY:g(0),scrollXProgress:g(0),scrollYProgress:g(0)});const $=t.div`
  min-height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .target {
    width: 100px;
    height: 100px;

    & > div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border: 1px solid #8888;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &::before {
        content: '';
        width: 100%;
        height: 1px;
        background-color: #8888;
        position: absolute;
        top: 50%;
      }
    }
  }

  .container {
    min-height: 110vh;
    border: 1px solid #8888;
    overflow: scroll;
  }

  hr {
    position: fixed;
    top: 50vh;
    width: 100%;
    height: 1px;
    border: none;
    background-color: #8888;
  }
`;function q(){const t=e.useRef(null),{scrollYProgress:o}=function({container:t,target:n,layoutEffect:o=!0,...r}={}){const s=a(F);return(o?u:e.useEffect)((()=>(C(0,n),C(0,t),N((({x:e,y:t})=>{s.scrollX.set(e.current),s.scrollXProgress.set(e.progress),s.scrollY.set(t.current),s.scrollYProgress.set(t.progress)}),{...r,container:(null==t?void 0:t.current)||void 0,target:(null==n?void 0:n.current)||void 0}))),[]),s}({target:t,offset:["-8px center","0.48 50%"],axis:"y"}),r=m(o,[0,1],["rgba(255, 0, 0, 0)","rgba(255, 0, 0, 1)"]);return n.jsxs($,{children:[n.jsx(p.div,{className:"target",ref:t,style:{backgroundColor:r},children:n.jsx(p.div,{children:o})}),n.jsx("hr",{})]})}export{q as default};
