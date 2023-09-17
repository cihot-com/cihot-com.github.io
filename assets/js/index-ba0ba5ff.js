import{n as e,b as r,j as t}from"./index-890d70c3.js";const a=e.div`
  .table-view {
    padding: 0.6em;
    border: 1px solid #ccc;
    border-radius: 0.6em;
    height: 50vh;
    overflow-y: hidden;

    table {
      width: 100%;
      td {
        min-width: 2em;
        white-space: break-spaces;
        word-break: break-all;
        vertical-align: top;
        padding: 0.6em;
      }
    }
  }

  progress {
    --size: 32px;
    width: calc(var(--size) * 2);
    height: var(--size);

    &::-webkit-progress-bar {
      background-color: green;
      width: 100%;
    }
    progress {
      background-color: green;
    }

    /* value: */
    &::-webkit-progress-value {
      background-color: red !important;
    }
    &::-moz-progress-bar {
      background-color: red !important;
    }
    color: red;
  }
  meter {
    --size: 32px;
    width: calc(var(--size) * 2);
    height: var(--size);

    &::-webkit-meter-bar {
      background: #333;
    }
    &::-webkit-meter-optimum-value {
      background: #888;
    }
    &::-webkit-meter-suboptimum-value {
      background: #444;
    }
    &::-webkit-meter-even-less-good-value {
      background: #111;
    }
  }
`;function n(){r.useRef(null),r.useRef(null);const[e,n]=r.useState((()=>Array.from({length:100},((e,r)=>({id:r+1,text:`text-${r+1}. `+Math.random().toString(36).slice(2).repeat(100*Math.random()),similar:Math.random(),createdAt:new Date}))))),[s,l]=r.useState(!1),[d,u]=r.useState(0),[c,h]=r.useState(10),m=r.useMemo((()=>e.sort(((e,r)=>s?e.similar-r.similar:r.similar-e.similar)).slice(d,d+c)),[e,s,d,c]);return t.jsxs(a,{children:[t.jsx(i,{handle:[s,l]}),t.jsx(o,{handles:[[d,u],[c,h]]}),t.jsx("progress",{value:d,max:e.length-1}),t.jsx("meter",{min:0,max:e.length-1,low:Math.round(.3*(e.length-1)),high:Math.round(.7*(e.length-1)),optimum:e.length-1,value:d}),t.jsx("div",{className:"table-view",onWheel:r=>{const{deltaY:t}=r,a=t>0?"down":"up";u((r=>{const t=r+("down"===a?1:-1);return t<0?0:t>e.length-1?e.length-1:t}))},children:t.jsx("table",{children:t.jsx("tbody",{children:m.map(((e,r)=>t.jsxs("tr",{children:[t.jsx("td",{children:d+r}),t.jsx("td",{children:e.id}),t.jsx("td",{style:{background:"#111"},children:e.text}),t.jsxs("td",{children:[Math.floor(100*e.similar).toString(),"%"]})]},`list-${r}`)))})})})]})}const s=e.span`
  margin: 0.33em;
  padding: 0.33em;
  border-radius: 0.33em;
  border: 2px solid #666;
  label > button {
    width: 4em;
    text-overflow: ellipsis;
  }
`;function i(e){const{handle:[r,a]}=e;return t.jsx(s,{children:t.jsxs("label",{children:["sort: ",t.jsx("button",{onClick:()=>a(!r),children:r?"ASC":"DESC"})]})})}const l=e.span`
  margin: 0.33em;
  padding: 0.33em;
  border-radius: 0.33em;
  border: 2px solid #666;
  label input {
    width: 3em;
  }
`;function o(e){const{handles:[[r,a],[n,s]]}=e;return t.jsxs(l,{children:[t.jsxs("label",{children:["start:"," ",t.jsx("input",{type:"number",value:r,min:0,onChange:e=>a(Number(e.target.value))})]}),t.jsxs("label",{children:["count:"," ",t.jsx("input",{type:"number",value:n,min:10,onChange:e=>s(Number(e.target.value))})]})]})}export{n as default};
