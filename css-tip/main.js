let app=document.getElementById('app');

let tip1 = app.children[0];

Array.from(app.children).forEach((e,i)=>{
    e.textContent=`文档${i+1}\n`.repeat(4);
    e.setAttribute('data-tip', e.getAttribute('data-tip')+`\n.........`.repeat(2));
});