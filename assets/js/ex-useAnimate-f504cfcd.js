import{b as t,j as e}from"./index-890d70c3.js";import{R as r}from"./ex.styled-4273ff5a.js";import{u as o}from"./use-animate-e426ebc3.js";import{m as s}from"./motion-1e207df9.js";import"./SVGVisualElement-77214677.js";import"./index-7074372a.js";import"./use-unmount-effect-807b54ef.js";import"./animate-af04a6e3.js";import"./resolve-element-6bcb316e.js";function i(){const[i,a]=o();return t.useEffect((()=>{a(i.current,{opacity:.5,scale:.5},{duration:2}),a(i.current,{backgroundColor:"#f00"},{duration:2,delay:2})}),[]),e.jsx(r,{children:e.jsx(s.div,{className:"target",ref:i,onAnimationStart:(...t)=>{}})})}export{i as default};