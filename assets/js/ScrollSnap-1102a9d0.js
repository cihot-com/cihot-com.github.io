import{j as n,n as r}from"./index-890d70c3.js";function o(){return n.jsx(a,{children:n.jsx("div",{className:"container",children:Array.from({length:12},((r,o)=>n.jsx("div",{className:"box",style:{backgroundColor:"#"+Math.random().toString(16).slice(2,8)},children:o},o)))})})}const a=r.div`
  .container {
    width: 200px;
    height: 400px;
    overflow: scroll;
    scroll-snap-type: y mandatory;
  }

  .box {
    height: 200px;
    scroll-snap-align: end;
  }
`;export{o as default};
