import{b as e,j as t,n as i}from"./index-890d70c3.js";import"./index-1bbb7398.js";import{B as n}from"./ButtonGroup-36de51c1.js";import{B as s}from"./Button-3c46eb6f.js";import{R as o,a as r}from"./ingredients-e46087c5.js";import{u as l}from"./use-drag-controls-b414dbe1.js";import{m as a}from"./motion-1e207df9.js";import{A as d}from"./index-7836b9fa.js";import{c}from"./emotion-react.browser.esm-c234fe41.js";import{u}from"./use-motion-value-9c2a72a8.js";import{a as p}from"./animate-af04a6e3.js";import"./createTheme-1031cd5a.js";import"./styled-8412bb65.js";import"./assertThisInitialized-c6bb24a5.js";import"./inheritsLoose-5d4bdff6.js";import"./setPrototypeOf-b9a4b5f8.js";import"./SVGVisualElement-77214677.js";import"./index-7074372a.js";import"./use-transform-54c0589b.js";import"./use-unmount-effect-807b54ef.js";import"./resolve-element-6bcb316e.js";const m=i(o.Group)`
  display: flex;
  flex-direction: ${({direction:e})=>e};
  position: relative;
  gap: 4px;
`;function x({item:e}){const i=l();return t.jsxs(o.Item,{as:"li",className:"item",value:e,dragListener:!1,dragControls:i,children:[e,t.jsx("button",{onPointerDown:e=>{i.start(e)},children:"+"})]},`k-${e}`)}function h(){const[i,o]=e.useState("x"),[r,l]=e.useState((()=>[1,2,3])),a=e.useMemo((()=>"x"===i?"row":"column"),[i]);return t.jsxs(f,{children:[t.jsxs(n,{children:[t.jsx(s,{onClick:()=>o("x"),children:"x"}),t.jsx(s,{onClick:()=>o("y"),children:"y"})]}),t.jsx("div",{children:t.jsx(m,{as:"ul",axis:i,direction:a,className:"group",values:r,onReorder:e=>{l(e)},children:r.map((e=>t.jsx(x,{item:e},e)))})})]})}const f=i.div`
  .item {
    width: 100px;
    list-style: none;
    /* position: relative; */
    display: flex;
    justify-content: space-between;
    background-color: #5555;
    &:hover {
      background-color: #8888;
    }
    user-select: none;
    button {
      cursor: grab !important;
    }
    border: 2px solid #5555;
    border-radius: 6px;
    padding: 12px;
  }
`,j=[{id:1,name:"a"},{id:2,name:"b"},{id:3,name:"c"}],g=i.div`
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      position: relative;
      flex-grow: 1;
      padding: 10px;
      cursor: pointer;
      &.selected {
        color: #ff0;
      }
      .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #ff0;
      }
    }
  }
`;function b(){const[i,n]=e.useState(j[0]);return t.jsxs(g,{children:[t.jsx("nav",{children:t.jsx("ul",{children:j.map((e=>t.jsxs(a.li,{onClick:()=>n(e),className:i===e?"selected":"",whileHover:{backgroundColor:"#8888"},children:[e.name,e===i?t.jsx(a.div,{className:"underline",layoutId:"underline"}):null]},e.id)))})}),t.jsx("main",{children:t.jsx(d,{mode:"wait",children:t.jsx(a.div,{initial:{y:10,opacity:0},animate:{y:0,opacity:1},exit:{y:-10,opacity:0},transition:{duration:.2},children:i?i.name:"empty"},i?i.id:"empty")})})]})}const y=i.div`
  /* min-height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center; */

  .target {
    box-sizing: border-box;
    background-color: #8888;
    width: 100px;
    height: 100px;
    border: 1px solid #8888;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;function v(){const[i,n]=e.useState((()=>r.map((e=>e.icon)))),s=e.useMemo((()=>i.length===r.length),[i]),o=e.useMemo((()=>0===i.length),[i]),l=e.useCallback((()=>{n((e=>[...e.sort((()=>Math.sign(Math.random()-.5)))]))}),[n]),u=e.useCallback((()=>{const e=r.findIndex((e=>!i.includes(e.icon)));if(-1===e)return;const t=r[e].icon;n((e=>[...e,t]))}),[i,n]),p=e.useCallback((()=>{if(0===i.length)return;const e=Math.floor(Math.random()*i.length);n((t=>t.filter(((t,i)=>i!==e))))}),[i,n]);return t.jsxs("figure",{children:[t.jsxs("figcaption",{style:{marginBottom:10,borderBottom:"2px solid #5555"},css:c`
          button {
            width: 80px;
            padding: 1em;
            text-overflow: ellipsis;
          }
        `,children:[t.jsx("button",{onClick:l,children:"shuffle"}),t.jsx("button",{disabled:s,onClick:u,children:"add"}),t.jsx("button",{disabled:o,onClick:p,children:"remove"})]}),t.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gridTemplateRows:"repeat(4, 1fr)",gap:10,width:200},children:t.jsx(d,{children:i.map((e=>t.jsx(a.div,{layoutId:e,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.15},style:{fontSize:"2em",textAlign:"center",backgroundColor:"#5555"},children:e},e)))})})]})}function k(){const i=u(0);return e.useEffect((()=>{const e=p(i,100,{duration:2});return()=>{e.stop()}}),[]),t.jsxs(y,{children:[t.jsx(v,{}),t.jsx(w,{}),t.jsx(h,{}),t.jsx(b,{})]})}function w(){const[i,n]=e.useState((()=>[{id:1,subtitle:"a",title:"A"},{id:2,subtitle:"b",title:"B"},{id:3,subtitle:"c",title:"C"}])),[s,o]=e.useState(),r=e.useMemo((()=>i.find((e=>e.id===s))),[s]);return t.jsxs(t.Fragment,{children:[t.jsx(a.div,{style:{display:"flex",justifyContent:"center",gap:10},children:i.map((e=>t.jsxs(a.div,{layoutId:String(e.id),onClick:()=>o(e.id),style:{flexGrow:1,backgroundColor:"#8888",borderRadius:10,textAlign:"center"},children:[t.jsx(a.h5,{children:e.subtitle}),t.jsx(a.h2,{children:e.title})]},e.id)))}),t.jsx(d,{children:r&&t.jsxs(a.div,{layoutId:String(s),style:{position:"absolute",top:0,left:0,width:"100vw",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",backgroundColor:"#8888",zIndex:9},children:[t.jsx(a.h5,{children:r.subtitle}),t.jsx(a.h2,{children:r.title}),t.jsx(a.button,{onClick:()=>o(void 0),children:"x"})]})})]})}i.div`
  width: 160px;
  background-color: #fff4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 50px;
  padding: 10px;
  cursor: pointer;
  &[data-on='true'] {
    justify-content: flex-end;
    width: 260px;
  }
  .handle {
    width: 80px;
    height: 80px;
    background-color: #ff0;
    border-radius: 40px;
  }
`,new class SwitchTransition{constructor(){Object.assign(this,{type:"spring",stiffness:700,damping:30})}};export{k as default};
