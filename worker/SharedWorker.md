
## master process code:
```
let swp = new SharedWorker('childProcess.js')
let port = swp.port
port.start()
port.onmessage = function (val) { }
port.postMessage('start')
```

## child process code:
```
let a = 1;
onconnect = function (e) {
	let port = e.ports[0];
	port.onmessage = function () {
		port.postMessage(a++)
	}
	port.postMessage(typeof this)
}
```