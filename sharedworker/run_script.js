function runScript(port, ...args){

	port.send(Date.now(), ...args)
}

runScript.desc = Math.random()