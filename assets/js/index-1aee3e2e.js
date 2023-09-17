var e;import{n as r,j as a,b as n}from"./index-890d70c3.js";import{G as t}from"./iconBase-d4417ec4.js";import{c as o}from"./emotion-css.esm-801c5800.js";const i=r.div`
  textarea {
    width: 100%;
    min-height: 100px;
    &:disabled {
      background-color: #333;
    }
  }

  input[name='minCode'],
  input[name='maxCode'] {
    width: 5em;
  }

  .buttons {
    width: 100%;
    overflow-x: scroll;
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    .button {
      background-color: #111;
      cursor: pointer;
      padding: 0 14px;
      border-radius: 4px;
      i {
        font-size: 0.75em;
        color: #444;
      }
      div {
        color: #999;
      }
      :hover {
        filter: brightness(1.5);
        background-color: #222;
      }
    }
  }

  #regex {
    color: yellow;
    text-align: center;
  }

  #result {
    display: flex;
    flex-wrap: wrap;
    .char {
      display: flex;
      flex-direction: column;
      border: 1px solid #666;
      margin: 1px;
      padding: 4px;
      min-width: 3em;
      text-align: center;
      min-height: 3em;
      &--code-point {
        color: #9999;
      }

      &.unicode {
        border-color: #f009;
      }
    }
  }
`,s=r.div`
  display: flex;
  label {
    display: inline-block;
    background-color: #6666;
    color: #fff;
    user-select: none;
    margin-left: 1px;
    font-size: 1.5rem;

    &:first-of-type {
      flex-grow: 1;
    }

    input[type='search'] {
      font-size: 16px;
      background-color: #0000;
      color: #fff;
      border: none;
      outline: none;
      padding-left: 1em;
      width: calc(100% - 2em);
    }
  }
`;function c(e){return t({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{fillRule:"evenodd",d:"M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 1 1 .707.707Zm9.9-.707a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.314.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707ZM6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5-6.5a.5.5 0 0 0-1 0v2.117L8.257 5.57a.5.5 0 0 0-.514.858L9.528 7.5 7.743 8.571a.5.5 0 1 0 .514.858L10 8.383V10.5a.5.5 0 1 0 1 0V8.383l1.743 1.046a.5.5 0 0 0 .514-.858L11.472 7.5l1.785-1.071a.5.5 0 1 0-.514-.858L11 6.617V4.5Z"}}]})(e)}function u({source:e,global:r,ignoreCase:n,multiline:t,sticky:o,unicode:i,dotAll:u,setSource:l,setGlobal:p,setIgnoreCase:m,setMultiline:d,setSticky:g,setUnicode:h,setDotAll:S}){return a.jsxs(s,{className:"reg-exp-comp",children:[a.jsxs("label",{children:[a.jsx(c,{}),a.jsx("input",{type:"search",placeholder:"source",value:e,onChange:e=>l(e.target.value)})]}),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:r,onChange:()=>p(!r)})," ","g"]}),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:n,onChange:()=>m(!n)})," ","i"]}),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:t,onChange:()=>d(!t)})," ","m"]}),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:o,onChange:()=>g(!o)})," ","y"]}),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:i,onChange:()=>h(!i)})," ","u"]}),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:u,onChange:()=>S(!u)})," ","s"]})]})}{const r="a≈𝒳𝒴😄",a=[];for(let n of r)a.push({char:n,length:n.length,charCodeAt:`${n.charCodeAt(0)}(#${n.charCodeAt(0).toString(16).padStart(6,"0")})`,codePointAt:`${n.codePointAt(0)}(#${null==(e=n.codePointAt(0))?void 0:e.toString(16).padStart(6,"0")})`})}const l=Array.from({length:1114111},((e,r)=>String.fromCodePoint(r))).join(""),p=[{name:"한글",source:String.raw`\p{sc=Hangul}`},{name:"한자",source:String.raw`\p{sc=Han}`},{name:"히라가나",source:String.raw`\p{sc=Hiragana}`},{name:"카타카나",source:String.raw`\p{sc=Katakana}`},{name:"숫자",source:String.raw`\p{Nd}`},{name:"공통",source:String.raw`\p{sc=Common}`},{name:"상속",source:String.raw`\p{sc=Inherited}`},{name:"Letter lowercase",source:String.raw`\p{Ll}`},{name:"Letter uppercase",source:String.raw`\p{Lu}`},{name:"Letter titlecase",source:String.raw`\p{Lt}`},{name:"Letter modifier",source:String.raw`\p{Lm}`},{name:"Letter other",source:String.raw`\p{Lo}`},{name:"Number decimal digit",source:String.raw`\p{Nd}`},{name:"Number letter",source:String.raw`\p{Nl}`},{name:"Number other",source:String.raw`\p{No}`},{name:"Punctuation connector",source:String.raw`\p{Pc}`},{name:"Punctuation dash",source:String.raw`\p{Pd}`},{name:"Punctuation open",source:String.raw`\p{Ps}`},{name:"Punctuation close",source:String.raw`\p{Pe}`},{name:"Punctuation initial quote",source:String.raw`\p{Pi}`},{name:"Punctuation final quote",source:String.raw`\p{Pf}`},{name:"Punctuation other",source:String.raw`\p{Po}`},{name:"Symbol math",source:String.raw`\p{Sm}`},{name:"Symbol currency",source:String.raw`\p{Sc}`},{name:"Symbol modifier",source:String.raw`\p{Sk}`},{name:"Symbol other",source:String.raw`\p{So}`},{name:"Separator space",source:String.raw`\p{Zs}`},{name:"Separator line",source:String.raw`\p{Zl}`},{name:"Separator paragraph",source:String.raw`\p{Zp}`},{name:"Other control",source:String.raw`\p{Cc}`},{name:"Other format",source:String.raw`\p{Cf}`},{name:"Other surrogate",source:String.raw`\p{Cs}`},{name:"Other private use",source:String.raw`\p{Co}`},{name:"Other not assigned",source:String.raw`\p{Cn}`},{name:"ASCII",source:String.raw`\p{ASCII}`},{name:"ASCII hex digit",source:String.raw`\p{ASCII_Hex_Digit}`},{name:"ASCII punctuation",source:String.raw`\p{ASCII_Punctuation}`},{name:"ASCII printable",source:String.raw`\p{ASCII_Printable}`},{name:"ASCII whitespace",source:String.raw`\p{ASCII_White_Space}`},{name:"Alphabetic",source:String.raw`\p{Alphabetic}`},{name:"Uppercase",source:String.raw`\p{Uppercase}`},{name:"Lowercase",source:String.raw`\p{Lowercase}`},{name:"White space",source:String.raw`\p{White_Space}`},{name:"Dash",source:String.raw`\p{Dash}`},{name:"Hyphen",source:String.raw`\p{Hyphen}`},{name:"Quotation mark",source:String.raw`\p{Quotation_Mark}`},{name:"Emoji",source:String.raw`\p{Emoji}`},{name:"Emoji component",source:String.raw`\p{Emoji_Component}`},{name:"Extended pictographic",source:String.raw`\p{Extended_Pictographic}`},{name:"Emoji modifier",source:String.raw`\p{Emoji_Modifier}`},{name:"Emoji modifier base",source:String.raw`\p{Emoji_Modifier_Base}`},{name:"Emoji presentation",source:String.raw`\p{Emoji_Presentation}`},{name:"Separator line",source:String.raw`\p{Zl}`},{name:"Separator paragraph",source:String.raw`\p{Zp}`},{name:"Separator space",source:String.raw`\p{Zs}`},{name:"Separator",source:String.raw`\p{Separator}`},{name:"Dash punctuation",source:String.raw`\p{Dash_Punctuation}`},{name:"Open punctuation",source:String.raw`\p{Open_Punctuation}`},{name:"Close punctuation",source:String.raw`\p{Close_Punctuation}`},{name:"Initial punctuation",source:String.raw`\p{Initial_Punctuation}`},{name:"Final punctuation",source:String.raw`\p{Final_Punctuation}`},{name:"Other punctuation",source:String.raw`\p{Other_Punctuation}`}];function m(){const[e,r]=n.useState(""),[t,s]=n.useState(!0),[c,m]=n.useState(!1),[d,g]=n.useState(!1),[h,S]=n.useState(!1),[w,x]=n.useState(!0),[C,b]=n.useState(!1),j=n.useMemo((()=>{let e="";return t&&(e+="g"),c&&(e+="i"),d&&(e+="m"),h&&(e+="y"),w&&(e+="u"),C&&(e+="s"),e}),[t,c,d,h,w,C]),f=n.useMemo((()=>{try{return new RegExp(0===e.length?"ERROR":e,j)}catch(r){return/error/}}),[e,j]),[y,I]=n.useState("abc ABC 123 #9CF631 한글 다국어 汉字 漢字 ひらがな カタカナ Русский язык"),[v,k]=n.useState(0),[A,P]=n.useState(1114111),[Z,L]=n.useState("word");n.useCallback((e=>Math.min(Math.max(v,parseInt(e)),A)),[v,A]);const[N,_]=n.useState((()=>[]));return n.useEffect((()=>{const e=new Worker("data:video/mp2t;base64,aW50ZXJmYWNlIFByb3BzIHsKICBkYXRhOiB7CiAgICB0YXJnZXQ6IHN0cmluZzsKICAgIHJlZ0V4cDogUmVnRXhwOwogIH07Cn0KCmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoeyBkYXRhOiB7IHRhcmdldCwgcmVnRXhwIH0gfTogUHJvcHMpID0+IHsKICBjb25zb2xlLmxvZygnc3RhcnQnLCB0YXJnZXQubGVuZ3RoKTsKICBjb25zdCByZXN1bHQgPSB0YXJnZXQubWF0Y2gocmVnRXhwKSA/PyBbXTsKICAvLyBjb25zb2xlLmxvZyhyZXN1bHQpOwogIHBvc3RNZXNzYWdlKHJlc3VsdCk7CiAgY29uc29sZS5sb2coJ2VuZCcsIHJlc3VsdC5sZW5ndGgpOwp9KTsK",{type:"module",name:"worker"+Date.now()});return e.postMessage({target:"word"===Z?y:l,regExp:f,targetRange:Z}),e.onmessage=e=>{_(e.data)},()=>{e.terminate()}}),[y,f,Z]),a.jsxs(i,{children:[a.jsx("h2",{children:"RegExp"}),a.jsx("section",{className:"buttons",children:p.map((({name:e,source:n},t)=>a.jsxs("div",{className:"button",onClick:()=>r(n),children:[a.jsx("i",{children:e}),a.jsx("div",{children:n})]},`key-${t}`)))}),a.jsx(u,{source:e,global:t,ignoreCase:c,multiline:d,sticky:h,unicode:w,dotAll:C,setSource:r,setGlobal:s,setIgnoreCase:m,setMultiline:g,setSticky:S,setUnicode:x,setDotAll:b}),a.jsx("div",{id:"regex",children:String(f)}),a.jsxs("div",{children:[a.jsxs("div",{children:[a.jsx("input",{name:"minCode",type:"number",value:v,onChange:e=>{const r=parseInt(e.currentTarget.value)??0;k(r)}}),a.jsx("input",{name:"maxCode",type:"number",value:A,onChange:e=>{const r=parseInt(e.currentTarget.value)??0;P(r)}}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"targetRange",value:"word",defaultChecked:"word"===Z,onChange:e=>{L(e.target.value)}}),"word"]}),a.jsxs("label",{children:[a.jsx("input",{type:"radio",name:"targetRange",defaultChecked:"charset"===Z,value:"charset",onChange:e=>{L(e.target.value)}}),"charset"]})]}),a.jsx("textarea",{disabled:"word"!==Z,className:"words",placeholder:"words",value:y,onChange:e=>I(e.target.value)})]}),a.jsxs("div",{children:[a.jsx("div",{children:N.length}),a.jsx("div",{id:"result",children:Array.isArray(N)&&N.map(((e,r)=>{if(0===e.length)return a.jsx(a.Fragment,{});const n=e.codePointAt(0)??0;return a.jsxs("div",{className:o({char:!0,unicode:n>65535}),children:[a.jsx("div",{className:"char--code-point",children:null==n?void 0:n.toString(16).toUpperCase()}),a.jsx("div",{className:"char--char",children:e})]},r)}))})]}),a.jsx("div",{children:"https://javascript.info/regexp-unicode"})]})}export{m as default};
