import{j as e,n as i}from"./index-8f1f19a3.js";import{A as n}from"./Api-22cc4065.js";import"./axios-80c154f5.js";function o(){return e.jsxs(s,{children:[e.jsx("h3",{children:"Sequelize"}),e.jsx("form",{method:"dialog",children:e.jsx("button",{onClick:()=>{!async function(){await n.post("/sequelize/Demo",{id:{type:"INTEGER"},name:"STRING(30)"})}()},children:"Send"})})]})}const s=i.div`
  button {
    padding: 2rem;
  }
`;export{o as default};
