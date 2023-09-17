import{n as e,R as r,j as n}from"./index-890d70c3.js";import{c as t}from"./index-09472c7c.js";const o=e.div`
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
`,s=t(((e,r)=>({count:0,show:!1,text:"store-text",increment:()=>e((e=>({count:e.count+1}))),decrement:()=>e((e=>({count:e.count-1}))),set:e,get:r})));function c(){const{increment:e,decrement:t,show:o,set:c}=s(),i=r.useRef(null);return n.jsxs("div",{className:"controls",children:[n.jsx("button",{onClick:()=>t(),onMouseDown:e=>{i.current=window.setInterval((()=>{t()}),100)},onMouseUp:e=>{i.current&&(window.clearInterval(i.current),i.current=null)},children:"-"}),n.jsx("button",{onClick:()=>e(),onMouseDown:r=>{i.current=window.setInterval((()=>{e()}),100)},onMouseUp:e=>{i.current&&(window.clearInterval(i.current),i.current=null)},children:"+"}),n.jsx("button",{onClick:()=>c((e=>({show:!e.show}))),children:o?"hide":"show"})]})}function i(){return n.jsx("div",{id:"zustand-subscribe",children:"subscribe"})}function d(){const e=s();return n.jsxs(o,{children:[n.jsx("h3",{children:"Zustand Test Page"}),n.jsxs("div",{children:["count: ",e.count]}),n.jsx(c,{}),n.jsx(i,{}),n.jsx("pre",{children:"\n          Rendering 너무한다.\n          Context API 사용하기보다 못하다.\n        "})]})}s.subscribe(((e,r)=>{document.querySelectorAll("#zustand-subscribe").forEach((n=>n.textContent=`(${r.count}) --\x3e ${e.count}`))}));export{d as default};
