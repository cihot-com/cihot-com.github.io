let t = document.querySelector('textarea');

let vm = new Vue({
    el: '#app',
    data: {
        id: -1,
        ms: [],
        text:'',
    },
    methods: {
        onConnect() {
            s.connect();
        },
        onClose() {
            s.close();
        },
        onSend(e){
            if(e.type==='click'){
                e.preventDefault();
                s.send(this.text);
                this.text = '';
            }else if(e.type==='keydown'&&e.keyCode===13){
                if (e.ctrlKey && e.altKey) {
                    e.preventDefault();
                    s.emit('javascript', this.text);
                    this.text = '';
                } else if (e.ctrlKey) {
                    e.preventDefault();
                    s.send(this.text);
                    this.text = '';
                }
            }
        }
    }
});


