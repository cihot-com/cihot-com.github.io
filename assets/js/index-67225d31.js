import{n as e,j as c}from"./index-8f1f19a3.js";import{c as o}from"./emotion-react.browser.esm-492a199c.js";const s=e.section`
  margin: 20px;

  .box {
    background-color: green;
    width: 100px;
    height: 100px;
    border: 1px solid #8888;
    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
      content: '@emotion';
      display: block;
    }
  }

  /* 디바이스 화면비율이 1보다 작을 시, 즉 width < height 시 반영 */
  @media (max-aspect-ratio: 1/1) {
    .box {
      background-color: #f0f;
    }
  }

  .container {
    background-color: #ccc;
    width: auto;
    height: 100px;
    /* container: container1 / inline-size;
    @container container1 (max-width: 900px) {
      .item {
        background-color: #ff0;
      }
    } */
  }

  .item {
    background-color: #ccc;
    width: 100px;
    height: 100px;
    transition: 0.3s;
  }
`;function t(){return c.jsxs(s,{children:[c.jsx("div",{css:o`
          .box {
            background-color: #066;
            &::before {
              content: 'react';
            }
          }
        `,children:c.jsx("div",{className:"box"})}),c.jsx("p",{children:"*.css 나 *.scss 파일은 나중에 import 한 것이 적용된다."}),c.jsx("p",{children:"그다음 css함수가 먼저 적용되고 styled함수가 적용된다."}),c.jsx("p",{children:"그다음 style속성이 적용된다."}),c.jsx("p",{children:"스타일 적용 순서: css파일 -- css함수 -- styled함수 -- style속성"}),c.jsx("p",{children:"css함수를 쓰면 &로 시작하는 걸 추천한다. 아니면 css를 박은 element자체가 안먹힌다."}),c.jsx("p",{children:"스타일은 import 순서가 중요한 외, selector가 상세할 수록 더 확실히 적용된다."})]})}export{t as default};
