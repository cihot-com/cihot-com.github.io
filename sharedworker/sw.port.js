function swPort(e) {
	let port;

	port = e.source;// e.ports[0];

	send({ type: 'source===ports[0]', result: e.source === e.ports[0] });
	send({ data: e.data });
	send({ origin: e.origin });
	send({ lastEventId: e.lastEventId });
	send(Object.getOwnPropertyNames(e.source.__proto__));

	send({ 'self===this': self === this });
	send({ 'self.name': self.name === '[object Object]' });

	function send(data) {
		port.postMessage(data);
	}
}