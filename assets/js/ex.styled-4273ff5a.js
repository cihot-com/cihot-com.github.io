import{n as o}from"./index-890d70c3.js";const t=o.div`
  .block {
    height: 100px;
    background-color: #8883;
    margin-bottom: 10px;
  }

  .target {
    width: 100px;
    height: 100px;
    background-color: #8888;
  }

  .drag-control {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    gap: 30;
    padding: 30;
    user-select: none;
  }

  li {
    list-style-type: none;
    opacity: 0;
  }

  svg {
    opacity: 0.8;
    cursor: grabbing;
    &:hover {
      opacity: 1;
    }
  }
`;export{t as R};
