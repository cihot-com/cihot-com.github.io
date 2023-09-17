import{b as e,j as t,n as r}from"./index-890d70c3.js";import{g as n}from"./index-4dbe252f.js";function o(){const r=e.useRef(),o=e.useRef(null),[a,i]=e.useState(0);e.useEffect((()=>{const e=n.context((()=>{const e=n.timeline({paused:!0,onUpdate:()=>{Number(e.time().toFixed(2)),Number(e.globalTime().toFixed(2)),Number(e.progress().toFixed(2))}}),t=o.current;e.set(t,{xPercent:-150,yPercent:-50,transformOrigin:"50% 50%"}).to(t,{duration:10,motionPath:{path:"M10 315 L 110 215 A 30 50 0 0 1 162.55 162.45 L 172.55 152.45 A 30 50 -45 0 1 215.1 109.9 L 315 1",autoRotate:!0}}).to(t,{rotate:0}),r.current=e}));return()=>{e.revert()}}),[]);return t.jsxs(s,{className:"container",children:[t.jsx("h2",{children:"Timeline"}),t.jsxs("div",{children:[t.jsxs("button",{onClick:()=>i((e=>e+1)),children:["count: ",a]}),t.jsx("button",{onClick:()=>{var e;null==(e=r.current)||e.restart()},children:"restart"}),t.jsx("button",{onClick:()=>{var e;null==(e=r.current)||e.pause()},children:"pause"}),t.jsx("button",{onClick:()=>{var e;null==(e=r.current)||e.play()},children:"play"}),t.jsx("button",{onClick:()=>{var e;null==(e=r.current)||e.seek(10*Math.random())},children:"seek"}),t.jsx("button",{onClick:()=>{var e;null==(e=r.current)||e.progress(Math.random())},children:"progress"})]}),t.jsx(s,{className:"target",ref:o,children:"^_^"})]})}const s=r.div`
  width: 500px;
  height: 500px;
  border: 1px solid #888;
  position: relative;

  .target {
    --gap-b: 4px;

    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #888;
    color: #fff;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    border-radius: var(--gap-b);
    padding: var(--gap-b);
  }
`;export{o as default};
