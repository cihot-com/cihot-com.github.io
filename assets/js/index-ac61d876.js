import{b as t,j as e,n as i}from"./index-890d70c3.js";import{R as o,a as s}from"./ingredients-e46087c5.js";import{u as n}from"./use-motion-value-9c2a72a8.js";import{a as r}from"./animate-af04a6e3.js";import"./motion-1e207df9.js";import"./index-7074372a.js";import"./SVGVisualElement-77214677.js";import"./use-transform-54c0589b.js";import"./resolve-element-6bcb316e.js";const a="0px 0px 0px rgba(0,0,0,0.8)";const p=({item:i})=>{const s=n(0),p=function(e){const i=n(a);return t.useEffect((()=>{let t=!1;e.on("change",(e=>{const o=t;0!==e?(t=!0,t!==o&&r(i,"5px 5px 10px rgba(0,0,0,0.3)")):(t=!1,t!==o&&r(i,a))}))}),[e]),i}(s);return e.jsxs(o.Item,{value:i,id:i.label,style:{boxShadow:p,y:s},children:[i.icon," ",i.label]})},l=i.div`
  nav {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
  }

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 16px;
  }

  ul {
    position: relative;
    width: 300px;
  }

  li {
    border-radius: 10px;
    margin-bottom: 10px;
    width: 100%;
    padding: 15px 18px;
    position: relative;
    background: #8883;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    cursor: grab;
  }

  li svg {
    width: 18px;
    height: 18px;
    cursor: grab;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background: #fff;
  }

  .refresh {
    padding: 10px;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;function d(){const[i,n]=t.useState(s);return t.useEffect((()=>{}),[i]),e.jsxs(l,{children:[JSON.stringify(i),e.jsx(o.Group,{onReorder:n,values:i,onPointerUp:()=>{},children:i.map((t=>e.jsx(p,{item:t},t.icon)))})]})}export{d as default};
