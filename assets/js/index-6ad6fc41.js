import{n as r,b as o,j as e}from"./index-8f1f19a3.js";import{c}from"./emotion-react.browser.esm-492a199c.js";const d=c`
  --color: #333;
  --bg-color: #ddd;
`,a=c`
  --color: #ddd;
  --bg-color: #333;
`,t=r.div`
  ${d}

  @media (prefers-color-scheme: dark) {
    ${a}
  }

  color: var(--color);
  background-color: var(--bg-color);

  &[data-theme='light'] {
    ${d}
  }
  &[data-theme='dark'] {
    ${a}
  }
`,l=()=>{const[r,c]=o.useState("light");return e.jsxs(t,{"data-theme":r,children:[e.jsx("h1",{children:r}),e.jsx(s,{onClick:()=>c("os"),children:"os"}),e.jsx(s,{onClick:()=>c("light"),children:"light"}),e.jsx(s,{onClick:()=>c("dark"),children:"dark"})]})},s=r.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0 0 0 0.5rem;
  color: var(--color);
  background-color: var(--bg-color);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;export{l as default};
