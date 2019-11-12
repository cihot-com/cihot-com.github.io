// cs, sc (qid, type, data)
s.quest = function(type, data, handle) {
	let qid = new ObjectID().str
	let { handles } = s.quest
	handles[qid] = Array.isArray(handles[qid]) ? handles[qid].push(handle) : [handle]
	s.emit('quest', qid, type, data)
}
s.quest.handles = {}
s.on('quest', (qid, type, data)=>{
	for(let fn of handles[qid]) {
		fn(data, type, qid)
	}
	delete s.quest.handles[qid]
})