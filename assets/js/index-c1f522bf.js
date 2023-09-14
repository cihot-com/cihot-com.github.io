import{b as e,j as i,e as n,n as t}from"./index-8f1f19a3.js";import{A as r}from"./index-f26583fd.js";import{m as s}from"./motion-abf7f7de.js";import"./SVGVisualElement-210c37ed.js";import"./index-7074372a.js";import"./use-unmount-effect-e9aae080.js";const l=e.forwardRef(((n,t)=>{const s=e.useRef(null),l=e.useRef(null);return e.useImperativeHandle(t,(()=>({elementRef:s,ulRef:l,getElement:()=>l.current}))),i.jsxs("figure",{ref:s,children:[i.jsx("figcaption",{children:"Portal list"}),i.jsx(r,{children:i.jsx("ul",{ref:l})})]})})),a={initial:{x:10},animate:{x:0,transition:{delayChildren:1,staggerChildren:-1}},exit:{x:10}},o={initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}};function c(n){const{list:t,store:l}=n,c=e.useRef(null);return i.jsx(r,{children:t.map((e=>i.jsxs(s.li,{layout:!0,variants:a,initial:"initial",animate:"animate",exit:"exit",children:[e.name,i.jsx(s.button,{ref:c,variants:o,onClick:()=>{l.remove(e.id)},children:"x"})]},e.id)))})}let d=0,u=[],m=[];const x={add(e){u=[...u,{id:++d,name:e}],f()},remove(e){u=e?u.filter((i=>i.id!==e)):u.slice(0,-1),f(e)},subscribe:e=>(m=[...m,e],()=>{m=m.filter((i=>i!==e))}),getSnapshot:()=>u};function f(...e){for(let i of m)i(...e)}const j=()=>[e.useSyncExternalStore(x.subscribe,x.getSnapshot),x],p=({portalRef:t})=>{var r,s;const l=e.useRef(null),[a,o]=j();return i.jsxs("div",{className:"trigger",children:[i.jsx("h1",{children:"Trigger"}),i.jsxs("form",{ref:l,method:"dialog",onSubmit:()=>{if(null===l.current)return;const e=new FormData(l.current).get("name");null!==e&&o.add(e)},children:[i.jsx("label",{htmlFor:"name",children:"Name"}),i.jsx("input",{type:"text",id:"name",name:"name"}),i.jsx("button",{type:"submit",children:"Submit"})]}),(null==(s=null==(r=t.current)?void 0:r.getElement)?void 0:s.call(r))&&n.createPortal(i.jsx(c,{list:a,store:o}),t.current.getElement())]})},g=t.div`
  .figures {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    padding: 1em;
  }
  figure {
    margin: 0;
    background-color: #5555;
    border-radius: 0.3em;
    padding: 1em;
    display: inline-block;
    flex-grow: 1;
  }
`;function h({list:e}){return i.jsxs("figure",{children:[i.jsx("figcaption",{children:"No portal list"}),i.jsx(r,{children:e.map((({id:e,name:n})=>i.jsx(s.li,{initial:{x:10},animate:{x:0},exit:{x:10},children:n},e)))})]})}function b(){const n=e.useRef({}),[t,r]=j();return i.jsxs(g,{children:[i.jsx(p,{portalRef:n}),i.jsxs("section",{className:"figures",children:[i.jsx("figure",{children:i.jsx("pre",{children:i.jsx("code",{children:JSON.stringify(t,null,2)})})}),i.jsx(h,{list:t}),i.jsx(l,{ref:n})]})]})}export{b as default};
