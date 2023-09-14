import{j as e,n as t,b as n}from"./index-8f1f19a3.js";import{a}from"./axios-80c154f5.js";function o({label:t,...n}){return e.jsxs(r,{className:"Input",children:[t&&e.jsx("label",{children:t}),e.jsx("input",{...n})]})}const r=t.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.5rem;
  }
  input {
    border: 2px solid #ccc;
    padding: 0.3rem;
    background-color: #333;
    color: #fff;
    &:focus {
      outline: none;
      border-color: blue;
    }
  }
`;function s(){const[t,a]=n.useState("ddb1@cihot.com"),[o,r]=n.useState("12345678"),[s,i]=n.useState(null),[d,u]=n.useState(1);return e.jsxs(l,{children:[e.jsx("h1",{children:"Express"}),e.jsx("button",{onClick:async()=>i(await async function(){try{const{data:e}=await c.getUsers();return e}catch(e){return e}}()),children:"Get Users"}),e.jsx("input",{type:"number",value:d,onChange:async e=>{let t=parseInt(e.currentTarget.value);isNaN(t)&&(t=1),u(t),i(await async function(e){try{const{data:t}=await c.getUser(e);return t}catch(t){return t}}(t))}}),e.jsxs("form",{method:"dialog",children:[e.jsx("input",{type:"email",value:t,onChange:e=>a(e.currentTarget.value)}),e.jsx("input",{type:"password",value:o,onChange:e=>r(e.currentTarget.value)}),e.jsx("button",{onClick:async()=>i(await async function(e,t){try{const{data:n}=await c.postUser(e,t);return n}catch(n){return n}}(t,o)),children:"Post User"})]}),e.jsx("button",{onClick:async()=>i(await async function(e,t){try{const{data:{token:n}}=await c.login(e,t);return localStorage.setItem("token",n),n}catch(n){return n}}(t,o)),children:"Login"}),e.jsx("button",{onClick:async()=>{const e=localStorage.getItem("token");if(e){const{data:t}=await c.auth(e);i(t)}else i("no token")},children:"auth"}),e.jsx("pre",{children:JSON.stringify(s,null,2)}),e.jsx("hr",{})]})}const l=t.div`
  input,
  button,
  select {
    font-size: 1rem;
    padding: 0.5rem;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem;
  }
  hr {
    margin-bottom: 10rem;
    opacity: 0.3;
  }
`,i=a.create({baseURL:"http://localhost:3300"});i.interceptors.response.use((e=>e),(e=>{var t;return null==(t=e.response)?void 0:t.data}));const c={getUsers:async()=>await i.get("/user"),postUser:async(e,t)=>await i.post("/user",{email:e,password:t}),getUser:async e=>await i.get(`/user/${e}`),login:async(e,t)=>await i.post("/user/login",{email:e,password:t}),auth:async e=>await i.post("/user/auth",null,{headers:{Authorization:`Bearer ${e}`}})};function d(){const[t,a]=n.useState({}),r=e=>{const{name:n,value:o}=e.target;a({...t,[n]:o})},l=e=>{if(e.target instanceof HTMLSelectElement){const{name:n,multiple:o}=e.target;if(o){const o=Array.from(e.target.selectedOptions).map((e=>e.value));a({...t,[n]:o})}else{const{value:o}=e.target;a({...t,[n]:o})}return}const{name:n,value:o,checked:r}=e.target;t[n]=t[n]||new Set;const s=new Set(Array.isArray(t[n])?t[n]:void 0);r?s.add(o):s.delete(o),a({...t,[n]:Array.from(s)})};return e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsxs(u,{onSubmit:e=>{e.preventDefault();const t=new FormData(e.currentTarget);fetch("http://localhost:3000/demo/pipe/upload",{method:"POST",headers:{"Content-Type":"multipart/form-data"},body:t})},noValidate:!0,method:"dialog",children:[e.jsx(o,{}),e.jsxs("fieldset",{children:[e.jsx("legend",{children:"Form"}),e.jsx("label",{htmlFor:"name",children:"Name"}),e.jsx("input",{type:"text",id:"name",name:"name",onChange:r,placeholder:"name"}),e.jsx("label",{htmlFor:"email",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",onChange:r}),e.jsx("label",{htmlFor:"password",children:"Password"}),e.jsx("input",{type:"password",id:"password",name:"password"}),e.jsx("label",{htmlFor:"password",children:"Confirm Password"}),e.jsx("input",{type:"password",id:"password",name:"password",onChange:r})]}),e.jsxs("fieldset",{children:["Role:",e.jsx("label",{htmlFor:"role-admin",children:"Admin"}),e.jsx("input",{type:"radio",id:"role-admin",name:"role",value:"admin",onChange:r}),e.jsx("label",{htmlFor:"role-user",children:"User"}),e.jsx("input",{type:"radio",id:"role-user",name:"role",value:"user",onChange:r}),e.jsx("label",{htmlFor:"role-guest",children:"Guest"}),e.jsx("input",{type:"radio",id:"role-guest",name:"role",value:"guest",onChange:r})]}),e.jsxs("fieldset",{children:["Roles:",e.jsx("label",{htmlFor:"roles-admin",children:"Admin"}),e.jsx("input",{type:"checkbox",id:"roles-admin",name:"multiple",value:"admin",onChange:l}),e.jsx("label",{htmlFor:"roles-user",children:"User"}),e.jsx("input",{type:"checkbox",id:"roles-user",name:"multiple",value:"user",onChange:l}),e.jsx("label",{htmlFor:"roles-guest",children:"Guest"}),e.jsx("input",{type:"checkbox",id:"roles-guest",name:"multiple",value:"guest",onChange:l})]}),e.jsxs("select",{id:"roles-select",name:"select",multiple:!0,onChange:l,children:[e.jsx("option",{value:"one",children:"one"}),e.jsx("option",{value:"two",children:"two"}),e.jsx("option",{value:"three",children:"three"})]}),e.jsx("input",{type:"file",name:"file",multiple:!0,onChange:async e=>{var t;const n={},a=null==(t=e.currentTarget.files)?void 0:t[0];if(a){const e=new FormData;e.set("files",a);try{const t=await fetch("http://localhost:3000/demo/pipe/upload",{method:"post",body:e,headers:n});await t.text()}catch(o){}}}}),e.jsx("button",{type:"submit",children:"Submit"}),e.jsx("br",{}),e.jsx("div",{children:JSON.stringify(t,null,2)})]})]})}const u=t.form`
  fieldset {
    display: flex;
    flex-direction: column;
    justify-content: center;

    label {
      cursor: pointer;
    }
    label:has(+ input[type='radio']:checked),
    label:has(+ input[type='checkbox']:checked) {
      &,
      &::after {
        content: '•';
        color: red;
        display: inline-block;
        margin-left: 4px;
      }
    }

    input,
    button {
      color: #fff;
      background-color: #111;
      outline: none;
      border: 1px solid transparent;
      font-size: 1em;
      font-family: mono-zh-ch, mono, sans-serif;

      &[type='radio'],
      &[type='checkbox'] {
        display: none;
      }

      &:focus {
        border: 1px solid red;
      }

      &::placeholder {
        color: #888;
        font-style: italic;
        text-indent: 1em;
        opacity: 0.8;
        font-size: 1em;
      }

      &:-webkit-autofill {
        &,
        &:hover,
        &:focus,
        &:active {
          font-size: 1em;
          -webkit-text-fill-color: red !important;
          background-color: transparent !important;
        }
      }
    }
  }
`;export{d as default};
