import{j as t,n as i}from"./index-890d70c3.js";function r(){return t.jsx(e,{children:t.jsxs("g",{children:[t.jsxs("defs",{children:[t.jsx("circle",{id:"myCircle",cx:"50",cy:"50",r:"45"}),t.jsxs("linearGradient",{id:"myGradient",gradientTransform:"rotate(90)",children:[t.jsx("stop",{offset:"20%","stop-color":"gold"}),t.jsx("stop",{offset:"90%","stop-color":"red"})]})]}),t.jsx("use",{x:"100",y:"5",href:"#myCircle",fill:"url('#myGradient')"})]})})}const e=i.svg`
  width: 100vw;
  height: 100vh;
  & > div {
    width: 100px;
    height: 100px;
    background-color: crimson;
    margin-bottom: 4px;
    transform: translateX(1px);
    position: relative;
  }

  text {
    fill: white;
  }
`;function s(){return t.jsx(o,{children:t.jsx(r,{})})}const o=i.div`
  svg {
    width: 100%;
    min-height: 100px;
    outline: 1px thick #000;
  }
`;export{s as default};
