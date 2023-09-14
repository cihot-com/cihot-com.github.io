import{b as e,j as i}from"./index-8f1f19a3.js";import{a as t}from"./emotion-css.esm-ea13f8f3.js";function o(){const[o,s]=e.useState(!1),a=e.useCallback(((e,i)=>{e.stopPropagation(),s((e=>void 0!==i?i:!e))}),[s]);return i.jsx("div",{className:t`
        display: inline-block;
      `,onPointerEnter:e=>a(e,!0),onPointerLeave:e=>a(e,!1),onClick:a,children:i.jsxs("div",{className:t`
          position: relative;
          width: 90px;
          height: 120px;
          background-color: #8888;
          padding: 6px;
          border-radius: 6px;
          transform-style: preserve-3d;
          transition: 0.5s;
          transform: perspective(300px) rotateY(${o?180:0}deg);
        `,children:[i.jsx("div",{className:t`
            width: 90px;
            height: 120px;
            backface-visibility: hidden;
            background-color: #f00;
            position: absolute;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: rotateY(0deg);
          `,children:"앞면"}),i.jsx("div",{className:t`
            width: 90px;
            height: 120px;
            backface-visibility: hidden;
            background-color: #ff0;
            position: absolute;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            transform: rotateY(180deg);
          `,children:"뒷면"})]})})}export{o as default};
