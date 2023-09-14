import{b as e,j as t,n as r}from"./index-8f1f19a3.js";import{g as o,L as n}from"./index-4dbe252f.js";const a=o.utils.random(-200,200,1,!0);function s(){const r=e.useRef(null),[a,s]=e.useState(!1),[c,i]=e.useState(null),[l,d]=e.useState(0);e.useLayoutEffect((()=>{Date.now();const e=o.context((async()=>{c&&c.revert();const e=o.timeline({onUpdate(){}});e.to(".target",{duration:2,x:100,ease:n.easeNone}).to(".target",{y:10},0).to(".target",{y:0},1).to(".target",{background:"yellow",y:0},1),i(e)}),r);return()=>e.revert()}),[]),e.useLayoutEffect((()=>{null==c||c.reversed(a)}),[a]),e.useLayoutEffect((()=>{o.context((async()=>{o.to(".target",{rotate:"+=360"})}),r)}));return t.jsxs(u,{ref:r,children:[t.jsx("h3",{onMouseEnter:e=>{o.to(e.currentTarget,{scale:1.2,transformOrigin:"left center",duration:1})},onMouseLeave:e=>{o.to(e.currentTarget,{scale:1,duration:1})},children:"Ex1"}),t.jsxs("div",{children:[t.jsx("button",{onClick:()=>s((e=>!e)),children:"toggle reversed"}),t.jsx("button",{onClick:()=>d((e=>e+1)),children:l})]}),t.jsx("div",{className:"target"})]})}window.random=a;const u=r.div`
  h3 {
    color: yellow;
  }
  .target {
    width: 100px;
    height: 100px;
    background: red;
  }
`;export{s as default};
