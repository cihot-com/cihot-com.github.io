import{b as t,j as e,n}from"./index-8f1f19a3.js";import{u as s}from"./use-motion-value-cdb7a71a.js";import{i as r,a as i,f as o,m as c}from"./SVGVisualElement-210c37ed.js";import{M as a,u,m as l}from"./motion-abf7f7de.js";import{u as f,a as m}from"./use-transform-bfeb503f.js";import"./index-7074372a.js";function d(t,...e){const n=t.length;return f(e.filter(r),(function(){let s="";for(let i=0;i<n;i++){s+=t[i];const n=e[i];n&&(s+=r(n)?n.get():n)}return s}))}function g(e){const n=s(e.getVelocity());return function(e,n,s){t.useInsertionEffect((()=>e.on(n,s)),[e,n,s])}(e,"velocityChange",(t=>{n.set(t)})),n}const p=n.figure`
  .item {
    width: 100px;
    height: 100px;
    background: #8888;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: move;
    user-select: none;
  }
`;function x(){const n=s(0),f=g(function(e,n={}){const{isStatic:l}=t.useContext(a),f=t.useRef(null),m=s(r(e)?e.get():e),d=()=>{f.current&&f.current.stop()};return t.useInsertionEffect((()=>m.attach(((t,e)=>{if(l)return e(t);if(d(),f.current=i({keyframes:[m.get(),t],velocity:m.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...n,onUpdate:e}),!o.isProcessing){const t=performance.now()-o.timestamp;t<30&&(f.current.time=c(t))}return m.get()}),d)),[JSON.stringify(n)]),u((()=>{if(r(e))return e.on("change",(t=>m.set(parseFloat(t))))}),[m]),m}(n,{damping:50,stiffness:400})),x=m(f,[-3e3,0,3e3],[2,1,2],{clamp:!1});return d`content: ${n}`,t.useEffect((()=>(n.on("change",(t=>{})),()=>{})),[]),e.jsxs(p,{children:[e.jsx("figcaption",{children:"Example_5"}),e.jsx(l.div,{className:"item",drag:"x",dragElastic:1,dragConstraints:{left:-200,right:200},style:{x:n,scale:x},children:"div"}),e.jsx("button",{onClick:()=>{n.set(100*Math.random())},children:"jump"}),e.jsxs(l.button,{onClick:()=>n.set(100*Math.random()),children:[e.jsx(l.div,{children:n}),e.jsx(l.div,{children:n.isAnimating()?"o":"x"}),e.jsx(l.div,{children:f})]})]})}function h(){return e.jsxs("figure",{children:[e.jsx("figcaption",{children:"Examples"}),e.jsx(x,{})]})}export{h as default};
