import{j as r,r as a,L as o,n as e}from"./index-890d70c3.js";const s=()=>r.jsxs(f,{children:[r.jsx("h2",{children:location.href}),r.jsx("nav",{children:Object.values(a).map((({props:{path:a},key:e})=>r.jsx(o,{to:a,children:a},e)))})]}),f=e.main`
  h2 {
    color: #8888;
  }
  nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5em;

    a {
      color: #fff8;
      padding: 1em;
      border-radius: 0.5em;
      border: 1px solid #fff3;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: #ffff;
        background-color: #fff3;
      }
    }
  }
`;export{s as default};
