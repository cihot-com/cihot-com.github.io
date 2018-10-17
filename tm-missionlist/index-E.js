E.test.mouseTypes=new Set(['mousedown']);
E.test.start();

E.start();



function onTest(e) {
    let target = e.originalEvent.target;
    console.log(this);
    

    // if (target instanceof Element && target.nodeName === 'P') {
    //     e.originalEvent.preventDefault();
    //     console.log(e.originalEvent.defaultPrevented);
    // }
}

E.addEventListener('input',onTest);
E.addEventListener('keydown',onTest);
