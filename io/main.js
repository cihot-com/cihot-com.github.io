let vm = new Vue({
    el: '#app',
    data: {
        id: -1,
        ms: []
    },
    methods: {
        onConnect() {
            s.connect();
        },
        onClose() {
            s.close();
        }
    }
});

let t = document.querySelector('textarea');
t.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        if (e.ctrlKey && e.altKey) {
            e.preventDefault();
            s.send({ 'chrome': t.value });
        } else if(e.ctrlKey) {
            e.preventDefault();
            s.send(t.value);
        }
    }
});