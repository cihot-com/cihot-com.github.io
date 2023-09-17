import{j as i,n as e,b as r}from"./index-890d70c3.js";function n(){return i.jsxs(s,{children:[i.jsx("div",{children:"Comp"}),i.jsx("img",{src:"/images/11.png",alt:"1"}),i.jsx("div",{className:"img"})]})}const s=e.section`
  padding: 1rem;

  img {
    width: 200px;
  }

  .img {
    width: 200px;
    height: 200px;
    background-image: url('/images/11.png');
    background-size: 160%;
    background-repeat: no-repeat;
    background-position: 60% 30%;
  }

  img,
  .img {
    user-select: none;
    opacity: 0.3;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    transition: opacity 0.3s ease-in-out;
    border-radius: 1rem;
  }
`;function o(){return i.jsx("section",{children:i.jsx(r.Profiler,{id:"profiler-1",onRender:()=>{},children:i.jsx(n,{})})})}export{o as default};
