import{b as o,j as e,n}from"./index-890d70c3.js";let i=0,t=[{id:i++,text:"Todo #1"}],s=[(...o)=>{}];const d={addTodo(){t=[...t,{id:++i,text:"Todo #"+i}],r()},removeTodo(o){t=o?t.filter((e=>e.id!==o)):t.slice(0,-1),r(o)},suffixTodo(){t=[...t.sort((()=>Math.random()<.5?1:-1))],r()},subscribe:o=>(s=[...s,o],()=>{s=s.filter((e=>e!==o))}),getSnapshot:()=>t};function r(...o){for(let e of s)e(...o)}const c=()=>o.useSyncExternalStore(d.subscribe,d.getSnapshot);function l(){const o=c();return e.jsxs("figure",{className:"todos",children:[e.jsx("button",{onClick:()=>d.addTodo(),children:"Add"}),e.jsx("button",{onClick:()=>d.removeTodo(),children:"Remove"}),e.jsx("button",{onClick:()=>d.suffixTodo(),children:"Suffix"}),e.jsx("hr",{}),e.jsx("ul",{children:o.map((o=>e.jsx("li",{children:o.text},o.id)))})]})}function x(){const o=c();return e.jsx("figure",{className:"view",children:e.jsx("ul",{children:o.map((o=>e.jsxs("li",{children:[o.text," ",e.jsx("button",{onClick:()=>{d.removeTodo(o.id)},children:"Remove"})]},o.id)))})})}function u(){return e.jsxs(a,{children:[e.jsx("h1",{children:"SyncStore"}),e.jsx(l,{}),e.jsx(x,{})]})}const a=n.section`
  figure {
    display: inline-block;
  }
  li {
    margin: 0.5em 0;
  }
  button {
    padding: 0 1em;
  }
`;export{u as default};
