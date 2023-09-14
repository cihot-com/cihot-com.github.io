import{j as e,n as t,b as i}from"./index-8f1f19a3.js";import{R as n,i as s,a as o,g as r}from"./ingredients-82c0d4c8.js";import{m as a}from"./motion-abf7f7de.js";import{A as l}from"./index-f26583fd.js";import"./SVGVisualElement-210c37ed.js";import"./index-7074372a.js";import"./use-motion-value-cdb7a71a.js";import"./use-transform-bfeb503f.js";import"./use-unmount-effect-e9aae080.js";function d(){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 20 20",children:[e.jsx("path",{d:"M 3 3 L 17 17",fill:"transparent",strokeWidth:"3",strokeLinecap:"round"}),e.jsx("path",{d:"M 17 3 L 3 17",fill:"transparent",strokeWidth:"3",strokeLinecap:"round"})]})}const p=({item:t,onClick:i,onRemove:s,isSelected:o})=>e.jsxs(n.Item,{value:t,id:t.label,initial:{opacity:0,y:30},animate:{opacity:1,backgroundColor:o?"#8888":"#5555",y:0,transition:{duration:.15}},exit:{opacity:0,y:20,transition:{duration:.15}},whileDrag:{backgroundColor:"#9999"},className:o?"selected":"",onPointerDown:i,children:[e.jsx(a.span,{layout:"position",children:`${t.icon} ${t.label}`}),e.jsx(a.div,{layout:!0,className:"close",children:e.jsx(a.button,{disabled:!o,onPointerDown:e=>{e.stopPropagation(),s()},initial:!1,children:e.jsx(d,{})})})]});function x(){return e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"10",viewBox:"0 0 20 20",style:{transform:"rotate(45deg)",stroke:"black"},children:[e.jsx("path",{d:"M 3 3 L 17 17",fill:"transparent",strokeWidth:"3",strokeLinecap:"round"}),e.jsx("path",{d:"M 17 3 L 3 17",fill:"transparent",strokeWidth:"3",strokeLinecap:"round"})]})}const c=t.div`
  .window {
    min-height: 360px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075);
    display: flex;
    flex-direction: column;
    border: 1px solid #8888;

    .nav {
      padding: 5px 5px 0;
      border-radius: 10px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 1px solid #8888;
      height: 44px;
      display: grid;
      grid-template-columns: 1fr 35px;
      overflow: hidden;
    }

    .tabs {
      flex-grow: 1;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      flex-wrap: nowrap;
      padding-right: 10px;
    }

    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 128px;
      flex-grow: 1;
      user-select: none;
    }

    ul,
    li {
      list-style: none;
      padding: 0;
      margin: 0;
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 14px;
    }

    li {
      border-radius: 5px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      width: 100%;
      padding: 10px 15px;
      position: relative;
      cursor: pointer;
      height: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      position: relative;
      user-select: none;
    }

    li span {
      flex-shrink: 1;
      flex-grow: 1;
      line-height: 18px;
      white-space: nowrap;
      display: block;
      min-width: 0;
      padding-right: 30px;
      mask-image: linear-gradient(to left, transparent 20px, #fff 40px);
      -webkit-mask-image: linear-gradient(to left, transparent 20px, #fff 40px);
    }

    li .close {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
    }

    li button {
      width: 20px;
      height: 20px;
      border: 0;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      stroke: #000;
      margin-left: 10px;
      cursor: pointer;
      flex-shrink: 0;
    }

    /* .background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 300px;
    } */

    .add-item {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 0;
      cursor: pointer;
      align-self: center;
    }

    .add-item:disabled {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
  }
`;function h(){const[t,d]=i.useState(s),[h,m]=i.useState(t[0]);return e.jsx(c,{children:e.jsxs("div",{className:"window",children:[e.jsxs("nav",{className:"nav",children:[e.jsx(n.Group,{as:"ul",axis:"x",onReorder:d,className:"tabs",values:t,children:e.jsx(l,{initial:!1,children:t.map((i=>e.jsx(p,{item:i,isSelected:h===i,onClick:()=>m(i),onRemove:()=>(e=>{e===h&&m(function(e,t){const i=e.indexOf(t);return-1===i?e[0]:i===e.length-1?e[e.length-2]:e[i+1]}(t,e)),d(function([...e],t){const i=e.indexOf(t);return i>-1&&e.splice(i,1),e}(t,e))})(i)},i.label)))})}),e.jsx(a.button,{className:"add-item",onClick:()=>{const e=r(t);e&&(d([...t,e]),m(e))},disabled:t.length===o.length,whileTap:{scale:.9},children:e.jsx(x,{})})]}),e.jsx("div",{className:"main",children:e.jsx(l,{mode:"wait",children:e.jsx(a.div,{animate:{opacity:1,y:0},initial:{opacity:0,y:20},exit:{opacity:0,y:-20},transition:{duration:.15},children:h?h.icon:"😋"},h?h.label:"empty")})})]})})}export{h as default};
