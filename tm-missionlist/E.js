// events
const E = new EventTarget();

function onKeyboardEvent(e) {

	let keyMap = [];

	if (e.ctrlKey) keyMap.push('Ctrl');
	if (e.shiftKey) keyMap.push('Shift');
	if (e.altKey) keyMap.push('Alt');
	if (e.key) {
		let key = e.key;
		switch (key) {
			case 'Control':
			case 'LeftControl':
			case 'RightControl':
				key = 'Ctrl';
				break;
			case 'Shift':
			case 'LeftShift':
			case 'RightShift':
				key = 'Shift';
				break;
			case 'Alt':
			case 'LeftAlt':
			case 'RightAlt':
				key = 'Alt';
				break;
			case 'ArrowUp':
			case 'ArrowDown':
			case 'ArrowLeft':
			case 'ArrowRight':
				key = key.slice(5);
				break;
		}
		keyMap.push(key);
	}
	// if (e.repeat) keyMap.push('++');

	keyMap = Array.from(new Set(keyMap));

	let event = new Event(e.type);
	event.keyMap = keyMap.join('+');
	event.originalEvent = e;
	E.dispatchEvent(event);
}


window.addEventListener('keydown', onKeyboardEvent);
window.addEventListener('keyup', onKeyboardEvent);
window.addEventListener('keypress', onKeyboardEvent);



function onKeyboardEventTest(e){
	if(!e.originalEvent.repeat) console.log(e.type, e.keyMap, e.originalEvent);
	e.preventDefault();
}


E.addEventListener('keydown', onKeyboardEventTest);
// E.addEventListener('keyup', onKeyboardEventTest);
// E.addEventListener('keypress', onKeyboardEventTest);

